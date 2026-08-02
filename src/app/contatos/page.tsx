import { Metadata } from 'next';
import Link from 'next/link';
import { MessageCircle, MapPin, Clock, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contatos e WhatsApp | Caseirinhas da Tatá Londrina',
  description: 'Fale diretamente com a equipe da Caseirinhas da Tatá. Atendimento via WhatsApp para pedidos individuais, dúvidas e parcerias corporativas em Londrina - PR.',
  keywords: ['telefone caseirinhas da tata', 'whatsapp marmita londrina', 'contato delivery zona norte'],
  alternates: { canonical: 'https://caseirinhasdatata.shop/contatos' },
};

export default function ContatosPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-gray-100 p-6 md:p-12 font-sans">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-8 flex items-center justify-between border-b border-zinc-800 pb-4">
          <Link href="/" className="text-yellow-400 font-bold text-xl flex items-center gap-2">
            <span className="w-8 h-8 rounded-full bg-yellow-400 text-zinc-950 flex items-center justify-center text-sm font-extrabold">CT</span>
            Caseirinhas da Tatá
          </Link>
          <div className="flex gap-4 text-sm font-medium">
            <Link href="/" className="text-zinc-400 hover:text-yellow-400 transition-colors">Início</Link>
            <Link href="/cardapio" className="text-zinc-400 hover:text-yellow-400 transition-colors">Cardápio</Link>
            <Link href="/servicos" className="text-zinc-400 hover:text-yellow-400 transition-colors">Serviços</Link>
          </div>
        </nav>
        <header className="mb-10 text-center">
          <h1 className="text-4xl font-extrabold text-zinc-100 tracking-tight">Fale Conosco</h1>
          <p className="text-zinc-400 mt-2 text-lg">Estamos prontos para atender seu pedido ou responder suas dúvidas.</p>
        </header>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-zinc-100">Atendimento ao Cliente</h2>
              <p className="text-2xl font-extrabold text-green-400 font-mono my-4">(43) 99674-9607</p>
            </div>
            <a href="https://wa.me/5543996749607" className="w-full py-3 bg-green-500 text-zinc-950 font-bold rounded-xl text-center hover:bg-green-400 transition-colors block">Chamar no WhatsApp</a>
          </div>
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl flex flex-col justify-between">
            <div>
              <h2 className="text-lg font-bold text-zinc-100">Comercial & Parcerias B2B</h2>
              <p className="text-2xl font-extrabold text-yellow-400 font-mono my-4">(43) 99982-1401</p>
            </div>
            <a href="https://wa.me/5543999821401" className="w-full py-3 bg-yellow-400 text-zinc-950 font-bold rounded-xl text-center hover:bg-yellow-300 transition-colors block">Contato Comercial</a>
          </div>
        </div>
      </div>
    </main>
  );
}
