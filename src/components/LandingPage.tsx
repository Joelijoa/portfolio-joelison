"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

/*  JOANNA — each letter 5 wide, 1-space separator  */
const ASCII_LINES = [
  "  ██   ███   ███  █   █ █   █  ███ ",
  "  ██  █   █ █   █ ██  █ ██  █ █   █",
  "  ██  █   █ █████ █ █ █ █ █ █ █████",
  "█ ██  █   █ █   █ █  ██ █  ██ █   █",
  " ███   ███  █   █ █   █ █   █ █   █",
];

/*  Skull — 11 chars wide, 9 rows  */
const SKULL_LINES = [
  "  ███████  ",
  " █████████ ",
  "███████████",
  "██  ███  ██",
  "███  █  ███",
  "███████████",
  " █████████ ",
  " ██  █  ██ ",
  " █████████ ",
];

const SKULL_META = [
  { label: "THREAT",   value: "ELEVATED" },
  { label: "STATUS",   value: "● ACTIVE"  },
  { label: "ORIGIN",   value: "CASABLANCA" },
  { label: "CLEARANCE",value: "L4"        },
];

/*  Boot sequence  */
const BOOT_LINES = [
  "Initializing secure environment...",
  "Loading operator profile...",
  "Verifying clearance: L4 ELEVATED",
  "All systems nominal. Ready.",
];
const BOOT_GAPS = [500, 400, 380, 400];

interface Props { onEnter: () => void }

