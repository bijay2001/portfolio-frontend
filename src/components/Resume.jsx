import React from 'react';
import { motion } from 'framer-motion';
import { Download, CalendarDays, FileText, FileBadge, Terminal } from 'lucide-react';

const Resume = () => {
    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const resumeUrl = isLocal 
        ? "http://localhost/Portfolio_app/assets/img/Bijay_Kumar_Behera_FullStackDeveloper.pdf"
        : "/assets/img/Bijay_Kumar_Behera_FullStackDeveloper.pdf";

    const currentDate = new Date().toLocaleString('default', { month: 'long', year: 'numeric' });

    return (
        <section id="resume" className="py-5 my-5 position-relative z-1 d-flex flex-column justify-content-center overflow-hidden" style={{ minHeight: '70vh' }}>
            
            {/* Ambient Background Elements (Fixed Position) */}
            <div className="position-absolute bg-purple-glow" style={{ top: '10%', left: '10%', opacity: 0.15, width: '400px', height: '400px' }}></div>
            <div className="position-absolute bg-cyan-glow" style={{ bottom: '10%', right: '10%', opacity: 0.1, width: '400px', height: '400px' }}></div>

            <div className="container position-relative z-1">
                
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    className="text-center mb-5"
                >
                    <h2 className="display-4 fw-bolder text-white mb-3">My <span className="text-gradient-primary">Resume</span></h2>
                    <p className="sub-text-light fs-5 mx-auto" style={{ maxWidth: '600px' }}>
                        Access my complete professional history, technical stack, and project portfolio.
                    </p>
                </motion.div>

                {/* Fixed Center Alignment using w-100 and mx-auto */}
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95, y: 30 }} 
                    whileInView={{ opacity: 1, scale: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6, ease: [0.175, 0.885, 0.32, 1.275] }}
                    className="resume-terminal mx-auto shadow-lg w-100" 
                    style={{ maxWidth: '750px' }}
                >
                    {/* Terminal Header */}
                    <div className="terminal-header d-flex align-items-center justify-content-between px-4 py-3">
                        <div className="d-flex gap-2">
                            <div className="window-dot bg-danger"></div>
                            <div className="window-dot bg-warning"></div>
                            <div className="window-dot bg-success"></div>
                        </div>
                        <div className="d-flex align-items-center gap-2 sub-text-light small font-monospace">
                            <Terminal size={14} /> resume.pdf
                        </div>
                    </div>

                    {/* Terminal Body */}
                    <div className="terminal-body p-4 p-md-5 text-center position-relative overflow-hidden">
                        
                        {/* High-Tech Grid Background */}
                        <div className="tech-grid-bg"></div>

                        <div className="position-relative z-1 d-flex flex-column align-items-center">
                            
                            {/* Glowing Icon Wrapper */}
                            <div className="resume-icon-wrapper mb-4">
                                <div className="resume-icon-pulse"></div>
                                <FileBadge size={48} className="text-neon-cyan position-relative z-1" />
                            </div>

                            <h3 className="fw-bold text-white mb-3 fs-3">Full Stack Developer Profile</h3>
                            
                            <p className="sub-text-light mb-5 mx-auto fs-6" style={{ maxWidth: '500px', lineHeight: '1.8' }}>
                                A detailed overview of my experience building robust applications using Node.js, React, and modern backend architectures.
                            </p>

                            {/* Aceternity Glowing Button */}
                            <a 
                                href={resumeUrl} 
                                target="_blank" 
                                rel="noreferrer" 
                                download="Bijay_Kumar_Behera_Resume.pdf" 
                                className="btn-glow-download text-decoration-none d-inline-flex align-items-center justify-content-center gap-3 px-5 py-3 fs-5 fw-bold mx-auto"
                            >
                                <span className="position-relative z-1 d-flex align-items-center gap-2">
                                    <Download size={22} className="download-icon" /> 
                                    Download PDF
                                </span>
                            </a>

                            {/* Metadata Footer */}
                            <div className="mt-5 pt-4 w-100 d-flex flex-wrap justify-content-center gap-4 border-top border-light border-opacity-10">
                                <div className="metadata-badge">
                                    <FileText size={16} className="text-neon-purple" />
                                    <span>PDF Format</span>
                                </div>
                                <div className="metadata-badge">
                                    <CalendarDays size={16} className="text-neon-cyan" />
                                    <span>Updated: {currentDate}</span>
                                </div>
                            </div>

                        </div>
                    </div>
                </motion.div>
            </div>

            <style>{`
                /* --- Explicit Text Visibility --- */
                .sub-text-light { color: #94a3b8 !important; }
                .text-neon-cyan { color: var(--neon-cyan); }
                .text-neon-purple { color: var(--neon-purple); }

                /* --- Ambient Background Glow Fix --- */
                .bg-purple-glow {
                    background: var(--neon-purple);
                    border-radius: 50%;
                    filter: blur(120px);
                    pointer-events: none;
                    z-index: 0;
                }
                .bg-cyan-glow {
                    background: var(--neon-cyan);
                    border-radius: 50%;
                    filter: blur(120px);
                    pointer-events: none;
                    z-index: 0;
                }

                /* --- Terminal Window Design --- */
                .resume-terminal {
                    background: #0a0d14; /* Deep dark */
                    border-radius: 1.5rem;
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.6),
                                0 0 0 1px rgba(123, 97, 255, 0.1);
                }

                .terminal-header {
                    background: rgba(255, 255, 255, 0.02);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                }

                .window-dot {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    opacity: 0.8;
                }

                .terminal-body {
                    background: radial-gradient(circle at 50% 0%, rgba(0, 219, 224, 0.05), transparent 70%);
                }

                /* Subtle Grid Background for Tech Feel */
                .tech-grid-bg {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
                    background-size: 30px 30px;
                    opacity: 0.5;
                    z-index: 0;
                    pointer-events: none;
                }

                /* --- Glowing Icon Animation --- */
                .resume-icon-wrapper {
                    position: relative;
                    width: 100px;
                    height: 100px;
                    border-radius: 50%;
                    background: rgba(0, 219, 224, 0.05);
                    border: 1px solid rgba(0, 219, 224, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .resume-icon-pulse {
                    position: absolute;
                    inset: 0;
                    border-radius: 50%;
                    box-shadow: 0 0 0 0 rgba(0, 219, 224, 0.4);
                    animation: pulseRing 3s infinite cubic-bezier(0.66, 0, 0, 1);
                }

                @keyframes pulseRing {
                    to {
                        box-shadow: 0 0 0 45px rgba(0, 219, 224, 0);
                        opacity: 0;
                    }
                }

                /* --- Animated Glowing Download Button --- */
                .btn-glow-download {
                    position: relative;
                    background: #0a0d14;
                    color: #ffffff;
                    border-radius: 1rem;
                    overflow: hidden;
                    transition: all 0.3s ease;
                }

                .btn-glow-download::before {
                    content: '';
                    position: absolute;
                    inset: -2px;
                    background: conic-gradient(from 0deg, transparent 0 340deg, var(--neon-cyan) 360deg);
                    animation: rotateBorder 2.5s linear infinite;
                    z-index: 0;
                }

                .btn-glow-download::after {
                    content: '';
                    position: absolute;
                    inset: 2px;
                    background: linear-gradient(145deg, #111522, #0a0d14);
                    border-radius: 0.9rem;
                    z-index: 0;
                    transition: background 0.3s ease;
                }

                @keyframes rotateBorder {
                    100% { transform: rotate(360deg); }
                }

                .btn-glow-download:hover {
                    color: var(--neon-cyan);
                    transform: translateY(-3px);
                    box-shadow: 0 10px 30px rgba(0, 219, 224, 0.2);
                }

                .btn-glow-download:hover::after {
                    background: linear-gradient(145deg, #1a2035, #0a0d14);
                }

                .btn-glow-download:hover .download-icon {
                    transform: translateY(2px);
                }
                
                .download-icon {
                    transition: transform 0.3s ease;
                }

                /* --- Metadata Badges --- */
                .metadata-badge {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 8px 16px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 20px;
                    font-size: 0.85rem;
                    color: #94a3b8;
                    font-weight: 500;
                    transition: all 0.3s ease;
                }

                .resume-terminal:hover .metadata-badge {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.1);
                }
            `}</style>
        </section>
    );
};

export default Resume;