// src/components/Hero.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Sparkles, Terminal, CheckCircle2, ShieldCheck } from 'lucide-react';
import api from '../api/axiosClient';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';

const BOOT_STEPS = [
  { text: 'PS C:\\Bijay\\Portfolio> npm run start:prod', color: 'var(--text)', delay: 250 },
  { text: '→ [INFO] Initializing React 19 + Node.js runtime...', color: 'var(--muted)', delay: 750 },
  { text: '→ [INFO] Establishing MySQL pool connection (port 3306)...', color: 'var(--secondary)', delay: 1300 },
  { text: '✓ [ OK ] Database connected (latency: 14ms)', color: '#10b981', delay: 1850 },
  { text: '✓ [ OK ] Mounted REST APIs & JWT Auth guards', color: 'var(--primary)', delay: 2350 },
  { text: '★ [LIVE] Server listening — Ready for production.', color: '#10b981', delay: 2850, isCursor: true },
];

const HeroConsole = () => {
  const [lines, setLines] = useState([]);

  useEffect(() => {
    const timers = BOOT_STEPS.map((step) =>
      setTimeout(() => {
        setLines((prev) => [...prev, step]);
      }, step.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="bk-hero-console bk-card">
      <div className="bk-console-bar">
        <div className="bk-console-dots">
          <span className="dot-red" />
          <span className="dot-amber" />
          <span className="dot-green" />
        </div>
        <div className="bk-console-title">
          <Terminal size={13} />
          <span>powershell — node server.js</span>
        </div>
        <span className="bk-console-status">● ONLINE</span>
      </div>

      <div className="bk-console-body">
        {lines.map((line, i) => (
          <div key={i} className="bk-console-line" style={{ color: line.color }}>
            <span>{line.text}</span>
            {line.isCursor && <span className="bk-console-caret" />}
          </div>
        ))}
      </div>

      <div className="bk-console-foot">
        <div className="bk-console-chip">
          <CheckCircle2 size={14} style={{ color: '#10b981' }} />
          <span>Full-Stack Architecture</span>
        </div>
        <div className="bk-console-chip">
          <ShieldCheck size={14} style={{ color: 'var(--secondary)' }} />
          <span>React • Node • PHP • MySQL</span>
        </div>
      </div>
    </div>
  );
};

export default function Hero() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    let active = true;
    api
      .get('/profile')
      .then((res) => {
        if (active && res.data?.status === 'success') {
          setProfile(res.data.profile);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const roleTitle = profile?.title || 'Full Stack Developer • React, Node.js, PHP & MySQL';

  return (
    <section id="home" className="bk-section bk-hero-sec">
      <div className="bk-container">
        <div className="bk-hero-grid">
          {/* Left Content */}
          <motion.div
            className="bk-hero-copy"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="bk-avail-badge">
              <span className="bk-avail-pulse" />
              <span>Available for Full-Time & Freelance Projects</span>
            </div>

            <p className="bk-hero-eyebrow">
              <Sparkles size={15} />
              <span>{roleTitle}</span>
            </p>

            <h1 className="bk-hero-h1">
              Building scalable systems <span className="bk-grad-text">from the ground up.</span>
            </h1>

            <p className="bk-lead bk-hero-sub">
              Focused on clean architecture and real-world impact, I engineer high-performance web applications using{' '}
              <strong>React.js</strong>, <strong>Node.js</strong>, <strong>PHP</strong>, and <strong>MySQL</strong>—from
              mission-critical portals to AI-integrated platforms.
            </p>

            <div className="bk-hero-cta">
              <a href="#projects" className="bk-btn bk-btn--primary">
                <span>Explore Work</span>
                <ArrowRight size={17} />
              </a>
              <a href="#resume" className="bk-btn bk-btn--ghost">
                <Download size={16} />
                <span>View Resume</span>
              </a>
              <div className="bk-hero-socials">
                <a
                  href="https://github.com/bijay2001"
                  target="_blank"
                  rel="noreferrer"
                  className="bk-icon-btn"
                  aria-label="GitHub"
                >
                  <GitHubIcon size={18} />
                </a>
                <a
                  href="https://www.linkedin.com/in/bijay-kumar-behera/"
                  target="_blank"
                  rel="noreferrer"
                  className="bk-icon-btn"
                  aria-label="LinkedIn"
                >
                  <LinkedInIcon size={18} />
                </a>
              </div>
            </div>
          </motion.div>

          {/* Right Terminal Card */}
          <motion.div
            initial={{ opacity: 0, y: 28, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <HeroConsole />
          </motion.div>
        </div>
      </div>

      <style>{`
        .bk-hero-sec {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding-top: 132px;
          padding-bottom: 72px;
        }
        .bk-hero-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: clamp(32px, 5vw, 56px);
          align-items: center;
        }
        .bk-hero-copy {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .bk-avail-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 6px 14px;
          border-radius: 999px;
          background: var(--surface-2);
          border: 1px solid var(--line-strong);
          font-size: 0.8rem;
          font-weight: 500;
          color: var(--muted);
          margin-bottom: 18px;
        }
        .bk-avail-pulse {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 12px #10b981;
        }
        .bk-hero-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-size: 0.9rem;
          font-weight: 600;
          color: var(--secondary);
          margin-bottom: 12px;
        }
        .bk-hero-h1 {
          font-size: clamp(2.4rem, 5.2vw, 4.1rem);
          font-weight: 800;
          line-height: 1.07;
          letter-spacing: -0.03em;
          margin-bottom: 20px;
        }
        .bk-hero-sub {
          margin-bottom: 32px;
        }
        .bk-hero-sub strong {
          color: var(--text);
          font-weight: 600;
        }
        .bk-hero-cta {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 12px;
        }
        .bk-hero-socials {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-left: 4px;
        }

        /* Console Card */
        .bk-hero-console {
          overflow: hidden;
          box-shadow: var(--shadow);
        }
        .bk-console-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 16px;
          background: var(--surface-2);
          border-bottom: 1px solid var(--line);
        }
        .bk-console-dots {
          display: flex;
          gap: 7px;
        }
        .bk-console-dots span {
          width: 10px;
          height: 10px;
          border-radius: 50%;
        }
        .dot-red { background: #ef4444; }
        .dot-amber { background: #f59e0b; }
        .dot-green { background: #10b981; }
        .bk-console-title {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.76rem;
          color: var(--muted);
        }
        .bk-console-status {
          font-size: 0.7rem;
          font-weight: 700;
          color: #10b981;
          letter-spacing: 0.05em;
        }
        .bk-console-body {
          padding: 22px;
          min-height: 250px;
          font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
          font-size: 0.84rem;
          line-height: 1.75;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .bk-console-caret {
          display: inline-block;
          width: 8px;
          height: 15px;
          background: var(--primary);
          margin-left: 6px;
          vertical-align: middle;
          animation: bkCaret 1s step-end infinite;
        }
        @keyframes bkCaret {
          50% { opacity: 0; }
        }
        .bk-console-foot {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 10px;
          padding: 12px 18px;
          background: var(--surface-2);
          border-top: 1px solid var(--line);
          font-size: 0.78rem;
          color: var(--muted);
        }
        .bk-console-chip {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-weight: 500;
        }

        @media (max-width: 960px) {
          .bk-hero-sec {
            min-height: auto;
            padding-top: 116px;
          }
          .bk-hero-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}