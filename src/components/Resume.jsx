// src/components/Resume.jsx
import React from 'react';
import { motion } from 'framer-motion';
import { Download, CalendarDays, FileText, FileBadge, ExternalLink, Sparkles } from 'lucide-react';

export default function Resume() {
  const resumeUrl = '/Bijay_Kumar_Behera_FullStackDeveloper.pdf';
  const currentDate = new Date().toLocaleString('en-IN', { month: 'long', year: 'numeric' });

  return (
    <section id="resume" className="bk-section">
      <div className="bk-container">
        <div className="bk-sec-head">
          <span className="bk-pill-eyebrow">
            <Sparkles size={14} /> Curriculum Vitae
          </span>
          <h2 className="bk-title">
            My <span className="bk-grad-text">Resume.</span>
          </h2>
          <p className="bk-lead">
            Access my complete professional history, technical stack, and engineering deliverables.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bk-card bk-resume-vault"
        >
          <div className="bk-vault-bar">
            <div className="bk-console-dots">
              <span className="dot-red" />
              <span className="dot-amber" />
              <span className="dot-green" />
            </div>
            <span className="bk-vault-file">Bijay_Kumar_Behera_FullStackDeveloper.pdf</span>
            <span className="bk-vault-status">VERIFIED</span>
          </div>

          <div className="bk-vault-body">
            <div className="bk-vault-icon">
              <FileBadge size={40} />
            </div>

            <h3 className="bk-vault-h3">Full Stack Software Engineer — Resume</h3>
            <p className="bk-vault-p">
              Detailed overview of my production work at C-DAC and Orisys Infotech, full-stack architecture skills
              (React.js, Node.js, PHP, MySQL), and academic credentials (MCA).
            </p>

            <div className="bk-vault-actions">
              <a
                href={resumeUrl}
                download="Bijay_Kumar_Behera_Resume.pdf"
                className="bk-btn bk-btn--primary"
              >
                <Download size={18} />
                <span>Download PDF</span>
              </a>
              <a
                href={resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="bk-btn bk-btn--ghost"
              >
                <ExternalLink size={17} />
                <span>Open in Browser</span>
              </a>
            </div>

            <div className="bk-vault-meta">
              <span className="bk-vault-tag">
                <FileText size={15} style={{ color: 'var(--primary)' }} />
                ATS-Friendly PDF
              </span>
              <span className="bk-vault-tag">
                <CalendarDays size={15} style={{ color: 'var(--secondary)' }} />
                Updated: {currentDate}
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        .bk-resume-vault {
          max-width: 780px;
          margin: 0 auto;
          overflow: hidden;
          box-shadow: var(--shadow);
        }
        .bk-vault-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 12px 18px;
          background: var(--surface-2);
          border-bottom: 1px solid var(--line);
        }
        .bk-vault-file {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-size: 0.78rem;
          color: var(--muted);
        }
        .bk-vault-status {
          font-size: 0.7rem;
          font-weight: 700;
          letter-spacing: 0.06em;
          color: var(--secondary);
        }
        .bk-vault-body {
          padding: clamp(28px, 5vw, 48px);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          background: radial-gradient(circle at 50% 0%, var(--glow), transparent 70%);
        }
        .bk-vault-icon {
          width: 84px;
          height: 84px;
          border-radius: 24px;
          display: grid;
          place-items: center;
          background: var(--surface-2);
          border: 1px solid var(--line-strong);
          color: var(--secondary);
          margin-bottom: 20px;
          box-shadow: 0 12px 30px -10px var(--glow);
        }
        .bk-vault-h3 {
          font-size: clamp(1.35rem, 3vw, 1.75rem);
          font-weight: 800;
          margin-bottom: 12px;
        }
        .bk-vault-p {
          max-width: 540px;
          color: var(--muted);
          font-size: 0.98rem;
          line-height: 1.7;
          margin-bottom: 28px;
        }
        .bk-vault-actions {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
          margin-bottom: 28px;
        }
        .bk-vault-meta {
          width: 100%;
          padding-top: 20px;
          border-top: 1px solid var(--line);
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 12px;
        }
        .bk-vault-tag {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          border-radius: 999px;
          font-size: 0.8rem;
          font-weight: 500;
          background: var(--surface-2);
          border: 1px solid var(--line);
          color: var(--muted);
        }
        @media (max-width: 520px) {
          .bk-vault-file {
            display: none;
          }
          .bk-vault-actions {
            width: 100%;
            flex-direction: column;
          }
        }
      `}</style>
    </section>
  );
}