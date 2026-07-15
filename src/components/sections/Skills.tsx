"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";
import { skillGroups } from "@/lib/data";

const N = skillGroups.length;

const META = [
  {
    id: "GRC_COMPLIANCE", level: 92, port: "443/tcp",
    intel: [
      "ISO 27001 — mise en place de SMSI complets",
      "DNSSI — conformité réglementaire marocaine",
      "EBIOS RM — analyse de risques structurée",
      "SOA & PCA/PRA — documentation et gouvernance",
    ],
    sublevels: [92, 88, 85, 80],
  },
  {
    id: "SOC_DEFENSIVE_OPS", level: 88, port: "8080/tcp",
    intel: [
      "Wazuh SIEM — corrélation d'événements temps réel",
      "Snort / Suricata IDS — détection d'intrusions réseau",
      "TheHive5 + MISP — gestion incidents et partage IoC",
      "Cortex — analyse automatisée des observables",
    ],
    sublevels: [90, 85, 82, 78],
  },
  {
    id: "OFFENSIVE_TOOLKIT", level: 85, port: "4444/tcp",
    intel: [
      "Pentest réseau — exploitation MS17-010 EternalBlue",
      "Metasploit Framework — post-exploitation avancée",
      "OSINT & recon — cartographie surfaces d'attaque",
      "Analyse de vulnérabilités CVSS et rapport technique",
    ],
    sublevels: [88, 85, 80, 82],
  },
  {
    id: "FORENSICS_AND_RE", level: 83, port: "5432/tcp",
    intel: [
      "Volatility2 — analyse forensique de mémoire vive",
      "Ghidra — reverse engineering de binaires suspects",
      "Mapping MITRE ATT&CK — TTPs et chaînes d'attaque",
      "FTK Imager — acquisition d'images forensiques",
    ],
    sublevels: [85, 82, 80, 78],
  },
  {
    id: "DEVSECOPS_CLOUD", level: 78, port: "3000/tcp",
    intel: [
      "AWS & Firebase — architectures cloud sécurisées",
      "Docker — conteneurisation et isolation des services",
      "CI/CD — intégration des contrôles de sécurité",
      "Monitoring — supervision et métriques temps réel",
    ],
    sublevels: [80, 78, 75, 76],
  },
  {
    id: "DEVELOPMENT_STACK", level: 80, port: "8443/tcp",
    intel: [
      "React + Node.js — applications web full-stack",
      "Angular + Spring Boot — architectures entreprise",
      "Python & Java — scripting et automatisation",
      "Android Native — applications mobiles sécurisées",
    ],
    sublevels: [82, 80, 78, 75],
  },
  {
    id: "SYSTEMS_AND_DEVOPS", level: 86, port: "22/tcp",
    intel: [
      "Linux — administration système et hardening",
      "VMware — virtualisation et labs de sécurité",
      "Agile/Scrum — coordination et gestion de projets",
      "OpenLDAP & SSL/TLS — services d'annuaire sécurisés",
    ],
    sublevels: [88, 85, 84, 80],
  },
];

const BAR = 20;
const ALL_LEVELS = META.map((m) => m.level);

