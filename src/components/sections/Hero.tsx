"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { contact } from "@/lib/data";

const FILE_ID   = "0x4A4A56F3";
const TIMESTAMP = "2025-11-15 08:23:41 UTC";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });
  const spring = useSpring(scrollYProgress, { stiffness: 60, damping: 20 });

  const nameScale   = useTransform(spring, [0, 0.55], [1, 0.3]);
  const nameY       = useTransform(spring, [0, 0.55], ["0%", "-55%"]);
  const nameOpacity = useTransform(spring, [0.38, 0.6], [1, 0]);

  const dossierOpacity = useTransform(spring, [0.06, 0.38], [0, 1]);
  const dossierY       = useTransform(spring, [0.06, 0.38], [90, 0]);

  const terminalOpacity  = useTransform(spring, [0, 0.08], [1, 0]);
  const scrollIndOpacity = useTransform(spring, [0, 0.1],  [1, 0]);

  return (
    <div ref={containerRef} id="hero" style={{ height: "240vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center px-6 md:px-12">
        <div className="max-w-[1400px] mx-auto w-full relative">

          {/* Terminal prompt — fades on scroll */}
          <motion.div style={{ opacity: terminalOpacity }} className="mb-6 font-mono">
            <p className="text-[11px] mb-1">
              <span className="text-muted">root@compromised:~$ </span>
              <span className="text-white">cat /db/personnel/{FILE_ID}.enc | decrypt --key=sys</span>
              <span className="blink text-white ml-0.5">█</span>
            </p>
            <p className="text-[10px] text-muted/50">
              Decrypting... <span className="text-white">DONE</span> · Accessing file...{" "}
              <span className="text-white">GRANTED</span>
            </p>
          </motion.div>

          {/* Classification badge */}
          <motion.div
            style={{ opacity: terminalOpacity }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="font-mono text-[10px] border border-white text-white px-2 py-0.5 uppercase tracking-widest">
              ★ CLASSIFIED
            </span>
            <span className="font-mono text-[10px] text-muted">
              {FILE_ID} · {TIMESTAMP}
            </span>
          </motion.div>

          {/* ── Giant name — scroll-kinetic ── */}
          <motion.div
            style={{ scale: nameScale, y: nameY, opacity: nameOpacity }}
            className="origin-top-left mb-8"
          >
            <div
              className="font-display font-black leading-[0.85] tracking-tight text-white whitespace-nowrap"
              style={{ fontSize: "clamp(4rem, 13vw, 11rem)" }}
            >
              JOELISON
            </div>
            <div
              className="font-display font-black leading-[0.85] tracking-tight text-muted whitespace-nowrap"
              style={{ fontSize: "clamp(4rem, 13vw, 11rem)" }}
            >
              JOANNA
            </div>
          </motion.div>

          {/* ── Dossier fields — reveals as name shrinks ── */}
          <motion.div style={{ opacity: dossierOpacity, y: dossierY }}>
            <div className="border border-dim font-mono text-xs max-w-2xl">
              {/* File header */}
              <div className="border-b border-dim px-5 py-3 flex items-center justify-between">
                <span className="text-white uppercase tracking-widest text-[10px]">
                  Personnel File — /sec/personnel/{FILE_ID}
                </span>
                <span className="text-muted text-[10px]">CLEARANCE: L3</span>
              </div>

              {/* Fields */}
              <div className="px-5 py-4 space-y-3">
                {([
                  ["NAME",        "JOELISON JOANNA VONINJOHARY",                "text-white"],
                  ["STATUS",      "● ACTIVE",                                    "text-white"],
                  ["ROLE",        "Cybersecurity Engineer & Cloud Computing",    "text-white"],
                  ["INSTITUTION", "ISMAGI — 3e Année",                           "text-muted"],
                  ["LOCATION",    "Casablanca, Maroc  [33.5731°N, 7.5898°W]",   "text-muted"],
                  ["AFFILIATION", "Dataprotect (PFE) · Neerelab Technology",    "text-muted"],
                ] as const).map(([key, val, cls]) => (
                  <div key={key} className="grid grid-cols-[130px_1fr] gap-4">
                    <span className="text-muted/60">{key}:</span>
                    <span className={cls}>{val}</span>
                  </div>
                ))}

                {/* Threat level blocks */}
                <div className="grid grid-cols-[130px_1fr] gap-4 pt-1">
                  <span className="text-muted/60">THREAT LVL:</span>
                  <div className="flex items-center gap-2">
                    <div className="flex gap-0.5">
                      {Array.from({ length: 10 }).map((_, i) => (
                        <motion.div
                          key={i}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.6 + i * 0.07 }}
                          className={`w-3.5 h-2 ${i < 8 ? "bg-white" : "bg-dim"}`}
                        />
                      ))}
                    </div>
                    <span className="text-white">ELEVATED</span>
                  </div>
                </div>
              </div>

              {/* Channels footer */}
              <div className="border-t border-dim px-5 py-3 flex flex-wrap gap-5 text-[10px]">
                <span className="text-muted/50 uppercase tracking-widest">Channels:</span>
                {[
                  { label: "GitHub",   href: contact.github,               ext: true  },
                  { label: "LinkedIn", href: contact.linkedin,              ext: true  },
                  { label: "Email",    href: `mailto:${contact.email}`,     ext: false },
                ].map(({ label, href, ext }) => (
                  <a
                    key={label}
                    href={href}
                    target={ext ? "_blank" : undefined}
                    rel="noopener noreferrer"
                    className="text-muted hover:text-white transition-colors hover-underline uppercase tracking-widest"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollIndOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-muted">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"
          />
        </motion.div>

        {/* Corner sys-info */}
        <div className="absolute bottom-6 right-6 font-mono text-[9px] text-white/10 text-right leading-relaxed hidden md:block">
          <div>FILE: {FILE_ID}</div>
          <div>SYS: COMPROMISED</div>
          <div>ACCESS: ROOT</div>
        </div>
      </div>
    </div>
  );
}
