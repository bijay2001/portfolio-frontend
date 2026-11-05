// src/components/Skills.jsx
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Code2, Monitor, Server, Database, Cloud, Cpu, Sparkles } from 'lucide-react';
import api from '../api/axiosClient';

const CORE_STACK = ['JavaScript (ES6+)', 'React.js', 'Node.js', 'PHP', 'MySQL'];

const CATEGORY_CONFIG = {
  Languages: { title: 'Languages', desc: 'Core languages and syntax.', Icon: Code2, color: '#8b6cff' },
  Frontend: { title: 'Frontend', desc: 'Client-side UI architecture.', Icon: Monitor, color: '#22d3ee' },
  Backend: { title: 'Backend', desc: 'Server-side logic and APIs.', Icon: Server, color: '#f472b6' },
  Database: { title: 'Data & Architecture', desc: 'Schema design and query optimization.', Icon: Database, color: '#10b981' },
  'Tools & Cloud': { title: 'Tools & Cloud', desc: 'DevOps and workflow platforms.', Icon: Cloud, color: '#f59e0b' },
};

const FALLBACK_SKILLS = [
  { name: 'JavaScript (ES6+)', category: 'Languages', is_core: true },
  { name: 'TypeScript', category: 'Languages' },
  { name: 'PHP', category: 'Languages', is_core: true },
  { name: 'SQL', category: 'Languages' },
  { name: 'React.js', category: 'Frontend', is_core: true },
  { name: 'HTML5 & CSS3', category: 'Frontend' },
  { name: 'Bootstrap / Tailwind', category: 'Frontend' },
  { name: 'Framer Motion', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend', is_core: true },
  { name: 'Express.js', category: 'Backend' },
  { name: 'RESTful APIs', category: 'Backend' },
  { name: 'JWT Auth', category: 'Backend' },
  { name: 'MySQL', category: 'Database', is_core: true },
  { name: 'Database Design', category: 'Database' },
  { name: 'Git & GitHub', category: 'Tools & Cloud' },
  { name: 'Vercel / Render', category: 'Tools & Cloud' },
  { name: 'Gemini AI API', category: 'Tools & Cloud' },
];

const coreSet = new Set(CORE_STACK.map((s) => s.toLowerCase()));

const normalize = (item) => {
  const name = String(item.name || '').trim();
  return {
    name,
    category: String(item.category || 'Other').trim() || 'Other',
    isCore: Boolean(item.is_core) || coreSet.has(name.toLowerCase()),
  };
};

export default function Skills() {
  const [skills, setSkills] = useState(() => FALLBACK_SKILLS.map(normalize));

  const load = useCallback(async () => {
    try {
      const res = await api.get('/skills');
      if (res?.data?.status === 'success' && Array.isArray(res.data.data) && res.data.data.length > 0) {
        setSkills(res.data.data.map(normalize).filter((s) => s.name));
      }
    } catch {}
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const categories = useMemo(() => {
    const order = Object.keys(CATEGORY_CONFIG);
    const map = new Map();
    skills.forEach((s) => {
      if (!s.name) return;
      if (!map.has(s.category)) map.set(s.category, []);
      map.get(s.category).push(s);
    });
    return [...map.entries()]
      .sort(([a], [b]) => {
        const ia = order.indexOf(a);
        const ib = order.indexOf(b);
        if (ia !== -1 && ib !== -1) return ia - ib;
        if (ia !== -1) return -1;
        if (ib !== -1) return 1;
        return a.localeCompare(b);
      })
      .map(([id, list]) => ({
        id,
        list,
        title: id,
        desc: '',
        Icon: Cpu,
        color: '#8b6cff',
        ...(CATEGORY_CONFIG[id] || {}),
      }));
  }, [skills]);

  const coreSkills = useMemo(() => {
    const seen = new Set();
    return skills.filter((s) => {
      if (!s.isCore || seen.has(s.name)) return false;
      seen.add(s.name);
      return true;
    });
  }, [skills]);

  return (
    <section id="skills" className="bk-section">
      <div className="bk-container">
        <div className="bk-sec-head">
          <span className="bk-pill-eyebrow">
            <Sparkles size={14} /> Technical Expertise
          </span>
          <h2 className="bk-title">
            My <span className="bk-grad-text">Tech Stack.</span>
          </h2>
          <p className="bk-lead">
            Technologies I use to architect scalable, secure, and responsive digital products.
          </p>
        </div>

        {coreSkills.length > 0 && (
          <div className="bk-card bk-skl-core">
            <div className="bk-skl-core-lbl">
              <Cpu size={18} style={{ color: 'var(--primary)' }} />
              <span>Primary Stack</span>
            </div>
            <div className="bk-skl-core-list">
              {coreSkills.map((s) => (
                <span key={s.name} className="bk-skl-core-chip">
                  {s.name}
                </span>
              ))}
            </div>
          </div>
        )}

        <div className="bk-skl-grid">
          {categories.map((cat) => {
            const IconComp = cat.Icon;
            return (
              <div key={cat.id} className="bk-card bk-skl-card" style={{ '--cat-accent': cat.color }}>
                <div>
                  <div className="bk-skl-head">
                    <span className="bk-skl-ico">
                      <IconComp size={20} />
                    </span>
                    <h3 className="bk-skl-title">{cat.title}</h3>
                    <span className="bk-skl-count">{cat.list.length}</span>
                  </div>
                  {cat.desc && <p className="bk-skl-desc">{cat.desc}</p>}
                </div>

                <div className="bk-skl-pills">
                  {cat.list.map((skill) => (
                    <span key={skill.name} className={`bk-skl-pill ${skill.isCore ? 'is-core' : ''}`}>
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style>{`
        .bk-skl-core {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 14px 22px;
          padding: 18px 24px;
          margin-bottom: 22px;
        }
        .bk-skl-core-lbl {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          font-weight: 700;
          font-size: 0.9rem;
          padding-right: 20px;
          border-right: 1px solid var(--line-strong);
        }
        .bk-skl-core-list {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }
        .bk-skl-core-chip {
          padding: 5px 13px;
          border-radius: 999px;
          font-size: 0.83rem;
          font-weight: 600;
          background: var(--surface-2);
          border: 1px solid var(--line-strong);
          color: var(--text);
        }
        .bk-skl-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
          gap: 20px;
        }
        .bk-skl-card {
          padding: 28px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 24px;
        }
        .bk-skl-head {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 10px;
        }
        .bk-skl-ico {
          width: 40px;
          height: 40px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: color-mix(in srgb, var(--cat-accent) 14%, transparent);
          color: var(--cat-accent);
          border: 1px solid color-mix(in srgb, var(--cat-accent) 30%, transparent);
        }
        .bk-skl-title {
          flex: 1;
          font-size: 1.15rem;
          font-weight: 700;
          margin: 0;
        }
        .bk-skl-count {
          font-size: 0.75rem;
          font-weight: 600;
          padding: 2px 9px;
          border-radius: 999px;
          color: var(--muted);
          border: 1px solid var(--line);
        }
        .bk-skl-desc {
          font-size: 0.88rem;
          color: var(--muted);
          margin: 0;
        }
        .bk-skl-pills {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        .bk-skl-pill {
          padding: 7px 13px;
          border-radius: 10px;
          font-size: 0.84rem;
          font-weight: 500;
          color: var(--muted);
          background: var(--surface-2);
          border: 1px solid var(--line);
          transition: all 0.2s ease;
        }
        .bk-skl-pill:hover {
          color: var(--text);
          border-color: var(--cat-accent);
        }
        .bk-skl-pill.is-core {
          color: var(--text);
          font-weight: 600;
          border-color: color-mix(in srgb, var(--cat-accent) 45%, var(--line-strong));
        }
        @media (max-width: 640px) {
          .bk-skl-core-lbl {
            border-right: 0;
            padding-right: 0;
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}