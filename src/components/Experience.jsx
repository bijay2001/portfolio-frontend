import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, CheckCircle2, Award } from 'lucide-react';
import api from '../api/axiosClient';

const Experience = () => {
    // Fallback data from your resume ensures UI perfection even while API loads
    const [experience, setExperience] = useState([
        {
            role: "Junior Software Developer",
            company: "Orisys Infotech Pvt Ltd",
            location: "Bhubaneswar",
            duration: "Feb 2025 - Present",
            description: "Built a Driver Attendance System from scratch using React, Node.js, and MySQL.||Contributed to the OFDC government portal using PHP and MySQL, focusing on backend logic.||Optimized database queries across multiple live projects, reducing page load speeds by 25%.||Implemented secure login and role-based access control (RBAC)."
        },
        {
            role: "SEO Intern",
            company: "SEOCZAR IT Services",
            location: "Bhubaneswar",
            duration: "Dec 2024 - Feb 2025",
            description: "Executed technical on-page optimization strategies across 10+ client websites.||Fixed technical SEO issues to improve organic search rankings.||Leveraged search engine crawler knowledge to write clean, structured code."
        },
        {
            role: "Full Stack Web Dev Intern",
            company: "Cloudedge Technology",
            location: "Bhubaneswar",
            duration: "Feb 2024 - Jun 2024",
            description: "Programmed dynamic web applications using PHP and MySQL for 3+ client projects.||Engineered a secure User Authentication System with robust password hashing.||Designed responsive, mobile-friendly interfaces using HTML, CSS, and Bootstrap."
        }
    ]);

    useEffect(() => {
        const fetchExperience = async () => {
            try {
                const res = await api.get('/experience');
                if (res.data && res.data.status === 'success' && res.data.data.length > 0) {
                    setExperience(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching experience:", error);
            }
        };
        fetchExperience();
    }, []);

    // Framer Motion Variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { staggerChildren: 0.15 } 
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, x: -30, filter: 'blur(8px)' },
        visible: { 
            opacity: 1, 
            x: 0, 
            filter: 'blur(0px)',
            transition: { type: "spring", stiffness: 80, damping: 20 } 
        }
    };

    return (
        <section id="experience" className="experience-section">
            
            {/* Ambient Background Glows */}
            <div className="experience-bg-grid"></div>
            <div className="experience-glow-blob"></div>

            <div className="experience-content-wrapper">
                
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true, margin: "-100px" }} 
                    transition={{ duration: 0.6 }}
                    className="experience-header"
                >
                    <h2 className="section-title">
                        Work <span className="text-gradient">Experience</span>
                    </h2>
                    <p className="section-subtitle">My professional path and technical achievements.</p>
                </motion.div>

                {/* Flawless CSS Timeline Layout */}
                <motion.div 
                    className="timeline-wrapper"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {/* The glowing vertical timeline line */}
                    <div className="timeline-track"></div>

                    {experience.map((job, index) => (
                        <motion.div key={index} variants={cardVariants} className="timeline-item">
                            
                            {/* Glowing Timeline Node */}
                            <div className="timeline-node">
                                <div className="node-inner"></div>
                            </div>

                            {/* Premium Bento Card */}
                            <div className="premium-bento-card timeline-card">
                                <div className="card-ambient-glow"></div>
                                
                                <div className="card-content position-relative z-2">
                                    
                                    {/* Header: Stacks perfectly on mobile, flexes on desktop */}
                                    <div className="job-header">
                                        <div className="job-title-group">
                                            <h4 className="job-role">{job.role}</h4>
                                            <div className="job-meta">
                                                <span className="meta-tag">
                                                    <Briefcase size={14} className="meta-icon" /> 
                                                    {job.company}
                                                </span>
                                                <span className="meta-tag">
                                                    <MapPin size={14} className="meta-icon" /> 
                                                    {job.location}
                                                </span>
                                            </div>
                                        </div>
                                        
                                        <div className="job-duration">
                                            <Calendar size={14} className="text-secondary-cyan" /> 
                                            <span>{job.duration}</span>
                                        </div>
                                    </div>

                                    <div className="card-divider"></div>
                                    
                                    {/* Custom Checklist Description */}
                                    <div className="job-description">
                                        {job.description.split('||').map((point, i) => {
                                            if (!point.trim()) return null;
                                            return (
                                                <div key={i} className="desc-bullet-group">
                                                    <div className="bullet-icon-wrapper">
                                                        <CheckCircle2 size={16} className="bullet-icon" />
                                                    </div>
                                                    <p className="desc-text">{point.trim()}</p>
                                                </div>
                                            );
                                        })}
                                    </div>

                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* --- PREMIUM SCOPED CSS --- */}
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
                    
                    /* Timeline Math Variables */
                    --node-size: 24px;
                    --line-width: 2px;
                    --timeline-gap: 40px; /* Space between node and card */
                }

                .experience-section {
                    position: relative;
                    background-color: var(--bg-dark);
                    font-family: 'Inter', -apple-system, sans-serif;
                    padding-top: 100px;
                    padding-bottom: 120px;
                    overflow: hidden;
                }

                /* Ambient Backgrounds */
                .experience-bg-grid {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(to right, rgba(255,255,255,0.015) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(255,255,255,0.015) 1px, transparent 1px);
                    background-size: 50px 50px;
                    mask-image: radial-gradient(ellipse 80% 100% at 50% 50%, black 0%, transparent 100%);
                    -webkit-mask-image: radial-gradient(ellipse 80% 100% at 50% 50%, black 0%, transparent 100%);
                    z-index: 0;
                }

                .experience-glow-blob {
                    position: absolute;
                    top: 20%;
                    left: -20%;
                    width: 60vw;
                    height: 60vw;
                    background: radial-gradient(circle, rgba(124, 58, 237, 0.04) 0%, transparent 60%);
                    filter: blur(80px);
                    z-index: 1;
                    pointer-events: none;
                }

                /* Custom Perfect Padding Wrapper */
                .experience-content-wrapper {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    max-width: 1000px; /* Slightly narrower than 1200px for better reading width on timelines */
                    margin: 0 auto;
                    padding: 0 2rem;
                }

                /* Header Alignment */
                .experience-header {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    margin-bottom: 4rem;
                }

                .section-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 16px;
                    border-radius: 100px;
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    margin-bottom: 1rem;
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
                    color: var(--text-main);
                    letter-spacing: -0.03em;
                    margin-bottom: 0.5rem;
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

                /* --- FLAWLESS CSS TIMELINE ARCHITECTURE --- */
                .timeline-wrapper {
                    position: relative;
                }

                .timeline-track {
                    position: absolute;
                    /* Perfectly centers the line inside the node mathematically */
                    left: calc(var(--node-size) / 2 - var(--line-width) / 2);
                    top: 10px;
                    bottom: 0;
                    width: var(--line-width);
                    background: linear-gradient(to bottom, transparent, rgba(6, 182, 212, 0.4) 10%, rgba(124, 58, 237, 0.4) 90%, transparent);
                    z-index: 1;
                }

                .timeline-item {
                    position: relative;
                    /* Pushes the card exactly enough to clear the node + gap */
                    padding-left: calc(var(--node-size) + var(--timeline-gap));
                    margin-bottom: 2.5rem;
                    z-index: 2;
                }

                .timeline-item:last-child {
                    margin-bottom: 0;
                }

                .timeline-node {
                    position: absolute;
                    left: 0;
                    /* Aligns node perfectly with the card's header */
                    top: 32px; 
                    width: var(--node-size);
                    height: var(--node-size);
                    border-radius: 50%;
                    background: var(--bg-dark);
                    border: 2px solid rgba(6, 182, 212, 0.5);
                    box-shadow: 0 0 15px rgba(6, 182, 212, 0.2);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.4s ease;
                    z-index: 3;
                }

                .node-inner {
                    width: 8px;
                    height: 8px;
                    border-radius: 50%;
                    background: var(--secondary);
                    transition: all 0.4s ease;
                }

                .timeline-item:hover .timeline-node {
                    border-color: var(--secondary);
                    box-shadow: 0 0 20px rgba(6, 182, 212, 0.6);
                    transform: scale(1.1);
                }

                .timeline-item:hover .node-inner {
                    background: var(--text-main);
                    box-shadow: 0 0 10px var(--text-main);
                }

                /* Bento Card Styling */
                .premium-bento-card {
                    position: relative;
                    background: linear-gradient(145deg, rgba(255,255,255,0.02) 0%, rgba(255,255,255,0.005) 100%);
                    border: 1px solid var(--glass-border);
                    border-radius: 24px;
                    padding: 2rem 2.5rem;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
                }

                .timeline-item:hover .premium-bento-card {
                    transform: translateY(-5px);
                    border-color: rgba(6, 182, 212, 0.2);
                    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
                }

                .card-ambient-glow {
                    position: absolute;
                    top: -50px;
                    left: -50px;
                    width: 250px;
                    height: 250px;
                    background: radial-gradient(circle, rgba(6, 182, 212, 0.1) 0%, transparent 70%);
                    z-index: 1;
                    opacity: 0;
                    pointer-events: none;
                    transition: opacity 0.5s ease;
                }

                .timeline-item:hover .card-ambient-glow {
                    opacity: 1;
                }

                /* Job Header Layout */
                .job-header {
                    display: flex;
                    justify-content: space-between;
                    align-items: flex-start;
                    gap: 1.5rem;
                    margin-bottom: 1.5rem;
                }

                .job-role {
                    font-size: 1.35rem;
                    font-weight: 700;
                    color: var(--text-main);
                    letter-spacing: -0.02em;
                    margin-bottom: 0.5rem;
                    margin-top: 0;
                }

                .job-meta {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;
                }

                .meta-tag {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.85rem;
                    color: var(--text-muted);
                    background: rgba(255,255,255,0.03);
                    padding: 4px 12px;
                    border-radius: 8px;
                    border: 1px solid rgba(255,255,255,0.05);
                }

                .meta-icon {
                    color: var(--primary);
                }

                .job-duration {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.85rem;
                    color: var(--text-main);
                    background: rgba(6, 182, 212, 0.1);
                    border: 1px solid rgba(6, 182, 212, 0.2);
                    padding: 8px 16px;
                    border-radius: 100px;
                    white-space: nowrap;
                    font-weight: 500;
                    flex-shrink: 0;
                }

                .card-divider {
                    height: 1px;
                    width: 100%;
                    background: linear-gradient(to right, var(--glass-border), transparent);
                    margin-bottom: 1.5rem;
                }

                /* Description Bullets */
                .job-description {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .desc-bullet-group {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                    transition: all 0.3s ease;
                }

                .bullet-icon-wrapper {
                    margin-top: 4px;
                    flex-shrink: 0;
                }

                .bullet-icon {
                    color: rgba(255,255,255,0.3);
                    transition: all 0.3s ease;
                }

                .desc-bullet-group:hover .bullet-icon {
                    color: var(--secondary);
                    transform: scale(1.1);
                }

                .desc-text {
                    font-size: 1rem;
                    color: var(--text-muted);
                    line-height: 1.7;
                    margin: 0;
                    font-weight: 400;
                    transition: color 0.3s ease;
                }

                .desc-bullet-group:hover .desc-text {
                    color: #E2E8F0;
                }

                /* Flawless Mobile Responsiveness */
                @media (max-width: 768px) {
                    :root {
                        --timeline-gap: 20px; /* Shrink gap on mobile */
                    }
                    
                    .experience-section {
                        padding-top: 80px; 
                        padding-bottom: 80px;
                    }
                    
                    .experience-content-wrapper {
                        padding: 0 1.5rem;
                    }

                    .premium-bento-card {
                        padding: 1.5rem;
                    }
                    
                    .timeline-node {
                        top: 24px; /* Adjust node alignment for smaller padding */
                    }

                    .job-header {
                        flex-direction: column; /* Stack header on mobile */
                        gap: 1rem;
                    }
                    
                    .job-duration {
                        width: 100%;
                        justify-content: center;
                    }
                    
                    .desc-text {
                        font-size: 0.95rem;
                    }
                }

                @media (max-width: 480px) {
                    :root {
                        --node-size: 16px; /* Smaller node on tiny screens */
                        --timeline-gap: 15px;
                    }
                    
                    .experience-content-wrapper {
                        padding: 0 1rem;
                    }
                    
                    .meta-tag {
                        padding: 4px 8px;
                        font-size: 0.75rem;
                    }
                }
            `}</style>
        </section>
    );
};

export default Experience;