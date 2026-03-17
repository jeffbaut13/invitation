import type { Metadata } from "next";
import { Playfair_Display, Inter, Onest, Quicksand } from "next/font/google";
import AppHead from "./head";
import "./globals.css";

const headingFont = Onest({
  subsets: ["latin"],
  variable: "--font-heading",
});

const bodyFont = Quicksand({
  subsets: ["latin"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  title: "Revelacion de nuestro bebe",
  description: "Acompañanos en la revelacion de nuestro hermoso bebe",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <head>
        <AppHead />
      </head>
      <body className={`${headingFont.variable} ${bodyFont.variable}`}>
        {children}
      </body>
    </html>
  );
}
