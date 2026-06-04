import React, { useEffect, useState, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { ExternalLink, Code2, Lock } from "lucide-react";
import api from "../api/axiosClient";

/* ─── Utilities ─────────────────────────────────────────────────── */
const pad = (n) => String(n + 1).padStart(2, "0");

const getImageUrl = (path) => {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  
  const clean = path.replace(/^\.?\//, "");
  
  return `/${clean}`;
};

/* ─── 3-D Tilt Hook ─────────────────────────────────────────────── */
const useTilt = () => {
  const ref = useRef(null);
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [5, -5]), {
    stiffness: 300,
    damping: 40,
  });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-5, 5]), {
    stiffness: 300,
    damping: 40,
  });
  const onMouseMove = (e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set((e.clientX - r.left) / r.width - 0.5);
    rawY.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onMouseLeave = () => { rawX.set(0); rawY.set(0); };
  return { ref, rotateX, rotateY, onMouseMove, onMouseLeave };
};

/* ─── Project Card ──────────────────────────────────────────────── */
const ProjectCard = ({ proj, index }) => {
  const tilt = useTilt();
  const imgUrl = getImageUrl(proj.image_url);
  const techs = proj.technologies?.split(",") ?? [];

  return (
    <motion.article
      ref={tilt.ref}
      onMouseMove={tilt.onMouseMove}
      onMouseLeave={tilt.onMouseLeave}
      style={{ rotateX: tilt.rotateX, rotateY: tilt.rotateY }}
      className="pc"
      initial={{ opacity: 0, y: 36 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: (index % 3) * 0.09,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {/* ── Image ── */}
      <div className="pc__img-wrap">
        {imgUrl ? (
          <img src={imgUrl} alt={proj.title} className="pc__img" />
        ) : (
          <div className="no-img">
            <Code2 size={32} strokeWidth={1.1} />
          </div>
        )}
        <span className="pc__num">{pad(index)}</span>
        <div className="pc__img-scrim" />
      </div>

      {/* ── Body ── */}
      <div className="pc__body">
        <h4 className="pc__title">{proj.title}</h4>
        <p className="pc__desc">{proj.description}</p>

        <div className="chips">
          {techs.slice(0, 4).map((t, i) => (
            <motion.span
              key={i}
              className="chip"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 + i * 0.05, duration: 0.28 }}
            >
              {t.trim()}
            </motion.span>
          ))}
        </div>

        <div className="pc__footer">
          {proj.link ? (
            <a
              href={proj.link}
              target="_blank"
              rel="noreferrer"
              className="ghost-btn"
            >
              <ExternalLink size={12} strokeWidth={2.2} />
              Live Demo
            </a>
          ) : (
            <span className="ghost-btn ghost-btn--muted">
              <Lock size={11} strokeWidth={2.2} />
              Internal Project
            </span>
          )}
        </div>
      </div>
    </motion.article>
  );
};

