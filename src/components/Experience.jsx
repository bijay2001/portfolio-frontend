import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Building, Calendar, ArrowRight } from 'lucide-react';
import api from '../api/axiosClient';

const Experience = () => {
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
                console.error("Experience data fetch failed, using fallback:", error);
            }
        };
        fetchExperience();
    }, []);

    // Animation Configurations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.1 }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };

    const lineVariants = {
        hidden: { height: 0 },
        visible: { 
            height: "100%", 
            transition: { duration: 1.5, ease: "easeInOut" } 
        }
    };

    return (
        <section id="experience" className="section-experience">
            <div className="experience-container">
                
                {/* Premium Header Composition */}
                <motion.div 
                    className="section-header"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <span className="section-eyebrow">Career Path</span>
                    <h2 className="section-title">Professional Experience</h2>
                    <p className="section-description">
                        A timeline of my professional journey, technical contributions, and career growth.
                    </p>
                </motion.div>

                {/* Editorial Timeline Layout */}
                <motion.div 
                    className="timeline-layout"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {/* The Track Line */}
                    <div className="timeline-track-container">
                        <motion.div variants={lineVariants} className="timeline-track-line"></motion.div>
                    </div>

                    {experience.map((job, index) => {
                        const isCurrent = job.duration.toLowerCase().includes('present');
                        
                        return (
                            <motion.div key={index} variants={itemVariants} className="timeline-row">
                                
                                {/* Desktop Date Column */}
                                <div className="timeline-date-col">
                                    <span className={`date-text ${isCurrent ? 'date-active' : ''}`}>
                                        {job.duration}
                                    </span>
                                </div>

                                {/* Timeline Node */}
                                <div className="timeline-node-col">
                                    <div className={`timeline-node ${isCurrent ? 'node-active' : ''}`}>
                                        {isCurrent && <div className="node-pulse"></div>}
                                    </div>
                                </div>

                                {/* Content Card Column */}
                                <div className="timeline-content-col">
                                    <div className={`experience-card ${isCurrent ? 'card-active' : ''}`}>
                                        
                                        <div className="card-header">
                                            {/* Mobile Date (Hidden on Desktop) */}
                                            <div className="mobile-date">
                                                <Calendar size={14} />
                                                <span>{job.duration}</span>
                                            </div>

                                            <div className="title-wrapper">
                                                <h3 className="job-title">{job.role}</h3>
                                                {isCurrent && (
                                                    <span className="current-badge">
                                                        <span className="dot"></span> Current
                                                    </span>
                                                )}
                                            </div>
                                            
                                            <div className="job-metadata">
                                                <div className="meta-item">
                                                    <Building size={16} className="meta-icon" />
                                                    <span>{job.company}</span>
                                                </div>
                                                <span className="meta-divider">•</span>
                                                <div className="meta-item">
                                                    <MapPin size={16} className="meta-icon" />
                                                    <span>{job.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="card-body">
                                            <ul className="achievement-list">
                                                {job.description.split('||').map((point, i) => {
                                                    if (!point.trim()) return null;
                                                    return (
                                                        <li key={i} className="achievement-item">
                                                            <ArrowRight size={14} className="achievement-icon" />
                                                            <span className="achievement-text">{point.trim()}</span>
                                                        </li>
                                                    );
                                                })}
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                
                            </motion.div>
                        );
                    })}
                </motion.div>
            </div>

            {/* --- CSS ARCHITECTURE --- */}
            <style>{`
                /* Font import for a clean, structural system font fallback */
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

                :root {
                    /* Color System */
                    --bg-page: #0A0A0B;
                    --bg-card: #121214;
                    --bg-card-hover: #18181B;
                    
                    --border-subtle: #27272A;
                    --border-strong: #3F3F46;
                    
                    --text-primary: #FAFAFA;
                    --text-secondary: #A1A1AA;
                    --text-tertiary: #71717A;
                    
                    --accent-primary: #FFFFFF;
                    --accent-muted: rgba(255, 255, 255, 0.1);
                    
                    /* Spacing & Layout */
                    --max-width: 1100px;
                    --node-size: 14px;
                    --track-width: 2px;
                }

                /* Base Section */
                .section-experience {
                    background-color: var(--bg-page);
                    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
                    padding: 120px 0;
                    color: var(--text-primary);
                    position: relative;
                }

                .experience-container {
                    max-width: var(--max-width);
                    margin: 0 auto;
                    padding: 0 24px;
                }

                /* Header Composition */
                .section-header {
                    text-align: center;
                    margin-bottom: 80px;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                }

                .section-eyebrow {
                    font-size: 0.8125rem;
                    text-transform: uppercase;
                    letter-spacing: 0.15em;
                    font-weight: 600;
                    color: var(--text-tertiary);
                }

                .section-title {
                    font-size: clamp(2rem, 5vw, 3rem);
                    font-weight: 700;
                    letter-spacing: -0.03em;
                    margin: 0;
                    color: var(--text-primary);
                }

                .section-description {
                    font-size: 1.125rem;
                    color: var(--text-secondary);
                    max-width: 500px;
                    margin: 0;
                    line-height: 1.6;
                }

                /* Layout Architecture */
                .timeline-layout {
                    position: relative;
                }

                /* The Line */
                .timeline-track-container {
                    position: absolute;
                    top: 8px;
                    bottom: 0;
                    left: 200px; /* 180px date + 20px gap */
                    width: var(--track-width);
                    transform: translateX(-50%);
                    background: transparent;
                }

                .timeline-track-line {
                    width: 100%;
                    background: linear-gradient(to bottom, var(--border-strong) 0%, var(--border-subtle) 80%, transparent 100%);
                    transform-origin: top;
                }

                /* Individual Row (Grid on Desktop) */
                .timeline-row {
                    display: grid;
                    grid-template-columns: 180px 40px 1fr;
                    gap: 0;
                    margin-bottom: 48px;
                    position: relative;
                }

                .timeline-row:last-child {
                    margin-bottom: 0;
                }

                /* 1. Date Column */
                .timeline-date-col {
                    text-align: right;
                    padding-right: 24px;
                    padding-top: 4px; /* Align with title text */
                }

                .date-text {
                    font-size: 0.9375rem;
                    color: var(--text-tertiary);
                    font-weight: 500;
                    transition: color 0.3s ease;
                }

                .date-active {
                    color: var(--text-primary);
                }

                /* 2. Node Column */
                .timeline-node-col {
                    position: relative;
                    display: flex;
                    justify-content: center;
                    padding-top: 8px; /* Align with title */
                }

                .timeline-node {
                    width: var(--node-size);
                    height: var(--node-size);
                    border-radius: 50%;
                    background-color: var(--bg-page);
                    border: 2px solid var(--border-strong);
                    position: relative;
                    z-index: 2;
                    transition: all 0.3s ease;
                }

                .node-active {
                    border-color: var(--accent-primary);
                    background-color: var(--accent-primary);
                }

                /* Pulsing effect for active node */
                .node-pulse {
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 24px;
                    height: 24px;
                    background-color: rgba(255, 255, 255, 0.15);
                    border-radius: 50%;
                    animation: pulse 2s infinite ease-in-out;
                    z-index: -1;
                }

                @keyframes pulse {
                    0% { transform: translate(-50%, -50%) scale(0.8); opacity: 0.8; }
                    100% { transform: translate(-50%, -50%) scale(1.5); opacity: 0; }
                }

                /* 3. Content Column & Cards */
                .timeline-content-col {
                    padding-left: 24px;
                }

                .experience-card {
                    background-color: var(--bg-card);
                    border: 1px solid var(--border-subtle);
                    border-radius: 16px;
                    padding: 32px;
                    transition: all 0.3s ease;
                }

                .experience-card:hover {
                    background-color: var(--bg-card-hover);
                    border-color: var(--border-strong);
                    transform: translateY(-2px);
                }

                .card-active {
                    border-color: rgba(255, 255, 255, 0.15);
                }

                /* Card Header elements */
                .card-header {
                    margin-bottom: 24px;
                }

                .mobile-date {
                    display: none; /* Hidden on desktop */
                }

                .title-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    flex-wrap: wrap;
                    margin-bottom: 12px;
                }

                .job-title {
                    font-size: 1.25rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin: 0;
                    letter-spacing: -0.01em;
                }

                .current-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 10px;
                    border-radius: 99px;
                    background: var(--accent-muted);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    font-size: 0.75rem;
                    font-weight: 500;
                    color: var(--text-primary);
                }

                .current-badge .dot {
                    width: 6px;
                    height: 6px;
                    background-color: #10B981; /* Subtle emerald indicator */
                    border-radius: 50%;
                }

                .job-metadata {
                    display: flex;
                    align-items: center;
                    flex-wrap: wrap;
                    gap: 12px;
                    font-size: 0.9375rem;
                    color: var(--text-secondary);
                    font-weight: 500;
                }

                .meta-item {
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .meta-icon {
                    color: var(--text-tertiary);
                }

                .meta-divider {
                    color: var(--border-strong);
                }

                /* Card Body (Achievements) */
                .achievement-list {
                    list-style: none;
                    padding: 0;
                    margin: 0;
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .achievement-item {
                    display: flex;
                    align-items: flex-start;
                    gap: 12px;
                }

                .achievement-icon {
                    color: var(--text-tertiary);
                    margin-top: 4px; /* Align with first line of text */
                    flex-shrink: 0;
                }

                .achievement-text {
                    font-size: 1rem;
                    line-height: 1.6;
                    color: var(--text-secondary);
                }

                /* Responsive Design Strategy */
                
                /* Tablet */
                @media (max-width: 1024px) {
                    .timeline-row {
                        grid-template-columns: 140px 40px 1fr;
                    }
                    .timeline-track-container {
                        left: 160px;
                    }
                    .experience-card {
                        padding: 24px;
                    }
                }

                /* Mobile (< 768px) */
                @media (max-width: 767px) {
                    .section-experience {
                        padding: 80px 0;
                    }
                    
                    .section-header {
                        margin-bottom: 60px;
                    }

                    /* Collapse grid to 2 columns: Node + Card */
                    .timeline-row {
                        grid-template-columns: 32px 1fr;
                        gap: 0;
                        margin-bottom: 40px;
                    }

                    /* Hide Desktop Date */
                    .timeline-date-col {
                        display: none;
                    }

                    /* Adjust Track Position */
                    .timeline-track-container {
                        left: 16px; /* Center of the 32px node column */
                    }

                    /* Adjust Node alignment */
                    .timeline-node-col {
                        padding-top: 32px; /* Push down to align visually with title */
                    }

                    /* Card adjustments */
                    .timeline-content-col {
                        padding-left: 16px;
                    }

                    .experience-card {
                        padding: 20px;
                    }

                    /* Reveal Mobile Date inside card */
                    .mobile-date {
                        display: flex;
                        align-items: center;
                        gap: 6px;
                        font-size: 0.8125rem;
                        color: var(--text-tertiary);
                        margin-bottom: 12px;
                        font-weight: 500;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                    }

                    .job-title {
                        font-size: 1.125rem;
                    }

                    .achievement-text {
                        font-size: 0.9375rem;
                    }
                }

                /* Micro Mobile (< 400px) */
                @media (max-width: 399px) {
                    .experience-container {
                        padding: 0 16px;
                    }
                    .timeline-row {
                        grid-template-columns: 24px 1fr;
                    }
                    .timeline-track-container {
                        left: 12px;
                    }
                    .timeline-content-col {
                        padding-left: 12px;
                    }
                    .experience-card {
                        padding: 16px;
                    }
                    .job-metadata {
                        flex-direction: column;
                        align-items: flex-start;
                        gap: 8px;
                    }
                    .meta-divider {
                        display: none;
                    }
                }

                /* Accessibility / Reduced Motion */
                @media (prefers-reduced-motion: reduce) {
                    .node-pulse {
                        animation: none;
                        display: none;
                    }
                    .experience-card {
                        transition: none;
                    }
                    .experience-card:hover {
                        transform: none;
                    }
                }
            `}</style>
        </section>
    );
};

export default Experience;