"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";

const CLASSIFICATION: Record<Project["category"], string> = {
  "GRC":                "CONFIDENTIAL",
  "Offensive Security": "TOP SECRET",
  "Defensive Security": "CLASSIFIED",
  "Forensics":          "CLASSIFIED",
  "Development":        "INTERNAL",
};

const PRIORITY: Record<Project["category"], number> = {
  "GRC":                95,
  "Offensive Security": 88,
  "Defensive Security": 85,
  "Forensics":          78,
  "Development":        72,
};

function OperationCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const year = project.period?.match(/\d{4}/)?.[0] ?? "2025";
  const opId = `OP-${year}-${String(index + 1).padStart(3, "0")}`;
  const classification = CLASSIFICATION[project.category];
  const priority = PRIORITY[project.category];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex-shrink-0 w-[85vw] sm:w-[60vw] lg:w-[44vw] xl:w-[38vw] border border-dim flex flex-col font-mono transition-colors duration-300 hover:border-white/50 bg-black overflow-hidden"
      style={{ height: "min(78vh, 640px)" }}
    >
      {/* ── File header ── */}
      <div className="border-b border-dim px-7 py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <span className="text-[9px] border border-white/60 text-white px-1.5 py-0.5 uppercase tracking-widest">
            [{classification}]
          </span>
          {project.featured && (
            <span className="text-[9px] border border-white/60 text-white px-1.5 py-0.5 uppercase tracking-widest">
              ★ PRIORITY
            </span>
          )}
        </div>
        <span className="text-[10px] text-white">{opId}</span>
      </div>

      {/* ── File path ── */}
      <div className="px-7 py-2 border-b border-dim/40 shrink-0">
        <span className="text-[9px] text-white">
          /root/ops/{project.id}/{project.id.replace(/-/g, "_")}.enc
        </span>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 px-7 py-6 flex flex-col gap-5 overflow-hidden">

        {/* Operation name */}
        <div>
          <div className="text-[9px] text-white uppercase tracking-widest mb-1">Operation:</div>
          <h3
            className="font-display font-black text-white leading-tight transition-all duration-500"
            style={{ fontSize: hovered ? "clamp(1.5rem, 3.2vw, 2.2rem)" : "clamp(1.25rem, 2.8vw, 1.9rem)" }}
          >
            {project.title.toUpperCase()}
          </h3>
          <p className="text-[10px] text-white mt-1">{project.subtitle}</p>
        </div>

        {/* Mission brief */}
        <div className="flex-1">
          <div className="text-[9px] text-white uppercase tracking-widest mb-2">Mission Brief:</div>
          <p className="text-[11px] text-white leading-relaxed line-clamp-4">
            {project.description}
          </p>
        </div>

        {/* Threat vectors addressed */}
        <div>
          <div className="text-[9px] text-white uppercase tracking-widest mb-2">
            Threat Vectors Addressed:
          </div>
          <ul className="space-y-1">
            {project.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="text-[10px] text-white flex items-start gap-2">
                <span className="text-white shrink-0 mt-0.5">&gt;</span>
                <span className="line-clamp-1">{h}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Tools deployed */}
        <div>
          <div className="text-[9px] text-white uppercase tracking-widest mb-2">
            Tools Deployed:
          </div>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 6).map((s) => (
              <span
                key={s}
                className="text-[9px] text-white border border-dim/60 px-2 py-0.5 hover:border-white/40 hover:text-white transition-colors"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Priority bar ── */}
      <div className="px-7 py-3 border-t border-dim/40 shrink-0">
        <div className="flex items-center justify-between text-[9px] text-white mb-1.5">
          <span>PRIORITY LEVEL</span>
          <span>{priority}%</span>
        </div>
        <div className="h-0.5 bg-dim overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${priority}%` }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="h-full bg-white"
          />
        </div>
      </div>

      {/* ── Status footer ── */}
      <div className="border-t border-dim px-7 py-3 flex items-center gap-3 shrink-0">
        {project.company ? (
          <>
            <motion.span
              animate={{ opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="inline-block w-1.5 h-1.5 rounded-full bg-white shrink-0"
            />
            <span className="text-[10px] text-white">ACTIVE</span>
            <span className="text-[10px] text-white">— {project.company}</span>
          </>
        ) : (
          <span className="text-[10px] text-white">✓ OPERATION COMPLETE</span>
        )}
        {project.period && (
          <span className="ml-auto text-[9px] text-white">{project.period}</span>
        )}
      </div>

      {/* Hover glow */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse at top right, rgba(255,255,255,0.04) 0%, transparent 65%)",
            }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const [maxX, setMaxX] = useState(0);

  useEffect(() => {
    const compute = () => {
      if (trackRef.current) {
        setMaxX(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 48));
      }
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const spring = useSpring(scrollYProgress, { stiffness: 60, damping: 22 });
  const x = useTransform(spring, [0, 1], [0, -maxX]);

  const headerOpacity = useTransform(scrollYProgress, [0, 0.07], [0, 1]);
  const headerY       = useTransform(scrollYProgress, [0, 0.07], [40, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div
      ref={containerRef}
      id="projects"
      style={{ height: `${projects.length * 90 + 200}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden flex flex-col justify-center">

        {/* Section header */}
        <motion.div
          style={{ opacity: headerOpacity, y: headerY }}
          className="px-6 md:px-12 pt-6 mb-8 shrink-0"
        >
          <div className="flex items-end justify-between">
            <div>
              <p className="font-mono text-[10px] mb-1">
                <span className="text-green-400">root@joelison:~$ </span>
                <span className="text-white/50">ls -la /root/ops/exfiltrated/</span>
              </p>
              <h2
                className="font-display font-black leading-none tracking-tight"
                style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
              >
                EXFILTRATED
                <span className="text-white">_DATA/</span>
              </h2>
            </div>
            <div className="hidden md:block font-mono text-[10px] text-white pb-1 text-right">
              <div>{projects.length} files found</div>
              <div>SORTED BY: priority desc</div>
            </div>
          </div>
        </motion.div>

        {/* Horizontal track */}
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-4 md:gap-5 pl-6 md:pl-12 pr-6 flex-shrink-0"
        >
          {projects.map((p, i) => (
            <OperationCard key={p.id} project={p} index={i} />
          ))}
          <div className="flex-shrink-0 w-6 md:w-12" />
        </motion.div>

        {/* Progress + hint */}
        <div className="absolute bottom-8 left-6 md:left-12 right-6 md:right-12 flex items-center gap-4 shrink-0">
          <div className="flex-1 h-px bg-dim relative overflow-hidden">
            <motion.div
              style={{ width: progressWidth }}
              className="absolute left-0 top-0 h-full bg-white"
            />
          </div>
          <span className="font-mono text-[9px] text-white shrink-0 uppercase tracking-widest">
            Scrolling files →
          </span>
        </div>
      </div>
    </div>
  );
}