/* ─── Projects Section ──────────────────────────────────────────── */
const Projects = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await api.get("/projects");
        if (res.data?.status === "success") setProjects(res.data.data);
      } catch (err) {
        console.error("Error fetching projects:", err);
      }
    };
    fetchProjects();
  }, []);

  return (
    <section id="projects" className="ps">
      <style>{CSS}</style>

      {/* Ambient background orbs */}
      <div className="ps__orb ps__orb--1" />
      <div className="ps__orb ps__orb--2" />
      <div className="ps__orb ps__orb--3" />

      <div className="container position-relative" style={{ zIndex: 1 }}>

        {/* ── Section Header ── */}
        <motion.header
          className="ps__header"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="ps__heading">
            My{" "}
            <span className="ps__heading-em">Projects</span>
          </h2>
          <p className="ps__sub">
            Real-world solutions built with precision and purpose.
          </p>
        </motion.header>

        {/* ── Compact Grid ── */}
        <div className="ps__grid">
          {projects.map((proj, i) => (
            <ProjectCard key={i} proj={proj} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
};

/* ─── Styles ────────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=Plus+Jakarta+Sans:ital,opsz,wght@0,6..30,300;0,6..30,400;0,6..30,500;1,6..30,400&display=swap');

/* ── Tokens ────────────────────────────────────── */
.ps {
  --bg:     #06070D;
  --surf:   rgba(255,255,255,0.028);
  --surf-h: rgba(255,255,255,0.048);
  --bord:   rgba(255,255,255,0.07);
  --bord-h: rgba(129,140,248,0.5);
  --v1:     #818CF8;
  --v2:     #22D3EE;
  --glow:   rgba(99,102,241,0.18);
  --t1:     #F1F3FC;
  --t2:     rgba(241,243,252,0.5);
  --t3:     rgba(241,243,252,0.22);
  --r:      16px;
}

/* ── Section ───────────────────────────────────── */
.ps {
  position: relative;
  padding: 100px 0 120px;
  background: var(--bg);
  overflow: hidden;
  font-family: 'Plus Jakarta Sans', sans-serif;
}

/* Ambient orbs */
.ps__orb {
  position: absolute;
  border-radius: 50%;
  pointer-events: none;
  filter: blur(120px);
}
.ps__orb--1 {
  width: 650px; height: 650px;
  top: -200px; right: -180px;
  background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
}
.ps__orb--2 {
  width: 500px; height: 500px;
  bottom: -80px; left: -150px;
  background: radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%);
}
.ps__orb--3 {
  width: 380px; height: 380px;
  top: 45%; left: 40%;
  background: radial-gradient(circle, rgba(129,140,248,0.05) 0%, transparent 70%);
}

/* ── Header ────────────────────────────────────── */
.ps__header {
  text-align: center;
  margin-bottom: 52px;
}

/* ── Heading — matches Certifications style ───── */
.ps__heading {
  font-family: 'Syne', sans-serif;
  font-size: clamp(1.8rem, 3.2vw, 2.6rem);
  font-weight: 800;
  letter-spacing: -0.03em;
  line-height: 1.08;
  color: var(--t1);
  margin: 0 0 14px;
  font-style: normal;
}

/* Gradient word — NO italic, matches cert page */
.ps__heading-em {
  font-style: normal;
  font-weight: 800;
  background: linear-gradient(110deg, var(--v1) 15%, var(--v2) 80%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.ps__sub {
  font-size: 1rem;
  color: var(--t2);
  margin: 0;
  font-weight: 300;
  letter-spacing: 0.015em;
}

/* ── Compact Grid ──────────────────────────────── */
.ps__grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  perspective: 1100px;
}

/* ── Project Card ──────────────────────────────── */
.pc {
  background: var(--surf);
  border: 1px solid var(--bord);
  border-radius: var(--r);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  transform-style: preserve-3d;
  transition: border-color 0.38s ease,
              box-shadow 0.38s ease,
              background 0.28s ease;
  cursor: default;
  will-change: transform;
}
.pc:hover {
  border-color: var(--bord-h);
  box-shadow: 0 24px 60px rgba(0,0,0,0.5),
              0 0 36px var(--glow);
  background: var(--surf-h);
}

/* Image area — shorter for compact look */
.pc__img-wrap {
  position: relative;
  height: 196px;
  overflow: hidden;
  background: #090B14;
  flex-shrink: 0;
}
.pc__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0.78;
  transition: transform 0.75s cubic-bezier(0.25,0.46,0.45,0.94),
              opacity 0.4s ease;
}
.pc:hover .pc__img {
  transform: scale(1.07);
  opacity: 1;
}
.pc__num {
  position: absolute;
  top: 12px;
  right: 12px;
  font-family: 'Syne', sans-serif;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  color: #fff;
  background: rgba(99,102,241,0.68);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  padding: 3px 10px;
  border-radius: 100px;
  border: 1px solid rgba(255,255,255,0.1);
}
.pc__img-scrim {
  position: absolute;
  bottom: 0; left: 0; right: 0;
  height: 56px;
  background: linear-gradient(to top, rgba(6,7,13,0.88), transparent);
  pointer-events: none;
}

/* Body — tighter padding */
.pc__body {
  padding: 20px 22px 22px;
  display: flex;
  flex-direction: column;
  flex: 1;
  gap: 10px;
}
.pc__title {
  font-family: 'Syne', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  letter-spacing: -0.02em;
  line-height: 1.28;
  color: var(--t1);
  margin: 0;
}
.pc__desc {
  font-size: 0.83rem;
  color: var(--t2);
  line-height: 1.68;
  margin: 0;
  flex: 1;
  font-weight: 300;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Chips */
.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.chip {
  font-size: 0.67rem;
  font-weight: 500;
  color: var(--t3);
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  padding: 3px 10px;
  border-radius: 100px;
  letter-spacing: 0.035em;
  transition: color 0.2s, border-color 0.2s, background 0.2s;
}
.chip:hover {
  color: var(--v2);
  border-color: rgba(34,211,238,0.26);
  background: rgba(34,211,238,0.07);
}

/* Footer / CTA */
.pc__footer {
  padding-top: 12px;
  border-top: 1px solid var(--bord);
  margin-top: auto;
}
.ghost-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-family: 'Syne', sans-serif;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  color: var(--v2);
  text-decoration: none;
  padding: 9px 16px;
  border-radius: 100px;
  border: 1px solid rgba(34,211,238,0.22);
  background: rgba(34,211,238,0.06);
  transition: all 0.26s cubic-bezier(0.34,1.56,0.64,1);
  width: 100%;
}
.ghost-btn:hover {
  background: var(--v2);
  color: #06070D;
  border-color: var(--v2);
  text-decoration: none;
  transform: translateY(-2px);
  box-shadow: 0 7px 22px rgba(34,211,238,0.28);
}
.ghost-btn--muted {
  color: var(--t3);
  border-color: var(--bord);
  background: transparent;
  cursor: not-allowed;
}
.ghost-btn--muted:hover {
  background: transparent;
  color: var(--t3);
  border-color: var(--bord);
  transform: none;
  box-shadow: none;
}

/* Fallback - no image */
.no-img {
  width: 100%; height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255,255,255,0.08);
}

/* ── Responsive ────────────────────────────────── */
@media (max-width: 991px) {
  .ps__grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (max-width: 640px) {
  .ps {
    padding: 72px 0 88px;
  }
  .ps__header {
    margin-bottom: 40px;
  }
  .ps__heading {
    font-size: clamp(1.6rem, 7vw, 2rem);
  }
  .ps__grid {
    grid-template-columns: 1fr;
    gap: 16px;
  }
  .pc__img-wrap {
    height: 178px;
  }
}
@media (max-width: 400px) {
  .pc__body {
    padding: 16px 16px 20px;
  }
}
`;

export default Projects;