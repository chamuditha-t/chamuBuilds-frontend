import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';

const EXPERTISE = [
  {
    domain: "Full-Stack Engineering",
    stack: "MERN · REST APIs · System Design",
    proof: "CodePrep",
    icon: "◈",
    description:
      "End-to-end architecture from database schema to deployment pipelines.",
  },
  {
    domain: "Mobile Development",
    stack: "Android · Java · Firebase",
    proof: "EcoTrace",
    icon: "◉",
    description:
      "Native Android experiences with real-time sync and offline support.",
  },
  {
    domain: "Enterprise Java",
    stack: "Spring Boot · OOP · E-Commerce",
    proof: "Blessed Blooms",
    icon: "◫",
    description: "Layered enterprise systems with service-repository patterns.",
  },
  {
    domain: "Cloud & Infrastructure",
    stack: "Azure · Docker · Deployment",
    proof: "AZ-900 Certified",
    icon: "◬",
    description:
      "Scalable deployments, containerization, and cloud-native thinking.",
  },
];

const PROJECTS = [
  {
    id: "codeprep",
    title: "CodePrep",
    tagline: "Interview Engineering Platform",
    one_line:
      "MERN-stack platform bridging the gap between university CS and industry expectations.",
    tech: ["React", "Node.js", "Express", "MongoDB", "OneCompiler API"],
    architecture:
      "Phase-gated learning engine with live code execution pipeline. Four modules: Coding Genesis → Architect's Path → Industry Bound → Interview Ace.",
    metrics: {
      phase: "Phase 3 / 4",
      runtime: "Live execution",
      focus: "SL Engineers",
    },
    category: "EdTech · DevTools",
    status: "In Development",
    github: "#",
    live: "#",
  },
  {
    id: "ecotrace",
    title: "EcoTrace",
    tagline: "Android Eco-Commerce Platform",
    one_line:
      "Eco-friendly product marketplace on Android with Firestore-powered filtering and PayHere payments.",
    tech: ["Java", "Android", "Firebase Firestore", "PayHere SDK"],
    architecture:
      "RBAC-controlled admin layer with composite Firestore indexing and client-side filter orchestration for sub-category queries.",
    metrics: { platform: "Android", db: "Firestore", payment: "PayHere" },
    category: "GreenTech · Mobile",
    status: "MVP Complete",
    github: "#",
    live: "#",
  },
  {
    id: "blessedblooms",
    title: "Blessed Blooms",
    tagline: "Enterprise Java E-Commerce",
    one_line:
      "Full-featured enterprise e-commerce system built with Spring Boot and layered architecture.",
    tech: ["Java", "Spring Boot", "MySQL", "Thymeleaf"],
    architecture:
      "Service-repository pattern with role-based access. Inventory, order lifecycle, and customer management in a monolithic enterprise structure.",
    metrics: { stack: "Spring Boot", pattern: "MVC", scope: "Enterprise" },
    category: "E-Commerce · Java",
    status: "Complete",
    github: "#",
    live: "#",
  },
];

const PHASES = [
  {
    name: "Coding Genesis",
    desc: "DSA fundamentals + live code execution",
    done: true,
    active: true,
    icon: "🌱",
  },
  {
    name: "Architect's Path",
    desc: "System design + architecture patterns",
    done: true,
    active: false,
    icon: "🏗️",
  },
  {
    name: "Industry Bound",
    desc: "Real-world stacks + hands-on tasks",
    done: false,
    active: true,
    icon: "⚡",
  },
  {
    name: "Interview Ace",
    desc: "Mock interviews + AI feedback",
    done: false,
    active: false,
    icon: "🎯",
  },
];

const GITHUB_STATS = {
  repos: 14,
  stars: 87,
  contributions: "1,247",
  languages: ["JavaScript", "TypeScript", "Java", "Python"],
};

