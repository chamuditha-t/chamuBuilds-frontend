import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProjects } from '../services/api';

export default function Projects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getProjects().then(data => {
      setProjects(data);
      setLoading(false);
    }).catch(err => {
      console.error(err);
      setLoading(false);
    });
  }, []);

  return (
    <div style={{ background: '#080808', color: '#c8c8c8', minHeight: '100vh', fontFamily: "'Syne', sans-serif" }}>
      <style>{`
        body { background: #080808; margin: 0; padding: 0; }
        .fc { font-family: 'Fira Code', monospace; }
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
        .btn-ghost {
          background: transparent;
          color: #888;
          border: 1px solid rgba(255,255,255,0.1);
          padding: 10px 24px;
          border-radius: 50px;
          font-family: 'Syne', sans-serif;
          font-weight: 600;
          font-size: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }
        .btn-ghost:hover { border-color: rgba(245,158,11,0.5); color: #f59e0b; }
      `}</style>
      
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '120px 32px 60px' }}>
        <Link to="/" className="fc" style={{ color: '#555', textDecoration: 'none', fontSize: 12, marginBottom: 40, display: 'inline-block' }}>
          ← back to home
        </Link>
        
        <div style={{ marginBottom: 64 }}>
          <h1 style={{ fontSize: 48, fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.04em', marginBottom: 12 }}>
            All Projects
          </h1>
          <p className="fc" style={{ fontSize: 13, color: '#555' }}>
            Systems I've built, deployed, and scaled.
          </p>
        </div>

        {loading ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
            <span style={{ width: 12, height: 12, background: '#f59e0b', borderRadius: '50%', animation: 'pulse 1.5s infinite' }} />
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 24 }}>
            {projects.map((p) => (
              <div key={p._id} className="card" style={{ padding: '32px', display: 'flex', flexDirection: 'column' }}>
                <span className="fc" style={{ fontSize: 10, color: '#f59e0b', letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 12 }}>
                  {p.category}
                </span>
                <h3 style={{ fontSize: 24, fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.03em', marginBottom: 6 }}>
                  {p.title}
                </h3>
                <p style={{ fontSize: 13, color: '#f59e0b', fontStyle: 'italic', marginBottom: 16 }}>
                  {p.tagline}
                </p>
                <p style={{ fontSize: 14, color: '#888', lineHeight: 1.6, marginBottom: 24, flexGrow: 1 }}>
                  {p.one_line}
                </p>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginBottom: 28 }}>
                  {(p.tech || []).map(t => (
                    <span key={t} className="fc" style={{
                      fontSize: 10, color: '#666',
                      background: 'rgba(255,255,255,0.03)',
                      border: '1px solid rgba(255,255,255,0.06)',
                      padding: '4px 10px', borderRadius: 6
                    }}>{t}</span>
                  ))}
                </div>

                <div style={{ marginTop: 'auto' }}>
                  <Link to={`/projects/${p._id}`} className="btn-ghost" style={{ width: '100%', textAlign: 'center' }}>
                    View Deep Dive →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
