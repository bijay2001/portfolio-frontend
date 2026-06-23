import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, ArrowRight, Image as ImageIcon } from "lucide-react";
import api from "../api/axiosClient";

/* ─── Project Card Component ────────────────────────────────────── */
const ProjectCard = ({ proj, index }) => {
    const techs = proj.technologies?.split(",") ?? [];
    
    // Ensure image URL is properly formatted
    const imgUrl = proj.image_url && proj.image_url.startsWith("http") 
        ? proj.image_url 
        : proj.image_url ? `/${proj.image_url.replace(/^\.?\//, "")}` : "";

    return (
        <motion.article
            className="modern-project-card"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{
                duration: 0.5,
                delay: (index % 3) * 0.15, // Staggered entrance
                ease: [0.25, 1, 0.5, 1],
            }}
        >
            {/* ── Image Header ── */}
            <div className="card-image-wrapper">
                {imgUrl ? (
                    <img src={imgUrl} alt={proj.title} className="card-image" />
                ) : (
                    <div className="fallback-image">
                        <ImageIcon size={32} opacity={0.3} />
                    </div>
                )}
                
                {/* Top Right Badge */}
                {proj.badge && (
                    <div className="project-type-badge">
                        {proj.badge}
                    </div>
                )}
                
                {/* Subtle gradient overlay at the bottom of the image */}
                <div className="image-vignette"></div>
            </div>

            {/* ── Card Body ── */}
            <div className="card-body">
                <div className="d-flex justify-content-between align-items-start mb-2">
                    <h4 className="project-title">{proj.title}</h4>
                    {proj.link && (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="external-link-icon">
                            <ExternalLink size={18} strokeWidth={2} />
                        </a>
                    )}
                </div>
                
                <p className="project-desc">{proj.description}</p>

                {/* Tech Stack Pills */}
                <div className="tech-stack-container">
                    {techs.slice(0, 4).map((tech, i) => (
                        <span key={i} className="tech-pill">
                            {tech.trim()}
                        </span>
                    ))}
                </div>

                {/* ── Footer CTA ── */}
                <div className="card-footer-cta">
                    {proj.link ? (
                        <a href={proj.link} target="_blank" rel="noreferrer" className="btn-view-project">
                            View Project <ArrowRight size={16} className="arrow-icon" />
                        </a>
                    ) : (
                        <span className="btn-view-project disabled">
                            Internal Project
                        </span>
                    )}
                </div>
            </div>
        </motion.article>
    );
};

/* ─── Main Section Component ────────────────────────────────────── */
const Projects = () => {
    // Fallback data includes your actual portfolio items perfectly formatted
    const [projects, setProjects] = useState([
        {
            title: "Driver Attendance System",
            description: "Manage driver daily attendance, precise location tracking, and reports with an analytics dashboard.",
            technologies: "React, Node.js, MySQL",
            badge: "Dashboard",
            image_url: "/driver-dashboard.png", // Replace with your actual image path
            link: "https://drivers.patratravels.com"
        },
        {
            title: "AI Video Ads Generator",
            description: "AI-powered tool utilizing the Gemini API to automatically convert ideas into short video ad scripts and storyboards.",
            technologies: "Node.js, Gemini API, Express",
            badge: "AI / Web App",
            image_url: "/ai-video-gen.png",
            link: "#"
        },
        {
            title: "Fintech Application",
            description: "Secure financial platform handling digital payments, mobile recharges, and wallet management.",
            technologies: "React Native, Node.js, MySQL",
            badge: "Mobile App",
            image_url: "/fintech-app.png",
            link: "#"
        },
        {
            title: "Login System Using PHP",
            description: "Secure login and authentication system implementing session management and robust role-based access.",
            technologies: "PHP, MySQL, JavaScript",
            badge: "Web App",
            image_url: "/php-login.png",
            link: "#"
        },
        {
            title: "PHP CRUD Application",
            description: "Complete CRUD application featuring an extensive admin panel built using PHP & MySQL for data management.",
            technologies: "PHP, MySQL, Bootstrap",
            badge: "Web App",
            image_url: "/php-crud.png",
            link: "#"
        },
        {
            title: "Hisab Hub - Financial Daybook",
            description: "Track income, expenses, and account balances with visual reports, charts, and deep financial insights.",
            technologies: "PHP, MySQL, Chart.js",
            badge: "Web App",
            image_url: "/hisab-hub.png",
            link: "#"
        }
    ]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const res = await api.get("/projects");
                if (res.data?.status === "success" && res.data.data.length > 0) {
                    setProjects(res.data.data);
                }
            } catch (err) {
                console.error("API not ready, utilizing fallback data.", err);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section id="projects" className="projects-section py-5">
            <style>{CSS}</style>

            {/* Ambient background glows */}
            <div className="ambient-glow glow-top-right"></div>
            <div className="ambient-glow glow-bottom-left"></div>

            <div className="container position-relative z-1 py-4">
                
                {/* ── Section Header ── */}
                <motion.header
                    className="text-center mb-5 pb-2"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="display-5 fw-bolder text-white mb-3">
                        My <span className="text-gradient-cyan">Projects</span>
                    </h2>
                    <p className="text-muted mx-auto" style={{ maxWidth: "600px", fontSize: "1.1rem" }}>
                        Real-world solutions built with precision and purpose.
                    </p>
                </motion.header>

                {/* ── Responsive Grid ── */}
                <div className="modern-project-grid">
                    {projects.map((proj, i) => (
                        <ProjectCard key={i} proj={proj} index={i} />
                    ))}
                </div>

            </div>
        </section>
    );
};

