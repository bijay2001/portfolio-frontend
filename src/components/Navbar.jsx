// src/components/Navbar.jsx  (REPLACE your Navbar / Header file with this)
import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Download, Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import { GitHubIcon, LinkedInIcon } from './BrandIcons';
import './Navbar.css';

const NAV = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
];
const LINKS = {
  github: 'https://github.com/bijay2001',
  linkedin: 'https://www.linkedin.com/in/bijay-kumar-behera/',
  resume: '/Bijay_Kumar_Behera_FullStackDeveloper.pdf',
};

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('');
  const [scrolled, setScrolled] = useState(false);

  // Scroll-spy (sections render after API data loads, so look them up on every frame)
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        setScrolled(window.scrollY > 24);
        let current = '';
        for (const n of NAV) {
          const el = document.getElementById(n.id);
          if (el && el.getBoundingClientRect().top <= 160) current = n.id;
        }
        setActive(current);
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => { window.removeEventListener('scroll', onScroll); cancelAnimationFrame(raf); };
  }, []);

  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  const go = (e, id) => {
    const el = document.getElementById(id);
    if (!el) return;
    e.preventDefault();
    el.scrollIntoView({ behavior: 'smooth' });
    setOpen(false);
  };
  const top = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); setOpen(false); };

  return (
    <header className={`bk-nav${scrolled ? ' is-scrolled' : ''}`}>
      <div className="bk-nav__bar">
        <button type="button" className="bk-nav__brand" onClick={top} aria-label="Back to top">
          <span className="bk-nav__logo">BK</span>
          <span className="bk-nav__name">Bijay Kumar Behera</span>
        </button>

        <nav aria-label="Primary">
          <ul className="bk-nav__links">
            {NAV.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={(e) => go(e, n.id)}
                  className={`bk-nav__link${active === n.id ? ' is-active' : ''}`}
                  aria-current={active === n.id ? 'true' : undefined}
                >
                  {active === n.id && (
                    <motion.span layoutId="bk-nav-pill" className="bk-nav__pill" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />
                  )}
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="bk-nav__actions">
          <a className="bk-icon-btn bk-nav__social" href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHubIcon /></a>
          <a className="bk-icon-btn bk-nav__social" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
          <ThemeToggle />
          <a className="bk-btn bk-btn--primary bk-btn--sm bk-nav__resume" href={LINKS.resume} download>
            <Download size={15} /> Resume
          </a>
          <button type="button" className="bk-icon-btn bk-nav__burger" onClick={() => setOpen((o) => !o)} aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="bk-nav__panel"
            initial={{ opacity: 0, y: -10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.98 }}
            transition={{ duration: 0.22 }}
          >
            {NAV.map((n) => (
              <a key={n.id} href={`#${n.id}`} onClick={(e) => go(e, n.id)} className={`bk-nav__mlink${active === n.id ? ' is-active' : ''}`}>{n.label}</a>
            ))}
            <div className="bk-nav__mfoot">
              <a className="bk-icon-btn" href={LINKS.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub"><GitHubIcon /></a>
              <a className="bk-icon-btn" href={LINKS.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn"><LinkedInIcon /></a>
              <a className="bk-btn bk-btn--primary bk-btn--sm" href={LINKS.resume} download><Download size={15} /> Resume</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}