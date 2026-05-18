"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BinaryRain from "@/components/BinaryRain";

const ROLES = [
  "Cybersecurity Engineer",
  "GRC & Conformité ISO 27001",
  "SOC · Pentest · Forensics",
  "Cloud & DevSecOps",
];

/* ── Binary-to-text decrypt hook ─────────────────────────── */
function useDecryptText(text: string, active: boolean, baseDelay = 0, perChar = 70) {
  const [chars, setChars] = useState<string[]>(() =>
    text.split("").map(c => (c === " " ? " " : "0"))
  );

  useEffect(() => {
    if (!active) {
      setChars(text.split("").map(c => (c === " " ? " " : "0")));
      return;
    }

    const target  = text.split("");
    const settled = target.map(c => c === " ");

    const iv = setInterval(() => {
      setChars(target.map((c, i) =>
        settled[i] ? c : (Math.random() > 0.5 ? "1" : "0")
      ));
    }, 50);

    const timers = target.map((_, i) =>
      target[i] === " "
        ? null
        : setTimeout(() => { settled[i] = true; }, baseDelay + i * perChar + Math.random() * 90)
    );

    return () => {
      clearInterval(iv);
      timers.forEach(t => t && clearTimeout(t));
    };
  }, [active, text, baseDelay, perChar]);

  return chars;
}

/* ── Main ────────────────────────────────────────────────── */
interface Props { onEnter: () => void }

export default function LandingPage({ onEnter }: Props) {
  const [phase,   setPhase]   = useState<"rain" | "reveal" | "ready">("rain");
  const [roleIdx, setRoleIdx] = useState(0);

  /* Phase transitions */
  useEffect(() => {
    const t1 = setTimeout(() => setPhase("reveal"), 1000);
    const t2 = setTimeout(() => setPhase("ready"),  3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  /* Cycle roles once ready */
  useEffect(() => {
    if (phase !== "ready") return;
    const iv = setInterval(() => setRoleIdx(n => (n + 1) % ROLES.length), 2200);
    return () => clearInterval(iv);
  }, [phase]);

  /* Enter on key */
  useEffect(() => {
    if (phase !== "ready") return;
    const h = (e: KeyboardEvent) => { if (e.key === "Enter") onEnter(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [phase, onEnter]);

  const nameActive = phase !== "rain";
  const line1 = useDecryptText("JOELISON", nameActive, 0,   75);
  const line2 = useDecryptText("JOANNA",   nameActive, 320, 85);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-30 select-none overflow-hidden"
    >
      <BinaryRain />

      {/* Corner brackets */}
      <div className="fixed top-5 left-5  w-6 h-6 border-t border-l border-white/20 pointer-events-none" />
      <div className="fixed top-5 right-5 w-6 h-6 border-t border-r border-white/20 pointer-events-none" />
      <div className="fixed bottom-5 left-5  w-6 h-6 border-b border-l border-white/20 pointer-events-none" />
      <div className="fixed bottom-5 right-5 w-6 h-6 border-b border-r border-white/20 pointer-events-none" />

      {/* Corner labels — hidden on xs */}
      <div className="fixed top-5 left-12 h-6 hidden sm:flex items-center font-mono text-[9px] text-green-400/60 uppercase tracking-widest pointer-events-none">
        root@joelison:~$
      </div>
      <div className="fixed top-5 right-12 h-6 hidden md:flex items-center font-mono text-[9px] text-white/30 uppercase tracking-widest pointer-events-none">
        CLEARANCE L4 &middot; ELEVATED
      </div>
      <div className="fixed bottom-5 left-12 h-6 hidden md:flex items-center font-mono text-[9px] text-white/30 uppercase tracking-widest pointer-events-none">
        34.02&deg;N &middot; 6.84&deg;W
      </div>
      <div className="fixed bottom-5 right-12 h-6 hidden sm:flex items-center font-mono text-[9px] text-white/30 uppercase tracking-widest pointer-events-none">
        Rabat &middot; Maroc
      </div>

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center gap-6 px-4 w-full">

        {/* Name — decrypt from binary */}
        <AnimatePresence>
          {nameActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              className="text-center leading-none"
            >
              {[line1, line2].map((line, li) => (
                <div
                  key={li}
                  className="font-display font-black tracking-tight leading-none"
                  style={{ fontSize: "clamp(3rem, 13vw, 9rem)" }}
                >
                  {line.map((c, i) => (
                    <span
                      key={i}
                      className={
                        c === "0" || c === "1"
                          ? "text-white/30 font-mono"
                          : "text-white"
                      }
                      style={c !== "0" && c !== "1" ? {} : {
                        fontSize: "clamp(1.4rem, 6vw, 4rem)",
                        verticalAlign: "middle",
                      }}
                    >
                      {c}
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Meta + CTA — appears when ready */}
        <AnimatePresence>
          {phase === "ready" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.15 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="h-px bg-white/15 w-40" />

              {/* Cycling role */}
              <div className="h-5 overflow-hidden">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={roleIdx}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0,  opacity: 1 }}
                    exit={{ y: -20,   opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="block font-mono text-[10px] text-green-400 uppercase tracking-[0.22em] text-center"
                  >
                    {ROLES[roleIdx]}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* CTA */}
              <button
                onClick={onEnter}
                className="group relative mt-2 w-fit font-mono text-[11px] uppercase tracking-[0.28em] border border-white/35 hover:border-white px-8 py-3 text-white transition-all duration-200 overflow-hidden"
              >
                <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                  [&#8629;]&nbsp;&nbsp;ENTER SYSTEM
                </span>
              </button>

              <div className="flex items-center gap-2 font-mono text-[9px] text-white/30">
                <motion.span
                  animate={{ opacity: [1, 0.15, 1] }}
                  transition={{ duration: 1.3, repeat: Infinity }}
                  className="w-1 h-1 rounded-full bg-white/20 inline-block"
                />
                <span>press Enter or click to initiate system scan</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
