// Cálculo puro do vencimento do cupom (23:59:59 do dia seguinte ao pedido,
// fuso America/Sao_Paulo -03:00). JS puro (sem tipos) para ser importado
// tanto por src/lib/beneficio.ts (via re-export) quanto por
// scripts/gerar-cupons.mjs, sem duplicar a lógica.
//
// Ex.: pedido 28/09 12:30 -03:00 → vencimento 29/09 23:59:59 -03:00.
export function vencimento(dataPedido) {
  const hojeIso = new Intl.DateTimeFormat('en-CA', { timeZone: 'America/Sao_Paulo' }).format(dataPedido);
  const [ano, mes, dia] = hojeIso.split('-').map(Number);
  const proximoDia = new Date(Date.UTC(ano, mes - 1, dia + 1));
  const y = proximoDia.getUTCFullYear();
  const m = String(proximoDia.getUTCMonth() + 1).padStart(2, '0');
  const d = String(proximoDia.getUTCDate()).padStart(2, '0');
  return new Date(`${y}-${m}-${d}T23:59:59-03:00`);
}
