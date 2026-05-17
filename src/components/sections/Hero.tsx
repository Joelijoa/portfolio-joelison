"use client";

import { motion } from "framer-motion";
import { contact } from "@/lib/data";

const stagger = {
  container: { transition: { staggerChildren: 0.12 } },
  item: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-20 pb-16 px-6"
    >
      <div className="max-w-6xl mx-auto w-full">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex items-center gap-3 mb-10"
        >
          <div className="w-8 h-px bg-white" />
          <span className="font-mono text-xs tracking-widest uppercase text-muted">
            Access Granted — System Online
          </span>
        </motion.div>

        {/* Main name */}
        <motion.div
          variants={stagger.container}
          initial="initial"
          animate="animate"
          className="mb-8"
        >
          <motion.h1
            variants={stagger.item}
            className="font-display font-black leading-[0.9] tracking-tight"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
          >
            JOELISON
          </motion.h1>
          <motion.h1
            variants={stagger.item}
            className="font-display font-black leading-[0.9] tracking-tight text-muted"
            style={{ fontSize: "clamp(3.5rem, 10vw, 9rem)" }}
          >
            JOANNA
          </motion.h1>
        </motion.div>

        {/* Title + location */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
          className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-6 mb-12"
        >
          <span className="font-mono text-sm tracking-wide text-white">
            Cybersecurity Engineer
          </span>
          <span className="hidden sm:block w-px h-4 bg-dim" />
          <span className="font-mono text-xs text-muted">
            3e année ISMAGI · Casablanca, Maroc
          </span>
        </motion.div>

        {/* Bio */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55, ease: "easeOut" }}
          className="font-body text-muted leading-relaxed max-w-xl mb-4 text-[0.95rem]"
        >
          Étudiante en Cybersécurité &amp; Cloud Computing, je combine expertise
          offensive et défensive — du pentest à la conformité GRC, en passant par
          l&apos;analyse forensique et le déploiement de SIEM.
        </motion.p>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
          className="font-body text-muted leading-relaxed max-w-xl mb-12 text-[0.95rem]"
        >
          Actuellement en stage PFE chez{" "}
          <span className="text-white">Dataprotect</span>, je développe un outil
          d&apos;audit digitalisé conforme ISO 27001 &amp; DNSSI.
        </motion.p>

        {/* Links */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.75, ease: "easeOut" }}
          className="flex flex-wrap items-center gap-6"
        >
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-underline font-mono text-xs text-muted hover:text-white transition-colors uppercase tracking-widest"
          >
            GitHub
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover-underline font-mono text-xs text-muted hover:text-white transition-colors uppercase tracking-widest"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${contact.email}`}
            className="hover-underline font-mono text-xs text-muted hover:text-white transition-colors uppercase tracking-widest"
          >
            Email
          </a>
          <button
            onClick={() =>
              document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })
            }
            className="ml-auto font-mono text-xs uppercase tracking-widest text-muted hover:text-white transition-colors flex items-center gap-2"
          >
            Voir les projets
            <span className="text-base">↓</span>
          </button>
        </motion.div>

        {/* Decorative grid line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 h-px bg-dim origin-left"
        />
      </div>
    </section>
  );
}
