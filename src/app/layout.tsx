import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
import "@/styles/globals.css";
import CustomCursor from "@/components/CustomCursor";
import { contact } from "@/lib/data";

const BASE_URL = "https://portfolio-joelison-efbp.vercel.app";

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  variable: "--font-jetbrains",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: "Joelison Joanna Voninjohary | Cybersecurity Engineer & Cloud Computing",
    template: "%s | Joelison Joanna",
  },
  description:
    "Portfolio de Joanna Joelison Voninjohary, ingénieure Cybersécurité & Cloud Computing basée à Rabat, Maroc. GRC, ISO 27001, pentest, forensics, SOC, DevSecOps.",
  keywords: [
    "Joanna Joelison",
    "cybersécurité",
    "pentest",
    "forensics",
    "GRC",
    "ISO 27001",
    "DNSSI",
    "cloud",
    "SIEM",
    "SOC",
    "DevSecOps",
    "portfolio ingénieur sécurité",
    "Rabat Maroc",
  ],
  authors: [{ name: "Joelison Joanna Voninjohary" }],
  creator: "Joelison Joanna Voninjohary",
  alternates: {
    canonical: BASE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
  openGraph: {
    title: "Joelison Joanna Voninjohary | Cybersecurity Engineer & Cloud Computing",
    description:
      "Portfolio cybersécurité — GRC, Offense, Défense, Forensics, Cloud & DevSecOps.",
    url: BASE_URL,
    siteName: "Joelison Joanna | Portfolio",
    type: "website",
    locale: "fr_MA",
  },
  twitter: {
    card: "summary_large_image",
    title: "Joelison Joanna Voninjohary | Cybersecurity Engineer",
    description:
      "Portfolio cybersécurité — GRC, Offense, Défense, Forensics, Cloud & DevSecOps.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Joelison Joanna Voninjohary",
  jobTitle: "Cybersecurity Engineer & Cloud Computing",
  description:
    "Ingénieure Cybersécurité & Cloud Computing — GRC, ISO 27001, pentest, forensics, SOC, DevSecOps.",
  url: BASE_URL,
  email: contact.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Rabat",
    addressCountry: "MA",
  },
  sameAs: [contact.linkedin, contact.github],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr" className={jetbrains.variable}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}
