"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

type Line = { type: "input" | "output" | "error" | "cmd" | "def" | "sep" | "ascii"; text: string };

/* ASCII block art — "Joanna" rendered in a compact block style */
const ASCII_HEADER: Line[] = [
  { type: "ascii", text: "  ██╗ ██████╗  █████╗ ███╗  ██╗███╗  ██╗ █████╗ " },
  { type: "ascii", text: "  ██║██╔═══██╗██╔══██╗████╗ ██║████╗ ██║██╔══██╗" },
  { type: "ascii", text: "  ██║██║   ██║███████║██╔██╗██║██╔██╗██║███████║" },
  { type: "ascii", text: "  ██║██║   ██║██╔══██║██║╚████║██║╚████║██╔══██║" },
  { type: "ascii", text: "  ██║╚██████╔╝██║  ██║██║ ╚███║██║ ╚███║██║  ██║" },
  { type: "ascii", text: "  ╚═╝ ╚═════╝ ╚═╝  ╚═╝╚═╝  ╚══╝╚═╝  ╚══╝╚═╝  ╚═╝" },
  { type: "sep",   text: "  ─────────────────────────────────────────────────" },
  { type: "output", text: "  Cybersecurity Engineer · Casablanca, Maroc" },
  { type: "output", text: "  root@compromised — terminal v1.0" },
  { type: "sep",   text: "" },
  { type: "output", text: "  type 'help' for available commands" },
  { type: "sep",   text: "" },
];

/* Help entries — command + description */
const HELP_ENTRIES: { cmd: string; def: string }[] = [
  { cmd: "help",           def: "show this operator manual" },
  { cmd: "ls",             def: "list system directories" },
  { cmd: "cd <section>",   def: "navigate to section  (hero · projects · skills · exp · contact)" },
  { cmd: "cat cv",         def: "decrypt and open classified file viewer" },
  { cmd: "whoami",         def: "display operator identity" },
  { cmd: "ping <host>",    def: "test connection to host" },
  { cmd: "nmap",           def: "scan system ports and services" },
  { cmd: "ps",             def: "list running processes" },
  { cmd: "ifconfig",       def: "show network interface configuration" },
  { cmd: "uname",          def: "print system information" },
  { cmd: "pwd",            def: "print current working directory" },
  { cmd: "date",           def: "show current UTC timestamp" },
  { cmd: "clear",          def: "flush terminal buffer" },
  { cmd: "exit",           def: "terminate session and disconnect" },
];

const SECTIONS: Record<string, string> = {
  hero: "hero",
  projects: "projects",
  skills: "skills",
  experience: "experience",
  exp: "experience",
  contact: "contact",
};

