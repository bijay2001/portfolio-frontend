import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { GraduationCap, Code2, Coffee, Briefcase, Rocket, User } from 'lucide-react';
import api from '../api/axiosClient';

const About = () => {
    const [data, setData] = useState({ profile: null, education: [] });

    useEffect(() => {
        const fetchAboutData = async () => {
            try {
                const res = await api.get('/profile');
                if (res.data && res.data.status === 'success') {
                    setData(res.data);
                }
            } catch (err) {
                console.error("Error fetching about data:", err);
            }
        };
        fetchAboutData();
    }, []);

    const summaryText = data.profile?.summary || "I’m a Full Stack Developer who enjoys the logic behind the code. I built my professional foundation on the reliability of PHP and MySQL. Currently, I am expanding that strong experience into the modern stack, actively learning and applying React and Node.js to build equally robust, scalable applications.";

    // Framer Motion Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { staggerChildren: 0.15 } 
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 40, filter: 'blur(10px)' },
        visible: { 
            opacity: 1, 
            y: 0, 
            filter: 'blur(0px)',
            transition: { type: "spring", stiffness: 80, damping: 20 } 
        }
    };

    return (
        <section id="about" className="about-section pt-5 pb-5">
            <div className="container overflow-hidden">
                
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true, margin: "-100px" }} 
                    transition={{ duration: 0.6 }}
                    className="text-center mb-5"
                >
                    <h2 className="section-title text-white mb-3">
                        About <span className="text-gradient">Me</span>
                    </h2>
                    <p className="section-subtitle">The engineer behind the code.</p>
                </motion.div>

                <motion.div 
                    className="row g-4"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {/* Bento Card 1: Profile Summary & Stats */}
                    <motion.div variants={cardVariants} className="col-lg-7">
                        <div className="premium-bento-card h-100 d-flex flex-column">
                            <div className="card-glow-effect"></div>
                            
                            <div className="d-flex align-items-center gap-3 mb-4 position-relative z-2">
                                <div className="icon-box-primary">
                                    <Code2 size={24} />
                                </div>
                                <h3 className="card-title mb-0">Profile Summary</h3>
                            </div>
                            
                            <p className="summary-text flex-grow-1 position-relative z-2">
                                {summaryText}
                            </p>
                            
                            {/* SaaS Style Stats Widgets */}
                            <div className="row g-3 mt-4 pt-4 border-top-subtle position-relative z-2">
                                <div className="col-4">
                                    <div className="stat-widget">
                                        <Briefcase size={22} className="stat-icon text-purple mb-2" />
                                        <h3 className="stat-number mb-0">1+</h3>
                                        <span className="stat-label">Years Exp.</span>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="stat-widget">
                                        <Rocket size={22} className="stat-icon text-cyan mb-2" />
                                        <h3 className="stat-number mb-0">10+</h3>
                                        <span className="stat-label">Deployments</span>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <div className="stat-widget">
                                        <Coffee size={22} className="stat-icon text-pink mb-2" />
                                        <h3 className="stat-number mb-0">Daily</h3>
                                        <span className="stat-label">Coffee Fueled</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Bento Card 2: Education Timeline */}
                    <motion.div variants={cardVariants} className="col-lg-5">
                        <div className="premium-bento-card h-100">
                            <div className="card-glow-effect-alt"></div>

                            <div className="d-flex align-items-center gap-3 mb-4 position-relative z-2">
                                <div className="icon-box-secondary">
                                    <GraduationCap size={24} />
                                </div>
                                <h3 className="card-title mb-0">Education</h3>
                            </div>
                            
                            <div className="timeline-container position-relative z-2 mt-4">
                                {/* Gradient Timeline Line */}
                                <div className="timeline-line"></div>
                                
                                {data.education.map((edu, index) => (
                                    <motion.div 
                                        key={index} 
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + (index * 0.1) }}
                                        className="timeline-item"
                                    >
                                        <div className="timeline-dot"></div>
                                        <div className="timeline-content">
                                            <h5 className="timeline-title">{edu.title}</h5>
                                            <div className="timeline-year">{edu.year}</div>
                                            <p className="timeline-inst">{edu.inst}</p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            </div>
            
            {/* --- PREMIUM SCOPED CSS --- */}
            <style>{`
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

                .about-section {
                    background-color: var(--bg-dark);
                    font-family: 'Inter', -apple-system, sans-serif;
                    padding-top: 80px; 
                    padding-bottom: 120px;
                }

                /* Section Headers */
                .section-badge {
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                }

                .badge-text {
                    font-size: 0.75rem;
                    letter-spacing: 0.1em;
                    color: var(--text-muted);
                    font-weight: 600;
                    text-transform: uppercase;
                }

                .text-secondary-cyan { color: var(--secondary); }

                .section-title {
                    font-size: clamp(2rem, 4vw, 3rem);
                    font-weight: 800;
                    letter-spacing: -0.03em;
                }

                .section-title .text-gradient {
                    background: linear-gradient(135deg, var(--secondary) 0%, var(--primary) 50%, var(--accent) 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .section-subtitle {
                    font-size: 1.1rem;
                    color: var(--text-muted);
                    font-weight: 400;
                }

                /* Bento Box Cards */
                .premium-bento-card {
                    position: relative;
                    background: linear-gradient(145deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0.01) 100%);
                    border: 1px solid var(--glass-border);
                    border-radius: 24px;
                    padding: 2.5rem;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
                }

                .premium-bento-card:hover {
                    transform: translateY(-5px);
                    border-color: rgba(255,255,255,0.1);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                }

                /* Subtle Ambient Glows inside cards */
                .card-glow-effect {
                    position: absolute;
                    top: -50px;
                    left: -50px;
                    width: 200px;
                    height: 200px;
                    background: radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%);
                    z-index: 1;
                    pointer-events: none;
                }

                .card-glow-effect-alt {
                    position: absolute;
                    bottom: -50px;
                    right: -50px;
                    width: 200px;
                    height: 200px;
                    background: radial-gradient(circle, rgba(6, 182, 212, 0.15) 0%, transparent 70%);
                    z-index: 1;
                    pointer-events: none;
                }

                /* Icon Boxes */
                .icon-box-primary, .icon-box-secondary {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 48px;
                    height: 48px;
                    border-radius: 14px;
                }

                .icon-box-primary {
                    background: rgba(124, 58, 237, 0.1);
                    color: var(--primary);
                    border: 1px solid rgba(124, 58, 237, 0.2);
                }

                .icon-box-secondary {
                    background: rgba(6, 182, 212, 0.1);
                    color: var(--secondary);
                    border: 1px solid rgba(6, 182, 212, 0.2);
                }

                .card-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--text-main);
                    letter-spacing: -0.02em;
                }

                .summary-text {
                    font-size: 1.05rem;
                    color: var(--text-muted);
                    line-height: 1.8;
                    font-weight: 400;
                }

                /* Stats Widgets */
                .border-top-subtle {
                    border-top: 1px solid var(--glass-border) !important;
                }

                .stat-widget {
                    background: rgba(255,255,255,0.02);
                    border: 1px solid transparent;
                    border-radius: 16px;
                    padding: 1.25rem 0.5rem;
                    text-align: center;
                    transition: all 0.3s ease;
                    height: 100%;
                }

                .stat-widget:hover {
                    background: rgba(255,255,255,0.04);
                    border-color: var(--glass-border);
                    transform: translateY(-3px);
                }

                .text-purple { color: var(--primary); }
                .text-cyan { color: var(--secondary); }
                .text-pink { color: var(--accent); }

                .stat-number {
                    font-size: 1.5rem;
                    font-weight: 800;
                    color: var(--text-main);
                }

                .stat-label {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    font-weight: 600;
                }

                /* Fixed Flawless Timeline */
                .timeline-container {
                    position: relative;
                }

                .timeline-line {
                    position: absolute;
                    /* Perfectly centers a 2px line against a 16px dot (16/2 - 2/2 = 7) */
                    left: 7px; 
                    top: 10px;
                    bottom: 10px;
                    width: 2px;
                    background: linear-gradient(to bottom, rgba(124, 58, 237, 0.1), rgba(124, 58, 237, 0.6) 20%, rgba(6, 182, 212, 0.6) 80%, rgba(6, 182, 212, 0.1));
                    z-index: 1;
                }

                .timeline-item {
                    position: relative;
                    padding-left: 36px;
                    margin-bottom: 1.5rem;
                    z-index: 2;
                }

                .timeline-item:last-child {
                    margin-bottom: 0;
                }

                .timeline-dot {
                    position: absolute;
                    left: 0;
                    top: 24px; /* Centers dot with the first line of content padding */
                    transform: translateY(-50%);
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: var(--bg-dark);
                    border: 2px solid var(--secondary);
                    box-shadow: 0 0 12px rgba(6, 182, 212, 0.4);
                    transition: all 0.3s ease;
                    z-index: 3;
                }

                .timeline-content {
                    padding: 1.25rem;
                    border-radius: 16px;
                    background: rgba(255, 255, 255, 0.01);
                    border: 1px solid transparent;
                    transition: all 0.3s ease;
                }

                /* Hover States */
                .timeline-item:hover .timeline-dot {
                    background: var(--secondary);
                    box-shadow: 0 0 16px var(--secondary);
                    transform: translateY(-50%) scale(1.2);
                }

                .timeline-item:hover .timeline-content {
                    background: rgba(255, 255, 255, 0.04);
                    border-color: var(--glass-border);
                }

                .timeline-title {
                    font-size: 1.05rem;
                    font-weight: 700;
                    color: var(--text-main);
                    margin-bottom: 0.25rem;
                }

                .timeline-year {
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--primary);
                    margin-bottom: 0.5rem;
                }

                .timeline-inst {
                    font-size: 0.9rem;
                    color: var(--text-muted);
                    margin-bottom: 0;
                    line-height: 1.5;
                }

                /* Mobile Padding Adjustments */
                @media (max-width: 768px) {
                    .premium-bento-card {
                        padding: 1.5rem;
                    }
                    
                    .stat-widget {
                        padding: 1rem 0.25rem;
                    }
                    
                    .stat-number {
                        font-size: 1.25rem;
                    }
                    
                    .stat-label {
                        font-size: 0.65rem;
                    }
                    
                    /* Tighter timeline padding on mobile */
                    .timeline-content {
                        padding: 1rem;
                    }
                    
                    .timeline-dot {
                        top: 20px; /* Adjust dot to match new smaller mobile padding */
                    }
                }
            `}</style>
        </section>
    );
};

export default About;