"use client";

import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  MotionValue,
} from "framer-motion";

const MISSIONS = [
  {
    id: "zero-trust",
    codename: "ZEROTRUST_MICROSEG",
    company: "Mission Freelance — client particulier",
    period: "Avr 2026 — 15 Mai 2026",
    status: "COMPLETE",
    clearance: "L4",
    port: "443/tcp",
    tags: ["Zero Trust", "Docker Compose", "Authelia", "Wazuh", "NIST SP 800-207", "Pentest"],
    brief: "Étude comparative architecture périmétrique vs Zero Trust en laboratoire Docker Compose (14 services, 6 réseaux isolés). Modèle PDP/PEP, supervision SIEM et trois campagnes de pentest.",
    details: [
      "PDP/PEP avec Nginx + Authelia + lldap selon NIST SP 800-207 — 6 réseaux isolés, 14 services",
      "Wazuh SIEM — corrélation MITRE ATT&CK (règles 100033, 100046–100049)",
      "3 campagnes pentest (Nmap, Hydra, ffuf, Nikto) — compromission classique < 2 min, blast radius confiné Zero Trust",
    ],
  },
  {
    id: "zerogap",
    codename: "ZEROGAP_GRC_PLATFORM",
    company: "DataProtect — Casablanca",
    period: "Nov 2025 — En cours",
    status: "ACTIVE",
    clearance: "L4",
    port: "443/tcp",
    tags: ["React", "Node.js", "PostgreSQL", "Docker", "ISO 27001", "DNSSI"],
    brief: "Stage PFE au département GRC de DataProtect (Casablanca). Conception et développement complet de ZeroGap, plateforme web de digitalisation des audits de conformité ISO 27001 et DNSSI, de l'analyse des besoins jusqu'à la documentation technique.",
    details: [
      "Système d'évaluation automatique de conformité et de maturité SMSI + tableaux de bord interactifs multi-profils",
      "Workflow de validation des audits, plan d'action correctif et système d'alertes en temps réel",
      "Architecture React · Node.js · PostgreSQL · Docker — cahier des charges, maquettes et doc technique",
    ],
  },
  {
    id: "flairie",
    codename: "FLAIRIE_LEAD_FRONTEND",
    company: "Neerelab Technology",
    period: "Déc 2025 — En cours",
    status: "ACTIVE",
    clearance: "L4",
    port: "443/tcp",
    tags: ["Project Lead", "Frontend", "Scrum", "Architecture", "API REST"],
    brief: "Project Lead & Développeur Frontend sur Flairie. Encadrement d'une équipe Agile multidisciplinaire (frontend, backend, fonctionnel), pilotage des sprints et participation aux décisions techniques stratégiques.",
    details: [
      "Planification Agile/Scrum — backlog, priorisation, livrables, coordination équipe multidisciplinaire",
      "Décisions techniques stratégiques : architecture, sécurité applicative, qualité du code, API REST",
      "Développement frontend + supervision proactive des risques et résolution des blocages techniques",
    ],
  },
  {
    id: "stage-monitoring",
    codename: "SOC_MONITORING_FIREWALL",
    company: "Neerelab Technology — Rabat",
    period: "Mai 2025 — Nov 2025",
    status: "COMPLETE",
    clearance: "L3",
    port: "8080/tcp",
    tags: ["Wazuh", "NetXMS", "Firewall", "SIEM", "IDS", "SOC"],
    brief: "Mise en place d'un outil de monitoring pour la protection du parc informatique : gestion de crise, alertes de quarantaine et déploiement de Firewall. Configuration Wazuh SIEM/IDS, supervision NetXMS et durcissement réseau.",
    details: [
      "Déploiement Wazuh SIEM — détection d'incidents, centralisation des logs et quarantaines automatisées",
      "Supervision du parc via NetXMS — monitoring hôtes, services et disponibilité temps réel",
      "Durcissement réseau — déploiement et configuration du Firewall avec règles IDS/IPS",
    ],
  },
  {
    id: "stage-api",
    codename: "API_UNIFIED_PLATFORM",
    company: "Univers Plancher — Temara",
    period: "Juin 2024 — Juil 2024",
    status: "COMPLETE",
    clearance: "L2",
    port: "3000/tcp",
    tags: ["Angular CLI", "Spring Boot", "API REST", "Admin Module"],
    brief: "Conception d'une plateforme unifiée pour la documentation, le test et l'administration des APIs. Frontend Angular CLI, backend Spring Boot, module de documentation automatique et espace de test HTTP.",
    details: [
      "Développement frontend Angular CLI — visualisation et test des APIs en temps réel",
      "Backend Spring Boot — gestion des endpoints, authentification et module d'admin (users & rôles)",
      "Intégration d'un module de documentation automatique et d'un espace de test HTTP",
    ],
  },
  {
    id: "stage-re7",
    codename: "MOBILE_APP_RE7",
    company: "ISMAGI — Rabat",
    period: "Févr 2024 — Mai 2024",
    status: "COMPLETE",
    clearance: "L2",
    port: "5432/tcp",
    tags: ["Android", "Java", "Firebase", "Firestore", "Mobile Security"],
    brief: "Développement sécurisé d'une application collaborative de recettes culinaires 'Re7' en Java/Android. Gestion sécurisée des utilisateurs via Firebase avec contrôle des permissions pour garantir confidentialité et intégrité des données.",
    details: [
      "Développement mobile Java/Android — interface intuitive et architecture sécurisée",
      "Gestion sécurisée via Firebase — Authentication, Firestore, règles d'accès et permissions",
      "Optimisation de la base de données pour un accès rapide et sécurisé aux données partagées",
    ],
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
  const p = (frac: number) => start + step * frac;

  const slideOpacity = useTransform(
    scrollYProgress,
    [start - step * 0.2, start, end - step * 0.1, end],
    [0, 1, 1, 0]
  );
  const slideX = useTransform(
    scrollYProgress,
    [start - step * 0.3, start, end - step * 0.1, end],
    [70, 0, 0, -50]
  );

  const headerOp  = useTransform(scrollYProgress, [p(0.00), p(0.14)], [0, 1]);
  const headerY   = useTransform(scrollYProgress, [p(0.00), p(0.14)], [30, 0]);
  const lineScale = useTransform(scrollYProgress, [p(0.14), p(0.30)], [0, 1]);
  const metaOp    = useTransform(scrollYProgress, [p(0.22), p(0.36)], [0, 1]);
  const briefOp   = useTransform(scrollYProgress, [p(0.30), p(0.44)], [0, 1]);
  const det0Op    = useTransform(scrollYProgress, [p(0.40), p(0.52)], [0, 1]);
  const det1Op    = useTransform(scrollYProgress, [p(0.50), p(0.62)], [0, 1]);
  const det2Op    = useTransform(scrollYProgress, [p(0.60), p(0.72)], [0, 1]);
  const tagsOp    = useTransform(scrollYProgress, [p(0.68), p(0.80)], [0, 1]);

  const isActive   = mission.status === "ACTIVE";
  const detailOps  = [det0Op, det1Op, det2Op];

  return (
    <motion.div
      style={{ opacity: slideOpacity, x: slideX }}
      className="absolute inset-0 flex items-center px-6 md:px-16 pointer-events-none"
    >
      <div className="max-w-[1400px] mx-auto w-full">

        {/* Top meta */}
        <motion.div
          style={{ opacity: headerOp, y: headerY }}
          className="font-mono text-[9px] text-muted/30 uppercase tracking-widest mb-6 flex items-center gap-4"
        >
          <span>{mission.port}</span>
          <span>·</span>
          <span>CLEARANCE {mission.clearance}</span>
          <span>·</span>
          {isActive ? (
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="text-white"
            >
              ● ACTIVE
            </motion.span>
          ) : (
            <span>✓ COMPLETE</span>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">

          {/* LEFT: main content */}
          <div className="flex flex-col gap-5">
            {/* Codename */}
            <motion.h3
              style={{ opacity: headerOp, y: headerY, fontSize: "clamp(1.6rem, 4vw, 3.2rem)" }}
              className="font-display font-black text-white leading-none tracking-tight"
            >
              {mission.codename}
            </motion.h3>

            {/* Divider line */}
            <div className="h-px bg-dim overflow-hidden">
              <motion.div style={{ scaleX: lineScale }} className="origin-left h-full bg-white" />
            </div>

            {/* Company + period */}
            <motion.div style={{ opacity: metaOp }} className="flex items-center gap-6 font-mono text-[11px]">
              <div>
                <div className="text-muted/30 text-[8px] uppercase tracking-widest mb-0.5">Operator</div>
                <div className="text-white">{mission.company}</div>
              </div>
              <div className="w-px h-7 bg-dim" />
              <div>
                <div className="text-muted/30 text-[8px] uppercase tracking-widest mb-0.5">Duration</div>
                <div className="text-muted">{mission.period}</div>
              </div>
            </motion.div>

            {/* Brief */}
            <motion.p style={{ opacity: briefOp }} className="font-mono text-[11px] text-muted leading-relaxed">
              {mission.brief}
            </motion.p>

            {/* Detail lines */}
            <div className="space-y-2 mt-1">
              {detailOps.map((op, i) => (
                <motion.div
                  key={i}
                  style={{ opacity: op }}
                  className="flex items-start gap-3 font-mono text-[10px]"
                >
                  <span className="text-white/20 shrink-0 mt-0.5">›</span>
                  <span className="text-muted/70">{mission.details[i]}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: terminal block */}
          <motion.div
            style={{ opacity: tagsOp }}
            className="border border-dim p-5 font-mono pointer-events-auto"
          >
            <div className="text-[8px] text-muted/30 uppercase tracking-widest mb-4">
              $ nmap --target={mission.id} -sV
            </div>
            <div className="space-y-2 mb-5">
              {mission.tags.map((tag, i) => (
                <div key={tag} className="flex items-center gap-3 text-[10px]">
                  <span className="text-white/15">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-muted/30">›</span>
                  <span className={isActive && i === 0 ? "text-white" : "text-muted/60"}>{tag}</span>
                </div>
              ))}
            </div>
            <div className="border-t border-dim pt-3 flex items-center justify-between text-[8px]">
              <span className="text-muted/30">EXIT_CODE</span>
              <span className={isActive ? "text-white" : "text-muted/50"}>
                {isActive ? "RUNNING..." : "0x00 OK"}
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

function ProgressBar({ activeIdx, scrollYProgress }: { activeIdx: number; scrollYProgress: MotionValue<number> }) {
  const step = 1 / N;
  const w = useTransform(
    scrollYProgress,
    [activeIdx * step, (activeIdx + 1) * step],
    ["0%", "100%"]
  );
  return (
    <div className="w-full h-px bg-dim overflow-hidden relative">
      <motion.div style={{ width: w }} className="absolute left-0 top-0 h-full bg-white" />
    </div>
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

  return (
    <div
      ref={containerRef}
      id="experience"
      style={{ height: `${N * 100 + 120}vh` }}
      className="relative"
    >
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Top-left */}
        <div className="absolute top-14 left-6 md:left-16 z-20 font-mono text-[10px]">
          <span className="text-muted">root@compromised:~$ </span>
          <span className="text-white">cat /ops/field_log.enc | decrypt</span>
        </div>

        {/* Top-right */}
        <div className="absolute top-14 right-6 md:right-16 z-20 font-mono text-[10px] text-muted/30 uppercase tracking-widest">
          FIELD_OPERATIONS
        </div>

        {/* Slides */}
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

        {/* Bottom progress */}
        <div className="absolute bottom-8 left-6 md:left-16 right-6 md:right-16 z-20">
          <div className="flex items-center justify-between font-mono text-[10px] text-muted mb-2">
            <span>
              OPERATION{" "}
              <span className="text-white">{String(activeIdx + 1).padStart(2, "0")}</span>
              /{N}
            </span>
            <span className="text-muted/40">{MISSIONS[activeIdx]?.codename ?? ""}</span>
          </div>
          <ProgressBar activeIdx={activeIdx} scrollYProgress={scrollYProgress} />
          <div className="flex gap-2 mt-2">
            {MISSIONS.map((_, i) => (
              <div
                key={i}
                className={`h-px flex-1 transition-colors duration-300 ${i <= activeIdx ? "bg-white" : "bg-dim"}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
