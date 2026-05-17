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

const N = skillGroups.length; // 7

const META = [
  { id: "GRC_COMPLIANCE",    level: 92, port: "443/tcp"  },
  { id: "SOC_DEFENSIVE_OPS", level: 88, port: "8080/tcp" },
  { id: "OFFENSIVE_TOOLKIT", level: 85, port: "4444/tcp" },
  { id: "FORENSICS_AND_RE",  level: 83, port: "5432/tcp" },
  { id: "DEVSECOPS_CLOUD",   level: 78, port: "3000/tcp" },
  { id: "DEVELOPMENT_STACK", level: 80, port: "8443/tcp" },
  { id: "SYSTEMS_AND_DEVOPS",level: 86, port: "22/tcp"   },
];

const BAR = 30;

/* One fullscreen slide per module */
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

  const opacity = useTransform(
    scrollYProgress,
    [start - step * 0.3, start, end - step * 0.1, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(
    scrollYProgress,
    [start - step * 0.4, start, end - step * 0.1, end],
    [60, 0, 0, -50]
  );
  const scale = useTransform(
    scrollYProgress,
    [start - step * 0.4, start, end - step * 0.1, end],
    [0.94, 1, 1, 0.96]
  );

  const filled = Math.round((meta.level / 100) * BAR);

  return (
    <motion.div
      style={{ opacity, y, scale }}
      className="absolute inset-0 flex items-center px-6 md:px-16 pointer-events-none"
    >
      <div className="max-w-[1400px] mx-auto w-full grid grid-cols-1 md:grid-cols-[220px_1fr] gap-12 md:gap-20">

        {/* Left: giant index */}
        <div className="flex flex-col justify-center">
          <div
            className="font-display font-black text-white/10 leading-none select-none"
            style={{ fontSize: "clamp(6rem, 16vw, 14rem)" }}
          >
            {String(index + 1).padStart(2, "0")}
          </div>
          <div className="font-mono text-xs text-muted mt-2">/{N} modules</div>
        </div>

        {/* Right: module content */}
        <div className="flex flex-col justify-center gap-8">
          {/* Port + ID */}
          <div>
            <p className="font-mono text-[10px] text-muted/50 mb-2 uppercase tracking-widest">
              {meta.port} &nbsp;·&nbsp; open &nbsp;·&nbsp; capability
            </p>
            <h3
              className="font-display font-black text-white leading-none tracking-tight"
              style={{ fontSize: "clamp(2rem, 5.5vw, 4.5rem)" }}
            >
              {meta.id}
            </h3>
          </div>

          {/* Level + bar */}
          <div>
            <div className="flex items-center justify-between font-mono text-[10px] text-muted mb-3">
              <span>CAPABILITY LEVEL</span>
              <span className="text-white text-sm">{meta.level}%</span>
            </div>
            <div className="flex gap-0.5">
              {Array.from({ length: BAR }).map((_, i) => (
                <div
                  key={i}
                  className={`h-3 flex-1 transition-none ${i < filled ? "bg-white" : "bg-dim"}`}
                />
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="flex flex-wrap gap-2">
            {group.skills.map((skill) => (
              <span
                key={skill}
                className="font-mono text-sm text-muted border border-dim px-4 py-2 hover:border-white hover:text-white transition-colors duration-150 pointer-events-auto"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
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

  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      id="skills"
      style={{ height: `${N * 100 + 120}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Top-left: terminal label */}
        <div className="absolute top-14 left-6 md:left-16 z-20 font-mono text-[10px]">
          <span className="text-muted">root@compromised:~$ </span>
          <span className="text-white">./load_operator_modules.sh</span>
        </div>

        {/* Top-right: section tag */}
        <div className="absolute top-14 right-6 md:right-16 z-20 font-mono text-[10px] text-muted/30 uppercase tracking-widest">
          OPERATOR_ARSENAL
        </div>

        {/* Module slides (all stacked, scroll-driven opacity) */}
        <div className="relative w-full h-full">
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

        {/* Bottom: progress bar + module counter */}
        <div className="absolute bottom-8 left-6 md:left-16 right-6 md:right-16 z-20">
          <div className="flex items-center justify-between font-mono text-[10px] text-muted mb-3">
            <span>
              MODULE{" "}
              <span className="text-white">{String(activeIdx + 1).padStart(2, "0")}</span>
              /{N}
            </span>
            <span className="text-muted/40">
              {META[activeIdx]?.id ?? ""}
            </span>
          </div>
          <div className="w-full h-px bg-dim overflow-hidden relative">
            <motion.div
              style={{ width: progressWidth }}
              className="absolute left-0 top-0 h-full bg-white"
            />
          </div>
          {/* Module dots */}
          <div className="flex gap-2 mt-3">
            {META.map((_, i) => (
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
