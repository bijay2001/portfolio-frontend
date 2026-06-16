import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, FileText, Code2 } from 'lucide-react';
import api from '../api/axiosClient';

// Import your new LightRays component instead of SideRays
import LightRays from '../animations/LightRays';
import TextType from '../animations/TextType';

const Hero = () => {
    const [profile, setProfile] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/profile');
                if (res.data && res.data.status === 'success') {
                    setProfile(res.data.profile);
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            }
        };
        fetchProfile();
    }, []);

    const roleTitle = profile?.title || "Full Stack Developer | React, Node, PHP & MySQL";
    const headlineText = "Building systems from the ground up.";

    // Smooth entry animations
    const fadeUpVariants = {
        hidden: { opacity: 0, y: 20, filter: 'blur(8px)' },
        visible: { 
            opacity: 1, 
            y: 0, 
            filter: 'blur(0px)',
            transition: { type: "spring", stiffness: 70, damping: 20 }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.1, delayChildren: 0.1 }
        }
    };

    return (
        <section id="home" className="hero-section">
            
            {/* Background Animations: Single Top-Center Light Ray */}
            <div className="lightrays-wrapper">
                <LightRays
                    raysOrigin="top-center"
                    raysColor="#00d9ff"    // Sleek Cyan color to match your theme
                    raysSpeed={1.2}
                    lightSpread={1.5}      // Spreads beautifully across the top
                    rayLength={3}
                    followMouse={true}     // Interactive mouse follow
                    mouseInfluence={0.08}
                    noiseAmount={0}
                    distortion={0}
                    pulsating={false}
                    fadeDistance={1}
                    saturation={1}
                />
            </div>
            
            {/* Vignette: Transparent at the top-center, dark at the bottom and sides */}
            <div className="hero-vignette"></div>

            <div className="hero-content-wrapper">
                <motion.div 
                    variants={containerVariants} 
                    initial="hidden" 
                    animate="visible"
                    className="hero-content-left"
                >
                    
                    {/* Glowing Tech Badge */}
                    <motion.div variants={fadeUpVariants} className="badge-container">
                        <div className="status-badge">
                            <span className="badge-glow-dot"></span>
                            <Code2 size={13} className="icon-cyan" />
                            <span className="badge-text">Available for Hire</span>
                            <div className="badge-border-gradient"></div>
                        </div>
                    </motion.div>

                    {/* Static, Sleek Role Title */}
                    <motion.h3 variants={fadeUpVariants} className="hero-role-static">
                        {roleTitle}
                    </motion.h3>

                    {/* Main Headline with Typing Effect */}
                    <motion.div variants={fadeUpVariants} className="typing-headline-wrapper">
                        <TextType 
                            text={headlineText}
                            as="h1"
                            typingSpeed={40}
                            deletingSpeed={20}
                            loop={false}
                            className="hero-title-typing"
                            cursorClassName="hero-cursor"
                        />
                    </motion.div>

                    {/* Authentic, ATS-Friendly Subtitle */}
                    <motion.p variants={fadeUpVariants} className="hero-subtitle">
                        Focused on the logic behind the code, I build dynamic web applications using <strong>React.js</strong>, <strong>Node.js</strong>, <strong>PHP</strong>, and <strong>MySQL</strong>. I engineer practical, real-world solutions—ranging from complex government portals to custom management systems.
                    </motion.p>

                    {/* Side-by-Side CTA Buttons */}
                    <motion.div variants={fadeUpVariants} className="hero-buttons">
                        <a href="#projects" className="btn-primary">
                            View Projects
                            <ArrowRight size={16} className="icon-arrow" />
                        </a>
                        <a href="#resume" className="btn-secondary">
                            <FileText size={16} className="icon-file" />
                            My Resume
                        </a>
                    </motion.div>

                </motion.div>
            </div>

            {/* --- 100% VANILLA SCOPED CSS --- */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

                :root {
                    --bg-deep: #05050A;
                    --text-main: #FFFFFF;
                    --text-muted: #A1A1AA;
                    --accent-purple: #9333EA;
                    --accent-cyan: #06B6D4;
                }

                .hero-section {
                    position: relative;
                    padding-top: 140px; 
                    padding-bottom: 80px;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    background-color: var(--bg-deep);
                    overflow: hidden;
                    font-family: 'Inter', sans-serif;
                }

                /* Fullscreen wrapper for LightRays */
                .lightrays-wrapper {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 0;
                }

                /* Darkens the bottom so text pops, leaves top clear for the light */
                .hero-vignette {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background: radial-gradient(circle at 50% -20%, transparent 0%, rgba(5,5,10,0.85) 50%, var(--bg-deep) 100%);
                    z-index: 1;
                    pointer-events: none;
                }

                .hero-content-wrapper {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    max-width: 1200px; 
                    margin: 0 auto;
                    padding: 0 5%;
                }

                .hero-content-left {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    text-align: left;
                    max-width: 650px; 
                }

                /* Badge Styles */
                .badge-container { margin-bottom: 1.25rem; }

                .status-badge {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 16px;
                    background: rgba(255, 255, 255, 0.02);
                    border-radius: 100px;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
                }

                .badge-border-gradient {
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    border-radius: 100px;
                    padding: 1px;
                    background: linear-gradient(90deg, rgba(6,182,212,0.4), rgba(147,51,234,0.4));
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                }

                .badge-glow-dot {
                    width: 6px;
                    height: 6px;
                    background: var(--accent-cyan);
                    border-radius: 50%;
                    box-shadow: 0 0 8px var(--accent-cyan);
                    animation: pulse 2s infinite ease-in-out;
                }

                .icon-cyan { color: var(--accent-cyan); }

                .badge-text {
                    font-size: 0.75rem;
                    letter-spacing: 0.05em;
                    color: var(--text-main);
                    font-weight: 500;
                    text-transform: uppercase;
                }

                .hero-role-static {
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: clamp(1rem, 1.2vw, 1.15rem);
                    font-weight: 500;
                    color: var(--accent-cyan);
                    margin: 0 0 0.5rem 0;
                    letter-spacing: 0.01em;
                }

                /* Main Headline Typing Effect */
                .typing-headline-wrapper {
                    margin: 0 0 1.25rem 0;
                    min-height: clamp(80px, 9vw, 110px); 
                    display: flex;
                    align-items: flex-start;
                }

                .hero-title-typing {
                    font-family: 'Space Grotesk', sans-serif;
                    /* SIZE DECREASED: Sleek, composed typography */
                    font-size: clamp(2.2rem, 4.5vw, 3.4rem); 
                    line-height: 1.15;
                    font-weight: 700;
                    color: var(--text-main);
                    letter-spacing: -0.02em;
                    margin: 0;
                }

                .hero-cursor {
                    color: var(--accent-purple);
                    font-weight: 300;
                    animation: blink 1s step-end infinite;
                }

                /* Compact Subtitle */
                .hero-subtitle {
                    font-size: clamp(0.95rem, 1.1vw, 1.05rem);
                    line-height: 1.6;
                    color: var(--text-muted);
                    font-weight: 400;
                    max-width: 500px;
                    margin: 0 0 2.5rem 0;
                }
                
                .hero-subtitle strong {
                    color: #E4E4E7;
                    font-weight: 500;
                }

                /* Buttons Setup */
                .hero-buttons {
                    display: flex;
                    align-items: center;
                    gap: 1rem;
                    width: 100%;
                }

                .btn-primary, .btn-secondary {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    border-radius: 6px; 
                    font-weight: 500;
                    font-size: 0.95rem;
                    padding: 14px 28px;
                    text-decoration: none;
                    transition: all 0.2s ease;
                }

                .btn-primary {
                    background: var(--text-main);
                    color: var(--bg-deep);
                }

                .btn-primary .icon-arrow { transition: transform 0.2s ease; }

                .btn-primary:hover {
                    transform: translateY(-2px);
                    background: #E4E4E7;
                    box-shadow: 0 6px 20px rgba(255, 255, 255, 0.1);
                }

                .btn-primary:hover .icon-arrow { transform: translateX(3px); }

                .btn-secondary {
                    background: transparent;
                    color: var(--text-main);
                    border: 1px solid rgba(255, 255, 255, 0.15);
                }

                .btn-secondary .icon-file {
                    color: var(--text-muted);
                    transition: color 0.2s ease;
                }

                .btn-secondary:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(255, 255, 255, 0.3);
                }

                .btn-secondary:hover .icon-file { color: var(--text-main); }

                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(0.8); }
                }

                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }

                /* Mobile Flawless Responsiveness */
                /* Mobile Flawless Responsiveness */
                @media (max-width: 768px) {
                    .hero-section {
                        /* Pushes content below the navbar */
                        padding-top: 130px; 
                        padding-bottom: 60px;
                        /* REMOVE 100vh so it wraps natively around your content */
                        min-height: auto; 
                        /* Aligns content near the top instead of dead-centering it */
                        align-items: flex-start; 
                    }
                    
                    .hero-vignette {
                        background: linear-gradient(180deg, rgba(5,5,10,0.95) 0%, rgba(5,5,10,0.7) 60%, transparent 100%);
                    }
                    
                    .hero-content-wrapper { 
                        padding: 0 1.25rem; 
                    }

                    /* Bump up role title slightly */
                    .hero-role-static {
                        font-size: 1.05rem;
                        margin-bottom: 0.75rem;
                    }

                    /* Taller wrapper to fit the increased headline size */
                    .typing-headline-wrapper {
                        min-height: 100px; 
                        margin-bottom: 1rem;
                    }

                    /* Increased headline font size for better mobile presence */
                    .hero-title-typing {
                        font-size: clamp(2.5rem, 9vw, 3.2rem); 
                    }

                    /* Slightly larger subtitle text */
                    .hero-subtitle {
                        font-size: 1rem;
                        margin-bottom: 2rem;
                    }

                    .hero-buttons {
                        flex-direction: row;
                        justify-content: space-between;
                        gap: 12px;
                    }
                    
                    .btn-primary, .btn-secondary {
                        /* Taller padding for a better touch target */
                        padding: 16px 8px; 
                        /* Increased button text size */
                        font-size: 0.95rem; 
                        white-space: nowrap; 
                        flex: 1; 
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;