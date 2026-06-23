import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Calendar, Shield, Database, Cloud, Network, Wifi, BookOpen, CheckCircle2 } from 'lucide-react';
import api from '../api/axiosClient';

/* ─── Glowing Hexagon Badge Component ───────────────────────────────── */
const HexBadge = ({ color, icon: Icon, text }) => (
    <div className="hex-badge-wrapper" style={{ '--badge-color': color }}>
        <svg width="70" height="90" viewBox="0 0 80 105" fill="none" className="hex-svg">
            <g filter="url(#glow)">
                {/* Outer Hexagon */}
                <path d="M40 5 L75 25 L75 65 L40 85 L5 65 L5 25 Z" stroke="currentColor" strokeWidth="2" fill="rgba(0,0,0,0.4)"/>
                {/* Inner Hexagon */}
                <path d="M40 12 L68 28 L68 62 L40 78 L12 62 L12 28 Z" stroke="currentColor" strokeWidth="1" strokeOpacity="0.5" fill="none"/>
                {/* Bottom Ribbon */}
                <path d="M25 76 L25 100 L40 92 L55 100 L55 76" stroke="currentColor" strokeWidth="2" fill="none"/>
            </g>
            <defs>
                <filter id="glow" x="-10" y="-10" width="100" height="125" filterUnits="userSpaceOnUse">
                    <feGaussianBlur stdDeviation="3" result="effect1_foregroundBlur"/>
                    <feComposite in="SourceGraphic" in2="effect1_foregroundBlur" operator="over"/>
                </filter>
            </defs>
        </svg>
        <div className="hex-icon-container">
            {text ? <span className="hex-text">{text}</span> : <Icon size={24} strokeWidth={1.5} />}
        </div>
    </div>
);

