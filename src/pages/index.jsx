import axios from 'axios';
import React, { useState, useEffect } from 'react';

const EXPERTISE = [
  {
    domain: "Full-Stack Engineering",
    stack: "MERN · REST APIs · System Design",
    proof: "CodePrep",
    icon: "◈",
    description: "End-to-end architecture from database schema to deployment pipelines."
  },
  {
    domain: "Mobile Development",
    stack: "Android · Java · Firebase",
    proof: "EcoTrace",
    icon: "◉",
    description: "Native Android experiences with real-time sync and offline support."
  },
  {
    domain: "Enterprise Java",
    stack: "Spring Boot · OOP · E-Commerce",
    proof: "Blessed Blooms",
    icon: "◫",
    description: "Layered enterprise systems with service-repository patterns."
  },
  {
    domain: "Cloud & Infrastructure",
    stack: "Azure · Docker · Deployment",
    proof: "AZ-900 Certified",
    icon: "◬",
    description: "Scalable deployments, containerization, and cloud-native thinking."
  }
];

const PROJECTS = [
  {
    id: "codeprep",
    title: "CodePrep",
    tagline: "Interview Engineering Platform",
    one_line: "MERN-stack platform bridging the gap between university CS and industry expectations.",
    tech: ["React", "Node.js", "Express", "MongoDB", "OneCompiler API"],
    architecture: "Phase-gated learning engine with live code execution pipeline. Four modules: Coding Genesis → Architect's Path → Industry Bound → Interview Ace.",
    metrics: { phase: "Phase 3 / 4", runtime: "Live execution", focus: "SL Engineers" },
    category: "EdTech · DevTools",
    status: "In Development",
    github: "#",
    live: "#"
  },
  {
    id: "ecotrace",
    title: "EcoTrace",
    tagline: "Android Eco-Commerce Platform",
    one_line: "Eco-friendly product marketplace on Android with Firestore-powered filtering and PayHere payments.",
    tech: ["Java", "Android", "Firebase Firestore", "PayHere SDK"],
    architecture: "RBAC-controlled admin layer with composite Firestore indexing and client-side filter orchestration for sub-category queries.",
    metrics: { platform: "Android", db: "Firestore", payment: "PayHere" },
    category: "GreenTech · Mobile",
    status: "MVP Complete",
    github: "#",
    live: "#"
  },
  {
    id: "blessedblooms",
    title: "Blessed Blooms",
    tagline: "Enterprise Java E-Commerce",
    one_line: "Full-featured enterprise e-commerce system built with Spring Boot and layered architecture.",
    tech: ["Java", "Spring Boot", "MySQL", "Thymeleaf"],
    architecture: "Service-repository pattern with role-based access. Inventory, order lifecycle, and customer management in a monolithic enterprise structure.",
    metrics: { stack: "Spring Boot", pattern: "MVC", scope: "Enterprise" },
    category: "E-Commerce · Java",
    status: "Complete",
    github: "#",
    live: "#"
  }
];

const PHASES = [
  { name: "Coding Genesis", desc: "DSA fundamentals + live code execution", done: true, icon: "🌱" },
  { name: "Architect's Path", desc: "System design + architecture patterns", done: true, icon: "🏗️" },
  { name: "Industry Bound", desc: "Real-world stacks + hands-on tasks", done: false, active: true, icon: "⚡" },
  { name: "Interview Ace", desc: "Mock interviews + AI feedback", done: false, icon: "🎯" },
];

const GITHUB_STATS = {
  repos: 14,
  stars: 87,
  contributions: "1,247",
  languages: ["JavaScript", "TypeScript", "Java", "Python"]
};

