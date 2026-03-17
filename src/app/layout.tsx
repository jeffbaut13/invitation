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

export const metadata: Metadata = {
  title: "Confirmacion de asistencia",
  description: "Invitacion personalizada para confirmar asistencia a un evento",
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
