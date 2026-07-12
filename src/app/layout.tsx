import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Caseirinhas da Tatá | Marmitas Caseiras em Londrina",
  description: "Marmitas caseiras feitas com amor e entregues quentinhas na sua porta em Londrina. Opções de R$ 18,00 a R$ 28,00. Peça já pelo WhatsApp!",
  // Nova linha adicionada para a verificação oficial do Google
  verification: {
    google: "ULg0PgIpmiyD8TnG0iN6dsWfw9g2U0Pe6sx7G0hf4yw",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} bg-zinc-950 text-zinc-50 antialiased selection:bg-amber-500 selection:text-black`}>
        {children}
      </body>
    </html>
  );
}