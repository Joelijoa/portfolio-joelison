"use client";

import { motion } from "framer-motion";
import { contact } from "@/lib/data";

const links = [
  { label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { label: "LinkedIn", value: "Joanna Joelison", href: contact.linkedin },
  { label: "GitHub", value: "Joelijoa", href: contact.github },
  { label: "Téléphone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
  { label: "Localisation", value: contact.location, href: null },
];

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 border-t border-dim">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-20"
        >
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">05 — Contact</p>
          <h2
            className="font-display font-black leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            GET IN TOUCH
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Left: tagline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <p className="font-body text-muted leading-relaxed text-lg mb-8 max-w-sm">
              Ouverte aux opportunités de stage, alternance ou collaboration
              dans la cybersécurité, le GRC ou le DevSecOps.
            </p>
            <p className="font-mono text-xs text-muted mb-12">
              Casablanca, Maroc · GMT+1
            </p>

            {/* CV Download */}
            <a
              href="/cv.pdf"
              download
              className="inline-flex items-center gap-3 border border-white px-6 py-3 font-mono text-xs uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all duration-200"
            >
              <span>↓</span>
              Télécharger mon CV
            </a>
          </motion.div>

          {/* Right: links */}
          <motion.ul
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
            viewport={{ once: true }}
            className="space-y-0"
          >
            {links.map(({ label, value, href }, i) => (
              <motion.li
                key={label}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: "easeOut" }}
                viewport={{ once: true }}
                className="border-b border-dim py-5 flex items-center justify-between group"
              >
                <span className="font-mono text-xs text-muted uppercase tracking-widest">
                  {label}
                </span>
                {href ? (
                  <a
                    href={href}
                    target={href.startsWith("http") ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="font-mono text-sm text-white hover:text-muted transition-colors hover-underline"
                  >
                    {value}
                  </a>
                ) : (
                  <span className="font-mono text-sm text-muted">{value}</span>
                )}
              </motion.li>
            ))}
          </motion.ul>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-24 pt-8 border-t border-dim flex flex-col sm:flex-row items-center justify-between gap-4"
        >
          <span className="font-mono text-xs text-muted">
            © 2025 Joelison Joanna Voninjohary
          </span>
          <span className="font-mono text-xs text-muted">
            Built with Next.js · Deployed on Vercel
          </span>
        </motion.div>
      </div>
    </section>
  );
}
