import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Terminal, MonitorSmartphone, Server, Database, Cloud } from 'lucide-react';
import api from '../api/axiosClient';

const Skills = () => {
    // Upgraded fallback data reflecting your actual advanced stack
    const [skills, setSkills] = useState([
        { name: 'JavaScript (ES6+)', category: 'Languages' },
        { name: 'PHP', category: 'Languages' },
        { name: 'React.js', category: 'Frontend' },
        { name: 'Bootstrap 5', category: 'Frontend' },
        { name: 'Node.js', category: 'Backend' },
        { name: 'Socket.io (WebSockets)', category: 'Backend' },
        { name: 'Cron Jobs', category: 'Backend' },
        { name: 'MySQL', category: 'Database' },
        { name: 'AWS & Plesk', category: 'Tools & Cloud' },
        { name: 'PM2 & Git', category: 'Tools & Cloud' }
    ]);

    useEffect(() => {
        const fetchSkills = async () => {
            try {
                const res = await api.get('/skills');
                if (res.data && res.data.status === 'success' && res.data.data.length > 0) {
                    setSkills(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching skills:", error);
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
        { id: 'Languages', title: 'Languages', icon: <Terminal size={20} />, color: '#7B61FF' }, // Neon Purple
        { id: 'Frontend', title: 'Frontend', icon: <MonitorSmartphone size={20} />, color: '#00DBE0' }, // Neon Cyan
        { id: 'Backend', title: 'Backend', icon: <Server size={20} />, color: '#ec4899' }, // Neon Pink
        { id: 'Database', title: 'Database', icon: <Database size={20} />, color: '#10B981' }, // Emerald
        { id: 'Tools & Cloud', title: 'Tools & Cloud', icon: <Cloud size={20} />, color: '#F59E0B' } // Amber
    ];

    // Smooth Staggered Animations
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { 
            opacity: 1, 
            transition: { staggerChildren: 0.1, delayChildren: 0.2 } 
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1, 
            transition: { type: "spring", stiffness: 100, damping: 20 } 
        }
    };

    return (
        <section id="skills" className="py-5 my-5 position-relative z-1 overflow-hidden" style={{ minHeight: '70vh' }}>
            
            {/* Ambient Background Grid & Glows */}
            <div className="tech-grid-bg"></div>
            <div className="ambient-glow-purple" style={{ top: '20%', left: '0%', opacity: 0.1 }}></div>
            <div className="ambient-glow-cyan" style={{ bottom: '20%', right: '0%', opacity: 0.1 }}></div>

            <div className="container position-relative z-1">
                
                {/* Header */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6 }}
                    className="text-center mb-5"
                >
                    <h2 className="display-4 fw-bolder text-white mb-3">Tech <span className="text-gradient-primary">Stack</span></h2>
                    <p className="sub-text-light fs-5 mx-auto" style={{ maxWidth: '600px' }}>
                        The core technologies I use to architect secure, scalable, and real-time digital experiences.
                    </p>
                </motion.div>

                {/* Compact Bento Grid */}
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
                            <div key={index} className="col-12 col-md-6 col-lg-4">
                                <motion.div 
                                    variants={cardVariants} 
                                    className="skill-card h-100"
                                    style={{ '--cat-color': category.color }}
                                >
                                    <div className="d-flex align-items-center gap-3 mb-4">
                                        <div className="skill-icon-wrapper">
                                            {category.icon}
                                        </div>
                                        <h4 className="fw-bold text-white mb-0 fs-5">{category.title}</h4>
                                    </div>
                                    
                                    <div className="d-flex flex-wrap gap-2">
                                        {categorySkills.map((skill, sIndex) => (
                                            <div key={sIndex} className="skill-pill">
                                                {skill.name}
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </motion.div>
            </div>

            <style>{`
                /* --- Explicit Text & Base Styles --- */
                .sub-text-light { color: #94a3b8 !important; }
                
                /* Subtle Tech Grid Background */
                .tech-grid-bg {
                    position: absolute;
                    inset: 0;
                    background-image: 
                        linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
                    background-size: 40px 40px;
                    opacity: 0.5;
                    z-index: 0;
                    pointer-events: none;
                    mask-image: radial-gradient(circle at center, black, transparent 80%);
                    -webkit-mask-image: radial-gradient(circle at center, black, transparent 80%);
                }

                /* --- High-End Skill Cards --- */
                .skill-card {
                    background: #0a0d14; /* Deep dark native background */
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    border-radius: 1.25rem;
                    padding: 1.75rem;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
                }

                .skill-card::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 3px;
                    background: var(--cat-color);
                    opacity: 0.3;
                    transition: opacity 0.4s ease;
                }

                .skill-card:hover {
                    transform: translateY(-5px);
                    border-color: rgba(255, 255, 255, 0.1);
                    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.6),
                                inset 0 0 0 1px rgba(255, 255, 255, 0.02);
                }

                .skill-card:hover::before {
                    opacity: 1;
                    box-shadow: 0 0 15px var(--cat-color);
                }

                /* --- Animated Icon Wrapper --- */
                .skill-icon-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 42px;
                    height: 42px;
                    border-radius: 12px;
                    background: rgba(255, 255, 255, 0.03);
                    color: var(--cat-color);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.3s ease;
                }

                .skill-card:hover .skill-icon-wrapper {
                    background: color-mix(in srgb, var(--cat-color) 15%, transparent);
                    border-color: color-mix(in srgb, var(--cat-color) 40%, transparent);
                    transform: scale(1.1) rotate(-5deg);
                }

                /* --- Ultra-Compact Hover Pills --- */
                .skill-pill {
                    padding: 6px 14px;
                    border-radius: 50px;
                    background: rgba(255, 255, 255, 0.02);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    font-size: 0.85rem;
                    color: #cbd5e1;
                    font-weight: 500;
                    letter-spacing: 0.01em;
                    transition: all 0.3s ease;
                    cursor: default;
                }

                .skill-pill:hover {
                    background: color-mix(in srgb, var(--cat-color) 10%, transparent);
                    border-color: var(--cat-color);
                    color: #ffffff;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px color-mix(in srgb, var(--cat-color) 20%, transparent);
                }
            `}</style>
        </section>
    );
};

export default Skills;