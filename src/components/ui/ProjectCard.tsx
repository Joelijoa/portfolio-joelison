"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import type { Project } from "@/lib/data";

const categoryLabel: Record<Project["category"], string> = {
  "GRC": "GRC",
  "Offensive Security": "Offense",
  "Defensive Security": "Defense",
  "Forensics": "Forensics",
  "Development": "Dev",
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      className="project-card border border-dim p-8 flex flex-col gap-6 relative h-full"
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap mb-2">
            <span className="text-[10px] font-mono uppercase tracking-widest border border-dim text-white px-2 py-0.5">
              {categoryLabel[project.category]}
            </span>
            {project.featured && (
              <span className="text-[10px] font-mono uppercase tracking-widest border border-white text-white px-2 py-0.5">
                Featured
              </span>
            )}
          </div>
          <h3 className="font-display font-bold text-xl text-white leading-tight">
            {project.title}
          </h3>
          <p className="text-white text-xs font-mono mt-1">{project.subtitle}</p>
        </div>
        {project.period && (
          <span className="text-[10px] text-white font-mono shrink-0 mt-1 text-right leading-relaxed">
            {project.period}
          </span>
        )}
      </div>

      {/* Description */}
      <p className="text-[0.875rem] text-white leading-relaxed font-body flex-1">
        {project.description}
      </p>

      {/* Highlights */}
      <ul className="space-y-1.5">
        {project.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-white font-mono">
            <span className="text-white mt-0.5 shrink-0">›</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* Stack */}
      <div className="flex flex-wrap gap-2 pt-4 border-t border-dim">
        {project.stack.map((s) => (
          <span
            key={s}
            className="text-[10px] font-mono text-white border border-dim px-2 py-0.5 hover:border-white hover:text-white transition-all duration-200"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Corner decorations */}
      <div className="absolute top-0 right-0 w-5 h-5 border-t border-r border-white/20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-5 h-5 border-b border-l border-white/20 pointer-events-none" />
    </motion.article>
  );
}
