import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Serviços B2B e Entrega de Refeições',
  description: 'Oferecemos delivery residencial na Zona Norte de Londrina e pacotes corporativos (B2B) para fornecimento de refeições em empresas.',
  keywords: ['pacotes refeicao empresa', 'fornecimento marmitex londrina', 'delivery zona norte'],
  alternates: { canonical: 'https://caseirinhasdatata.shop/servicos' },
};

export default function ServicosPage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'Fornecimento de Refeições B2B e B2C',
    'provider': { '@type': 'LocalBusiness', 'name': 'Caseirinhas da Tatá' }
  };

  return (
    <main className="min-h-screen bg-zinc-950 text-gray-100 p-6 md:p-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="max-w-4xl mx-auto">
        <nav className="mb-10 flex gap-4 text-sm border-b border-zinc-800 pb-4">
          <Link href="/" className="text-zinc-400 hover:text-yellow-400 transition-colors">&larr; Voltar para Home</Link>
          <Link href="/cardapio" className="text-zinc-400 hover:text-yellow-400 transition-colors">Cardápio</Link>
          <Link href="/contatos" className="text-zinc-400 hover:text-yellow-400 transition-colors">Contatos</Link>
        </nav>
        <h1 className="text-4xl font-extrabold text-yellow-400 mb-4">Nossos Serviços</h1>
        <p className="text-zinc-300 text-lg mb-8">Soluções completas em alimentação para você e sua equipe corporativa.</p>
        
        <div className="space-y-6">
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">Delivery Residencial Expresso</h2>
            <p className="text-zinc-400">Entregamos sua marmita quentinha, no horário exato, com foco na eficiência logística para todos os bairros da Zona Norte de Londrina.</p>
          </div>
          
          <div className="bg-zinc-900 border border-zinc-800 p-6 rounded-xl">
            <h2 className="text-2xl font-bold text-zinc-100 mb-2">Pacotes B2B Corporativos</h2>
            <p className="text-zinc-400 mb-4">Contratos mensais e semanais com empresas para alimentação de funcionários, com faturamento simplificado e controle de cardápio.</p>
            <a href="https://wa.me/5543999821401?text=Gostaria%20de%20uma%20proposta%20B2B" className="text-yellow-400 font-bold hover:underline">Solicitar Cotação B2B &rarr;</a>
          </div>
        </div>
      </div>
    </main>
  );
}
