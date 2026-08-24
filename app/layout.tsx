import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LingoTrail — Belajar bahasa jadi kebiasaan",
  description:
    "Susuri jalur belajar bahasamu setiap hari. Gratis, seru, dan terbukti efektif.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="id" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
