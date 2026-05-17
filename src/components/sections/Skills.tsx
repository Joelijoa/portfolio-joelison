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
    ],
  },
  {
    id: "SOC_DEFENSIVE_OPS", level: 88, port: "8080/tcp",
    intel: [
      "Wazuh SIEM — corrélation d'événements temps réel",
      "Snort / Suricata IDS — détection d'intrusions",
      "TheHive5 + MISP — gestion d'incidents et IoC",
    ],
  },
  {
    id: "OFFENSIVE_TOOLKIT", level: 85, port: "4444/tcp",
    intel: [
      "Pentest réseau — exploitation MS17-010 EternalBlue",
      "Metasploit Framework — post-exploitation avancée",
      "OSINT & recon — cartographie des surfaces d'attaque",
    ],
  },
  {
    id: "FORENSICS_AND_RE", level: 83, port: "5432/tcp",
    intel: [
      "Volatility2 — analyse forensique de mémoire vive",
      "Ghidra — reverse engineering de binaires suspects",
      "Mapping MITRE ATT&CK — TTPs et chaînes d'attaque",
    ],
  },
  {
    id: "DEVSECOPS_CLOUD", level: 78, port: "3000/tcp",
    intel: [
      "AWS & Firebase — architectures cloud sécurisées",
      "CI/CD — intégration des contrôles de sécurité",
      "Monitoring — supervision et métriques temps réel",
    ],
  },
  {
    id: "DEVELOPMENT_STACK", level: 80, port: "8443/tcp",
    intel: [
      "Angular + Spring Boot — applications web full-stack",
      "Python & Java — scripting et automatisation",
      "Android Native — applications mobiles sécurisées",
    ],
  },
  {
    id: "SYSTEMS_AND_DEVOPS", level: 86, port: "22/tcp",
    intel: [
      "Linux — administration système et hardening",
      "VMware — virtualisation et labs sécurité",
      "Agile/Scrum — coordination et gestion de projets",
    ],
  },
];

const BAR = 28;

function ModuleSlide({
  group,
  meta,
  index,
  scrollYProgress,
}: {
  group: typeof skillGroups[0];
  meta: typeof META[0];
  index: number;
  scrollYProgress: MotionValue<number>;
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

  const idOpacity  = useTransform(scrollYProgress, [p(0.00), p(0.12)], [0, 1]);
  const idY        = useTransform(scrollYProgress, [p(0.00), p(0.12)], [24, 0]);
  const barOpacity = useTransform(scrollYProgress, [p(0.12), p(0.28)], [0, 1]);
  const barScaleX  = useTransform(scrollYProgress, [p(0.14), p(0.32)], [0, 1]);
  const intel0Op   = useTransform(scrollYProgress, [p(0.22), p(0.34)], [0, 1]);
  const intel1Op   = useTransform(scrollYProgress, [p(0.34), p(0.46)], [0, 1]);
  const intel2Op   = useTransform(scrollYProgress, [p(0.46), p(0.58)], [0, 1]);
  const tagsOp     = useTransform(scrollYProgress, [p(0.58), p(0.72)], [0, 1]);
  const tagsY      = useTransform(scrollYProgress, [p(0.58), p(0.72)], [16, 0]);

  const filled = Math.round((meta.level / 100) * BAR);
  const intelOpacities = [intel0Op, intel1Op, intel2Op];

  return (
    <motion.div
      style={{ opacity: slideOpacity, y: slideY }}
      className="absolute inset-0 flex items-center pr-6 md:pr-16 pl-4 md:pl-8 pointer-events-none"
    >
      <div className="w-full flex flex-col gap-6">

        {/* Port + level label */}
        <motion.p
          style={{ opacity: idOpacity, y: idY }}
          className="font-mono text-[9px] text-muted/40 uppercase tracking-widest"
        >
          {meta.port} · open · capability {meta.level}%
        </motion.p>

        {/* Module ID heading */}
        <motion.h3
          style={{ opacity: idOpacity, y: idY, fontSize: "clamp(1.8rem, 4.5vw, 3.8rem)" }}
          className="font-display font-black text-white leading-none tracking-tight"
        >
          {meta.id}
        </motion.h3>

        {/* Capability bar */}
        <motion.div style={{ opacity: barOpacity }} className="flex gap-0.5">
          {Array.from({ length: BAR }).map((_, i) => (
            <motion.div
              key={i}
              style={{ scaleX: i < filled ? barScaleX : 1 }}
              className={`h-2 flex-1 origin-left ${i < filled ? "bg-white" : "bg-dim"}`}
            />
          ))}
        </motion.div>

        {/* Intel lines */}
        <div className="space-y-2">
          {intelOpacities.map((op, i) => (
            <motion.div
              key={i}
              style={{ opacity: op }}
              className="flex items-center gap-3 font-mono text-[11px] text-muted"
            >
              <span className="text-white/20 shrink-0">›</span>
              <span>{meta.intel[i]}</span>
            </motion.div>
          ))}
        </div>

        {/* Skills tags */}
        <motion.div
          style={{ opacity: tagsOp, y: tagsY }}
          className="flex flex-wrap gap-2 pointer-events-auto"
        >
          {group.skills.map((skill) => (
            <span
              key={skill}
              className="font-mono text-[10px] text-muted border border-dim px-3 py-1.5 hover:border-white hover:text-white transition-colors duration-150"
            >
              {skill}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  );
}

/* Progress bar for the active module — needs its own component to call hooks at top level */
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

        {/* ── LEFT COLUMN — always visible ── */}
        <div className="absolute top-0 left-0 bottom-0 z-10 flex flex-col justify-between py-14 px-6 md:px-10 border-r border-dim/40 w-52 md:w-60">
          <div>
            <div className="font-mono text-[8px] text-muted/25 uppercase tracking-widest mb-5">
              ./load_modules.sh
            </div>
            <div className="font-display font-black leading-none text-white" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.9rem)" }}>
              OPERATOR
            </div>
            <div className="font-display font-black leading-none text-muted/35" style={{ fontSize: "clamp(1.2rem, 2.5vw, 1.9rem)" }}>
              ARSENAL
            </div>
          </div>

          <div className="space-y-3">
            {META.map((m, i) => (
              <div key={m.id} className="flex items-center gap-2.5">
                <div className={`w-1 h-1 transition-colors duration-300 ${i === activeIdx ? "bg-white" : "bg-dim"}`} />
                <span className={`font-mono text-[8px] uppercase tracking-wider transition-colors duration-300 ${i === activeIdx ? "text-white" : "text-muted/30"}`}>
                  {m.id.split("_")[0]}
                </span>
              </div>
            ))}
          </div>

          <div className="font-mono text-[9px] text-muted/30">
            <span className="text-white">{String(activeIdx + 1).padStart(2, "0")}</span>
            <span> / {N} modules</span>
          </div>
        </div>

        {/* ── RIGHT COLUMN — scroll-driven ── */}
        <div className="absolute top-0 left-52 md:left-60 right-0 bottom-0">
          {skillGroups.map((group, i) => (
            <ModuleSlide
              key={group.category}
              group={group}
              meta={META[i]}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Bottom progress */}
        <div className="absolute bottom-8 left-52 md:left-60 right-6 md:right-16 z-20">
          <div className="flex items-center justify-between font-mono text-[9px] text-muted/40 mb-2">
            <span>{META[activeIdx]?.id ?? ""}</span>
            <span>{META[activeIdx]?.level ?? ""}%</span>
          </div>
          <ModuleProgress activeIdx={activeIdx} scrollYProgress={scrollYProgress} />
        </div>
      </div>
    </div>
  );
}
