"use client";

import { motion } from "framer-motion";

interface LandingPageProps {
  onEnter: () => void;
}

export default function LandingPage({ onEnter }: LandingPageProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.2, ease: "easeIn" } }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed inset-0 bg-black flex flex-col items-center justify-center z-30 select-none overflow-hidden"
    >
      {/* Subtle grid background */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-2xl">
        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-2 mb-16"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
          <span className="font-mono text-[10px] text-muted uppercase tracking-[0.3em]">
            System Standby
          </span>
        </motion.div>

        {/* Main name */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1
            className="font-display font-black text-white leading-none tracking-tight mb-3"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
          >
            JOELISON
          </h1>
          <h1
            className="font-display font-black text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(3rem, 10vw, 8rem)" }}
          >
            JOANNA
          </h1>
        </motion.div>

        {/* Title */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.65, ease: "easeOut" }}
          className="font-mono text-sm sm:text-base text-muted tracking-widest uppercase mt-6 mb-3"
        >
          Cybersecurity Engineer
        </motion.p>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.85 }}
          className="font-mono text-[11px] text-muted/60 tracking-[0.2em] uppercase mb-14"
        >
          Building&nbsp;&nbsp;•&nbsp;&nbsp;Analyzing&nbsp;&nbsp;•&nbsp;&nbsp;Defending
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1, ease: "easeOut" }}
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={onEnter}
            className="group relative border border-white px-10 py-3.5 font-mono text-xs uppercase tracking-[0.25em] text-white transition-all duration-300 hover:bg-white hover:text-black overflow-hidden"
          >
            {/* Hover fill effect */}
            <span className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            <span className="relative z-10">ENTER SYSTEM</span>
          </button>

          <p className="font-mono text-[10px] text-muted/50 tracking-widest">
            Click to initiate system scan
          </p>
        </motion.div>
      </div>

      {/* Corner decorations */}
      <div className="absolute top-6 left-6 w-8 h-8 border-t border-l border-white/20" />
      <div className="absolute top-6 right-6 w-8 h-8 border-t border-r border-white/20" />
      <div className="absolute bottom-6 left-6 w-8 h-8 border-b border-l border-white/20" />
      <div className="absolute bottom-6 right-6 w-8 h-8 border-b border-r border-white/20" />

      {/* Bottom mono text */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.3 }}
        className="absolute bottom-10 left-0 right-0 flex justify-center"
      >
        <span className="font-mono text-[9px] text-muted/30 tracking-[0.4em] uppercase">
          ISMAGI · Casablanca · 2025
        </span>
      </motion.div>
    </motion.div>
  );
}
