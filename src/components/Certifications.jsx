import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, FileText, CalendarCheck } from 'lucide-react';
import api from '../api/axiosClient';

const Certifications = () => {
    const [certs, setCerts] = useState([]);

    useEffect(() => {
        const fetchCerts = async () => {
            try {
                const res = await api.get('/certifications');
                if (res.data && res.data.status === 'success') {
                    setCerts(res.data.data);
                }
            } catch (error) {
                console.error("Error fetching certifications:", error);
            }
        };
        fetchCerts();
    }, []);

    const baseUrl = (import.meta.env.VITE_API_URL || 'http://localhost:5000/api').replace('/api', '');
    const getFileUrl = (fileName) => {
        if (!fileName) return '';
        if (fileName.startsWith('http')) return fileName;
        
        let cleanPath = fileName;
        if (cleanPath.startsWith('./')) cleanPath = cleanPath.substring(2);
        if (cleanPath.startsWith('/')) cleanPath = cleanPath.substring(1);
        
        if (cleanPath.includes('assets/')) {
            return `${baseUrl}/${cleanPath}`;
        }
        return `${baseUrl}/assets/img/certificates/${cleanPath}`;
    };

    return (
        <section id="certifications" className="py-5 my-md-5 position-relative z-1">
            {/* Ambient Background Elements */}
            <div className="ambient-glow-cyan" style={{ top: '20%', left: '-10%', opacity: 0.1 }}></div>
            <div className="ambient-glow-purple" style={{ bottom: '10%', right: '-5%', opacity: 0.15 }}></div>

            <div className="container position-relative z-1">
                <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-5">
                    <h2 className="display-4 fw-bolder text-white mb-3">Professional <span className="text-gradient-primary">Certifications</span></h2>
                    <p className="sub-text-light fs-5 mx-auto" style={{ maxWidth: '600px' }}>
                        Validating my expertise and continuous learning through recognized industry authorities.
                    </p>
                </motion.div>

                <div className="row g-4 justify-content-center">
                    {certs.map((cert, index) => {
                        const fileUrl = cert.certificate_url ? getFileUrl(cert.certificate_url) : '';
                        const isPdf = cert.certificate_url?.toLowerCase().endsWith('.pdf');

                        return (
                            <div key={index} className="col-12 col-md-6 col-xl-4">
                                <motion.div 
                                    initial={{ opacity: 0, y: 30 }} 
                                    whileInView={{ opacity: 1, y: 0 }} 
                                    viewport={{ once: true }} 
                                    transition={{ delay: index * 0.1, duration: 0.5 }} 
                                    className="holographic-card d-flex flex-column h-100"
                                >
                                    {/* --- VISUAL HEADER --- */}
                                    <div className="cert-visual-header position-relative overflow-hidden">
                                        {/* Overlay Gradient for seamless blending */}
                                        <div className="cert-overlay"></div>
                                        
                                        {isPdf ? (
                                            <div className="d-flex flex-column align-items-center justify-content-center h-100 w-100 position-relative z-1">
                                                <div className="icon-glow-ring mb-2">
                                                    <FileText size={36} className="text-neon-cyan" />
                                                </div>
                                                <div className="small fw-bolder tracking-wide text-uppercase text-white opacity-75">PDF Credential</div>
                                            </div>
                                        ) : cert.certificate_url ? (
                                            <img src={fileUrl} alt={cert.title} className="cert-image w-100 h-100 object-fit-cover" />
                                        ) : (
                                            <div className="d-flex align-items-center justify-content-center h-100 w-100 position-relative z-1">
                                                <div className="icon-glow-ring">
                                                    <Award size={40} className="text-neon-purple" />
                                                </div>
                                            </div>
                                        )}

                                        {/* Floating Date Badge (Compact Design) */}
                                        <div className="floating-date-badge shadow-sm d-flex align-items-center gap-2">
                                            <CalendarCheck size={14} className="text-neon-cyan" /> 
                                            <span className="fw-bold">{cert.issue_date}</span>
                                        </div>
                                    </div>

                                    {/* --- CONTENT SECTION --- */}
                                    <div className="p-4 d-flex flex-column flex-grow-1 position-relative z-1">
                                        <h4 className="fw-bold text-white mb-3 fs-5 lh-base cert-title transition-all">{cert.title}</h4>
                                        <p className="sub-text-light small mb-4 flex-grow-1" style={{ lineHeight: '1.7' }}>
                                            {cert.description}
                                        </p>
                                        
                                        {/* Action Button */}
                                        <div className="mt-auto pt-3 border-top border-light border-opacity-10">
                                            {(cert.live_url || cert.certificate_url) ? (
                                                <a href={cert.live_url || fileUrl} target="_blank" rel="noreferrer" className="btn-holographic w-100 d-flex align-items-center justify-content-center gap-2 py-2 fw-semibold text-decoration-none">
                                                    View Credential <ExternalLink size={16} className="mb-1" />
                                                </a>
                                            ) : (
                                                <div className="w-100 py-2 text-center sub-text-light small fw-bold opacity-50">
                                                    Internal Credential
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>

            <style>{`
                /* --- Explicit Text Fixes --- */
                .sub-text-light {
                    color: #94a3b8 !important; /* Bright silver for high visibility */
                }
                .text-neon-cyan { color: var(--neon-cyan); }
                .text-neon-purple { color: var(--neon-purple); }

                /* --- Holographic Card Design --- */
                .holographic-card {
                    background: #0a0d14; /* Solid deep dark */
                    border-radius: 1.25rem;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    overflow: hidden;
                    position: relative;
                    transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.5);
                }

                .holographic-card:hover {
                    transform: translateY(-8px);
                    border-color: rgba(0, 219, 224, 0.3);
                    box-shadow: 0 20px 40px rgba(0, 219, 224, 0.15), 
                                inset 0 0 0 1px rgba(0, 219, 224, 0.1);
                }

                .holographic-card:hover .cert-title {
                    color: var(--neon-cyan) !important;
                }

                /* --- Visual Header (Image/Icon Area) --- */
                .cert-visual-header {
                    height: 180px;
                    background: linear-gradient(145deg, rgba(11, 15, 25, 1) 0%, rgba(20, 25, 40, 1) 100%);
                    border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    position: relative;
                }

                .cert-overlay {
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(to top, #0a0d14 0%, transparent 100%);
                    z-index: 1;
                    opacity: 0.8;
                }

                /* Image FX: Monochrome to Color on hover */
                .cert-image {
                    filter: grayscale(80%) contrast(1.2) opacity(0.6);
                    transition: all 0.5s ease;
                }

                .holographic-card:hover .cert-image {
                    filter: grayscale(0%) contrast(1) opacity(1);
                    transform: scale(1.05);
                }

                /* Glowing ring for PDFs/No Image */
                .icon-glow-ring {
                    width: 70px;
                    height: 70px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.03);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 0 20px rgba(123, 97, 255, 0.2);
                    transition: all 0.4s ease;
                }

                .holographic-card:hover .icon-glow-ring {
                    border-color: var(--neon-cyan);
                    box-shadow: 0 0 30px rgba(0, 219, 224, 0.4);
                    transform: scale(1.1);
                }

                /* --- Floating Date Badge --- */
                .floating-date-badge {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: rgba(10, 13, 20, 0.85);
                    backdrop-filter: blur(8px);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    color: white;
                    padding: 6px 14px;
                    border-radius: 20px;
                    font-size: 0.75rem;
                    z-index: 2;
                    transition: border-color 0.4s ease;
                }

                .holographic-card:hover .floating-date-badge {
                    border-color: var(--neon-cyan);
                }

                /* --- High-Tech Action Button --- */
                .btn-holographic {
                    background: transparent;
                    color: #ffffff;
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 0.75rem;
                    transition: all 0.3s ease;
                    position: relative;
                    overflow: hidden;
                    z-index: 1;
                }

                .btn-holographic::before {
                    content: '';
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(135deg, rgba(0, 219, 224, 0.2), rgba(123, 97, 255, 0.2));
                    opacity: 0;
                    transition: opacity 0.3s ease;
                    z-index: -1;
                }

                .btn-holographic:hover {
                    color: var(--neon-cyan);
                    border-color: var(--neon-cyan);
                    background: rgba(0, 219, 224, 0.05);
                    transform: translateY(-2px);
                }

                .btn-holographic:hover::before {
                    opacity: 1;
                }
            `}</style>
        </section>
    );
};

export default Certifications;