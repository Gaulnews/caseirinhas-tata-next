import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';

// Coerência das promessas públicas do grupo oficial (plano 2026-09-25).
// Não há sorteio (D7): o "diário" é o Reloginho. Preços de Reloginho não
// vão para o site (D5).
const arquivos = [
  'src/app/page.tsx', 'src/app/bio/page.tsx', 'src/app/contatos/page.tsx',
  'src/components/CarrosselRedesSociais.tsx', 'src/app/promocoes/page.tsx',
  'src/components/SemanaDosKits.tsx', 'src/components/AgendaReloginhos.tsx',
];

test('nenhuma superfície usa frases proibidas', () => {
  for (const f of arquivos) {
    // "sem sorteio" (kits) é verdade; GRUPO_SORTEIOS é só o nome da constante.
    const t = readFileSync(f, 'utf8').replace(/GRUPO_SORTEIOS/g, '').replace(/sem sorteio/gi, '');
    for (const p of [/levam o prêmio na hora/i, /concorra/i, /últimas vagas/i, /sorteio/i, /R\$\s?(18|46)\b/]) {
      assert.ok(!p.test(t), `${f}: ${p}`);
    }
  }
});

test('superfícies de kit remetem às regras', () => {
  for (const f of ['src/app/promocoes/page.tsx', 'src/components/SemanaDosKits.tsx']) {
    assert.ok(/Consulte as (regras|condições)|regulamento/i.test(readFileSync(f, 'utf8')), `${f} sem regras`);
  }
});

test('chamadas do grupo vêm de chamadaGrupo/semanaAtiva (expiram em 04/10 15h)', () => {
  for (const f of ['src/app/page.tsx', 'src/app/bio/page.tsx', 'src/app/contatos/page.tsx', 'src/app/promocoes/page.tsx']) {
    assert.ok(/chamadaGrupo\(\)/.test(readFileSync(f, 'utf8')), `${f} não usa chamadaGrupo()`);
  }
  assert.ok(/semanaAtiva\(\)/.test(readFileSync('src/components/CarrosselRedesSociais.tsx', 'utf8')), 'carrossel não expira');
});
