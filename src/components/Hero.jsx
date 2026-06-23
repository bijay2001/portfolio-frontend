import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, User } from 'lucide-react';
import api from '../api/axiosClient';

// Import your animation components
import LightRays from '../animations/LightRays';
import TextType from '../animations/TextType';

/* --- Windows Terminal Sub-Component --- */
const WindowsTerminal = () => {
    const [lines, setLines] = useState([]);
    
    // The simulated boot-up sequence
    const terminalSteps = [
        { text: "C:\\Users\\Bijay> npm start", delay: 500, color: "#ffffff" },
        { text: "> bijay-portfolio@1.0.0 start", delay: 1200, color: "#8B949E" },
        { text: "> node server.js", delay: 1400, color: "#8B949E" },
        { text: "[INFO] Booting rendering engine...", delay: 1800, color: "#06B6D4" },
        { text: "[INFO] Initializing React/Node.js stack...", delay: 2200, color: "#06B6D4" },
        { text: "[INFO] Establishing MySQL connection...", delay: 2700, color: "#A855F7" },
        { text: "[ OK ] Database connected successfully.", delay: 3200, color: "#10B981" },
        { text: "[INFO] Fetching dynamic profile data...", delay: 3500, color: "#06B6D4" },
        { text: "[ OK ] 200 OK - Data retrieved.", delay: 4000, color: "#10B981" },
        { text: "Server is actively running on port 5173...", delay: 4400, color: "#ffffff" },
        { text: "C:\\Users\\Bijay> ", delay: 4800, color: "#ffffff", isCursor: true }
    ];

    useEffect(() => {
        const timeouts = [];
        terminalSteps.forEach((step) => {
            const timeout = setTimeout(() => {
                setLines(prev => [...prev, step]);
            }, step.delay);
            timeouts.push(timeout);
        });

        return () => timeouts.forEach(clearTimeout);
    }, []);

    return (
        <div className="windows-terminal">
            {/* Terminal Title Bar */}
            <div className="terminal-header">
                <div className="terminal-title">
                    <span className="cmd-icon">C:\_</span>
                    Command Prompt - node server.js
                </div>
                <div className="terminal-controls">
                    <span className="control minimize">_</span>
                    <span className="control maximize">□</span>
                    <span className="control close">×</span>
                </div>
            </div>
            
            {/* Terminal Body */}
            <div className="terminal-body">
                {lines.map((line, index) => (
                    <div key={index} className="terminal-line" style={{ color: line.color }}>
                        {line.text}
                        {line.isCursor && <span className="terminal-cursor"></span>}
                    </div>
                ))}
            </div>
        </div>
    );
};

/* --- Main Hero Component --- */
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

    const roleTitle = profile?.title || "Full Stack Developer | React, Node, MySQL & PHP";
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

            <div className="hero-content-wrapper container">
                <div className="row align-items-center g-5">
                    
                    {/* Left Column: Typography & CTA */}
                    <div className="col-12 col-lg-6">
                        <motion.div 
                            variants={containerVariants} 
                            initial="hidden" 
                            whileInView="visible"
                            viewport={{ once: true }}
                            className="hero-content-left"
                        >
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
                                
                                {/* Updated Button: About Me */}
                                {/* Updated Button: GitHub Live Code */}
<a 
    href="https://github.com/bijay2001" 
    target="_blank" 
    rel="noreferrer" 
    className="btn-secondary"
>
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        width="16" 
        height="16" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="icon-github"
    >
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
    </svg>
    View Live Code
