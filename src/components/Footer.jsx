import React from 'react';
import { Mail } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="footer-glass mt-auto py-5 border-top border-light border-opacity-10 position-relative z-3">
            <div className="container">
                <div className="row gy-4 align-items-center justify-content-between">
                    
                    {/* Left: Branding */}
                    <div className="col-12 col-md-4 text-center text-md-start">
                        <h4 className="fw-bold mb-2 text-gradient-primary tracking-wide">Bijay.Dev</h4>
                        <p className="text-white small mb-0 pe-md-4">Architecting secure, scalable digital experiences from backend logic to modern interfaces.</p>
                    </div>

                    {/* Center: Social Icons */}
                    <div className="col-12 col-md-4 d-flex justify-content-center gap-4">
                        <a href="https://github.com/bijay2001" target="_blank" rel="noreferrer" className="social-icon-wrapper">
                            <i className="bi bi-github"></i>
                        </a>
                        <a href="https://linkedin.com/in/bijay-kumar-behera" target="_blank" rel="noreferrer" className="social-icon-wrapper">
                            <i className="bi bi-linkedin"></i>
                        </a>
                        <a href="mailto:beherabijay685@gmail.com" className="social-icon-wrapper">
                            <Mail size={22} />
                        </a>
                    </div>

                    {/* Right: Copyright */}
                    <div className="col-12 col-md-4 text-center text-md-end">
                        <p className="text-white small mb-1">
                            Designed & Developed with <span className="text-danger">❤</span> by <span className="text-white fw-medium">Bijay</span>
                        </p>
                        <p className="text-white opacity-50 mb-0" style={{ fontSize: '0.75rem' }}>
                            © {new Date().getFullYear()} All rights reserved.
                        </p>
                    </div>
                </div>
            </div>

            <style>{`
                .footer-glass {
                    background: rgba(11, 15, 25, 0.7);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                }
                .social-icon-wrapper {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 45px;
                    height: 45px;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.05);
                    color: #94a3b8;
                    font-size: 1.2rem;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                    text-decoration: none;
                }
                .social-icon-wrapper:hover {
                    background: linear-gradient(135deg, #a855f7, #ec4899);
                    color: white;
                    transform: translateY(-5px) scale(1.1);
                    border-color: transparent;
                    box-shadow: 0 10px 20px rgba(168, 85, 247, 0.4);
                }
            `}</style>
        </footer>
    );
};

export default Footer;