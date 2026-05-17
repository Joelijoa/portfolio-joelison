"use client";

import { motion } from "framer-motion";
import type { Project } from "@/lib/data";

const categoryColors: Record<Project["category"], string> = {
  "GRC": "text-white border-white",
  "Offensive Security": "text-muted border-dim",
  "Defensive Security": "text-muted border-dim",
  "Forensics": "text-muted border-dim",
  "Development": "text-muted border-dim",
};

interface ProjectCardProps {
  project: Project;
  index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-80px" }}
      className={`project-card border border-dim p-8 flex flex-col gap-6 relative ${
        project.featured ? "md:col-span-1" : ""
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <span
              className={`text-[10px] font-mono uppercase tracking-widest border px-2 py-0.5 ${
                categoryColors[project.category]
              }`}
            >
              {project.category}
            </span>
            {project.featured && (
              <span className="text-[10px] font-mono uppercase tracking-widest text-white border border-white px-2 py-0.5">
                Featured
              </span>
            )}
          </div>
          <h3 className="font-display font-bold text-xl text-white leading-tight">
            {project.title}
          </h3>
          <p className="text-muted text-xs font-mono mt-1">{project.subtitle}</p>
        </div>
        {project.period && (
          <span className="text-[10px] text-muted font-mono shrink-0 mt-1">{project.period}</span>
        )}
      </div>

      {/* Description */}
      <p className="text-[0.875rem] text-muted leading-relaxed font-body flex-1">
        {project.description}
      </p>

      {/* Highlights */}
      <ul className="space-y-1.5">
        {project.highlights.map((h, i) => (
          <li key={i} className="flex items-start gap-2 text-xs text-muted font-mono">
            <span className="text-white mt-0.5 shrink-0">›</span>
            <span>{h}</span>
          </li>
        ))}
      </ul>

      {/* Stack */}
      <div className="flex flex-wrap gap-2 pt-2 border-t border-dim">
        {project.stack.map((s) => (
          <span
            key={s}
            className="text-[10px] font-mono text-muted border border-dim px-2 py-0.5 hover:border-white hover:text-white transition-all duration-200"
          >
            {s}
          </span>
        ))}
      </div>

      {/* Decorative corner */}
      <div className="absolute top-0 right-0 w-6 h-6 border-t border-r border-white opacity-30" />
      <div className="absolute bottom-0 left-0 w-6 h-6 border-b border-l border-white opacity-30" />
    </motion.article>
  );
}
