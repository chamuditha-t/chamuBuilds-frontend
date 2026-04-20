import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { addProject, saveResume } from '../services/api';

const readFileAsDataURL = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export default function Admin() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    tagline: '',
    one_line: '',
    category: '',
    status: '',
    introduction: '',
    problem: '',
    why_i_built_it: '',
    focus_area: '',
    github: '',
    live: '',
    tech: '', 
    challenges: '', 
    metricsKeys: '', 
    metricsValues: '' 
  });
  const [screenshotFiles, setScreenshotFiles] = useState([]);
  const [resumeFile, setResumeFile] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleResumeSubmit = async (e) => {
    e.preventDefault();
    if (!resumeFile) return;
    
    setLoading(true);
    try {
      const base64Resume = await readFileAsDataURL(resumeFile);
      await saveResume(base64Resume);
      alert('Resume Updated Successfully!');
      setResumeFile(null);
      document.getElementById('resumeInput').value = '';
    } catch (err) {
      console.error(err);
      alert('Failed to update resume');
    } finally {
      setLoading(false);
    }
  };

  const handleProjectSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const techArray = formData.tech.split(',').map(t => t.trim()).filter(Boolean);
    const challengesArray = formData.challenges.split('\n').map(c => c.trim()).filter(Boolean);
    
    // Read files
    const screenshotsArray = await Promise.all(
      Array.from(screenshotFiles).map(f => readFileAsDataURL(f))
    );
    
    const keys = formData.metricsKeys.split(',').map(k => k.trim());
    const values = formData.metricsValues.split(',').map(v => v.trim());
    const metricsObj = {};
    keys.forEach((key, idx) => {
      if (key) metricsObj[key] = values[idx] || '';
    });

    const newProject = {
      title: formData.title,
      tagline: formData.tagline,
      one_line: formData.one_line,
      introduction: formData.introduction,
      why_i_built_it: formData.why_i_built_it,
      problem: formData.problem,
      focus_area: formData.focus_area,
      challenges: challengesArray,
      tech: techArray,
      metrics: metricsObj,
      category: formData.category,
      status: formData.status,
      github: formData.github,
      live: formData.live,
      screenshots: screenshotsArray
    };

    try {
      await addProject(newProject);
      setSuccess(true);
      setTimeout(() => {
        navigate('/projects');
      }, 1500);
    } catch (err) {
      console.error(err);
      alert('Failed to add project');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(255,255,255,0.1)',
    borderRadius: '12px',
    padding: '16px',
    color: '#f0f0f0',
    fontFamily: "'Syne', sans-serif",
    fontSize: '14px',
    marginBottom: '20px',
    boxSizing: 'border-box',
    outline: 'none',
    transition: 'all 0.3s ease'
  };

  const labelStyle = {
    display: 'block',
    fontFamily: "'Fira Code', monospace",
    fontSize: '12px',
    color: '#f59e0b',
    marginBottom: '8px',
    textTransform: 'uppercase',
    letterSpacing: '0.05em'
  };

  return (
    <div style={{ background: '#080808', color: '#c8c8c8', minHeight: '100vh', fontFamily: "'Syne', sans-serif", paddingBottom: '100px' }}>
      <style>{`
        body { background: #080808; margin: 0; padding: 0; }
        .fc { font-family: 'Fira Code', monospace; }
        input:focus, textarea:focus {
          border-color: rgba(245,158,11,0.5) !important;
          background: rgba(245,158,11,0.02) !important;
        }
        .submit-btn {
          background: #f59e0b;
          color: #000;
          border: none;
          padding: 16px 32px;
          border-radius: 50px;
          font-weight: 700;
          font-size: 14px;
          cursor: pointer;
          transition: all 0.2s ease;
          width: 100%;
          font-family: "'Syne', sans-serif";
        }
        .submit-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 25px rgba(245,158,11,0.3);
        }
        .submit-btn:disabled {
          background: #555;
          cursor: not-allowed;
          box-shadow: none;
          transform: none;
        }
      `}</style>
      
      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 32px 0' }}>
        <Link to="/" className="fc" style={{ color: '#555', textDecoration: 'none', fontSize: 12, marginBottom: 40, display: 'inline-block' }}>
          ← back to home
        </Link>
        <h1 style={{ fontSize: 48, fontWeight: 800, color: '#f0f0f0', letterSpacing: '-0.04em', marginBottom: 12 }}>
          Admin Dashboard
        </h1>
        <p className="fc" style={{ fontSize: 13, color: '#555', marginBottom: 60 }}>
          /add_new_project
        </p>

        {success ? (
          <div style={{ padding: '40px', background: 'rgba(245,158,11,0.1)', border: '1px solid rgba(245,158,11,0.3)', borderRadius: '20px', textAlign: 'center' }}>
            <h2 style={{ color: '#f59e0b', marginBottom: '10px' }}>Project Added Successfully!</h2>
            <p style={{ color: '#aaa' }}>Redirecting to projects...</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
            <form onSubmit={handleResumeSubmit} style={{ padding: '30px', background: 'rgba(245,158,11,0.05)', border: '1px solid rgba(245,158,11,0.2)', borderRadius: '16px' }}>
              <h3 className="fc" style={{ color: '#f59e0b', fontSize: '14px', marginBottom: '16px' }}>/update_global_resume</h3>
              <div>
                <label style={labelStyle}>Upload New Resume (PDF)</label>
                <input 
                  id="resumeInput"
                  type="file" accept="application/pdf" style={inputStyle} 
                  onChange={(e) => setResumeFile(e.target.files[0])} 
                />
              </div>
              <button type="submit" className="submit-btn" disabled={loading || !resumeFile} style={{ width: 'auto', padding: '12px 24px' }}>
                {loading ? 'Uploading...' : 'Update Resume'}
              </button>
            </form>

            <form onSubmit={handleProjectSubmit} style={{ padding: '30px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px' }}>
              <h3 className="fc" style={{ color: '#f0f0f0', fontSize: '24px', fontWeight: 800, marginBottom: '24px', letterSpacing: '-0.02em' }}>Add New Project</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Project Title</label>
                <input style={inputStyle} required name="title" value={formData.title} onChange={handleChange} placeholder="e.g. CodePrep" />
              </div>
              <div>
                <label style={labelStyle}>Category</label>
                <input style={inputStyle} required name="category" value={formData.category} onChange={handleChange} placeholder="e.g. EdTech · DevTools" />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Tagline</label>
              <input style={inputStyle} required name="tagline" value={formData.tagline} onChange={handleChange} placeholder="e.g. Interview Engineering Platform" />
            </div>

            <div>
              <label style={labelStyle}>One-line Summary</label>
              <input style={inputStyle} required name="one_line" value={formData.one_line} onChange={handleChange} placeholder="Brief summary for the card" />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>Focus Area</label>
                <input style={inputStyle} name="focus_area" value={formData.focus_area} onChange={handleChange} placeholder="e.g. Full-stack System Architecture" />
              </div>
              <div>
                <label style={labelStyle}>Status</label>
                <input style={inputStyle} name="status" value={formData.status} onChange={handleChange} placeholder="e.g. In Development" />
              </div>
            </div>

            <div>
              <label style={labelStyle}>Introduction</label>
              <textarea style={{...inputStyle, minHeight: '120px'}} required name="introduction" value={formData.introduction} onChange={handleChange} placeholder="Detailed overview of the project..." />
            </div>

            <div>
              <label style={labelStyle}>The Problem</label>
              <textarea style={{...inputStyle, minHeight: '100px'}} name="problem" value={formData.problem} onChange={handleChange} placeholder="What problem does it solve?" />
            </div>

            <div>
              <label style={labelStyle}>Why I Built It</label>
              <textarea style={{...inputStyle, minHeight: '100px'}} required name="why_i_built_it" value={formData.why_i_built_it} onChange={handleChange} placeholder="Personal motivation..." />
            </div>

            <div style={{ padding: '30px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', marginBottom: '20px' }}>
              <h3 className="fc" style={{ color: '#f59e0b', fontSize: '14px', marginBottom: '20px' }}>/technicals</h3>
              
              <label style={labelStyle}>Tech Stack (Comma Separated)</label>
              <input style={inputStyle} name="tech" value={formData.tech} onChange={handleChange} placeholder="React, Node.js, Express" />
              
              <label style={labelStyle}>Challenges (One per line)</label>
              <textarea style={{...inputStyle, minHeight: '120px'}} name="challenges" value={formData.challenges} onChange={handleChange} placeholder="Integrating third party APIs&#10;Handling concurrent users..." />

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label style={labelStyle}>Metrics Keys (Comma Sep)</label>
                  <input style={inputStyle} name="metricsKeys" value={formData.metricsKeys} onChange={handleChange} placeholder="phase, runtime, focus" />
                </div>
                <div>
                  <label style={labelStyle}>Metrics Values (Comma Sep)</label>
                  <input style={inputStyle} name="metricsValues" value={formData.metricsValues} onChange={handleChange} placeholder="Phase 3, Live execution, Engineers" />
                </div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>GitHub Repo URL</label>
                <input style={inputStyle} name="github" value={formData.github} onChange={handleChange} placeholder="https://github.com/..." />
              </div>
              <div>
                <label style={labelStyle}>Live Demo URL</label>
                <input style={inputStyle} name="live" value={formData.live} onChange={handleChange} placeholder="https://..." />
              </div>
            </div>

            <div style={{ padding: '30px', background: 'rgba(255,255,255,0.01)', border: '1px solid rgba(255,255,255,0.05)', borderRadius: '16px', marginBottom: '20px' }}>
              <h3 className="fc" style={{ color: '#f59e0b', fontSize: '14px', marginBottom: '20px' }}>/project_screenshots</h3>
              
              <div style={{ marginBottom: '20px' }}>
                <label style={labelStyle}>Screenshots (from PC)</label>
                <input 
                  type="file" multiple accept="image/*" style={inputStyle} 
                  onChange={(e) => setScreenshotFiles(e.target.files)} 
                />
              </div>
            </div>

            <button type="submit" className="submit-btn" disabled={loading}>
              {loading ? 'Publishing Matrix...' : 'Publish Project'}
            </button>
          </form>
          </div>
        )}
      </div>
    </div>
  );
}
