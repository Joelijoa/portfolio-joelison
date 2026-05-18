import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import CustomCursor from "@/components/CustomCursor";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Joelison Joanna | Cybersecurity Engineer",
  description:
    "Portfolio de Joanna Joelison Voninjohary, etudiante en Cybersecurite & Cloud Computing, 3e annee ISMAGI, Rabat.",
  keywords: ["cybersecurite", "pentest", "forensics", "GRC", "ISO 27001", "cloud", "SIEM", "portfolio"],
  authors: [{ name: "Joelison Joanna Voninjohary" }],
  openGraph: {
    title: "Joelison Joanna | Cybersecurity Engineer",
    description: "Portfolio cybersecurite - GRC, Offense, Defense, Forensics",
    type: "website",
    locale: "fr_MA",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={jetbrains.variable}>
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