</a>
                            </motion.div>

                        </motion.div>
                    </div>

                    {/* Right Column: Windows Terminal Animation */}
                    <div className="col-12 col-lg-6">
                        <motion.div
                            initial={{ opacity: 0, x: 40, filter: 'blur(10px)' }}
                            whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                        >
                            <WindowsTerminal />
                        </motion.div>
                    </div>

                </div>
            </div>

            {/* --- 100% VANILLA SCOPED CSS --- */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=Fira+Code:wght@400;500&display=swap');

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
                }

                .hero-content-left {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    text-align: left;
                }

                .hero-role-static {
                    font-family: 'Space Grotesk', sans-serif;
                    font-size: clamp(1rem, 1.2vw, 1.15rem);
                    font-weight: 600;
                    color: var(--accent-cyan);
                    margin: 0 0 0.75rem 0;
                    letter-spacing: 0.02em;
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
                    font-size: clamp(2.2rem, 4vw, 3.4rem); 
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
                    cursor: pointer;
                }

                .btn-primary {
                    background: var(--text-main);
                    color: var(--bg-deep);
                    border: none;
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

                .btn-secondary .icon-user {
                    color: var(--text-muted);
                    transition: color 0.2s ease;
                }

                .btn-secondary:hover {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: rgba(255, 255, 255, 0.3);
                }

                .btn-secondary:hover .icon-user { color: var(--text-main); }

                /* =========================================
                   WINDOWS TERMINAL CSS
                   ========================================= */
                .windows-terminal {
                    background: rgba(12, 12, 12, 0.7);
                    backdrop-filter: blur(15px);
                    -webkit-backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 8px;
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 0 0 0 1px rgba(255,255,255,0.05) inset;
                    overflow: hidden;
                    width: 100%;
                    max-width: 550px;
                    margin: 0 auto;
                }

                .terminal-header {
                    background: #1A1B26;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 8px 16px;
                    border-bottom: 1px solid #2D3748;
                }

                .terminal-title {
                    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                    font-size: 0.75rem;
                    color: #D1D5DB;
                    display: flex;
                    align-items: center;
                    gap: 8px;
                }

                .cmd-icon {
                    font-weight: 700;
                    color: #fff;
                    background: #000;
                    padding: 0 4px;
                    border: 1px solid #4B5563;
                }

                .terminal-controls {
                    display: flex;
                    gap: 16px;
                    color: #9CA3AF;
                    font-size: 0.85rem;
                }

                .control { cursor: default; }
                .control.close:hover { color: #EF4444; }
                .control:hover { color: #fff; }

                .terminal-body {
                    padding: 1.25rem;
                    font-family: 'Fira Code', 'Courier New', Courier, monospace;
                    font-size: 0.85rem;
                    line-height: 1.6;
                    height: 280px;
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: 4px;
                }

                .terminal-cursor {
                    display: inline-block;
                    width: 8px;
                    height: 15px;
                    background-color: #fff;
                    vertical-align: text-bottom;
                    margin-left: 5px;
                    animation: blink 1s step-end infinite;
                }

                @keyframes blink {
                    0%, 100% { opacity: 1; }
                    50% { opacity: 0; }
                }

                /* Mobile Responsiveness */
                @media (max-width: 991px) {
                    .hero-section {
                        padding-top: 130px; 
                        padding-bottom: 60px;
                        min-height: auto; 
                        align-items: flex-start; 
                    }
                    
                    .hero-vignette {
                        background: linear-gradient(180deg, rgba(5,5,10,0.95) 0%, rgba(5,5,10,0.7) 60%, transparent 100%);
                    }

                    .hero-role-static {
                        font-size: 1rem;
                        margin-bottom: 1rem;
                    }

                    .typing-headline-wrapper {
                        min-height: 85px; 
                        margin-bottom: 1rem;
                    }

                    .hero-title-typing {
                        font-size: clamp(2.2rem, 8vw, 3rem); 
                    }

                    .hero-subtitle {
                        font-size: 1rem;
                        margin-bottom: 2rem;
                    }

                    .hero-buttons {
                        flex-direction: row;
                        width: 100%;
                    }
                    
                    .btn-primary, .btn-secondary {
                        padding: 14px 8px; 
                        font-size: 0.95rem; 
                        white-space: nowrap; 
                        flex: 1; 
                    }

                    .windows-terminal {
                        margin-top: 20px;
                    }

                    .terminal-body {
                        height: 220px;
                        font-size: 0.75rem;
                    }
                }
                
                @media (max-width: 400px) {
                    .hero-buttons {
                        flex-direction: column;
                    }
                    .btn-primary, .btn-secondary {
                        width: 100%;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;