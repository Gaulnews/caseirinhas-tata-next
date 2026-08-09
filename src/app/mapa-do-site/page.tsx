import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Mapa do Site',
  description: 'Estrutura completa do site Caseirinhas da Tatá. Acesse rapidamente todas as nossas páginas, cardápios e serviços.',
  alternates: { canonical: 'https://caseirinhasdatata.shop/mapa-do-site' },
};

export default function MapaDoSitePage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-gray-100 p-8 max-w-3xl mx-auto font-sans">
      <header className="mb-10 border-b border-zinc-800 pb-6">
        <h1 className="text-4xl font-bold text-yellow-400 tracking-tight">Mapa do Site</h1>
        <p className="text-zinc-400 mt-2">Visão geral de todas as rotas e páginas disponíveis.</p>
      </header>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4 border-l-4 border-yellow-400 pl-3">Navegação Principal</h2>
          <ul className="space-y-3 pl-4">
            <li><Link href="/" className="text-zinc-400 hover:text-yellow-400 underline-offset-4 hover:underline">Início (Cardápio do Dia)</Link></li>
            <li><Link href="/categorias" className="text-zinc-400 hover:text-yellow-400 underline-offset-4 hover:underline">Todas as Categorias</Link></li>
            <li><Link href="/tags" className="text-zinc-400 hover:text-yellow-400 underline-offset-4 hover:underline">Busca por Tags (Regiões)</Link></li>
          </ul>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-zinc-100 mb-4 border-l-4 border-yellow-400 pl-3">Sistemas Internos</h2>
          <ul className="space-y-3 pl-4">
            <li><Link href="https://caseirinhas-engine.vercel.app" target="_blank" className="text-zinc-400 hover:text-yellow-400 underline-offset-4 hover:underline">Painel Engine (CRM & Disparos)</Link></li>
            <li><Link href="/api/seo-audit" className="text-zinc-400 hover:text-yellow-400 underline-offset-4 hover:underline">Auditoria SEO (Apify/Ahrefs Endpoint)</Link></li>
          </ul>
        </section>
      </div>
    </main>
  );
}
