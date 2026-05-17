"use client";

import { motion } from "framer-motion";
import { experiences } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" className="py-32 px-6 border-t border-dim">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">04 — Parcours</p>
          <h2
            className="font-display font-black leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            EXPERIENCE
            <br />
            <span className="text-muted">TIMELINE</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            viewport={{ once: true }}
            className="absolute left-0 md:left-[220px] top-0 bottom-0 w-px bg-dim origin-top hidden sm:block"
          />

          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: i * 0.12, ease: "easeOut" }}
                viewport={{ once: true }}
                className="grid grid-cols-1 md:grid-cols-[220px_1fr] gap-6 py-10 border-b border-dim relative"
              >
                {/* Date + dot */}
                <div className="flex flex-col gap-1 md:text-right md:pr-10">
                  <span className="font-mono text-xs text-muted">{exp.period}</span>
                  <span className="font-mono text-xs text-white/40">{exp.company}</span>

                  {/* Dot on timeline */}
                  <div className="hidden sm:block absolute left-[216px] top-10 w-2 h-2 border border-white bg-black translate-x-[-4px]" />
                </div>

                {/* Content */}
                <div className="md:pl-10">
                  <div className="flex items-start gap-3 mb-3 flex-wrap">
                    <h3 className="font-display font-bold text-white text-lg leading-tight">
                      {exp.role}
                    </h3>
                    {exp.current && (
                      <span className="font-mono text-[10px] uppercase tracking-widest border border-white text-white px-2 py-0.5 mt-0.5">
                        En cours
                      </span>
                    )}
                  </div>

                  <p className="font-body text-muted text-sm leading-relaxed mb-5">
                    {exp.description}
                  </p>

                  <div className="flex flex-wrap gap-2">
                    {exp.tags.map((tag) => (
                      <span
                        key={tag}
                        className="font-mono text-[10px] uppercase tracking-wide text-muted border border-dim px-2 py-0.5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