function ModuleSlide({
  group,
  meta,
  index,
  scrollYProgress,
  activeIdx,
}: {
  group: typeof skillGroups[0];
  meta: typeof META[0];
  index: number;
  scrollYProgress: MotionValue<number>;
  activeIdx: number;
}) {
  const step  = 1 / N;
  const start = index * step;
  const end   = start + step;
  const p = (frac: number) => start + step * frac;

  const slideOpacity = useTransform(
    scrollYProgress,
    [start - step * 0.2, start, end - step * 0.1, end],
    [0, 1, 1, 0]
  );
  const slideY = useTransform(
    scrollYProgress,
    [start - step * 0.3, start, end - step * 0.1, end],
    [50, 0, 0, -40]
  );

  const idOp      = useTransform(scrollYProgress, [p(0.00), p(0.12)], [0, 1]);
  const idY       = useTransform(scrollYProgress, [p(0.00), p(0.12)], [20, 0]);
  const barOp     = useTransform(scrollYProgress, [p(0.10), p(0.24)], [0, 1]);
  const barScaleX = useTransform(scrollYProgress, [p(0.12), p(0.28)], [0, 1]);
  const i0Op      = useTransform(scrollYProgress, [p(0.22), p(0.33)], [0, 1]);
  const i1Op      = useTransform(scrollYProgress, [p(0.32), p(0.43)], [0, 1]);
  const i2Op      = useTransform(scrollYProgress, [p(0.42), p(0.53)], [0, 1]);
  const i3Op      = useTransform(scrollYProgress, [p(0.52), p(0.63)], [0, 1]);
  const rightOp   = useTransform(scrollYProgress, [p(0.30), p(0.50)], [0, 1]);
  const tagsOp    = useTransform(scrollYProgress, [p(0.60), p(0.74)], [0, 1]);
  const tagsY     = useTransform(scrollYProgress, [p(0.60), p(0.74)], [14, 0]);

  const filled = Math.round((meta.level / 100) * BAR);
  const intelOps = [i0Op, i1Op, i2Op, i3Op];

  return (
    <motion.div
      style={{ opacity: slideOpacity, y: slideY }}
      className="absolute inset-0 flex items-center pt-14 sm:pt-10 md:pt-6 pointer-events-none"
    >
      <div className="w-full h-full flex items-center px-4 sm:px-6 md:px-10 lg:px-14">
        <div className="w-full grid grid-cols-1 lg:grid-cols-[1fr_340px] xl:grid-cols-[1fr_400px] gap-10 lg:gap-16 items-start">

          {/* ── LEFT: main content ── */}
          <div className="flex flex-col gap-5">

            {/* Port + level */}
            <motion.p style={{ opacity: idOp, y: idY }} className="font-mono text-[9px] text-white uppercase tracking-widest">
              {meta.port} · open · CAPABILITY {meta.level}%
            </motion.p>

            {/* Module ID */}
            <motion.h3
              style={{ opacity: idOp, y: idY, fontSize: "clamp(1.6rem, 4vw, 3.5rem)" }}
              className="font-display font-black text-white leading-none tracking-tight"
            >
              {meta.id}
            </motion.h3>

            {/* Capability bar */}
            <motion.div style={{ opacity: barOp }} className="flex gap-0.5">
              {Array.from({ length: BAR }).map((_, i) => (
                <motion.div
                  key={i}
                  style={{ scaleX: i < filled ? barScaleX : 1 }}
                  className={`h-2.5 flex-1 origin-left ${i < filled ? "bg-white" : "bg-dim"}`}
                />
              ))}
            </motion.div>

            {/* Intel lines (4) */}
            <div className="space-y-2.5 mt-1">
              {intelOps.map((op, i) => (
                <motion.div
                  key={i}
                  style={{ opacity: op }}
                  className="flex items-start gap-3 font-mono text-[11px] text-white"
                >
                  <span className="text-white shrink-0 mt-0.5">›</span>
                  <span>{meta.intel[i]}</span>
                </motion.div>
              ))}
            </div>

            {/* Skill tags */}
            <motion.div
              style={{ opacity: tagsOp, y: tagsY }}
              className="flex flex-wrap gap-2 pointer-events-auto mt-1"
            >
              {group.skills.map((skill) => (
                <span
                  key={skill}
                  className="font-mono text-[10px] text-white border border-dim/70 px-3 py-1.5 hover:border-white/60 hover:text-white transition-colors duration-150 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: capability matrix ── */}
          <motion.div
            style={{ opacity: rightOp }}
            className="hidden lg:flex flex-col gap-4 border border-white/8 p-5 pointer-events-auto"
          >
            {/* Header */}
            <div className="font-mono text-[8px] text-white uppercase tracking-widest mb-1">
              $ nmap --capability-matrix
            </div>

            {/* All modules comparison */}
            <div className="space-y-2.5">
              {META.map((m, i) => {
                const isActive = i === activeIdx;
                const barFill = Math.round((m.level / 100) * 14);
                return (
                  <div key={m.id} className="space-y-1">
                    <div className="flex items-center justify-between font-mono text-[8px]">
                      <span className={isActive ? "text-green-400" : "text-white/50"}>
                        {m.id.split("_")[0]}
                      </span>
                      <span className={isActive ? "text-green-400" : "text-white/50"}>
                        {m.level}%
                      </span>
                    </div>
                    <div className="flex gap-px">
                      {Array.from({ length: 14 }).map((_, j) => (
                        <div
                          key={j}
                          className={`h-1 flex-1 transition-colors duration-300 ${
                            j < barFill
                              ? isActive ? "bg-green-400" : "bg-white/20"
                              : "bg-white/5"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Divider */}
            <div className="h-px bg-white/8 my-1" />

            {/* Sub-skill levels for current module */}
            <div className="space-y-2">
              <div className="font-mono text-[8px] text-white uppercase tracking-widest mb-2">
                Sub-skills — {meta.id.split("_")[0]}
              </div>
              {group.skills.slice(0, 4).map((skill, i) => {
                const lvl = meta.sublevels[i] ?? 75;
                return (
                  <div key={skill} className="flex items-center gap-2 font-mono text-[8px]">
                    <span className="text-white w-20 shrink-0 truncate">{skill}</span>
                    <div className="flex-1 h-px bg-white/8 relative">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${lvl}%` }}
                        transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
                        className="absolute top-0 left-0 h-full bg-white/40"
                      />
                    </div>
                    <span className="text-white w-7 text-right shrink-0">{lvl}%</span>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-white/8 pt-3 flex justify-between font-mono text-[8px]">
              <span className="text-white">EXIT_CODE</span>
              <span className="text-white">0x00 OK</span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function ModuleProgress({
  activeIdx,
  scrollYProgress,
}: {
  activeIdx: number;
  scrollYProgress: MotionValue<number>;
}) {
  const step = 1 / N;
  const w = useTransform(
    scrollYProgress,
    [activeIdx * step, (activeIdx + 1) * step],
    ["0%", "100%"]
  );
  return (
    <div className="w-full h-px bg-dim overflow-hidden relative">
      <motion.div style={{ width: w }} className="absolute left-0 top-0 h-full bg-white" />
    </div>
  );
}

export default function Skills() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIdx(Math.min(Math.floor(v * N), N - 1));
  });

  return (
    <div
      ref={containerRef}
      id="skills"
      style={{ height: `${N * 100 + 120}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Section title — visible mobile + desktop */}
        <div className="absolute top-16 sm:top-20 left-14 sm:left-40 md:left-48 lg:left-56 right-4 z-20 font-mono">
          <p className="text-[9px] sm:text-[10px] mb-1">
            <span className="text-green-400">root@joelison:~$ </span>
            <span className="text-white/50">./load_modules.sh --list</span>
          </p>
          <h2
            className="font-display font-black text-white leading-none tracking-tight"
            style={{ fontSize: "clamp(1.2rem, 4.5vw, 2rem)" }}
          >
            SKILLS<span className="text-white/40">_MATRIX/</span>
          </h2>
        </div>

        {/* ── LEFT SIDEBAR ── */}
        <div className="absolute top-0 left-0 bottom-0 z-10 flex flex-col justify-between pt-16 pb-14 px-2 sm:px-4 md:px-5 lg:px-8 border-r border-white/8 w-10 sm:w-36 md:w-44 lg:w-52">
          <div className="hidden sm:block">
            <div className="font-mono text-[7px] text-white uppercase tracking-widest mb-4">
              ./load_modules.sh
            </div>
            <div className="font-display font-black leading-none text-white mb-1" style={{ fontSize: "clamp(1rem, 2vw, 1.6rem)" }}>
              OPERATOR
            </div>
            <div className="font-display font-black leading-none text-white" style={{ fontSize: "clamp(1rem, 2vw, 1.6rem)" }}>
              ARSENAL
            </div>
          </div>

          {/* Module nav dots */}
          <div className="space-y-2.5">
            {META.map((m, i) => (
              <div key={m.id} className="flex items-center gap-2.5">
                <motion.div
                  animate={{ width: i === activeIdx ? 12 : 4, background: i === activeIdx ? "#fff" : "#333" }}
                  transition={{ duration: 0.2 }}
                  className="h-px shrink-0"
                />
                <span className={`hidden sm:inline font-mono text-[8px] uppercase tracking-wider transition-colors duration-300 ml-1 ${i === activeIdx ? "text-white" : "text-white"}`}>
                  {m.id.replace(/_/g, " ").toLowerCase()}
                </span>
              </div>
            ))}
          </div>

          {/* Counter */}
          <div className="hidden sm:block font-mono text-[9px] text-white">
            <span className="text-white">{String(activeIdx + 1).padStart(2, "0")}</span>
            <span> / {N}</span>
          </div>
        </div>

        {/* ── MAIN AREA ── */}
        <div className="absolute top-0 left-10 sm:left-36 md:left-44 lg:left-52 right-0 bottom-0">
          {skillGroups.map((group, i) => (
            <ModuleSlide
              key={group.category}
              group={group}
              meta={META[i]}
              index={i}
              scrollYProgress={scrollYProgress}
              activeIdx={activeIdx}
            />
          ))}
        </div>

        {/* Bottom progress */}
        <div className="absolute bottom-8 left-10 sm:left-36 md:left-44 lg:left-52 right-4 md:right-14 z-20">
          <div className="flex items-center justify-between font-mono text-[9px] text-white mb-2">
            <span className="ml-2 sm:ml-3 truncate mr-2">{META[activeIdx]?.id ?? ""}</span>
            <span className="shrink-0">{META[activeIdx]?.level ?? ""}%</span>
          </div>
          <ModuleProgress activeIdx={activeIdx} scrollYProgress={scrollYProgress} />
          <div className="flex gap-1 mt-2">
            {META.map((_, i) => (
              <motion.div
                key={i}
                animate={{ background: i <= activeIdx ? "#fff" : "#222" }}
                transition={{ duration: 0.3 }}
                className="h-px flex-1"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
