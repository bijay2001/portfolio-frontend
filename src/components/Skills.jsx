import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Code2, Monitor, Server, Database, Cloud, Code } from 'lucide-react';
import api from '../api/axiosClient';

const Skills = () => {
    // Upgraded fallback data reflecting your actual advanced stack
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

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                // If you don't have a live API yet, comment out the API call and use mock data above
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

    // Layout configuration to match the exact bento-box design
    const categoryConfig = [
        { id: 'Languages', title: 'Languages', desc: 'Core programming languages I work with.', icon: <Code2 size={22} />, color: '#7C3AED', colClass: 'col-12 col-lg-4' }, 
        { id: 'Frontend', title: 'Frontend', desc: 'Technologies for building interactive user interfaces.', icon: <Monitor size={22} />, color: '#06B6D4', colClass: 'col-12 col-lg-4' },
        { id: 'Backend', title: 'Backend', desc: 'Server-side technologies and APIs I build and integrate.', icon: <Server size={22} />, color: '#EC4899', colClass: 'col-12 col-lg-4' },
        { id: 'Database', title: 'Database', desc: 'Databases and query optimization techniques.', icon: <Database size={22} />, color: '#10B981', colClass: 'col-12 col-lg-6', hasGraphic: 'database' },
        { id: 'Tools & Cloud', title: 'Tools & Cloud', desc: 'Tools and platforms that power my workflow.', icon: <Cloud size={22} />, color: '#F59E0B', colClass: 'col-12 col-lg-6', hasGraphic: 'cloud' }
    ];

    // Smooth Staggered Animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { staggerChildren: 0.1, delayChildren: 0.1 } 
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: { 
            opacity: 1, 
            y: 0, 
            transition: { type: "spring", stiffness: 80, damping: 20 } 
        }
    };

    return (
        <section id="skills" className="skills-section py-5 position-relative z-1 overflow-hidden">
            
            {/* Ambient Background Grid & Glows */}
            <div className="tech-grid-bg"></div>
            <div className="ambient-glow-purple" style={{ top: '10%', left: '10%', opacity: 0.15 }}></div>
            <div className="ambient-glow-cyan" style={{ top: '40%', right: '10%', opacity: 0.1 }}></div>

            <div className="container position-relative z-1 py-4">
                
                {/* Header Section */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6 }}
                    className="text-center mb-5 pb-3"
                >
                    
                    <h2 className="display-5 fw-bolder text-white mb-3">
                        My <span className="text-gradient-skills">Tech Stack</span>
                    </h2>
                    <p className="skills-subtitle mx-auto">
                        A curated set of technologies and tools I use to build secure, scalable, and performant digital experiences.
                    </p>
                </motion.div>

                {/* Bento Grid layout */}
                <motion.div 
                    className="row g-4 justify-content-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {categoryConfig.map((category, index) => {
                        const categorySkills = groupedSkills[category.id] || [];
                        if (categorySkills.length === 0) return null;

                        return (
                            <div key={index} className={category.colClass}>
                                <motion.div 
                                    variants={cardVariants} 
                                    className="skill-bento-card h-100 d-flex flex-column"
                                    style={{ '--theme-color': category.color }}
                                >
                                    <div className="position-relative z-2">
                                        <div className="d-flex align-items-center gap-3 mb-3">
                                            <div className="skill-icon-box">
                                                {category.icon}
                                            </div>
                                            <h4 className="fw-bold text-white mb-0 fs-5">{category.title}</h4>
                                        </div>
                                        
                                        <p className="skill-card-desc mb-4">
                                            {category.desc}
                                        </p>
                                        
                                        <div className="d-flex flex-wrap gap-2">
                                            {categorySkills.map((skill, sIndex) => (
                                                <div key={sIndex} className="modern-skill-pill">
                                                    <span className="pill-dot"></span>
                                                    {skill.name}
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Native CSS Decorative Graphics for larger bottom cards */}
                                    {category.hasGraphic === 'database' && (
                                        <div className="decorative-graphic db-graphic d-none d-md-block">
                                            <div className="db-ring ring-1"></div>
                                            <div className="db-ring ring-2"></div>
                                            <div className="db-ring ring-3"></div>
                                        </div>
                                    )}

                                    {category.hasGraphic === 'cloud' && (
                                        <div className="decorative-graphic cloud-graphic d-none d-md-block">
                                            <Cloud size={140} strokeWidth={1} color={category.color} className="cloud-icon-deco" />
                                        </div>
                                    )}
                                </motion.div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            <style>{`
                :root {
                    --bg-deep: #060913;
                    --card-bg: #0C101A;
                    --text-muted: #8B949E;
                    --border-subtle: rgba(255, 255, 255, 0.05);
                }

                .skills-section {
                    background-color: var(--bg-deep);
                    font-family: 'Inter', -apple-system, sans-serif;
                    min-height: 80vh;
                }

                /* Header Styles */
                .badge-skills {
                    background: rgba(37, 99, 235, 0.1);
                    border: 1px solid rgba(37, 99, 235, 0.3);
                    color: #60A5FA;
                }

                .text-gradient-skills {
                    background: linear-gradient(135deg, #7C3AED 0%, #EC4899 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                    background-clip: text;
                }

                .skills-subtitle {
                    color: var(--text-muted);
                    font-size: 1.05rem;
                    max-width: 500px;
                    line-height: 1.6;
                }

                /* Ambient Background Effects */
                .tech-grid-bg {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        radial-gradient(circle at center, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
                    background-size: 30px 30px;
                    opacity: 0.3;
                    z-index: 0;
                    pointer-events: none;
                    mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
                    -webkit-mask-image: linear-gradient(to bottom, transparent, black 20%, black 80%, transparent);
                }

                .ambient-glow-purple, .ambient-glow-cyan {
                    position: absolute;
                    width: 400px;
                    height: 400px;
                    border-radius: 50%;
                    filter: blur(100px);
                    z-index: 0;
                    pointer-events: none;
                }
                .ambient-glow-purple { background: #7C3AED; }
                .ambient-glow-cyan { background: #06B6D4; }

                /* Bento Card Design */
                .skill-bento-card {
                    background: var(--card-bg);
                    border: 1px solid var(--border-subtle);
                    border-radius: 20px;
                    padding: 2rem;
                    position: relative;
                    overflow: hidden;
                    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
                    transition: all 0.3s ease;
                }

                .skill-bento-card:hover {
                    border-color: rgba(255, 255, 255, 0.1);
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                    transform: translateY(-2px);
                }

                .skill-icon-box {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 48px;
                    height: 48px;
                    border-radius: 14px;
                    background: color-mix(in srgb, var(--theme-color) 10%, transparent);
                    color: var(--theme-color);
                    border: 1px solid color-mix(in srgb, var(--theme-color) 25%, transparent);
                    box-shadow: inset 0 0 15px color-mix(in srgb, var(--theme-color) 10%, transparent);
                }

                .skill-card-desc {
                    color: var(--text-muted);
                    font-size: 0.9rem;
                    line-height: 1.5;
                }

                /* Modern Skill Pills */
                .modern-skill-pill {
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    padding: 6px 14px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid var(--border-subtle);
                    border-radius: 50px;
                    color: #E2E8F0;
                    font-size: 0.85rem;
                    font-weight: 500;
                    transition: all 0.3s ease;
                    cursor: default;
                }

                .pill-dot {
                    width: 6px;
                    height: 6px;
                    border-radius: 50%;
                    background-color: var(--theme-color);
                    box-shadow: 0 0 8px var(--theme-color);
                }

                .modern-skill-pill:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: color-mix(in srgb, var(--theme-color) 40%, transparent);
                    transform: translateY(-2px);
                }

                /* Native CSS Decorations for Bottom Cards */
                .decorative-graphic {
                    position: absolute;
                    bottom: -20px;
                    right: -20px;
                    z-index: 1;
                    opacity: 0.8;
                    pointer-events: none;
                }

                /* Database Rings effect built with CSS */
                .db-graphic {
                    right: 10px;
                    bottom: 10px;
                    width: 100px;
                    height: 120px;
                }

                .db-ring {
                    position: absolute;
                    width: 80px;
                    height: 35px;
                    border-radius: 50%;
                    border: 2px solid var(--theme-color);
                    background: color-mix(in srgb, var(--theme-color) 10%, #0C101A);
                    box-shadow: 0 0 15px color-mix(in srgb, var(--theme-color) 30%, transparent),
                                inset 0 0 10px color-mix(in srgb, var(--theme-color) 20%, transparent);
                    left: 10px;
                }

                .ring-1 { bottom: 60px; z-index: 3; }
                .ring-2 { bottom: 40px; z-index: 2; }
                .ring-3 { bottom: 20px; z-index: 1; }

                /* Cloud glow effect */
                .cloud-graphic {
                    right: 0px;
                    bottom: -30px;
                    filter: drop-shadow(0 0 20px color-mix(in srgb, var(--theme-color) 40%, transparent));
                    transform: rotate(-5deg);
                }
                
                .cloud-icon-deco {
                    opacity: 0.3;
                }

                /* Mobile Adjustments */
                @media (max-width: 768px) {
                    .skill-bento-card {
                        padding: 1.5rem;
                    }
                    .badge-skills {
                        font-size: 0.7rem;
                    }
                    .modern-skill-pill {
                        font-size: 0.8rem;
                        padding: 5px 12px;
                    }
                }
            `}</style>
        </section>
    );
};

export default Skills;