// src/components/Projects.jsx
import React, { useCallback, useEffect, useState } from 'react';
import { ArrowUpRight, Lock, Layers, Code2 } from 'lucide-react';
import api from '../api/axiosClient';

const FALLBACK_PROJECTS = [
  {
    title: 'NovusCV — AI Resume Analyzer & ATS Optimizer',
    description:
      'Full-stack AI resume analyzer and applicant tracking compatibility engine built with React.js, Node.js, Express, MySQL, and Google Gemini API.',
    badge: 'Featured AI App',
    technologies: 'React.js, Node.js, Express, MySQL, Gemini API',
    link: 'https://github.com/bijay2001',
  },
  {
    title: 'Driver Attendance & Fleet Management System',
    description:
      'Enterprise fleet portal managing daily check-ins, live attendance, and vehicle odometer tracking for 50+ drivers.',
    badge: 'Enterprise System',
    technologies: 'React.js, Node.js, MySQL, Google APIs',
    link: 'https://github.com/bijay2001',
  },
  {
    title: 'Hisab Hub — Financial Management Suite',
    description:
      'Clean ledger and expense management web application engineered for fast reconciliation and reporting.',
    badge: 'FinTech Web App',
    technologies: 'PHP, MySQL, JavaScript',
    link: 'https://github.com/bijay2001',
  },
];

const baseUrl = (import.meta.env.VITE_API_URL || '').replace(/\/api\/?$/, '');

const resolveImage = (src) => {
  if (!src || typeof src !== 'string') return '';
  const clean = src.trim();
  if (!clean) return '';
  if (/^(https?:)?\/\//i.test(clean) || clean.startsWith('data:')) return clean;
  if (!baseUrl) return `/${clean.replace(/^\.?\/+/, '')}`;
  return `${baseUrl}/${clean.replace(/^\.?\/+/, '')}`;
};

const toList = (val) => {
  if (Array.isArray(val)) return val.map((v) => String(v).trim()).filter(Boolean);
  if (typeof val === 'string') return val.split(',').map((v) => v.trim()).filter(Boolean);
  return [];
};

const normalize = (item) => ({
  title: item.title || 'Untitled Project',
  description: item.description || '',
  badge: item.badge || 'Production',
  image: resolveImage(item.image_url),
  tech: toList(item.technologies),
  link: item.link && item.link !== '#' ? item.link.trim() : '',
});

const ProjectCard = ({ project, featured }) => {
  const [imgErr, setImgErr] = useState(false);
  const showImg = project.image && !imgErr;

  return (
    <article className={`bk-card bk-prj-card ${featured ? 'is-featured' : ''}`}>
      <div className="bk-prj-media">
        {showImg ? (
          <img
            src={project.image}
            alt={project.title}
            className="bk-prj-img"
            loading="lazy"
            onError={() => setImgErr(true)}
          />
        ) : (
          <div className="bk-prj-fallback">
            <Code2 size={34} />
            <span>{project.title}</span>
          </div>
        )}
        {project.badge && <span className="bk-prj-badge">{project.badge}</span>}
      </div>

      <div className="bk-prj-body">
        <div>
          <h3 className="bk-prj-title">{project.title}</h3>
          <p className="bk-prj-desc">{project.description}</p>
        </div>

        <div className="bk-prj-foot">
          <div className="bk-prj-tags">
            {project.tech.slice(0, 4).map((t) => (
              <span key={t} className="bk-prj-tag">
                {t}
              </span>
            ))}
          </div>

          {project.link ? (
            <a href={project.link} target="_blank" rel="noreferrer" className="bk-prj-action">
              <span>Live / Code</span>
              <ArrowUpRight size={15} />
            </a>
          ) : (
            <span className="bk-prj-private">
              <Lock size={13} /> Private
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

export default function Projects() {
  const [items, setItems] = useState(() => FALLBACK_PROJECTS.map(normalize));

  const load = useCallback(async () => {
    try {
      const res = await api.get('/projects');
      if (res?.data?.status === 'success' && Array.isArray(res.data.data) && res.data.data.length > 0) {
        setItems(res.data.data.map(normalize));
      }
    } catch {}
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <section id="projects" className="bk-section">
      <div className="bk-container">
        <div className="bk-sec-head">
          <span className="bk-pill-eyebrow">
            <Layers size={14} /> Selected Work
          </span>
          <h2 className="bk-title">
            Engineering <span className="bk-grad-text">Projects.</span>
          </h2>
          <p className="bk-lead">
            Production-ready web applications and full-stack platforms built with modern technologies.
          </p>
        </div>

        <div className="bk-prj-grid">
          {items.map((prj, idx) => (
            <ProjectCard key={`${prj.title}-${idx}`} project={prj} featured={idx === 0} />
          ))}
        </div>
      </div>

      <style>{`
        .bk-prj-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 22px;
        }
        .bk-prj-card {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }
        .bk-prj-media {
          position: relative;
          aspect-ratio: 16 / 10;
          background: var(--surface-2);
          border-bottom: 1px solid var(--line);
          overflow: hidden;
        }
        .bk-prj-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s var(--ease);
        }
        .bk-prj-card:hover .bk-prj-img {
          transform: scale(1.04);
        }
        .bk-prj-fallback {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 20px;
          text-align: center;
          color: var(--secondary);
          background: radial-gradient(circle at 30% 20%, var(--glow), transparent 70%);
          font-weight: 600;
          font-size: 0.9rem;
        }
        .bk-prj-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 4px 11px;
          border-radius: 999px;
          font-size: 0.72rem;
          font-weight: 600;
          background: var(--nav-bg);
          color: var(--text);
          border: 1px solid var(--line-strong);
          backdrop-filter: blur(8px);
        }
        .bk-prj-body {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 20px;
          padding: 24px;
        }
        .bk-prj-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .bk-prj-desc {
          font-size: 0.92rem;
          line-height: 1.6;
          color: var(--muted);
          margin: 0;
        }
        .bk-prj-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 12px;
          padding-top: 14px;
          border-top: 1px solid var(--line);
        }
        .bk-prj-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .bk-prj-tag {
          padding: 3px 9px;
          border-radius: 7px;
          font-size: 0.74rem;
          font-weight: 500;
          color: var(--muted);
          background: var(--surface-2);
          border: 1px solid var(--line);
        }
        .bk-prj-action {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--secondary);
        }
        .bk-prj-private {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.8rem;
          color: var(--muted);
        }
        @media (min-width: 960px) {
          .bk-prj-card.is-featured {
            grid-column: span 2;
            flex-direction: row;
          }
          .bk-prj-card.is-featured .bk-prj-media {
            flex: 0 0 52%;
            aspect-ratio: auto;
            border-bottom: 0;
            border-right: 1px solid var(--line);
          }
        }
        @media (max-width: 959px) {
          .bk-prj-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }
        @media (max-width: 640px) {
          .bk-prj-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}