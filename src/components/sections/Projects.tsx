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

/* ── Detail Modal ────────────────────────────────────────── */
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const classification = CLASSIFICATION[project.category];
  const priority       = PRIORITY[project.category];
  const opId           = `OP-${project.period?.match(/\d{4}/)?.[0] ?? "2025"}-${String(projects.indexOf(project) + 1).padStart(3, "0")}`;

  useEffect(() => {
    window.dispatchEvent(new Event("lenis:stop"));
    const blockScroll = (e: Event) => e.preventDefault();
    window.addEventListener("wheel",     blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => {
      window.dispatchEvent(new Event("lenis:start"));
      window.removeEventListener("wheel",     blockScroll);
      window.removeEventListener("touchmove", blockScroll);
      window.removeEventListener("keydown",   onKey);
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/85 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 16 }}
        transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[88vh] bg-black border border-white/25 flex flex-col font-mono overflow-hidden"
      >
        {/* Scanlines */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.012) 2px,rgba(255,255,255,0.012) 4px)" }}
        />

        {/* Header */}
        <div className="border-b border-white/15 px-5 py-3 flex items-start justify-between shrink-0 relative z-20">
          <div className="flex flex-col gap-0.5">
            <p className="text-[8px]">
              <span className="text-green-400">root@joelison:~$ </span>
              <span className="text-white/50">cat /root/ops/{project.id}/{project.id.replace(/-/g,"_")}.enc | decrypt</span>
            </p>
            <p className="text-[8px] text-white/30">
              Decrypting... <span className="text-white/60">DONE</span> &middot; Access <span className="text-white/60">GRANTED</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="shrink-0 ml-4 text-[8px] text-white/40 hover:text-white border border-white/15 hover:border-white/50 px-2 py-1 transition-colors uppercase tracking-widest"
          >
            [ESC]
          </button>
        </div>

        {/* Classification strip */}
        <div className="border-b border-white/8 bg-white/[0.02] px-5 py-1.5 flex items-center gap-4 shrink-0 relative z-20">
          <span className="text-[7px] border border-white/35 text-white px-1.5 py-0.5 uppercase tracking-widest">
            [{classification}]
          </span>
          {project.featured && (
            <span className="text-[7px] border border-white/35 text-white px-1.5 py-0.5 uppercase tracking-widest">
              &#9733; PRIORITY
            </span>
          )}
          <span className="text-[7px] text-white/30">{opId}</span>
          {project.period && (
            <span className="ml-auto text-[7px] text-white/30">{project.period}</span>
          )}
        </div>

        {/* Scrollable body */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-6 relative z-20"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >
          {/* Title */}
          <div>
            <div className="text-[7px] text-blue-400 uppercase tracking-widest mb-1">&#8212; OPERATION</div>
            <h2
              className="font-display font-black text-white leading-none tracking-tight mb-2"
              style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)" }}
            >
              {project.title.toUpperCase()}
            </h2>
            <p className="text-[10px] text-white/50">{project.subtitle}</p>
          </div>

          {/* Meta row */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            <div>
              <div className="text-[7px] text-blue-400 uppercase tracking-widest mb-0.5">&#8212; CATEGORY</div>
              <div className="text-[10px] text-white">{project.category}</div>
            </div>
            <div>
              <div className="text-[7px] text-blue-400 uppercase tracking-widest mb-0.5">&#8212; PRIORITY</div>
              <div className="text-[10px] text-white">{priority}%</div>
            </div>
            {project.company && (
              <div>
                <div className="text-[7px] text-blue-400 uppercase tracking-widest mb-0.5">&#8212; OPERATOR</div>
                <div className="text-[10px] text-white">{project.company}</div>
              </div>
            )}
          </div>

          <div className="h-px bg-white/10" />

          {/* Mission brief */}
          <div>
            <div className="text-[7px] text-blue-400 uppercase tracking-widest mb-2">&#8212; MISSION BRIEF</div>
            <p className="text-[10px] text-white/75 leading-relaxed">{project.description}</p>
          </div>

          {/* Highlights */}
          <div>
            <div className="text-[7px] text-blue-400 uppercase tracking-widest mb-2">&#8212; THREAT VECTORS / KEY ACTIONS</div>
            <div className="space-y-2">
              {project.highlights.map((h, i) => (
                <div key={i} className="flex items-start gap-2 text-[10px]">
                  <span className="text-white/35 shrink-0 mt-0.5">&#8250;</span>
                  <span className="text-white/75">{h}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Stack */}
          <div>
            <div className="text-[7px] text-blue-400 uppercase tracking-widest mb-2">&#8212; TOOLS DEPLOYED</div>
            <div className="flex flex-wrap gap-1.5">
              {project.stack.map((s) => (
                <span key={s} className="text-[8px] text-white/70 border border-white/20 px-2 py-0.5">
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Priority bar */}
          <div>
            <div className="text-[7px] text-blue-400 uppercase tracking-widest mb-2">&#8212; PRIORITY LEVEL</div>
            <div className="flex items-center gap-3">
              <div className="flex-1 h-px bg-white/10 relative">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${priority}%` }}
                  transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute top-0 left-0 h-full bg-green-400/60"
                />
              </div>
              <span className="text-[9px] text-white/50 shrink-0">{priority}%</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/8 px-5 py-3 flex justify-between font-mono text-[8px] shrink-0 relative z-20">
          <span className="text-white/30">EXIT_CODE</span>
          <span className="text-white/60">
            {project.company ? "&#9679; ACTIVE" : "&#10003; COMPLETE"}
          </span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Card ────────────────────────────────────────────────── */
function OperationCard({ project, index, onOpen }: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const [hovered, setHovered] = useState(false);
  const year           = project.period?.match(/\d{4}/)?.[0] ?? "2025";
  const opId           = `OP-${year}-${String(index + 1).padStart(3, "0")}`;
  const classification = CLASSIFICATION[project.category];
  const priority       = PRIORITY[project.category];

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex-shrink-0 w-[88vw] sm:w-[70vw] md:w-[55vw] lg:w-[44vw] xl:w-[38vw] border border-dim flex flex-col font-mono transition-colors duration-300 hover:border-white/50 bg-black overflow-hidden"
      style={{ height: "clamp(360px, 62vh, 580px)" }}
    >
      {/* File header */}
      <div className="border-b border-dim px-4 sm:px-7 py-3 sm:py-4 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="text-[9px] border border-white/60 text-white px-1.5 py-0.5 uppercase tracking-widest">
            [{classification}]
          </span>
          {project.featured && (
            <span className="text-[9px] border border-white/60 text-white px-1.5 py-0.5 uppercase tracking-widest hidden sm:inline">
              &#9733; PRIORITY
            </span>
          )}
        </div>
        <span className="text-[10px] text-white">{opId}</span>
      </div>

      {/* File path */}
      <div className="px-4 sm:px-7 py-1.5 sm:py-2 border-b border-dim/40 shrink-0">
        <span className="text-[9px] text-white truncate block">
          /root/ops/{project.id}/{project.id.replace(/-/g, "_")}.enc
        </span>
      </div>

      {/* Body */}
      <div
        className="flex-1 px-4 sm:px-7 py-4 sm:py-6 flex flex-col gap-3 sm:gap-5 overflow-y-auto overscroll-contain"
        onWheel={(e) => e.stopPropagation()}
        onTouchMove={(e) => e.stopPropagation()}
      >
        <div>
          <div className="text-[9px] text-white uppercase tracking-widest mb-1">Operation:</div>
          <h3
            className="font-display font-black text-white leading-tight transition-all duration-500"
            style={{ fontSize: hovered ? "clamp(1.1rem, 3.2vw, 2.2rem)" : "clamp(1rem, 2.8vw, 1.9rem)" }}
          >
            {project.title.toUpperCase()}
          </h3>
          <p className="text-[10px] text-white mt-1">{project.subtitle}</p>
        </div>

        <div className="flex-1">
          <div className="text-[9px] text-white uppercase tracking-widest mb-2">Mission Brief:</div>
          <p className="text-[11px] text-white leading-relaxed line-clamp-4">
            {project.description}
          </p>
        </div>

        <div>
          <div className="text-[9px] text-white uppercase tracking-widest mb-2">Threat Vectors:</div>
          <ul className="space-y-1">
            {project.highlights.slice(0, 3).map((h, i) => (
              <li key={i} className="text-[10px] text-white flex items-start gap-2">
                <span className="text-white shrink-0 mt-0.5">&gt;</span>
                <span className="line-clamp-1">{h}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-[9px] text-white uppercase tracking-widest mb-2">Tools Deployed:</div>
          <div className="flex flex-wrap gap-1.5">
            {project.stack.slice(0, 6).map((s) => (
              <span key={s} className="text-[9px] text-white border border-dim/60 px-2 py-0.5 hover:border-white/40 hover:text-white transition-colors">
                {s}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Priority bar */}
      <div className="px-4 sm:px-7 py-2 sm:py-3 border-t border-dim/40 shrink-0">
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

      {/* Footer */}
      <div className="border-t border-dim px-4 sm:px-7 py-2 sm:py-3 flex items-center gap-3 shrink-0">
        <div className="flex-1 flex items-center gap-3">
          {project.company ? (
            <>
              <motion.span
                animate={{ opacity: [1, 0.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="inline-block w-1.5 h-1.5 rounded-full bg-white shrink-0"
              />
              <span className="text-[10px] text-white">ACTIVE &mdash; {project.company}</span>
            </>
          ) : (
            <span className="text-[10px] text-white">&#10003; OPERATION COMPLETE</span>
          )}
          {project.period && (
            <span className="ml-auto text-[9px] text-white">{project.period}</span>
          )}
        </div>

        {/* Open modal button */}
        <button
          onClick={() => onOpen(project)}
          className="group relative overflow-hidden border border-green-400/60 hover:border-green-400 px-3 py-1.5 transition-all duration-200 flex items-center gap-2 shrink-0"
        >
          <span className="absolute inset-0 bg-green-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
          <span className="relative text-[8px] uppercase tracking-widest font-mono text-green-400 group-hover:text-black transition-colors duration-200">
            OPEN DOSSIER &#8594;
          </span>
        </button>
      </div>

      {/* Hover glow */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: "radial-gradient(ellipse at top right, rgba(255,255,255,0.04) 0%, transparent 65%)" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

/* ── Mobile card (stacked, no scroll-jacking) ───────────────── */
function MobileProjectCard({ project, index, onOpen }: {
  project: Project;
  index: number;
  onOpen: (p: Project) => void;
}) {
  const year           = project.period?.match(/\d{4}/)?.[0] ?? "2025";
  const opId           = `OP-${year}-${String(index + 1).padStart(3, "0")}`;
  const classification = CLASSIFICATION[project.category];

  return (
    <div className="border border-dim bg-black font-mono">
      <div className="border-b border-dim px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-[9px] border border-white/60 text-white px-1.5 py-0.5 uppercase tracking-widest">
            [{classification}]
          </span>
          {project.featured && (
            <span className="text-[9px] border border-white/60 text-white px-1.5 py-0.5 uppercase tracking-widest">
              &#9733;
            </span>
          )}
        </div>
        <span className="text-[10px] text-white">{opId}</span>
      </div>

      <div className="px-4 py-4 flex flex-col gap-3">
        <div>
          <h3
            className="font-display font-black text-white leading-tight"
            style={{ fontSize: "clamp(1.15rem, 5.5vw, 1.6rem)" }}
          >
            {project.title.toUpperCase()}
          </h3>
          <p className="text-[11px] text-white/60 mt-1">{project.subtitle}</p>
        </div>

        <p className="text-[12px] text-white/80 leading-relaxed">{project.description}</p>

        <div className="flex flex-wrap gap-1.5">
          {project.stack.slice(0, 6).map((s) => (
            <span key={s} className="text-[9px] text-white border border-dim/60 px-2 py-0.5">
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-[10px] text-white/70 pt-1">
          <span>{project.company ? `ACTIVE — ${project.company}` : "✓ COMPLETE"}</span>
          {project.period && <span>{project.period}</span>}
        </div>
      </div>

      <button
        onClick={() => onOpen(project)}
        className="w-full border-t border-dim px-4 py-3 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-green-400 active:bg-green-400 active:text-black transition-colors"
      >
        OPEN DOSSIER &#8594;
      </button>
    </div>
  );
}

/* ── Main ────────────────────────────────────────────────── */
export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef     = useRef<HTMLDivElement>(null);
  const [maxX,            setMaxX]            = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const compute = () => {
      if (trackRef.current)
        setMaxX(Math.max(0, trackRef.current.scrollWidth - window.innerWidth + 48));
    };
    compute();
    window.addEventListener("resize", compute);
    return () => window.removeEventListener("resize", compute);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });
  const spring        = useSpring(scrollYProgress, { stiffness: 60, damping: 22 });
  const x             = useTransform(spring, [0, 1], [0, -maxX]);
  const headerOpacity = useTransform(scrollYProgress, [0, 0.07], [0, 1]);
  const headerY       = useTransform(scrollYProgress, [0, 0.07], [40, 0]);
  const progressWidth = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <div id="projects">
      {/* Desktop — horizontal scrollytelling épinglé */}
      <div
        ref={containerRef}
        style={{ height: `${projects.length * 90 + 200}vh` }}
        className="relative hidden md:block"
      >
        <div className="sticky top-0 h-screen overflow-hidden flex flex-col">

          {/* Header */}
          <motion.div
            style={{ opacity: headerOpacity, y: headerY }}
            className="px-4 sm:px-6 md:px-12 pt-16 sm:pt-20 md:pt-16 mb-4 sm:mb-5 shrink-0"
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
            className="flex gap-4 md:gap-5 pl-4 sm:pl-6 md:pl-12 pr-4 sm:pr-6 flex-shrink-0"
          >
            {projects.map((p, i) => (
              <OperationCard key={p.id} project={p} index={i} onOpen={setSelectedProject} />
            ))}
            <div className="flex-shrink-0 w-6 md:w-12" />
          </motion.div>

          {/* Progress */}
          <div className="absolute bottom-8 left-4 sm:left-6 md:left-12 right-4 sm:right-6 md:right-12 flex items-center gap-4 shrink-0">
            <div className="flex-1 h-px bg-dim relative overflow-hidden">
              <motion.div style={{ width: progressWidth }} className="absolute left-0 top-0 h-full bg-white" />
            </div>
            <span className="font-mono text-[9px] text-white shrink-0 uppercase tracking-widest">
              Scrolling files &#8594;
            </span>
          </div>
        </div>
      </div>

      {/* Mobile — liste empilée, scroll natif */}
      <div className="md:hidden px-4 sm:px-6 py-16">
        <div className="mb-6">
          <p className="font-mono text-[10px] mb-1">
            <span className="text-green-400">root@joelison:~$ </span>
            <span className="text-white/50">ls -la /root/ops/exfiltrated/</span>
          </p>
          <h2
            className="font-display font-black leading-none tracking-tight"
            style={{ fontSize: "clamp(2rem, 9vw, 2.6rem)" }}
          >
            EXFILTRATED
            <span className="text-white">_DATA/</span>
          </h2>
          <div className="font-mono text-[10px] text-white/50 mt-2">
            {projects.length} files found &middot; sorted by priority
          </div>
        </div>

        <div className="flex flex-col gap-4">
          {projects.map((p, i) => (
            <MobileProjectCard key={p.id} project={p} index={i} onOpen={setSelectedProject} />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
