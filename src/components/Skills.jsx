import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
    Code2, 
    Monitor, 
    Server, 
    Database, 
    Cloud, 
    Cpu,
    Sparkles
} from 'lucide-react';
import api from '../api/axiosClient';

const Skills = () => {
    // Preserved exact fallback data
    const [skills, setSkills] = useState([
        { name: 'JavaScript (ES6+)', category: 'Languages' },
        { name: 'TypeScript', category: 'Languages' },
        { name: 'PHP', category: 'Languages' },
        { name: 'SQL', category: 'Languages' },
        { name: 'React.js', category: 'Frontend' },
        { name: 'React Hooks', category: 'Frontend' },
        { name: 'Redux', category: 'Frontend' },
        { name: 'HTML5', category: 'Frontend' },
        { name: 'CSS3', category: 'Frontend' },
        { name: 'Bootstrap 5', category: 'Frontend' },
        { name: 'Node.js', category: 'Backend' },
        { name: 'Express.js', category: 'Backend' },
        { name: 'REST APIs', category: 'Backend' },
        { name: 'MVC Architecture', category: 'Backend' },
        { name: 'WebSockets', category: 'Backend' },
        { name: 'JWT Auth', category: 'Backend' },
        { name: 'MySQL', category: 'Database' },
        { name: 'Joins & Indexing', category: 'Database' },
        { name: 'Normalization', category: 'Database' },
        { name: 'Transactions', category: 'Database' },
        { name: 'Git & GitHub', category: 'Tools & Cloud' },
        { name: 'VS Code', category: 'Tools & Cloud' },
        { name: 'Postman', category: 'Tools & Cloud' },
        { name: 'AWS (Learning)', category: 'Tools & Cloud' }
    ]);

    // Define core stack for immediate recruiter visibility
    const coreStack = ['JavaScript (ES6+)', 'React.js', 'Node.js', 'PHP', 'MySQL'];

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await api.get('/skills');
                if (res.data && res.data.status === 'success' && res.data.data.length > 0) {
                    setSkills(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching skills, using fallback data:", error);
            }
        };
        fetchSkills();
    }, []);

    const groupedSkills = skills.reduce((acc, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
    }, {});

    const categoryConfig = [
        { id: 'Languages', title: 'Languages', desc: 'Core languages and syntax.', icon: <Code2 size={20} />, color: '#8B5CF6' }, 
        { id: 'Frontend', title: 'Frontend', desc: 'Client-side UI architecture.', icon: <Monitor size={20} />, color: '#06B6D4' },
        { id: 'Backend', title: 'Backend', desc: 'Server-side logic and APIs.', icon: <Server size={20} />, color: '#EC4899' },
        { id: 'Database', title: 'Data & Architecture', desc: 'Schema design and query optimization.', icon: <Database size={20} />, color: '#10B981' },
        { id: 'Tools & Cloud', title: 'Tools & Cloud', desc: 'DevOps and workflow platforms.', icon: <Cloud size={20} />, color: '#F59E0B' }
    ];

    // Framer Motion Variants
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
        <section id="skills" className="section-skills">
            <div className="skills-container">
                
                {/* Premium Header */}
                <motion.div 
                    className="skills-header"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                >
                    <div className="eyebrow">
                        <Sparkles size={16} />
                        <span>Technical Expertise</span>
                    </div>
                    <h2 className="section-title">My Tech Stack</h2>
                    <p className="section-subtitle">
                        A curated set of technologies I use to build scalable, secure, and highly performant digital experiences.
                    </p>
                </motion.div>

                <motion.div 
                    className="skills-content"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {/* Core Stack Highlight */}
                    <motion.div variants={itemVariants} className="core-stack-panel">
                        <div className="core-stack-label">
                            <Cpu size={18} />
                            <span>Core Stack</span>
                        </div>
                        <div className="core-stack-list">
                            {coreStack.map((tech, idx) => (
                                <span key={idx} className="core-tech-item">
                                    {tech}
                                </span>
                            ))}
                        </div>
                    </motion.div>

                    {/* Architectural CSS Grid for Categories */}
                    <div className="skills-matrix">
                        {categoryConfig.map((category, index) => {
                            const categorySkills = groupedSkills[category.id] || [];
                            if (categorySkills.length === 0) return null;

                            return (
                                <motion.div 
                                    key={index} 
                                    variants={itemVariants} 
                                    className="skill-card"
                                    style={{ '--accent': category.color }}
                                >
                                    <div className="card-top">
                                        <div className="category-header">
                                            <div className="icon-surface">
                                                {category.icon}
                                            </div>
                                            <h3 className="category-title">{category.title}</h3>
                                        </div>
                                        <p className="category-desc">{category.desc}</p>
                                    </div>
                                    
                                    <div className="card-bottom">
                                        <div className="skill-pills">
                                            {categorySkills.map((skill, sIndex) => {
                                                const isCore = coreStack.includes(skill.name);
                                                return (
                                                    <span 
                                                        key={sIndex} 
                                                        className={`skill-pill ${isCore ? 'pill-core' : ''}`}
                                                    >
                                                        {skill.name}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </motion.div>
            </div>

            {/* --- STRICT NATIVE CSS ARCHITECTURE --- */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

                :root {
                    --bg-main: #09090b;
                    --bg-card: rgba(24, 24, 27, 0.4);
                    --bg-card-hover: rgba(39, 39, 42, 0.6);
                    --bg-surface: rgba(255, 255, 255, 0.03);
                    
                    --border-light: rgba(255, 255, 255, 0.08);
                    --border-strong: rgba(255, 255, 255, 0.15);
                    
                    --text-primary: #FAFAFA;
                    --text-secondary: #A1A1AA;
                    --text-tertiary: #71717A;
                    
                    --layout-max-width: 1200px;
                }

                .section-skills {
                    background-color: var(--bg-main);
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    padding: 100px 0;
                    color: var(--text-primary);
                }

                .skills-container {
                    max-width: var(--layout-max-width);
                    margin: 0 auto;
                    padding: 0 24px;
                }

                /* Header */
                .skills-header {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    text-align: center;
                    margin-bottom: 64px;
                }

                .eyebrow {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 14px;
                    background: var(--bg-surface);
                    border: 1px solid var(--border-light);
                    border-radius: 100px;
                    font-size: 0.8125rem;
                    font-weight: 600;
                    color: var(--text-secondary);
                    text-transform: uppercase;
                    letter-spacing: 0.08em;
                    margin-bottom: 20px;
                }

                .section-title {
                    font-size: clamp(2.5rem, 5vw, 3.5rem);
                    font-weight: 700;
                    letter-spacing: -0.03em;
                    margin: 0 0 16px 0;
                    color: var(--text-primary);
                }

                .section-subtitle {
                    font-size: clamp(1rem, 2vw, 1.125rem);
                    color: var(--text-secondary);
                    max-width: 540px;
                    line-height: 1.6;
                    margin: 0;
                }

                /* Core Stack Panel */
                .core-stack-panel {
                    display: flex;
                    align-items: center;
                    background: var(--bg-card);
                    border: 1px solid var(--border-light);
                    border-radius: 16px;
                    padding: 16px 24px;
                    margin-bottom: 32px;
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                }

                .core-stack-label {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    color: var(--text-primary);
                    font-weight: 600;
                    font-size: 0.9375rem;
                    padding-right: 24px;
                    border-right: 1px solid var(--border-light);
                    margin-right: 24px;
                    flex-shrink: 0;
                }

                .core-stack-list {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 16px;
                    align-items: center;
                }

                .core-tech-item {
                    font-size: 0.9375rem;
                    font-weight: 500;
                    color: var(--text-secondary);
                }

                /* Main Matrix Grid */
                .skills-matrix {
                    display: grid;
                    grid-template-columns: repeat(6, 1fr);
                    gap: 24px;
                }

                .skill-card {
                    background: var(--bg-card);
                    border: 1px solid var(--border-light);
                    border-radius: 20px;
                    padding: 32px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    backdrop-filter: blur(12px);
                    -webkit-backdrop-filter: blur(12px);
                    transition: transform 0.3s ease, border-color 0.3s ease, background 0.3s ease;
                }

                /* Grid Layout Assignments for perfect balance */
                .skill-card:nth-child(1),
                .skill-card:nth-child(2),
                .skill-card:nth-child(3) {
                    grid-column: span 2; /* Top row: 3 cards */
                }

                .skill-card:nth-child(4),
                .skill-card:nth-child(5) {
                    grid-column: span 3; /* Bottom row: 2 cards */
                }

                .skill-card:hover {
                    background: var(--bg-card-hover);
                    border-color: var(--border-strong);
                    transform: translateY(-4px);
                }

                /* Card Internals */
                .card-top {
                    margin-bottom: 32px;
                }

                .category-header {
                    display: flex;
                    align-items: center;
                    gap: 16px;
                    margin-bottom: 12px;
                }

                .icon-surface {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    border-radius: 10px;
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid var(--border-light);
                    color: var(--text-primary);
                    transition: color 0.3s ease, border-color 0.3s ease;
                }

                .skill-card:hover .icon-surface {
                    color: var(--accent);
                    border-color: rgba(255, 255, 255, 0.15);
                }

                .category-title {
                    font-size: 1.125rem;
                    font-weight: 600;
                    margin: 0;
                    color: var(--text-primary);
                    letter-spacing: -0.01em;
                }

                .category-desc {
                    font-size: 0.875rem;
                    color: var(--text-secondary);
                    margin: 0;
                    line-height: 1.5;
                }

                /* Modern Skill Pills */
                .skill-pills {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 10px;
                }

                .skill-pill {
                    display: inline-flex;
                    align-items: center;
                    padding: 8px 14px;
                    background: var(--bg-surface);
                    border: 1px solid var(--border-light);
                    border-radius: 8px;
                    font-size: 0.875rem;
                    font-weight: 500;
                    color: var(--text-secondary);
                    transition: all 0.2s ease;
                    cursor: default;
                }

                /* Special style for core skills rendered inside the main grid */
                .skill-pill.pill-core {
                    color: var(--text-primary);
                    background: rgba(255, 255, 255, 0.08);
                    border-color: var(--border-strong);
                }

                .skill-pill:hover {
                    color: var(--text-primary);
                    background: rgba(255, 255, 255, 0.1);
                    border-color: var(--accent);
                }

                /* Responsive Design */
                @media (max-width: 1024px) {
                    .skills-matrix {
                        grid-template-columns: repeat(2, 1fr); /* 2 Columns on Tablet */
                    }
                    .skill-card:nth-child(n) {
                        grid-column: span 1; /* Reset specific spans */
                    }
                    
                    /* Make the last card full width if there's an odd number */
                    .skill-card:nth-child(5) {
                        grid-column: span 2;
                    }
                }

                @media (max-width: 768px) {
                    .section-skills {
                        padding: 80px 0;
                    }
                    
                    .core-stack-panel {
                        flex-direction: column;
                        align-items: flex-start;
                        padding: 20px;
                        gap: 16px;
                    }
                    
                    .core-stack-label {
                        border-right: none;
                        border-bottom: 1px solid var(--border-light);
                        padding-right: 0;
                        padding-bottom: 12px;
                        margin-right: 0;
                        width: 100%;
                    }

                    .skills-matrix {
                        grid-template-columns: 1fr; /* 1 Column on Mobile */
                    }

                    .skill-card:nth-child(n) {
                        grid-column: span 1;
                    }

                    .skill-card {
                        padding: 24px; /* Reduced padding for mobile */
                    }
                }

                @media (max-width: 480px) {
                    .skills-container {
                        padding: 0 16px;
                    }
                    .skill-pill {
                        font-size: 0.8125rem;
                        padding: 6px 12px;
                    }
                }

                /* Accessibility */
                @media (prefers-reduced-motion: reduce) {
                    .skill-card {
                        transition: none;
                    }
                    .skill-card:hover {
                        transform: none;
                    }
                }
            `}</style>
        </section>
    );
};

export default Skills;