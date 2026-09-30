import React, { useCallback, useEffect, useRef, useState } from 'react';
import api from '../api/axiosClient';

/* ---------- Inline icons (no external icon library) ---------- */
const Icon = ({ children, size = 16, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...props}
  >
    {children}
  </svg>
);

const ArrowUpRightIcon = (p) => (
  <Icon {...p}>
    <path d="M7 17 17 7M8 7h9v9" />
  </Icon>
);
const LockIcon = (p) => (
  <Icon {...p}>
    <rect x="4" y="11" width="16" height="10" rx="2" />
    <path d="M8 11V7a4 4 0 0 1 8 0v4" />
  </Icon>
);
const ImageIcon = (p) => (
  <Icon {...p}>
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <circle cx="9" cy="9" r="2" />
    <path d="m21 15-3.1-3.1a2 2 0 0 0-2.8 0L6 21" />
  </Icon>
);
const LayersIcon = (p) => (
  <Icon {...p}>
    <path d="m12 2 9 5-9 5-9-5 9-5Z" />
    <path d="m3 12 9 5 9-5M3 17l9 5 9-5" />
  </Icon>
);
const RefreshIcon = (p) => (
  <Icon {...p}>
    <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
    <path d="M21 3v5h-5" />
  </Icon>
);

/* ---------- Helpers ---------- */
const MIN_LOADER_MS = 450;
const MAX_VISIBLE_TECH = 3;
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const toList = (value) => {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value === 'string') return value.split(',').map((v) => v.trim()).filter(Boolean);
  return [];
};

