"use client";

import { useState, useEffect, useRef, useCallback, useMemo } from "react";

// ============================================================
// DATA — Rahul's content
// ============================================================

const ASCII_NAME = `
 ____       _           _   __  __       _               _
|  _ \\ __ _| |__  _   _| | |  \\/  | __ _| |__   ___  ___| |__
| |_) / _\` | '_ \\| | | | | | |\\/| |/ _\` | '_ \\ / _ \\/ __| '_ \\
|  _ < (_| | | | | |_| | | | |  | | (_| | | | |  __/\\__ \\ | | |
|_| \\_\\__,_|_| |_|\\__,_|_| |_|  |_|\\__,_|_| |_|\\___||___/_| |_|
`.trim();

// No pixel art — using actual ASCII portrait image instead

const PROJECTS = [
  {
    title: "Joseph Project Management",
    role: "AI Product Engineer / Full-Stack Developer",
    desc: "Developed a full-stack SaaS platform for cross-department project management using TypeScript, React 19, Next.js 14, and NestJS 11, integrating scalable engineering drawing logs and multi-status workflow features.",
    tags: [
      { label: "TypeScript", type: "engineering" },
      { label: "React 19", type: "engineering" },
      { label: "Next.js 14", type: "engineering" },
      { label: "NestJS 11", type: "engineering" },
      { label: "PostgreSQL", type: "tools" },
    ],
    impact: "85% fewer SQL queries · 80% less manual entry · 6 departments",
    year: "2025",
  },
  {
    title: "Joseph LogiTrack",
    role: "AI Product Engineer / Backend Developer",
    desc: "Developed automated workflows using Node.js and NestJS to streamline internal shipping requests and integrate real-time shipment tracking with external vendor APIs. Implemented Telegram Bot notifications.",
    tags: [
      { label: "Node.js", type: "engineering" },
      { label: "NestJS", type: "engineering" },
      { label: "Telegram Bot API", type: "tools" },
      { label: "REST APIs", type: "engineering" },
    ],
    impact: "150% more daily shipments · 99.9% uptime",
    year: "2025",
  },
  {
    title: "Marketing Automation Agent",
    role: "AI Product Engineer",
    desc: "Implemented a marketing automation agent leveraging Claude API that curtailed manual intervention by 70%, delivering AED 45K annual reduction in recurring labor costs while handling 15+ campaigns monthly.",
    tags: [
      { label: "Claude API", type: "tools" },
      { label: "AI Automation", type: "default" },
      { label: "TypeScript", type: "engineering" },
    ],
    impact: "70% less manual work · AED 45K saved · 15+ campaigns/mo",
    year: "2025",
  },
  {
    title: "MSD GCC Pulse Platform",
    role: "Web Developer Intern",
    desc: "Revamped and deployed the MSD GCC Pulse platform with a cross-functional team. Integrated Figma-to-Code pipelines and unified UI tokens, delivering a 25% reduction in design-to-development cycle time.",
    tags: [
      { label: "HTML5", type: "engineering" },
      { label: "CSS3", type: "engineering" },
      { label: "JavaScript", type: "engineering" },
      { label: "Figma", type: "tools" },
    ],
    impact: "25% faster dev cycle · Global brand compliance",
    year: "2024",
  },
  {
    title: "Derby HRMS Application",
    role: "Frontend Engineer Intern",
    desc: "Developed and launched 5+ feature pages for Derby's HRMS using HTML5, CSS3, and Bootstrap. Implemented cross-browser compatibility enhancements with OOP JavaScript and jQuery.",
    tags: [
      { label: "Bootstrap", type: "engineering" },
      { label: "jQuery", type: "engineering" },
      { label: "JavaScript", type: "engineering" },
    ],
    impact: "30% more engagement · Cross-browser optimized",
    year: "2023",
  },
];

const SKILLS = {
  "languages & frameworks": [
    { name: "TypeScript", pct: 92, color: "var(--color-blue)" },
    { name: "React 19", pct: 90, color: "var(--color-blue)" },
    { name: "Next.js 14", pct: 90, color: "var(--color-blue)" },
    { name: "NestJS 11", pct: 85, color: "var(--color-blue)" },
    { name: "Node.js", pct: 88, color: "var(--color-blue)" },
  ],
  frontend: [
    { name: "Tailwind CSS", pct: 92, color: "var(--color-cyan)" },
    { name: "shadcn/ui", pct: 88, color: "var(--color-cyan)" },
    { name: "Recharts / Chart.js", pct: 80, color: "var(--color-cyan)" },
    { name: "Vite", pct: 82, color: "var(--color-cyan)" },
    { name: "React Router 7", pct: 78, color: "var(--color-cyan)" },
  ],
  backend: [
    { name: "TypeORM / Prisma", pct: 85, color: "var(--color-green)" },
    { name: "Passport.js (JWT)", pct: 82, color: "var(--color-green)" },
    { name: "Telegram Bot API", pct: 80, color: "var(--color-green)" },
    { name: "Nodemailer", pct: 78, color: "var(--color-green)" },
    { name: "class-validator", pct: 80, color: "var(--color-green)" },
  ],
  "databases & infra": [
    { name: "PostgreSQL (Supabase)", pct: 88, color: "var(--color-purple)" },
    { name: "AWS S3", pct: 78, color: "var(--color-purple)" },
    { name: "PM2 Deployment", pct: 80, color: "var(--color-purple)" },
    { name: "SQLite", pct: 75, color: "var(--color-purple)" },
  ],
  "tools & other": [
    { name: "Git / GitHub", pct: 90, color: "var(--color-accent)" },
    { name: "Claude Code", pct: 92, color: "var(--color-accent)" },
    { name: "ExcelJS", pct: 82, color: "var(--color-accent)" },
    { name: "Figma", pct: 88, color: "var(--color-accent)" },
  ],
};

