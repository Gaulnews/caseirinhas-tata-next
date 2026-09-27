// Gera cupons PNG (384 px, thermal 58 mm) com QR para o link de benefício.
// Uso: node scripts/gerar-cupons.mjs <inicio> <qtd> [dataPedido YYYY-MM-DD]
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import QRCode from 'qrcode';
import sharp from 'sharp';

const LARGURA = 384;
const MAX_CODIGO = 9999;
const URL_BASE = 'https://caseirinhasdatata.shop/beneficio';

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

/**
 * Monta o SVG do cupom (384 px de largura) para um código e vencimento dados.
 * Função pura, usada nos testes.
 */
export async function svgCupom(codigo, venceEm) {
  const url = `${URL_BASE}?c=${codigo}`;
  const qrSvgBruto = await QRCode.toString(url, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 0,
    color: { dark: '#000000', light: '#ffffff' },
  });

  // Extrai o miolo do SVG do QR (paths) para embutir num <g> com posição/escala.
  const qrTamanho = 220; // >= 200 px, ~25 mm a 203 dpi.
  const qrInnerMatch = qrSvgBruto.match(/viewBox="0 0 (\d+) \1"[^>]*>([\s\S]*)<\/svg>/);
  const qrViewBox = qrInnerMatch ? Number(qrInnerMatch[1]) : 0;
  const qrConteudo = qrInnerMatch ? qrInnerMatch[2] : '';
  const escala = qrViewBox ? qrTamanho / qrViewBox : 1;

  const venceTexto = formatarVencimento(venceEm);
  const larguraQr = qrTamanho;
  const xQr = (LARGURA - larguraQr) / 2;

  const alturaTotal = 620;

  return `<svg xmlns="http://www.w3.org/2000/svg" width="${LARGURA}" viewBox="0 0 ${LARGURA} ${alturaTotal}">
  <desc>${escapeXml(url)}</desc>
  <rect x="0" y="0" width="${LARGURA}" height="${alturaTotal}" fill="#ffffff" />
  <text x="${LARGURA / 2}" y="42" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="30" fill="#000000">${escapeXml('CASEIRINHAS DA TATÁ')}</text>
  <text x="${LARGURA / 2}" y="78" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="20" fill="#000000">${escapeXml('PRESENTE NA SUA PRÓXIMA COMPRA')}</text>
  <g transform="translate(${xQr}, 100) scale(${escala})">
    ${qrConteudo}
  </g>
  <text x="${LARGURA / 2}" y="${100 + qrTamanho + 50}" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="34" fill="#000000">${escapeXml(codigo)}</text>
  <text x="${LARGURA / 2}" y="${100 + qrTamanho + 100}" text-anchor="middle" font-family="sans-serif" font-weight="bold" font-size="26" fill="#000000">${escapeXml(`VENCE ${venceTexto}`)}</text>
  <text x="${LARGURA / 2}" y="${100 + qrTamanho + 140}" text-anchor="middle" font-family="sans-serif" font-size="18" fill="#000000">${escapeXml('Cupom numerado · 1 por cliente')}</text>
  <text x="${LARGURA / 2}" y="${100 + qrTamanho + 175}" text-anchor="middle" font-family="sans-serif" font-size="16" fill="#000000">${escapeXml('Aponte a câmera e entre no grupo de promoções')}</text>
</svg>`;
}

// Calcula o vencimento (23:59:59 do dia seguinte ao pedido, -03:00) sem
// depender de import "@/" — reimplementado aqui para o script rodar isolado.
function vencimento(dataPedido) {
  const hojeIso = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(dataPedido);
  const [ano, mes, dia] = hojeIso.split('-').map(Number);
  const proximoDia = new Date(Date.UTC(ano, mes - 1, dia + 1));
  const y = proximoDia.getUTCFullYear();
  const m = String(proximoDia.getUTCMonth() + 1).padStart(2, '0');
  const d = String(proximoDia.getUTCDate()).padStart(2, '0');
  return new Date(`${y}-${m}-${d}T23:59:59-03:00`);
}

/**
 * Gera `qtd` cupons PNG a partir de `inicio`, para o pedido em `dataPedido`,
 * no diretório `saidaDir` (padrão: ./cupons). Recusa faixas acima de 9999.
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

  const venceEm = vencimento(dataPedido);
  const arquivos = [];

  for (let n = inicio; n <= fim; n += 1) {
    const codigo = formatarCodigo(n);
    const svg = await svgCupom(codigo, venceEm);
    const destino = path.join(dir, `${codigo}.png`);
    await sharp(Buffer.from(svg))
      .resize({ width: LARGURA })
      .flatten({ background: '#ffffff' })
      .png()
      .toFile(destino);
    arquivos.push(destino);
  }

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