export default function ChamuBuilds() {
  const [activeTab, setActiveTab] = useState('architecture');
  const [activeProject, setActiveProject] = useState('codeprep');
  const [scrolled, setScrolled] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [formStatus, setFormStatus] = useState(null);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    
    const cursorInterval = setInterval(() => {
      setCursorVisible(v => !v);
    }, 530);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(cursorInterval);
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormStatus("success");

      const respnose = await axios.post('http://localhost:3000/api/messages', formData);
      console.log(respnose);
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setFormStatus(null), 3000);
    } else {
      setFormStatus("error");
      setTimeout(() => setFormStatus(null), 2000);
    }
  };

  const currentProject = PROJECTS.find(p => p.id === activeProject);

  return (
    <div style={{ background: '#080808', color: '#c8c8c8', minHeight: '100vh', fontFamily: "'Syne', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=Fira+Code:wght@300;400;500&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { background: #080808; }
        .fc { font-family: 'Fira Code', monospace; }

        .dot-grid {
          background-image: radial-gradient(rgba(245,158,11,0.03) 1px, transparent 1px);
          background-size: 32px 32px;
        }

        .amber { color: #f59e0b; }
        .white { color: #f0f0f0; }
        .muted { color: #666; }

        .card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 24px;
          transition: all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1);
        }
        .card:hover {
          border-color: rgba(245,158,11,0.25);
          transform: translateY(-4px);
        }

        .tab-btn { 
          background: transparent;
          border: none;
          cursor: pointer;
          font-family: 'Fira Code', monospace;
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          padding: 8px 18px;
          border-radius: 10px;
          transition: all 0.2s ease;
          color: #555;
        }
        .tab-btn:hover { color: #f0f0f0; }
        .tab-btn.active { background: #f59e0b; color: #000; font-weight: 600; }

        .project-btn {
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.06);
          padding: 12px 20px;
          border-radius: 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
        }
        .project-btn.active {
          border-color: #f59e0b;
          background: rgba(245,158,11,0.08);
        }
        .project-btn:hover {
          border-color: rgba(245,158,11,0.4);
          transform: translateX(4px);
        }

        .pulse { 
          animation: pulse 2.5s ease-in-out infinite;
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }

        .glow {
          box-shadow: 0 0 20px rgba(245,158,11,0.1);
        }

        .nav-link {
          color: #555;
          text-decoration: none;
          font-family: 'Fira Code', monospace;
          font-size: 11px;
          letter-spacing: 0.1em;
          transition: all 0.2s;
          position: relative;
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
        .nav-link:hover { color: #f59e0b; }
        .nav-link:hover::after { width: 100%; }

        .btn-primary {
          background: #f59e0b;
          color: #000;
          border: none;
          padding: 14px 32px;
          border-radius: 50px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }
        .btn-primary:hover { background: #fbbf24; transform: scale(1.02); box-shadow: 0 4px 12px rgba(245,158,11,0.3); }

        .btn-ghost {
          background: transparent;
          color: #888;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 14px 32px;
          border-radius: 50px;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 13px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }
        .btn-ghost:hover { border-color: rgba(245,158,11,0.5); color: #f59e0b; }

        input, textarea {
          width: 100%;
          background: rgba(255,255,255,0.03);
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 12px;
          padding: 12px 16px;
          color: #f0f0f0;
          font-family: 'Syne', sans-serif;
          font-size: 14px;
          outline: none;
          transition: all 0.2s;
          display: block;
        }
        input:focus, textarea:focus { border-color: #f59e0b; box-shadow: 0 0 0 2px rgba(245,158,11,0.1); }
        input::placeholder, textarea::placeholder { color: #444; }

        .submit-btn {
          width: 100%;
          background: #f0f0f0;
          color: #000;
          border: none;
          padding: 14px;
          border-radius: 12px;
          font-family: 'Syne', sans-serif;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s;
        }
        .submit-btn:hover { background: #f59e0b; transform: translateY(-1px); }

        .typewriter {
          overflow: hidden;
          border-right: 2px solid #f59e0b;
          white-space: nowrap;
          animation: typing 3.5s steps(40, end);
        }
        @keyframes typing {
          from { width: 0; }
          to { width: 100%; }
        }

        @media (max-width: 768px) {
          .hero-title { font-size: 48px !important; }
          .hide-mobile { display: none !important; }
          .grid-2 { grid-template-columns: 1fr !important; }
          .grid-3 { grid-template-columns: 1fr !important; }
          .expertise-grid { grid-template-columns: 1fr !important; }
          .card { padding: 20px !important; }
        }
      `}</style>

      {/* Dot grid background */}
      <div className="dot-grid" style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none' }} />

      {/* NAV */}
      <nav style={{
        position: 'fixed', top: 0, width: '100%', zIndex: 50,
        background: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'blur(0px)',
        borderBottom: scrolled ? '1px solid rgba(245,158,11,0.1)' : '1px solid transparent',
        padding: scrolled ? '16px 0' : '28px 0',
        transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)'
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 7, height: 7, background: '#f59e0b', borderRadius: '50%' }} className="pulse" />
            <span style={{ fontWeight: 800, fontSize: 18, letterSpacing: '-0.04em', color: '#f0f0f0' }}>
              CHAMU<span style={{ color: '#f59e0b' }}>.</span>BUILDS
            </span>
          </div>
          <div className="hide-mobile" style={{ display: 'flex', gap: 36 }}>
            <a href="#expertise" className="nav-link">/expertise</a>
            <a href="#work" className="nav-link">/work</a>
            <a href="#building" className="nav-link">/now</a>
            <a href="#contact" className="nav-link">/ping</a>
          </div>
          <a href="#contact" className="btn-primary" style={{ padding: '9px 22px', fontSize: 12 }}>
            hire me
          </a>
        </div>
      </nav>

      <main style={{ position: 'relative', zIndex: 10, maxWidth: 1100, margin: '0 auto', padding: '0 32px' }}>

        {/* ── HERO ── Enhanced with typing effect */}
        <section style={{ paddingTop: 180, paddingBottom: 140 }}>
          <div style={{ marginBottom: 28 }}>
            <span className="fc" style={{
              fontSize: 11, letterSpacing: '0.2em', color: '#f59e0b',
              background: 'rgba(245,158,11,0.08)',
              border: '1px solid rgba(245,158,11,0.2)',
              padding: '6px 14px', borderRadius: 50, textTransform: 'uppercase'
            }}>
              Final Year SWE · Birmingham City University · 2026
            </span>
          </div>

          <h1 className="hero-title" style={{
            fontSize: 88, fontWeight: 800, lineHeight: 0.92,
            letterSpacing: '-0.04em', color: '#f0f0f0',
            marginBottom: 32, maxWidth: 820
          }}>
            I build the tools<br />
            I <span style={{ color: '#f59e0b', fontStyle: 'italic', borderBottom: '2px solid #f59e0b' }}>wished</span> I had.
          </h1>

          <p style={{ fontSize: 20, color: '#666', maxWidth: 520, lineHeight: 1.6, marginBottom: 48 }}>
            Full-stack engineer. Java specialist. Cloud-native thinker.
            Based in Colombo 🇱🇰 — building from first principles.
          </p>

          <div style={{ display: 'flex', gap: 14, flexWrap: 'wrap', marginBottom: 64 }}>
            <a href="#work" className="btn-primary">see my work →</a>
            <a href="#contact" className="btn-ghost">/ping me</a>
            <a href="#" className="btn-ghost" style={{ borderColor: '#f59e0b20' }}>📄 resume.pdf</a>
          </div>

          {/* GitHub stats bar — real credibility */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 24,
            padding: '20px 24px',
            background: 'rgba(255,255,255,0.02)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: 20,
            marginBottom: 24
          }}>
            {Object.entries(GITHUB_STATS).map(([key, val]) => (
              <div key={key} style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
                <span className="fc" style={{ fontSize: 10, color: '#555', textTransform: 'uppercase' }}>{key}:</span>
                <span style={{ fontSize: 18, fontWeight: 700, color: '#f0f0f0' }}>
                  {typeof val === 'number' ? val.toLocaleString() : (Array.isArray(val) ? val.join(' | ') : val)}
                </span>
              </div>
            ))}
          </div>

          {/* Identity tags */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {[
              '⚙ Robotics — All Island Competition',
              '✦ AZ-900 Certified',
              '◈ MERN · Java · Android',
              '◉ Open for Internships 2026'
            ].map(tag => (
              <span key={tag} className="fc" style={{
                fontSize: 11, color: '#555',
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                padding: '7px 14px', borderRadius: 50
              }}>{tag}</span>
            ))}
          </div>
        </section>

        {/* ── EXPERTISE ── Enhanced with descriptions */}
        <section id="expertise" style={{ paddingBottom: 140 }}>
          <div style={{ marginBottom: 48 }}>
            <span className="fc amber" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>/expertise</span>
            <h2 style={{ fontSize: 40, fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.03em', marginTop: 10 }}>
              What I master.
            </h2>
            <p className="fc" style={{ fontSize: 12, color: '#444', marginTop: 8 }}>declared expertise, proven by shipped systems</p>
          </div>

          <div className="expertise-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 20
          }}>
            {EXPERTISE.map((item) => (
              <div key={item.domain} className="card" style={{ padding: '32px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                  <span style={{ fontSize: 28, color: '#f59e0b' }}>{item.icon}</span>
                  <span className="fc" style={{
                    fontSize: 9, color: '#f59e0b',
                    background: 'rgba(245,158,11,0.1)',
                    padding: '4px 10px', borderRadius: 20
                  }}>proof → {item.proof}</span>
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, color: '#f0f0f0', marginBottom: 8, letterSpacing: '-0.02em' }}>
                  {item.domain}
                </h3>
                <p className="fc" style={{ fontSize: 11, color: '#555', marginBottom: 12 }}>{item.stack}</p>
                <p style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── WORK ── Enhanced with project selector */}
        <section id="work" style={{ paddingBottom: 140 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 48, flexWrap: 'wrap', gap: 20 }}>
            <div>
              <span className="fc amber" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>/work</span>
              <h2 style={{ fontSize: 40, fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.03em', marginTop: 10 }}>
                Production systems.
              </h2>
              <p className="fc" style={{ fontSize: 11, color: '#444', marginTop: 6 }}>each one is proof of the expertise above</p>
            </div>
            <div style={{
              display: 'flex', background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,255,255,0.07)',
              borderRadius: 14, padding: 4, gap: 2
            }}>
              {['architecture', 'metrics', 'stack'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-btn ${activeTab === tab ? 'active' : ''}`}
                >
                  /{tab}
                </button>
              ))}
            </div>
          </div>

          {/* Project selector sidebar + detail view */}
          <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24 }}>
            {/* Project selector */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {PROJECTS.map((p) => (
                <div
                  key={p.id}
                  onClick={() => setActiveProject(p.id)}
                  className={`project-btn ${activeProject === p.id ? 'active' : ''}`}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                    <span style={{ fontWeight: 700, color: activeProject === p.id ? '#f59e0b' : '#f0f0f0' }}>
                      {p.title}
                    </span>
                    <span className="fc" style={{ fontSize: 8, color: '#444' }}>{p.status}</span>
                  </div>
                  <p style={{ fontSize: 11, color: '#555' }}>{p.tagline}</p>
                </div>
              ))}
            </div>

            {/* Detail view */}
            {currentProject && (
              <div className="card" style={{ padding: '36px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 12 }}>
                  <div>
                    <span className="fc" style={{ fontSize: 10, color: '#f59e0b', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                      {currentProject.category}
                    </span>
                    <h3 style={{ fontSize: 28, fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.03em', marginTop: 6 }}>
                      {currentProject.title}
                    </h3>
                    <p style={{ fontSize: 14, color: '#f59e0b', fontStyle: 'italic', marginTop: 4 }}>{currentProject.tagline}</p>
                  </div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <a href={currentProject.github} className="fc" style={{ fontSize: 11, color: '#555', textDecoration: 'none', padding: '6px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                      github →
                    </a>
                    <a href={currentProject.live} className="fc" style={{ fontSize: 11, color: '#555', textDecoration: 'none', padding: '6px 12px', background: 'rgba(255,255,255,0.03)', borderRadius: 8 }}>
                      live →
                    </a>
                  </div>
                </div>

                <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6, marginBottom: 24 }}>{currentProject.one_line}</p>

                {activeTab === 'architecture' && (
                  <div>
                    <p className="fc" style={{ fontSize: 10, color: '#f59e0b', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 16 }}>
                      system architecture
                    </p>
                    <p style={{
                      fontSize: 15, color: '#c8c8c8', fontStyle: 'italic',
                      lineHeight: 1.7, borderLeft: '2px solid #f59e0b',
                      paddingLeft: 20
                    }}>
                      "{currentProject.architecture}"
                    </p>
                  </div>
                )}

                {activeTab === 'metrics' && (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24 }}>
                    {Object.entries(currentProject.metrics).map(([k, v]) => (
                      <div key={k}>
                        <p className="fc" style={{ fontSize: 9, color: '#555', textTransform: 'uppercase', letterSpacing: '0.15em', marginBottom: 8 }}>{k}</p>
                        <p style={{ fontSize: 20, fontWeight: 700, color: '#f0f0f0', letterSpacing: '-0.02em' }}>{v}</p>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'stack' && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                    {currentProject.tech.map(t => (
                      <span key={t} className="fc" style={{
                        fontSize: 12, color: '#888',
                        background: 'rgba(255,255,255,0.04)',
                        border: '1px solid rgba(255,255,255,0.08)',
                        padding: '8px 16px', borderRadius: 10
                      }}>{t}</span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ marginTop: 56, display: 'flex', justifyContent: 'center' }}>
            <a href="/projects" className="btn-ghost" style={{ 
              display: 'inline-flex', alignItems: 'center', gap: 10, 
              padding: '14px 32px', fontSize: 13, 
              border: '1px solid rgba(245,158,11,0.2)',
              textDecoration: 'none'
            }}>
              view all projects <span style={{ color: '#f59e0b', fontSize: 16 }}>→</span>
            </a>
          </div>
        </section>

        {/* ── CURRENTLY BUILDING ── Enhanced with better visuals */}
        <section id="building" style={{ paddingBottom: 140 }}>
          <span className="fc amber" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>/now</span>
          <h2 style={{ fontSize: 40, fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.03em', marginTop: 10, marginBottom: 48 }}>
            Currently building <span style={{ color: '#f59e0b' }}>CodePrep</span>.
          </h2>

          <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            {/* Phase tracker - enhanced */}
            <div className="card" style={{ padding: '36px' }}>
              <p className="fc" style={{ fontSize: 10, color: '#555', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 28 }}>
                module roadmap
              </p>
              <div style={{ position: 'relative' }}>
                {PHASES.map((phase, i) => (
                  <div key={phase.name} style={{ display: 'flex', gap: 16, marginBottom: 28, position: 'relative' }}>
                    {i < PHASES.length - 1 && (
                      <div style={{
                        position: 'absolute', left: 9, top: 22, bottom: -20,
                        width: 1.5,
                        background: phase.done ? 'rgba(245,158,11,0.4)' : 'rgba(255,255,255,0.05)'
                      }} />
                    )}
                    <div style={{
                      width: 20, height: 20, borderRadius: '50%', flexShrink: 0, marginTop: 2,
                      background: phase.done ? '#f59e0b' : phase.active ? 'transparent' : 'rgba(255,255,255,0.06)',
                      border: phase.active ? '2px solid #f59e0b' : phase.done ? 'none' : '1px solid rgba(255,255,255,0.1)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>
                      {phase.active && <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} className="pulse" />}
                      {phase.done && <span style={{ fontSize: 10, color: '#000' }}>✓</span>}
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                        <span style={{ fontSize: 16 }}>{phase.icon}</span>
                        <p style={{
                          fontSize: 14, fontWeight: 600,
                          color: phase.done ? '#f0f0f0' : phase.active ? '#f59e0b' : '#444'
                        }}>{phase.name}</p>
                      </div>
                      <p style={{ fontSize: 12, color: '#555', lineHeight: 1.5 }}>{phase.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 20 }}>
                <div style={{ height: 4, background: 'rgba(255,255,255,0.06)', borderRadius: 10, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: '65%', background: '#f59e0b', borderRadius: 10 }} />
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 10 }}>
                  <span className="fc" style={{ fontSize: 10, color: '#444' }}>Phase 3 of 4</span>
                  <span className="fc" style={{ fontSize: 10, color: '#f59e0b' }}>65% complete</span>
                </div>
              </div>
            </div>

            {/* Terminal - enhanced with cursor animation */}
            <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
              <div style={{
                background: 'rgba(255,255,255,0.03)',
                padding: '14px 20px',
                borderBottom: '1px solid rgba(255,255,255,0.05)',
                display: 'flex', alignItems: 'center', gap: 8
              }}>
                {['#ef4444','#f59e0b','#22c55e'].map(c => (
                  <span key={c} style={{ width: 10, height: 10, borderRadius: '50%', background: c, opacity: 0.6 }} />
                ))}
                <span className="fc" style={{ fontSize: 10, color: '#444', marginLeft: 8 }}>codeprep — zsh</span>
              </div>
              <div style={{ padding: '28px', fontFamily: 'Fira Code, monospace' }}>
                <div style={{ marginBottom: 24 }}>
                  <p style={{ fontSize: 11, color: '#444', marginBottom: 12 }}>$ git log --oneline -4</p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    {[
                      ['a3f91bc', '✨', 'feat: industry-bound task system scaffolded'],
                      ['7d2e04a', '⚙️', 'feat: onecompiler api integration — live exec'],
                      ['3b81cc2', '🐛', 'fix: 500 on /execute — endpoint url corrected'],
                      ['9a14d71', '🔨', 'refactor: module phase gating logic'],
                    ].map(([hash, emoji, msg]) => (
                      <div key={hash} style={{ display: 'flex', gap: 10, alignItems: 'center', fontSize: 11 }}>
                        <span style={{ color: '#f59e0b', flexShrink: 0 }}>{hash}</span>
                        <span style={{ fontSize: 12 }}>{emoji}</span>
                        <span style={{ color: '#666' }}>{msg}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: 20 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                    <span style={{ fontSize: 11, color: '#444' }}>$</span>
                    <span style={{ fontSize: 11, color: '#f0f0f0' }}>npm run dev</span>
                  </div>
                  <p style={{ fontSize: 11, color: '#22c55e', marginBottom: 16 }}>
                    ▶ ready on localhost:3000
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8, justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <span style={{ width: 6, height: 6, background: '#f59e0b', borderRadius: '50%' }} className="pulse" />
                      <span style={{ fontSize: 10, color: '#555' }}>last commit: 3 hours ago</span>
                    </div>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <span style={{ fontSize: 10, color: '#444' }}>chamu@codeprep</span>
                      <span style={{ fontSize: 10, color: '#f59e0b', opacity: cursorVisible ? 1 : 0 }}>█</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── CONTACT ── Enhanced */}
        <section id="contact" style={{ paddingBottom: 80 }}>
          <div className="card" style={{
            padding: '64px',
            background: 'linear-gradient(135deg, rgba(245,158,11,0.04) 0%, rgba(255,255,255,0.01) 100%)',
            borderRadius: 32
          }}>
            <div className="grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 64, alignItems: 'start' }}>
              <div>
                <span className="fc amber" style={{ fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>/contact</span>
                <h2 style={{ fontSize: 44, fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.04em', lineHeight: 1.1, marginTop: 12, marginBottom: 20 }}>
                  Let's build<br />something real.
                </h2>
                <p style={{ fontSize: 15, color: '#555', lineHeight: 1.7, marginBottom: 40, maxWidth: 340 }}>
                  Open for Software Engineering internships, freelance work, or just a solid engineering conversation.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  {[
                    ['◈', 'github.com/chamuditha', 'https://github.com/chamuditha-t'],
                    ['◉', 'linkedin.com/in/chamuditha', 'www.linkedin.com/in/chamuditha-theekshana-b138993a6'],
                    ['◫', 'Colombo, Sri Lanka 🇱🇰', null],
                  ].map(([icon, text, link]) => (
                    link ? (
                      <a key={text} href={link} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', gap: 12, textDecoration: 'none' }}>
                        <span style={{ color: '#f59e0b', fontSize: 14 }}>{icon}</span>
                        <span className="fc" style={{ fontSize: 12, color: '#555', transition: 'color 0.2s' }}>{text}</span>
                      </a>
                    ) : (
                      <div key={text} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ color: '#f59e0b', fontSize: 14 }}>{icon}</span>
                        <span className="fc" style={{ fontSize: 12, color: '#555' }}>{text}</span>
                      </div>
                    )
                  ))}
                </div>
              </div>
              <div>
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                  <input
                    type="text" placeholder="name"
                    value={formData.name}
                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                  <input
                    type="email" placeholder="email"
                    value={formData.email}
                    onChange={e => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                  <textarea
                    rows={4} placeholder="what are you building?"
                    value={formData.message}
                    onChange={e => setFormData({ ...formData, message: e.target.value })}
                    style={{ resize: 'none' }}
                    required
                  />
                  <button type="submit" className="submit-btn">send message →</button>
                  {formStatus === 'success' && (
                    <p className="fc" style={{ fontSize: 12, color: '#22c55e', textAlign: 'center' }}>✓ sent! I'll reply within 48h.</p>
                  )}
                  {formStatus === 'error' && (
                    <p className="fc" style={{ fontSize: 12, color: '#ef4444', textAlign: 'center' }}>✗ all fields required.</p>
                  )}
                </form>
              </div>
            </div>
          </div>
        </section>

        <footer style={{ borderTop: '1px solid rgba(255,255,255,0.04)', padding: '40px 0', textAlign: 'center' }}>
          <p className="fc" style={{ fontSize: 10, color: '#2a2a2a', letterSpacing: '0.4em', textTransform: 'uppercase' }}>
            © 2026 CHAMU.BUILDS · EXPERTISE FIRST · SYSTEMS THAT SCALE
          </p>
        </footer>

      </main>
    </div>
  );
}