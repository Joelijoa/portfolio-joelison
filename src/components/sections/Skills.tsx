"use client";

import { motion } from "framer-motion";
import { skillGroups } from "@/lib/data";
import SkillBadge from "@/components/ui/SkillBadge";

export default function Skills() {
  return (
    <section id="skills" className="py-32 px-6 border-t border-dim">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <p className="font-mono text-xs text-muted uppercase tracking-widest mb-4">03 — Compétences</p>
          <h2
            className="font-display font-black leading-none tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 7vw, 6rem)" }}
          >
            TECHNICAL
            <br />
            <span className="text-muted">STACK</span>
          </h2>
        </motion.div>

        {/* Skills grid */}
        <div className="space-y-0">
          {skillGroups.map((group, gi) => (
            <motion.div
              key={group.category}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: gi * 0.08, ease: "easeOut" }}
              viewport={{ once: true }}
              className="grid grid-cols-1 md:grid-cols-[200px_1fr] gap-6 py-8 border-b border-dim"
            >
              {/* Category label */}
              <div className="flex items-start pt-1">
                <span className="font-mono text-xs text-muted uppercase tracking-widest leading-relaxed">
                  {group.category}
                </span>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, si) => (
                  <motion.div
                    key={skill}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: gi * 0.06 + si * 0.04 }}
                    viewport={{ once: true }}
                  >
                    <SkillBadge skill={skill} />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 font-mono text-xs text-muted"
        >
          <span className="text-white">›</span> Et en constante progression — la cybersécurité n&apos;attend pas.
        </motion.p>
      </div>
    </section>
  );
}
