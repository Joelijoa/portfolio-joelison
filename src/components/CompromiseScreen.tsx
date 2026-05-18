"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BinaryRain from "@/components/BinaryRain";

/* Small skull for the compromise screen */
const SKULL = [
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

const SCAN_LINES = [
  { cmd: "$ nmap -sS -O target.local --open",          delay: 200  },
  { cmd: "$ exploit/smb/ms17_010_eternalblue RUNNING", delay: 560  },
  { cmd: "$ meterpreter > getsystem",                  delay: 920  },
  { cmd: "$ NT AUTHORITY\\SYSTEM — ACCESS GRANTED",    delay: 1260 },
];

interface Props { onComplete: () => void }

export default function CompromiseScreen({ onComplete }: Props) {
  const [skullLines,    setSkullLines]    = useState(0);
  const [visibleLines,  setVisibleLines]  = useState(0);
  const [showProgress,  setShowProgress]  = useState(false);
  const [progressValue, setProgressValue] = useState(0);
  const [done,          setDone]          = useState(false);

  /* Reveal skull row by row */
  useEffect(() => {
    if (skullLines >= SKULL.length) return;
    const t = setTimeout(() => setSkullLines((n) => n + 1), skullLines === 0 ? 80 : 55);
    return () => clearTimeout(t);
  }, [skullLines]);

  /* Terminal scan lines */
  useEffect(() => {
    if (skullLines < SKULL.length) return;
    if (visibleLines >= SCAN_LINES.length) return;
    const gap = visibleLines === 0
      ? SCAN_LINES[0].delay
      : SCAN_LINES[visibleLines].delay - SCAN_LINES[visibleLines - 1].delay;
    const t = setTimeout(() => setVisibleLines((n) => n + 1), gap);
    return () => clearTimeout(t);
  }, [skullLines, visibleLines]);

  /* Progress bar after scan */
  useEffect(() => {
    if (visibleLines < SCAN_LINES.length) return;
    const t = setTimeout(() => setShowProgress(true), 200);
    return () => clearTimeout(t);
  }, [visibleLines]);

  useEffect(() => {
    if (!showProgress) return;
    let raf: number;
    const start = performance.now();
    const duration = 1100;
    const tick = (now: number) => {
      const pct = Math.min(((now - start) / duration) * 100, 100);
      setProgressValue(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => { setDone(true); setTimeout(onComplete, 380); }, 120);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [showProgress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeIn" } }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 bg-black z-30 flex items-center justify-center overflow-hidden"
    >
      <BinaryRain />

      {/* Corner info */}
      <div className="absolute top-5 left-5 font-mono text-[9px] text-white space-y-0.5">
        <div>SYS :: BREACH_DETECTED</div>
        <div>VECTOR :: SMB/MS17-010</div>
        <div>TIME :: {new Date().toISOString().slice(11, 19)} UTC</div>
      </div>
      <div className="absolute top-5 right-5 font-mono text-[9px] text-white text-right space-y-0.5">
        <div>TARGET :: portfolio.local</div>
        <div>STATUS :: COMPROMISED</div>
        <div>ACCESS :: ROOT</div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex flex-col items-center gap-8 px-6 w-full max-w-xl">

        {/* Skull */}
        <div className="font-mono leading-tight text-white text-center" style={{ fontSize: "clamp(14px, 2.2vw, 24px)" }}>
          {SKULL.map((row, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scaleX: 0.6 }}
              animate={i < skullLines ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.12 }}
            >
              <pre className="whitespace-pre">{row}</pre>
            </motion.div>
          ))}
        </div>

        {/* Warning title */}
        {skullLines >= SKULL.length && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
            className="text-center"
          >
            <p
              className="glitch-text font-mono font-black text-white uppercase tracking-widest"
              data-text="⚠ SYSTEM COMPROMISED ⚠"
              style={{ fontSize: "clamp(1rem, 2.8vw, 1.6rem)" }}
            >
              ⚠ SYSTEM COMPROMISED ⚠
            </p>
            <p className="font-mono text-[9px] text-white uppercase tracking-[0.35em] mt-2">
              Unauthorized access detected · Initiating scan
            </p>
          </motion.div>
        )}

        {/* Divider */}
        {skullLines >= SKULL.length && (
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.35 }}
            className="w-full h-px bg-white/15 origin-left"
          />
        )}

        {/* Terminal scan output */}
        <div className="w-full space-y-2 min-h-[88px]">
          {SCAN_LINES.slice(0, visibleLines).map(({ cmd }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="flex items-center gap-3 font-mono text-[11px]"
            >
              <span className="text-white shrink-0 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className={i === visibleLines - 1 && visibleLines < SCAN_LINES.length ? "text-white" : "text-white"}>
                {cmd}
              </span>
              {i === visibleLines - 1 && visibleLines < SCAN_LINES.length && (
                <span className="inline-block w-2 h-3.5 bg-white blink" />
              )}
              {i < visibleLines - 1 && (
                <span className="ml-auto text-white text-[9px] shrink-0">✓</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress */}
        <AnimatePresence>
          {showProgress && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
              className="w-full"
            >
              <div className="flex justify-between font-mono text-[9px] text-white mb-1.5">
                <span>LOADING OPERATOR PROFILE</span>
                <span className="text-white">{Math.round(progressValue)}%</span>
              </div>
              <div className="w-full h-px bg-white/10 relative mb-1.5">
                <div
                  className="absolute top-0 left-0 h-full bg-white"
                  style={{ width: `${progressValue}%`, transition: "none" }}
                />
              </div>
              <div className="flex gap-px">
                {Array.from({ length: 24 }).map((_, i) => (
                  <div
                    key={i}
                    className={`h-1 flex-1 transition-colors duration-75 ${
                      (i / 24) * 100 <= progressValue ? "bg-white/50" : "bg-white/8"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Done */}
        <AnimatePresence>
          {done && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-mono text-[10px] text-white uppercase tracking-widest"
            >
              Profile loaded — entering system...
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
