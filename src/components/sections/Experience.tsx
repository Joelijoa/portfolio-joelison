"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValueEvent,
  AnimatePresence,
  MotionValue,
} from "framer-motion";

type Mission = {
  id: string;
  codename: string;
  company: string;
  period: string;
  status: "ACTIVE" | "COMPLETE";
  clearance: "L2" | "L3" | "L4";
  port: string;
  role: string;
  tags: string[];
  brief: string;
  details: string[];
  methodology: string[];
  outcomes: string[];
  featured?: boolean;
};

const MISSIONS: Mission[] = [
  {
    id: "zerogap",
    codename: "ZEROGAP_GRC_PLATFORM",
    company: "DataProtect — Casablanca",
    period: "Nov 2025 — En cours",
    status: "ACTIVE",
    clearance: "L4",
    port: "443/tcp",
    role: "Stagiaire PFE — GRC Developer",
    featured: true,
    tags: ["React", "Node.js", "PostgreSQL", "Docker", "ISO 27001", "DNSSI", "Groq API", "IA Générative"],
    brief: "Stage PFE au département GRC de DataProtect (Casablanca). Conception et développement complet de ZeroGap, plateforme web de digitalisation des audits de conformité ISO 27001 et DNSSI, de l’analyse des besoins jusqu’à la documentation technique.",
    details: [
      "Système d’évaluation automatique de conformité et de maturité SMSI + tableaux de bord interactifs multi-profils",
      "Workflow de validation des audits, plan d’action correctif et système d’alertes en temps réel",
      "Intégration d’une reformulation automatique des contacts via l’API Groq (IA générative)",
      "Architecture React · Node.js · PostgreSQL · Docker — cahier des charges, maquettes et doc technique",
    ],
    methodology: [
      "Analyse des besoins métier avec les équipes GRC — élaboration du cahier des charges fonctionnel et technique",
      "Conception UX/UI avec wireframes et maquettes Figma — validation itérative avec les auditeurs DataProtect",
      "Développement Agile en sprints de 2 semaines — intégration continue et déploiement Docker",
    ],
    outcomes: [
      "Plateforme couvrant 114 contrôles ISO 27001 et l’ensemble des exigences DNSSI marocaine",
      "Réduction estimée à 60% du temps de préparation des audits de conformité pour les équipes GRC",
      "Dashboard de maturité SMSI avec plans d’action correctifs, traçabilité et alertes temps réel",
      "Reformulation IA des contacts (API Groq) — messages plus clairs et professionnels, générés en temps réel",
    ],
  },
  {
    id: "zero-trust",
    codename: "ZEROTRUST_MICROSEG",
    company: "Mission Freelance — client particulier",
    period: "Avr 2026 — 15 Mai 2026",
    status: "COMPLETE",
    clearance: "L4",
    port: "443/tcp",
    role: "Architecte Sécurité & Pentesteur",
    tags: ["Zero Trust", "Docker Compose", "Authelia", "Wazuh", "NIST SP 800-207", "Pentest"],
    brief: "Étude comparative architecture périmétrique vs Zero Trust en laboratoire Docker Compose (14 services, 6 réseaux isolés). Modèle PDP/PEP, supervision SIEM et trois campagnes de pentest.",
    details: [
      "PDP/PEP avec Nginx + Authelia + lldap selon NIST SP 800-207 — 6 réseaux isolés, 14 services",
      "Wazuh SIEM — corrélation MITRE ATT&CK (règles 100033, 100046–100049)",
      "3 campagnes pentest (Nmap, Hydra, ffuf, Nikto) — compromission classique < 2 min, blast radius confiné Zero Trust",
    ],
    methodology: [
      "Conception réseau : segmentation en 6 réseaux Docker isolés (DMZ, LAN, monitoring, auth, services, pentest)",
      "Déploiement itératif des 14 services avec hardening progressif — TLS mutual, headers de sécurité, nftables",
      "Trois campagnes pentest indépendantes : reconnaissance passive/active, exploitation, élévation, rapport IOC",
    ],
    outcomes: [
      "Architecture périmétrique compromise en < 2 min — propagation latérale totale documentée avec preuves",
      "Architecture Zero Trust : blast radius confiné à 1 seul service, alertes SIEM déclenchées en < 30 secondes",
      "Rapport technique complet avec recommandations NIST SP 800-207 et matrice de risques comparée",
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
    role: "Project Lead & Développeur Frontend",
    tags: ["Project Lead", "Frontend", "Scrum", "Architecture", "API REST"],
    brief: "Project Lead & Développeur Frontend sur Flairie. Encadrement d’une équipe Agile multidisciplinaire (frontend, backend, fonctionnel), pilotage des sprints et participation aux décisions techniques stratégiques.",
    details: [
      "Planification Agile/Scrum — backlog, priorisation, livrables, coordination équipe multidisciplinaire",
      "Décisions techniques stratégiques : architecture, sécurité applicative, qualité du code, API REST",
      "Développement frontend + supervision proactive des risques et résolution des blocages techniques",
    ],
    methodology: [
      "Mise en place du cadre Scrum : definition of done, sprint planning, daily stand-ups, rétrospectives hebdomadaires",
      "Revue de code systématique — standards de qualité, sécurité applicative OWASP, performance frontend",
      "Communication inter-équipes : coordination frontend/backend, arbitrage des conflits techniques et priorisation",
    ],
    outcomes: [
      "Vélocité d’équipe stabilisée sur 3 sprints consécutifs — livraison continue sans régressions majeures",
      "Architecture frontend modulaire et scalable — réduction de 40% du temps d’intégration avec le backend",
      "Onboarding accéléré grâce à la documentation technique et aux standards de code établis",
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
    role: "Stagiaire PFA — Ingénieur SOC",
    tags: ["Wazuh", "NetXMS", "Firewall", "SIEM", "IDS", "SOC"],
    brief: "Mise en place d’un outil de monitoring pour la protection du parc informatique : gestion de crise, alertes de quarantaine et déploiement de Firewall. Configuration Wazuh SIEM/IDS, supervision NetXMS et durcissement réseau.",
    details: [
      "Déploiement Wazuh SIEM — détection d’incidents, centralisation des logs et quarantaines automatisées",
      "Supervision du parc via NetXMS — monitoring hôtes, services et disponibilité temps réel",
      "Durcissement réseau — déploiement et configuration du Firewall avec règles IDS/IPS",
    ],
    methodology: [
      "Audit de l’infrastructure existante — cartographie du parc, identification des risques et lacunes de visibilité",
      "Déploiement progressif Wazuh : agents Windows/Linux, règles de détection personnalisées par criticité",
      "Configuration NetXMS : seuils d’alertes, escalades automatiques, tableaux de bord NOC temps réel",
    ],
    outcomes: [
      "Temps de détection et réponse aux incidents réduit de 45 min à < 5 min grâce à l’automatisation Wazuh",
      "Couverture monitoring à 100% du parc informatique — serveurs, postes de travail, équipements réseau",
      "Zéro incident majeur non détecté sur toute la période de supervision post-déploiement",
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
    role: "Stagiaire — Développeur Full Stack",
    tags: ["Angular CLI", "Spring Boot", "API REST", "Admin Module"],
    brief: "Conception d’une plateforme unifiée pour la documentation, le test et l’administration des APIs. Frontend Angular CLI, backend Spring Boot, module de documentation automatique et espace de test HTTP.",
    details: [
      "Développement frontend Angular CLI — visualisation et test des APIs en temps réel",
      "Backend Spring Boot — gestion des endpoints, authentification et module d’admin (users & rôles)",
      "Intégration d’un module de documentation automatique et d’un espace de test HTTP",
    ],
    methodology: [
      "Analyse des besoins : entretiens avec les développeurs pour identifier les pain points de gestion API",
      "Conception MVC Spring Boot avec JWT auth — endpoints sécurisés, gestion des rôles ADMIN/USER/VIEWER",
      "Interface Angular avec reactive forms, routing protégé et HTTP client pour les tests live d’endpoints",
    ],
    outcomes: [
      "Plateforme déployée et adoptée par l’équipe de développement dès la première semaine de mise en production",
      "Réduction du temps de documentation API estimée à 70% via génération automatique des specs",
      "Module d’administration complet : gestion utilisateurs, rôles, audit log des accès API",
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
    role: "Stagiaire — Développeur Mobile",
    tags: ["Android", "Java", "Firebase", "Firestore", "Mobile Security"],
    brief: "Développement sécurisé d’une application collaborative de recettes culinaires ‘Re7’ en Java/Android. Gestion sécurisée des utilisateurs via Firebase avec contrôle des permissions pour garantir confidentialité et intégrité des données.",
    details: [
      "Développement mobile Java/Android — interface intuitive et architecture sécurisée",
      "Gestion sécurisée via Firebase — Authentication, Firestore, règles d’accès et permissions",
      "Optimisation de la base de données pour un accès rapide et sécurisé aux données partagées",
    ],
    methodology: [
      "Architecture MVC Android avec fragments — navigation fluide, gestion du cycle de vie et états UI",
      "Modèle de sécurité Firebase : règles Firestore granulaires, authentification multi-méthodes, tokens",
      "Tests unitaires et d’intégration — couverture des cas limites, scénarios d’accès non autorisé",
    ],
    outcomes: [
      "Application livrée dans les délais — 0 vulnérabilité critique identifiée lors de la revue de sécurité finale",
      "Règles Firebase couvrant 100% des endpoints — aucun accès non autorisé possible, données chiffrées au repos",
      "Architecture documentée et réutilisable — adoptée comme base de référence pour les projets mobiles suivants",
    ],
  },
];

const CLEARANCE_LABEL: Record<Mission["clearance"], string> = {
  L4: "TOP SECRET",
  L3: "CLASSIFIED",
  L2: "INTERNAL",
};

const N = MISSIONS.length;

/* ── Detail Modal ─────────────────────────────────────────── */
function MissionDetailModal({
  mission,
  onClose,
}: {
  mission: Mission;
  onClose: () => void;
}) {
  const isActive = mission.status === "ACTIVE";

  useEffect(() => {
    window.dispatchEvent(new Event("lenis:stop"));
    const blockScroll = (e: Event) => e.preventDefault();
    window.addEventListener("wheel",     blockScroll, { passive: false });
    window.addEventListener("touchmove", blockScroll, { passive: false });

    const handleKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);

    return () => {
      window.dispatchEvent(new Event("lenis:start"));
      window.removeEventListener("wheel",     blockScroll);
      window.removeEventListener("touchmove", blockScroll);
      window.removeEventListener("keydown", handleKey);
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
        transition={{ duration: 0.24, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl max-h-[88vh] bg-black border border-white/25 flex flex-col font-mono overflow-hidden"
      >
        {/* Scanline overlay */}
        <div
          className="absolute inset-0 pointer-events-none z-10"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.015) 2px, rgba(255,255,255,0.015) 4px)",
          }}
        />

        {/* Header */}
        <div className="border-b border-white/15 px-5 py-3 flex items-start justify-between shrink-0 relative z-20">
          <div className="flex flex-col gap-0.5">
            <p className="text-[8px]">
              <span className="text-green-400">root@joelison:~$ </span>
              <span className="text-white/50">
                cat /ops/{mission.id}/full_report.enc | decrypt --clearance={mission.clearance}
              </span>
            </p>
            <p className="text-[8px] text-white/30">
              Decrypting... <span className="text-white/60">DONE</span> &middot; Access{" "}
              <span className="text-white/60">GRANTED</span>
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
        <div className="border-b border-white/8 bg-white/[0.025] px-5 py-1.5 flex items-center gap-4 shrink-0 relative z-20">
          <span className="text-[7px] border border-white/35 text-white px-1.5 py-0.5 uppercase tracking-widest">
            [{CLEARANCE_LABEL[mission.clearance]}]
          </span>
          <span className="text-[7px] text-white/30">/ops/{mission.id}/full_report.enc</span>
          <span className="ml-auto text-[7px] text-white/30">{mission.period}</span>
        </div>

        {/* Scrollable body */}
        <div
          className="flex-1 overflow-y-auto overscroll-contain p-5 space-y-6 relative z-20"
          onWheel={(e) => e.stopPropagation()}
          onTouchMove={(e) => e.stopPropagation()}
        >

          {/* Operation title */}
          <div>
            <div className="text-[7px] text-white/35 uppercase tracking-widest mb-1">OPERATION:</div>
            <div className="flex items-center gap-3 flex-wrap mb-2">
              <h2
                className="font-display font-black text-white leading-none tracking-tight"
                style={{ fontSize: "clamp(1.3rem, 3vw, 1.9rem)" }}
              >
                {mission.codename}
              </h2>
              {mission.featured && (
                <span className="font-mono text-[7px] uppercase tracking-widest border border-green-400/70 text-green-400 px-1.5 py-0.5 whitespace-nowrap">
                  &#9733; Featured
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[8px] text-white/50">
              <span>PORT: {mission.port}</span>
              <span>&middot;</span>
              <span>CLEARANCE: {mission.clearance}</span>
              <span>&middot;</span>
              {isActive ? (
                <motion.span
                  animate={{ opacity: [1, 0.3, 1] }}
                  transition={{ duration: 1.4, repeat: Infinity }}
                  className="text-white"
                >
                  &#9679; ACTIVE
                </motion.span>
              ) : (
                <span>&#10003; COMPLETE</span>
              )}
            </div>
          </div>

          {/* Role & Operator */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <div className="text-[7px] text-white/35 uppercase tracking-widest mb-0.5">ROLE:</div>
              <div className="text-[10px] text-white">{mission.role}</div>
            </div>
            <div>
              <div className="text-[7px] text-white/35 uppercase tracking-widest mb-0.5">OPERATOR:</div>
              <div className="text-[10px] text-white">{mission.company}</div>
            </div>
          </div>

          <div className="h-px bg-white/10" />

          {/* Mission brief */}
          <div>
            <div className="text-[7px] text-blue-400 uppercase tracking-widest mb-2">&#8212; MISSION BRIEF</div>
            <p className="text-[10px] text-white/75 leading-relaxed">{mission.brief}</p>
          </div>

          {/* Technical details */}
          <div>
            <div className="text-[7px] text-blue-400 uppercase tracking-widest mb-2">&#8212; TECHNICAL DETAILS</div>
            <div className="space-y-2">
              {mission.details.map((d, i) => (
                <div key={i} className="flex items-start gap-2 text-[10px]">
                  <span className="text-white/35 shrink-0 mt-0.5">&#8250;</span>
                  <span className="text-white/75">{d}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Methodology */}
          <div>
            <div className="text-[7px] text-blue-400 uppercase tracking-widest mb-2">&#8212; METHODOLOGY</div>
            <div className="space-y-2">
              {mission.methodology.map((m, i) => (
                <div key={i} className="flex items-start gap-2 text-[10px]">
                  <span className="text-white/35 shrink-0 mt-0.5">&#8250;</span>
                  <span className="text-white/75">{m}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Outcomes */}
          <div>
            <div className="text-[7px] text-blue-400 uppercase tracking-widest mb-2">&#8212; OUTCOMES & RESULTS</div>
            <div className="space-y-2">
              {mission.outcomes.map((o, i) => (
                <div key={i} className="flex items-start gap-2 text-[10px]">
                  <span className="text-white shrink-0 mt-0.5">&#10003;</span>
                  <span className="text-white/75">{o}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tools & Stack */}
          <div>
            <div className="text-[7px] text-blue-400 uppercase tracking-widest mb-2">&#8212; TOOLS & STACK</div>
            <div className="flex flex-wrap gap-1.5">
              {mission.tags.map((tag) => (
                <span key={tag} className="text-[8px] text-white/70 border border-white/20 px-2 py-0.5">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-white/10 px-5 py-2 flex items-center justify-between shrink-0 relative z-20">
          <span className="text-[7px] text-white/25 uppercase tracking-widest">
            EOF &#8212; /ops/{mission.id}/full_report.enc
          </span>
          <span className="text-[7px] text-white/25">CLEARANCE {mission.clearance}</span>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ── Mission slide ────────────────────────────────────────── */
function MissionSlide({
  mission,
  index,
  scrollYProgress,
  onOpen,
  isActiveSlide,
}: {
  mission: Mission;
  index: number;
  scrollYProgress: MotionValue<number>;
  onOpen: (m: Mission) => void;
  isActiveSlide: boolean;
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

  const isActive  = mission.status === "ACTIVE";
  const detailOps = [det0Op, det1Op, det2Op];

  return (
    <motion.div
      style={{ opacity: slideOpacity, x: slideX }}
      className="absolute inset-0 flex items-center pt-14 sm:pt-10 md:pt-6 px-4 sm:px-8 md:px-12 lg:px-16 pointer-events-none"
    >
      <div className="max-w-[1400px] mx-auto w-full">

        {/* Top meta */}
        <motion.div
          style={{ opacity: headerOp, y: headerY }}
          className="font-mono text-[9px] text-white uppercase tracking-widest mb-6 flex items-center gap-4"
        >
          <span>{mission.port}</span>
          <span>&middot;</span>
          <span>CLEARANCE {mission.clearance}</span>
          <span>&middot;</span>
          {isActive ? (
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="text-white"
            >
              &#9679; ACTIVE
            </motion.span>
          ) : (
            <span>&#10003; COMPLETE</span>
          )}
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-10 lg:gap-16 items-start">

          {/* LEFT */}
          <div className="flex flex-col gap-5">
            <motion.div style={{ opacity: headerOp, y: headerY }} className="flex items-center gap-3 flex-wrap">
              <h3
                style={{ fontSize: "clamp(1.6rem, 4vw, 3.2rem)" }}
                className="font-display font-black text-white leading-none tracking-tight"
              >
                {mission.codename}
              </h3>
              {mission.featured && (
                <span className="font-mono text-[9px] uppercase tracking-widest border border-green-400/70 text-green-400 px-2 py-1 whitespace-nowrap">
                  &#9733; Featured
                </span>
              )}
            </motion.div>

            <div className="h-px bg-dim overflow-hidden">
              <motion.div style={{ scaleX: lineScale }} className="origin-left h-full bg-white" />
            </div>

            <motion.div style={{ opacity: metaOp }} className="flex items-center gap-6 font-mono text-[11px]">
              <div>
                <div className="text-white text-[8px] uppercase tracking-widest mb-0.5">Operator</div>
                <div className="text-white">{mission.company}</div>
              </div>
              <div className="w-px h-7 bg-dim" />
              <div>
                <div className="text-white text-[8px] uppercase tracking-widest mb-0.5">Duration</div>
                <div className="text-white">{mission.period}</div>
              </div>
            </motion.div>

            <motion.p style={{ opacity: briefOp }} className="font-mono text-[11px] text-white leading-relaxed">
              {mission.brief}
            </motion.p>

            <div className="space-y-2 mt-1">
              {detailOps.map((op, i) => (
                <motion.div
                  key={i}
                  style={{ opacity: op }}
                  className="flex items-start gap-3 font-mono text-[10px]"
                >
                  <span className="text-white shrink-0 mt-0.5">&#8250;</span>
                  <span className="text-white">{mission.details[i]}</span>
                </motion.div>
              ))}
            </div>
          </div>

          {/* RIGHT: terminal block */}
          <motion.div
            style={{ opacity: tagsOp }}
            className={`border border-dim p-5 font-mono ${isActiveSlide ? "pointer-events-auto" : "pointer-events-none"}`}
          >
            <div className="text-[8px] text-white/50 uppercase tracking-widest mb-4">
              <span className="text-green-400">$ </span>
              <span>nmap --target={mission.id} -sV</span>
            </div>

            <div className="space-y-2 mb-5">
              {mission.tags.map((tag, i) => (
                <div key={tag} className="flex items-center gap-3 text-[10px]">
                  <span className="text-white/40">{String(i + 1).padStart(2, "0")}</span>
                  <span className="text-white/40">&#8250;</span>
                  <span className="text-white">{tag}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-dim pt-3 flex items-center justify-between text-[8px] mb-3">
              <span className="text-white/40">EXIT_CODE</span>
              <span className="text-white">{isActive ? "RUNNING..." : "0x00 OK"}</span>
            </div>

            {/* Open detail button */}
            <button
              onClick={() => onOpen(mission)}
              className="group relative w-full overflow-hidden border border-green-400/70 hover:border-green-400 py-3 px-3 transition-all duration-200 flex items-center justify-between"
            >
              <span className="absolute inset-0 bg-green-400 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />

              <span className="relative flex items-center gap-2 text-[9px] uppercase tracking-widest font-mono text-green-400 group-hover:text-black transition-colors duration-200">
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-green-400 group-hover:bg-black inline-block shrink-0 transition-colors duration-200"
                />
                VIEW FULL REPORT
              </span>

              <motion.span
                animate={{ x: [0, 4, 0] }}
                transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
                className="relative text-[10px] text-green-400 group-hover:text-black transition-colors duration-200"
              >
                &#8594;
              </motion.span>
            </button>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Mobile card (stacked, no scroll-jacking) ───────────────── */
function MobileMissionCard({ mission, index, onOpen }: {
  mission: Mission;
  index: number;
  onOpen: (m: Mission) => void;
}) {
  const isActive = mission.status === "ACTIVE";
  return (
    <div className="border border-dim bg-black font-mono">
      <div className="border-b border-dim px-4 py-3 flex items-center justify-between">
        <span className="text-[9px] text-white/50">
          {String(index + 1).padStart(2, "0")}/{MISSIONS.length}
        </span>
        {isActive ? (
          <span className="text-[9px] text-white flex items-center gap-1.5">
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-white inline-block"
            />
            ACTIVE
          </span>
        ) : (
          <span className="text-[9px] text-white/50">&#10003; COMPLETE</span>
        )}
      </div>

      <div className="px-4 py-4 flex flex-col gap-3">
        <div className="flex items-center gap-2 flex-wrap">
          <h3
            className="font-display font-black text-white leading-tight"
            style={{ fontSize: "clamp(1.15rem, 5.5vw, 1.5rem)" }}
          >
            {mission.codename}
          </h3>
          {mission.featured && (
            <span className="text-[8px] uppercase tracking-widest border border-green-400/70 text-green-400 px-1.5 py-0.5 whitespace-nowrap">
              &#9733; Featured
            </span>
          )}
        </div>

        <div className="text-[10px] text-white/50">
          {mission.company} &middot; {mission.period}
        </div>

        <p className="text-[12px] text-white/80 leading-relaxed">{mission.brief}</p>

        <div className="flex flex-wrap gap-1.5">
          {mission.tags.slice(0, 6).map((t) => (
            <span key={t} className="text-[9px] text-white border border-dim/60 px-2 py-0.5">
              {t}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={() => onOpen(mission)}
        className="w-full border-t border-dim px-4 py-3 flex items-center justify-center gap-2 text-[10px] uppercase tracking-widest text-green-400 active:bg-green-400 active:text-black transition-colors"
      >
        VIEW FULL REPORT &#8594;
      </button>
    </div>
  );
}

/* ── Progress bar ─────────────────────────────────────────── */
function ProgressBar({
  activeIdx,
  scrollYProgress,
}: {
  activeIdx: number;
  scrollYProgress: MotionValue<number>;
}) {
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

/* ── Main ─────────────────────────────────────────────────── */
export default function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedMission, setSelectedMission] = useState<Mission | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActiveIdx(Math.min(Math.floor(v * N), N - 1));
  });

  return (
    <div id="experience">
      {/* Desktop — scrollytelling épinglé */}
      <div
        ref={containerRef}
        style={{ height: `${N * 100 + 120}vh` }}
        className="relative hidden md:block"
      >
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* Top-left */}
          <div className="absolute top-20 left-4 sm:left-8 md:left-12 lg:left-16 z-20 font-mono text-[10px]">
            <span className="text-green-400">root@joelison:~$ </span>
            <span className="text-white/50">cat /ops/field_log.enc | decrypt</span>
          </div>

          {/* Top-right */}
          <div className="hidden sm:block absolute top-20 right-4 sm:right-8 md:right-12 lg:right-16 z-20 font-mono text-[10px] text-white/40 uppercase tracking-widest">
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
                onOpen={setSelectedMission}
                isActiveSlide={i === activeIdx}
              />
            ))}
          </div>

          {/* Bottom progress */}
          <div className="absolute bottom-8 left-4 sm:left-8 md:left-12 lg:left-16 right-4 sm:right-8 md:right-12 lg:right-16 z-20">
            <div className="flex items-center justify-between font-mono text-[10px] text-white mb-2">
              <span>
                OPERATION{" "}
                <span className="text-white">{String(activeIdx + 1).padStart(2, "0")}</span>
                /{N}
              </span>
              <span className="text-white">{MISSIONS[activeIdx]?.codename ?? ""}</span>
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

      {/* Mobile — liste empilée, scroll natif */}
      <div className="md:hidden px-4 py-16">
        <div className="mb-6 font-mono text-[10px]">
          <span className="text-green-400">root@joelison:~$ </span>
          <span className="text-white/50">cat /ops/field_log.enc | decrypt</span>
        </div>

        <div className="flex flex-col gap-4">
          {MISSIONS.map((mission, i) => (
            <MobileMissionCard
              key={mission.id}
              mission={mission}
              index={i}
              onOpen={setSelectedMission}
            />
          ))}
        </div>
      </div>

      {/* Detail modal */}
      <AnimatePresence>
        {selectedMission && (
          <MissionDetailModal
            mission={selectedMission}
            onClose={() => setSelectedMission(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
