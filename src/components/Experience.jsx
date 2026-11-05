// src/components/Experience.jsx
import React, { useCallback, useEffect, useState } from 'react';
import { Building2, MapPin, Calendar, Check, Briefcase } from 'lucide-react';
import api from '../api/axiosClient';

const FALLBACK_EXP = [
  {
    role: 'Project Associate (NGERSS Project)',
    company: 'Centre for Development of Advanced Computing (C-DAC)',
    location: 'India',
    duration: '2026 - Present',
    description:
      'Working on the Next Generation Emergency Response Support System (NGERSS) architecture and web modules.||Developing responsive frontend interfaces, RESTful backend integrations, and high-reliability workflows.',
    tech: 'React.js, Node.js, MySQL, REST APIs',
  },
  {
    role: 'Junior Software Developer',
    company: 'Orisys Infotech Pvt Ltd',
    location: 'Bhubaneswar, Odisha',
    duration: '2024 - 2025',
    description:
      'Built and maintained full-stack web applications using React.js, Node.js, PHP, and MySQL.||Optimized SQL queries, engineered reusable UI components, and collaborated across agile sprints.',
    tech: 'React.js, Node.js, PHP, MySQL, JavaScript',
  },
];

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

export default function Experience() {
  const [items, setItems] = useState(() => FALLBACK_EXP.map(normalize));

  const load = useCallback(async () => {
    try {
      const res = await api.get('/experience');
      if (res?.data?.status === 'success' && Array.isArray(res.data.data) && res.data.data.length > 0) {
        setItems(res.data.data.map(normalize));
      }
    } catch {}
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <section id="experience" className="bk-section">
      <div className="bk-container">
        <div className="bk-sec-head">
          <span className="bk-pill-eyebrow">
            <Briefcase size={14} /> Career Journey
          </span>
          <h2 className="bk-title">
            Professional <span className="bk-grad-text">Experience.</span>
          </h2>
          <p className="bk-lead">
            A timeline of my engineering roles, technical contributions, and production deployments.
          </p>
        </div>

        <ol className="bk-exp-list">
          {items.map((job, idx) => (
            <li key={idx} className="bk-exp-item">
              <div className="bk-exp-date-col">
                <time className={`bk-exp-date ${job.isCurrent ? 'is-live' : ''}`}>{job.duration}</time>
              </div>

              <div className="bk-exp-rail" aria-hidden="true">
                <span className={`bk-exp-node ${job.isCurrent ? 'is-live' : ''}`} />
              </div>

              <article className="bk-card bk-exp-card">
                <div className="bk-exp-mdate">
                  <Calendar size={13} />
                  <time>{job.duration}</time>
                </div>

                <div className="bk-exp-top">
                  <h3 className="bk-exp-role">{job.role}</h3>
                  {job.isCurrent && (
                    <span className="bk-exp-badge">
                      <span className="bk-exp-badge-dot" /> Current
                    </span>
                  )}
                </div>

                <div className="bk-exp-meta">
                  {job.company && (
                    <span>
                      <Building2 size={15} /> {job.company}
                    </span>
                  )}
                  {job.location && (
                    <span>
                      <MapPin size={15} /> {job.location}
                    </span>
                  )}
                </div>

                {job.points.length > 0 && (
                  <ul className="bk-exp-points">
                    {job.points.map((pt, i) => (
                      <li key={i}>
                        <span className="bk-exp-chk">
                          <Check size={12} />
                        </span>
                        <span>{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}

                {job.tech.length > 0 && (
                  <div className="bk-exp-chips">
                    {job.tech.map((t) => (
                      <span key={t} className="bk-exp-chip">
                        {t}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </li>
          ))}
        </ol>
      </div>

      <style>{`
        .bk-exp-list {
          list-style: none;
          margin: 0 auto;
          padding: 0;
          max-width: 980px;
        }
        .bk-exp-item {
          display: grid;
          grid-template-columns: 160px 40px minmax(0, 1fr);
          padding-bottom: 32px;
        }
        .bk-exp-item:last-child {
          padding-bottom: 0;
        }
        .bk-exp-date-col {
          text-align: right;
          padding: 24px 16px 0 0;
        }
        .bk-exp-date {
          font-size: 0.85rem;
          font-weight: 600;
          color: var(--muted);
        }
        .bk-exp-date.is-live {
          color: var(--secondary);
        }
        .bk-exp-rail {
          position: relative;
          display: flex;
          justify-content: center;
        }
        .bk-exp-rail::before {
          content: '';
          position: absolute;
          top: 30px;
          bottom: -10px;
          width: 2px;
          background: var(--line-strong);
        }
        .bk-exp-item:last-child .bk-exp-rail::before {
          display: none;
        }
        .bk-exp-node {
          position: relative;
          z-index: 1;
          margin-top: 26px;
          width: 14px;
          height: 14px;
          border-radius: 50%;
          background: var(--bg);
          border: 2px solid var(--line-strong);
        }
        .bk-exp-node.is-live {
          background: #10b981;
          border-color: #10b981;
          box-shadow: 0 0 0 5px rgba(16, 185, 129, 0.2);
        }
        .bk-exp-card {
          padding: 28px;
        }
        .bk-exp-mdate {
          display: none;
        }
        .bk-exp-top {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
          margin-bottom: 10px;
        }
        .bk-exp-role {
          font-size: 1.22rem;
          font-weight: 700;
          margin: 0;
        }
        .bk-exp-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 4px 11px;
          border-radius: 999px;
          font-size: 0.74rem;
          font-weight: 600;
          color: #10b981;
          background: rgba(16, 185, 129, 0.12);
          border: 1px solid rgba(16, 185, 129, 0.3);
        }
        .bk-exp-badge-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
        }
        .bk-exp-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 16px;
          font-size: 0.88rem;
          color: var(--muted);
          margin-bottom: 18px;
        }
        .bk-exp-meta span {
          display: inline-flex;
          align-items: center;
          gap: 6px;
        }
        .bk-exp-points {
          list-style: none;
          margin: 0;
          padding: 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .bk-exp-points li {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          font-size: 0.94rem;
          line-height: 1.65;
          color: var(--muted);
        }
        .bk-exp-chk {
          width: 20px;
          height: 20px;
          margin-top: 2px;
          border-radius: 6px;
          display: grid;
          place-items: center;
          background: var(--surface-2);
          color: var(--primary);
          flex-shrink: 0;
        }
        .bk-exp-chips {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
          margin-top: 20px;
        }
        .bk-exp-chip {
          padding: 4px 11px;
          border-radius: 999px;
          font-size: 0.76rem;
          font-weight: 500;
          color: var(--muted);
          background: var(--surface-2);
          border: 1px solid var(--line);
        }
        @media (max-width: 767px) {
          .bk-exp-item {
            grid-template-columns: 28px minmax(0, 1fr);
          }
          .bk-exp-date-col {
            display: none;
          }
          .bk-exp-mdate {
            display: inline-flex;
            align-items: center;
            gap: 6px;
            font-size: 0.76rem;
            font-weight: 600;
            color: var(--secondary);
            margin-bottom: 8px;
          }
        }
      `}</style>
    </section>
  );
}