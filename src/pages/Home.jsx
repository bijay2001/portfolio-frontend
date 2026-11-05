// src/pages/Home.jsx
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Resume from '../components/Resume';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

const SectionReveal = ({ children }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-80px' }}
    transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
    className="section-wrapper"
  >
    {children}
  </motion.div>
);

export default function Home() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="portfolio-main">
      <Navbar />
      <Hero />

      <SectionReveal>
        <About />
      </SectionReveal>

      <SectionReveal>
        <Skills />
      </SectionReveal>

      <SectionReveal>
        <Experience />
      </SectionReveal>

      <SectionReveal>
        <Projects />
      </SectionReveal>

      <SectionReveal>
        <Certifications />
      </SectionReveal>

      <SectionReveal>
        <Resume />
      </SectionReveal>

      <SectionReveal>
        <Contact />
      </SectionReveal>

      <Footer />

      <style>{`
        .portfolio-main {
          background-color: var(--bg);
          color: var(--text);
          min-height: 100vh;
          overflow-x: hidden;
          display: flex;
          flex-direction: column;
        }
        .section-wrapper {
          width: 100%;
          max-width: 100vw;
        }
      `}</style>
    </main>
  );
}