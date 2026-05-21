"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { contact } from "@/lib/data";

const FILE_ID   = "0x4A4A56F3";
const TIMESTAMP = "2025-11-15 08:23:41 UTC";

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const j1Ref = useRef<HTMLSpanElement>(null);
  const j2Ref = useRef<HTMLSpanElement>(null);

  const [fly1,   setFly1]   = useState({ x: 24, y: 300, scale: 12 });
  const [fly2,   setFly2]   = useState({ x: 24, y: 420, scale: 12 });
  const [navPos, setNavPos] = useState({ j1x: 24, j2x: 34, y: 21 });

  useEffect(() => {
    const measure = () => {
      if (!j1Ref.current || !j2Ref.current) return;
      const r1 = j1Ref.current.getBoundingClientRect();
      const r2 = j2Ref.current.getBoundingClientRect();
      const fs = parseFloat(getComputedStyle(j1Ref.current).fontSize);
      const s  = fs / 12;
      setFly1({ x: r1.left, y: r1.top, scale: s });
      setFly2({ x: r2.left, y: r2.top, scale: s });

      const btn = document.querySelector<HTMLElement>("[data-jj-logo]");
      if (btn) {
        const nr    = btn.getBoundingClientRect();
        const charW = nr.width / 3;
        const top   = nr.top + nr.height / 2 - 7;
        setNavPos({ j1x: nr.left, j2x: nr.left + charW, y: top });
      }
    };
    const t = setTimeout(measure, 80);
    window.addEventListener("resize", measure);
    return () => { clearTimeout(t); window.removeEventListener("resize", measure); };
  }, []);

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

  const j1X     = useTransform(spring, [0, 0.13], [fly1.x, navPos.j1x]);
  const j1Y     = useTransform(spring, [0, 0.13], [fly1.y, navPos.y]);
  const j1Scale = useTransform(spring, [0, 0.13], [fly1.scale, 1]);

  const j2X     = useTransform(spring, [0, 0.13], [fly2.x, navPos.j2x]);
  const j2Y     = useTransform(spring, [0, 0.13], [fly2.y, navPos.y]);
  const j2Scale = useTransform(spring, [0, 0.13], [fly2.scale, 1]);

  const flyOpacity = useTransform(spring, [0, 0.02, 0.11, 0.16], [0, 1, 1, 0]);

  const flyBase: React.CSSProperties = {
    position: "fixed",
    top: 0,
    left: 0,
    transformOrigin: "0 0",
    zIndex: 50,
    pointerEvents: "none",
  };

  return (
    <div ref={containerRef} id="hero" style={{ height: "240vh" }}>
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center px-4 sm:px-6 md:px-12 pt-24">
        <div className="max-w-[1400px] mx-auto w-full relative">

          {/* Terminal prompt */}
          <motion.div style={{ opacity: terminalOpacity }} className="mb-6 font-mono">
            <p className="text-[11px] mb-1">
              <span className="text-green-400">root@joelison:~$ </span>
              <span className="text-white/70">cat /db/personnel/{FILE_ID}.enc | decrypt --key=sys</span>
              <span className="blink text-white ml-0.5">&#9608;</span>
            </p>
            <p className="text-[10px] text-white/50">
              Decrypting... <span className="text-white">DONE</span> &middot; Accessing file...{" "}
              <span className="text-white">GRANTED</span>
            </p>
          </motion.div>

          {/* Classification badge */}
          <motion.div
            style={{ opacity: terminalOpacity }}
            className="flex items-center gap-3 mb-8"
          >
            <span className="font-mono text-[10px] border border-white text-white px-2 py-0.5 uppercase tracking-widest">
              &#9733; CLASSIFIED
            </span>
            <span className="font-mono text-[10px] text-white">
              {FILE_ID} &middot; {TIMESTAMP}
            </span>
          </motion.div>

          {/* Giant name — scroll-kinetic */}
          <motion.div
            style={{ scale: nameScale, y: nameY, opacity: nameOpacity }}
            className="origin-top-left mb-8"
          >
            <div
              className="font-display font-black leading-[0.85] tracking-tight text-white whitespace-nowrap"
              style={{ fontSize: "clamp(4rem, 13vw, 11rem)" }}
            >
              <span ref={j1Ref}>J</span>OELISON
            </div>
            <div
              className="font-display font-black leading-[0.85] tracking-tight text-white whitespace-nowrap"
              style={{ fontSize: "clamp(4rem, 13vw, 11rem)" }}
            >
              <span ref={j2Ref}>J</span>OANNA
            </div>
          </motion.div>

          {/* Dossier fields */}
          <motion.div style={{ opacity: dossierOpacity, y: dossierY }}>
            <div className="border border-dim font-mono text-xs max-w-2xl">
              {/* File header */}
              <div className="border-b border-dim px-5 py-3 flex items-center justify-between">
                <span className="text-white uppercase tracking-widest text-[10px]">
                  Personnel File &mdash; /sec/personnel/{FILE_ID}
                </span>
                <span className="text-white text-[10px]">CLEARANCE: L3</span>
              </div>

              {/* Fields */}
              <div className="px-4 sm:px-5 py-4 space-y-3">
                {([
                  ["NAME",        "JOELISON JOANNA VONINJOHARY",             "text-white"],
                  ["STATUS",      "&#9679; ACTIVE",                          "text-white"],
                  ["ROLE",        "Cybersecurity Engineer & Cloud Computing", "text-white"],
                  ["INSTITUTION", "ISMAGI — 3e Année Cycle Ingénieur",       "text-white"],
                  ["LOCATION",    "Rabat, Maroc  [34.0209°N, 6.8417°W]",    "text-white"],
                  ["AFFILIATION", "DataProtect · Neerelab Technology",        "text-white"],
                ] as const).map(([key, val, cls]) => (
                  <div key={key} className="grid grid-cols-[90px_1fr] sm:grid-cols-[130px_1fr] gap-2 sm:gap-4">
                    <span className="text-white">{key}:</span>
                    <span className={cls}>{val}</span>
                  </div>
                ))}

                {/* Threat level blocks */}
                <div className="grid grid-cols-[90px_1fr] sm:grid-cols-[130px_1fr] gap-2 sm:gap-4 pt-1">
                  <span className="text-white">THREAT LVL:</span>
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
                <span className="text-white uppercase tracking-widest">Channels:</span>
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
                    className="text-white hover:text-white transition-colors hover-underline uppercase tracking-widest"
                  >
                    {label}
                  </a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Flying J from JOELISON to nav */}
        <motion.span
          aria-hidden
          style={{ ...flyBase, x: j1X, y: j1Y, scale: j1Scale, opacity: flyOpacity }}
          className="font-mono font-black text-white text-xs"
        >
          J
        </motion.span>

        {/* Flying J from JOANNA to nav */}
        <motion.span
          aria-hidden
          style={{ ...flyBase, x: j2X, y: j2Y, scale: j2Scale, opacity: flyOpacity }}
          className="font-mono font-black text-white text-xs"
        >
          J
        </motion.span>

        {/* Scroll indicator */}
        <motion.div
          style={{ opacity: scrollIndOpacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-white">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-8 bg-gradient-to-b from-white/60 to-transparent"
          />
        </motion.div>

        {/* Corner sys-info */}
        <div className="absolute bottom-6 right-6 font-mono text-[9px] text-white text-right leading-relaxed hidden md:block">
          <div>FILE: {FILE_ID}</div>
          <div>SYS: COMPROMISED</div>
          <div>ACCESS: ROOT</div>
        </div>
      </div>
    </div>
  );
}
