import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { 
    GraduationCap, 
    Coffee, 
    Briefcase, 
    Rocket, 
    Download, 
    Send, 
    CheckCircle2, 
    Code2, 
    Database, 
    Layout, 
    Server 
} from 'lucide-react';
import api from '../api/axiosClient';

const About = () => {
    const [data, setData] = useState({ profile: null, education: [] });

    useEffect(() => {
        const fetchAboutData = async () => {
            console.log("1. Starting About API Call..."); // Debug Step 1
            try {
                const res = await api.get('/profile');
                console.log("2. Success! Fetched About Data:", res.data); // Debug Step 2
                
                if (res.data && res.data.status === 'success') {
                    setData(res.data);
                }
            } catch (err) {
                console.error("3. Error fetching about data. Falling back to mock data.", err); // Debug Step 3
                
                // MOCK DATA: Used as fallback if API is not running
                setData({
                    profile: {
                        summary: "I build reliable, scalable, and efficient web applications that solve real-world problems. Passionate about clean code, performance, and great user experiences.",
                        // Add fallback mock URLs here for testing
                        profile_image: "/assets/img/my-profile.jpg", 
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

    // --- DYNAMIC URL LOGIC (Same as your Certifications page) ---
    const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');
    
    const getFileUrl = (path) => {
        if (!path) return '';
        if (path.startsWith('http')) return path;
        
        // Remove leading dots and slashes (e.g., "./assets" becomes "assets")
        let cleanPath = path.replace(/^\.?\//, ""); 
        return `${baseUrl}/${cleanPath}`;
    };

    // 1. Format Profile Image URL
    const rawImg = data.profile?.profile_image || data.profile?.image_url;
    const profileImageUrl = rawImg 
        ? getFileUrl(rawImg) 
        : "https://ui-avatars.com/api/?name=Bijay+Developer&background=0D8ABC&color=fff"; // Ultimate fallback avatar

    // 2. Format Resume URL
    const rawResume = data.profile?.resume_url || data.profile?.resume;
    const resumeDownloadUrl = rawResume ? getFileUrl(rawResume) : "#"; // Fallback if no resume

    // 3. Format Summary Text
    const summaryText = data.profile?.summary || "I build reliable, scalable, and efficient web applications that solve real-world problems. Passionate about clean code, performance, and great user experiences.";

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
                    className="row g-4 justify-content-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {/* Bento Card 1: Profile Summary & Stats */}
                    <motion.div variants={cardVariants} className="col-lg-7">
                        <div className="premium-bento-card h-100 d-flex flex-column">
                            <div className="card-glow-effect"></div>
                            
                            {/* Profile Top Section: Image + Info */}
                            <div className="d-flex flex-column flex-md-row gap-4 mb-4 position-relative z-2">
                                
                                {/* DYNAMIC Profile Image with Status Badge */}
                                <div className="profile-image-container flex-shrink-0 mx-auto mx-md-0">
                                    <div className="profile-image-ring">
                                        <img src={profileImageUrl} alt="Profile" className="profile-img" />
                                    </div>
                                    <div className="status-badge">
                                        <CheckCircle2 size={14} className="text-success-neon" />
                                        <span>Available</span>
                                    </div>
                                </div>

                                {/* Text & Skills */}
                                <div className="profile-info text-center text-md-start">
                                    <h3 className="card-title text-gradient mb-3">Full Stack Developer</h3>
                                    <p className="summary-text mb-4">
                                        {summaryText}
                                    </p>
                                    
                                    {/* Skills Pills */}
                                    <div className="d-flex flex-wrap gap-2 justify-content-center justify-content-md-start">
                                        <div className="skill-pill">
                                            <Server size={14} className="text-purple" /> <span>Node.js</span>
                                        </div>
                                        <div className="skill-pill">
                                            <Database size={14} className="text-cyan" /> <span>React.js</span>
                                        </div>
                                        <div className="skill-pill">
                                            <Layout size={14} className="text-secondary" /> <span>MySql</span>
                                        </div>
                                        <div className="skill-pill">
                                            <Code2 size={14} className="text-success" /> <span>PHP</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* SaaS Style Stats Widgets */}
                            <div className="row g-3 mt-2 position-relative z-2">
                                <div className="col-12 col-sm-4">
                                    <div className="stat-widget">
                                        <Briefcase size={22} className="stat-icon text-purple mb-2 mx-auto" />
                                        <h3 className="stat-number mb-0">1.5+</h3>
                                        <span className="stat-label">Years Exp.</span>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <div className="stat-widget">
                                        <Rocket size={22} className="stat-icon text-cyan mb-2 mx-auto" />
                                        <h3 className="stat-number mb-0">10+</h3>
                                        <span className="stat-label">Deployments</span>
                                    </div>
                                </div>
                                <div className="col-12 col-sm-4">
                                    <div className="stat-widget">
                                        <Coffee size={22} className="stat-icon text-pink mb-2 mx-auto" />
                                        <h3 className="stat-number mb-0">Daily</h3>
                                        <span className="stat-label">Coffee Fueled</span>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="d-flex flex-column flex-sm-row gap-3 mt-4 pt-4 border-top-subtle position-relative z-2">
                                {/* DYNAMIC Resume URL */}
                                <a href={resumeDownloadUrl} download target="_blank" rel="noreferrer" className="btn-gradient flex-grow-1 d-flex justify-content-center align-items-center gap-2">
                                    <Download size={18} />
                                    Download Resume
                                </a>
                                <a href="#contact" className="btn-outline-glass flex-grow-1 d-flex justify-content-center align-items-center gap-2">
                                    <Send size={18} />
                                    Contact Me
                                </a>
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
                @import url('https://fonts.googleapis.com/css2?family=Sora:wght@300;400;600;700;800&display=swap');

                :root {
                    --primary: #7C3AED;
                    --secondary: #06B6D4;
                    --accent: #EC4899;
                    --success-neon: #10B981;
                    --bg-dark: #0B0E17;
                    --card-bg: #111524;
                    --text-main: #FFFFFF;
                    --text-muted: #9CA3AF;
                    --glass-bg: rgba(255, 255, 255, 0.03);
                    --glass-border: rgba(255, 255, 255, 0.08);
                }

                .about-section {
                    background-color: var(--bg-dark);
                    font-family: 'Sora', sans-serif;
                    padding-top: 80px; 
                    padding-bottom: 120px;
                }

                .section-title {
                    font-size: clamp(2rem, 4vw, 3rem);
                    font-weight: 800;
                    letter-spacing: -0.03em;
                }

                .section-title .text-gradient, 
                .card-title.text-gradient {
                    background: linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%);
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
                    background: var(--card-bg);
                    border: 1px solid var(--glass-border);
                    border-radius: 24px;
                    padding: 2.5rem;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.2);
                    overflow: hidden;
                    transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
                }

                .premium-bento-card:hover {
                    transform: translateY(-5px);
                    border-color: rgba(255,255,255,0.15);
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

                /* Profile Image & Status */
                .profile-image-container {
                    position: relative;
                    width: 140px;
                    height: 140px;
                }

                .profile-image-ring {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    padding: 4px;
                    background: linear-gradient(135deg, var(--primary), var(--secondary));
                    box-shadow: 0 0 20px rgba(124, 58, 237, 0.3);
                }

                .profile-img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    object-fit: cover;
                    background-color: var(--bg-dark);
                    border: 3px solid var(--card-bg);
                }

                .status-badge {
                    position: absolute;
                    bottom: -10px;
                    left: 50%;
                    transform: translateX(-50%);
                    background: rgba(16, 185, 129, 0.15);
                    border: 1px solid rgba(16, 185, 129, 0.3);
                    color: var(--success-neon);
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                    backdrop-filter: blur(8px);
                    -webkit-backdrop-filter: blur(8px);
                    box-shadow: 0 4px 12px rgba(0,0,0,0.2);
                    white-space: nowrap;
                }

                .text-success-neon { color: var(--success-neon); }

                /* Skills Pills */
                .skill-pill {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    padding: 6px 14px;
                    border-radius: 12px;
                    font-size: 0.85rem;
                    font-weight: 600;
                    color: var(--text-muted);
                    transition: all 0.3s ease;
                }
                
                .skill-pill:hover {
                    background: rgba(255, 255, 255, 0.08);
                    color: var(--text-main);
                    border-color: rgba(255, 255, 255, 0.2);
                }

                /* Text Utilities */
                .card-title {
                    font-size: 1.5rem;
                    font-weight: 700;
                    color: var(--text-main);
                    letter-spacing: -0.02em;
                }

                .summary-text {
                    font-size: 0.95rem;
                    color: var(--text-muted);
                    line-height: 1.7;
                    font-weight: 400;
                }

                /* Stats Widgets */
                .border-top-subtle {
                    border-top: 1px solid var(--glass-border) !important;
                }

                .stat-widget {
                    background: var(--glass-bg);
                    border: 1px solid var(--glass-border);
                    border-radius: 16px;
                    padding: 1.25rem 0.5rem;
                    text-align: center;
                    transition: all 0.3s ease;
                    height: 100%;
                    display: flex;
                    flex-direction: column;
                    justify-content: center;
                }

                .stat-widget:hover {
                    background: rgba(255,255,255,0.06);
                    border-color: rgba(255,255,255,0.15);
                    transform: translateY(-3px);
                }

                .text-purple { color: #A855F7; }
                .text-cyan { color: #22D3EE; }
                .text-pink { color: #F472B6; }

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
                    margin-top: 4px;
                }

                /* Buttons */
                .btn-gradient {
                    background: linear-gradient(135deg, var(--primary) 0%, #4F46E5 100%);
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 0.95rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
                }

                .btn-gradient:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 6px 20px rgba(124, 58, 237, 0.5);
                    color: white;
                }

                .btn-outline-glass {
                    background: transparent;
                    color: var(--text-main);
                    border: 1px solid var(--glass-border);
                    padding: 12px 24px;
                    border-radius: 12px;
                    font-weight: 600;
                    font-size: 0.95rem;
                    text-decoration: none;
                    transition: all 0.3s ease;
                }

                .btn-outline-glass:hover {
                    background: rgba(255, 255, 255, 0.05);
                    border-color: rgba(255, 255, 255, 0.2);
                    color: white;
                    transform: translateY(-2px);
                }

                /* Timeline Styles */
                .icon-box-secondary {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 48px;
                    height: 48px;
                    border-radius: 14px;
                    background: rgba(6, 182, 212, 0.1);
                    color: var(--secondary);
                    border: 1px solid rgba(6, 182, 212, 0.2);
                }

                .timeline-container { position: relative; }

                .timeline-line {
                    position: absolute;
                    left: 7px; 
                    top: 10px;
                    bottom: 10px;
                    width: 2px;
                    background: linear-gradient(to bottom, rgba(124, 58, 237, 0.2), rgba(124, 58, 237, 0.6) 20%, rgba(6, 182, 212, 0.6) 80%, rgba(6, 182, 212, 0.1));
                    z-index: 1;
                }

                .timeline-item {
                    position: relative;
                    padding-left: 36px;
                    margin-bottom: 1.5rem;
                    z-index: 2;
                }

                .timeline-item:last-child { margin-bottom: 0; }

                .timeline-dot {
                    position: absolute;
                    left: 0;
                    top: 24px; 
                    transform: translateY(-50%);
                    width: 16px;
                    height: 16px;
                    border-radius: 50%;
                    background: var(--bg-dark);
                    border: 2px solid var(--primary);
                    box-shadow: 0 0 12px rgba(124, 58, 237, 0.4);
                    transition: all 0.3s ease;
                    z-index: 3;
                }

                .timeline-content {
                    padding: 1.25rem;
                    border-radius: 16px;
                    background: var(--glass-bg);
                    border: 1px solid transparent;
                    transition: all 0.3s ease;
                }

                .timeline-item:hover .timeline-dot {
                    background: var(--primary);
                    box-shadow: 0 0 16px var(--primary);
                    transform: translateY(-50%) scale(1.2);
                }

                .timeline-item:hover .timeline-content {
                    background: rgba(255, 255, 255, 0.05);
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
                    color: var(--secondary);
                    margin-bottom: 0.5rem;
                }

                .timeline-inst {
                    font-size: 0.9rem;
                    color: var(--text-muted);
                    margin-bottom: 0;
                    line-height: 1.5;
                }

                /* Mobile Adjustments */
                @media (max-width: 768px) {
                    .premium-bento-card { padding: 1.5rem; }
                    
                    .profile-image-container {
                        width: 120px;
                        height: 120px;
                    }

                    .stat-widget { padding: 1rem 0.25rem; }
                    .stat-number { font-size: 1.25rem; }
                    .stat-label { font-size: 0.65rem; }
                    
                    .timeline-content { padding: 1rem; }
                    .timeline-dot { top: 20px; }
                }
            `}</style>
        </section>
    );
};

export default About;