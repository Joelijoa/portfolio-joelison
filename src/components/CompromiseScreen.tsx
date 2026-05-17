"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface CompromiseScreenProps {
  onComplete: () => void;
}

const TERMINAL_LINES = [
  { cmd: "$ scanning_directories...", delay: 350 },
  { cmd: "$ analyzing_projects...", delay: 680 },
  { cmd: "$ extracting_skills...", delay: 1010 },
  { cmd: "$ loading_experience...", delay: 1340 },
];

export default function CompromiseScreen({ onComplete }: CompromiseScreenProps) {
  const [phase, setPhase] = useState<"appear" | "typing" | "loading" | "done">("appear");
  const [visibleLines, setVisibleLines] = useState(0);
  const [showProgress, setShowProgress] = useState(false);
  const [progressValue, setProgressValue] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("typing"), 300);
    return () => clearTimeout(t1);
  }, []);

  useEffect(() => {
    if (phase !== "typing") return;

    const timers: ReturnType<typeof setTimeout>[] = [];

    TERMINAL_LINES.forEach(({ delay }, i) => {
      timers.push(setTimeout(() => setVisibleLines(i + 1), delay));
    });

    timers.push(
      setTimeout(() => {
        setShowProgress(true);
        setPhase("loading");
      }, 1640)
    );

    return () => timers.forEach(clearTimeout);
  }, [phase]);

  useEffect(() => {
    if (!showProgress) return;

    let raf: number;
    const start = performance.now();
    const duration = 1200;

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min((elapsed / duration) * 100, 100);
      setProgressValue(pct);
      if (pct < 100) {
        raf = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          setPhase("done");
          setTimeout(onComplete, 400);
        }, 150);
      }
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [showProgress, onComplete]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.4, ease: "easeIn" } }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 bg-black z-30 flex flex-col items-center justify-center overflow-hidden"
    >
      {/* Scanlines overlay */}
      <div className="scanlines-overlay" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Main content */}
      <div className="relative z-10 w-full max-w-2xl px-6 font-mono">
        {/* WARNING HEADER */}
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="text-center mb-12"
          >
            <p
              className="glitch-text text-white font-mono font-bold text-2xl sm:text-3xl md:text-4xl uppercase tracking-widest mb-3"
              data-text="⚠ SYSTEM COMPROMISED ⚠"
            >
              ⚠ SYSTEM COMPROMISED ⚠
            </p>
            <p className="text-[10px] text-white/40 uppercase tracking-[0.4em]">
              Unauthorized access detected · Initiating security scan
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Divider */}
        <div className="w-full h-px bg-white/10 mb-8" />

        {/* Terminal output */}
        <div className="mb-8 min-h-[100px]">
          {TERMINAL_LINES.slice(0, visibleLines).map(({ cmd }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
              className="flex items-center gap-2 mb-2"
            >
              <span className="text-white/30 text-xs">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-white text-sm">{cmd}</span>
              {i === visibleLines - 1 && visibleLines < TERMINAL_LINES.length && (
                <span className="inline-block w-2 h-4 bg-white blink" />
              )}
              {i < visibleLines - 1 && (
                <span className="text-white/40 text-xs ml-auto">✓ OK</span>
              )}
            </motion.div>
          ))}
        </div>

        {/* Progress bar */}
        <AnimatePresence>
          {showProgress && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-white/60 text-xs uppercase tracking-widest">Loading profile</span>
                <span className="text-white text-xs font-mono">
                  {Math.round(progressValue)}%
                </span>
              </div>
              <div className="w-full h-px bg-white/10 relative">
                <div
                  className="absolute top-0 left-0 h-full bg-white transition-none"
                  style={{ width: `${progressValue}%` }}
                />
              </div>
              <div className="flex justify-between mt-1">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div
                    key={i}
                    className={`w-px h-1 transition-colors duration-75 ${
                      (i / 20) * 100 <= progressValue ? "bg-white/60" : "bg-white/10"
                    }`}
                  />
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Done message */}
        <AnimatePresence>
          {phase === "done" && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-white text-xs font-mono mt-4 text-center tracking-widest uppercase"
            >
              Profile loaded — entering portfolio
            </motion.p>
          )}
        </AnimatePresence>
      </div>

      {/* Corner coords */}
      <div className="absolute top-4 left-4 font-mono text-[9px] text-white/20 leading-relaxed">
        <div>SYS :: BREACH_DETECTED</div>
        <div>VECTOR :: SMB_EXPLOIT</div>
        <div>TIME :: {new Date().toISOString().slice(11, 19)}</div>
      </div>
      <div className="absolute bottom-4 right-4 font-mono text-[9px] text-white/20 text-right leading-relaxed">
        <div>TARGET :: portfolio.local</div>
        <div>STATUS :: COMPROMISED</div>
        <div>ACCESS :: ROOT</div>
      </div>
    </motion.div>
  );
}
