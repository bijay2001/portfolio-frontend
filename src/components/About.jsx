import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
    GraduationCap, 
    Coffee, 
    Briefcase, 
    Rocket, 
    Download, 
    Send, 
    Code2, 
    Database, 
    Layout, 
    Server,
    Sparkles,
    CheckCircle2
} from 'lucide-react';
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
                console.error("Error fetching about data. Falling back to mock data.", err);
                // MOCK DATA: Used as fallback
                setData({
                    profile: {
                        summary: "I build reliable, scalable, and efficient web applications that solve real-world problems. Passionate about clean code, performance, and crafting exceptional user experiences from the server to the browser.",
                        resume_url: "/assets/docs/Bijay_Resume.pdf"
                    },
                    education: [
                        { title: "Master of Computer Applications", year: "2022 - 2024", inst: "Aryan Institute of Engineering and Technology, Bhubaneswar" },
                        { title: "B.Sc in Chemistry", year: "2019 - 2022", inst: "Fakir Mohan University, Balasore" },
                        { title: "Higher Secondary (+2)", year: "2017 - 2019", inst: "CHSE Odisha" },
                        { title: "Matriculation", year: "2017", inst: "BSE Odisha" }
                    ]
                });
            }
        };
        fetchAboutData();
    }, []);

    // --- DYNAMIC URL LOGIC ---
    const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');
    
    const getFileUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        let cleanPath = path.replace(/^\.?\//, ""); 
        return `${baseUrl}/${cleanPath}`;
    };

    const rawResume = data.profile?.resume_url || data.profile?.resume;
    const resumeDownloadUrl = rawResume ? getFileUrl(rawResume) : "#";
    const summaryText = data.profile?.summary || "I build reliable, scalable, and efficient web applications that solve real-world problems. Passionate about clean code, performance, and great user experiences.";

    // Advanced Spring Animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { type: "spring", stiffness: 90, damping: 20 } 
        }
    };

    return (
        <section id="about" className="about-section">
            <div className="about-container">
                
                {/* Section Header */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true, margin: "-50px" }} 
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    className="section-header-wrapper"
                >
                    <div className="eyebrow-badge">
                        <Sparkles size={16} className="eyebrow-icon" />
                        <span>Get to know me</span>
                    </div>
                    <h2 className="section-title">
                        Behind the <span className="text-gradient">Code.</span>
                    </h2>
                </motion.div>

                {/* Custom CSS Grid (Fixes the empty space issue!) */}
                <motion.div 
                    className="about-bento-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {/* LEFT COLUMN: Bio, Skills, Stats, Actions */}
                    <div className="bento-col-main">
                        
                        {/* Bio & Stack Card */}
                        <motion.div variants={itemVariants} className="bento-card bio-card">
                            <h3 className="card-title">Full Stack Developer</h3>
                            <p className="summary-text">
                                {summaryText}
                            </p>
                            
                            <div className="stack-container">
                                <h4 className="micro-title">Core Stack</h4>
                                <div className="pill-group">
                                    <div className="tech-pill">
                                        <Server size={14} /> <span>Node.js</span>
                                    </div>
                                    <div className="tech-pill">
                                        <Database size={14} /> <span>React.js</span>
                                    </div>
                                    <div className="tech-pill">
                                        <Layout size={14} /> <span>MySQL</span>
                                    </div>
                                    <div className="tech-pill">
                                        <Code2 size={14} /> <span>PHP</span>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* Stats Row */}
                        <motion.div variants={containerVariants} className="stats-grid">
                            <motion.div variants={itemVariants} className="bento-card stat-card">
                                <div className="stat-icon-wrapper">
                                    <Briefcase size={20} />
                                </div>
                                <h3 className="stat-number">1.5+</h3>
                                <span className="stat-label">Years Exp</span>
                            </motion.div>
                            
                            <motion.div variants={itemVariants} className="bento-card stat-card">
                                <div className="stat-icon-wrapper">
                                    <Rocket size={20} />
                                </div>
                                <h3 className="stat-number">10+</h3>
                                <span className="stat-label">Projects</span>
                            </motion.div>
                            
                            <motion.div variants={itemVariants} className="bento-card stat-card">
                                <div className="stat-icon-wrapper">
                                    <Coffee size={20} />
                                </div>
                                <h3 className="stat-number">Daily</h3>
                                <span className="stat-label">Coffee</span>
                            </motion.div>
                        </motion.div>

                        {/* Action Buttons */}
                        <motion.div variants={itemVariants} className="action-buttons-wrapper">
                            <a href={resumeDownloadUrl} download target="_blank" rel="noreferrer" className="action-btn btn-primary">
                                <Download size={18} />
                                <span>Download Resume</span>
                            </a>
                            <a href="#contact" className="action-btn btn-secondary">
                                <Send size={18} />
                                <span>Get in Touch</span>
                            </a>
                        </motion.div>

                    </div>

                    {/* RIGHT COLUMN: Education Timeline */}
                    <div className="bento-col-side">
                        <motion.div variants={itemVariants} className="bento-card edu-card">
                            <div className="edu-header">
                                <div className="icon-surface">
                                    <GraduationCap size={20} />
                                </div>
                                <h3 className="card-title m-0">Education</h3>
                            </div>
                            
                            <div className="elegant-timeline">
                                {data.education.map((edu, index) => (
                                    <div key={index} className="timeline-node-wrapper">
                                        <div className="timeline-dot">
                                            <div className="timeline-dot-inner"></div>
                                        </div>
                                        <div className="timeline-content">
                                            <div className="timeline-year">{edu.year}</div>
                                            <h5 className="timeline-edu-title">{edu.title}</h5>
                                            <p className="timeline-inst">{edu.inst}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                    
                </motion.div>
            </div>
            
            {/* --- PREMIUM PRODUCTION CSS --- */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

                :root {
                    --bg-app: #030303;
                    --bg-card: rgba(15, 15, 17, 0.7);
                    --bg-card-hover: rgba(20, 20, 22, 0.9);
                    
                    --border-light: rgba(255, 255, 255, 0.06);
                    --border-hover: rgba(255, 255, 255, 0.12);
                    
                    --text-primary: #F8F8F8;
                    --text-secondary: #A1A1AA;
                    --text-tertiary: #71717A;
                    
                    --brand-color: #FFFFFF;
                }

                .about-section {
                    background-color: var(--bg-app);
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    padding: 120px 0;
                    color: var(--text-primary);
                    position: relative;
                }

                .about-container {
                    max-width: 1140px;
                    margin: 0 auto;
                    padding: 0 24px;
                }

                /* Header Styling */
                .section-header-wrapper {
                    margin-bottom: 60px;
                }

                .eyebrow-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 14px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--border-light);
                    border-radius: 100px;
                    font-size: 0.8125rem;
                    font-weight: 500;
                    color: var(--text-secondary);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 16px;
                }

                .eyebrow-icon {
                    color: var(--brand-color);
                }

                .section-title {
                    font-size: clamp(2.5rem, 5vw, 4rem);
                    font-weight: 700;
                    letter-spacing: -0.03em;
                    line-height: 1.1;
                    margin: 0;
                }

                .text-gradient {
                    color: var(--text-tertiary);
                }

                /* 
                 * CORE FIX: The Custom Grid 
                 * This perfectly balances the heights and solves the empty space issue.
                 */
                .about-bento-grid {
                    display: grid;
                    grid-template-columns: 1fr;
                    gap: 1.5rem;
                }

                @media (min-width: 992px) {
                    .about-bento-grid {
                        grid-template-columns: 1.3fr 0.8fr;
                        align-items: start; /* PREVENTS the right column from stretching! */
                    }
                }

                .bento-col-main {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                .bento-col-side {
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                }

                /* Base Card Styling */
                .bento-card {
                    background: var(--bg-card);
                    border: 1px solid var(--border-light);
                    border-radius: 24px;
                    padding: 32px;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
                }

                .bento-card:hover {
                    background: var(--bg-card-hover);
                    border-color: var(--border-hover);
                }

                .card-title {
                    font-size: 1.5rem;
                    font-weight: 600;
                    letter-spacing: -0.02em;
                    color: var(--text-primary);
                    margin-top: 0;
                    margin-bottom: 16px;
                }

                .summary-text {
                    font-size: 1.125rem;
                    color: var(--text-secondary);
                    line-height: 1.6;
                    font-weight: 400;
                    margin-bottom: 32px;
                }

                /* Stack Styling */
                .stack-container {
                    padding-top: 24px;
                    border-top: 1px solid var(--border-light);
                }

                .micro-title {
                    font-size: 0.8125rem;
                    font-weight: 600;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: var(--text-tertiary);
                    margin-bottom: 16px;
                    margin-top: 0;
                }

                .pill-group {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .tech-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--border-light);
                    padding: 8px 16px;
                    border-radius: 12px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: var(--text-primary);
                    transition: all 0.2s ease;
                }

                .tech-pill:hover {
                    background: rgba(255, 255, 255, 0.08);
                    border-color: rgba(255, 255, 255, 0.15);
                    transform: translateY(-2px);
                }

                .tech-pill svg {
                    color: var(--text-secondary);
                }

                /* Stats Grid */
                .stats-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 1.5rem;
                }

                @media (max-width: 576px) {
                    .stats-grid {
                        grid-template-columns: 1fr;
                    }
                }

                .stat-card {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    padding: 24px;
                }

                .stat-icon-wrapper {
                    color: var(--text-secondary);
                    margin-bottom: 12px;
                }

                .stat-number {
                    font-size: 2rem;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                    margin: 0 0 4px 0;
                    color: var(--text-primary);
                }

                .stat-label {
                    font-size: 0.8125rem;
                    color: var(--text-tertiary);
                    font-weight: 500;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                }

                /* Action Buttons */
                .action-buttons-wrapper {
                    display: flex;
                    gap: 1rem;
                }

                @media (max-width: 576px) {
                    .action-buttons-wrapper {
                        flex-direction: column;
                    }
                }

                .action-btn {
                    flex: 1;
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    padding: 16px 24px;
                    border-radius: 16px;
                    font-size: 0.9375rem;
                    font-weight: 600;
                    text-decoration: none;
                    transition: all 0.2s ease;
                }

                .btn-primary {
                    background: var(--text-primary);
                    color: var(--bg-app);
                }

                .btn-primary:hover {
                    transform: translateY(-2px);
                    opacity: 0.9;
                    box-shadow: 0 8px 20px rgba(255, 255, 255, 0.1);
                }

                .btn-secondary {
                    background: var(--bg-card);
                    color: var(--text-primary);
                    border: 1px solid var(--border-light);
                }

                .btn-secondary:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.15);
                    transform: translateY(-2px);
                }

                /* Education Timeline (Right Side) */
                .edu-header {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 32px;
                }

                .icon-surface {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 44px;
                    height: 44px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--border-light);
                    border-radius: 12px;
                    color: var(--brand-color);
                }

                .elegant-timeline {
                    position: relative;
                    padding-left: 20px;
                }

                /* Vertical Track Line */
                .elegant-timeline::before {
                    content: '';
                    position: absolute;
                    left: 20px;
                    top: 10px;
                    bottom: 10px;
                    width: 1px;
                    background: linear-gradient(to bottom, var(--border-hover) 0%, var(--border-light) 80%, transparent 100%);
                }

                .timeline-node-wrapper {
                    position: relative;
                    padding-left: 28px;
                    margin-bottom: 32px;
                }

                .timeline-node-wrapper:last-child {
                    margin-bottom: 0;
                }

                .timeline-dot {
                    position: absolute;
                    left: -4px;
                    top: 6px;
                    width: 9px;
                    height: 9px;
                    border-radius: 50%;
                    background: var(--bg-card);
                    border: 1px solid var(--text-tertiary);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: border-color 0.3s ease;
                }

                .timeline-node-wrapper:hover .timeline-dot {
                    border-color: var(--brand-color);
                }

                .timeline-dot-inner {
                    width: 3px;
                    height: 3px;
                    background: var(--text-tertiary);
                    border-radius: 50%;
                    transition: background 0.3s ease;
                }

                .timeline-node-wrapper:hover .timeline-dot-inner {
                    background: var(--brand-color);
                }

                .timeline-year {
                    font-size: 0.8125rem;
                    font-weight: 500;
                    color: var(--text-tertiary);
                    margin-bottom: 6px;
                }

                .timeline-edu-title {
                    font-size: 1.0625rem;
                    font-weight: 600;
                    color: var(--text-primary);
                    margin: 0 0 6px 0;
                    line-height: 1.4;
                }

                .timeline-inst {
                    font-size: 0.9375rem;
                    color: var(--text-secondary);
                    margin: 0;
                    line-height: 1.5;
                }

                /* Global Utility */
                .m-0 { margin: 0; }
            `}</style>
        </section>
    );
};

export default About;