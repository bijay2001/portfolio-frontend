import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Lock, Image as ImageIcon, Layers } from "lucide-react";
import api from "../api/axiosClient";

/* ─── Unified Project Card Component ─────────────────────────────── */
const ProjectCard = ({ proj, index }) => {
    // The first item is designated as the featured project
    const isFeatured = index === 0;
    
    // Parse technologies cleanly
    const techArray = proj.technologies ? proj.technologies.split(",").map(t => t.trim()) : [];
    const displayTechs = techArray.slice(0, 3);
    const extraTechCount = techArray.length > 3 ? techArray.length - 3 : 0;
    
    // Format image URL
    const imgUrl = proj.image_url && proj.image_url.startsWith("http") 
        ? proj.image_url 
        : proj.image_url ? `/${proj.image_url.replace(/^\.?\//, "")}` : "";

    const hasValidLink = proj.link && proj.link.trim() !== "" && proj.link !== "#";

    return (
        <motion.article
            className={`compact-card ${isFeatured ? 'card-featured' : 'card-standard'}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{
                duration: 0.5,
                delay: isFeatured ? 0 : (index % 4) * 0.1,
                ease: [0.21, 0.47, 0.32, 0.98],
            }}
        >
            {/* ── Image Media ── */}
            <div className="card-media">
                {imgUrl ? (
                    <img src={imgUrl} alt={proj.title} className="media-image" loading="lazy" />
                ) : (
                    <div className="media-fallback">
                        <ImageIcon size={32} className="fallback-icon" />
                    </div>
                )}
                
                {proj.badge && (
                    <div className="media-badge">
                        {proj.badge.toUpperCase()}
                    </div>
                )}
            </div>

            {/* ── Content Area ── */}
            <div className="card-content">
                <div className="content-header">
                    <h3 className="project-title">{proj.title}</h3>
                    <p className="project-desc">{proj.description}</p>
                </div>

                <div className="content-footer">
                    <div className="tech-stack">
                        {displayTechs.map((tech, i) => (
                            <span key={i} className="tech-tag">{tech}</span>
                        ))}
                        {extraTechCount > 0 && (
                            <span className="tech-tag tag-muted">+{extraTechCount}</span>
                        )}
                    </div>

                    <div className="project-action">
                        {hasValidLink ? (
                            <a href={proj.link} target="_blank" rel="noreferrer" className="action-link link-live" aria-label={`View ${proj.title} live`}>
                                <span>Live</span>
                                <ArrowUpRight size={14} className="action-icon" />
                            </a>
                        ) : (
                            <span className="action-link link-private" aria-label={`${proj.title} is a private repository`}>
                                <span>Private</span>
                                <Lock size={12} className="action-icon" />
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </motion.article>
    );
};

/* ─── Main Projects Section ────────────────────────────────────────── */
const Projects = () => {
    const [projects, setProjects] = useState([
        {
            title: "Driver Attendance System",
            description: "Manage driver daily attendance, precise location tracking, and generate operational reports through a comprehensive analytics dashboard.",
            technologies: "React, Node.js, MySQL",
            badge: "Dashboard",
            image_url: "/driver-dashboard.png", 
            link: "https://drivers.patratravels.com"
        },
        {
            title: "AI Video Ads Generator",
            description: "AI-powered architectural tool utilizing the Gemini API to automatically convert conceptual ideas into structured video ad scripts and storyboards.",
            technologies: "Node.js, Gemini API, Express",
            badge: "AI App",
            image_url: "/ai-video-gen.png",
            link: "#"
        },
        {
            title: "Fintech Application",
            description: "Secure financial platform handling digital payments, mobile telecommunication recharges, and user wallet management.",
            technologies: "React Native, Node.js, MySQL",
            badge: "Mobile App",
            image_url: "/fintech-app.png",
            link: "#"
        },
        {
            title: "Identity & Access Management",
            description: "Secure authentication gateway implementing session management and robust role-based access controls for enterprise applications.",
            technologies: "PHP, MySQL, JavaScript",
            badge: "Security",
            image_url: "/php-login.png",
            link: "#"
        },
        {
            title: "Enterprise Data Manager",
            description: "Complete scalable CRUD architecture featuring an extensive admin panel for centralized data mutation and management.",
            technologies: "PHP, MySQL, Bootstrap",
            badge: "Web App",
            image_url: "/php-crud.png",
            link: "#"
        },
        {
            title: "Hisab Hub Financial Daybook",
            description: "Algorithmic tracking of income, expenses, and account ledgers translated into visual reports and deep financial insights.",
            technologies: "PHP, MySQL, Chart.js",
            badge: "Fintech",
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
                console.error("API unavailable, utilizing local fallback data.", err);
            }
        };
        fetchProjects();
    }, []);

    return (
        <section id="projects" className="section-projects">
            <div className="layout-container">
                
                {/* ── Header ── */}
                <motion.header
                    className="section-header"
                    initial={{ opacity: 0, y: 15 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                >
                    <div className="eyebrow-badge">
                        <Layers size={14} />
                        <span>Selected Work</span>
                    </div>
                    <h2 className="header-title">Engineering Portfolio</h2>
                    <p className="header-desc">
                        A selection of compact, production-grade applications and systems I have architected using modern web technologies.
                    </p>
                </motion.header>

                {/* ── Asymmetric Native Grid ── */}
                <div className="compact-grid">
                    {projects.map((proj, i) => (
                        <ProjectCard key={i} proj={proj} index={i} />
                    ))}
                </div>

            </div>

            {/* ── Scoped Premium CSS ── */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

                :root {
                    --bg-page: #09090b;
                    --bg-card: rgba(24, 24, 27, 0.4);
                    --bg-card-hover: rgba(39, 39, 42, 0.7);
                    
                    --border-base: rgba(255, 255, 255, 0.06);
                    --border-hover: rgba(255, 255, 255, 0.15);
                    
                    --text-main: #f4f4f5;
                    --text-muted: #a1a1aa;
                    --text-faint: #71717a;
                    
                    --radius-lg: 16px;
                    --radius-sm: 6px;
                }

                .section-projects {
                    background-color: var(--bg-page);
                    font-family: 'Inter', system-ui, -apple-system, sans-serif;
                    padding: 100px 0;
                    color: var(--text-main);
                }

                .layout-container {
                    max-width: 1100px;
                    margin: 0 auto;
                    padding: 0 20px;
                }

                /* Header */
                .section-header {
                    margin-bottom: 60px;
                    max-width: 500px;
                }

                .eyebrow-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    padding: 4px 12px;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid var(--border-base);
                    border-radius: 100px;
                    font-size: 0.75rem;
                    font-weight: 600;
                    color: var(--text-muted);
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    margin-bottom: 16px;
                }

                .header-title {
                    font-size: clamp(2rem, 4vw, 2.75rem);
                    font-weight: 700;
                    letter-spacing: -0.03em;
                    margin: 0 0 12px 0;
                    line-height: 1.1;
                }

                .header-desc {
                    font-size: 1rem;
                    color: var(--text-muted);
                    line-height: 1.6;
                    margin: 0;
                }

                /* Grid Architecture */
                .compact-grid {
                    display: grid;
                    grid-template-columns: repeat(3, 1fr);
                    gap: 20px;
                }

                /* Compact Card Styles */
                .compact-card {
                    background: var(--bg-card);
                    border: 1px solid var(--border-base);
                    border-radius: var(--radius-lg);
                    overflow: hidden;
                    display: flex;
                    flex-direction: column;
                    backdrop-filter: blur(10px);
                    -webkit-backdrop-filter: blur(10px);
                    transition: transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1), 
                                border-color 0.3s ease, 
                                box-shadow 0.3s ease;
                }

                .compact-card:hover {
                    border-color: var(--border-hover);
                    transform: translateY(-4px);
                    box-shadow: 0 12px 24px -10px rgba(0,0,0,0.6);
                    background: var(--bg-card-hover);
                }

                /* Media Area */
                .card-media {
                    position: relative;
                    width: 100%;
                    background: #111;
                    overflow: hidden;
                    border-bottom: 1px solid var(--border-base);
                }

                .media-image {
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                    transition: transform 0.6s cubic-bezier(0.2, 0.8, 0.2, 1);
                }

                .compact-card:hover .media-image {
                    transform: scale(1.03);
                }

                .media-fallback {
                    width: 100%;
                    height: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background: #121214;
                }

                .fallback-icon {
                    color: #27272a;
                }

                .media-badge {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    background: rgba(0, 0, 0, 0.6);
                    backdrop-filter: blur(4px);
                    -webkit-backdrop-filter: blur(4px);
                    border: 1px solid rgba(255,255,255,0.1);
                    color: var(--text-main);
                    font-size: 0.65rem;
                    font-weight: 600;
                    letter-spacing: 0.05em;
                    padding: 4px 8px;
                    border-radius: var(--radius-sm);
                    z-index: 2;
                }

                /* Content Area */
                .card-content {
                    padding: 20px;
                    display: flex;
                    flex-direction: column;
                    flex-grow: 1;
                    justify-content: space-between;
                    gap: 20px;
                }

                .project-title {
                    font-size: 1.125rem;
                    font-weight: 600;
                    margin: 0 0 8px 0;
                    letter-spacing: -0.01em;
                    color: var(--text-main);
                }

                .project-desc {
                    font-size: 0.875rem;
                    color: var(--text-muted);
                    line-height: 1.5;
                    margin: 0;
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }

                /* Footer (Tech + CTA) */
                .content-footer {
                    display: flex;
                    align-items: flex-end;
                    justify-content: space-between;
                    gap: 16px;
                }

                .tech-stack {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 6px;
                }

                .tech-tag {
                    font-size: 0.7rem;
                    font-weight: 500;
                    color: var(--text-muted);
                    background: rgba(255, 255, 255, 0.04);
                    border: 1px solid var(--border-base);
                    padding: 2px 8px;
                    border-radius: 4px;
                }

                .tag-muted {
                    background: transparent;
                    border-style: dashed;
                    color: var(--text-faint);
                }

                /* Actions */
                .project-action {
                    flex-shrink: 0;
                }

                .action-link {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    font-size: 0.8125rem;
                    font-weight: 500;
                    text-decoration: none;
                    transition: all 0.2s ease;
                }

                .link-live {
                    color: var(--text-main);
                }

                .link-live:hover {
                    color: #fff;
                }

                .link-live .action-icon {
                    transition: transform 0.2s ease;
                }

                .compact-card:hover .link-live .action-icon {
                    transform: translate(2px, -2px);
                }

                .link-private {
                    color: var(--text-faint);
                    cursor: not-allowed;
                }

                /* ─── Layout Configuration ─── */
                
                /* Standard Card Media Height */
                .card-standard .card-media {
                    height: 180px;
                }

                /* Featured Card (Desktop & Tablet) */
                @media (min-width: 768px) {
                    .card-featured {
                        grid-column: 1 / -1; 
                        flex-direction: row;  
                        min-height: 320px;
                    }

                    .card-featured .card-media {
                        width: 55%;
                        height: auto;
                        border-bottom: none;
                        border-right: 1px solid var(--border-base);
                    }

                    .card-featured .card-content {
                        width: 45%;
                        padding: 32px;
                        justify-content: center;
                        gap: 24px;
                    }

                    .card-featured .project-title {
                        font-size: 1.5rem;
                        margin-bottom: 12px;
                    }
                    
                    .card-featured .project-desc {
                        font-size: 0.95rem;
                        -webkit-line-clamp: 4;
                    }
                }

                @media (min-width: 1024px) {
                    /* On wide screens, featured spans 2 cols, 2nd item gets 3rd col */
                    .card-featured {
                        grid-column: span 2; 
                    }
                }

                /* Responsive Breakpoints */
                @media (max-width: 1023px) {
                    .compact-grid {
                        grid-template-columns: repeat(2, 1fr);
                    }
                }

                @media (max-width: 767px) {
                    .compact-grid {
                        grid-template-columns: 1fr; /* Strict 1-column mobile */
                        gap: 16px;
                    }
                    
                    .section-projects {
                        padding: 80px 0;
                    }

                    .section-header {
                        margin-bottom: 40px;
                    }

                    .card-content {
                        padding: 16px;
                    }
                    
                    .card-featured .card-media,
                    .card-standard .card-media {
                        height: 200px;
                    }
                }

                /* Accessibility */
                @media (prefers-reduced-motion: reduce) {
                    .compact-card,
                    .media-image,
                    .action-icon {
                        transition: none !important;
                        transform: none !important;
                    }
                }
            `}</style>
        </section>
    );
};

export default Projects;