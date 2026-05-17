"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { contact } from "@/lib/data";

/* ── Glyph decrypt ──────────────────────────────────────── */
const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&!?/\\<>";
const rnd = () => GLYPHS[Math.floor(Math.random() * GLYPHS.length)];

function useDecrypt(text: string, active: boolean, delay = 0, speed = 20) {
  const [display, setDisplay] = useState(() => text.replace(/\S/g, rnd));

  useEffect(() => {
    if (!active) { setDisplay(text.replace(/\S/g, rnd)); return; }
    let cursor = 0;
    let frameId: number;
    const startAt = Date.now() + delay;

    const tick = () => {
      if (Date.now() < startAt) { frameId = requestAnimationFrame(tick); return; }
      cursor++;
      if (cursor >= text.length) { setDisplay(text); return; }
      setDisplay(text.slice(0, cursor) + text.slice(cursor).replace(/\S/g, rnd));
      frameId = setTimeout(() => requestAnimationFrame(tick), speed) as unknown as number;
    };
    frameId = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(frameId); clearTimeout(frameId); };
  }, [active, text, delay, speed]);

  return display;
}

/* ── Contact entries ────────────────────────────────────── */
const COMMS = [
  { id: "01", label: "EMAIL",   value: contact.email,              href: `mailto:${contact.email}`,               delay: 0   },
  { id: "02", label: "NETWORK", value: "linkedin/joanna-joelison", href: contact.linkedin,                        delay: 180 },
  { id: "03", label: "REPO",    value: "github/Joelijoa",          href: contact.github,                          delay: 360 },
  { id: "04", label: "TEL",     value: contact.phone,              href: `tel:${contact.phone.replace(/\s/g,"")}`, delay: 540 },
  { id: "05", label: "COORDS",  value: "Casablanca · 33.57°N",    href: null,                                    delay: 720 },
];

/* ── Scroll-thresholded handshake ───────────────────────── */
const STEPS = [
  { label: "GENERATING KEYPAIR",    blocks: 18, dur: 0.7 },
  { label: "NEGOTIATING CIPHER",    blocks: 18, dur: 0.5 },
  { label: "OPENING SECURE TUNNEL", blocks: 18, dur: 0.9 },
  { label: "ENCRYPTING CHANNEL",    blocks: 18, dur: 0.5 },
];

function HandshakeRow({
  label, blocks, dur, progress, threshold,
}: {
  label: string; blocks: number; dur: number;
  progress: number; threshold: number;
}) {
  const active = progress >= threshold;
  const fill   = active ? Math.min(1, (progress - threshold) / (dur * 0.18)) : 0;
  const filled = Math.floor(fill * blocks);

  return (
    <div className="flex items-center gap-3 font-mono text-[10px]">
      <span className="text-muted/50 w-52 shrink-0">{label}</span>
      <div className="flex gap-px flex-1">
        {Array.from({ length: blocks }).map((_, i) => (
          <div
            key={i}
            className="h-2.5 flex-1 transition-colors duration-75"
            style={{ backgroundColor: i < filled ? "#ffffff" : "#1a1a1a" }}
          />
        ))}
      </div>
      <span className={`text-white shrink-0 transition-opacity duration-200 ${filled >= blocks ? "opacity-100" : "opacity-0"}`}>
        DONE
      </span>
    </div>
  );
}

function CommRow({ item, active }: { item: typeof COMMS[0]; active: boolean }) {
  const decrypted = useDecrypt(item.value, active, item.delay, 16);
  return (
    <div className="flex items-center border-b border-dim last:border-0 px-6 py-4 font-mono text-[11px] group">
      <span className="text-muted/25 w-8 shrink-0">{item.id}</span>
      <span className="text-muted/50 uppercase tracking-widest w-24 shrink-0">{item.label}</span>
      {item.href ? (
        <a
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="text-white hover:text-muted transition-colors flex-1 tracking-wide"
        >
          {decrypted}
        </a>
      ) : (
        <span className="text-muted flex-1 tracking-wide">{decrypted}</span>
      )}
      <motion.span
        animate={{ opacity: [1, 0.2, 1] }}
        transition={{ duration: 2, repeat: Infinity, delay: item.delay / 1000 }}
        className="text-[9px] text-white/25 shrink-0"
      >
        LIVE
      </motion.span>
    </div>
  );
}

