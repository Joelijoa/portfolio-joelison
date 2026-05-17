"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";
import ProjectCard from "@/components/ui/ProjectCard";

const CATEGORIES: Array<Project["category"] | "All"> = [
  "All",
  "GRC",
  "Offensive Security",
  "Defensive Security",
  "Forensics",
  "Development",
];

export default function Projects() {
  const [filter, setFilter] = useState<Project["category"] | "All">("All");

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-32 px-6 border-t border-dim">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">02 — Projets</p>
          <h2
            className="font-display font-black leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            SELECTED
            <br />
            <span className="text-muted">WORK</span>
          </h2>
        </motion.div>

        {/* Filter */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          viewport={{ once: true }}
          className="flex flex-wrap gap-2 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`font-mono text-[10px] uppercase tracking-widest px-3 py-1.5 border transition-all duration-200 ${
                filter === cat
                  ? "border-white text-white bg-white/5"
                  : "border-dim text-muted hover:border-white/40 hover:text-white/60"
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={filter}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-dim"
          >
            {filtered.map((project, i) => (
              <div key={project.id} className="bg-black">
                <ProjectCard project={project} index={i} />
              </div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Count */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-6 font-mono text-xs text-muted text-right"
        >
          {filtered.length} / {projects.length} projets affichés
        </motion.p>
      </div>
    </section>
  );
}
