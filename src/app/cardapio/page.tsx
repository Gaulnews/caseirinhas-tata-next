import { Metadata } from "next";
import Link from "next/link";
import { Utensils, ShoppingBag } from "lucide-react";

export const metadata: Metadata = {
  title: "Cardápio de Marmitas Caseiras em Londrina | Caseirinhas da Tatá",
  description: "Confira nosso cardápio completo de refeições caseiras diárias. Bife à Parmegiana e opções com entrega rápida na Zona Norte.",
};

export default function CardapioPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-gray-100 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <nav className="mb-8 flex items-center justify-between border-b border-zinc-800 pb-4">
          <Link href="/" className="text-yellow-400 font-bold text-xl">Caseirinhas da Tatá</Link>
          <div className="flex gap-4 text-sm font-medium">
            <Link href="/" className="text-zinc-400 hover:text-yellow-400">Início</Link>
            <Link href="/servicos" className="text-zinc-400 hover:text-yellow-400">Serviços</Link>
            <Link href="/contatos" className="text-zinc-400 hover:text-yellow-400">Contatos</Link>
          </div>
        </nav>
        <h1 className="text-4xl font-extrabold text-zinc-100 mb-6">Nosso Cardápio</h1>
        <p className="text-zinc-400 mb-8">Refeições preparadas diariamente com sabor caseiro.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 rounded-xl border border-zinc-800">
            <h3 className="text-xl font-bold mb-2">Bife à Parmegiana</h3>
            <p className="text-zinc-400 text-sm mb-4">Acompanha arroz, feijão, batata, couve e farofa.</p>
            <a href="https://wa.me/5543996749607" className="block text-center py-2 bg-yellow-400 text-zinc-950 font-bold rounded-lg text-sm">Pedir no WhatsApp</a>
          </div>
        </div>
      </div>
    </main>
  );
}