const resolveImage = (src) => {
  if (!src || typeof src !== 'string') return '';
  const clean = src.trim();
  if (!clean) return '';
  if (/^(https?:)?\/\//i.test(clean) || clean.startsWith('data:')) return clean;
  return `/${clean.replace(/^\.?\/+/, '')}`;
};

const normalize = (item) => {
  const link = typeof item.link === 'string' ? item.link.trim() : '';
  return {
    title: item.title || 'Untitled project',
    description: item.description || '',
    badge: item.badge || '',
    image: resolveImage(item.image_url),
    tech: toList(item.technologies),
    link: link && link !== '#' ? link : '',
  };
};

/* Reveal-on-scroll hook (native IntersectionObserver) */
const useReveal = () => {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

/* ---------- Sub components ---------- */
const ProjectCard = ({ project, index }) => {
  const [ref, visible] = useReveal();
  const [imgFailed, setImgFailed] = useState(false);
  const featured = index === 0;
  const shownTech = project.tech.slice(0, MAX_VISIBLE_TECH);
  const extra = project.tech.length - shownTech.length;
  const showImage = project.image && !imgFailed;

  return (
    <article
      ref={ref}
      className={`prj-card ${featured ? 'is-featured' : ''} ${visible ? 'is-visible' : ''}`}
      style={{ '--prj-delay': `${Math.min(index % 3, 2) * 80}ms` }}
    >
      <div className="prj-media">
        {showImage ? (
          <img
            src={project.image}
            alt={`${project.title} preview`}
            className="prj-img"
            loading="lazy"
            decoding="async"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="prj-media-fallback" aria-hidden="true">
            <ImageIcon size={30} />
          </div>
        )}
        {project.badge && <span className="prj-badge">{project.badge}</span>}
      </div>

      <div className="prj-body">
        <div className="prj-text">
          <h3 className="prj-name">{project.title}</h3>
          {project.description && <p className="prj-desc">{project.description}</p>}
        </div>

        <div className="prj-foot">
          {project.tech.length > 0 && (
            <ul className="prj-tech" aria-label="Technologies used">
              {shownTech.map((t) => (
                <li key={t} className="prj-tag">
                  {t}
                </li>
              ))}
              {extra > 0 && <li className="prj-tag is-muted">+{extra}</li>}
            </ul>
          )}

          {project.link ? (
            <a
              className="prj-action is-live"
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Open ${project.title} (opens in a new tab)`}
            >
              Live
              <ArrowUpRightIcon size={14} className="prj-action-icon" />
            </a>
          ) : (
            <span className="prj-action is-private" title="Source and demo are private">
              Private
              <LockIcon size={12} />
            </span>
          )}
        </div>
      </div>
    </article>
  );
};

const SkeletonCard = ({ featured }) => (
  <div className={`prj-card prj-card-sk is-visible ${featured ? 'is-featured' : ''}`} aria-hidden="true">
    <div className="prj-media">
      <span className="prj-sk prj-sk-fill" />
    </div>
    <div className="prj-body">
      <div className="prj-text">
        <span className="prj-sk prj-sk-title" />
        <span className="prj-sk prj-sk-line" />
        <span className="prj-sk prj-sk-line w-80" />
        <span className="prj-sk prj-sk-line w-55" />
      </div>
      <div className="prj-foot">
        <div className="prj-sk-tags">
          <span className="prj-sk prj-sk-tag" />
          <span className="prj-sk prj-sk-tag" />
          <span className="prj-sk prj-sk-tag" />
        </div>
        <span className="prj-sk prj-sk-action" />
      </div>
    </div>
  </div>
);

/* ---------- Main component ---------- */
const Projects = () => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | success | error
  const [attempt, setAttempt] = useState(0);

  const load = useCallback(async (signal) => {
    setStatus('loading');
    try {
      const [res] = await Promise.all([api.get('/projects', { signal }), wait(MIN_LOADER_MS)]);
      const list = res?.data?.status === 'success' && Array.isArray(res.data.data) ? res.data.data : null;
      if (!list) throw new Error('Unexpected response');
      setItems(list.map(normalize));
      setStatus('success');
    } catch (error) {
      if (error?.code === 'ERR_CANCELED' || error?.name === 'CanceledError' || error?.name === 'AbortError') return;
      console.error('Projects fetch failed:', error);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load, attempt]);

  return (
    <section id="projects" className="prj-section" aria-labelledby="prj-heading" aria-busy={status === 'loading'}>
      <div className="prj-container">
        <header className="prj-header">
          <span className="prj-eyebrow">
            <LayersIcon size={14} />
            Selected Work
          </span>
          <h2 id="prj-heading" className="prj-title">
            Engineering Projects
          </h2>
          <p className="prj-lead">
            A selection of production-grade applications and systems I have built with modern web technologies.
          </p>
        </header>

        {status === 'loading' && (
          <>
            <p className="prj-sr-only" role="status">
              Loading projects
            </p>
            <div className="prj-grid">
              <SkeletonCard featured />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </>
        )}

        {status === 'error' && (
          <div className="prj-state" role="alert">
            <h3>Couldn't load projects</h3>
            <p>Something went wrong while fetching the data. Check your connection and try again.</p>
            <button type="button" className="prj-btn" onClick={() => setAttempt((n) => n + 1)}>
              <RefreshIcon size={15} /> Try again
            </button>
          </div>
        )}

        {status === 'success' && items.length === 0 && (
          <div className="prj-state">
            <h3>No projects yet</h3>
            <p>New work will appear here soon.</p>
          </div>
        )}

        {status === 'success' && items.length > 0 && (
          <div className="prj-grid">
            {items.map((project, index) => (
              <ProjectCard key={`${project.title}-${index}`} project={project} index={index} />
            ))}
          </div>
        )}
      </div>

      <style>{`
        .prj-section {
          --prj-bg: #0a0a0b;
          --prj-card: #111113;
          --prj-card-hover: #161618;
          --prj-border: #27272a;
          --prj-border-strong: #3f3f46;
          --prj-text: #fafafa;
          --prj-text-2: #a1a1aa;
          --prj-text-3: #71717a;

          position: relative;
          width: 100%;
          box-sizing: border-box;
          background: var(--prj-bg);
          color: var(--prj-text);
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
          padding: clamp(48px, 6vw, 80px) 0;
          overflow: hidden;
        }
        .prj-section *, .prj-section *::before, .prj-section *::after { box-sizing: border-box; }

        .prj-section::before {
          content: '';
          position: absolute;
          top: -160px;
          left: 50%;
          width: min(900px, 90vw);
          height: 360px;
          transform: translateX(-50%);
          background: radial-gradient(closest-side, rgba(255,255,255,0.05), transparent);
          pointer-events: none;
        }

        .prj-container {
          position: relative;
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Header */
        .prj-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 14px;
          margin: 0 auto clamp(40px, 6vw, 72px);
        }
        .prj-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--prj-text-2);
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--prj-border);
          border-radius: 999px;
        }
        .prj-title {
          margin: 0;
          font-size: clamp(2rem, 5vw, 3.25rem);
          line-height: 1.1;
          font-weight: 700;
          letter-spacing: -0.03em;
          background: linear-gradient(180deg, #fff 30%, #a1a1aa 130%);
          -webkit-background-clip: text;
          background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .prj-lead {
          margin: 0;
          max-width: 540px;
          font-size: clamp(1rem, 2vw, 1.125rem);
          line-height: 1.65;
          color: var(--prj-text-2);
        }

        /* Grid */
        .prj-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        /* Card */
        .prj-card {
          position: relative;
          display: flex;
          flex-direction: column;
          min-width: 0;
          overflow: hidden;
          background: var(--prj-card);
          border: 1px solid var(--prj-border);
          border-radius: 18px;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--prj-delay, 0ms),
                      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--prj-delay, 0ms),
                      background 0.3s, border-color 0.3s, box-shadow 0.3s;
        }
        .prj-card.is-visible { opacity: 1; transform: none; }
        .prj-card:not(.prj-card-sk):hover {
          background: var(--prj-card-hover);
          border-color: var(--prj-border-strong);
          transform: translateY(-4px);
          box-shadow: 0 22px 44px -22px rgba(0,0,0,0.85);
        }

        .prj-media {
          position: relative;
          width: 100%;
          aspect-ratio: 16 / 10;
          overflow: hidden;
          background: #0e0e10;
          border-bottom: 1px solid var(--prj-border);
        }
        .prj-img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.7s cubic-bezier(0.22, 1, 0.36, 1);
        }
        .prj-card:hover .prj-img { transform: scale(1.04); }
        .prj-media-fallback {
          display: grid;
          place-items: center;
          width: 100%;
          height: 100%;
          color: #3a3a40;
          background:
            radial-gradient(circle at 30% 20%, rgba(255,255,255,0.05), transparent 55%),
            #101012;
        }
        .prj-badge {
          position: absolute;
          top: 12px;
          right: 12px;
          padding: 4px 10px;
          font-size: 0.7rem;
          font-weight: 600;
          letter-spacing: 0.04em;
          color: var(--prj-text);
          background: rgba(10,10,11,0.65);
          border: 1px solid rgba(255,255,255,0.12);
          border-radius: 8px;
          -webkit-backdrop-filter: blur(6px);
          backdrop-filter: blur(6px);
        }

        .prj-body {
          display: flex;
          flex: 1;
          flex-direction: column;
          justify-content: space-between;
          gap: 22px;
          padding: 22px;
        }
        .prj-name {
          margin: 0 0 8px;
          font-size: 1.125rem;
          font-weight: 600;
          letter-spacing: -0.015em;
          color: var(--prj-text);
        }
        .prj-desc {
          margin: 0;
          font-size: 0.9rem;
          line-height: 1.6;
          color: var(--prj-text-2);
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .prj-foot {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          gap: 16px;
        }
        .prj-tech { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
        .prj-tag {
          padding: 3px 9px;
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--prj-text-2);
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--prj-border);
          border-radius: 6px;
        }
        .prj-tag.is-muted { background: transparent; border-style: dashed; color: var(--prj-text-3); }

        .prj-action {
          flex-shrink: 0;
          display: inline-flex;
          align-items: center;
          gap: 6px;
          margin-left: auto;
          font-size: 0.85rem;
          font-weight: 500;
          text-decoration: none;
        }
        .prj-action.is-live { color: var(--prj-text); border-radius: 6px; }
        .prj-action.is-live:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }
        .prj-action-icon { transition: transform 0.2s; }
        .prj-card:hover .prj-action-icon { transform: translate(2px, -2px); }
        .prj-action.is-private { color: var(--prj-text-3); cursor: default; }

        /* Featured card */
        @media (min-width: 768px) {
          .prj-card.is-featured { grid-column: 1 / -1; flex-direction: row; }
          .prj-card.is-featured .prj-media {
            flex: 0 0 55%;
            aspect-ratio: auto;
            min-height: 320px;
            border-bottom: 0;
            border-right: 1px solid var(--prj-border);
          }
          .prj-card.is-featured .prj-body { flex: 1; justify-content: center; gap: 28px; padding: 36px; }
          .prj-card.is-featured .prj-name { font-size: 1.6rem; margin-bottom: 12px; }
          .prj-card.is-featured .prj-desc { font-size: 1rem; -webkit-line-clamp: 5; }
          .prj-card.is-featured .prj-foot { flex-direction: column; align-items: flex-start; }
          .prj-card.is-featured .prj-action { margin-left: 0; }
        }
        @media (min-width: 1024px) {
          .prj-card.is-featured { grid-column: span 2; }
        }

        /* Skeleton */
        .prj-sk {
          display: block;
          height: 12px;
          border-radius: 6px;
          background: linear-gradient(90deg, #1a1a1d 25%, #26262a 50%, #1a1a1d 75%);
          background-size: 200% 100%;
          animation: prj-shimmer 1.4s linear infinite;
        }
        @keyframes prj-shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
        .prj-sk-fill { width: 100%; height: 100%; border-radius: 0; }
        .prj-sk-title { width: 55%; height: 20px; margin-bottom: 16px; }
        .prj-sk-line { width: 100%; margin-bottom: 10px; }
        .prj-sk-line.w-80 { width: 80%; }
        .prj-sk-line.w-55 { width: 55%; margin-bottom: 0; }
        .prj-sk-tags { display: flex; gap: 6px; }
        .prj-sk-tag { width: 56px; height: 22px; border-radius: 6px; }
        .prj-sk-action { width: 44px; height: 14px; }

        /* Error / empty */
        .prj-state {
          max-width: 460px;
          margin: 0 auto;
          padding: 40px 28px;
          text-align: center;
          background: var(--prj-card);
          border: 1px dashed var(--prj-border-strong);
          border-radius: 18px;
        }
        .prj-state h3 { margin: 0 0 8px; font-size: 1.1rem; font-weight: 600; }
        .prj-state p { margin: 0 0 20px; font-size: 0.95rem; line-height: 1.6; color: var(--prj-text-2); }
        .prj-state p:last-child { margin-bottom: 0; }
        .prj-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          font: inherit;
          font-size: 0.9rem;
          font-weight: 600;
          color: #0a0a0b;
          background: #fafafa;
          border: 0;
          border-radius: 10px;
          cursor: pointer;
          transition: transform 0.2s, opacity 0.2s;
        }
        .prj-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .prj-btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

        .prj-sr-only {
          position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
          overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }

        /* Responsive */
        @media (max-width: 1023px) {
          .prj-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        }
        @media (max-width: 767px) {
          .prj-container { padding: 0 16px; }
          .prj-grid { grid-template-columns: minmax(0, 1fr); gap: 16px; }
          .prj-body { padding: 18px; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .prj-card { opacity: 1; transform: none; transition: none; }
          .prj-card:not(.prj-card-sk):hover { transform: none; }
          .prj-img, .prj-action-icon, .prj-btn { transition: none; }
          .prj-card:hover .prj-img, .prj-card:hover .prj-action-icon, .prj-btn:hover { transform: none; }
          .prj-sk { animation: none; }
        }
      `}</style>
    </section>
  );
};

export default Projects;