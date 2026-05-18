export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: "GRC" | "Offensive Security" | "Defensive Security" | "Forensics" | "Development";
  description: string;
  highlights: string[];
  stack: string[];
  featured: boolean;
  period?: string;
  company?: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}

export interface Experience {
  id: string;
  role: string;
  project?: string;
  company: string;
  period: string;
  current: boolean;
  description: string;
  tags: string[];
}

export const projects: Project[] = [
  {
    id: "zerogap-platform",
    title: "ZeroGap — Plateforme d'Audit GRC",
    subtitle: "Stage PFE — DataProtect, Rabat",
    category: "GRC",
    description:
      "Conception et développement complet de ZeroGap, une plateforme web de digitalisation des audits de conformité ISO 27001 et DNSSI. Système d'évaluation automatique de maturité SMSI, tableaux de bord interactifs multi-profils, workflow de validation des audits et plan d'action correctif avec alertes temps réel.",
    highlights: [
      "Système d'évaluation automatique du niveau de conformité et de maturité SMSI",
      "Tableaux de bord interactifs avec graphiques synthétisant les résultats d'audit par profil",
      "Workflow de validation des audits et plan d'action correctif avec alertes temps réel",
      "Rédaction de la documentation technique complète de l'application",
    ],
    stack: ["React", "Node.js", "PostgreSQL", "Docker", "ISO 27001", "DNSSI"],
    featured: true,
    period: "Nov. 2025 — En cours",
    company: "DataProtect",
  },
  {
    id: "pentest-ms17-010",
    title: "Pentest Windows MS17-010",
    subtitle: "Exploitation EternalBlue — NT AUTHORITY\\SYSTEM",
    category: "Offensive Security",
    description:
      "Détection et exploitation complète de la vulnérabilité SMB MS17-010 (EternalBlue) permettant l'exécution de code à distance via payload Metasploit, avec élévation de privilèges jusqu'à NT AUTHORITY\\SYSTEM. Phase de post-exploitation suivie d'un rapport professionnel avec recommandations techniques et mesures correctives.",
    highlights: [
      "Exploitation SMB MS17-010 via EternalBlue — exécution de code à distance",
      "Élévation de privilèges jusqu'à NT AUTHORITY\\SYSTEM",
      "Post-exploitation : collecte d'infos système, extraction de credentials, surfaces d'attaque",
      "Rapport professionnel avec recommandations techniques et mesures correctives CVSS",
    ],
    stack: ["Metasploit", "Nmap", "Kali Linux", "Windows Server", "SMBv1", "EternalBlue"],
    featured: true,
    period: "Nov. 2025 — Jan. 2026",
  },
  {
    id: "audit-ssi-iso27001",
    title: "Audit SSI — ISO 27001 & EBIOS RM",
    subtitle: "Gouvernance, risques et conformité SMSI",
    category: "GRC",
    description:
      "Audit de sécurité des systèmes d'information complet selon la norme ISO 27001 et la méthode EBIOS Risk Manager. Analyse de la gouvernance SSI, identification des actifs critiques, construction d'une matrice de risques, modélisation des scénarios de menace et élaboration du Statement of Applicability (SOA).",
    highlights: [
      "Analyse de la gouvernance SSI et identification des actifs critiques (BDD, API, serveurs)",
      "Construction d'une matrice de risques — menaces, vulnérabilités, impacts",
      "Application EBIOS RM pour modélisation des scénarios de menace et chaînes d'attaque",
      "Élaboration du SOA et plan d'amélioration basé sur les écarts de conformité",
    ],
    stack: ["ISO 27001", "EBIOS RM", "DNSSI", "SOA", "SMSI", "Risk Matrix"],
    featured: true,
    period: "Nov. 2025 — Jan. 2026",
  },
  {
    id: "siem-monitoring",
    title: "SIEM & Monitoring — Protection du Parc",
    subtitle: "Wazuh · NetXMS · Firewall · Quarantaine",
    category: "Defensive Security",
    description:
      "Déploiement et configuration de Wazuh pour la détection d'incidents et la centralisation des logs. Supervision du parc informatique via NetXMS (monitoring hôtes, services, disponibilité). Gestion des alertes critiques avec mises en quarantaine automatisées et durcissement réseau via déploiement et configuration du Firewall.",
    highlights: [
      "Déploiement Wazuh SIEM — détection d'incidents et centralisation des logs",
      "Supervision via NetXMS — monitoring hôtes, services et disponibilité temps réel",
      "Gestion des alertes critiques avec quarantaines automatisées via Wazuh",
      "Durcissement réseau — déploiement et configuration du Firewall (règles IDS/IPS)",
    ],
    stack: ["Wazuh", "NetXMS", "Snort", "Suricata", "Linux", "Firewall"],
    featured: false,
    period: "Mai. 2025 — Nov. 2025",
    company: "Neerelab Technology",
  },
  {
    id: "forensics-dfir",
    title: "DFIR & Malware Analysis",
    subtitle: "Forensique mémoire · AsyncRAT · Cobalt Strike · Ghidra",
    category: "Forensics",
    description:
      "Analyse mémoire avancée d'un système Windows infecté avec Volatility2 — détection d'artefacts liés à AsyncRAT, Cobalt Strike et MasonRAT, identification de processus injectés et connexions C2. Complété par une analyse statique/dynamique de malwares avec Ghidra pour extraction d'IoCs haute-fidélité et cartographie MITRE ATT&CK.",
    highlights: [
      "Analyse mémoire Volatility2 — détection AsyncRAT, Cobalt Strike, MasonRAT, processus injectés",
      "Extraction d'IoC complets : PID, hashes, adresses C2, modules injectés",
      "Reverse engineering Ghidra — analyse statique/dynamique, IoCs haute-fidélité",
      "Cartographie MITRE ATT&CK + rapport d'investigation Threat Intelligence exploitable",
    ],
    stack: ["Volatility2", "Ghidra", "MITRE ATT&CK", "FTK Imager", "Kali Linux", "Memory Dumps"],
    featured: true,
    period: "Nov. 2025 — Jan. 2026",
  },
  {
    id: "ids-system",
    title: "Système de Détection d'Intrusion (IDS)",
    subtitle: "Snort · Suricata · Surveillance réseau temps réel",
    category: "Defensive Security",
    description:
      "Conception et déploiement d'un IDS pour la surveillance en temps réel des activités réseau. Intégration de Snort et Suricata pour la détection basée sur signatures et anomalies. Configuration des règles de détection et analyse des alertes pour la prévention des intrusions et l'amélioration continue de la sécurité réseau.",
    highlights: [
      "Déploiement IDS — surveillance temps réel des activités réseau",
      "Intégration Snort & Suricata — détection signatures et anomalies",
      "Configuration des règles de détection pour identifier comportements malveillants",
      "Analyse et corrélation des alertes pour la prévention des intrusions",
    ],
    stack: ["Snort", "Suricata", "Linux", "IDS", "Network Security", "Rule Tuning"],
    featured: false,
    period: "Mars. 2025 — Mai. 2025",
  },
  {
    id: "app-re7",
    title: "Application Re7 — Recettes Culinaires",
    subtitle: "Android sécurisé · Firebase · Gestion des accès",
    category: "Development",
    description:
      "Développement sécurisé d'une application collaborative de recettes culinaires 'Re7' en Java/Android. Gestion sécurisée des utilisateurs et des données via Firebase (Authentication, Firestore, règles d'accès). Contrôle des permissions pour garantir confidentialité et intégrité des recettes partagées.",
    highlights: [
      "Développement mobile Java/Android avec interface intuitive",
      "Gestion sécurisée via Firebase — Authentication, Firestore, règles d'accès",
      "Contrôle des permissions — confidentialité et intégrité des recettes",
      "Optimisation de la base pour un accès rapide et sécurisé aux données partagées",
    ],
    stack: ["Android", "Java", "Firebase", "Firestore", "Android Studio"],
    featured: false,
    period: "Févr. 2024 — Mai. 2024",
    company: "ISMAGI",
  },
];

