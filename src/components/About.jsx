// src/components/About.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  GraduationCap,
  Coffee,
  Briefcase,
  Rocket,
  Download,
  Send,
  Code2,
  Database,
  Layout,
  Server,
  Sparkles,
} from 'lucide-react';
import api from '../api/axiosClient';

const FALLBACK_DATA = {
  profile: {
    summary:
      'I build reliable, scalable, and efficient web applications that solve real-world problems. Passionate about clean code, performance, and crafting exceptional user experiences from the server to the browser.',
    resume_url: '/Bijay_Kumar_Behera_FullStackDeveloper.pdf',
  },
  education: [
    {
      title: 'Master of Computer Applications (MCA)',
      year: '2022 - 2024',
      inst: 'Aryan Institute of Engineering and Technology, Bhubaneswar',
    },
    {
      title: 'B.Sc in Chemistry',
      year: '2019 - 2022',
      inst: 'Fakir Mohan University, Balasore',
    },
    {
      title: 'Higher Secondary (+2)',
      year: '2017 - 2019',
      inst: 'CHSE Odisha',
    },
    {
      title: 'Matriculation',
      year: '2017',
      inst: 'BSE Odisha',
    },
  ],
};

export default function About() {
  const [data, setData] = useState(FALLBACK_DATA);

  useEffect(() => {
    let active = true;
    api
      .get('/profile')
      .then((res) => {
        if (active && res.data?.status === 'success') {
          setData({
            profile: res.data.profile || FALLBACK_DATA.profile,
            education:
              Array.isArray(res.data.education) && res.data.education.length > 0
                ? res.data.education
                : FALLBACK_DATA.education,
          });
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/api\/?$/, '');
  const getFileUrl = (path) => {
    if (!path) return '/Bijay_Kumar_Behera_FullStackDeveloper.pdf';
    if (path.startsWith('http')) return path;
    if (!baseUrl) return `/${path.replace(/^\.?\//, '')}`;
    return `${baseUrl}/${path.replace(/^\.?\//, '')}`;
  };

  const rawResume = data.profile?.resume_url || data.profile?.resume;
  const resumeDownloadUrl = getFileUrl(rawResume);
  const summaryText = data.profile?.summary || FALLBACK_DATA.profile.summary;

  return (
    <section id="about" className="bk-section">
      <div className="bk-container">
        <div className="bk-sec-head">
          <span className="bk-pill-eyebrow">
            <Sparkles size={14} /> Get to know me
          </span>
          <h2 className="bk-title">
            Behind the <span className="bk-grad-text">Code.</span>
          </h2>
          <p className="bk-lead">
            Combining strong computer science fundamentals with practical full-stack execution.
          </p>
        </div>

        <div className="bk-about-grid">
          {/* Left Column */}
          <div className="bk-about-col">
            <motion.div
              className="bk-card bk-about-bio"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h3 className="bk-about-h3">Full Stack Engineer</h3>
              <p className="bk-about-p">{summaryText}</p>

              <div className="bk-about-stack">
                <span className="bk-about-label">Core Production Stack</span>
                <div className="bk-about-pills">
                  <span className="bk-stack-chip">
                    <Layout size={14} /> React.js
                  </span>
                  <span className="bk-stack-chip">
                    <Server size={14} /> Node.js & Express
                  </span>
                  <span className="bk-stack-chip">
                    <Database size={14} /> MySQL
                  </span>
                  <span className="bk-stack-chip">
                    <Code2 size={14} /> PHP & REST APIs
                  </span>
                </div>
              </div>
            </motion.div>

            {/* Stats Row */}
            <div className="bk-about-stats">
              <div className="bk-card bk-stat-tile">
                <Briefcase size={20} className="bk-stat-ico" />
                <strong>1.5+</strong>
                <span>Years Exp</span>
              </div>
              <div className="bk-card bk-stat-tile">
                <Rocket size={20} className="bk-stat-ico" />
                <strong>10+</strong>
                <span>Projects Built</span>
              </div>
              <div className="bk-card bk-stat-tile">
                <Coffee size={20} className="bk-stat-ico" />
                <strong>Daily</strong>
                <span>Clean Commits</span>
              </div>
            </div>

            {/* CTA Row */}
            <div className="bk-about-actions">
              <a
                href={resumeDownloadUrl}
                download
                target="_blank"
                rel="noreferrer"
                className="bk-btn bk-btn--primary"
                style={{ flex: 1 }}
              >
                <Download size={17} /> Download Resume
              </a>
              <a href="#contact" className="bk-btn bk-btn--ghost" style={{ flex: 1 }}>
                <Send size={17} /> Get in Touch
              </a>
            </div>
          </div>

          {/* Right Column: Education */}
          <motion.div
            className="bk-card bk-about-edu"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="bk-edu-header">
              <span className="bk-edu-badge">
                <GraduationCap size={20} />
              </span>
              <h3 className="bk-about-h3" style={{ margin: 0 }}>
                Education
              </h3>
            </div>

            <div className="bk-edu-timeline">
              {data.education.map((edu, idx) => (
                <div key={idx} className="bk-edu-node">
                  <span className="bk-edu-dot" />
                  <span className="bk-edu-year">{edu.year}</span>
                  <h4 className="bk-edu-deg">{edu.title}</h4>
                  <p className="bk-edu-inst">{edu.inst}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .bk-sec-head {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 12px;
          margin-bottom: clamp(40px, 6vw, 64px);
        }
        .bk-pill-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 0.76rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--secondary);
          background: var(--surface-2);
          border: 1px solid var(--line-strong);
        }
        .bk-about-grid {
          display: grid;
          grid-template-columns: 1.25fr 0.85fr;
          gap: 22px;
          align-items: start;
        }
        .bk-about-col {
          display: flex;
          flex-direction: column;
          gap: 22px;
        }
        .bk-about-bio,
        .bk-about-edu {
          padding: 30px;
        }
        .bk-about-h3 {
          font-size: 1.35rem;
          font-weight: 700;
          margin-bottom: 14px;
        }
        .bk-about-p {
          color: var(--muted);
          font-size: 1.02rem;
          line-height: 1.7;
          margin-bottom: 24px;
        }
        .bk-about-stack {
          padding-top: 20px;
          border-top: 1px solid var(--line);
        }
        .bk-about-label {
          display: block;
          font-size: 0.75rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--muted);
          margin-bottom: 12px;
        }
        .bk-about-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .bk-stack-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 14px;
          border-radius: 12px;
          font-size: 0.85rem;
          font-weight: 500;
          background: var(--surface-2);
          border: 1px solid var(--line);
          color: var(--text);
        }
        .bk-about-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }
        .bk-stat-tile {
          padding: 22px 16px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 4px;
        }
        .bk-stat-ico {
          color: var(--primary);
          margin-bottom: 4px;
        }
        .bk-stat-tile strong {
          font-family: var(--font-display);
          font-size: 1.8rem;
          font-weight: 800;
          line-height: 1.1;
        }
        .bk-stat-tile span {
          font-size: 0.76rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          color: var(--muted);
        }
        .bk-about-actions {
          display: flex;
          gap: 14px;
        }
        .bk-edu-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 26px;
        }
        .bk-edu-badge {
          width: 42px;
          height: 42px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: var(--surface-2);
          border: 1px solid var(--line-strong);
          color: var(--primary);
        }
        .bk-edu-timeline {
          position: relative;
          padding-left: 22px;
          border-left: 2px solid var(--line-strong);
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .bk-edu-node {
          position: relative;
        }
        .bk-edu-dot {
          position: absolute;
          left: -28px;
          top: 4px;
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: var(--primary);
          box-shadow: 0 0 0 4px var(--surface);
        }
        .bk-edu-year {
          display: inline-block;
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--secondary);
          margin-bottom: 4px;
        }
        .bk-edu-deg {
          font-size: 1rem;
          font-weight: 700;
          margin-bottom: 4px;
        }
        .bk-edu-inst {
          font-size: 0.88rem;
          color: var(--muted);
          margin: 0;
        }

        @media (max-width: 960px) {
          .bk-about-grid {
            grid-template-columns: 1fr;
          }
        }
        @media (max-width: 560px) {
          .bk-about-stats {
            grid-template-columns: 1fr;
          }
          .bk-about-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}