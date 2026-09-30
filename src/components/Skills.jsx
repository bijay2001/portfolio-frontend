import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import api from '../api/axiosClient';

/* ---------- Inline icons (no external icon library) ---------- */
const Icon = ({ children, size = 20, ...props }) => (
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

const CodeIcon = (p) => (
  <Icon {...p}>
    <path d="m16 18 6-6-6-6M8 6l-6 6 6 6" />
  </Icon>
);
const MonitorIcon = (p) => (
  <Icon {...p}>
    <rect x="2" y="3" width="20" height="14" rx="2" />
    <path d="M8 21h8M12 17v4" />
  </Icon>
);
const ServerIcon = (p) => (
  <Icon {...p}>
    <rect x="2" y="2" width="20" height="8" rx="2" />
    <rect x="2" y="14" width="20" height="8" rx="2" />
    <path d="M6 6h.01M6 18h.01" />
  </Icon>
);
const DatabaseIcon = (p) => (
  <Icon {...p}>
    <ellipse cx="12" cy="5" rx="9" ry="3" />
    <path d="M3 5v14c0 1.7 4 3 9 3s9-1.3 9-3V5" />
    <path d="M3 12c0 1.7 4 3 9 3s9-1.3 9-3" />
  </Icon>
);
const CloudIcon = (p) => (
  <Icon {...p}>
    <path d="M17.5 19H9a7 7 0 1 1 6.7-9h1.8a4.5 4.5 0 1 1 0 9Z" />
  </Icon>
);
const CpuIcon = (p) => (
  <Icon {...p}>
    <rect x="4" y="4" width="16" height="16" rx="2" />
    <rect x="9" y="9" width="6" height="6" />
    <path d="M9 1v3M15 1v3M9 20v3M15 20v3M20 9h3M20 14h3M1 9h3M1 14h3" />
  </Icon>
);
const SparklesIcon = (p) => (
  <Icon {...p}>
    <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3ZM19 3v4M21 5h-4M5 17v4M7 19H3" />
  </Icon>
);
const RefreshIcon = (p) => (
  <Icon {...p}>
    <path d="M21 12a9 9 0 1 1-3-6.7L21 8" />
    <path d="M21 3v5h-5" />
  </Icon>
);

/* ---------- Config ---------- */
const MIN_LOADER_MS = 450;

// Names highlighted as your primary stack (matched case-insensitively).
// A skill can also be flagged from the API with `is_core: true`.
const CORE_STACK = ['JavaScript (ES6+)', 'React.js', 'Node.js', 'PHP', 'MySQL'];

// Known categories: order, label, description, icon and accent color.
const CATEGORY_CONFIG = {
  Languages: { title: 'Languages', desc: 'Core languages and syntax.', Icon: CodeIcon, color: '#8b5cf6' },
  Frontend: { title: 'Frontend', desc: 'Client-side UI architecture.', Icon: MonitorIcon, color: '#06b6d4' },
  Backend: { title: 'Backend', desc: 'Server-side logic and APIs.', Icon: ServerIcon, color: '#ec4899' },
  Database: { title: 'Data & Architecture', desc: 'Schema design and query optimization.', Icon: DatabaseIcon, color: '#10b981' },
  'Tools & Cloud': { title: 'Tools & Cloud', desc: 'DevOps and workflow platforms.', Icon: CloudIcon, color: '#f59e0b' },
};
const DEFAULT_CATEGORY = { desc: '', Icon: CpuIcon, color: '#a1a1aa' };
const CATEGORY_ORDER = Object.keys(CATEGORY_CONFIG);

/* ---------- Helpers ---------- */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const coreSet = new Set(CORE_STACK.map((s) => s.toLowerCase()));

const normalize = (item) => {
  const name = String(item.name || '').trim();
  return {
    name,
    category: String(item.category || 'Other').trim() || 'Other',
    isCore: Boolean(item.is_core) || coreSet.has(name.toLowerCase()),
  };
};

const groupSkills = (skills) => {
  const map = new Map();
  skills.forEach((s) => {
    if (!s.name) return;
    if (!map.has(s.category)) map.set(s.category, []);
    map.get(s.category).push(s);
  });
  // Known categories first (in design order), unknown ones after, alphabetically
  return [...map.entries()]
    .sort(([a], [b]) => {
      const ia = CATEGORY_ORDER.indexOf(a);
      const ib = CATEGORY_ORDER.indexOf(b);
      if (ia !== -1 && ib !== -1) return ia - ib;
      if (ia !== -1) return -1;
      if (ib !== -1) return 1;
      return a.localeCompare(b);
    })
    .map(([id, list]) => ({ id, list, ...DEFAULT_CATEGORY, title: id, ...(CATEGORY_CONFIG[id] || {}) }));
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
const CategoryCard = ({ category, index }) => {
  const [ref, visible] = useReveal();
  const { Icon: CategoryIcon } = category;

  return (
    <section
      ref={ref}
      className={`skl-card ${visible ? 'is-visible' : ''}`}
      style={{ '--skl-accent': category.color, '--skl-delay': `${Math.min(index % 3, 2) * 80}ms` }}
      aria-label={category.title}
    >
      <div className="skl-card-top">
        <div className="skl-card-head">
          <span className="skl-icon">
            <CategoryIcon size={20} />
          </span>
          <h3 className="skl-card-title">{category.title}</h3>
          <span className="skl-count" aria-label={`${category.list.length} skills`}>
            {category.list.length}
          </span>
        </div>
        {category.desc && <p className="skl-card-desc">{category.desc}</p>}
      </div>

      <ul className="skl-pills">
        {category.list.map((skill) => (
          <li key={skill.name} className={`skl-pill ${skill.isCore ? 'is-core' : ''}`}>
            {skill.name}
          </li>
        ))}
      </ul>
    </section>
  );
};

const SkeletonCard = () => (
  <div className="skl-card skl-card-sk is-visible" aria-hidden="true">
    <div className="skl-card-top">
      <div className="skl-card-head">
        <span className="skl-sk skl-sk-icon" />
        <span className="skl-sk skl-sk-title" />
      </div>
      <span className="skl-sk skl-sk-desc" />
    </div>
    <div className="skl-pills">
      {[72, 96, 64, 84, 70, 90].map((w, i) => (
        <span key={i} className="skl-sk skl-sk-pill" style={{ width: w }} />
      ))}
    </div>
  </div>
);

/* ---------- Main component ---------- */
const Skills = () => {
  const [skills, setSkills] = useState([]);
  const [status, setStatus] = useState('loading'); // loading | success | error
  const [attempt, setAttempt] = useState(0);

  const load = useCallback(async (signal) => {
    setStatus('loading');
    try {
      const [res] = await Promise.all([api.get('/skills', { signal }), wait(MIN_LOADER_MS)]);
      const list = res?.data?.status === 'success' && Array.isArray(res.data.data) ? res.data.data : null;
      if (!list) throw new Error('Unexpected response');
      setSkills(list.map(normalize).filter((s) => s.name));
      setStatus('success');
    } catch (error) {
      if (error?.code === 'ERR_CANCELED' || error?.name === 'CanceledError' || error?.name === 'AbortError') return;
      console.error('Skills fetch failed:', error);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    load(controller.signal);
    return () => controller.abort();
  }, [load, attempt]);

  const categories = useMemo(() => groupSkills(skills), [skills]);
  const coreSkills = useMemo(() => {
    const seen = new Set();
    return skills.filter((s) => {
      if (!s.isCore || seen.has(s.name)) return false;
      seen.add(s.name);
      return true;
    });
  }, [skills]);

  return (
    <section id="skills" className="skl-section" aria-labelledby="skl-heading" aria-busy={status === 'loading'}>
      <div className="skl-container">
        <header className="skl-header">
          <span className="skl-eyebrow">
            <SparklesIcon size={15} />
            Technical Expertise
          </span>
          <h2 id="skl-heading" className="skl-title">
            My Tech Stack
          </h2>
          <p className="skl-lead">
            A curated set of technologies I use to build scalable, secure, and high-performance digital experiences.
          </p>
        </header>

        {status === 'loading' && (
          <>
            <p className="skl-sr-only" role="status">
              Loading skills
            </p>
            <div className="skl-core skl-core-sk" aria-hidden="true">
              <span className="skl-sk skl-sk-core-label" />
              <span className="skl-sk skl-sk-core-line" />
            </div>
            <div className="skl-grid">
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </div>
          </>
        )}

        {status === 'error' && (
          <div className="skl-state" role="alert">
            <h3>Couldn't load skills</h3>
            <p>Something went wrong while fetching the data. Check your connection and try again.</p>
            <button type="button" className="skl-btn" onClick={() => setAttempt((n) => n + 1)}>
              <RefreshIcon size={15} /> Try again
            </button>
          </div>
        )}

        {status === 'success' && categories.length === 0 && (
          <div className="skl-state">
            <h3>No skills added yet</h3>
            <p>Check back soon.</p>
          </div>
        )}

        {status === 'success' && categories.length > 0 && (
          <>
            {coreSkills.length > 0 && (
              <div className="skl-core">
                <div className="skl-core-label">
                  <CpuIcon size={18} />
                  <span>Core Stack</span>
                </div>
                <ul className="skl-core-list">
                  {coreSkills.map((s) => (
                    <li key={s.name} className="skl-core-item">
                      {s.name}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="skl-grid">
              {categories.map((category, index) => (
                <CategoryCard key={category.id} category={category} index={index} />
              ))}
            </div>
          </>
        )}
      </div>

      <style>{`
        .skl-section {
          --skl-bg: #0a0a0b;
          --skl-card: #111113;
          --skl-card-hover: #161618;
          --skl-border: #27272a;
          --skl-border-strong: #3f3f46;
          --skl-text: #fafafa;
          --skl-text-2: #a1a1aa;
          --skl-text-3: #71717a;

          position: relative;
          width: 100%;
          box-sizing: border-box;
          background: var(--skl-bg);
          color: var(--skl-text);
          font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
          padding: clamp(48px, 6vw, 80px) 0;
          overflow: hidden;
        }
        .skl-section *, .skl-section *::before, .skl-section *::after { box-sizing: border-box; }

        .skl-section::before {
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

        .skl-container {
          position: relative;
          width: 100%;
          max-width: 1120px;
          margin: 0 auto;
          padding: 0 24px;
        }

        /* Header */
        .skl-header {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          gap: 14px;
          margin: 0 auto clamp(40px, 6vw, 64px);
        }
        .skl-eyebrow {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 6px 14px;
          font-size: 0.75rem;
          font-weight: 600;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: var(--skl-text-2);
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--skl-border);
          border-radius: 999px;
        }
        .skl-title {
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
        .skl-lead {
          margin: 0;
          max-width: 540px;
          font-size: clamp(1rem, 2vw, 1.125rem);
          line-height: 1.65;
          color: var(--skl-text-2);
        }

        /* Core stack strip */
        .skl-core {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 24px;
          padding: 16px 24px;
          background: var(--skl-card);
          border: 1px solid var(--skl-border);
          border-radius: 16px;
        }
        .skl-core-label {
          display: flex;
          align-items: center;
          flex-shrink: 0;
          gap: 8px;
          padding-right: 24px;
          font-size: 0.9rem;
          font-weight: 600;
          border-right: 1px solid var(--skl-border);
        }
        .skl-core-list {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-wrap: wrap;
          gap: 8px 20px;
        }
        .skl-core-item {
          position: relative;
          font-size: 0.92rem;
          font-weight: 500;
          color: var(--skl-text-2);
        }
        .skl-core-item + .skl-core-item::before {
          content: '';
          position: absolute;
          left: -11px;
          top: 50%;
          width: 3px;
          height: 3px;
          margin-top: -1.5px;
          border-radius: 50%;
          background: var(--skl-border-strong);
        }

        /* Grid */
        .skl-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
          gap: 20px;
        }

        /* Category card */
        .skl-card {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 28px;
          min-width: 0;
          padding: 28px;
          background: var(--skl-card);
          border: 1px solid var(--skl-border);
          border-radius: 18px;
          opacity: 0;
          transform: translateY(18px);
          transition: opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--skl-delay, 0ms),
                      transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) var(--skl-delay, 0ms),
                      background 0.3s, border-color 0.3s;
        }
        .skl-card.is-visible { opacity: 1; transform: none; }
        .skl-card:not(.skl-card-sk):hover {
          background: var(--skl-card-hover);
          border-color: var(--skl-border-strong);
          transform: translateY(-3px);
        }

        .skl-card-head { display: flex; align-items: center; gap: 14px; margin-bottom: 12px; }
        .skl-icon {
          display: grid;
          place-items: center;
          flex-shrink: 0;
          width: 40px;
          height: 40px;
          color: var(--skl-text-2);
          background: rgba(255,255,255,0.04);
          border: 1px solid var(--skl-border);
          border-radius: 11px;
          transition: color 0.3s, border-color 0.3s, background 0.3s;
        }
        .skl-card:hover .skl-icon {
          color: var(--skl-accent);
          border-color: color-mix(in srgb, var(--skl-accent) 45%, transparent);
          background: color-mix(in srgb, var(--skl-accent) 10%, transparent);
        }
        .skl-card-title {
          flex: 1;
          min-width: 0;
          margin: 0;
          font-size: 1.1rem;
          font-weight: 600;
          letter-spacing: -0.01em;
        }
        .skl-count {
          font-size: 0.75rem;
          font-weight: 600;
          font-variant-numeric: tabular-nums;
          color: var(--skl-text-3);
          padding: 2px 8px;
          border: 1px solid var(--skl-border);
          border-radius: 999px;
        }
        .skl-card-desc { margin: 0; font-size: 0.875rem; line-height: 1.55; color: var(--skl-text-2); }

        .skl-pills { list-style: none; margin: 0; padding: 0; display: flex; flex-wrap: wrap; gap: 8px; }
        .skl-pill {
          padding: 7px 13px;
          font-size: 0.85rem;
          font-weight: 500;
          color: var(--skl-text-2);
          background: rgba(255,255,255,0.03);
          border: 1px solid var(--skl-border);
          border-radius: 9px;
          transition: color 0.2s, border-color 0.2s, background 0.2s;
        }
        .skl-pill:hover {
          color: var(--skl-text);
          background: rgba(255,255,255,0.07);
          border-color: color-mix(in srgb, var(--skl-accent) 55%, var(--skl-border-strong));
        }
        .skl-pill.is-core {
          color: var(--skl-text);
          background: rgba(255,255,255,0.08);
          border-color: var(--skl-border-strong);
        }

        /* Skeleton */
        .skl-sk {
          display: block;
          height: 12px;
          border-radius: 6px;
          background: linear-gradient(90deg, #1a1a1d 25%, #26262a 50%, #1a1a1d 75%);
          background-size: 200% 100%;
          animation: skl-shimmer 1.4s linear infinite;
        }
        @keyframes skl-shimmer { from { background-position: 200% 0; } to { background-position: -200% 0; } }
        .skl-sk-icon { width: 40px; height: 40px; border-radius: 11px; }
        .skl-sk-title { width: 42%; height: 18px; }
        .skl-sk-desc { width: 70%; }
        .skl-sk-pill { height: 32px; border-radius: 9px; }
        .skl-sk-core-label { width: 110px; height: 16px; }
        .skl-sk-core-line { flex: 1; max-width: 420px; height: 14px; }
        .skl-core-sk { margin-bottom: 24px; }

        /* Error / empty */
        .skl-state {
          max-width: 460px;
          margin: 0 auto;
          padding: 40px 28px;
          text-align: center;
          background: var(--skl-card);
          border: 1px dashed var(--skl-border-strong);
          border-radius: 18px;
        }
        .skl-state h3 { margin: 0 0 8px; font-size: 1.1rem; font-weight: 600; }
        .skl-state p { margin: 0 0 20px; font-size: 0.95rem; line-height: 1.6; color: var(--skl-text-2); }
        .skl-state p:last-child { margin-bottom: 0; }
        .skl-btn {
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
        .skl-btn:hover { opacity: 0.9; transform: translateY(-1px); }
        .skl-btn:focus-visible { outline: 2px solid #fff; outline-offset: 3px; }

        .skl-sr-only {
          position: absolute; width: 1px; height: 1px; margin: -1px; padding: 0;
          overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0;
        }

        /* Responsive */
        @media (max-width: 767px) {
          .skl-container { padding: 0 16px; }
          .skl-core { flex-direction: column; align-items: flex-start; gap: 14px; padding: 18px 20px; }
          .skl-core-label { width: 100%; padding: 0 0 12px; border-right: 0; border-bottom: 1px solid var(--skl-border); }
          .skl-card { padding: 22px; gap: 22px; }
        }
        @media (max-width: 480px) {
          .skl-pill { padding: 6px 11px; font-size: 0.8rem; }
        }

        /* Reduced motion */
        @media (prefers-reduced-motion: reduce) {
          .skl-card { opacity: 1; transform: none; transition: none; }
          .skl-card:not(.skl-card-sk):hover { transform: none; }
          .skl-sk { animation: none; }
          .skl-btn { transition: none; }
          .skl-btn:hover { transform: none; }
        }
      `}</style>
    </section>
  );
};

export default Skills;