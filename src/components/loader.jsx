// src/components/Loader.jsx  (NEW FILE) - intro loading screen
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './loader.css';

const C = 2 * Math.PI * 54; // ring circumference
const DURATION = 1700;      // ms

export default function Loader({ onDone }) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    let raf = 0;
    let timer = 0;
    const start = performance.now();

    const tick = (now) => {
      const t = Math.min((now - start) / (reduce ? 1 : DURATION), 1);
      setPct(Math.round((1 - Math.pow(1 - t, 3)) * 100));
      if (t < 1) raf = requestAnimationFrame(tick);
      else timer = window.setTimeout(onDone, reduce ? 0 : 280);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      document.body.style.overflow = '';
    };
  }, [onDone]);

  return (
    <motion.div
      className="bk-loader"
      role="status"
      aria-label="Loading portfolio"
      exit={{ y: '-100%' }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
    >
      <div className="bk-loader__inner">
        <div className="bk-loader__ring">
          <svg viewBox="0 0 120 120">
            <defs>
              <linearGradient id="bk-ring" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="var(--primary)" />
                <stop offset="100%" stopColor="var(--secondary)" />
              </linearGradient>
            </defs>
            <circle className="bk-loader__track" cx="60" cy="60" r="54" fill="none" strokeWidth="3" />
            <circle
              cx="60" cy="60" r="54" fill="none" strokeWidth="3" strokeLinecap="round"
              stroke="url(#bk-ring)" strokeDasharray={C} strokeDashoffset={C * (1 - pct / 100)}
            />
          </svg>
          <span className="bk-loader__mono">BK</span>
        </div>

        <motion.p
          className="bk-loader__name"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Bijay Kumar Behera
        </motion.p>
        <span className="bk-loader__pct">{pct}%</span>
      </div>
    </motion.div>
  );
}