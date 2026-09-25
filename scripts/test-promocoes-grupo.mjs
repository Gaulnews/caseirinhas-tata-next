import { test } from 'node:test';
import assert from 'node:assert/strict';
import {
  SEMANA, trilhasKits, reloginhos, REGRAS_GERAIS, dataCurta, hojeEmLondrina,
  statusSemana, reloginhoDoDia, mensagemGrupo, avisoReloginho,
} from '../src/lib/promocoes-grupo.ts';

test('relógio do Reloginho no fuso de Londrina', () => {
  const eco = reloginhos.find((r) => r.codigo === 'RL-ECO');
  const t = (hhmm) => Date.parse(`2026-09-30T${hhmm}:00-03:00`);
  assert.equal(avisoReloginho(eco, t('12:10')), 'Revelação em 20min 00s');
  assert.equal(avisoReloginho(eco, t('12:40')), 'Revelado no grupo! Começa em 20min 00s');
  assert.equal(avisoReloginho(eco, t('13:30')), 'Valendo agora! Termina em 30min 00s');
  assert.equal(avisoReloginho(eco, t('14:10')), 'Encerrado');
  const gr = reloginhos.find((r) => r.codigo === 'RL-GR');
  assert.equal(avisoReloginho(gr, t('12:10')), 'Primeira hora após a abertura');
});

test('semana e metas conforme manual e promo-ct.md', () => {
  // D6: domingo 04/10 a loja abre das 10:40 às 15:00; os kits encerram às 15h.
  assert.deepEqual(SEMANA, { inicio: '2026-09-28', fim: '2026-10-04', encerramento: '2026-10-04T15:00:00-03:00' });
  // D5: RL-BOAS vale 1 hora a partir do aviso de início no grupo.
  assert.equal(reloginhos.find((r) => r.codigo === 'RL-BOAS').janela, '1 hora a partir do aviso de início no grupo');
  assert.deepEqual(trilhasKits.map((t) => [t.id, t.meta, t.vagas]), [
    ['kit-facas', '8 Minis OU 6 Grandes', 5],
    ['kit-ferramentas', '7 Minis OU 5 Grandes', 5],
    ['kit-churrasqueiro', '7 Minis OU 6 Médias', 5],
  ]);
});

test('Reloginhos nas datas do manual; RL-SAL fora do site', () => {
  assert.deepEqual(reloginhos.map((r) => [r.codigo, r.data]), [
    ['RL-GR', '2026-09-28'], ['RL-BOAS', '2026-09-29'], ['RL-ECO', '2026-09-30'], ['RL-DUPLA', '2026-10-01'],
  ]);
  const eco = reloginhos.find((r) => r.codigo === 'RL-ECO');
  assert.equal(eco.inicio, '2026-09-30T13:00:00-03:00');
  assert.equal(eco.revelacao, '2026-09-30T12:30:00-03:00');
});

test('nenhum preço de Reloginho publicado sem aprovação', () => {
  const tudo = JSON.stringify(reloginhos) + mensagemGrupo();
  assert.ok(!/R\$\s?(18|46)\b/.test(tudo), 'preço de teste do manual publicado');
});

test('hojeEmLondrina usa o fuso de Londrina', () => {
  assert.equal(hojeEmLondrina(new Date('2026-09-30T02:30:00Z')), '2026-09-29');
  assert.equal(hojeEmLondrina(new Date('2026-09-30T03:30:00Z')), '2026-09-30');
});

test('statusSemana e reloginhoDoDia', () => {
  assert.equal(statusSemana('2026-09-27'), 'antes');
  assert.equal(statusSemana('2026-09-28'), 'durante');
  assert.equal(statusSemana('2026-10-04'), 'durante');
  assert.equal(statusSemana('2026-10-05'), 'encerrada');
  assert.equal(reloginhoDoDia('2026-09-30')?.codigo, 'RL-ECO');
  assert.equal(reloginhoDoDia('2026-10-02'), undefined);
  assert.equal(dataCurta('2026-10-04'), '04/10');
});

test('texto do grupo: redação aprovada, regras e sem frases proibidas', () => {
  const m = mensagemGrupo();
  for (const trecho of [
    'Entre e garanta o seu', 'garantem o prêmio', 'Consulte as regras',
    'depois que as 5 vagas do kit acabarem não dá prêmio', '*28/09* a *04/10*',
    'revelada no grupo 30 minutos antes', 'Reloginho Todo o dia', 'às 15h', '*(43) 99674-9607*',
  ]) assert.ok(m.includes(trecho), `faltou: ${trecho}`);
  for (const proibido of ['levam o prêmio na hora', 'concorra', 'últimas vagas', 'sorteio diário', '17/08', '12/10', '13/10']) {
    assert.ok(!m.toLowerCase().includes(proibido.toLowerCase()), `frase proibida: ${proibido}`);
  }
  for (const linha of m.split('\n')) {
    assert.equal((linha.match(/\*/g) ?? []).length % 2, 0, `negrito sem par: ${linha}`);
  }
  assert.ok(REGRAS_GERAIS.some((r) => r.includes('uma única promoção')));
});
