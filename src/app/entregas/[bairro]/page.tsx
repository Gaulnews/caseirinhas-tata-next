import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { BotaoWhatsApp } from "@/components/BotaoWhatsApp";
import { bairros as bairrosAtendidos, bairroParaCluster, linkGrupoPromocionalPorCluster } from "@/lib/site-data";
import { tamanhos, formatarPreco } from "@/lib/cardapio-semanal";

type Props = {
  params: Promise<{ bairro: string }>;
};

// 2. Geração Estática de Rotas (Build Validation - Core Web Vitals)
export async function generateStaticParams() {
  return Object.keys(bairrosAtendidos).map((bairro) => ({
    bairro: bairro,
  }));
}

// 3. SEO Dinâmico (Metadados exclusivos para cada área de cobertura)
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { bairro } = await params;
  const nomeBairro = bairrosAtendidos[bairro as keyof typeof bairrosAtendidos] || "Londrina";

  return {
    title: `Marmita Caseira Delivery no ${nomeBairro}`,
    description: `Bateu a fome no ${nomeBairro}? Peça sua marmita caseira quentinha com entrega rápida. Opções a partir de R$ ${formatarPreco(tamanhos[0].preco)}. Faça seu pedido!`,
  };
}

// 4. O Server Component da Página
export default async function LocationPage({ params }: Props) {
  const { bairro } = await params;
  const nomeBairro = bairrosAtendidos[bairro as keyof typeof bairrosAtendidos];
  const cluster = bairroParaCluster[bairro];
  const linkGrupo = cluster ? linkGrupoPromocionalPorCluster[cluster] : undefined;

  // Se a pessoa digitar um bairro que não existe na URL, mostramos uma mensagem padrão
  if (!nomeBairro) {
    return (
      <main className="min-h-screen flex items-center justify-center text-center px-4">
        <h1 className="text-2xl text-amber-500 font-bold">Área de cobertura não encontrada em nossa rota específica.</h1>
      </main>
    );
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-16 text-center">
      <div className="inline-flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-black ring-1 ring-amber-500/40 mb-6 shadow-lg shadow-amber-500/20">
        <Image
          src="/emblema-caseirinhas-da-tata.png"
          alt="Emblema da logomarca Caseirinhas da Tatá: casa dourada com garfos cruzados"
          width={64}
          height={64}
          className="h-full w-full object-cover"
        />
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
          <li>✅ <strong className="text-zinc-300">Economia:</strong> Marmitas super bem servidas a partir de R$ {formatarPreco(tamanhos[0].preco)}.</li>
          <li>✅ <strong className="text-zinc-300">Qualidade:</strong> Ingredientes frescos e preparo diário.</li>
        </ul>
        
        <div className="flex justify-center">
          <BotaoWhatsApp 
            texto="VER CARDÁPIO E PEDIR AGORA" 
            url={`https://wa.me/5543996749607?text=Olá,%20estou%20no%20${nomeBairro}%20e%20gostaria%20de%20ver%20o%20cardápio!`} 
          />
        </div>
      </div>

      {linkGrupo && (
        <div className="mb-10 rounded-2xl bg-amber-500 p-8 text-center text-black">
          <h2 className="mb-2 text-xl font-bold">🎁 Grupo de Promoções do {nomeBairro}</h2>
          <p className="mb-6">
            Entre no grupo exclusivo da sua região e garanta prêmios sendo uma das 5 primeiras pessoas a bater a meta — sem sorteio.
          </p>
          <a
            href={linkGrupo}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-lg bg-black px-6 py-3 font-bold text-white transition-colors hover:bg-zinc-800"
          >
            Entrar no Grupo de Promoções
          </a>
        </div>
      )}

      <Link href="/" className="text-amber-500 hover:text-amber-400 text-sm font-bold underline underline-offset-4">
        ← Voltar para a página inicial
      </Link>
    </main>
  );
}
