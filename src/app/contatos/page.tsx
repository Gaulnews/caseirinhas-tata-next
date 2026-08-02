import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Contatos e Endereço | Caseirinhas da Tatá',
  description: 'Fale com a Caseirinhas da Tatá via WhatsApp. Atendimento para pedidos, suporte e agendamento de degustações corporativas.',
  keywords: ['whatsapp caseirinhas da tata', 'telefone marmitaria londrina', 'contato delivery zona norte'],
  alternates: { canonical: 'https://caseirinhasdatata.shop/contatos' },
};

export default function ContatosPage() {
  return (
    <main className="min-h-screen bg-zinc-950 text-gray-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto">
        <nav className="mb-10 flex gap-4 text-sm border-b border-zinc-800 pb-4">
          <Link href="/" className="text-zinc-400 hover:text-yellow-400 transition-colors">&larr; Voltar para Home</Link>
          <Link href="/cardapio" className="text-zinc-400 hover:text-yellow-400 transition-colors">Cardápio</Link>
          <Link href="/servicos" className="text-zinc-400 hover:text-yellow-400 transition-colors">Serviços</Link>
        </nav>
        <h1 className="text-4xl font-extrabold text-yellow-400 mb-4">Nossos Contatos</h1>
        <p className="text-zinc-300 text-lg mb-8">Nossa equipe está pronta para atender seu pedido ou firmar novas parcerias.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <h2 className="text-xl font-bold text-zinc-100 mb-1">Pedidos e Delivery</h2>
            <p className="text-zinc-400 text-sm mb-4">Atendimento direto aos clientes residenciais.</p>
            <p className="text-2xl font-bold text-green-400 mb-4">(43) 99674-9607</p>
            <a href="https://wa.me/5543996749607" target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-green-500 text-zinc-950 text-center font-bold rounded-lg hover:bg-green-400">Chamar no WhatsApp</a>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <h2 className="text-xl font-bold text-zinc-100 mb-1">Parcerias e B2B</h2>
            <p className="text-zinc-400 text-sm mb-4">Atendimento para fechamento de contratos empresariais.</p>
            <p className="text-2xl font-bold text-yellow-400 mb-4">(43) 99982-1401</p>
            <a href="https://wa.me/5543999821401" target="_blank" rel="noopener noreferrer" className="block w-full py-3 bg-yellow-400 text-zinc-950 text-center font-bold rounded-lg hover:bg-yellow-300">Contato Comercial</a>
          </div>
        </div>
      </div>
    </main>
  );
}