const EXPERIENCES = [
  {
    title: "AI Product Engineer",
    company: "Joseph Group",
    location: "Dubai, UAE",
    period: "June 2025 – Present",
    active: true,
    desc: "Designed core system architecture for a full-stack SaaS platform integrating cross-departmental workflows using TypeScript, React, Next.js, and NestJS. Implemented a marketing automation agent leveraging Claude API that curtailed manual intervention by 70%, delivering AED 45K annual savings. Coordinated technical planning integrating PostgreSQL (Supabase) and NestJS 11.",
  },
  {
    title: "Web Developer Intern",
    company: "MSD GCC",
    location: "Dubai, UAE",
    period: "July 2024 – January 2025",
    active: false,
    desc: "Revamped and deployed the MSD GCC Pulse platform using HTML5, CSS3, and JavaScript with a cross-functional team. Integrated Figma-to-Code pipelines and unified UI tokens, delivering a 25% reduction in design-to-development cycle time while maintaining alignment with MSD global branding guidelines.",
  },
  {
    title: "Frontend Engineer Intern",
    company: "Derby Group of Companies",
    location: "Dubai, UAE",
    period: "June – August 2023",
    active: false,
    desc: "Developed and launched 5+ feature pages for Derby's HRMS application using HTML5, CSS3, and Bootstrap, resulting in a 30% increase in user engagement. Implemented cross-browser compatibility enhancements using Object-Oriented JavaScript and jQuery.",
  },
];

// ============================================================
// COMMAND DEFINITIONS
// ============================================================

interface CommandDef {
  cmd: string;
  desc: string;
  aliases?: string[];
  hidden?: boolean;
}

const COMMANDS: CommandDef[] = [
  { cmd: "/about", desc: "Who is Rahul Mahesh?" },
  { cmd: "/work", desc: "View featured projects" },
  { cmd: "/skills", desc: "Technical skills & proficiency" },
  { cmd: "/experience", desc: "Career timeline" },
  { cmd: "/contact", desc: "Get in touch" },
  { cmd: "/social", desc: "Social links & profiles" },
  { cmd: "/help", desc: "List all available commands" },
  { cmd: "/resume", desc: "Download Rahul's resume" },
  { cmd: "/clear", desc: "Clear the terminal" },
  { cmd: "/theme", desc: "Toggle light/dark theme", hidden: true },
  { cmd: "/matrix", desc: "Enter the matrix", hidden: true },
  { cmd: "/whoami", desc: "Who are you?", hidden: true },
  { cmd: "/ls", desc: "List directory contents", hidden: true },
  { cmd: "/pwd", desc: "Print working directory", hidden: true },
  { cmd: "/sudo hire rahul", desc: "💼", hidden: true },
  { cmd: "/neofetch", desc: "System info", hidden: true },
  { cmd: "/ping", desc: "Pong!", hidden: true },
  { cmd: "/coffee", desc: "☕", hidden: true },
  { cmd: "/figma", desc: "Rahul's weapon of choice", hidden: true },
  { cmd: "/secrets", desc: "Hidden commands list", hidden: true },
];

// ============================================================
// BOOT SEQUENCE COMPONENT
// ============================================================

function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [lines, setLines] = useState<string[]>([]);
  const [done, setDone] = useState(false);

  const bootLines = useMemo(
    () => [
      { text: "Initializing portfolio system...", delay: 400 },
      { text: "Loading AI modules...", delay: 300 },
      { text: "Mounting component library...", delay: 250 },
      { text: "[████████████████████] done", delay: 500, type: "progress" },
      { text: "", delay: 200 },
      { text: "Resolving 5 case studies...", delay: 350 },
      { text: "Connecting to engineering core...", delay: 300 },
      { text: "ok", delay: 200, type: "ok" },
      { text: "", delay: 200 },
      { text: "AI product engineering: operational", delay: 250 },
      { text: "React / Next.js runtime: loaded", delay: 200 },
      { text: "Design systems: operational", delay: 200 },
      { text: "Don't search for /secrets here...", delay: 250 },
      { text: "Strategic thinking: engaged", delay: 200 },
      { text: "", delay: 300 },
      { text: "✦", delay: 200, type: "accent" },
      { text: "rahul.mahesh v1.0 — ready.", delay: 300, type: "accent" },
      { text: "Press Enter to continue...", delay: 200 },
    ],
    []
  );

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;
    let totalDelay = 0;

    const addLine = (index: number) => {
      if (index >= bootLines.length) {
        setTimeout(() => setDone(true), 600);
        return;
      }
      totalDelay += bootLines[index].delay;
      timeout = setTimeout(() => {
        setLines((prev) => [...prev, bootLines[index].text]);
        addLine(index + 1);
      }, bootLines[index].delay);
    };

    addLine(0);

    return () => clearTimeout(timeout);
  }, [bootLines]);

  useEffect(() => {
    if (done) {
      const t = setTimeout(onComplete, 500);
      return () => clearTimeout(t);
    }
  }, [done, onComplete]);

  // Skip on Enter key or click
  useEffect(() => {
    const skip = (e: KeyboardEvent) => {
      if (e.key === "Enter") setDone(true);
    };
    const skipClick = () => setDone(true);
    window.addEventListener("keydown", skip);
    window.addEventListener("click", skipClick);
    return () => {
      window.removeEventListener("keydown", skip);
      window.removeEventListener("click", skipClick);
    };
  }, []);

  return (
    <div className={`boot-overlay ${done ? "hidden" : ""}`}>
      <div style={{ maxWidth: 500, width: "100%" }}>
        {lines.map((line, i) => (
          <div
            key={i}
            className="boot-line"
            style={{ animationDelay: `${i * 0.05}s` }}
          >
            {line.startsWith("✓") ? (
              <span className="boot-ok">{line}</span>
            ) : line.includes("100%") || line.includes("Loading") ? (
              <span className="boot-progress">{line}</span>
            ) : line.startsWith("Welcome") ? (
              <span className="boot-accent">{line}</span>
            ) : (
              line
            )}
          </div>
        ))}
        {!done && lines.length > 0 && (
          <div className="boot-skip">Press any key to skip...</div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// MATRIX RAIN
// ============================================================

function MatrixRain({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d")!;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    const drops: number[] = Array(columns).fill(1);
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789RAHULMAHESH";

    let frame = 0;
    const maxFrames = 180; // ~3 seconds at 60fps

    const draw = () => {
      ctx.fillStyle = "rgba(13, 13, 26, 0.05)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.fillStyle = "#7ec89b";
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < drops.length; i++) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        ctx.fillText(char, i * fontSize, drops[i] * fontSize);

        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
        drops[i]++;
      }

      frame++;
      if (frame < maxFrames) {
        requestAnimationFrame(draw);
      } else {
        onComplete();
      }
    };

    const animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <canvas
      ref={canvasRef}
      className="matrix-canvas"
      style={{ cursor: "pointer" }}
      onClick={onComplete}
    />
  );
}

// ============================================================
// MENU BAR CLOCK
// ============================================================

function MenuBarClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      setTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        })
      );
    };
    update();
    const interval = setInterval(update, 30000);
    return () => clearInterval(interval);
  }, []);

  return <span>{time || "12:00 AM"}</span>;
}

