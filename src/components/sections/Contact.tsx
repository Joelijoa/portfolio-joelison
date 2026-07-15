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

function useDecrypt(text: string, active: boolean, delay = 0, speed = 18) {
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

/* ── Signal visualization ───────────────────────────────── */
function SignalPanel({ active }: { active: boolean }) {
  return (
    <div className="relative flex flex-col items-center justify-center h-full select-none overflow-hidden">
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          className="absolute border border-green-400/20"
          style={{
            inset: `${i * 20}%`,
            animation: active ? `pulse-ring ${2.0 + i * 0.7}s ease-in-out ${i * 0.35}s infinite` : "none",
          }}
        />
      ))}
      {active && (
        <div
          className="absolute left-0 right-0 h-px"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(74,222,128,0.5), transparent)",
            animation: "signal-scan 2.2s linear infinite",
          }}
        />
      )}
      <div className="relative flex items-center justify-center w-8 h-8">
        <div className="absolute inset-x-0 top-1/2 h-px bg-green-400/20" />
        <div className="absolute inset-y-0 left-1/2 w-px bg-green-400/20" />
        <motion.div
          animate={active ? { opacity: [0.2, 1, 0.2], scale: [0.9, 1.15, 0.9] } : { opacity: 0.15 }}
          transition={{ duration: 1.8, repeat: Infinity }}
          className="w-1.5 h-1.5 border border-green-400/60"
        />
      </div>
      <div className="absolute bottom-3 font-mono text-[8px] text-center space-y-0.5">
        <div className="flex items-center gap-1.5 justify-center">
          <motion.span
            animate={active ? { opacity: [1, 0.1, 1] } : { opacity: 0.1 }}
            transition={{ duration: 1.3, repeat: Infinity }}
            className="w-1 h-1 rounded-full bg-green-400 inline-block"
          />
          <span className={active ? "text-green-400" : "text-white/40"}>
            {active ? "SIGNAL ACQUIRED" : "SCANNING..."}
          </span>
        </div>
        <div className="text-white/40">ENC: AES-256-GCM &middot; TLS 1.3</div>
      </div>
    </div>
  );
}

/* ── Contact rows ───────────────────────────────────────── */
const COMMS = [
  { id: "01", label: "EMAIL",   value: contact.email,              href: `mailto:${contact.email}`,                delay: 0   },
  { id: "02", label: "NETWORK", value: "linkedin/joanna-joelison", href: contact.linkedin,                         delay: 160 },
  { id: "03", label: "REPO",    value: "github/Joelijoa",          href: contact.github,                           delay: 320 },
  { id: "04", label: "COORDS",  value: "Rabat · 34.02°N",          href: null,                                     delay: 480 },
];

function CommRow({ item, active }: { item: typeof COMMS[0]; active: boolean }) {
  const decrypted = useDecrypt(item.value, active, item.delay, 16);
  return (
    <div className="flex items-center gap-0 border-b border-white/8 last:border-0 py-2.5 font-mono group">
      <span className="text-white text-[8px] w-6 shrink-0">{item.id}</span>
      <span className="text-white text-[8px] uppercase tracking-widest w-20 shrink-0 pr-2">{item.label}</span>
      {item.href ? (
        <a
          href={item.href}
          target={item.href.startsWith("http") ? "_blank" : undefined}
          rel="noopener noreferrer"
          className="text-white text-[10px] hover:text-white transition-colors flex-1 tracking-wide pointer-events-auto truncate"
        >
          {decrypted}
        </a>
      ) : (
        <span className="text-white text-[10px] flex-1 tracking-wide truncate">{decrypted}</span>
      )}
      <motion.span
        animate={{ opacity: [1, 0.1, 1] }}
        transition={{ duration: 2.4, repeat: Infinity, delay: item.delay / 1200 }}
        className="text-[7px] text-white shrink-0 ml-1"
      >
        LIVE
      </motion.span>
    </div>
  );
}

