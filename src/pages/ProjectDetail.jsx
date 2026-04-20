import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjectById } from "../services/api";

export default function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
    getProjectById(id)
      .then((data) => {
        setProject(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Project not found.");
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div
        style={{
          background: "#080808",
          color: "#c8c8c8",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <span
          style={{
            width: 16,
            height: 16,
            background: "#f59e0b",
            borderRadius: "50%",
            animation: "pulse 1.5s infinite",
          }}
        />
      </div>
    );
  }

  if (error || !project) {
    return (
      <div
        style={{
          background: "#080808",
          color: "#c8c8c8",
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <h1
          style={{
            fontSize: 32,
            fontWeight: 800,
            color: "#f0f0f0",
            marginBottom: 20,
          }}
        >
          Project Not Found
        </h1>
        <Link
          to="/projects"
          style={{
            color: "#f59e0b",
            textDecoration: "none",
            fontFamily: "'Fira Code', monospace",
          }}
        >
          ← Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#080808",
        color: "#c8c8c8",
        minHeight: "100vh",
        fontFamily: "'Syne', sans-serif",
      }}
    >
      <style>{`
        body { background: #080808; margin: 0; padding: 0; }
        .fc { font-family: 'Fira Code', monospace; }
        .card {
          background: rgba(255,255,255,0.02);
          border: 1px solid rgba(255,255,255,0.06);
          border-radius: 24px;
        }
      `}</style>

      {/* Detail Header */}
      <div style={{ maxWidth: 900, margin: "0 auto", padding: "60px 32px 0" }}>
        <Link
          to="/projects"
          className="fc"
          style={{
            color: "#555",
            textDecoration: "none",
            fontSize: 12,
            marginBottom: 40,
            display: "inline-block",
          }}
        >
          ← back to projects
        </Link>
      </div>

      <header
        style={{
          borderBottom: "1px solid rgba(255,255,255,0.05)",
          paddingBottom: 60,
          marginBottom: 60,
        }}
      >
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px" }}>
          <span
            className="fc"
            style={{
              fontSize: 11,
              color: "#f59e0b",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              marginBottom: 16,
              display: "block",
            }}
          >
            {project.category}
          </span>
          <h1
            style={{
              fontSize: 64,
              fontWeight: 800,
              color: "#f0f0f0",
              letterSpacing: "-0.04em",
              lineHeight: 1.1,
              marginBottom: 16,
            }}
          >
            {project.title}
          </h1>
          <p
            style={{
              fontSize: 20,
              color: "#888",
              fontStyle: "italic",
              marginBottom: 40,
              borderLeft: "3px solid #f59e0b",
              paddingLeft: 20,
            }}
          >
            {project.tagline}
          </p>

          <div style={{ display: "flex", gap: 14 }}>
            <a
              href={project.live}
              target="_blank"
              rel="noreferrer"
              style={{
                background: "#f59e0b",
                color: "#000",
                textDecoration: "none",
                padding: "12px 28px",
                borderRadius: 50,
                fontWeight: 700,
                fontSize: 13,
                transition: "all 0.2s",
              }}
            >
              View Live Demo
            </a>
            <a
              href={project.github}
              target="_blank"
              rel="noreferrer"
              style={{
                background: "transparent",
                color: "#888",
                border: "1px solid rgba(255,255,255,0.1)",
                textDecoration: "none",
                padding: "12px 28px",
                borderRadius: 50,
                fontWeight: 600,
                fontSize: 13,
                transition: "all 0.2s",
              }}
            >
              GitHub Repo
            </a>
          </div>
        </div>
      </header>

      <main
        style={{ maxWidth: 900, margin: "0 auto", padding: "0 32px 120px" }}
      >
        {/* Intro & Motivation */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "1fr",
            gap: 48,
            marginBottom: 80,
          }}
        >
          <div>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#f0f0f0",
                marginBottom: 20,
              }}
            >
              Overview
            </h2>
            <p style={{ fontSize: 16, color: "#aaa", lineHeight: 1.8 }}>
              {project.introduction}
            </p>
          </div>
          {project.problem && (
            <div>
              <h2
                style={{
                  fontSize: 28,
                  fontWeight: 800,
                  color: "#f0f0f0",
                  marginBottom: 20,
                }}
              >
                The Problem
              </h2>
              <p style={{ fontSize: 16, color: "#aaa", lineHeight: 1.8 }}>
                {project.problem}
              </p>
            </div>
          )}
          <div>
            <h2
              style={{
                fontSize: 28,
                fontWeight: 800,
                color: "#f0f0f0",
                marginBottom: 20,
              }}
            >
              Why I Built It
            </h2>
            <p style={{ fontSize: 16, color: "#aaa", lineHeight: 1.8 }}>
              {project.why_i_built_it}
            </p>
          </div>
        </section>

        {/* Focus & Challenges */}
        {project.focus_area && project.challenges && (
          <section
            className="card"
            style={{
              padding: 40,
              marginBottom: 80,
              borderLeft: "4px solid #f59e0b",
            }}
          >
            <h2
              className="fc"
              style={{
                fontSize: 14,
                color: "#f59e0b",
                textTransform: "uppercase",
                marginBottom: 32,
                letterSpacing: "0.1em",
              }}
            >
              /focus_&_challenges
            </h2>

            <div style={{ marginBottom: 40 }}>
              <p
                className="fc"
                style={{
                  fontSize: 10,
                  color: "#555",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Primary Focus Area
              </p>
              <p style={{ fontSize: 24, fontWeight: 700, color: "#f0f0f0" }}>
                {project.focus_area}
              </p>
            </div>

            <div>
              <p
                className="fc"
                style={{
                  fontSize: 10,
                  color: "#555",
                  textTransform: "uppercase",
                  marginBottom: 16,
                }}
              >
                Key Challenges Solved
              </p>
              <ul style={{ listStyleType: "none", padding: 0 }}>
                {project.challenges.map((c, i) => (
                  <li
                    key={i}
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: 12,
                      marginBottom: 12,
                    }}
                  >
                    <span
                      style={{ color: "#f59e0b", fontSize: 14, marginTop: 2 }}
                    >
                      ◈
                    </span>
                    <span
                      style={{ fontSize: 15, color: "#bbb", lineHeight: 1.6 }}
                    >
                      {c}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {/* Tech Specs */}
        <section className="card" style={{ padding: 40, marginBottom: 80 }}>
          <h2
            className="fc"
            style={{
              fontSize: 14,
              color: "#f59e0b",
              textTransform: "uppercase",
              marginBottom: 32,
              letterSpacing: "0.1em",
            }}
          >
            /tech_specifications
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 32,
              marginBottom: 40,
            }}
          >
            {Object.entries(project.metrics).map(([key, val]) => (
              <div key={key}>
                <p
                  className="fc"
                  style={{
                    fontSize: 10,
                    color: "#555",
                    textTransform: "uppercase",
                    marginBottom: 8,
                  }}
                >
                  {key}
                </p>
                <p style={{ fontSize: 24, fontWeight: 700, color: "#f0f0f0" }}>
                  {val}
                </p>
              </div>
            ))}
            <div>
              <p
                className="fc"
                style={{
                  fontSize: 10,
                  color: "#555",
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                Status
              </p>
              <p style={{ fontSize: 24, fontWeight: 700, color: "#f0f0f0" }}>
                {project.status}
              </p>
            </div>
          </div>

          <div>
            <p
              className="fc"
              style={{
                fontSize: 10,
                color: "#555",
                textTransform: "uppercase",
                marginBottom: 12,
              }}
            >
              Tech Stack
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  className="fc"
                  style={{
                    fontSize: 12,
                    color: "#888",
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.08)",
                    padding: "8px 16px",
                    borderRadius: 10,
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </section>

        {/* Screenshots */}
        {project.screenshots && project.screenshots.length > 0 && (
          <section>
            <h2
              style={{
                fontSize: 32,
                fontWeight: 800,
                color: "#f0f0f0",
                marginBottom: 40,
              }}
            >
              Screenshots
            </h2>
            <div style={{ display: "grid", gap: 32 }}>
              {project.screenshots.map((url, index) => (
                <div
                  key={index}
                  style={{
                    borderRadius: 16,
                    overflow: "hidden",
                    border: "1px solid rgba(255,255,255,0.05)",
                    boxShadow: "0 10px 40px rgba(0,0,0,0.5)",
                  }}
                >
                  <img
                    src={url}
                    alt={`Screenshot ${index + 1}`}
                    style={{ width: "100%", display: "block" }}
                  />
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
