import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import path from 'node:path';
import sharp from 'sharp';
import { svgCupom, gerarCupons } from './gerar-cupons.mjs';

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
    assert.equal(listados.length, 5);

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