export const skillGroups: SkillGroup[] = [
  {
    category: "GRC & Conformité",
    skills: ["ISO 27001", "DNSSI", "EBIOS RM", "SOA", "SMSI", "PCA/PRA"],
  },
  {
    category: "SOC & Sécurité Défensive",
    skills: ["Wazuh", "Snort", "Suricata", "TheHive5", "MISP", "Cortex", "Event Correlation"],
  },
  {
    category: "Sécurité Offensive",
    skills: ["Pentesting", "Metasploit", "EternalBlue", "Post-Exploitation", "Vuln. Analysis"],
  },
  {
    category: "Forensics & Reverse Engineering",
    skills: ["Volatility2", "Ghidra", "FTK Imager", "IoC Extraction", "MITRE ATT&CK", "DFIR"],
  },
  {
    category: "DevSecOps & Cloud",
    skills: ["Firebase", "AWS", "CI/CD", "PostgreSQL", "Docker", "Monitoring Cloud"],
  },
  {
    category: "Développement",
    skills: ["Java", "Python", "C", "C#", "Angular CLI", "Spring Boot", "React", "Node.js"],
  },
  {
    category: "Systèmes & Réseaux",
    skills: ["Linux", "Windows Server", "VMware", "OSI/TCP-IP", "VLAN", "SSL/TLS", "OpenLDAP"],
  },
];

