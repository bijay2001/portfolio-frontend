import React, { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Code2, Sparkles, Database, Server, Cpu } from 'lucide-react';
import api from '../api/axiosClient';

const Hero = () => {
    const [profile, setProfile] = useState(null);
    const canvasRef = useRef(null);

    // ----------------------------------------------------
    // 1. Dynamic Data Logic
    // ----------------------------------------------------
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

    const heroHeadline = profile?.hero_headline || "Building Secure, Scalable <br/> <span class='text-gradient'>Digital Experiences.</span>";
    const roleTitle = profile?.title || "Full Stack Developer | React, Node, MySQL & PHP";

    // ----------------------------------------------------
    // 2. Neon Particle System
    // ----------------------------------------------------
    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        let animationFrameId;
        let particles = [];
        let mouse = { x: null, y: null, radius: 180 }; 

        const handleMouseMove = (e) => {
            mouse.x = e.x;
            mouse.y = e.y;
        };
        const handleMouseOut = () => {
            mouse.x = null;
            mouse.y = null;
        };
        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseout', handleMouseOut);

        class Particle {
            constructor(x, y) {
                this.x = x;
                this.y = y;
                this.baseX = x;
                this.baseY = y;
                this.size = Math.random() * 2 + 0.5;
                const colorRoll = Math.random();
                if (colorRoll > 0.66) {
                    this.color = `rgba(6, 182, 212, ${Math.random() * 0.5 + 0.15})`; // Cyan
                } else if (colorRoll > 0.33) {
                    this.color = `rgba(124, 58, 237, ${Math.random() * 0.5 + 0.15})`; // Purple
                } else {
                    this.color = `rgba(236, 72, 153, ${Math.random() * 0.5 + 0.15})`; // Pink
                }
                this.density = (Math.random() * 30) + 1;
            }

            draw() {
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }

            update() {
                this.baseX += (Math.random() - 0.5) * 0.3;
                this.baseY += (Math.random() - 0.5) * 0.3;

                let dx = mouse.x - this.x;
                let dy = mouse.y - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectionX = dx / distance;
                let forceDirectionY = dy / distance;
                let maxDistance = mouse.radius;
                let force = (maxDistance - distance) / maxDistance;
                let directionX = forceDirectionX * force * this.density;
                let directionY = forceDirectionY * force * this.density;

                if (distance < maxDistance) {
                    this.x -= directionX;
                    this.y -= directionY;
                } else {
                    if (this.x !== this.baseX) {
                        let dx = this.x - this.baseX;
                        this.x -= dx / 25; 
                    }
                    if (this.y !== this.baseY) {
                        let dy = this.y - this.baseY;
                        this.y -= dy / 25; 
                    }
                }
                this.draw();
            }
        }

        function initParticles() {
            particles = [];
            let numberOfParticles = (canvas.width * canvas.height) / 5000; 
            for (let i = 0; i < numberOfParticles; i++) {
                let x = Math.random() * canvas.width;
                let y = Math.random() * canvas.height;
                particles.push(new Particle(x, y));
            }
        }

        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            for (let i = 0; i < particles.length; i++) {
                particles[i].update();
            }
            animationFrameId = requestAnimationFrame(animate);
        }

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        };

        window.addEventListener('resize', handleResize);
        handleResize(); 
        animate();      

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseout', handleMouseOut);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    // ----------------------------------------------------
    // 3. Premium Animations (Framer Motion)
    // ----------------------------------------------------
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { staggerChildren: 0.15, delayChildren: 0.1 } 
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30, filter: 'blur(8px)', scale: 0.98 },
        visible: { 
            opacity: 1, 
            y: 0, 
            filter: 'blur(0px)', 
            scale: 1,
            transition: { type: "spring", stiffness: 90, damping: 20, mass: 1 } 
        }
    };

    const floatingVariants = {
        animate: (custom) => ({
            y: [0, custom.y, 0],
            rotate: [0, custom.rot, 0],
            transition: {
                duration: custom.dur,
                repeat: Infinity,
                ease: "easeInOut"
            }
        })
    };

    return (
        <section id="home" className="hero-section">
            
            {/* Architectural Background Layers */}
            <div className="bg-base"></div>
            <div className="bg-mesh-gradient"></div>
            <div className="hero-bg-grid"></div>
            <canvas ref={canvasRef} className="antigravity-canvas"></canvas>
            <div className="hero-vignette"></div>

            {/* Floating Tech Orbits */}
            <div className="floating-orbits-container hide-on-mobile">
                <motion.div 
                    className="floating-orb orb-1"
                    custom={{ y: -15, rot: 5, dur: 5 }}
                    variants={floatingVariants}
                    animate="animate"
                >
                    <div className="orb-glass"><Code2 size={24} color="#06B6D4" /></div>
                </motion.div>
                
                <motion.div 
                    className="floating-orb orb-2"
                    custom={{ y: 20, rot: -8, dur: 7 }}
                    variants={floatingVariants}
                    animate="animate"
                >
                    <div className="orb-glass"><Server size={24} color="#7C3AED" /></div>
                </motion.div>

                <motion.div 
                    className="floating-orb orb-3"
                    custom={{ y: -12, rot: 6, dur: 6 }}
                    variants={floatingVariants}
                    animate="animate"
                >
                    <div className="orb-glass"><Database size={24} color="#EC4899" /></div>
                </motion.div>
            </div>

            {/* Replaced 'container' class with purely custom wrapper to stop Bootstrap squeezing */}
            <div className="hero-content-wrapper">
                <motion.div 
                    variants={containerVariants} 
                    initial="hidden" 
                    animate="visible"
                    className="hero-content"
                >
                    
                    {/* Premium Glowing Badge */}
                    <motion.div variants={itemVariants} className="hero-badge-wrapper">
                        <div className="status-badge">
                            <span className="badge-glow-dot"></span>
                            <Cpu size={14} className="badge-icon" />
                            <span className="badge-text">{roleTitle}</span>
                            <Sparkles size={14} className="badge-icon-secondary" />
                            <div className="badge-border-gradient"></div>
                        </div>
                    </motion.div>

                    {/* High-Impact Typography Headline */}
                    <motion.h1 
                        variants={itemVariants}
                        className="hero-title"
                        dangerouslySetInnerHTML={{ __html: heroHeadline }}
                    />

                    {/* ATS-Friendly Subtitle (Widened to breathe properly) */}
                    <motion.p variants={itemVariants} className="hero-subtitle">
                        Full Stack Developer with hands-on experience building dynamic web applications. <br className="hide-on-mobile" />
                        I integrate <strong className="text-highlight">React.js</strong> and <strong className="text-highlight">Node.js</strong> with <strong className="text-highlight">MySQL</strong> and <strong className="text-highlight">PHP</strong> to deliver secure, real-world solutions ranging from custom full-stack systems to government portals.
                    </motion.p>

                    {/* Simplified, Clean CTA Buttons */}
                    <motion.div variants={itemVariants} className="hero-buttons-container">
                        <a href="#projects" className="btn-simple-primary">
                            Explore My Work 
                            <ArrowRight size={18} className="btn-icon" />
                        </a>
                        <a href="#contact" className="btn-premium-secondary">
                            Let's Talk
                        </a>
                    </motion.div>

                </motion.div>
            </div>

            {/* Subtle Scroll Indicator */}
            <motion.div 
                className="scroll-indicator-wrapper hide-on-mobile"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 8, 0] }}
                transition={{ opacity: { delay: 1.5, duration: 1 }, y: { repeat: Infinity, duration: 2.5, ease: "easeInOut" } }}
            >
                <div className="mouse-shape">
                    <div className="mouse-wheel"></div>
                </div>
            </motion.div>

            {/* --- 2026 PREMIUM SCOPED CSS --- */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap');

                :root {
                    --primary: #7C3AED;
                    --secondary: #06B6D4;
                    --accent: #EC4899;
                    --bg-dark: #050816;
                    --text-main: #FFFFFF;
                    
                    --text-muted: #9CA3AF;
                    --glass-bg: rgba(255, 255, 255, 0.02);
                    --glass-border: rgba(255, 255, 255, 0.06);
                }

                .hero-section {
                    padding: 160px 0 120px 0; 
                    position: relative;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: var(--bg-dark);
                    overflow: hidden;
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                }

                /* Architectural Depth Layers */
                .bg-base {
                    position: absolute;
                    inset: 0;
                    background: var(--bg-dark);
                    z-index: 0;
                }

                .bg-mesh-gradient {
                    position: absolute;
                    top: -10%;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 70%;
                    height: 70%;
                    background: radial-gradient(circle at center, rgba(124, 58, 237, 0.15) 0%, rgba(6, 182, 212, 0.05) 40%, transparent 70%);
                    filter: blur(80px);
                    z-index: 1;
                    pointer-events: none;
                }

                .hero-bg-grid {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(to right, rgba(255,255,255,0.02) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.02) 1px, transparent 1px);
                    background-size: 50px 50px;
                    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
                    -webkit-mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
                    z-index: 2;
                }

                .antigravity-canvas {
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    z-index: 3;
                    pointer-events: auto;
                }

                .hero-vignette {
                    position: absolute;
                    inset: 0;
                    background: radial-gradient(circle at center, transparent 20%, var(--bg-dark) 100%);
                    z-index: 4;
                    pointer-events: none;
                }

                /* Floating Tech Orbits */
                .floating-orbits-container {
                    position: absolute;
                    top: 0;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 100%;
                    max-width: 1100px; /* Widened to match the new text flow */
                    height: 100%;
                    z-index: 5;
                    pointer-events: none;
                }

                .floating-orb { position: absolute; }

                .orb-glass {
                    padding: 14px;
                    border-radius: 18px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    backdrop-filter: blur(16px);
                    -webkit-backdrop-filter: blur(16px);
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2), inset 0 0 0 1px rgba(255, 255, 255, 0.05);
                }

                .orb-1 { top: 20%; left: 0%; }
                .orb-2 { top: 65%; right: 0%; }
                .orb-3 { top: 15%; right: 15%; }

                /* * PERFECT SPACING WRAPPER 
                 * Replaces Bootstrap constraints to give beautiful, proportional breathing room.
                 */
                .hero-content-wrapper {
                    position: relative;
                    z-index: 10;
                    text-align: center;
                    width: 100%;
                    max-width: 1200px;
                    margin: 0 auto;
                    padding: 0 2rem; /* Guarantees edge protection without squeezing */
                }

                .hero-content {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                }

                /* Premium Glowing Badge */
                .hero-badge-wrapper { margin-bottom: 2rem; }

                .status-badge {
                    position: relative;
                    display: inline-flex;
                    align-items: center;
                    gap: 10px;
                    padding: 8px 18px;
                    background: var(--glass-bg);
                    border-radius: 100px;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
                    overflow: hidden;
                }

                .badge-border-gradient {
                    position: absolute;
                    inset: 0;
                    border-radius: 100px;
                    padding: 1px;
                    background: linear-gradient(90deg, var(--secondary), var(--primary), var(--accent));
                    -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
                    -webkit-mask-composite: xor;
                    mask-composite: exclude;
                    opacity: 0.5;
                }

                .badge-glow-dot {
                    width: 8px;
                    height: 8px;
                    background: var(--secondary);
                    border-radius: 50%;
                    box-shadow: 0 0 12px var(--secondary);
                    animation: pulse 2s infinite ease-in-out;
                }

                .badge-icon, .badge-icon-secondary { color: var(--text-muted); }

                .badge-text {
                    font-size: 0.75rem;
                    letter-spacing: 0.06em;
                    color: var(--text-main);
                    font-weight: 600;
                    text-transform: uppercase;
                }

                /* Perfected Typography Scale */
                .hero-title {
                    font-size: clamp(2.2rem, 5vw, 4.25rem);
                    line-height: 1.05;
                    font-weight: 800;
                    color: var(--text-main);
                    letter-spacing: -0.03em;
                    margin-bottom: 1.25rem;
                    text-shadow: 0 10px 30px rgba(0,0,0,0.5);
                }

                .hero-title .text-gradient {
                    background: linear-gradient(135deg, var(--secondary) 0%, var(--primary) 50%, var(--accent) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                    display: inline-block;
                    padding-bottom: 0.1em;
                }

                .hero-subtitle {
                    /* Increased from 640px to 760px to stop aggressive wrapping */
                    max-width: 760px; 
                    margin: 0 auto 3rem auto;
                    font-size: clamp(0.95rem, 1.25vw, 1.1rem);
                    line-height: 1.7;
                    color: var(--text-muted);
                    font-weight: 400;
                }

                .text-highlight {
                    color: var(--text-main);
                    font-weight: 500;
                }

                /* Clean Native Buttons */
                .hero-buttons-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 1.25rem;
                }

                .btn-simple-primary {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 8px;
                    background: var(--text-main);
                    color: var(--bg-dark);
                    border-radius: 100px;
                    font-weight: 600;
                    font-size: 1rem;
                    padding: 15px 36px;
                    text-decoration: none;
                    transition: all 0.2s ease;
                    border: 1px solid transparent;
                    box-shadow: 0 4px 14px rgba(0, 0, 0, 0.2);
                }

                .btn-simple-primary .btn-icon {
                    transition: transform 0.2s ease;
                }

                .btn-simple-primary:hover {
                    transform: translateY(-2px);
                    background: #F3F4F6;
                    box-shadow: 0 8px 25px rgba(255, 255, 255, 0.15);
                }

                .btn-simple-primary:hover .btn-icon {
                    transform: translateX(4px);
                }

                .btn-premium-secondary {
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    background: var(--glass-bg);
                    color: var(--text-main) !important;
                    border-radius: 100px;
                    font-weight: 500;
                    font-size: 1rem;
                    padding: 15px 36px;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    border: 1px solid var(--glass-border);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                }

                .btn-premium-secondary:hover {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: rgba(255, 255, 255, 0.2);
                    transform: translateY(-2px);
                    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
                }

                /* Scroll Indicator */
                .scroll-indicator-wrapper {
                    position: absolute;
                    bottom: 2rem;
                    left: 50%;
                    transform: translateX(-50%);
                    z-index: 10;
                }

                .mouse-shape {
                    width: 24px;
                    height: 38px;
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 20px;
                    display: flex;
                    justify-content: center;
                    padding-top: 6px;
                }

                .mouse-wheel {
                    width: 4px;
                    height: 8px;
                    background: var(--secondary);
                    border-radius: 4px;
                    animation: scroll 1.5s infinite;
                }

                /* Keyframes */
                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.5; transform: scale(0.8); }
                }

                @keyframes scroll {
                    0% { transform: translateY(0); opacity: 1; }
                    100% { transform: translateY(12px); opacity: 0; }
                }

                /* Flawless Mobile Responsiveness */
                @media (max-width: 992px) {
                    .orb-1 { top: 15%; left: 5%; }
                    .orb-2 { top: 70%; right: 5%; }
                    .orb-3 { display: none; }
                }

                @media (max-width: 768px) {
                    .hero-section {
                        padding: 130px 0 80px 0; 
                    }
                    
                    .hide-on-mobile {
                        display: none !important;
                    }

                    .hero-badge-wrapper {
                        margin-bottom: 1.5rem;
                    }
                    
                    .hero-content-wrapper {
                        padding: 0 1.5rem; /* Slight reduction for smaller screens */
                    }

                    .hero-buttons-container {
                        flex-direction: column;
                        width: 100%;
                        padding: 0;
                        gap: 1rem;
                    }
                    
                    .btn-simple-primary, .btn-premium-secondary {
                        width: 100%;
                        padding: 16px 24px;
                    }
                }
            `}</style>
        </section>
    );
};

export default Hero;