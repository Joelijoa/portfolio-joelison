import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import "@/styles/globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joelison Joanna — Cybersecurity Engineer",
  description:
    "Portfolio de Joanna Joelison Voninjohary, étudiante en Cybersécurité & Cloud Computing, 3e année ISMAGI, Casablanca.",
  keywords: ["cybersécurité", "pentest", "forensics", "GRC", "ISO 27001", "cloud", "SIEM", "portfolio"],
  authors: [{ name: "Joelison Joanna Voninjohary" }],
  openGraph: {
    title: "Joelison Joanna — Cybersecurity Engineer",
    description: "Portfolio cybersécurité — GRC, Offense, Defense, Forensics",
    type: "website",
    locale: "fr_MA",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={`${poppins.variable} ${inter.variable}`}>
      <body>{children}</body>
    </html>
  );
}
