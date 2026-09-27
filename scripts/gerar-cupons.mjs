// Gera cupons PNG (384 px, thermal 58 mm) com QR para o link de benefício.
// Uso: node scripts/gerar-cupons.mjs <inicio> <qtd> [dataPedido YYYY-MM-DD]
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';
import sharp from 'sharp';
import { vencimento } from '../src/lib/vencimento.mjs';

const LARGURA = 384;
const MARGEM_MINIMA = 16; // px de cada lado (colunas 0–15 e 368–383 sempre brancas).
const MAX_CODIGO = 9999;
const URL_BASE = 'https://caseirinhasdatata.shop/beneficio';
const LOGO_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', 'public', 'logo-caseirinhas-da-tata.jpg');
const LOGO_LARGURA = 200;
const LOGO_ALTURA_PADRAO = 238; // logo original 1024x1024 dourado/branco em fundo preto, após trim.
const FONT_FAMILY = 'Arial, Helvetica, sans-serif'; // uma única família p/ todas as linhas (fix round 2).

const DIAS_SEMANA_PT = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];

function escapeXml(texto) {
  return texto
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

function formatarCodigo(numero) {
  return `TATA-${String(numero).padStart(4, '0')}`;
}

// "TER 29/09 ÀS 23H59" a partir de um vencimento em America/Sao_Paulo.
function formatarVencimento(venceEm) {
  const partes = new Intl.DateTimeFormat('en-CA', {
    timeZone: 'America/Sao_Paulo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    weekday: 'short',
  }).formatToParts(venceEm);

  const mapa = Object.fromEntries(partes.map((p) => [p.type, p.value]));
  // weekday em 'en-CA' curto: "Tue" etc. Convertemos via getUTCDay do valor ISO.
  const iso = `${mapa.year}-${mapa.month}-${mapa.day}`;
  const [y, m, d] = iso.split('-').map(Number);
  const diaSemana = DIAS_SEMANA_PT[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  const hora = new Intl.DateTimeFormat('en-GB', {
    timeZone: 'America/Sao_Paulo',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(venceEm);
  const horaFormatada = hora.replace(':', 'H');
  return `${diaSemana} ${mapa.day}/${mapa.month} ÀS ${horaFormatada}`;
}

// Data padrão para o CLI: amanhã em America/Sao_Paulo.
export function amanhaSaoPaulo() {
  const hojeIso = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(new Date());
  const [ano, mes, dia] = hojeIso.split('-').map(Number);
  return new Date(Date.UTC(ano, mes - 1, dia + 1, 12, 0, 0));
}

// Processa a logomarca (public/logo-caseirinhas-da-tata.jpg, dourado/branco
// sobre preto) para preto sobre branco, compatível com impressão térmica:
// grayscale → negate → threshold (~128) → trim do excesso → resize 200px.
// Cacheado: a mesma logo serve para todos os cupons de uma execução.
let logoCache = null;
export async function prepararLogo() {
  if (logoCache) return logoCache;
  const buffer = await sharp(LOGO_PATH)
    .grayscale()
    .negate()
    .threshold(128)
    .trim()
    .resize({ width: LOGO_LARGURA })
    .png()
    .toBuffer();
  const metadata = await sharp(buffer).metadata();
  logoCache = { buffer, width: metadata.width, height: metadata.height };
  return logoCache;
}

/**
 * Monta o SVG do cupom (384 px de largura) para um código e vencimento dados.
 * Reserva no topo o espaço da logomarca (composta depois, em gerarCupons, via
 * sharp) com `logoAltura` (px). Função pura (sem I/O), usada nos testes.
 * Todas as linhas de texto respeitam margem mínima de 16 px de cada lado.
 */
export async function svgCupom(codigo, venceEm, logoAltura = LOGO_ALTURA_PADRAO) {
  const url = `${URL_BASE}?c=${codigo}`;
  const qrSvgBruto = await QRCode.toString(url, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 4, // quiet zone própria do QR.
    color: { dark: '#000000', light: '#ffffff' },
  });

  // Extrai o miolo do SVG do QR (paths) para embutir num <g> com posição/escala.
  const qrTamanho = 220; // >= 200 px, ~25 mm a 203 dpi (já inclui a quiet zone).
  const qrInnerMatch = qrSvgBruto.match(/viewBox="0 0 (\d+) \1"[^>]*>([\s\S]*)<\/svg>/);
  const qrViewBox = qrInnerMatch ? Number(qrInnerMatch[1]) : 0;
  const qrConteudo = qrInnerMatch ? qrInnerMatch[2] : '';
  const escala = qrViewBox ? qrTamanho / qrViewBox : 1;

  const venceTexto = formatarVencimento(venceEm);
  const xQr = (LARGURA - qrTamanho) / 2;
  const centroX = LARGURA / 2;

  // Layout vertical: topo reservado para a logo (composta depois), seguido do
  // texto de chamada em 2 linhas, QR, código, vencimento, regra e chamada
  // final também em 2 linhas — todas dentro da margem mínima de 16 px.
  const margemTopoLogo = 16;
  let y = margemTopoLogo + logoAltura + 30;
  const yChamada1 = y;
  y += 20;
  const yChamada2 = y;
  y += 26;
  const yQr = y;
  y += qrTamanho + 44;
  const yCodigo = y;
  y += 32;
  const yVence = y;
  y += 28;
  const yRegra = y;
  y += 24;
  const yAponte1 = y;
  y += 20;
  const yAponte2 = y;
  const alturaTotal = y + 24;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${LARGURA}" viewBox="0 0 ${LARGURA} ${alturaTotal}">
  <desc>${escapeXml(url)}</desc>
  <rect x="0" y="0" width="${LARGURA}" height="${alturaTotal}" fill="#ffffff" />
  <text x="${centroX}" y="${yChamada1}" text-anchor="middle" font-family="${FONT_FAMILY}" font-weight="bold" font-size="16" fill="#000000">${escapeXml('PRESENTE NA SUA')}</text>
  <text x="${centroX}" y="${yChamada2}" text-anchor="middle" font-family="${FONT_FAMILY}" font-weight="bold" font-size="16" fill="#000000">${escapeXml('PRÓXIMA COMPRA')}</text>
  <g transform="translate(${xQr}, ${yQr}) scale(${escala})">
    ${qrConteudo}
  </g>
  <text x="${centroX}" y="${yCodigo}" text-anchor="middle" font-family="${FONT_FAMILY}" font-weight="bold" font-size="28" fill="#000000">${escapeXml(codigo)}</text>
  <text x="${centroX}" y="${yVence}" text-anchor="middle" font-family="${FONT_FAMILY}" font-weight="bold" font-size="17" fill="#000000">${escapeXml(`VENCE ${venceTexto}`)}</text>
  <text x="${centroX}" y="${yRegra}" text-anchor="middle" font-family="${FONT_FAMILY}" font-weight="bold" font-size="15" fill="#000000">${escapeXml('Cupom numerado · 1 por cliente')}</text>
  <text x="${centroX}" y="${yAponte1}" text-anchor="middle" font-family="${FONT_FAMILY}" font-weight="bold" font-size="15" fill="#000000">${escapeXml('Aponte a câmera e entre')}</text>
  <text x="${centroX}" y="${yAponte2}" text-anchor="middle" font-family="${FONT_FAMILY}" font-weight="bold" font-size="15" fill="#000000">${escapeXml('no grupo de promoções')}</text>
</svg>`;
}

/**
 * Gera `qtd` cupons PNG a partir de `inicio`, para o pedido em `dataPedido`,
 * no diretório `saidaDir` (padrão: ./cupons). Recusa faixas acima de 9999.
 * Também grava `controle.csv` (codigo,data_pedido,vence_em,data_resgate,
 * beneficio,valor_pedido) com uma linha por cupom.
 */
export async function gerarCupons(inicio, qtd, dataPedido, saidaDir) {
  if (!Number.isInteger(inicio) || inicio < 1) {
    throw new Error(`inicio invalido: ${inicio}`);
  }
  if (!Number.isInteger(qtd) || qtd < 1) {
    throw new Error(`qtd invalida: ${qtd}`);
  }
  const fim = inicio + qtd - 1;
  if (fim > MAX_CODIGO) {
    throw new Error(`faixa invalida: TATA-${String(inicio).padStart(4, '0')} .. TATA-${String(fim).padStart(4, '0')} excede ${MAX_CODIGO}`);
  }

  const dir = saidaDir ?? path.join(process.cwd(), 'cupons');
  await mkdir(dir, { recursive: true });

  const logo = await prepararLogo();
  const venceEm = vencimento(dataPedido);
  const dataPedidoIso = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(dataPedido);
  const venceEmIso = venceEm.toISOString();
  const arquivos = [];
  const linhasCsv = ['codigo,data_pedido,vence_em,data_resgate,beneficio,valor_pedido'];

  for (let n = inicio; n <= fim; n += 1) {
    const codigo = formatarCodigo(n);
    const svg = await svgCupom(codigo, venceEm, logo.height);
    const destino = path.join(dir, `${codigo}.png`);

    const base = await sharp(Buffer.from(svg))
      .resize({ width: LARGURA })
      .flatten({ background: '#ffffff' })
      .png()
      .toBuffer();

    const logoLeft = Math.round((LARGURA - logo.width) / 2);
    await sharp(base)
      .composite([{ input: logo.buffer, top: 16, left: logoLeft }])
      // Binarização final: impressão térmica é só preto puro, sem cinza de
      // antialias. greyscale + threshold(128) reduz cada pixel a 0 ou 255.
      .greyscale()
      .threshold(128)
      .png()
      .toFile(destino);

    arquivos.push(destino);
    linhasCsv.push(`${codigo},${dataPedidoIso},${venceEmIso},,,`);
  }

  await writeFile(path.join(dir, 'controle.csv'), `${linhasCsv.join('\n')}\n`, 'utf8');

  return arquivos;
}

function main() {
  const [, , inicioArg, qtdArg, dataArg] = process.argv;
  if (!inicioArg || !qtdArg) {
    console.error('Uso: node scripts/gerar-cupons.mjs <inicio> <qtd> [dataPedido YYYY-MM-DD]');
    process.exit(1);
  }
  const inicio = Number(inicioArg);
  const qtd = Number(qtdArg);
  const dataPedido = dataArg ? new Date(`${dataArg}T12:00:00-03:00`) : amanhaSaoPaulo();

  gerarCupons(inicio, qtd, dataPedido)
    .then((arquivos) => {
      console.log(`Gerados ${arquivos.length} cupons em cupons/`);
    })
    .catch((erro) => {
      console.error(erro.message);
      process.exit(1);
    });
}

const executadoDiretamente = process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1]);
if (executadoDiretamente) {
  main();
}
