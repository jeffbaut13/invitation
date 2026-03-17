import type { Metadata } from "next";
import { Playfair_Display, Inter, Onest, Quicksand } from "next/font/google";
import "./globals.css";

const headingFont = Onest({
  subsets: ["latin"],
  variable: "--font-heading",
});

const bodyFont = Quicksand({
  subsets: ["latin"],
  variable: "--font-body",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;
const metadataBase = siteUrl ? new URL(siteUrl) : undefined;

export const metadata: Metadata = {
  metadataBase,
  title: "Invitación a la revelación de Nuestro Hermoso Bebe este 29 marzo",
  description: "Acompañanos en este momento tan especial para revelar el sexo de nuestro hermoso bebe. Queremos compartir esta alegria contigo en nuestra celebracion.",
  openGraph: {
    type: "website",
    title: "Revelacion de Nuestro Hermoso Bebe - Te Esperamos",
    description: "Acompañanos en este momento tan especial para revelar el sexo de nuestro hermoso bebe. Queremos compartir esta alegria contigo en nuestra celebracion.",
    images: [
      {
        url: "/img-1200.png",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Revelacion de Nuestro Hermoso Bebe - Te Esperamos",
    description: "Acompañanos en este momento tan especial para revelar el sexo de nuestro hermoso bebe. Queremos compartir esta alegria contigo en nuestra celebracion.",
    images: ["/img-1200.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
