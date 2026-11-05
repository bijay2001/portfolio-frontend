// src/components/Certifications.jsx
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import {
  ExternalLink,
  Calendar,
  Shield,
  Database,
  Cloud,
  Network,
  Wifi,
  BookOpen,
  Award,
} from 'lucide-react';
import api from '../api/axiosClient';

const HexBadge = ({ color, icon: Icon, text }) => (
  <div className="bk-hex-badge" style={{ '--badge-color': color || '#8b6cff' }}>
    <svg width="64" height="82" viewBox="0 0 80 105" fill="none">
      <path
        d="M40 5 L75 25 L75 65 L40 85 L5 65 L5 25 Z"
        stroke="currentColor"
        strokeWidth="2.2"
        fill="color-mix(in srgb, currentColor 12%, transparent)"
      />
      <path d="M25 76 L25 98 L40 90 L55 98 L55 76" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
    <div className="bk-hex-inner">
      {text ? <span className="bk-hex-txt">{text}</span> : <Icon size={22} strokeWidth={1.75} />}
    </div>
  </div>
);

const FALLBACK_CERTS = [
  {
    title: 'MySQL',
    description: 'Database Design & Query Optimization',
    provider: 'GUVI',
    issue_date: '2024-02-16',
    iconType: 'database',
    color: '#A855F7',
    live_url: '#',
  },
  {
    title: 'JavaScript',
    description: 'DOM Manipulation, ES6+ Features',
    provider: 'GUVI',
    issue_date: '2024-07-16',
    iconType: 'text',
    iconText: 'JS',
    color: '#8B5CF6',
    live_url: '#',
  },
  {
    title: 'Cloud Computing',
    description: 'Fundamentals of Cloud Services',
    provider: 'NPTEL',
    issue_date: 'Jul-01-2023',
    iconType: 'cloud',
    color: '#3B82F6',
    live_url: '#',
  },
  {
    title: 'Advanced Computer Networks',
    description: 'Network architecture and protocols',
    provider: 'NPTEL',
    issue_date: 'Jan-Apr 2024',
    iconType: 'network',
    color: '#06B6D4',
    live_url: '#',
  },
  {
    title: 'Industry 4.0 & Internet of Things',
    description: 'IoT architecture and smart industry standards',
    provider: 'NPTEL',
    issue_date: 'Jan-Apr 2024',
    iconType: 'wifi',
    color: '#3B82F6',
    live_url: '#',
  },
  {
    title: 'IBM English Assessment',
    description: 'CIC Off-Campus Recruitment Process',
    provider: 'IBM',
    issue_date: 'Apr-2026',
    iconType: 'text',
    iconText: 'EN',
    color: '#EC4899',
    live_url: '#',
  },
];

export default function Certifications() {
  const [certs, setCerts] = useState(FALLBACK_CERTS);

  useEffect(() => {
    let active = true;
    api
      .get('/certifications')
      .then((res) => {
        if (active && res.data?.status === 'success' && Array.isArray(res.data.data) && res.data.data.length > 0) {
          setCerts(res.data.data);
        }
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, []);

  const getIcon = (type) => {
    switch (type) {
      case 'database':
        return Database;
      case 'cloud':
        return Cloud;
      case 'network':
        return Network;
      case 'wifi':
        return Wifi;
      default:
        return BookOpen;
    }
  };

  return (
    <section id="certifications" className="bk-section">
      <div className="bk-container">
        <div className="bk-sec-head">
          <span className="bk-pill-eyebrow">
            <Award size={14} /> Credentials
          </span>
          <h2 className="bk-title">
            Professional <span className="bk-grad-text">Certifications.</span>
          </h2>
          <p className="bk-lead">
            Validating my expertise and continuous learning through recognized industry authorities.
          </p>
        </div>

        <div className="bk-cert-grid">
          {certs.map((cert, index) => (
            <motion.article
              key={index}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="bk-card bk-cert-card"
              style={{ '--cert-color': cert.color || 'var(--primary)' }}
            >
              <div className="bk-cert-top">
                <div>
                  <div className="bk-cert-date">
                    <Calendar size={13} />
                    <span>{cert.issue_date}</span>
                  </div>
                  <h3 className="bk-cert-title">{cert.title}</h3>
                  <p className="bk-cert-desc">{cert.description}</p>
                </div>
                <HexBadge color={cert.color} icon={getIcon(cert.iconType)} text={cert.iconText} />
              </div>

              <div className="bk-cert-foot">
                <span className="bk-cert-provider">
                  <Shield size={14} /> {cert.provider}
                </span>
                <a
                  href={cert.live_url || '#'}
                  target="_blank"
                  rel="noreferrer"
                  className="bk-cert-link"
                >
                  <span>View Credential</span>
                  <ExternalLink size={13} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      <style>{`
        .bk-cert-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 320px), 1fr));
          gap: 20px;
        }
        .bk-cert-card {
          padding: 26px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 22px;
        }
        .bk-cert-card:hover {
          border-color: color-mix(in srgb, var(--cert-color) 55%, var(--line-strong));
        }
        .bk-cert-top {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          gap: 14px;
        }
        .bk-cert-date {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.76rem;
          font-weight: 600;
          color: var(--muted);
          margin-bottom: 10px;
        }
        .bk-cert-title {
          font-size: 1.18rem;
          font-weight: 700;
          margin-bottom: 6px;
        }
        .bk-cert-desc {
          font-size: 0.88rem;
          color: var(--muted);
          margin: 0;
        }
        .bk-hex-badge {
          position: relative;
          width: 64px;
          height: 82px;
          color: var(--badge-color);
          flex-shrink: 0;
        }
        .bk-hex-inner {
          position: absolute;
          top: 36px;
          left: 50%;
          transform: translate(-50%, -50%);
          display: grid;
          place-items: center;
        }
        .bk-hex-txt {
          font-family: ui-monospace, SFMono-Regular, Menlo, monospace;
          font-weight: 800;
          font-size: 1.05rem;
        }
        .bk-cert-foot {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding-top: 16px;
          border-top: 1px solid var(--line);
        }
        .bk-cert-provider {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 700;
          color: var(--cert-color);
        }
        .bk-cert-link {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--muted);
        }
        .bk-cert-link:hover {
          color: var(--text);
        }
      `}</style>
    </section>
  );
}