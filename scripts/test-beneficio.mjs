import { test } from 'node:test';
import assert from 'node:assert/strict';
import { BENEFICIOS, REGRAS_GERAIS, vencimento, mensagemResgate } from '../src/lib/beneficio.ts';

test('BENEFICIOS tem os 3 benefícios da campanha', () => {
  assert.equal(BENEFICIOS.length, 3);
  assert.deepEqual(BENEFICIOS.map((b) => b.id), ['coca2l', 'salada', 'mini']);
});

test('mensagemResgate monta link do wa.me com o código', () => {
  const url = mensagemResgate('TATA-0001', 'mini');
  assert.match(url, /^https:\/\/wa\.me\/5543996749607\?text=/);
  const texto = decodeURIComponent(url.split('?text=')[1]);
  assert.match(texto, /TATA-0001/);
});

test('vencimento: pedido às 12:30 vence 23h59 do dia seguinte', () => {
  const pedido = new Date('2026-09-28T12:30:00-03:00');
  assert.equal(vencimento(pedido).toISOString(), new Date('2026-09-29T23:59:59-03:00').toISOString());
});

test('vencimento: pedido perto da meia-noite (23:50) ainda vence no dia seguinte', () => {
  const pedido = new Date('2026-09-28T23:50:00-03:00');
  assert.equal(vencimento(pedido).toISOString(), new Date('2026-09-29T23:59:59-03:00').toISOString());
});

test('REGRAS_GERAIS cobre as regras mínimas da campanha', () => {
  const regras = REGRAS_GERAIS.join(' ');
  assert.match(regras, /1 por cliente/);
  assert.match(regras, /uso único/);
  assert.match(regras, /23h59 do dia seguinte/);
  assert.match(regras, /WhatsApp/);
  assert.match(regras, /não acumula/i);
  assert.match(regras, /grupo/i);
});
