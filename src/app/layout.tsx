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

const metadataBase = new URL("https://invitation-weld-two.vercel.app");

export const metadata: Metadata = {
  metadataBase,
  title: "Invitación a la revelación de Nuestro Hermoso Bebe 29 marzo",
  description:
    "Queremos compartir esta alegria contigo en nuestra celebracion de revelación de nuestro bebe",
  openGraph: {
    type: "website",
    title: "Invitación a la revelación de Nuestro Hermoso Bebe 29 marzo",
    description:
      "Queremos compartir esta alegria contigo en nuestra celebracion de revelación de nuestro bebe.",
    images: [
      {
        url: "https://invitation-weld-two.vercel.app/img-1200.png",
        width: 1200,
        height: 630,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Invitación a la revelación de Nuestro Hermoso Bebe 29 marzo",
    description:
      "Queremos compartir esta alegria contigo en nuestra celebracion de revelación de nuestro bebe",
    images: ["https://invitation-weld-two.vercel.app/img-1200.png"],
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
