"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";
import { experiences } from "@/lib/data";

const MISSIONS = [
  {
    id: "flairie",
    codename: "FLAIRIE / PROJECT_LEAD",
    company: "Neerelab Technology",
    period: "Déc 2025 — En cours",
    status: "ACTIVE",
    clearance: "L4",
    port: "443/tcp",
    tags: ["Project Lead", "Fullstack", "Agile"],
    brief: "Lead de projet sur une application collaborative innovante. Architecture, coordination équipe, livraisons sprint.",
  },
  {
    id: "stage-monitoring",
    codename: "MONITORING_FIREWALL",
    company: "Neerelab Technology",
    period: "Mai 2025 — Nov 2025",
    status: "COMPLETE",
    clearance: "L3",
    port: "8080/tcp",
    tags: ["Wazuh", "NetXMS", "Firewall", "SIEM"],
    brief: "Déploiement d'une infrastructure SIEM + monitoring réseau. Configuration firewalling et règles de détection.",
  },
  {
    id: "stage-api",
    codename: "API_PLATFORM",
    company: "Univers Plancher",
    period: "Juin 2024 — Juil 2024",
    status: "COMPLETE",
    clearance: "L2",
    port: "3000/tcp",
    tags: ["API REST", "Spring Boot", "PostgreSQL"],
    brief: "Conception et développement d'une API REST robuste. Documentation OpenAPI, tests unitaires, déploiement.",
  },
  {
    id: "stage-re7",
    codename: "MOBILE_APP_RE7",
    company: "ISMAGI",
    period: "Févr 2024 — Mai 2024",
    status: "COMPLETE",
    clearance: "L2",
    port: "5432/tcp",
    tags: ["Android", "Java", "Firebase"],
    brief: "Développement application Android collaborative avec authentification Firebase et synchronisation temps réel.",
  },
];

const N = MISSIONS.length;

