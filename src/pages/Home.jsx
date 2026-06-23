import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

// Component Imports
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Experience from '../components/Experience';
import Projects from '../components/Projects';
import Certifications from '../components/Certifications';
import Contact from '../components/Contact';
import Footer from '../components/Footer';

// A reusable wrapper to ensure every section loads smoothly on scroll
const SectionReveal = ({ children }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1] }}
            className="section-wrapper"
        >
            {children}
        </motion.div>
    );
};

const Home = () => {
    // Ensure the page loads at the very top on refresh
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <main className="portfolio-main">
            {/* Hero is usually the first thing seen, so it renders immediately without the scroll wrapper */}
            <div className="hero-wrapper">
                <Hero />
            </div>

            {/* All other sections are wrapped in the smooth scroll reveal */}
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
                <Contact />
            </SectionReveal>

            {/* Footer renders at the bottom without extra section padding */}
            <Footer />

            {/* --- Scoped Page CSS for overall layout structure --- */}
            <style>{`
                .portfolio-main {
                    background-color: var(--bg-deep);
                    min-height: 100vh;
                    overflow-x: hidden;
                    display: flex;
                    flex-direction: column;
                    gap: var(--section-gap); /* Uses the gap defined in index.css */
                }

                .hero-wrapper {
                    min-height: 100vh;
                    display: flex;
                    flex-direction: column;
                }

                .section-wrapper {
                    width: 100%;
                    /* Ensures sections don't touch the very edges of the screen on ultra-wide monitors */
                    max-width: 100vw; 
                }
            `}</style>
        </main>
    );
};

export default Home;