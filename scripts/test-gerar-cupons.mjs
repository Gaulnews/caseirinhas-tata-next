import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readdir, rm, readFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { svgCupom, gerarCupons } from './gerar-cupons.mjs';

// Verifica que as colunas [de, ate] (inclusive) estão totalmente brancas
// (valor de canal >= limiar) em toda a altura da imagem.
async function colunasTotalmenteBrancas(caminhoPng, de, ate, limiar = 250) {
  const { data, info } = await sharp(caminhoPng).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;
  for (let col = de; col <= ate; col += 1) {
    for (let linha = 0; linha < height; linha += 1) {
      const idx = (linha * width + col) * channels;
      if (data[idx] < limiar || data[idx + 1] < limiar || data[idx + 2] < limiar) {
        return false;
      }
    }
  }
  return true;
}

// Vencimento de um pedido em 2026-09-28 -> 2026-09-29 23:59:59 -03:00 (TER).
const VENCIMENTO_TESTE = new Date('2026-09-29T23:59:59-03:00');

test('svgCupom contem codigo, vencimento formatado, URL escapada e nunca "fora do iFood"', async () => {
  const svg = await svgCupom('TATA-0001', VENCIMENTO_TESTE);

  assert.ok(svg.includes('TATA-0001'), 'deve conter o codigo');
  assert.ok(svg.includes('VENCE TER 29/09 ÀS 23H59'), 'deve conter o vencimento formatado');
  assert.ok(
    svg.includes('https://caseirinhasdatata.shop/beneficio?c=TATA-0001') ||
      svg.includes('https://caseirinhasdatata.shop/beneficio?c=TATA-0001'.replace(/&/g, '&amp;')),
    'deve conter a URL do beneficio com o codigo'
  );
  assert.ok(!svg.toLowerCase().includes('fora do ifood'), 'nunca deve sugerir compra fora do iFood');
});

test('gerarCupons cria N arquivos PNG com 384px de largura', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'cupons-teste-'));
  try {
    const dataPedido = new Date('2026-09-28T12:00:00-03:00');
    const arquivos = await gerarCupons(1, 5, dataPedido, dir);

    assert.equal(arquivos.length, 5);
    const listados = await readdir(dir);
    assert.equal(listados.filter((nome) => nome.endsWith('.png')).length, 5);

    for (const arquivo of arquivos) {
      const metadata = await sharp(arquivo).metadata();
      assert.equal(metadata.width, 384);
    }
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('gerarCupons recusa faixa acima de TATA-9999', async () => {
  const dataPedido = new Date('2026-09-28T12:00:00-03:00');
  await assert.rejects(() => gerarCupons(9998, 5, dataPedido, tmpdir()));
});

test('cupom mantém margem mínima de 16 px: colunas 0-15 e 368-383 totalmente brancas', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'cupons-margem-'));
  try {
    const dataPedido = new Date('2026-09-28T12:00:00-03:00');
    const [arquivo] = await gerarCupons(1, 1, dataPedido, dir);

    assert.ok(await colunasTotalmenteBrancas(arquivo, 0, 15), 'colunas 0-15 devem estar brancas');
    assert.ok(await colunasTotalmenteBrancas(arquivo, 368, 383), 'colunas 368-383 devem estar brancas');
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('PNG final é binarizado: todo pixel é 0 ou 255 (preto puro, sem cinza de antialias)', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'cupons-binario-'));
  try {
    const dataPedido = new Date('2026-09-28T12:00:00-03:00');
    const [arquivo] = await gerarCupons(1, 1, dataPedido, dir);

    const { data } = await sharp(arquivo).greyscale().raw().toBuffer({ resolveWithObject: true });
    let cinzas = 0;
    for (let i = 0; i < data.length; i += 1) {
      if (data[i] !== 0 && data[i] !== 255) cinzas += 1;
    }
    assert.equal(cinzas, 0, `esperava 0 pixels cinza (valor entre 1 e 254), encontrou ${cinzas}`);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});

test('gerarCupons grava controle.csv com cabeçalho e uma linha por cupom', async () => {
  const dir = await mkdtemp(path.join(tmpdir(), 'cupons-csv-'));
  try {
    const dataPedido = new Date('2026-09-28T12:00:00-03:00');
    await gerarCupons(1, 3, dataPedido, dir);

    const csv = await readFile(path.join(dir, 'controle.csv'), 'utf8');
    const linhas = csv.trim().split('\n');

    assert.equal(linhas[0], 'codigo,data_pedido,vence_em,data_resgate,beneficio,valor_pedido');
    assert.equal(linhas.length, 4); // cabeçalho + 3 cupons
    assert.match(linhas[1], /^TATA-0001,2026-09-28,2026-09-30T02:59:59\.000Z,,,$/);
    assert.match(linhas[3], /^TATA-0003,2026-09-28,2026-09-30T02:59:59\.000Z,,,$/);
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
});