export default function ChamuBuilds() {
  const [activeTab, setActiveTab] = useState("architecture");
  const [activeProject, setActiveProject] = useState("codeprep");
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formStatus, setFormStatus] = useState(null);
  const [cursorVisible, setCursorVisible] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);

    const cursorInterval = setInterval(() => {
      setCursorVisible((v) => !v);
    }, 530);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      clearInterval(cursorInterval);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormStatus("success");
      try {
        const response = await axios.post(
          "https://codeprep-backend.onrender.com/api/messages",
          formData,
        );
        console.log(response);
      } catch (error) {
        console.log("API not available, but form submitted locally");
      }
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus(null), 3000);
    } else {
      setFormStatus("error");
      setTimeout(() => setFormStatus(null), 2000);
    }
  };

  const currentProject = PROJECTS.find((p) => p.id === activeProject);

  return (
    <div className="bg-[#080808] text-[#c8c8c8] min-h-screen font-['Syne',sans-serif] overflow-x-hidden">
      {/* Dot grid background */}
      <div className="dot-grid fixed inset-0 z-0 pointer-events-none" />

      {/* NAV - Responsive */}
      <nav
        className={`fixed top-0 w-full z-50 transition-all duration-500 ${
          scrolled
            ? "bg-black/85 backdrop-blur-xl border-b border-amber-500/10 py-3"
            : "bg-transparent py-5 md:py-7"
        }`}
      >
        <div className="max-w-6xl mx-auto px-5 md:px-8 flex justify-between items-center">
          <div className="flex items-center gap-2.5">
            <span className="w-1.5 h-1.5 bg-amber-500 rounded-full pulse" />
            <span className="font-extrabold text-base md:text-lg tracking-tighter text-[#f0f0f0]">
              CHAMU<span className="text-amber-500">.</span>BUILDS
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-9">
            <a
              href="#expertise"
              className="nav-link text-xs tracking-wider text-[#555] hover:text-amber-500 transition-all duration-200 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-amber-500 after:transition-all hover:after:w-full"
            >
              /expertise
            </a>
            <a
              href="#work"
              className="nav-link text-xs tracking-wider text-[#555] hover:text-amber-500 transition-all duration-200 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-amber-500 after:transition-all hover:after:w-full"
            >
              /work
            </a>
            <a
              href="#building"
              className="nav-link text-xs tracking-wider text-[#555] hover:text-amber-500 transition-all duration-200 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-amber-500 after:transition-all hover:after:w-full"
            >
              /now
            </a>
            <a
              href="#contact"
              className="nav-link text-xs tracking-wider text-[#555] hover:text-amber-500 transition-all duration-200 relative after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:w-0 after:h-px after:bg-amber-500 after:transition-all hover:after:w-full"
            >
              /ping
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-[#f0f0f0] text-2xl focus:outline-none z-50 relative"
          >
            {mobileMenuOpen ? "✕" : "☰"}
          </button>

          {/* Desktop Hire Button */}
          <a
            href="#contact"
            className="hidden md:inline-block bg-amber-500 text-black px-5 py-2 rounded-full text-xs font-bold hover:bg-amber-400 transition-all hover:scale-105"
          >
            hire me
          </a>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-black/95 backdrop-blur-xl border-b border-amber-500/20 py-6 px-5 flex flex-col gap-5 z-40">
            <a
              href="#expertise"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-[#ccc] hover:text-amber-500 transition-colors font-mono tracking-wider"
            >
              /expertise
            </a>
            <a
              href="#work"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-[#ccc] hover:text-amber-500 transition-colors font-mono tracking-wider"
            >
              /work
            </a>
            <a
              href="#building"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-[#ccc] hover:text-amber-500 transition-colors font-mono tracking-wider"
            >
              /now
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm text-[#ccc] hover:text-amber-500 transition-colors font-mono tracking-wider"
            >
              /ping
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="bg-amber-500 text-black px-5 py-2 rounded-full text-xs font-bold text-center w-full"
            >
              hire me
            </a>
          </div>
        )}
      </nav>

      <main className="relative z-10 max-w-6xl mx-auto px-5 md:px-8">
        {/* HERO SECTION - Responsive */}
        <section className="pt-28 md:pt-44 pb-16 md:pb-32">
          <div className="mb-6 md:mb-7">
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.2em] text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-full uppercase inline-block">
              Final Year SWE · Birmingham City University · 2026
            </span>
          </div>

          <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-[88px] font-extrabold leading-[1.1] md:leading-[0.92] tracking-tighter text-[#f0f0f0] mb-6 md:mb-8 max-w-4xl">
            I build the tools
            <br />I{" "}
            <span className="text-amber-500 italic border-b-2 border-amber-500">
              wished
            </span>{" "}
            I had.
          </h1>

          <p className="text-base md:text-xl text-[#666] max-w-lg leading-relaxed md:leading-[1.6] mb-8 md:mb-12">
            Full-stack engineer. Java specialist. Cloud-native thinker. Based in
            Colombo 🇱🇰 — building from first principles.
          </p>

          <div className="flex flex-wrap gap-3 md:gap-4 mb-10 md:mb-16">
            <a
              href="#work"
              className="bg-amber-500 text-black px-5 md:px-8 py-3 md:py-3.5 rounded-full text-xs md:text-[13px] font-bold hover:bg-amber-400 transition-all hover:scale-105"
            >
              see my work →
            </a>
            <a
              href="#contact"
              className="bg-transparent text-[#888] border border-white/10 px-5 md:px-8 py-3 md:py-3.5 rounded-full text-xs md:text-[13px] font-semibold hover:border-amber-500/50 hover:text-amber-500 transition-all"
            >
              /ping me
            </a>
            <a
              href="#"
              className="bg-transparent text-[#888] border border-amber-500/20 px-5 md:px-8 py-3 md:py-3.5 rounded-full text-xs md:text-[13px] font-semibold hover:border-amber-500/50 hover:text-amber-500 transition-all"
            >
              📄 resume.pdf
            </a>
          </div>

          {/* GitHub stats - responsive */}
          <div className="flex flex-wrap gap-3 md:gap-6 p-4 md:p-6 bg-white/5 border border-white/5 rounded-2xl mb-6">
            {Object.entries(GITHUB_STATS).map(([key, val]) => (
              <div key={key} className="flex items-baseline gap-1.5 md:gap-2">
                <span className="font-mono text-[9px] md:text-[10px] text-[#555] uppercase">
                  {key}:
                </span>
                <span className="text-base md:text-lg font-bold text-[#f0f0f0]">
                  {typeof val === "number"
                    ? val.toLocaleString()
                    : Array.isArray(val)
                      ? val.slice(0, 2).join(" · ")
                      : val}
                </span>
              </div>
            ))}
          </div>

          {/* Identity tags - responsive wrap */}
          <div className="flex flex-wrap gap-2 md:gap-2.5">
            {[
              "⚙ Robotics — All Island Competition",
              "✦ AZ-900 Certified",
              "◈ MERN · Java · Android",
              "◉ Open for Internships 2026",
            ].map((tag) => (
              <span
                key={tag}
                className="font-mono text-[10px] md:text-[11px] text-[#555] bg-white/5 border border-white/10 px-3 md:px-3.5 py-1.5 md:py-1.5 rounded-full"
              >
                {tag}
              </span>
            ))}
          </div>
        </section>

        {/* EXPERTISE - Responsive 2 column, 1 on mobile */}
        <section id="expertise" className="pb-20 md:pb-32">
          <div className="mb-8 md:mb-12">
            <span className="font-mono text-[10px] md:text-[11px] tracking-[0.15em] text-amber-500 uppercase">
              /expertise
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#f0f0f0] tracking-tighter mt-2 md:mt-2.5">
              What I master.
            </h2>
            <p className="font-mono text-[11px] md:text-xs text-[#444] mt-1 md:mt-2">
              declared expertise, proven by shipped systems
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {EXPERTISE.map((item) => (
              <div
                key={item.domain}
                className="card p-6 md:p-8 bg-white/5 border border-white/10 rounded-2xl w-full"
              >
                <div className="flex justify-between items-start mb-3 md:mb-4">
                  <span className="text-2xl md:text-[28px] text-amber-500">
                    {item.icon}
                  </span>
                  <span className="font-mono text-[8px] md:text-[9px] text-amber-500 bg-amber-500/10 px-2 md:px-2.5 py-1 rounded-full">
                    proof → {item.proof}
                  </span>
                </div>
                <h3 className="text-lg md:text-xl font-bold text-[#f0f0f0] mb-1.5 md:mb-2 tracking-tight">
                  {item.domain}
                </h3>
                <p className="font-mono text-[10px] md:text-[11px] text-[#555] mb-2 md:mb-3">
                  {item.stack}
                </p>
                <p className="text-xs md:text-[13px] text-[#666] leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* WORK - Responsive layout: column on mobile, row on desktop */}
        <section id="work" className="pb-20 md:pb-32">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 md:mb-12 gap-4 md:gap-5">
            <div>
              <span className="font-mono text-[10px] md:text-[11px] tracking-[0.15em] text-amber-500 uppercase">
                /work
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#f0f0f0] tracking-tighter mt-2">
                Production systems.
              </h2>
              <p className="font-mono text-[11px] md:text-xs text-[#444] mt-1">
                each one is proof of the expertise above
              </p>
            </div>
            <div className="flex bg-white/5 border border-white/10 rounded-xl p-1 gap-0.5">
              {["architecture", "metrics", "stack"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-btn text-[9px] md:text-[10px] px-3 md:px-4 py-1.5 md:py-2 ${activeTab === tab ? "active" : ""}`}
                >
                  /{tab}
                </button>
              ))}
            </div>
          </div>

          {/* Project selector + detail - responsive: column on mobile */}
          <div className="flex flex-col md:flex-row gap-5 md:gap-6">
            {/* Project selector - horizontal scroll on mobile, vertical on desktop */}
            <div className="flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-x-visible pb-4 md:pb-0 snap-x scrollbar-hide">
              {PROJECTS.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setActiveProject(p.id)}
                  className={`project-btn flex-shrink-0 md:flex-shrink w-[220px] md:w-auto p-3 md:p-3 ${activeProject === p.id ? "active" : ""}`}
                >
                  <div className="flex justify-between items-center mb-0.5">
                    <span
                      className={`font-bold text-sm md:text-base ${activeProject === p.id ? "text-amber-500" : "text-[#f0f0f0]"}`}
                    >
                      {p.title}
                    </span>
                    <span className="font-mono text-[7px] md:text-[8px] text-[#444]">
                      {p.status}
                    </span>
                  </div>
                  <p className="text-[10px] md:text-[11px] text-[#555]">
                    {p.tagline}
                  </p>
                </div>
              ))}
            </div>

            {/* Detail view */}
            {currentProject && (
              <div className="card p-5 md:p-9 flex-1">
                <div className="flex flex-col sm:flex-row justify-between items-start gap-3 mb-4 md:mb-5">
                  <div>
                    <span className="font-mono text-[9px] md:text-[10px] text-amber-500 tracking-[0.15em] uppercase">
                      {currentProject.category}
                    </span>
                    <h3 className="text-2xl md:text-[28px] font-extrabold text-[#f0f0f0] tracking-tighter mt-1.5">
                      {currentProject.title}
                    </h3>
                    <p className="text-xs md:text-sm text-amber-500 italic mt-1">
                      {currentProject.tagline}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <a
                      href={currentProject.github}
                      className="font-mono text-[10px] md:text-[11px] text-[#555] no-underline px-2 md:px-3 py-1.5 bg-white/5 rounded-lg"
                    >
                      github →
                    </a>
                    <a
                      href={currentProject.live}
                      className="font-mono text-[10px] md:text-[11px] text-[#555] no-underline px-2 md:px-3 py-1.5 bg-white/5 rounded-lg"
                    >
                      live →
                    </a>
                  </div>
                </div>

                <p className="text-sm md:text-sm text-[#888] leading-relaxed mb-5 md:mb-6">
                  {currentProject.one_line}
                </p>

                {activeTab === "architecture" && (
                  <div>
                    <p className="font-mono text-[9px] md:text-[10px] text-amber-500 tracking-[0.15em] uppercase mb-3 md:mb-4">
                      system architecture
                    </p>
                    <p className="text-sm md:text-[15px] text-[#c8c8c8] italic leading-relaxed border-l-2 border-amber-500 pl-4">
                      "{currentProject.architecture}"
                    </p>
                  </div>
                )}

                {activeTab === "metrics" && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                    {Object.entries(currentProject.metrics).map(([k, v]) => (
                      <div key={k}>
                        <p className="font-mono text-[8px] md:text-[9px] text-[#555] uppercase tracking-[0.15em] mb-1.5">
                          {k}
                        </p>
                        <p className="text-base md:text-xl font-bold text-[#f0f0f0] tracking-tight">
                          {v}
                        </p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "stack" && (
                  <div className="flex flex-wrap gap-2 md:gap-2.5">
                    {currentProject.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[11px] md:text-xs text-[#888] bg-white/5 border border-white/10 px-2.5 md:px-4 py-1.5 md:py-2 rounded-lg"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="mt-10 md:mt-14 flex justify-center">
            <Link
              to="/projects"
              className="bg-transparent text-[#888] border border-amber-500/20 px-6 md:px-8 py-3 md:py-3.5 rounded-full text-xs md:text-[13px] font-semibold hover:border-amber-500/50 hover:text-amber-500 transition-all inline-flex items-center gap-2 no-underline"
            >
              view all projects{" "}
              <span className="text-amber-500 text-sm md:text-base">→</span>
            </Link>
          </div>
        </section>

        {/* CURRENTLY BUILDING - Responsive */}
        <section id="building" className="pb-20 md:pb-32">
          <span className="font-mono text-[10px] md:text-[11px] tracking-[0.15em] text-amber-500 uppercase">
            /now
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#f0f0f0] tracking-tighter mt-2 mb-8 md:mb-12">
            Currently building <span className="text-amber-500">CodePrep</span>.
          </h2>

          <div className="flex flex-col md:flex-row gap-5 md:gap-6">
            {/* Phase tracker */}
            <div className="card p-5 md:p-9 flex-1">
              <p className="font-mono text-[9px] md:text-[10px] text-[#555] tracking-[0.15em] uppercase mb-6 md:mb-7">
                module roadmap
              </p>
              <div className="relative">
                {PHASES.map((phase, i) => (
                  <div
                    key={phase.name}
                    className="flex gap-4 md:gap-4 mb-6 md:mb-7 relative"
                  >
                    {i < PHASES.length - 1 && (
                      <div
                        className={`absolute left-2.5 top-6 -bottom-6 w-px ${phase.done ? "bg-amber-500/40" : "bg-white/5"}`}
                      />
                    )}
                    <div
                      className={`w-5 h-5 rounded-full flex-shrink-0 mt-0.5 flex items-center justify-center ${
                        phase.done
                          ? "bg-amber-500"
                          : phase.active
                            ? "bg-transparent border-2 border-amber-500"
                            : "bg-white/10 border border-white/10"
                      }`}
                    >
                      {phase.active && (
                        <span className="w-2 h-2 rounded-full bg-amber-500 pulse" />
                      )}
                      {phase.done && (
                        <span className="text-[10px] text-black">✓</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm md:text-base">
                          {phase.icon}
                        </span>
                        <p
                          className={`text-sm md:text-sm font-semibold ${
                            phase.done
                              ? "text-[#f0f0f0]"
                              : phase.active
                                ? "text-amber-500"
                                : "text-[#444]"
                          }`}
                        >
                          {phase.name}
                        </p>
                      </div>
                      <p className="text-[11px] md:text-xs text-[#555] leading-relaxed">
                        {phase.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 md:mt-5">
                <div className="h-1 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-amber-500 rounded-full" />
                </div>
                <div className="flex justify-between mt-2">
                  <span className="font-mono text-[9px] md:text-[10px] text-[#444]">
                    Phase 3 of 4
                  </span>
                  <span className="font-mono text-[9px] md:text-[10px] text-amber-500">
                    65% complete
                  </span>
                </div>
              </div>
            </div>

            {/* Terminal */}
            <div className="card p-0 overflow-hidden flex-1">
              <div className="bg-white/5 px-4 md:px-5 py-3 border-b border-white/5 flex items-center gap-2">
                {["#ef4444", "#f59e0b", "#22c55e"].map((c) => (
                  <span
                    key={c}
                    className="w-2.5 h-2.5 rounded-full opacity-60"
                    style={{ background: c }}
                  />
                ))}
                <span className="font-mono text-[9px] md:text-[10px] text-[#444] ml-2">
                  codeprep — zsh
                </span>
              </div>
              <div className="p-5 md:p-7 font-mono">
                <div className="mb-5 md:mb-6">
                  <p className="text-[10px] md:text-[11px] text-[#444] mb-2 md:mb-3">
                    $ git log --oneline -4
                  </p>
                  <div className="flex flex-col gap-2 md:gap-2.5">
                    {[
                      [
                        "a3f91bc",
                        "✨",
                        "feat: industry-bound task system scaffolded",
                      ],
                      [
                        "7d2e04a",
                        "⚙️",
                        "feat: onecompiler api integration — live exec",
                      ],
                      [
                        "3b81cc2",
                        "🐛",
                        "fix: 500 on /execute — endpoint url corrected",
                      ],
                      ["9a14d71", "🔨", "refactor: module phase gating logic"],
                    ].map(([hash, emoji, msg]) => (
                      <div
                        key={hash}
                        className="flex gap-2 md:gap-2.5 items-center text-[10px] md:text-[11px] flex-wrap"
                      >
                        <span className="text-amber-500 flex-shrink-0">
                          {hash}
                        </span>
                        <span className="text-xs md:text-xs">{emoji}</span>
                        <span className="text-[#666] break-all">{msg}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-white/5 pt-4 md:pt-5">
                  <div className="flex items-center gap-2 mb-2 md:mb-3">
                    <span className="text-[10px] md:text-[11px] text-[#444]">
                      $
                    </span>
                    <span className="text-[10px] md:text-[11px] text-[#f0f0f0]">
                      npm run dev
                    </span>
                  </div>
                  <p className="text-[10px] md:text-[11px] text-green-500 mb-3 md:mb-4">
                    ▶ ready on localhost:3000
                  </p>
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-0 justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 bg-amber-500 rounded-full pulse" />
                      <span className="text-[9px] md:text-[10px] text-[#555]">
                        last commit: 3 hours ago
                      </span>
                    </div>
                    <div className="flex gap-1">
                      <span className="text-[9px] md:text-[10px] text-[#444]">
                        chamu@codeprep
                      </span>
                      <span
                        className={`text-[9px] md:text-[10px] text-amber-500 ${cursorVisible ? "opacity-100" : "opacity-0"}`}
                      >
                        █
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CONTACT - Responsive */}
        <section id="contact" className="pb-12 md:pb-20">
          <div className="card p-5 md:p-16 rounded-3xl bg-gradient-to-br from-amber-500/5 via-white/5 to-transparent">
            <div className="flex flex-col md:flex-row gap-8 md:gap-16 items-start">
              <div className="flex-1">
                <span className="font-mono text-[10px] md:text-[11px] tracking-[0.15em] text-amber-500 uppercase">
                  /contact
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-[44px] font-extrabold text-[#f0f0f0] tracking-tighter leading-tight mt-3 mb-4">
                  Let's build
                  <br />
                  something real.
                </h2>
                <p className="text-sm md:text-[15px] text-[#555] leading-relaxed mb-8 max-w-md">
                  Open for Software Engineering internships, freelance work, or
                  just a solid engineering conversation.
                </p>
                <div className="flex flex-col gap-3 md:gap-3.5">
                  {[
                    [
                      "◈",
                      "github.com/chamuditha",
                      "https://github.com/chamuditha-t",
                    ],
                    [
                      "◉",
                      "linkedin.com/in/chamuditha",
                      "www.linkedin.com/in/chamuditha-theekshana-b138993a6",
                    ],
                    ["◫", "Colombo, Sri Lanka 🇱🇰", null],
                  ].map(([icon, text, link]) =>
                    link ? (
                      <a
                        key={text}
                        href={link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 no-underline group"
                      >
                        <span className="text-amber-500 text-sm md:text-sm">
                          {icon}
                        </span>
                        <span className="font-mono text-[11px] md:text-xs text-[#555] group-hover:text-amber-500 transition-colors">
                          {text}
                        </span>
                      </a>
                    ) : (
                      <div key={text} className="flex items-center gap-3">
                        <span className="text-amber-500 text-sm md:text-sm">
                          {icon}
                        </span>
                        <span className="font-mono text-[11px] md:text-xs text-[#555]">
                          {text}
                        </span>
                      </div>
                    ),
                  )}
                </div>
              </div>
              <div className="flex-1 w-full">
                <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
                  <input
                    type="text"
                    placeholder="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#f0f0f0] text-sm outline-none focus:border-amber-500 transition-all"
                    required
                  />
                  <input
                    type="email"
                    placeholder="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#f0f0f0] text-sm outline-none focus:border-amber-500 transition-all"
                    required
                  />
                  <textarea
                    rows={4}
                    placeholder="what are you building?"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-[#f0f0f0] text-sm outline-none focus:border-amber-500 transition-all resize-none"
                    required
                  />
                  <button
                    type="submit"
                    className="w-full bg-white text-black py-3.5 rounded-xl font-bold text-sm hover:bg-amber-500 transition-all"
                  >
                    send message →
                  </button>
                  {formStatus === "success" && (
                    <p className="font-mono text-[11px] md:text-xs text-green-500 text-center">
                      ✓ sent! I'll reply within 48h.
                    </p>
                  )}
                  {formStatus === "error" && (
                    <p className="font-mono text-[11px] md:text-xs text-red-500 text-center">
                      ✗ all fields required.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/5 py-8 md:py-10 text-center">
          <p className="font-mono text-[9px] md:text-[10px] text-[#2a2a2a] tracking-[0.3em] md:tracking-[0.4em] uppercase">
            © 2026 CHAMU.BUILDS · EXPERTISE FIRST · SYSTEMS THAT SCALE
          </p>
        </footer>
      </main>

      <style>{`
        .dot-grid {
          background-image: radial-gradient(rgba(245,158,11,0.03) 1px, transparent 1px);
          background-size: 32px 32px;
        }
        .pulse {
          animation: pulse 2.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
        .card {
          transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .card:hover {
          border-color: rgba(245,158,11,0.25);
          transform: translateY(-4px);
        }
        .project-btn {
          transition: all 0.2s ease;
        }
        .project-btn:hover {
          border-color: rgba(245,158,11,0.4);
          transform: translateX(4px);
        }
        .nav-link::after {
          content: '';
          position: absolute;
          bottom: -4px;
          left: 0;
          width: 0;
          height: 1px;
          background: #f59e0b;
          transition: width 0.2s;
        }
        .nav-link:hover::after {
          width: 100%;
        }
        input::placeholder, textarea::placeholder {
          color: #444;
        }
        html {
          scroll-behavior: smooth;
        }
      `}</style>
    </div>
  );
}
