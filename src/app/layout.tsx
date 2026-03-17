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
  title: "Revelacion de nuestro bebe",
  description: "Acompañanos en la revelacion de nuestro hermoso bebe",
  openGraph: {
    type: "website",
    title: "Revelacion de nuestro bebe",
    description: "Acompañanos en la revelacion de nuestro hermoso bebe",
    images: [
      {
        url: "/img-500.png",
        width: 500,
        height: 500,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Revelacion de nuestro bebe",
    description: "Acompañanos en la revelacion de nuestro hermoso bebe",
    images: ["/img-500.png"],
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
