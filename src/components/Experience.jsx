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

const BuildingIcon = (p) => (
  <Icon {...p}>
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M16 14h.01M8 10h.01M8 14h.01" />
  </Icon>
);
const PinIcon = (p) => (
  <Icon {...p}>
    <path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);
const CalendarIcon = (p) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4M8 2v4M3 10h18" />
  </Icon>
);
const CheckIcon = (p) => (
  <Icon {...p}>
    <path d="m5 12 5 5L20 7" />
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
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const toList = (value, separator) => {
  if (Array.isArray(value)) return value.map((v) => String(v).trim()).filter(Boolean);
  if (typeof value === 'string') return value.split(separator).map((v) => v.trim()).filter(Boolean);
  return [];
};

const normalize = (item) => ({
  role: item.role || '',
  company: item.company || '',
  location: item.location || '',
  duration: item.duration || '',
  points: toList(item.description, '||'),
  tech: toList(item.tech ?? item.skills ?? item.stack, ','),
  isCurrent: /present|current|ongoing/i.test(item.duration || ''),
});

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
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return [ref, visible];
};

/* ---------- Sub components ---------- */
const ExperienceItem = ({ job, index }) => {
  const [ref, visible] = useReveal();

  return (
    <li
      ref={ref}
      className={`exp-row ${visible ? 'is-visible' : ''}`}
      style={{ '--exp-delay': `${Math.min(index, 3) * 80}ms` }}
    >
      <div className="exp-date-col">
        <time className={`exp-date ${job.isCurrent ? 'is-active' : ''}`}>{job.duration}</time>
      </div>

      <div className="exp-rail" aria-hidden="true">
        <span className={`exp-node ${job.isCurrent ? 'is-active' : ''}`} />
      </div>

      <article className={`exp-card ${job.isCurrent ? 'is-active' : ''}`}>
        <div className="exp-mobile-date">
          <CalendarIcon size={13} />
          <time>{job.duration}</time>
        </div>

        <header className="exp-card-head">
          <div className="exp-title-row">
            <h3 className="exp-role">{job.role}</h3>
            {job.isCurrent && (
              <span className="exp-badge">
                <span className="exp-badge-dot" /> Current
              </span>
            )}
          </div>

          <div className="exp-meta">
            {job.company && (
              <span className="exp-meta-item">
                <BuildingIcon size={15} />
                {job.company}
              </span>
            )}
            {job.location && (
              <span className="exp-meta-item">
                <PinIcon size={15} />
                {job.location}
              </span>
            )}
          </div>
        </header>

        {job.points.length > 0 && (
          <ul className="exp-points">
            {job.points.map((point, i) => (
              <li key={i} className="exp-point">
                <span className="exp-point-icon">
                  <CheckIcon size={12} />
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}

        {job.tech.length > 0 && (
          <ul className="exp-tech" aria-label="Technologies used">
            {job.tech.map((t) => (
              <li key={t} className="exp-chip">
                {t}
              </li>
            ))}
          </ul>
        )}
      </article>
    </li>
  );
};

const SkeletonItem = () => (
  <li className="exp-row is-visible exp-skeleton-row" aria-hidden="true">
    <div className="exp-date-col">
      <span className="exp-sk exp-sk-date" />
    </div>
    <div className="exp-rail">
      <span className="exp-node exp-node-sk" />
    </div>
    <div className="exp-card exp-card-sk">
      <span className="exp-sk exp-sk-mobile-date" />
      <span className="exp-sk exp-sk-title" />
      <span className="exp-sk exp-sk-meta" />
      <span className="exp-sk exp-sk-line" />
      <span className="exp-sk exp-sk-line w-90" />
      <span className="exp-sk exp-sk-line w-70" />
    </div>
  </li>
);

/* ---------- Main component ---------- */
const Experience = () => {
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | success | error
  const [attempt, setAttempt] = useState(0);

  const load = useCallback(async (signal) => {
    setStatus('loading');
    try {
      const [res] = await Promise.all([api.get('/experience', { signal }), wait(MIN_LOADER_MS)]);
      const list = res?.data?.status === 'success' && Array.isArray(res.data.data) ? res.data.data : null;
      if (!list) throw new Error('Unexpected response');
      setItems(list.map(normalize));
      setStatus('success');
    } catch (error) {
      if (error?.code === 'ERR_CANCELED' || error?.name === 'CanceledError' || error?.name === 'AbortError') return;
      console.error('Experience fetch failed:', error);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load, attempt]);

  return (
    <section id="experience" className="exp-section" aria-labelledby="exp-heading" aria-busy={status === 'loading'}>
      <div className="exp-container">
        <header className="exp-header">
          <span className="exp-eyebrow">Career Path</span>
          <h2 id="exp-heading" className="exp-title">
            Professional Experience
          </h2>
          <p className="exp-lead">
            A timeline of my professional journey, technical contributions, and career growth.
          </p>
        </header>

        {status === 'loading' && (
          <>
            <p className="exp-sr-only" role="status">
              Loading experience
            </p>
            <ol className="exp-list">
              <SkeletonItem />
              <SkeletonItem />
              <SkeletonItem />
            </ol>
          </>
        )}

        {status === 'error' && (
          <div className="exp-state" role="alert">
            <h3>Couldn't load experience</h3>
            <p>Something went wrong while fetching the data. Please check your connection and try again.</p>
            <button type="button" className="exp-btn" onClick={() => setAttempt((n) => n + 1)}>
              <RefreshIcon size={15} /> Try again
            </button>
          </div>
        )}

        {status === 'success' && items.length === 0 && (
          <div className="exp-state">
            <h3>No experience added yet</h3>
            <p>Check back soon.</p>
          </div>
        )}

        {status === 'success' && items.length > 0 && (
          <ol className="exp-list">
            {items.map((job, index) => (
              <ExperienceItem key={`${job.company}-${job.role}-${index}`} job={job} index={index} />
            ))}
          </ol>
        )}
      </div>

      <style>{`
        .exp-section {
          --exp-bg: #0a0a0b;
          --exp-card: #111113;
          --exp-card-hover: #161618;
          --exp-border: #27272a;
          --exp-border-strong: #3f3f46;
          --exp-text: #fafafa;
          --exp-text-2: #a1a1aa;
          --exp-text-3: #71717a;
          --exp-accent: #10b981;
          --exp-date-w: 170px;
          --exp-rail-w: 40px;
          --exp-row-gap: 40px;

          position: relative;
          width: 100%;
          box-sizing: border-box;
          background: var(--exp-bg);
          color: var(--exp-text);
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
          padding: clamp(48px, 6vw, 80px) 0;
          overflow: hidden;
        }
        .exp-section *, .exp-section *::before, .exp-section *::after { box-sizing: border-box; }

        /* subtle ambient glow */
        .exp-section::before {
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

        .exp-container {
          position: relative;
          width: 100%;
          max-width: 1080px;
          margin: 0 auto;
          padding: 0 10px;
        }

        /* Header */
        .exp-header {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 14px;
          margin: 0 auto clamp(48px, 7vw, 80px);
        }
        .exp-eyebrow {
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--exp-text-3);
        }
        .exp-title {
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
        .exp-lead {
          margin: 0;
          max-width: 520px;
          font-size: clamp(1rem, 2vw, 1.125rem);
          line-height: 1.65;
          color: var(--exp-text-2);
        }

        /* Timeline list */
        .exp-list { list-style: none; margin: 0; padding: 0; }

        .exp-row {
          position: relative;
          display: grid;
          grid-template-columns: var(--exp-date-w) var(--exp-rail-w) minmax(0, 1fr);
          padding-bottom: var(--exp-row-gap);
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--exp-delay, 0ms),
                      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--exp-delay, 0ms);
        }
        .exp-row.is-visible { opacity: 1; transform: none; }
        .exp-row:last-child { padding-bottom: 0; }

        .exp-date-col { text-align: right; padding: 26px 20px 0 0; }
        .exp-date {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--exp-text-3);
          font-variant-numeric: tabular-nums;
        }
        .exp-date.is-active { color: var(--exp-text); }

        /* Rail */
        .exp-rail { position: relative; display: flex; justify-content: center; }
        .exp-rail::before {
          content: '';
          position: absolute;
          top: 34px;
          bottom: -6px;
          left: 50%;
          width: 2px;
          transform: translateX(-50%);
          background: linear-gradient(to bottom, var(--exp-border-strong), var(--exp-border));
          border-radius: 2px;
        }
        .exp-row:last-child .exp-rail::before {
          background: linear-gradient(to bottom, var(--exp-border-strong), transparent);
          bottom: 20%;
        }
        .exp-node {
          position: relative;
          z-index: 1;
          margin-top: 28px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--exp-bg);
          border: 2px solid var(--exp-border-strong);
          transition: border-color 0.3s, background 0.3s;
        }
        .exp-node.is-active {
          background: var(--exp-text);
          border-color: var(--exp-text);
          box-shadow: 0 0 0 4px rgba(255,255,255,0.08);
        }
        .exp-node.is-active::after {
          content: '';
          position: absolute;
          inset: -2px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.35);
          animation: exp-pulse 2.2s ease-out infinite;
        }
        @keyframes exp-pulse {
          from { transform: scale(1); opacity: 0.9; }
          to   { transform: scale(2.4); opacity: 0; }
        }

        /* Card */
        .exp-card {
          position: relative;
          min-width: 0;
          padding: 28px 30px;
          background: var(--exp-card);
          border: 1px solid var(--exp-border);
          border-radius: 18px;
          transition: background 0.3s, border-color 0.3s, transform 0.3s, box-shadow 0.3s;
        }
        .exp-card::before {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: inherit;
          background: linear-gradient(180deg, rgba(255,255,255,0.04), transparent 40%);
          pointer-events: none;
        }
        .exp-card.is-active { border-color: rgba(255,255,255,0.16); }
        .exp-card:hover {
          background: var(--exp-card-hover);
          border-color: var(--exp-border-strong);
          transform: translateY(-2px);
          box-shadow: 0 18px 40px -20px rgba(0,0,0,0.8);
        }

        .exp-mobile-date { display: none; }

        .exp-card-head { margin-bottom: 20px; }
        .exp-title-row { display: flex; flex-wrap: wrap; align-items: center; gap: 12px; margin-bottom: 10px; }
        .exp-role {
          margin: 0;
          font-size: 1.25rem;
          font-weight: 600;
          letter-spacing: -0.015em;
          color: var(--exp-text);
        }
        .exp-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 3px 10px;
          font-size: 0.75rem;
          font-weight: 500;
          border-radius: 999px;
          background: rgba(16,185,129,0.1);
          border: 1px solid rgba(16,185,129,0.25);
          color: #6ee7b7;
        }
        .exp-badge-dot {
          width: 6px; height: 6px; border-radius: 50%;
          background: var(--exp-accent);
          box-shadow: 0 0 8px var(--exp-accent);
        }

        .exp-meta { display: flex; flex-wrap: wrap; gap: 8px 18px; }
        .exp-meta-item {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          font-size: 0.9rem;
          font-weight: 500;
          color: var(--exp-text-2);
        }
        .exp-meta-item svg { color: var(--exp-text-3); flex-shrink: 0; }

        .exp-points { list-style: none; margin: 0; padding: 0; display: flex; flex-direction: column; gap: 12px; }
        .exp-point {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          font-size: 0.95rem;
          line-height: 1.65;
          color: var(--exp-text-2);
        }
        .exp-point-icon {
          flex-shrink: 0;
          display: grid;
          place-items: center;
          width: 20px; height: 20px;
          margin-top: 2px;
          border-radius: 6px;
          background: rgba(255,255,255,0.06);
          color: var(--exp-text-2);
        }

        .exp-tech { list-style: none; margin: 22px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
        .exp-chip {
          padding: 4px 11px;
          font-size: 0.78rem;
          font-weight: 500;
          border-radius: 999px;
          color: var(--exp-text-2);
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--exp-border);
        }

        /* Skeleton loader */
        .exp-sk {
          display: block;
          height: 12px;
          border-radius: 6px;
          background: linear-gradient(90deg, #1a1a1d 25%, #26262a 50%, #1a1a1d 75%);
          background-size: 200% 100%;
          animation: exp-shimmer 1.4s linear infinite;
        }
        @keyframes exp-shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
        .exp-sk-date { width: 110px; margin-left: auto; }
        .exp-sk-mobile-date { display: none; width: 120px; margin-bottom: 16px; }
        .exp-sk-title { width: 55%; height: 20px; margin-bottom: 14px; }
        .exp-sk-meta { width: 40%; margin-bottom: 26px; }
        .exp-sk-line { width: 100%; margin-bottom: 14px; }
        .exp-sk-line:last-child { margin-bottom: 0; }
        .exp-sk-line.w-90 { width: 90%; }
        .exp-sk-line.w-70 { width: 70%; }
        .exp-node-sk { background: #1f1f23; border-color: #2c2c31; }
        .exp-card-sk:hover { transform: none; box-shadow: none; background: var(--exp-card); border-color: var(--exp-border); }

        /* Error / empty */
        .exp-state {
          max-width: 460px;
          margin: 0 auto;
          padding: 40px 28px;
          text-align: center;
          background: var(--exp-card);
          border: 1px dashed var(--exp-border-strong);
          border-radius: 18px;
        }
        .exp-state h3 { margin: 0 0 8px; font-size: 1.1rem; font-weight: 600; }
        .exp-state p { margin: 0 0 20px; font-size: 0.95rem; line-height: 1.6; color: var(--exp-text-2); }
        .exp-state p:last-child { margin-bottom: 0; }
        .exp-btn {
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
        .exp-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .exp-btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

        .exp-sr-only {
          position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
          overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .exp-section { --exp-date-w: 130px; --exp-rail-w: 36px; }
          .exp-card { padding: 24px; }
        }

        /* Mobile */
        @media (max-width: 767px) {
          .exp-section { --exp-rail-w: 28px; --exp-row-gap: 28px; }
          .exp-container { padding: 0 16px; }
          .exp-row { grid-template-columns: var(--exp-rail-w) minmax(0, 1fr); }
          .exp-date-col { display: none; }
          .exp-rail::before { top: 26px; }
          .exp-node { margin-top: 22px; }
          .exp-card { padding: 20px; border-radius: 16px; }
          .exp-mobile-date {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            margin-bottom: 14px;
            font-size: 0.75rem;
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--exp-text-3);
          }
          .exp-role { font-size: 1.1rem; }
          .exp-point { font-size: 0.9rem; }
          .exp-sk-mobile-date { display: block; }
        }

        @media (max-width: 400px) {
          .exp-section { --exp-rail-w: 22px; }
          .exp-card { padding: 16px; }
          .exp-meta { flex-direction: column; gap: 8px; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .exp-row { opacity: 1; transform: none; transition: none; }
          .exp-node.is-active::after, .exp-sk { animation: none; }
          .exp-card, .exp-btn { transition: none; }
          .exp-card:hover, .exp-btn:hover { transform: none; }
        }
      `}</style>
    </section>
  );
};

export default Experience;