/* ── Main ───────────────────────────────────────────────── */
export default function Contact({
  onOpenCV,
  onExit,
}: {
  onOpenCV?: () => void;
  onExit?: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const exitInputRef = useRef<HTMLInputElement>(null);

  const [scrollPct, setScrollPct] = useState(0);
  const [exitValue, setExitValue] = useState("");
  const [exitDone, setExitDone]   = useState(false);
  const [inputFocused, setInputFocused] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  useMotionValueEvent(scrollYProgress, "change", (v) => setScrollPct(v));

  const termOp    = useTransform(scrollYProgress, [0.00, 0.10], [0, 1]);
  const termY     = useTransform(scrollYProgress, [0.00, 0.10], [24, 0]);
  const headOp    = useTransform(scrollYProgress, [0.07, 0.18], [0, 1]);
  const headScale = useTransform(scrollYProgress, [0.07, 0.18], [0.96, 1]);
  const signalOp  = useTransform(scrollYProgress, [0.15, 0.28], [0, 1]);
  const commsOp   = useTransform(scrollYProgress, [0.28, 0.42], [0, 1]);
  const commsY    = useTransform(scrollYProgress, [0.28, 0.42], [20, 0]);
  const cvOp      = useTransform(scrollYProgress, [0.52, 0.64], [0, 1]);
  const exitOp    = useTransform(scrollYProgress, [0.70, 0.80], [0, 1]);
  const footerOp  = useTransform(scrollYProgress, [0.85, 0.94], [0, 1]);

  const signalActive = scrollPct >= 0.26;
  const commsActive  = scrollPct >= 0.42;

  /* Exit terminal */
  const handleExitKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (exitValue.trim().toLowerCase() === "exit") {
        setExitDone(true);
        setTimeout(() => onExit?.(), 600);
      } else {
        setExitValue("");
      }
    }
  };

  return (
    <>
      <div
        ref={containerRef}
        id="contact"
        style={{ height: "280vh" }}
        className="relative"
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-start sm:justify-center px-4 sm:px-6 md:px-12 pt-24 sm:pt-14 md:pt-10 pb-8">
          <div className="max-w-[1400px] mx-auto w-full space-y-5">

            {/* Terminal command */}
            <motion.p style={{ opacity: termOp, y: termY }} className="font-mono text-[9px]">
              <span className="text-green-400">root@joelison:~$ </span>
              <span className="text-white/50">./open_secure_channel.sh --target=joelison --enc=AES256-GCM</span>
            </motion.p>

            {/* Grid: heading+signal | comms */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">

              {/* LEFT */}
              <div className="flex flex-col gap-4">
                <motion.h2
                  style={{ opacity: headOp, scale: headScale, fontSize: "clamp(2rem, 5vw, 4rem)" }}
                  className="font-display font-black leading-none tracking-tight text-white"
                >
                  SECURE<br /><span className="text-white/70">CHANNEL</span>
                </motion.h2>

                <motion.div style={{ opacity: signalOp }} className="border border-white/10 h-44">
                  <div className="font-mono text-[7px] text-white px-3 pt-2 uppercase tracking-widest">
                    ./signal_probe --host=joelison.local
                  </div>
                  <div className="h-36">
                    <SignalPanel active={signalActive} />
                  </div>
                </motion.div>
              </div>

              {/* RIGHT */}
              <div className="flex flex-col gap-3">
                <motion.div style={{ opacity: commsOp, y: commsY }} className="border border-white/10 px-4 py-1">
                  {COMMS.map((item) => (
                    <CommRow key={item.id} item={item} active={commsActive} />
                  ))}
                </motion.div>

                <motion.div
                  style={{ opacity: useTransform(scrollYProgress, [0.44, 0.55], [0, 1]) }}
                  className="font-mono text-[8px] text-white space-y-0.5 px-1"
                >
                  <div><span className="text-white">[SYS]</span> CHANNEL_ESTABLISHED · FORWARD_SECRECY=ON</div>
                  <div>
                    <span className="text-white">[SYS]</span>{" "}AWAITING_TRANSMISSION
                    <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.7, repeat: Infinity }} className="text-white ml-0.5">_</motion.span>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* ── CV — classified file access ── */}
            <motion.div style={{ opacity: cvOp }}>
              <div className="font-mono text-[8px] mb-1">
                <span className="text-green-400">$ </span>
                <span className="text-white/50">ls -la /root/classified/ | grep cv</span>
              </div>
              <button
                onClick={() => onOpenCV?.()}
                className="group w-full text-left border border-white/20 hover:border-white/50 transition-all duration-150 pointer-events-auto"
              >
                <div className="flex items-center gap-3 px-4 py-2 border-b border-white/10 font-mono text-[9px]">
                  <span className="text-white">-rw-r--r--</span>
                  <span className="text-white">root</span>
                  <span className="text-white">284K</span>
                  <span className="text-white group-hover:text-white transition-colors">cv_joelison_joanna.pdf</span>
                  <span className="ml-auto text-white text-[8px]">[ENCRYPTED]</span>
                </div>
                <div className="px-4 py-2.5 flex items-center justify-between font-mono">
                  <span className="text-white text-[9px] group-hover:text-white transition-colors">
                    $ decrypt --key=sys &amp;&amp; open cv_joelison_joanna.pdf
                  </span>
                </div>
              </button>
            </motion.div>

            {/* ── Exit terminal ── */}
            <motion.div style={{ opacity: exitOp }} className="font-mono text-[10px]">
              <div className="text-white text-[8px] mb-1 uppercase tracking-widest">
                — session active — type &apos;exit&apos; to disconnect —
              </div>
              <div className="flex items-center gap-2 border border-white/15 px-3 py-2">
                <span className="text-green-400 shrink-0">root@joelison:~$</span>
                {exitDone ? (
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-white">
                    exit
                  </motion.span>
                ) : (
                  <input
                    ref={exitInputRef}
                    type="text"
                    value={exitValue}
                    onChange={(e) => setExitValue(e.target.value)}
                    onKeyDown={handleExitKey}
                    onFocus={() => setInputFocused(true)}
                    onBlur={() => setInputFocused(false)}
                    spellCheck={false}
                    autoComplete="off"
                    placeholder="type 'exit'..."
                    className="flex-1 bg-transparent outline-none text-white placeholder-white/20 caret-white pointer-events-auto"
                    style={{ fontFamily: "inherit" }}
                  />
                )}
              </div>
              {exitDone && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-white text-[8px] mt-1 space-y-0.5"
                >
                  <div>Connection to joelison.local closed.</div>
                  <div>Logout.</div>
                </motion.div>
              )}
            </motion.div>

            {/* ── Footer ── */}
            <motion.div style={{ opacity: footerOp }} className="pt-3 border-t border-white/10 font-mono text-[8px]">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-white">
                <div>END TRANSMISSION.</div>
                <div className="text-right">
                  <div>© 2025 JOELISON JOANNA VONINJOHARY</div>
                  <div className="text-white">RABAT · MAROC · 34.02°N</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
