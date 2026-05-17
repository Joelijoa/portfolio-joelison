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
    id: "audit-digitalise",
    title: "Outil d'Audit Digitalisé",
    subtitle: "Dataprotect — Stage PFE en cours",
    category: "GRC",
    description:
      "Développement d'un outil complet de digitalisation des audits de sécurité intégrant les référentiels ISO 27001 et DNSSI. L'outil génère automatiquement des graphes de restitution, une rosace de maturité SMSI et un plan d'action priorisé.",
    highlights: [
      "Rosace de maturité multi-domaines (visualisation radar)",
      "Plan d'action priorisé avec scoring de risque",
      "Alignement ISO 27001 & DNSSI (conformité nationale marocaine)",
      "Génération automatique de rapports d'audit",
    ],
    stack: ["Angular", "Spring Boot", "PostgreSQL", "ISO 27001", "DNSSI", "EBIOS RM"],
    featured: true,
    period: "Nov 2025 — En cours",
    company: "Dataprotect",
  },
  {
    id: "pentest-ms17-010",
    title: "Pentest Windows MS17-010",
    subtitle: "Exploitation EternalBlue — NT AUTHORITY\\SYSTEM",
    category: "Offensive Security",
    description:
      "Exploitation complète de la vulnérabilité MS17-010 (EternalBlue) sur un environnement Windows cible. Élévation de privilèges jusqu'à NT AUTHORITY\\SYSTEM via Metasploit, suivi d'un rapport de pentest structuré avec recommandations de remédiation.",
    highlights: [
      "Exploitation SMBv1 via EternalBlue (CVE-2017-0144)",
      "Élévation NT AUTHORITY\\SYSTEM",
      "Post-exploitation : dump de hashes, persistence",
      "Rapport de pentest avec remédiation CVSS",
    ],
    stack: ["Metasploit", "Nmap", "Kali Linux", "Windows Server", "SMBv1"],
    featured: true,
    period: "2025",
  },
  {
    id: "siem-monitoring",
    title: "SIEM & Monitoring Infrastructure",
    subtitle: "Wazuh + NetXMS + Firewall Deployment",
    category: "Defensive Security",
    description:
      "Déploiement complet d'une infrastructure SOC incluant un SIEM Wazuh pour la corrélation d'événements, NetXMS pour la supervision réseau et un pare-feu configuré avec des règles IDS/IPS. Création de tableaux de bord et d'alertes personnalisés.",
    highlights: [
      "SIEM Wazuh : indexation et corrélation d'événements",
      "NetXMS : supervision réseau temps réel",
      "Déploiement firewall avec règles IDS/IPS",
      "Dashboards de monitoring et alertes custom",
    ],
    stack: ["Wazuh", "NetXMS", "Snort", "Suricata", "Linux", "SIEM"],
    featured: true,
    period: "Mai — Nov 2025",
    company: "Neerelab Technology",
  },
  {
    id: "reverse-malware",
    title: "Reverse Engineering & Malware Analysis",
    subtitle: "Forensique mémoire et extraction d'IoC",
    category: "Forensics",
    description:
      "Analyse forensique d'images mémoire compromises avec Volatility2, extraction d'indicateurs de compromission (IoC) et reverse engineering de binaires suspects avec Ghidra. Mapping des techniques sur le framework MITRE ATT&CK.",
    highlights: [
      "Analyse mémoire Volatility2 (processes, network, registry)",
      "Reverse engineering avec Ghidra",
      "Extraction et classification d'IoC",
      "Mapping MITRE ATT&CK des TTPs identifiées",
    ],
    stack: ["Volatility2", "Ghidra", "MITRE ATT&CK", "FTK Imager", "Python"],
    featured: false,
    period: "2024 — 2025",
  },
  {
    id: "app-re7",
    title: "Application Collaborative Re7",
    subtitle: "Mobile Android — Stage ISMAGI",
    category: "Development",
    description:
      "Développement d'une application mobile collaborative sécurisée pour la gestion de projets d'équipe. Architecture Firebase avec authentification, stockage sécurisé et synchronisation en temps réel. Interface Android Native en Java.",
    highlights: [
      "Application mobile Android Native (Java)",
      "Backend Firebase (Auth, Firestore, Storage)",
      "Collaboration temps réel et notifications push",
      "Gestion des rôles et permissions utilisateurs",
    ],
    stack: ["Android", "Java", "Firebase", "Firestore", "Android Studio"],
    featured: false,
    period: "Févr — Mai 2024",
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
    skills: ["Wazuh", "Snort", "Suricata", "TheHive5", "MISP", "Cortex", "SIEM"],
  },
  {
    category: "Sécurité Offensive",
    skills: ["Pentesting", "Metasploit", "Nmap", "Firewalling", "CVE Analysis"],
  },
  {
    category: "Forensics & Reverse Engineering",
    skills: ["Volatility2", "Ghidra", "FTK Imager", "IoC Extraction", "MITRE ATT&CK"],
  },
  {
    category: "DevSecOps & Cloud",
    skills: ["Firebase", "AWS", "CI/CD", "PostgreSQL", "Monitoring", "Vercel"],
  },
  {
    category: "Développement",
    skills: ["Java", "Python", "C", "C#", "Angular", "Spring Boot", "Android"],
  },
  {
    category: "Systèmes & DevOps",
    skills: ["Linux", "Windows Server", "Git", "Scrum", "Agile", "VMware"],
  },
];

export const experiences: Experience[] = [
  {
    id: "flairie",
    role: "Project Lead",
    project: "Flairie",
    company: "Neerelab Technology",
    period: "Déc. 2025 — En cours",
    current: true,
    description:
      "Direction du projet Flairie en tant que project lead. Coordination de l'équipe, définition de l'architecture technique et suivi des livrables dans un contexte Agile/Scrum.",
    tags: ["Leadership", "Agile", "Scrum", "Architecture"],
  },
  {
    id: "stage-monitoring",
    role: "Stage PFA — Monitoring & Firewall",
    company: "Neerelab Technology",
    period: "Mai 2025 — Nov. 2025",
    current: false,
    description:
      "Déploiement d'une infrastructure de monitoring réseau complète (Wazuh SIEM + NetXMS) et configuration d'un pare-feu avec règles IDS/IPS. Mise en place de tableaux de bord de supervision et d'alertes en temps réel.",
    tags: ["Wazuh", "NetXMS", "Firewall", "SIEM", "SOC"],
  },
  {
    id: "stage-api",
    role: "Stage PFA — API Platform",
    company: "Univers Plancher",
    period: "Juin 2024 — Juil. 2024",
    current: false,
    description:
      "Développement et sécurisation d'une plateforme API REST. Implémentation des bonnes pratiques de sécurité (authentification, validation, rate limiting) et documentation Swagger.",
    tags: ["API REST", "Spring Boot", "Security", "Swagger"],
  },
  {
    id: "stage-re7",
    role: "Stage — Application Mobile Re7",
    company: "ISMAGI",
    period: "Févr. 2024 — Mai 2024",
    current: false,
    description:
      "Conception et développement d'une application mobile collaborative Android avec Firebase en backend. Gestion des authentifications, des rôles et de la synchronisation temps réel.",
    tags: ["Android", "Java", "Firebase", "Mobile"],
  },
];

export const contact = {
  email: "joannajoelison.pro@gmail.com",
  linkedin: "https://linkedin.com/in/joanna-joelison",
  github: "https://github.com/Joelijoa",
  phone: "+212 6 94 82 69 89",
  location: "Casablanca, Maroc",
};