/* ─── Premium Native CSS ────────────────────────────────────────── */
const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

    :root {
        --bg-color: #060913;
        --card-bg: #0C101A;
        --card-border: rgba(255, 255, 255, 0.06);
        --card-border-hover: rgba(124, 58, 237, 0.4);
        --text-primary: #FFFFFF;
        --text-secondary: #94A3B8;
        --accent-cyan: #22D3EE;
        --accent-purple: #A855F7;
    }

    .projects-section {
        background-color: var(--bg-color);
        font-family: 'Inter', -apple-system, sans-serif;
        min-height: 100vh;
        position: relative;
        overflow: hidden;
    }

    /* Ambient Glows */
    .ambient-glow {
        position: absolute;
        width: 500px;
        height: 500px;
        border-radius: 50%;
        filter: blur(120px);
        opacity: 0.15;
        pointer-events: none;
        z-index: 0;
    }
    
    .glow-top-right {
        top: -100px;
        right: -100px;
        background: radial-gradient(circle, var(--accent-cyan) 0%, transparent 70%);
    }

    .glow-bottom-left {
        bottom: -100px;
        left: -100px;
        background: radial-gradient(circle, var(--accent-purple) 0%, transparent 70%);
    }

    .text-gradient-cyan {
        background: linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-purple) 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    /* Grid Architecture */
    .modern-project-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 1.5rem;
    }

    /* Modern Card Styling */
    .modern-project-card {
        background: var(--card-bg);
        border: 1px solid var(--card-border);
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        position: relative;
    }

    /* High-End Hover Effect */
    .modern-project-card:hover {
        transform: translateY(-8px);
        border-color: var(--card-border-hover);
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5), 
                    0 0 30px rgba(124, 58, 237, 0.15);
    }

    /* Image Header */
    .card-image-wrapper {
        position: relative;
        height: 220px;
        width: 100%;
        background: #111827;
        overflow: hidden;
        flex-shrink: 0;
    }

    .card-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.6s ease;
    }

    .modern-project-card:hover .card-image {
        transform: scale(1.05);
    }

    .fallback-image {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #4B5563;
    }

    .project-type-badge {
        position: absolute;
        top: 16px;
        right: 16px;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        -webkit-backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #FFFFFF;
        font-size: 0.75rem;
        font-weight: 600;
        padding: 6px 14px;
        border-radius: 50px;
        letter-spacing: 0.5px;
        z-index: 2;
    }

    .image-vignette {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        height: 80px;
        background: linear-gradient(to top, var(--card-bg) 0%, transparent 100%);
        pointer-events: none;
    }

    /* Card Body */
    .card-body {
        padding: 1.5rem;
        display: flex;
        flex-direction: column;
        flex-grow: 1;
    }

    .project-title {
        font-size: 1.2rem;
        font-weight: 700;
        color: var(--text-primary);
        margin: 0;
        line-height: 1.3;
        letter-spacing: -0.3px;
    }

    .external-link-icon {
        color: var(--text-secondary);
        transition: color 0.3s ease;
        margin-left: 10px;
        margin-top: 2px;
    }

    .external-link-icon:hover {
        color: var(--accent-cyan);
    }

    .project-desc {
        font-size: 0.9rem;
        color: var(--text-secondary);
        line-height: 1.6;
        margin-top: 0.75rem;
        margin-bottom: 1.5rem;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
        flex-grow: 1;
    }

    /* Tech Stack Pills */
    .tech-stack-container {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin-bottom: 1.5rem;
    }

    .tech-pill {
        font-size: 0.75rem;
        font-weight: 500;
        color: #E2E8F0;
        background: rgba(255, 255, 255, 0.03);
        border: 1px solid rgba(255, 255, 255, 0.08);
        padding: 4px 12px;
        border-radius: 8px;
        transition: all 0.3s ease;
    }

    .modern-project-card:hover .tech-pill {
        border-color: rgba(34, 211, 238, 0.3);
        background: rgba(34, 211, 238, 0.05);
        color: var(--accent-cyan);
    }

    /* Footer Button CTA */
    .card-footer-cta {
        margin-top: auto;
        padding-top: 0.5rem;
    }

    .btn-view-project {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        width: 100%;
        padding: 10px 0;
        background: transparent;
        color: var(--text-primary);
        border: 1px solid var(--card-border);
        border-radius: 12px;
        font-size: 0.9rem;
        font-weight: 600;
        text-decoration: none;
        transition: all 0.3s ease;
    }

    .arrow-icon {
        transition: transform 0.3s ease;
    }

    .btn-view-project:hover {
        background: rgba(255, 255, 255, 0.05);
        border-color: rgba(255, 255, 255, 0.2);
        color: #FFFFFF;
    }

    .btn-view-project:hover .arrow-icon {
        transform: translateX(4px);
    }

    .btn-view-project.disabled {
        color: #4B5563;
        border-color: rgba(255, 255, 255, 0.02);
        cursor: not-allowed;
    }

    /* Responsive Breakpoints */
    @media (max-width: 1024px) {
        .modern-project-grid {
            grid-template-columns: repeat(2, 1fr);
        }
    }

    @media (max-width: 768px) {
        .modern-project-grid {
            grid-template-columns: 1fr;
            gap: 1.25rem;
        }
        
        .card-image-wrapper {
            height: 200px;
        }
    }
`;

export default Projects;