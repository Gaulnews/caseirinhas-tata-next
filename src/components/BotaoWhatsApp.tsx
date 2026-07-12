'use client';

export function BotaoWhatsApp({ texto, url }: { texto: string; url: string }) {
  const handleClique = () => {
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <button
      type="button"
      onClick={handleClique}
      className="w-full sm:w-auto inline-flex items-center justify-center font-black px-8 py-4 rounded-full text-lg transition-transform transform hover:scale-105 shadow-xl bg-amber-500 hover:bg-amber-600 text-zinc-950 focus:outline-none focus:ring-2 focus:ring-amber-500"
    >
      {texto}
    </button>
  );
}