"use client";

interface SkillBadgeProps {
  skill: string;
}

export default function SkillBadge({ skill }: SkillBadgeProps) {
  return (
    <span className="skill-badge inline-block border border-dim px-3 py-1 text-xs font-mono text-white hover:border-white hover:text-white transition-all duration-200 cursor-default">
      {skill}
    </span>
  );
}