/* ─── Main Certifications Component ─────────────────────────────────── */
const Certifications = () => {
    // Fallback data reflecting your portfolio credentials perfectly
    const [certs, setCerts] = useState([
        {
            title: "MySQL",
            description: "Database Design & Query Optimization",
            provider: "GUVI",
            issue_date: "2024-02-16",
            iconType: "database",
            iconText: "",
            color: "#A855F7", // Purple
            live_url: "#"
        },
        {
            title: "JavaScript",
            description: "DOM Manipulation, ES6+ Features",
            provider: "GUVI",
            issue_date: "2024-07-16",
            iconType: "text",
            iconText: "JS",
            color: "#8B5CF6", // Violet
            live_url: "#"
        },
        {
            title: "Cloud Computing",
            description: "Fundamentals of Cloud Services",
            provider: "NPTEL",
            issue_date: "Jul-01-2023",
            iconType: "cloud",
            iconText: "",
            color: "#3B82F6", // Blue
            live_url: "#"
        },
        {
            title: "Advanced Computer Networks",
            description: "Network architecture and protocols",
            provider: "NPTEL",
            issue_date: "Jan-Apr 2024",
            iconType: "network",
            iconText: "",
            color: "#06B6D4", // Cyan
            live_url: "#"
        },
        {
            title: "Industry 4.0 & Internet of Things",
            description: "IoT architecture and smart industry standards",
            provider: "NPTEL",
            issue_date: "Jan-Apr 2024",
            iconType: "wifi",
            iconText: "",
            color: "#3B82F6", // Blue
            live_url: "#"
        },
        {
            title: "IBM English Assessment",
            description: "CIC Off-Campus Recruitment Process",
            provider: "IBM",
            issue_date: "Apr-2026",
            iconType: "text",
            iconText: "EN",
            color: "#EC4899", // Pink
            live_url: "#"
        }
    ]);

    useEffect(() => {
        const fetchCerts = async () => {
            try {
                const res = await api.get('/certifications');
                if (res.data && res.data.status === 'success' && res.data.data.length > 0) {
                    setCerts(res.data.data);
                }
            } catch (error) {
                console.error("API not ready, using fallback data.");
            }
        };
        fetchCerts();
    }, []);

    // Icon mapper helper
    const getIcon = (type) => {
        switch(type) {
            case 'database': return Database;
            case 'cloud': return Cloud;
            case 'network': return Network;
            case 'wifi': return Wifi;
            default: return BookOpen;
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80, damping: 20 } }
    };

    return (
        <section id="certifications" className="cert-section py-5">
            <style>{CSS}</style>

            <div className="container position-relative z-1 py-4">
                {/* ── Section Header ── */}
                <motion.div 
                    initial={{ opacity: 0, y: -20 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6 }} 
                    className="text-center mb-5 pb-3"
                >
                    <div className="d-inline-flex align-items-center gap-2 px-3 py-1 rounded-pill badge-outline mb-3">
                        <CheckCircle2 size={14} />
                        <span className="fw-semibold text-uppercase" style={{ fontSize: '0.75rem', letterSpacing: '1px' }}>My Certifications</span>
                    </div>
                    <h2 className="display-5 fw-bolder text-white mb-3">
                        Professional <span className="text-gradient">Certifications</span>
                    </h2>
                    <p className="text-muted mx-auto" style={{ maxWidth: '600px', fontSize: '1.05rem', lineHeight: '1.6' }}>
                        Validating my expertise and continuous learning through recognized industry authorities.
                    </p>
                </motion.div>

                {/* ── Certifications Grid ── */}
                <motion.div 
                    className="row g-4 justify-content-center"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {certs.map((cert, index) => (
                        <div key={index} className="col-12 col-md-6 col-lg-4">
                            <motion.div variants={cardVariants} className="h-100">
                                <div className="modern-cert-card h-100" style={{ '--theme-color': cert.color || '#3B82F6' }}>
                                    
                                    {/* Card Top: Content & Badge */}
                                    <div className="d-flex justify-content-between align-items-start flex-grow-1">
                                        <div className="cert-content-left pe-2">
                                            <div className="cert-date d-flex align-items-center gap-2 mb-3">
                                                <Calendar size={13} />
                                                <span>{cert.issue_date}</span>
                                            </div>
                                            <h4 className="cert-title mb-2">{cert.title}</h4>
                                            <p className="cert-desc mb-0">{cert.description}</p>
                                        </div>
                                        
                                        <div className="cert-badge-right flex-shrink-0">
                                            <HexBadge 
                                                color={cert.color} 
                                                icon={getIcon(cert.iconType)} 
                                                text={cert.iconText} 
                                            />
                                        </div>
                                    </div>

                                    {/* Card Bottom: Provider & Action */}
                                    <div className="cert-footer mt-4 pt-3 d-flex justify-content-between align-items-end">
                                        <div className="cert-provider d-flex align-items-center gap-2">
                                            <Shield size={14} />
                                            <span>{cert.provider}</span>
                                        </div>
                                        
                                        <a href={cert.live_url || "#"} target="_blank" rel="noreferrer" className="cert-link d-flex align-items-center gap-2">
                                            View Credential <ExternalLink size={14} />
                                        </a>
                                    </div>

                                </div>
                            </motion.div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

/* ─── Premium Native CSS ────────────────────────────────────────── */
const CSS = `
    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

    :root {
        --bg-deep: #060913;
        --card-bg: #0C101A;
        --border-subtle: rgba(255, 255, 255, 0.05);
        --text-main: #FFFFFF;
        --text-muted: #8B949E;
    }

    .cert-section {
        background-color: var(--bg-deep);
        font-family: 'Inter', -apple-system, sans-serif;
        min-height: 80vh;
    }

    /* Header Styles */
    .badge-outline {
        background: rgba(37, 99, 235, 0.1);
        border: 1px solid rgba(37, 99, 235, 0.3);
        color: #60A5FA;
    }

    .text-gradient {
        background: linear-gradient(135deg, #06B6D4 0%, #EC4899 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
    }

    /* Modern Card Layout */
    .modern-cert-card {
        background: var(--card-bg);
        border: 1px solid var(--border-subtle);
        border-radius: 20px;
        padding: 1.75rem;
        display: flex;
        flex-direction: column;
        position: relative;
        overflow: hidden;
        transition: all 0.4s cubic-bezier(0.25, 1, 0.5, 1);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    }

    /* Hover Elevation & Glow */
    .modern-cert-card:hover {
        transform: translateY(-5px);
        border-color: color-mix(in srgb, var(--theme-color) 40%, transparent);
        box-shadow: 0 15px 35px rgba(0, 0, 0, 0.4), 
                    inset 0 0 40px color-mix(in srgb, var(--theme-color) 5%, transparent);
    }

    /* Typography & Content */
    .cert-date {
        font-size: 0.75rem;
        font-weight: 500;
        color: color-mix(in srgb, var(--text-muted) 80%, var(--theme-color) 40%);
        letter-spacing: 0.5px;
    }

    .cert-title {
        font-size: 1.25rem;
        font-weight: 700;
        color: var(--text-main);
        letter-spacing: -0.02em;
        line-height: 1.3;
    }

    .cert-desc {
        font-size: 0.85rem;
        color: var(--text-muted);
        line-height: 1.6;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    /* Hexagon Badge Styles */
    .hex-badge-wrapper {
        position: relative;
        width: 70px;
        height: 90px;
        color: var(--badge-color);
        margin-top: -10px; /* Aligns visually with the top border */
    }

    .hex-svg {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        transition: all 0.4s ease;
    }

    .hex-icon-container {
        position: absolute;
        top: 40px; /* Center within the hex (not the ribbon) */
        left: 50%;
        transform: translate(-50%, -50%);
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--badge-color);
    }

    .hex-text {
        font-size: 1.25rem;
        font-weight: 700;
        font-family: monospace;
    }

    .modern-cert-card:hover .hex-svg {
        filter: drop-shadow(0 0 10px var(--theme-color));
        transform: scale(1.05);
    }

    /* Footer Styles */
    .cert-footer {
        border-top: 1px solid var(--border-subtle);
    }

    .cert-provider {
        font-size: 0.8rem;
        font-weight: 600;
        color: var(--theme-color);
        letter-spacing: 0.5px;
    }

    .cert-link {
        font-size: 0.8rem;
        font-weight: 500;
        color: var(--text-muted);
        text-decoration: none;
        transition: color 0.3s ease;
    }

    .modern-cert-card:hover .cert-link {
        color: var(--text-main);
    }

    .cert-link:hover {
        text-decoration: underline;
    }

    /* Mobile Adjustments */
    @media (max-width: 768px) {
        .modern-cert-card {
            padding: 1.25rem;
        }
        
        .hex-badge-wrapper {
            transform: scale(0.85);
            transform-origin: top right;
            margin-top: -15px;
            margin-right: -10px;
        }
    }
`;

export default Certifications;