// Lógica pura do Meta Pixel (sem React), usada por src/components/MetaPixel.tsx.

// Só dígitos: impede injeção no script inline e mantém o pixel desligado
// enquanto NEXT_PUBLIC_META_PIXEL_ID não estiver definida.
export function pixelIdValido(id: string): boolean {
  return /^\d{10,20}$/.test(id);
}

// Destino de um link: 'whatsapp'/'ifood' (contato de pedido), 'grupo' (convite
// de grupo do WhatsApp, não é pedido) ou null.
// Compara o hostname exato para evitar falsos positivos (ex.: ?ref=wa.me).
export function destinoContato(href: string, base: string): 'whatsapp' | 'ifood' | 'grupo' | null {
  let host: string;
  try {
    host = new URL(href, base).hostname.toLowerCase();
  } catch {
    return null;
  }
  if (host === 'chat.whatsapp.com') return 'grupo';
  if (host === 'wa.me' || host === 'api.whatsapp.com') return 'whatsapp';
  if (host === 'ifood.com.br' || host.endsWith('.ifood.com.br')) return 'ifood';
  return null;
}
