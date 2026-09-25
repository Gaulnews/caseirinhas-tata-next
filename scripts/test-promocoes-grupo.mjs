import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  promocoesGrupo, RETIRADA_A_PARTIR_DE, dataCurta, promocoesEncerradas, mensagemGrupo, statusPromocao,
} from '../src/lib/promocoes-grupo.ts';

test('statusPromocao marca futura, vigente e encerrada pelo dia de Londrina', () => {
  const [facas, ferramentas] = promocoesGrupo;
  assert.equal(statusPromocao(facas, '2026-09-27'), 'futura');
  assert.equal(statusPromocao(facas, '2026-09-28'), 'vigente');
  assert.equal(statusPromocao(facas, '2026-10-05'), 'vigente');
  assert.equal(statusPromocao(facas, '2026-10-06'), 'encerrada');
  assert.equal(statusPromocao(ferramentas, '2026-10-06'), 'vigente');
  assert.equal(statusPromocao(ferramentas, '2026-10-13'), 'encerrada');
});

// Diferença em dias entre duas datas YYYY-MM-DD (ambas em UTC, sem fuso).
const dias = (a, b) => {
  const utc = (iso) => {
    const [y, m, d] = iso.split('-').map(Number);
    return Date.UTC(y, m - 1, d);
  };
  return (utc(b) - utc(a)) / 86400000;
};

test('datas: 28/09 a 12/10, durações 8/3/4, contíguas', () => {
  assert.deepEqual(promocoesGrupo.map((p) => [p.inicio, p.fim]), [
    ['2026-09-28', '2026-10-05'], ['2026-10-06', '2026-10-08'], ['2026-10-09', '2026-10-12'],
  ]);
  assert.deepEqual(promocoesGrupo.map((p) => dias(p.inicio, p.fim) + 1), [8, 3, 4]);
  for (let i = 1; i < promocoesGrupo.length; i++) {
    assert.equal(dias(promocoesGrupo[i - 1].fim, promocoesGrupo[i].inicio), 1);
  }
  assert.equal(RETIRADA_A_PARTIR_DE, '2026-10-13');
});

test('dataCurta não desloca o dia por fuso', () => {
  assert.equal(dataCurta('2026-10-05'), '05/10');
  assert.equal(dataCurta('2026-09-28'), '28/09');
});

test('promocoesEncerradas: só depois de 12/10', () => {
  assert.equal(promocoesEncerradas('2026-10-12'), false);
  assert.equal(promocoesEncerradas('2026-10-13'), true);
});

test('mensagem do grupo preserva regras do promo-ct.md e usa datas novas', () => {
  const m = mensagemGrupo();
  for (const trecho of [
    'As *5 primeiras pessoas* do grupo que baterem a meta de marmitas',
    'Peça *8 Marmitas Mini* OU *6 Marmitas Grandes*',
    'Peça *5 Marmitas Grandes* OU *7 Marmitas Mini*',
    'Peça *7 Marmitas Mini* OU *6 Marmitas Médias*',
    '📅 De *28/09* a *05/10*', '📅 De *06/10* a *08/10*', '📅 De *09/10* a *12/10*',
    'Todos os prêmios são retirados a partir de *13/10*.',
    '*(43) 99674-9607*',
    '*PROMOÇÕES EXCLUSIVAS DO GRUPO — CASEIRINHAS DA TATÁ* 🎁',
  ]) assert.ok(m.includes(trecho), `faltou: ${trecho}`);
  for (const linha of m.split('\n')) {
    assert.equal((linha.match(/\*/g) ?? []).length % 2, 0, `negrito sem par: ${linha}`);
  }
  for (const antigo of ['17/08', '24/08', '25/08', '27/08', '28/08', '31/08', '01/09']) {
    assert.ok(!m.includes(antigo), `data antiga: ${antigo}`);
  }
});
