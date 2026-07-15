"use client";

import { useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { skillGroups } from "@/lib/data";

const IDENTITY = [
  ["NAME",        "JOELISON JOANNA VONINJOHARY"],
  ["STATUS",      "● ACTIVE — En recherche de premier CDI"],
  ["ROLE",        "Cybersecurity Engineer & Cloud Computing"],
  ["LOCATION",    "Rabat, Maroc  [34.0209°N, 6.8417°W]"],
  ["EMAIL",       "joannajoelison.pro@gmail.com"],
  ["CLEARANCE",   "L4 — ELEVATED"],
];

const OPERATIONS = [
  { code: "01", name: "ZEROGAP_GRC_PLATFORM",     company: "DataProtect",         period: "Nov 2025 →",     status: "ACTIVE" },
  { code: "02", name: "FLAIRIE_LEAD_FRONTEND",    company: "Neerelab Technology", period: "Déc 2025 →",     status: "ACTIVE" },
  { code: "03", name: "SOC_MONITORING_FIREWALL",  company: "Neerelab Technology", period: "Mai–Nov 2025",   status: "COMPLETE" },
  { code: "04", name: "API_UNIFIED_PLATFORM",     company: "Univers Plancher",    period: "Juin–Juil 2024", status: "COMPLETE" },
  { code: "05", name: "MOBILE_APP_RE7",           company: "ISMAGI",              period: "Févr–Mai 2024",  status: "COMPLETE" },
];

const PROJECTS_LIST = [
  { code: "P01", name: "ZEROGAP_PLATFORM",        cat: "GRC",       period: "Nov 2025 →" },
  { code: "P02", name: "PENTEST_MS17010",         cat: "OFFENSIVE", period: "Nov 2025–Jan 2026" },
  { code: "P03", name: "AUDIT_SSI_ISO27001",      cat: "GRC",       period: "Nov 2025–Jan 2026" },
  { code: "P04", name: "DFIR_MALWARE_ANALYSIS",   cat: "FORENSICS", period: "Nov 2025–Jan 2026" },
  { code: "P05", name: "IDS_SNORT_SURICATA",      cat: "DEFENSIVE", period: "Mars–Mai 2025" },
  { code: "P06", name: "SIEM_MONITORING_INFRA",   cat: "DEFENSIVE", period: "Mai–Nov 2025" },
  { code: "P07", name: "MOBILE_APP_RE7",          cat: "DEVOPS",    period: "Févr–Mai 2024" },
];

const SECTION_DELAY = 0.15;

function Section({ title, children, delay }: { title: string; children: React.ReactNode; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="mb-8"
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px flex-1 bg-blue-400/30" />
        <span className="font-mono text-[9px] text-blue-400 uppercase tracking-[0.2em]">{title}</span>
        <div className="h-px flex-1 bg-blue-400/30" />
      </div>
      {children}
    </motion.div>
  );
}

export default function CVViewer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    window.dispatchEvent(new Event("lenis:stop"));
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      window.dispatchEvent(new Event("lenis:start"));
      window.removeEventListener("keydown", handler);
    };
  }, [open, onClose]);

  /* Reset scroll on open */
  useEffect(() => {
    if (open && scrollRef.current) scrollRef.current.scrollTop = 0;
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100] bg-black flex flex-col"
          style={{ fontFamily: "var(--font-jetbrains), 'JetBrains Mono', monospace" }}
        >
          {/* Screen-on flash */}
          <motion.div
            initial={{ opacity: 0.6 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 bg-white pointer-events-none z-10"
          />

          {/* Scanlines */}
          <div className="absolute inset-0 pointer-events-none z-10 scanlines-overlay opacity-30" />

          {/* ── Header ── */}
          <div className="shrink-0 border-b border-white/10 px-6 md:px-12 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-[9px] border border-white/50 text-white px-2 py-0.5 uppercase tracking-widest whitespace-nowrap">
                ★ CLASSIFIED
              </span>
              <span className="font-mono text-[9px] text-white">
                PERSONNEL FILE — 0x4A4A56F3 · CLEARANCE L4
              </span>
            </div>
            <button
              onClick={onClose}
              className="font-mono text-[9px] text-white hover:text-white transition-colors uppercase tracking-widest border border-white/10 hover:border-white/40 px-3 py-1"
            >
              [ESC] CLOSE
            </button>
          </div>

          {/* ── Terminal bootstrap ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="shrink-0 px-6 md:px-12 py-3 border-b border-white/5 font-mono text-[9px]"
          >
            <span className="text-green-400">root@joelison:~$ </span>
            <span className="text-white/60">cat /db/personnel/0x4A4A56F3.enc | decrypt --key=sys</span>
            <br />
            <span className="text-white">Decrypting... </span>
            <span className="text-white">DONE</span>
            <span className="text-white"> · Access </span>
            <span className="text-white">GRANTED</span>
          </motion.div>

          {/* ── Scrollable body ── */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto px-6 md:px-12 py-6" onWheel={(e) => e.stopPropagation()} onTouchMove={(e) => e.stopPropagation()}>

            {/* IDENTITY */}
            <Section title="IDENTITY" delay={0.2}>
              <div className="space-y-1.5">
                {IDENTITY.map(([key, val], i) => (
                  <motion.div
                    key={key}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 + i * 0.04 }}
                    className="grid grid-cols-[140px_1fr] gap-3 font-mono text-[10px]"
                  >
                    <span className="text-white">{key}:</span>
                    <span className={key === "STATUS" ? "text-white" : "text-white"}>{val}</span>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* COMPETENCES */}
            <Section title="COMPETENCES TECHNIQUES" delay={SECTION_DELAY * 2 + 0.2}>
              <div className="space-y-2">
                {skillGroups.map((g, i) => (
                  <motion.div
                    key={g.category}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.55 + i * 0.06 }}
                    className="flex flex-wrap gap-x-3 gap-y-0.5 font-mono text-[10px]"
                  >
                    <span className="text-white w-44 shrink-0">{g.category}:</span>
                    <span className="text-white flex-1">{g.skills.join(", ")}</span>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* FIELD OPERATIONS */}
            <Section title="FIELD OPERATIONS" delay={SECTION_DELAY * 4 + 0.2}>
              <div className="space-y-2">
                {OPERATIONS.map((op, i) => (
                  <motion.div
                    key={op.code}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.85 + i * 0.07 }}
                    className="flex items-center gap-3 font-mono text-[10px] border-b border-white/5 pb-1.5 last:border-0"
                  >
                    <span className="text-white">[{op.code}]</span>
                    <span className={`font-bold ${op.status === "ACTIVE" ? "text-white" : "text-white"}`}>
                      {op.name}
                    </span>
                    <span className="text-white hidden sm:inline">·</span>
                    <span className="text-white hidden sm:inline">{op.company}</span>
                    <span className="text-white hidden md:inline">·</span>
                    <span className="text-white hidden md:inline">{op.period}</span>
                    <span className="ml-auto text-[8px] text-white shrink-0">{op.status}</span>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* SIGNIFICANT PROJECTS */}
            <Section title="SIGNIFICANT PROJECTS" delay={SECTION_DELAY * 6 + 0.2}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                {PROJECTS_LIST.map((p, i) => (
                  <motion.div
                    key={p.code}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.25 + i * 0.06 }}
                    className="flex items-center gap-2 font-mono text-[9px] border border-white/5 px-3 py-2"
                  >
                    <span className="text-white">{p.code}</span>
                    <span className="text-white flex-1 truncate">{p.name}</span>
                    <span className="text-white text-[8px] shrink-0">{p.cat}</span>
                  </motion.div>
                ))}
              </div>
            </Section>

            {/* LANGUAGES */}
            <Section title="LANGUAGES & CLEARANCES" delay={SECTION_DELAY * 8 + 0.2}>
              <div className="flex flex-wrap gap-6 font-mono text-[10px]">
                {[
                  ["Français", "B1/B2"],
                  ["Anglais", "Courant"],
                  ["Allemand", "A1/A2/B1"],
                ].map(([lang, lvl]) => (
                  <div key={lang} className="flex items-center gap-2">
                    <span className="text-white">{lang}:</span>
                    <span className="text-white">{lvl}</span>
                  </div>
                ))}
              </div>
            </Section>

            <div className="h-4" />
          </div>

          {/* ── Footer ── */}
          <div className="shrink-0 border-t border-white/10 px-6 md:px-12 py-3 flex items-center justify-between gap-4">
            <span className="font-mono text-[8px] text-white">
              FILE: 0x4A4A56F3 · SYS: COMPROMISED · ACCESS: ROOT
            </span>
            <div className="flex items-center gap-3">
              <a
                href="/cv.pdf"
                download
                className="font-mono text-[9px] border border-white/30 text-white hover:border-white hover:text-white transition-all px-4 py-1.5 uppercase tracking-widest"
              >
                [↓] DOWNLOAD ORIGINAL
              </a>
              <button
                onClick={onClose}
                className="font-mono text-[9px] text-white hover:text-white transition-colors uppercase tracking-widest"
              >
                CLOSE VIEWER
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
