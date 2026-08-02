import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Serviços de Delivery e Pacotes B2B | Caseirinhas da Tatá",
  description: "Soluções em refeições corporativas B2B e delivery rápido em Londrina.",
};

export default function ServicosPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-gray-100 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <nav className="mb-8 flex items-center justify-between border-b border-zinc-800 pb-4">
          <Link href="/" className="text-yellow-400 font-bold text-xl">Caseirinhas da Tatá</Link>
          <div className="flex gap-4 text-sm font-medium">
            <Link href="/" className="text-zinc-400 hover:text-yellow-400">Início</Link>
            <Link href="/cardapio" className="text-zinc-400 hover:text-yellow-400">Cardápio</Link>
            <Link href="/contatos" className="text-zinc-400 hover:text-yellow-400">Contatos</Link>
          </div>
        </nav>
        <h1 className="text-4xl font-extrabold text-zinc-100 mb-6">Nossos Serviços</h1>
        <p className="text-zinc-400 mb-8">Delivery residencial e pacotes corporativos B2B para empresas.</p>
      </div>
    </main>
  );
}
