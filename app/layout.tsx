import type { Metadata } from "next";
import { Bricolage_Grotesque, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "SAVORY — Premium Craft Burgers, Pizza & Shawarma",
  description: "A playful food brand & modern e-commerce experience selling artisanal double smash burgers, wood-fired pepperoni pizza, and authentic slow-roasted chicken shawarma.",
  keywords: ["burgers", "pizza", "shawarma", "fast food", "fast casual", "craft food", "food delivery"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${plusJakarta.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#F7F4ED] text-[#123C2B] font-body selection:bg-[#123C2B] selection:text-[#F7F4ED]">
        {children}
      </body>
    </html>
  );
}
