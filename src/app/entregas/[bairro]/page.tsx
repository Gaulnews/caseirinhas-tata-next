import { Metadata } from "next";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";

// 1. Dicionário de Bairros (Adicione quantos quiser)
const bairrosAtendidos = {
  "centro": "Centro",
  "gleba-palhano": "Gleba Palhano",
  "jardim-bancarios": "Jardim Bancários",
  "centro-civico": "Centro Cívico",
  "igapo": "Região do Igapó"
};

type Props = {
  params: { bairro: string };
};

// 2. Geração Estática de Rotas (Build Validation - Core Web Vitals)
export async function generateStaticParams() {
  return Object.keys(bairrosAtendidos).map((bairro) => ({
    bairro: bairro,
  }));
}

// 3. SEO Dinâmico (Metadados exclusivos para cada bairro)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const nomeBairro = bairrosAtendidos[params.bairro as keyof typeof bairrosAtendidos] || "Londrina";
  
  return {
    title: `Marmita Caseira Delivery no ${nomeBairro} | Caseirinhas da Tatá`,
    description: `Bateu a fome no ${nomeBairro}? Peça sua marmita caseira quentinha com entrega rápida. Opções a partir de R$ 18,00. Faça seu pedido!`,
  };
}

// 4. O Server Component da Página
export default function LocationPage({ params }: Props) {
  const nomeBairro = bairrosAtendidos[params.bairro as keyof typeof bairrosAtendidos];

  // Se a pessoa digitar um bairro que não existe na URL, mostramos uma mensagem padrão
  if (!nomeBairro) {
    return (
      <main className="min-h-screen flex items-center justify-center text-center px-4">
        <h1 className="text-2xl text-amber-500 font-bold">Bairro não encontrado em nossa rota específica.</h1>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-500 text-zinc-950 font-black text-2xl mb-6 shadow-lg shadow-amber-500/20">
        CT
      </div>
      
      <h1 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">
        Delivery de Marmita Caseira no <span className="text-amber-500">{nomeBairro}</span>
      </h1>
      
      <p className="text-lg text-zinc-400 mb-8 font-medium">
        Trabalha ou mora no <strong className="text-zinc-300">{nomeBairro}</strong>? A Caseirinhas da Tatá leva até você o melhor almoço da região. Comida caseira de verdade, tempero de mãe e entrega rápida!
      </p>
      
      <div className="bg-zinc-900/50 border border-zinc-800 p-8 rounded-2xl mb-10 text-left">
        <h2 className="text-2xl font-bold text-zinc-100 mb-4">Por que pedir com a gente?</h2>
        <ul className="space-y-3 text-zinc-400 mb-8">
          <li>✅ <strong className="text-zinc-300">Praticidade:</strong> Chega rapidinho aí no {nomeBairro}.</li>
          <li>✅ <strong className="text-zinc-300">Economia:</strong> Marmitas super bem servidas a partir de R$ 18,00.</li>
          <li>✅ <strong className="text-zinc-300">Qualidade:</strong> Ingredientes frescos e preparo diário.</li>
        </ul>
        
        <div className="flex justify-center">
          <BotaoWhatsApp 
            texto="VER CARDÁPIO E PEDIR AGORA" 
            url={`https://wa.me/5543996749607?text=Olá,%20estou%20no%20${nomeBairro}%20e%20gostaria%20de%20ver%20o%20cardápio!`} 
          />
        </div>
      </div>
      
      <a href="/" className="text-amber-500 hover:text-amber-400 text-sm font-bold underline underline-offset-4">
        ← Voltar para a página inicial
      </a>
    </main>
  );
}