export default function FloatingTerminal({
  onOpenCV,
  onExit,
}: {
  onOpenCV: () => void;
  onExit?: () => void;
}) {
  const [open, setOpen]     = useState(false);
  const [input, setInput]   = useState("");
  const [lines, setLines]   = useState<Line[]>(ASCII_HEADER);
  const [historyIdx, setHistoryIdx] = useState(-1);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);

  const inputRef  = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  /* Scroll to bottom on new output */
  useEffect(() => {
    if (outputRef.current)
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
  }, [lines]);

  /* Focus input when opened */
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 80);
  }, [open]);

  /* Backtick to toggle, ESC to close */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "`") { e.preventDefault(); setOpen((v) => !v); }
      if (e.key === "Escape" && open) setOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [open]);

  const push = useCallback((incoming: Line | Line[]) => {
    const arr = Array.isArray(incoming) ? incoming : [incoming];
    setLines((prev) => [...prev, ...arr]);
  }, []);

  const pushText = useCallback((text: string | string[], type: Line["type"] = "output") => {
    const arr = Array.isArray(text) ? text : [text];
    push(arr.map((t) => ({ type, text: t })));
  }, [push]);

  const processCommand = useCallback((raw: string) => {
    const trimmed = raw.trim();
    const cmd     = trimmed.toLowerCase();
    const parts   = cmd.split(/\s+/);

    push({ type: "input", text: trimmed || " " });
    if (trimmed) {
      setCmdHistory((h) => [trimmed, ...h.slice(0, 29)]);
      setHistoryIdx(-1);
    }
    if (!trimmed) return;

    switch (parts[0]) {
      case "help":
      case "man": {
        const helpLines: Line[] = [
          { type: "sep",    text: "OPERATOR MANUAL — root@compromised v1.0" },
          { type: "sep",    text: "────────────────────────────────────────────────────" },
          { type: "sep",    text: "" },
        ];
        for (const entry of HELP_ENTRIES) {
          helpLines.push({ type: "cmd", text: entry.cmd });
          helpLines.push({ type: "def", text: `    ${entry.def}` });
          helpLines.push({ type: "sep", text: "" });
        }
        push(helpLines);
        break;
      }

      case "ls":
      case "dir":
        pushText([
          "drwxr-xr-x  hero/",
          "drwxr-xr-x  projects/    [7 classified files]",
          "drwxr-xr-x  skills/      [7 operator modules]",
          "drwxr-xr-x  experience/  [6 field operations]",
          "drwxr-xr-x  contact/     [secure channel]",
          "-rw-r--r--  cv.pdf       [ENCRYPTED — 284K]",
        ]);
        break;

      case "cd":
      case "goto": {
        const target = parts[1];
        if (!target) { pushText("usage: cd <section>", "error"); break; }
        const id = SECTIONS[target];
        if (!id) { pushText(`cd: ${target}: no such directory`, "error"); break; }
        pushText(`navigating to /${id}...`);
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => setOpen(false), 700);
        break;
      }

      case "cat":
      case "open":
      case "decrypt":
        if (!parts[1] || parts[1] === "cv" || parts[1] === "cv.pdf") {
          pushText("decrypting cv_joelison_joanna.pdf...");
          pushText("access granted — opening classified file viewer...");
          setTimeout(() => { setOpen(false); onOpenCV(); }, 600);
        } else {
          pushText(`cat: ${parts[1]}: no such file or directory`, "error");
        }
        break;

      case "whoami":
        pushText([
          "JOELISON JOANNA VONINJOHARY",
          "Role:      Cybersecurity Engineer & Cloud Computing",
          "Status:    ● ACTIVE",
          "Clearance: L4 — ELEVATED",
          "Location:  Casablanca, Maroc [33.5731°N, 7.5898°W]",
          "Threat:    ████████░░ ELEVATED",
          "PFE:       DataProtect — ZeroGap Platform",
        ]);
        break;

      case "ping": {
        const host = parts[1] ?? "joelison.local";
        pushText([
          `PING ${host} (10.0.0.42): 56 data bytes`,
          `64 bytes from 10.0.0.42: icmp_seq=0 ttl=64 time=0.3 ms`,
          `64 bytes from 10.0.0.42: icmp_seq=1 ttl=64 time=0.2 ms`,
          `64 bytes from 10.0.0.42: icmp_seq=2 ttl=64 time=0.1 ms`,
          `--- ${host} ping statistics ---`,
          `3 packets transmitted, 3 received, 0% packet loss`,
          `STATUS: ACTIVE — CONNECTION ESTABLISHED`,
        ]);
        break;
      }

      case "nmap":
        pushText([
          `Starting Nmap 7.94 — https://nmap.org`,
          `Nmap scan report for joelison.local (10.0.0.42)`,
          `PORT      STATE  SERVICE      VERSION`,
          `22/tcp    open   ssh          OpenSSH 9.2`,
          `443/tcp   open   https        GRC/ISO-27001`,
          `4444/tcp  open   metasploit   EternalBlue payload`,
          `5432/tcp  open   postgresql   DFIR datastore`,
          `8080/tcp  open   http-proxy   ZeroGap platform`,
          `8443/tcp  open   https-alt    Flairie API`,
          `Nmap done: 1 IP address (1 host up)`,
        ]);
        break;

      case "ps":
      case "top":
        pushText([
          `PID   USER      STAT  COMMAND`,
          `001   root      Ss    ./portfolio.sh --mode=compromised`,
          `002   root      S     ./encrypt_skills.sh [7 modules]`,
          `003   root      S     ./monitor_threats.sh --live`,
          `004   root      S     ./siem_wazuh.sh --alert=on`,
          `005   joelison  R     ./maintain_excellence.sh`,
          `006   joelison  S     ./zerogap_platform.sh --env=prod`,
        ]);
        break;

      case "uname":
        pushText("COMPROMISED 5.15.0-kali1-amd64 #1 SMP PREEMPT Kali 5.15 x86_64 GNU/Linux");
        break;

      case "date":
        pushText(new Date().toUTCString() + " [SYSTEM TIME]");
        break;

      case "pwd":
        pushText("/root/ops/portfolio/joelison");
        break;

      case "sudo":
        pushText("You are already running as root.", "error");
        break;

      case "ssh":
        pushText([
          `ssh: connect to host ${parts[1] ?? "target"}: Connection refused`,
          "Hint: try 'ping' first to verify host is up",
        ], "error");
        break;

      case "rm":
        pushText("rm: refusing to remove — this system is already compromised.", "error");
        break;

      case "ifconfig":
      case "ip":
        pushText([
          "eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>",
          "      inet 10.0.0.42  netmask 255.255.255.0",
          "      ether de:ad:be:ef:00:42",
          "lo:   flags=73<UP,LOOPBACK,RUNNING>",
          "      inet 127.0.0.1  netmask 255.0.0.0",
        ]);
        break;

      case "clear":
      case "cls":
        setLines([]);
        break;

      case "exit":
      case "logout":
      case "quit":
        pushText("terminating session...");
        pushText("connection to joelison.local closed.");
        setTimeout(() => { setOpen(false); onExit?.(); }, 900);
        break;

      default:
        pushText(`command not found: ${parts[0]} — type 'help' for commands`, "error");
    }
  }, [push, pushText, onOpenCV, onExit]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      processCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIdx + 1, cmdHistory.length - 1);
      setHistoryIdx(next);
      setInput(cmdHistory[next] ?? "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIdx - 1, -1);
      setHistoryIdx(next);
      setInput(next === -1 ? "" : (cmdHistory[next] ?? ""));
    } else if (e.key === "Tab") {
      e.preventDefault();
      const partial = input.trim().toLowerCase();
      const cmds = ["help", "ls", "cd", "cat cv", "whoami", "ping", "nmap", "ps", "clear", "exit", "uname", "pwd", "ifconfig", "date"];
      const match = cmds.find((c) => c.startsWith(partial) && c !== partial);
      if (match) setInput(match);
    }
  };

  const renderLine = (line: Line, i: number) => {
    if (line.type === "ascii") {
      return (
        <div key={i} className="leading-tight min-h-[1em]">
          <span className="font-mono text-[8px] whitespace-pre" style={{ color: "#4ade80" }}>
            {line.text}
          </span>
        </div>
      );
    }
    if (line.type === "sep") {
      return (
        <div key={i} className="leading-relaxed min-h-[0.6em]">
          <span className="font-mono text-[9px] text-white/25 whitespace-pre">{line.text}</span>
        </div>
      );
    }
    if (line.type === "cmd") {
      return (
        <div key={i} className="leading-relaxed min-h-[1em]">
          <span className="font-mono text-[9px] font-semibold" style={{ color: "#4ade80" }}>
            {line.text}
          </span>
        </div>
      );
    }
    if (line.type === "def") {
      return (
        <div key={i} className="leading-relaxed min-h-[1em]">
          <span className="font-mono text-[9px] text-white/55 whitespace-pre">{line.text}</span>
        </div>
      );
    }
    return (
      <div key={i} className="flex gap-2 leading-relaxed min-h-[1em]">
        {line.type === "input" && (
          <span className="font-mono text-[9px] text-white/30 shrink-0">›</span>
        )}
        <span
          className={`font-mono text-[9px] break-all ${
            line.type === "input" ? "text-white/80" :
            line.type === "error" ? "text-white/35 italic" :
            "text-white/50"
          }`}
        >
          {line.text}
        </span>
      </div>
    );
  };

  return (
    <>
      {/* Floating toggle button */}
      <button
        onClick={() => setOpen((v) => !v)}
        title="Press ` (backtick) to toggle terminal"
        className="fixed bottom-6 right-6 z-40 font-mono text-[9px] border border-white/20 hover:border-white/50 text-white/40 hover:text-white/70 px-3 py-1.5 bg-black transition-all duration-150 uppercase tracking-widest"
      >
        {open ? "[×] CLOSE" : "[~] TERMINAL"}
      </button>

      {/* Terminal panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
            className="fixed bottom-16 right-6 z-40 border border-white/20 bg-black shadow-2xl flex flex-col"
            style={{ width: "min(520px, calc(100vw - 48px))", maxHeight: "min(540px, calc(100vh - 120px))" }}
          >
            {/* Title bar */}
            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 shrink-0">
              <div className="flex items-center gap-2">
                <motion.span
                  animate={{ opacity: [1, 0.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 rounded-full bg-white/50 inline-block shrink-0"
                />
                <span className="font-mono text-[9px] text-white/40 uppercase tracking-widest">
                  root@compromised — /ops/portfolio
                </span>
              </div>
              <span className="font-mono text-[8px] text-white/15">` to toggle · tab autocomplete</span>
            </div>

            {/* Output — scrollable */}
            <div
              ref={outputRef}
              className="flex-1 overflow-y-auto px-3 py-2 space-y-0.5"
              style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(255,255,255,0.12) transparent" }}
            >
              {lines.map((line, i) => renderLine(line, i))}
            </div>

            {/* Input */}
            <div className="border-t border-white/10 px-3 py-2 flex items-center gap-2 shrink-0">
              <span className="font-mono text-[10px] text-white/40 shrink-0">$</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                spellCheck={false}
                autoComplete="off"
                placeholder="type a command..."
                className="flex-1 bg-transparent outline-none font-mono text-[10px] text-white caret-white placeholder-white/15"
                style={{ fontFamily: "inherit" }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
