import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "./_components/ui/sonner";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Nextcut",
  description: "O Nextcut é sua solução para agendamentos de serviços de beleza. Encontre e reserve horários em salões de beleza, barbearias e spas com facilidade e rapidez. Descubra profissionais qualificados e obtenha a melhor experiência de beleza",
  icons: {
    icon: ['./favicon.ico?v=4']
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body className={`${inter.className} dark`}>{children}
        <Toaster richColors />
      </body>
    </html>
  );
}