export default function LandingPage({ onEnter }: Props) {
  const [asciiIdx, setAsciiIdx] = useState(0);
  const [bootIdx,  setBootIdx]  = useState(0);
  const [showCta,  setShowCta]  = useState(false);
  const [showSkull, setShowSkull] = useState(false);

  /* Reveal ASCII lines */
  useEffect(() => {
    if (asciiIdx >= ASCII_LINES.length) return;
    const t = setTimeout(() => setAsciiIdx((i) => i + 1), asciiIdx === 0 ? 120 : 70);
    return () => clearTimeout(t);
  }, [asciiIdx]);

  /* Show skull when ASCII is done */
  useEffect(() => {
    if (asciiIdx >= ASCII_LINES.length) setShowSkull(true);
  }, [asciiIdx]);

  /* Boot sequence */
  useEffect(() => {
    if (asciiIdx < ASCII_LINES.length) return;
    if (bootIdx >= BOOT_LINES.length) return;
    const t = setTimeout(() => setBootIdx((i) => i + 1), BOOT_GAPS[bootIdx] ?? 400);
    return () => clearTimeout(t);
  }, [asciiIdx, bootIdx]);

  /* CTA */
  useEffect(() => {
    if (bootIdx < BOOT_LINES.length) return;
    const t = setTimeout(() => setShowCta(true), 350);
    return () => clearTimeout(t);
  }, [bootIdx]);

  /* Enter key */
  useEffect(() => {
    if (!showCta) return;
    const h = (e: KeyboardEvent) => { if (e.key === "Enter") onEnter(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [showCta, onEnter]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 bg-black flex flex-col justify-center z-30 select-none overflow-hidden"
    >
      {/* Scanlines */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.013) 2px, rgba(255,255,255,0.013) 4px)",
        }}
      />

      {/* Corners */}
      <div className="absolute top-5 left-5 w-5 h-5 border-t border-l border-white/15" />
      <div className="absolute top-5 right-5 w-5 h-5 border-t border-r border-white/15" />
      <div className="absolute bottom-5 left-5 w-5 h-5 border-b border-l border-white/15" />
      <div className="absolute bottom-5 right-5 w-5 h-5 border-b border-r border-white/15" />

      {/* Top bar */}
      <div className="absolute top-5 left-0 right-0 flex justify-between px-8 sm:px-14 font-mono text-[9px] text-white/20 uppercase tracking-widest">
        <span>root@compromised:~</span>
        <span>CLEARANCE L4 · ELEVATED</span>
      </div>

      {/* Two-column layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-0 px-8 sm:px-14 w-full max-w-[1400px] mx-auto">

        {/* ── LEFT: name + boot ── */}
        <div className="flex flex-col justify-center">

          {/* ASCII art */}
          <div className="mb-6 overflow-x-auto" style={{ scrollbarWidth: "none" }}>
            {ASCII_LINES.map((line, i) => (
              <div key={i} style={{ height: i < asciiIdx ? undefined : 0, overflow: "hidden" }}>
                <motion.pre
                  initial={{ opacity: 0, x: -8 }}
                  animate={i < asciiIdx ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.12 }}
                  className="font-mono leading-snug whitespace-pre text-white"
                  style={{ fontSize: "clamp(9px, 1.5vw, 15px)" }}
                >
                  {line}
                </motion.pre>
              </div>
            ))}
          </div>

          {/* Subtitle */}
          {asciiIdx >= ASCII_LINES.length && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="font-mono text-[10px] text-white/30 uppercase tracking-[0.28em] mb-6"
            >
              Cybersecurity Engineer · Cloud Computing · GRC
            </motion.div>
          )}

          {/* Divider */}
          {asciiIdx >= ASCII_LINES.length && (
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.4 }}
              className="origin-left h-px bg-white/12 w-56 mb-6"
            />
          )}

          {/* Boot sequence */}
          <div className="space-y-2 mb-6">
            {BOOT_LINES.slice(0, bootIdx).map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -4 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.18 }}
                className="flex items-center gap-3 font-mono text-[10px]"
              >
                <span className="text-white/20 shrink-0">$</span>
                <span className={i === bootIdx - 1 && bootIdx < BOOT_LINES.length ? "text-white/60" : "text-white/30"}>
                  {line}
                </span>
                {i < bootIdx - 1 && <span className="text-white/40 text-[9px]">✓</span>}
                {i === bootIdx - 1 && bootIdx < BOOT_LINES.length && (
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.7, repeat: Infinity }}
                    className="text-white/50"
                  >_</motion.span>
                )}
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <AnimatePresence>
            {showCta && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
                className="flex flex-col gap-3"
              >
                <button
                  onClick={onEnter}
                  className="group relative w-fit font-mono text-[11px] uppercase tracking-[0.28em] border border-white/40 hover:border-white px-8 py-3 text-white/50 hover:text-white transition-all duration-200 overflow-hidden"
                >
                  <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
                  <span className="relative z-10 group-hover:text-black transition-colors duration-300">
                    [↵]&nbsp;&nbsp;ENTER SYSTEM
                  </span>
                </button>
                <div className="flex items-center gap-2 font-mono text-[9px] text-white/20">
                  <motion.span
                    animate={{ opacity: [1, 0.15, 1] }}
                    transition={{ duration: 1.3, repeat: Infinity }}
                    className="w-1 h-1 rounded-full bg-white/30 inline-block"
                  />
                  <span>press Enter or click to initiate system scan</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* ── RIGHT: skull ── */}
        <div className="hidden lg:flex flex-col items-center justify-center gap-8">
          <AnimatePresence>
            {showSkull && (
              <motion.div
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="flex flex-col items-center gap-6"
              >
                {/* Skull glitch wrapper */}
                <motion.div
                  animate={{ opacity: [1, 0.85, 1, 0.92, 1] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  className="relative"
                >
                  {/* Skull art */}
                  <div className="font-mono leading-snug text-white text-center"
                    style={{ fontSize: "clamp(18px, 2.8vw, 32px)" }}
                  >
                    {SKULL_LINES.map((line, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: i * 0.05, duration: 0.2 }}
                      >
                        <pre className="whitespace-pre">{line}</pre>
                      </motion.div>
                    ))}
                  </div>

                  {/* Scan line that sweeps over skull */}
                  <motion.div
                    className="absolute left-0 right-0 h-px bg-white/20 pointer-events-none"
                    animate={{ top: ["0%", "100%", "0%"] }}
                    transition={{ duration: 3.5, repeat: Infinity, ease: "linear" }}
                  />
                </motion.div>

                {/* Metadata below skull */}
                <div className="border border-white/10 px-5 py-3 w-full max-w-[220px]">
                  <div className="font-mono text-[8px] text-white/20 uppercase tracking-widest mb-3">
                    $ status --operator
                  </div>
                  <div className="space-y-1.5">
                    {SKULL_META.map(({ label, value }, i) => (
                      <motion.div
                        key={label}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.5 + i * 0.1 }}
                        className="flex justify-between font-mono text-[9px]"
                      >
                        <span className="text-white/25 uppercase tracking-widest">{label}</span>
                        <span className={value.startsWith("●") ? "text-white" : "text-white/55"}>
                          {value}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                  <div className="mt-3 pt-2 border-t border-white/10 font-mono text-[8px] text-white/20 flex justify-between">
                    <span>UPTIME</span>
                    <motion.span
                      animate={{ opacity: [1, 0.3, 1] }}
                      transition={{ duration: 1.8, repeat: Infinity }}
                    >
                      RUNNING...
                    </motion.span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="absolute bottom-5 left-0 right-0 flex justify-between px-8 sm:px-14 font-mono text-[9px] text-white/15 uppercase tracking-widest">
        <span>ISMAGI · Casablanca · Maroc</span>
        <span>33.57°N · 7.59°W</span>
      </div>
    </motion.div>
  );
}
