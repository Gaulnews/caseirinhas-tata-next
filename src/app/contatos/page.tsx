import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contatos e WhatsApp | Caseirinhas da Tatá Londrina",
  description: "Fale diretamente com a equipe da Caseirinhas da Tatá.",
};

export default function ContatosPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-gray-100 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8 flex items-center justify-between border-b border-zinc-800 pb-4">
          <Link href="/" className="text-yellow-400 font-bold text-xl">Caseirinhas da Tatá</Link>
          <div className="flex gap-4 text-sm font-medium">
            <Link href="/" className="text-zinc-400 hover:text-yellow-400">Início</Link>
            <Link href="/cardapio" className="text-zinc-400 hover:text-yellow-400">Cardápio</Link>
            <Link href="/servicos" className="text-zinc-400 hover:text-yellow-400">Serviços</Link>
          </div>
        </nav>
        <h1 className="text-4xl font-extrabold text-zinc-100 mb-6">Fale Conosco</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <h2 className="text-lg font-bold mb-2">Atendimento (Pedidos)</h2>
            <p className="text-2xl font-mono text-green-400 mb-4">(43) 99674-9607</p>
            <a href="https://wa.me/5543996749607" className="block text-center py-2 bg-green-500 text-zinc-950 font-bold rounded-lg">Chamar no WhatsApp</a>
          </div>
        </div>
      </div>
    </main>
  );
}