export const experiences: Experience[] = [
  {
    id: "zero-trust",
    role: "Mission Freelance — Zero Trust & Micro-segmentation",
    project: "Architecture Zero Trust Lab",
    company: "Mission indépendante (client particulier)",
    period: "Avr. 2026 — 15 Mai. 2026",
    current: false,
    description:
      "Étude comparative entre une architecture périmétrique classique et une architecture Zero Trust déployée en laboratoire (Docker Compose, 14 services, 6 réseaux isolés). Conception du modèle PDP/PEP avec Nginx, Authelia et lldap (NIST SP 800-207), supervision Wazuh SIEM avec corrélation MITRE ATT&CK, et trois campagnes de pentest démontrant la compromission de l'architecture classique en moins de 2 minutes, contre un blast radius confiné sur l'architecture Zero Trust.",
    tags: ["Zero Trust", "Docker Compose", "Nginx", "Authelia", "lldap", "Wazuh", "NIST SP 800-207", "Pentest"],
  },
  {
    id: "zerogap",
    role: "Développeur Full-Stack — Plateforme GRC",
    project: "ZeroGap Platform",
    company: "DataProtect",
    period: "Nov. 2025 — Mai. 2026",
    current: false,
    description:
      "Conception et développement complet de ZeroGap au sein du département GRC de DataProtect (Rabat). Plateforme web de digitalisation des audits de conformité ISO 27001 et DNSSI avec évaluation automatique de maturité SMSI, tableaux de bord interactifs et workflow de validation des plans d'action.",
    tags: ["React", "Node.js", "PostgreSQL", "Docker", "ISO 27001", "DNSSI", "GRC"],
  },
  {
    id: "flairie",
    role: "Project Lead & Développeur Frontend",
    project: "Flairie — Application Web Multi-Interfaces",
    company: "Neerelab Technology SARL",
    period: "Déc. 2025 — En cours",
    current: true,
    description:
      "Project Lead et développeur frontend sur Flairie. Encadrement d'une équipe Agile multidisciplinaire (frontend, backend, fonctionnel), planification et animation des sprints Scrum, participation aux décisions techniques stratégiques (architecture, sécurité applicative, API REST), coordination frontend/backend et supervision proactive de l'avancement.",
    tags: ["Project Lead", "Frontend", "Agile", "Scrum", "Architecture", "API REST"],
  },
  {
    id: "stage-monitoring",
    role: "Stage PFA — Monitoring & Protection du Parc",
    company: "Neerelab Technology SARL",
    period: "Mai. 2025 — Nov. 2025",
    current: false,
    description:
      "Déploiement et configuration de Wazuh (SIEM/IDS) pour la détection d'incidents et la centralisation des logs. Supervision du parc informatique via NetXMS. Gestion des alertes critiques avec quarantaines automatisées et durcissement réseau via déploiement et configuration du Firewall.",
    tags: ["Wazuh", "NetXMS", "Firewall", "SIEM", "IDS", "SOC"],
  },
  {
    id: "stage-api",
    role: "Stage PFA — Plateforme Unifiée API",
    company: "Univers Plancher",
    period: "Juin. 2024 — Juil. 2024",
    current: false,
    description:
      "Conception et développement d'une plateforme unifiée pour la documentation, le test et l'administration des APIs. Frontend Angular CLI, backend Spring Boot, module de documentation automatique, espace de test HTTP et module d'administration avec gestion des utilisateurs et rôles.",
    tags: ["Angular CLI", "Spring Boot", "API REST", "Admin Module", "Swagger"],
  },
  {
    id: "stage-re7",
    role: "Stage — Application Mobile Re7",
    company: "ISMAGI",
    period: "Févr. 2024 — Mai. 2024",
    current: false,
    description:
      "Développement sécurisé d'une application collaborative de recettes culinaires 'Re7' en Java/Android. Gestion sécurisée des utilisateurs et données via Firebase (Authentication, Firestore, règles d'accès) et contrôle des permissions pour garantir confidentialité et intégrité.",
    tags: ["Android", "Java", "Firebase", "Firestore", "Mobile Security"],
  },
];

export const contact = {
  email: "joannajoelison.pro@gmail.com",
  linkedin: "https://linkedin.com/in/joanna-joelison",
  github: "https://github.com/Joelijoa",
  phone: "+212 6 94 82 69 89",
  location: "Rabat, Maroc",
};