function MissionSlide({
  mission,
  index,
  scrollYProgress,
}: {
  mission: typeof MISSIONS[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const step  = 1 / N;
  const start = index * step;
  const end   = start + step;

  const opacity = useTransform(
    scrollYProgress,
    [start - step * 0.25, start, end - step * 0.1, end],
    [0, 1, 1, 0]
  );
  const x = useTransform(
    scrollYProgress,
    [start - step * 0.35, start, end - step * 0.1, end],
    [80, 0, 0, -60]
  );
  const scale = useTransform(
    scrollYProgress,
    [start - step * 0.35, start, end - step * 0.1, end],
    [0.95, 1, 1, 0.97]
  );

  /* Line draw: 0→100% as this slide is centered */
  const lineScaleX = useTransform(
    scrollYProgress,
    [start, end - step * 0.15],
    [0, 1]
  );

  const isActive = mission.status === "ACTIVE";
  const missionNum = String(index + 1).padStart(2, "0");

  return (
    <motion.div
      style={{ opacity, x, scale }}
      className="absolute inset-0 flex items-center px-6 md:px-16 pointer-events-none"
    >
      <div className="max-w-[1400px] mx-auto w-full">

        {/* Top meta line */}
        <div className="font-mono text-[9px] text-muted/30 uppercase tracking-widest mb-8 flex items-center gap-4">
          <span>{mission.port}</span>
          <span>·</span>
          <span>CLEARANCE: {mission.clearance}</span>
          <span>·</span>
          <span>MISSION {missionNum}/{N}</span>
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_420px] gap-12 md:gap-20 items-start">

          {/* Left: mission content */}
          <div className="flex flex-col gap-6">
            {/* Status badge */}
            <div className="flex items-center gap-3">
              {isActive ? (
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="inline-block w-2 h-2 rounded-full bg-white shrink-0"
                />
              ) : (
                <span className="inline-block w-2 h-2 border border-muted/40 shrink-0" />
              )}
              <span className={`font-mono text-[10px] tracking-widest ${isActive ? "text-white" : "text-muted/50"}`}>
                {mission.status}
              </span>
            </div>

            {/* Codename */}
            <div>
              <p className="font-mono text-[10px] text-muted/40 mb-3 uppercase tracking-widest">
                Operation codename
              </p>
              <h3
                className="font-display font-black text-white leading-none tracking-tight"
                style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
              >
                {mission.codename}
              </h3>
            </div>

            {/* Separator line — draws as slide enters */}
            <div className="overflow-hidden h-px bg-dim">
              <motion.div
                style={{ scaleX: lineScaleX }}
                className="origin-left h-full bg-white"
              />
            </div>

            {/* Company + period */}
            <div className="font-mono text-[11px] flex items-center gap-6">
              <div>
                <div className="text-muted/40 text-[9px] uppercase tracking-widest mb-1">Operator</div>
                <div className="text-white">{mission.company}</div>
              </div>
              <div className="w-px h-8 bg-dim" />
              <div>
                <div className="text-muted/40 text-[9px] uppercase tracking-widest mb-1">Duration</div>
                <div className="text-muted">{mission.period}</div>
              </div>
            </div>

            {/* Brief */}
            <div>
              <div className="font-mono text-[9px] text-muted/40 uppercase tracking-widest mb-2">Mission Brief</div>
              <p className="font-mono text-[12px] text-muted leading-relaxed">
                {mission.brief}
              </p>
            </div>
          </div>

          {/* Right: tags terminal block */}
          <div className="border border-dim p-6 font-mono pointer-events-auto">
            <div className="text-[9px] text-muted/30 uppercase tracking-widest mb-4">
              ./scan --target={mission.id} --output=tags
            </div>
            <div className="space-y-2">
              {mission.tags.map((tag, i) => (
                <div key={tag} className="flex items-center gap-3 text-[11px]">
                  <span className="text-white/20">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-muted/40">›</span>
                  <span className={`${isActive && i === 0 ? "text-white" : "text-muted/70"}`}>{tag}</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-4 border-t border-dim flex items-center justify-between text-[9px]">
              <span className="text-muted/30">EXIT CODE</span>
              <span className={isActive ? "text-white" : "text-muted/50"}>
                {isActive ? "RUNNING" : "0x00 OK"}
              </span>
            </div>
          </div>
        </div>

        {/* Bottom index */}
        <div
          className="mt-12 font-display font-black text-white/5 leading-none select-none"
          style={{ fontSize: "clamp(5rem, 14vw, 12rem)" }}
        >
          {missionNum}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIdx(Math.min(Math.floor(v * N), N - 1));
  });

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      id="experience"
      style={{ height: `${N * 100 + 120}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Top-left: terminal label */}
        <div className="absolute top-14 left-6 md:left-16 z-20 font-mono text-[10px]">
          <span className="text-muted">root@compromised:~$ </span>
          <span className="text-white">cat /ops/field_log.enc | decrypt</span>
        </div>

        {/* Top-right: section tag */}
        <div className="absolute top-14 right-6 md:right-16 z-20 font-mono text-[10px] text-muted/30 uppercase tracking-widest">
          FIELD_OPERATIONS
        </div>

        {/* Mission slides */}
        <div className="relative w-full h-full">
          {MISSIONS.map((mission, i) => (
            <MissionSlide
              key={mission.id}
              mission={mission}
              index={i}
              scrollYProgress={scrollYProgress}
            />
          ))}
        </div>

        {/* Bottom: progress bar + mission counter */}
        <div className="absolute bottom-8 left-6 md:left-16 right-6 md:right-16 z-20">
          <div className="flex items-center justify-between font-mono text-[10px] text-muted mb-3">
            <span>
              OPERATION{" "}
              <span className="text-white">{String(activeIdx + 1).padStart(2, "0")}</span>
              /{N}
            </span>
            <span className="text-muted/40">
              {MISSIONS[activeIdx]?.codename ?? ""}
            </span>
          </div>
          <div className="w-full h-px bg-dim overflow-hidden relative">
            <motion.div
              style={{ width: progressWidth }}
              className="absolute left-0 top-0 h-full bg-white"
            />
          </div>
          <div className="flex gap-2 mt-3">
            {MISSIONS.map((_, i) => (
              <div
                key={i}
                className={`h-px flex-1 transition-colors duration-300 ${
                  i <= activeIdx ? "bg-white" : "bg-dim"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