// ============================================================
// MAIN TERMINAL COMPONENT
// ============================================================

type OutputBlock = {
  id: string;
  content: React.ReactNode;
};

export function Terminal() {
  const [booted, setBooted] = useState(false);
  const [outputs, setOutputs] = useState<OutputBlock[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  // showAutocomplete is now computed directly as shouldShowAc — no state needed
  const [acIndex, setAcIndex] = useState(0);
  const [showMatrix, setShowMatrix] = useState(false);
  const [showCloseDialog, setShowCloseDialog] = useState(false);
  const [skillsAnimated, setSkillsAnimated] = useState(false);

  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll on new output
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [outputs]);


  // Focus input on click anywhere in terminal
  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  // Show welcome on boot
  useEffect(() => {
    if (booted) {
      setOutputs([{ id: "welcome", content: <WelcomeBlock /> }]);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [booted]);

  // Autocomplete filtering
  const publicCommands = COMMANDS.filter((c) => !c.hidden);
  // Show autocomplete on first "/" keystroke, match all public commands
  const acMatches = useMemo(() => {
    if (!input.startsWith("/")) return [];
    if (input === "/") return publicCommands;
    return publicCommands.filter((c) =>
      c.cmd.toLowerCase().startsWith(input.toLowerCase())
    );
  }, [input, publicCommands]);

  // Compute shouldShowAc directly — no useEffect delay
  const shouldShowAc = acMatches.length > 0 && input.startsWith("/");

  // Keep acIndex in bounds when matches change
  useEffect(() => {
    setAcIndex(0);
  }, [input]);

  // ---- Idle hints ----
  const idleTimerRef = useRef<NodeJS.Timeout | null>(null);
  const idleHints = [
    "Still there? Try /work to see what I've built...",
    "This terminal has more commands than you think...",
    "Psst — ever tried typing /neofetch in a portfolio?",
    "Type /secrets if you like finding hidden things.",
    "Try /sudo hire rahul for a surprise...",
    "Curious about my stack? Type /skills",
    "/about will tell you my story.",
  ];

  function resetIdleTimer() {
    if (idleTimerRef.current) clearTimeout(idleTimerRef.current);
    idleTimerRef.current = setTimeout(() => {
      const hint = idleHints[Math.floor(Math.random() * idleHints.length)];
      setOutputs((prev) => [
        ...prev,
        { id: `idle-${Date.now()}`, content: <div className="idle-hint">{hint}</div> },
      ]);
    }, 45000);
  }

  useEffect(() => {
    if (booted) resetIdleTimer();
    return () => { if (idleTimerRef.current) clearTimeout(idleTimerRef.current); };
  }, [booted]); // eslint-disable-line react-hooks/exhaustive-deps

  // ---- Command execution via ref to avoid stale closures ----
  const execRef = useRef<(cmd: string) => void>(() => {});

  function executeCommand(rawInput: string) {
    const trimmed = rawInput.trim();
    if (!trimmed) return;

    resetIdleTimer();
    setHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);
    setInput(""); // clearing input hides autocomplete automatically since shouldShowAc depends on input

    const cmd = trimmed.toLowerCase();
    const echo = (
      <div className="cmd-echo">
        <span className="prompt-char">$</span> {trimmed}
      </div>
    );

    function addOutput(content: React.ReactNode) {
      setOutputs((prev) => [
        ...prev,
        { id: `out-${Date.now()}-${Math.random()}`, content: <>{echo}{content}</> },
      ]);
    }

    function addWithThinking(content: React.ReactNode) {
      // Show thinking first, then replace with real content
      const tid = `t-${Date.now()}-${Math.random()}`;
      const thinkingContent = (
        <>
          {echo}
          <div className="thinking-indicator">
            <span className="thinking-label">Fetching data</span>
            <div className="thinking-dots">
              <div className="thinking-dot" />
              <div className="thinking-dot" />
              <div className="thinking-dot" />
            </div>
          </div>
        </>
      );
      const finalContent = <>{echo}{content}</>;

      setOutputs((prev) => [...prev, { id: tid, content: thinkingContent }]);

      // Use functional update to avoid stale closure
      setTimeout(() => {
        setOutputs((prev) => {
          const idx = prev.findIndex((o) => o.id === tid);
          if (idx === -1) return prev;
          const copy = [...prev];
          copy[idx] = { id: tid, content: finalContent };
          return copy;
        });
      }, 800);
    }

    // Route commands
    if (cmd === "/about") {
      addWithThinking(<AboutOutput />);
    } else if (cmd === "/work" || cmd === "/projects" || cmd === "/portfolio") {
      addWithThinking(<WorkOutput />);
    } else if (cmd === "/skills") {
      addWithThinking(<SkillsOutput onVisible={() => setSkillsAnimated(true)} />);
    } else if (cmd === "/experience" || cmd === "/exp") {
      addWithThinking(<ExperienceOutput />);
    } else if (cmd === "/contact") {
      addWithThinking(<ContactOutput />);
    } else if (cmd === "/social") {
      addWithThinking(<SocialOutput />);
    } else if (cmd === "/help") {
      addOutput(<HelpOutput />);
    } else if (cmd === "/resume" || cmd === "/cv") {
      addOutput(
        <div className="animate-fade-in">
          <div className="heading">📄 Resume</div>
          <div className="output-line dim" style={{ marginBottom: 8 }}>Opening Rahul&apos;s resume...</div>
          <a href="/rahul-resume.pdf" target="_blank" rel="noopener noreferrer" className="social-link" style={{ display: "inline-flex" }}>
            <span className="social-label">Download</span>
            <span className="social-url">rahul-resume.pdf ↗</span>
          </a>
        </div>
      );
    } else if (cmd === "/clear") {
      setOutputs([]);
      return;
    } else if (cmd === "/matrix") {
      setShowMatrix(true);
      addOutput(<div className="green animate-fade-in">Entering the Matrix... (click to exit)</div>);
    } else if (cmd === "/whoami") {
      addOutput(
        <div className="animate-fade-in">
          <div className="output-line cyan">visitor@rahul-portfolio</div>
          <div className="output-line dim">You are a curious soul exploring Rahul&apos;s terminal portfolio.</div>
        </div>
      );
    } else if (cmd === "/ls") {
      addOutput(
        <div className="animate-fade-in" style={{ lineHeight: 1.8 }}>
          <span className="blue">about/</span>{"    "}<span className="blue">work/</span>{"    "}
          <span className="blue">skills/</span>{"    "}<span className="blue">experience/</span>{"    "}
          <span className="green">resume.pdf</span>{"    "}<span className="dim">.secret/</span>
        </div>
      );
    } else if (cmd === "/pwd") {
      addOutput(<div className="cyan animate-fade-in">/home/rahul/portfolio</div>);
    } else if (cmd === "/sudo hire rahul" || cmd === "sudo hire rahul") {
      addWithThinking(<HireOutput />);
    } else if (cmd === "/neofetch") {
      addOutput(<NeofetchOutput />);
    } else if (cmd === "/ping") {
      addOutput(<div className="green animate-fade-in">PONG! 🏓 — Response time: 1ms (Rahul is always available)</div>);
    } else if (cmd === "/coffee" || cmd === "/cafe") {
      addOutput(
        <div className="animate-fade-in">
          <div className="accent">☕ Brewing coffee...</div>
          <div className="dim" style={{ marginTop: 4 }}>Fun fact: This portfolio was built on approximately 47 cups of coffee.</div>
        </div>
      );
    } else if (cmd === "/figma") {
      addOutput(
        <div className="animate-fade-in">
          <div className="purple bold">⬡ Figma</div>
          <div className="dim" style={{ marginTop: 4 }}>Rahul&apos;s weapon of choice. 95% proficiency. Dangerous with auto-layout.</div>
        </div>
      );
    } else if (cmd === "git log" || cmd === "/git log") {
      addOutput(
        <div className="animate-fade-in animate-stagger">
          <div className="output-line yellow">commit a3f8d2e <span className="dim">(HEAD → main)</span></div>
          <div className="output-line dim">Author: Rahul Mahesh &lt;rahuldesigns@gmail.com&gt;</div>
          <div className="output-line dim">Date: 2025</div>
          <div className="output-line" style={{marginLeft: 16}}>feat: built terminal portfolio that actually impresses people</div>
          <div className="output-line yellow" style={{marginTop: 8}}>commit b7c1e9f</div>
          <div className="output-line dim">Date: 2025</div>
          <div className="output-line" style={{marginLeft: 16}}>feat: designed 300+ screens, didn&apos;t lose sanity (mostly)</div>
          <div className="output-line yellow" style={{marginTop: 8}}>commit 4d2a1b3</div>
          <div className="output-line dim">Date: 2024</div>
          <div className="output-line" style={{marginLeft: 16}}>feat: joined MSD, learned design systems aren&apos;t optional</div>
          <div className="output-line yellow" style={{marginTop: 8}}>commit 0f1e8c7</div>
          <div className="output-line dim">Date: 2024</div>
          <div className="output-line" style={{marginLeft: 16}}>init: started product design journey ☕</div>
        </div>
      );
    } else if (cmd === "cat readme.md" || cmd === "/cat readme.md") {
      addOutput(
        <div className="animate-fade-in">
          <div className="green bold" style={{marginBottom: 8}}># README.md</div>
          <div className="output-line" style={{marginBottom: 8}}>Hey, you found the readme! 👋</div>
          <div className="output-line dim" style={{marginBottom: 8}}>
            This portfolio was built with Next.js, TypeScript, and way too much coffee.
            If you&apos;re reading this, you&apos;re probably either a recruiter or a fellow developer.
            Either way — let&apos;s talk.
          </div>
          <div className="output-line accent">rahuldesigns@gmail.com</div>
        </div>
      );
    } else if (cmd === "exit" || cmd === "quit" || cmd === "/exit" || cmd === "/quit") {
      addOutput(
        <div className="animate-fade-in">
          <div className="red">Nice try, but you can&apos;t exit this portfolio.</div>
          <div className="dim" style={{marginTop: 4}}>You&apos;re stuck here. Might as well type <span className="cyan">/work</span> and see what I&apos;ve built.</div>
        </div>
      );
    } else if (cmd === "/secrets") {
      addOutput(
        <div className="animate-fade-in">
          <div className="heading">🔐 Hidden Commands</div>
          <div className="output-line dim" style={{ marginBottom: 8 }}>You found the secret menu!</div>
          <div className="nav-hint"><span className="cmd">/matrix</span><span className="desc">Enter the Matrix</span></div>
          <div className="nav-hint"><span className="cmd">/neofetch</span><span className="desc">System info</span></div>
          <div className="nav-hint"><span className="cmd">/whoami</span><span className="desc">Who are you?</span></div>
          <div className="nav-hint"><span className="cmd">/ls</span><span className="desc">List files</span></div>
          <div className="nav-hint"><span className="cmd">/ping</span><span className="desc">Pong!</span></div>
          <div className="nav-hint"><span className="cmd">/coffee</span><span className="desc">Brew a cup</span></div>
          <div className="nav-hint"><span className="cmd">/sudo hire rahul</span><span className="desc">Try it...</span></div>
        </div>
      );
    } else {
      addOutput(
        <div className="animate-fade-in">
          <span className="red">Command not found: {trimmed}</span>
          <div className="dim" style={{ marginTop: 4 }}>Type <span className="cyan">/help</span> to see available commands.</div>
        </div>
      );
    }
  }

  // Keep ref always pointing to latest executeCommand
  execRef.current = executeCommand;

  // Expose globally for testing
  useEffect(() => {
    (window as any).__terminalExec = (cmd: string) => execRef.current(cmd);
    (window as any).__terminalClear = () => setOutputs([]);
  }, []);

  // ---- Keyboard handling (uses ref to avoid stale closure) ----
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      if (shouldShowAc && acMatches[acIndex]) {
        // Fill in the autocomplete suggestion and execute immediately
        const cmd = acMatches[acIndex].cmd;
        setInput("");
  
        execRef.current(cmd);
      } else {
        execRef.current(input);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (acMatches.length > 0) {
        setInput(acMatches[acIndex].cmd);
  
      }
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (shouldShowAc) {
        setAcIndex((prev) => Math.max(0, prev - 1));
      } else if (history.length > 0) {
        const newIndex =
          historyIndex === -1
            ? history.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(history[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (shouldShowAc) {
        setAcIndex((prev) => Math.min(acMatches.length - 1, prev + 1));
      } else if (historyIndex !== -1) {
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setInput("");
        } else {
          setHistoryIndex(newIndex);
          setInput(history[newIndex]);
        }
      }
    } else if (e.key === "Escape") {

    }
  };

  // ---- Render ----
  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  // Background is the real macOS screenshot image — no extra elements needed

  return (
    <>
      {/* macOS Desktop Wallpaper */}
      <div className="macos-wallpaper" />

      {/* Background image already has dock & desktop — no extra elements needed */}

      {showMatrix && (
        <MatrixRain onComplete={() => setShowMatrix(false)} />
      )}

      {showCloseDialog && (
        <div className="close-dialog-overlay" onClick={() => setShowCloseDialog(false)}>
          <div className="close-dialog" onClick={(e) => e.stopPropagation()}>
            <h3>Close Terminal?</h3>
            <p>
              Are you sure you want to close Rahul&apos;s portfolio? You can always
              come back by refreshing the page.
            </p>
            <div className="close-dialog-buttons">
              <button onClick={() => setShowCloseDialog(false)}>Cancel</button>
              <button
                className="confirm"
                onClick={() => {
                  document.body.innerHTML =
                    '<div style="display:flex;align-items:center;justify-content:center;height:100vh;background:#0a0a14;color:#6a6a8a;font-family:monospace;font-size:0.85rem;">Terminal session ended. <span style="color:#e8a87c;margin-left:8px;cursor:pointer;" onclick="location.reload()">Reopen</span></div>';
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="terminal-window" onClick={focusInput} style={{ position: "relative", zIndex: 5 }}>
        {/* Titlebar */}
        <div className="titlebar">
          <div className="titlebar-dots">
            <div
              className="titlebar-dot dot-close"
              onClick={(e) => {
                e.stopPropagation();
                setShowCloseDialog(true);
              }}
            />
            <div
              className="titlebar-dot dot-minimize"
              onClick={(e) => e.stopPropagation()}
            />
            <div
              className="titlebar-dot dot-maximize"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
          <div className="titlebar-title">
            rahul@mahesh ~ /portfolio
          </div>
          <div style={{ width: 52 }} /> {/* Spacer for centering */}
        </div>

        {/* Output Area */}
        <div className="terminal-output" ref={outputRef}>
          {outputs.map((block) => (
            <div key={block.id} style={{ marginBottom: 16 }}>
              {block.content}
            </div>
          ))}
        </div>

        {/* Input Area */}
        <div className="terminal-input-area">
          {shouldShowAc && acMatches.length > 0 && (
            <div className="autocomplete-dropdown">
              {acMatches.map((match, i) => (
                <div
                  key={match.cmd}
                  className={`autocomplete-item ${i === acIndex ? "active" : ""}`}
                  ref={(el) => {
                    // Scroll active item into view
                    if (i === acIndex && el) {
                      el.scrollIntoView({ block: "nearest" });
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setInput("");
                    execRef.current(match.cmd);
                    inputRef.current?.focus();
                  }}
                >
                  <span className="ac-cmd">{match.cmd}</span>
                  <span className="ac-desc">{match.desc}</span>
                </div>
              ))}
            </div>
          )}
          <span className="terminal-prompt-path">
            rahul@mahesh ~
          </span>
          <span className="terminal-prompt-symbol">$</span>
          <input
            ref={inputRef}
            type="text"
            className="terminal-input"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a command... (try /help)"
            autoFocus
            autoComplete="off"
            spellCheck={false}
          />
        </div>
      </div>
    </>
  );
}

// ============================================================
// OUTPUT COMPONENTS
// ============================================================

function WelcomeBlock() {
  return (
    <div className="animate-fade-in">
      <img
        src="/images/rahulmahesh.png"
        alt="RAHUL MAHESH"
        style={{
          width: "100%",
          maxWidth: 550,
          height: "auto",
          marginBottom: 16,
          imageRendering: "pixelated",
        }}
      />

      <div className="welcome-box">
        {/* Left: centered photo, title, email */}
        <div style={{ textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <div className="greeting" style={{ marginBottom: 12 }}>Welcome, visitor.</div>
          <img
            src="/images/ascii-portrait.png"
            alt="Rahul Mahesh — ASCII Portrait"
            style={{
              width: "100%",
              maxWidth: 300,
              height: "auto",
              margin: "0 auto 12px",
              opacity: 0.85,
              filter: "sepia(0.3) hue-rotate(10deg)",
            }}
          />
          <div className="subtitle" style={{ marginTop: 8 }}>
            AI Product Engineer • Dubai, UAE
          </div>
          <div className="subtitle" style={{ fontSize: "0.7rem", marginTop: 4 }}>
            rahuldesigns@gmail.com
          </div>
        </div>

        {/* Right: capabilities + divider + navigation + education */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%" }}>
          <div>
            <div className="welcome-section-title" style={{ marginBottom: 10 }}>Capabilities</div>
            <table style={{ fontSize: "0.8rem", lineHeight: 2, borderCollapse: "collapse", width: "100%" }}>
              <tbody>
                <tr>
                  <td style={{ color: "var(--color-text)", fontWeight: 600, paddingRight: 24, whiteSpace: "nowrap" }}>Build</td>
                  <td style={{ color: "var(--color-text-dim)" }}>Full-Stack SaaS, AI Agents, APIs</td>
                </tr>
                <tr>
                  <td style={{ color: "var(--color-text)", fontWeight: 600, paddingRight: 24, whiteSpace: "nowrap" }}>Stack</td>
                  <td style={{ color: "var(--color-text-dim)" }}>TypeScript, React, Next.js, NestJS</td>
                </tr>
                <tr>
                  <td style={{ color: "var(--color-text)", fontWeight: 600, paddingRight: 24, whiteSpace: "nowrap" }}>Ship</td>
                  <td style={{ color: "var(--color-text-dim)" }}>PostgreSQL, AWS S3, PM2, Supabase</td>
                </tr>
                <tr>
                  <td style={{ color: "var(--color-text)", fontWeight: 600, paddingRight: 24, whiteSpace: "nowrap" }}>Automate</td>
                  <td style={{ color: "var(--color-text-dim)" }}>Claude API, Telegram Bots, ExcelJS</td>
                </tr>
              </tbody>
            </table>
          </div>

          <hr className="divider" style={{ margin: "14px 0" }} />

          <div>
            <div className="welcome-section-title" style={{ marginBottom: 10 }}>Navigation</div>
            <div className="welcome-item"><span className="cyan bold">/about</span></div>
            <div className="welcome-item"><span className="cyan bold">/work</span></div>
            <div className="welcome-item"><span className="cyan bold">/skills</span></div>
            <div className="welcome-item"><span className="cyan bold">/experience</span></div>
            <div className="welcome-item"><span className="cyan bold">/contact</span></div>
            <div className="welcome-item" style={{ marginTop: 6 }}>
              <span className="muted">... /help for all commands</span>
            </div>
            <div className="welcome-item">
              <span className="muted">Type /secrets if you like finding hidden things.</span>
            </div>
          </div>

          <hr className="divider" style={{ margin: "14px 0" }} />

          <div>
            <div className="welcome-section-title" style={{ marginBottom: 6 }}>Education</div>
            <div className="welcome-item">
              <span style={{ color: "var(--color-text)" }}>B.E. Computer Science</span>
            </div>
            <div className="welcome-item">
              <span className="muted">BITS Pilani · Dubai · 2025</span>
            </div>
          </div>
        </div>
      </div>

      <div className="nav-hints animate-stagger">
        <div className="output-line dim" style={{ marginBottom: 8 }}>
          Available commands:
        </div>
        <div className="nav-hint">
          <span className="cmd">/about</span>
          <span className="desc">Who is Rahul Mahesh?</span>
        </div>
        <div className="nav-hint">
          <span className="cmd">/work</span>
          <span className="desc">View featured projects</span>
        </div>
        <div className="nav-hint">
          <span className="cmd">/skills</span>
          <span className="desc">Technical skills & proficiency</span>
        </div>
        <div className="nav-hint">
          <span className="cmd">/experience</span>
          <span className="desc">Career timeline</span>
        </div>
        <div className="nav-hint">
          <span className="cmd">/contact</span>
          <span className="desc">Get in touch</span>
        </div>
        <div className="nav-hint">
          <span className="cmd">/help</span>
          <span className="desc">List all commands</span>
        </div>
      </div>
    </div>
  );
}

function AboutOutput() {
  return (
    <div className="animate-fade-in">
      <div className="heading">About Rahul Mahesh</div>
      <div className="output-line" style={{ marginBottom: 12 }}>
        AI Product Engineer with a B.E. in Computer Science from BITS Pilani Dubai.
        I build full-stack SaaS platforms, AI-powered automation agents, and scalable
        engineering systems. Based in Dubai, UAE.
      </div>

      <div className="subheading">What I do</div>
      <div className="output-line" style={{ marginBottom: 8 }}>
        I architect and develop production-grade platforms that solve real operational
        challenges. From cross-departmental project management systems to marketing
        automation agents powered by Claude API — my work sits at the intersection
        of AI, full-stack engineering, and systems design.
      </div>
      <div className="output-line" style={{ marginBottom: 12 }}>
        At every stage I ask: &quot;Does this scale? Does this eliminate manual work?&quot;
        Complexity isn&apos;t the enemy — inefficiency is.
      </div>

      <div className="subheading">Career path</div>
      <div className="output-line" style={{ marginBottom: 8 }}>
        Started as a Frontend Engineer Intern at{" "}
        <span className="accent bold">Derby Group of Companies</span>, building
        HRMS features with HTML5, Bootstrap, and jQuery — achieving a 30% increase
        in user engagement.
      </div>
      <div className="output-line" style={{ marginBottom: 8 }}>
        Moved to <span className="accent bold">MSD GCC</span> as a Web Developer
        Intern — revamped the GCC Pulse platform and integrated Figma-to-Code
        pipelines, cutting design-to-development cycle time by 25%.
      </div>
      <div className="output-line" style={{ marginBottom: 12 }}>
        <span className="accent">Currently at{" "}
        <span className="bold">Joseph Group</span></span> as AI Product Engineer —
        designed the system architecture for a full-stack SaaS platform serving 6
        departments. Built a Claude API marketing automation agent saving AED 45K
        annually. Shipping with TypeScript, React 19, Next.js 14, NestJS 11, and
        PostgreSQL.
      </div>

      <div className="subheading">Key metrics</div>
      <div className="output-line" style={{ marginBottom: 12 }}>
        <span className="green">✦</span> Manual intervention reduced by{" "}
        <span className="green bold">70%</span>{"  "}
        <span className="green">✦</span> SQL queries cut by{" "}
        <span className="green bold">85%</span>{"  "}
        <span className="green">✦</span> AED 45K annual savings{" "}
        <span className="green">✦</span> 99.9% platform uptime
      </div>

      <div className="subheading">Education</div>
      <div className="output-line" style={{ marginBottom: 8 }}>
        <span className="accent bold">B.E. Computer Science</span> — BITS Pilani, Dubai (2025)
      </div>
      <div className="output-line dim" style={{ marginBottom: 12 }}>
        Led the university&apos;s finance club, organising events, managing budgets,
        and driving member engagement across the student body.
      </div>

      <div className="subheading">Beyond the code</div>
      <div className="output-line" style={{ marginBottom: 8 }}>
        Outside of engineering, I run a YouTube channel where I create videos
        that help students in the UAE navigate university, internships, and job
        opportunities. It&apos;s a passion project that has grown into a real
        community with 1.3K subscribers, nearly 300K views, and around 1.5
        million impressions.
      </div>
      <div className="output-line muted" style={{ fontSize: "0.75rem" }}>
        📍 Dubai, UAE · 🎓 BITS Pilani · ⚡ TypeScript + NestJS enthusiast
      </div>
    </div>
  );
}

function WorkOutput() {
  return (
    <div className="animate-fade-in">
      <div className="heading">Featured Work</div>
      <div className="output-line dim" style={{ marginBottom: 12 }}>
        {PROJECTS.length} projects · 2024–2025 · across startups & enterprise
      </div>
      <hr className="divider" />
      <div className="animate-stagger">
        {PROJECTS.map((p, i) => (
          <div key={i} className="project-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
              <div className="project-title">{p.title}</div>
              <span className="muted" style={{ fontSize: "0.75rem", flexShrink: 0 }}>{p.year}</span>
            </div>
            <div className="project-role">{p.role}</div>
            <div className="project-desc">{p.desc}</div>
            <div className="project-tags" style={{ marginBottom: 6 }}>
              {p.tags.map((tag, j) => (
                <span key={j} className={`tag tag-${tag.type}`}>
                  {tag.label}
                </span>
              ))}
            </div>
            <div className="impact-row">
              {p.impact.split("·").map((metric, k) => (
                <span key={k} className="impact-item">
                  <span className="impact-icon">✦</span>
                  {metric.trim()}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkillsOutput({ onVisible }: { onVisible: () => void }) {
  useEffect(() => {
    const t = setTimeout(onVisible, 100);
    return () => clearTimeout(t);
  }, [onVisible]);

  return (
    <div className="animate-fade-in">
      <div className="heading">Skills & Proficiency</div>
      <hr className="divider" />
      {Object.entries(SKILLS).map(([category, skills]) => (
        <div key={category} style={{ marginBottom: 16 }}>
          <div className="subheading" style={{ textTransform: "capitalize" }}>
            {category === "tools" ? "🔧 Tools" : category === "design" ? "🎨 Design" : category === "growth" ? "📈 Growth" : "⚡ Engineering"}
          </div>
          {skills.map((skill, i) => (
            <div key={i} className="skill-row">
              <span className="skill-name">{skill.name}</span>
              <div className="skill-track">
                <div
                  className="skill-fill"
                  style={{
                    width: `${skill.pct}%`,
                    background: skill.color,
                    animation: `skillFill 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${i * 0.1}s both`,
                  }}
                />
              </div>
              <span className="skill-pct">{skill.pct}%</span>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

function ExperienceOutput() {
  return (
    <div className="animate-fade-in">
      <div className="heading">Career Timeline</div>
      <div className="output-line dim" style={{ marginBottom: 12 }}>
        1+ years of designing product experiences across startups and
        scale-ups.
      </div>
      <hr className="divider" />
      <div className="animate-stagger">
        {EXPERIENCES.map((exp, i) => (
          <div key={i} className="project-card">
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                flexWrap: "wrap",
                gap: 8,
                marginBottom: 4,
              }}
            >
              <div className="project-title">{exp.title}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span className="muted" style={{ fontSize: "0.75rem", fontFamily: "monospace" }}>
                  {exp.period}
                </span>
                {exp.active && (
                  <span
                    style={{
                      fontSize: "0.65rem",
                      padding: "2px 8px",
                      background: "rgba(126, 200, 155, 0.15)",
                      color: "var(--color-green)",
                      borderRadius: 7,
                      fontWeight: 600,
                    }}
                  >
                    Active
                  </span>
                )}
              </div>
            </div>
            <div className="project-role">
              {exp.company} — {exp.location}
            </div>
            <div className="project-desc">{exp.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ContactOutput() {
  return (
    <div className="animate-fade-in">
      <div className="heading">Get in Touch</div>
      <div className="output-line" style={{ marginBottom: 12 }}>
        I&apos;m always open to discussing new projects, collaborations,
        and full-time opportunities in AI product engineering and design.
      </div>
      <hr className="divider" />
      <div className="animate-stagger">
        <a href="mailto:rahuldesigns@gmail.com" className="social-link">
          <span className="social-badge badge-accent">✉</span>
          <span className="social-label">Email</span>
          <span className="social-url">rahuldesigns@gmail.com</span>
        </a>
        <a href="tel:+971585496303" className="social-link">
          <span className="social-badge badge-blue">📱</span>
          <span className="social-label">Phone</span>
          <span className="social-url">+971 58 549 6303</span>
        </a>
        <a href="https://www.linkedin.com/in/rahuldesigns/" target="_blank" rel="noopener noreferrer" className="social-link">
          <span className="social-badge badge-blue">in</span>
          <span className="social-label">LinkedIn</span>
          <span className="social-url">linkedin.com/in/rahuldesigns ↗</span>
        </a>
        <div className="social-link" style={{ cursor: "default" }}>
          <span className="social-badge badge-purple">📍</span>
          <span className="social-label">Location</span>
          <span className="social-url">Jumeirah Lake Towers, Dubai, UAE</span>
        </div>
      </div>
      <div className="output-line dim" style={{ marginTop: 12, fontSize: "0.75rem" }}>
        Status: <span className="green">● Open to opportunities</span> — AI Product Engineering, Design Systems, Full-Stack
      </div>
    </div>
  );
}

function SocialOutput() {
  return (
    <div className="animate-fade-in">
      <div className="heading">Social & Profiles</div>
      <hr className="divider" />
      <div className="animate-stagger">
        <a href="https://www.linkedin.com/in/rahuldesigns/" target="_blank" rel="noopener noreferrer" className="social-link">
          <span className="social-badge badge-blue">in</span>
          <span className="social-label">LinkedIn</span>
          <span className="social-url">/in/rahuldesigns ↗</span>
        </a>
        <a href="https://behance.net" target="_blank" rel="noopener noreferrer" className="social-link">
          <span className="social-badge badge-blue">Bē</span>
          <span className="social-label">Behance</span>
          <span className="social-url">behance.net/rahulmahesh ↗</span>
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="social-link">
          <span className="social-badge badge-purple">ig</span>
          <span className="social-label">Instagram</span>
          <span className="social-url">@rahulmahesh ↗</span>
        </a>
        <a href="https://www.youtube.com/@itsnotrahul" target="_blank" rel="noopener noreferrer" className="social-link">
          <span className="social-badge badge-red">YT</span>
          <span className="social-label">YouTube</span>
          <span className="social-url">youtube.com/@itsnotrahul ↗</span>
        </a>
        <a href="https://spotify.com" target="_blank" rel="noopener noreferrer" className="social-link">
          <span className="social-badge badge-green">♫</span>
          <span className="social-label">Spotify</span>
          <span className="social-url">What I listen to while coding ↗</span>
        </a>
        <a href="mailto:rahuldesigns@gmail.com" className="social-link">
          <span className="social-badge badge-accent">✉</span>
          <span className="social-label">Email</span>
          <span className="social-url">rahuldesigns@gmail.com</span>
        </a>
      </div>
    </div>
  );
}

function HelpOutput() {
  return (
    <div className="animate-fade-in">
      <div className="heading">Available Commands</div>
      <hr className="divider" />
      <div className="animate-stagger">
        {COMMANDS.filter((c) => !c.hidden).map((c) => (
          <div key={c.cmd} className="nav-hint">
            <span className="cmd">{c.cmd}</span>
            <span className="desc">{c.desc}</span>
          </div>
        ))}
      </div>
      <div className="output-line muted" style={{ marginTop: 12, fontSize: "0.75rem" }}>
        💡 Tip: Use ↑/↓ arrows to navigate command history. Tab to autocomplete.
      </div>
      <div className="output-line muted" style={{ fontSize: "0.75rem" }}>
        🔍 There may also be some hidden commands to discover...
      </div>
    </div>
  );
}

function HireOutput() {
  return (
    <div className="animate-fade-in">
      <div className="green bold" style={{ fontSize: "0.95rem" }}>
        ✓ Password accepted. Admin access granted.
      </div>
      <div style={{ marginTop: 8 }}>
        <div className="output-line">
          <span className="green">▸</span> Generating offer letter...{" "}
          <span className="green">done</span>
        </div>
        <div className="output-line">
          <span className="green">▸</span> Scheduling onboarding...{" "}
          <span className="green">done</span>
        </div>
        <div className="output-line">
          <span className="green">▸</span> Ordering welcome swag...{" "}
          <span className="green">done</span>
        </div>
        <div className="output-line">
          <span className="green">▸</span> Booking corner office with view...{" "}
          <span className="green">done</span>
        </div>
      </div>
      <div className="accent bold" style={{ marginTop: 12 }}>
        🎉 Congratulations! You&apos;ve hired Rahul Mahesh.
      </div>
      <div className="dim" style={{ marginTop: 4, fontSize: "0.75rem" }}>
        (Just kidding. But seriously, let&apos;s talk →{" "}
        <span className="cyan">rahuldesigns@gmail.com</span>)
      </div>
    </div>
  );
}

function NeofetchOutput() {
  return (
    <div className="animate-fade-in" style={{ display: "flex", gap: 24 }}>
      <pre
        style={{
          color: "var(--color-accent)",
          fontSize: "0.65rem",
          lineHeight: 1.2,
          flexShrink: 0,
        }}
      >{`
    ██████╗ ███╗   ███╗
    ██╔══██╗████╗ ████║
    ██████╔╝██╔████╔██║
    ██╔══██╗██║╚██╔╝██║
    ██║  ██║██║ ╚═╝ ██║
    ╚═╝  ╚═╝╚═╝     ╚═╝
      `.trim()}</pre>
      <div style={{ fontSize: "0.8rem", lineHeight: 1.8 }}>
        <div>
          <span className="accent bold">rahul@mahesh</span>
        </div>
        <div>
          <span className="dim">──────────────────</span>
        </div>
        <div>
          <span className="cyan">OS:</span>{" "}
          <span className="dim">AI Product Engineering</span>
        </div>
        <div>
          <span className="cyan">Host:</span>{" "}
          <span className="dim">Dubai, UAE</span>
        </div>
        <div>
          <span className="cyan">Shell:</span>{" "}
          <span className="dim">VS Code + Claude Code</span>
        </div>
        <div>
          <span className="cyan">Stack:</span>{" "}
          <span className="dim">TypeScript, React 19, Next.js, NestJS</span>
        </div>
        <div>
          <span className="cyan">DB:</span>{" "}
          <span className="dim">PostgreSQL (Supabase), AWS S3</span>
        </div>
        <div>
          <span className="cyan">Edu:</span>{" "}
          <span className="dim">B.E. CS — BITS Pilani Dubai</span>
        </div>
        <div>
          <span className="cyan">Uptime:</span>{" "}
          <span className="dim">2+ years shipping production code</span>
        </div>
        <div style={{ marginTop: 8 }}>
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              background: "var(--color-red)",
              marginRight: 4,
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              background: "var(--color-accent)",
              marginRight: 4,
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              background: "var(--color-yellow)",
              marginRight: 4,
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              background: "var(--color-green)",
              marginRight: 4,
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              background: "var(--color-cyan)",
              marginRight: 4,
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              background: "var(--color-blue)",
              marginRight: 4,
            }}
          />
          <span
            style={{
              display: "inline-block",
              width: 12,
              height: 12,
              background: "var(--color-purple)",
              marginRight: 4,
            }}
          />
        </div>
      </div>
    </div>
  );
}