export default function Contact() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => setScrollPct(v));

  /* Scroll-driven transforms */
  const headerOpacity = useTransform(scrollYProgress, [0, 0.12], [0, 1]);
  const headerY       = useTransform(scrollYProgress, [0, 0.12], [60, 0]);
  const headerScale   = useTransform(scrollYProgress, [0, 0.12], [0.95, 1]);

  const shakeOpacity  = useTransform(scrollYProgress, [0.15, 0.28], [0, 1]);
  const shakeY        = useTransform(scrollYProgress, [0.15, 0.28], [40, 0]);

  const commsOpacity  = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);
  const commsY        = useTransform(scrollYProgress, [0.5, 0.65], [30, 0]);

  const cvOpacity     = useTransform(scrollYProgress, [0.72, 0.82], [0, 1]);
  const footerOpacity = useTransform(scrollYProgress, [0.85, 0.95], [0, 1]);

  /* Handshake: each step triggered at scroll thresholds */
  const shakeThresholds = [0.28, 0.34, 0.40, 0.46];
  const allStepsDone = scrollPct >= 0.52;

  /* Comms decrypt activates at scroll 0.65 */
  const commsActive = scrollPct >= 0.65;

  return (
    <div
      ref={containerRef}
      id="contact"
      style={{ height: "320vh" }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center px-6 md:px-16">

        {/* Top-left: terminal label */}
        <div className="absolute top-14 left-6 md:left-16 z-20 font-mono text-[10px]">
          <span className="text-muted">root@compromised:~$ </span>
          <span className="text-white">./open_secure_channel.sh --enc=AES256-GCM</span>
        </div>

        {/* Top-right: section tag */}
        <div className="absolute top-14 right-6 md:right-16 z-20 font-mono text-[10px] text-muted/30 uppercase tracking-widest">
          SECURE_COMMS
        </div>

        <div className="max-w-[1400px] mx-auto w-full space-y-8">

          {/* Header */}
          <motion.div style={{ opacity: headerOpacity, y: headerY, scale: headerScale }}>
            <p className="font-mono text-[10px] text-muted/50 mb-4 uppercase tracking-widest">
              Initiating encrypted connection...
            </p>
            <h2
              className="font-display font-black leading-none tracking-tight"
              style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
            >
              SECURE
              <br />
              <span className="text-muted">CHANNEL</span>
            </h2>
          </motion.div>

          {/* Handshake */}
          <motion.div
            style={{ opacity: shakeOpacity, y: shakeY }}
            className="border border-dim p-6 space-y-4"
          >
            <p className="font-mono text-[9px] text-muted/40 mb-4 uppercase tracking-widest">
              INITIATING SECURE HANDSHAKE WITH joelison.local...
            </p>
            {STEPS.map((s, i) => (
              <HandshakeRow
                key={s.label}
                {...s}
                progress={scrollPct}
                threshold={shakeThresholds[i]}
              />
            ))}
          </motion.div>

          {/* Channel established banner */}
          <motion.div
            style={{ opacity: useTransform(scrollYProgress, [0.5, 0.58], [0, 1]) }}
            className="border border-white p-4 font-mono text-center"
          >
            <p className={`text-xs tracking-widest transition-colors duration-500 ${allStepsDone ? "text-white" : "text-muted/20"}`}>
              {allStepsDone ? "SECURE CHANNEL ESTABLISHED" : "ESTABLISHING CHANNEL..."}
            </p>
            <p className="text-[10px] text-muted/40 mt-1">
              ENC: AES-256-GCM · PFS: ON · TLS 1.3 · FORWARD SECRECY: ENABLED
            </p>
          </motion.div>

          {/* Comms */}
          <motion.div
            style={{ opacity: commsOpacity, y: commsY }}
            className="border border-dim"
          >
            {COMMS.map((item) => (
              <CommRow key={item.id} item={item} active={commsActive} />
            ))}
          </motion.div>

          {/* CV download */}
          <motion.a
            href="/cv.pdf"
            download
            style={{ opacity: cvOpacity }}
            className="block border border-white p-5 font-mono text-[11px] text-center hover:bg-white hover:text-black transition-all duration-200 group tracking-widest"
          >
            <span className="text-muted/60 group-hover:text-black transition-colors">[↓] </span>
            RETRIEVE CLASSIFIED DOCUMENT — CV.PDF
            <span className="text-muted/60 group-hover:text-black transition-colors"> [↓]</span>
          </motion.a>
        </div>

        {/* Footer */}
        <motion.div
          style={{ opacity: footerOpacity }}
          className="absolute bottom-8 left-6 md:left-16 right-6 md:right-16 font-mono text-[10px] flex flex-col sm:flex-row items-center justify-between gap-2 text-muted/30"
        >
          <span>END TRANSMISSION.</span>
          <span>© 2025 JOELISON JOANNA VONINJOHARY</span>
        </motion.div>
      </div>
    </div>
  );
}
