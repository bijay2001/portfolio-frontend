// src/components/Footer.jsx
import React from 'react';
import { ArrowUp } from 'lucide-react';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="bk-footer">
      <div className="bk-container bk-footer-row">
        <div>
          <div className="bk-footer-brand">
            <span className="bk-nav__logo">BK</span>
            <strong>Bijay Kumar Behera</strong>
          </div>
          <p className="bk-footer-copy">
            © {new Date().getFullYear()} Bijay Kumar Behera. All rights reserved.
          </p>
        </div>

        <div className="bk-footer-actions">
          <a
            href="https://github.com/bijay2001"
            target="_blank"
            rel="noreferrer"
            className="bk-icon-btn"
            aria-label="GitHub"
          >
            <GitHubIcon size={17} />
          </a>
          <a
            href="https://www.linkedin.com/in/bijay-kumar-behera/"
            target="_blank"
            rel="noreferrer"
            className="bk-icon-btn"
            aria-label="LinkedIn"
          >
            <LinkedInIcon size={17} />
          </a>
          <button
            type="button"
            onClick={scrollToTop}
            className="bk-icon-btn"
            aria-label="Scroll to top"
            title="Scroll to top"
          >
            <ArrowUp size={17} />
          </button>
        </div>
      </div>

      <style>{`
        .bk-footer {
          padding: 36px 0;
          border-top: 1px solid var(--line);
          background: var(--bg-soft);
        }
        .bk-footer-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 16px;
        }
        .bk-footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-family: var(--font-display);
          font-size: 1rem;
        }
        .bk-footer-copy {
          font-size: 0.84rem;
          color: var(--muted);
          margin-top: 6px;
        }
        .bk-footer-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }
      `}</style>
    </footer>
  );
}