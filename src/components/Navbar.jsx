import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Code2 } from 'lucide-react';
import BubbleMenu from '../animations/BubbleMenu'; 

// --- Custom SVGs to replace missing Lucide brand icons ---
const GithubIcon = ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.02c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A4.8 4.8 0 0 0 8 18v4"></path>
    </svg>
);

const LinkedinIcon = ({ size = 18 }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
        <rect x="2" y="9" width="4" height="12"></rect>
        <circle cx="4" cy="4" r="2"></circle>
    </svg>
);

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    // 1. Handle Desktop Scroll Styling
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 2. Automatically close the Bubble Menu on click (Mobile)
    useEffect(() => {
        const handleMobileMenuClick = (e) => {
            const clickedPill = e.target.closest('.pill-link');
            if (clickedPill) {
                const toggleBtn = document.querySelector('.toggle-bubble.open');
                if (toggleBtn) {
                    toggleBtn.click();
                }
            }
        };
        document.addEventListener('click', handleMobileMenuClick);
        return () => document.removeEventListener('click', handleMobileMenuClick);
    }, []);

    // Navigation Links
    const navLinks = [
        { name: 'Home', to: 'home' },
        { name: 'About', to: 'about' },
        { name: 'Skills', to: 'skills' },
        { name: 'Experience', to: 'experience' },
        { name: 'Projects', to: 'projects' },
        { name: 'Certifications', to: 'certifications' },
        { name: 'Contact', to: 'contact' },
    ];

    // Social Links Data (Using our custom SVG icons)
    const socialLinks = [
        { name: 'GitHub', icon: <GithubIcon size={18} />, href: 'https://github.com/bijay2001' },
        { name: 'LinkedIn', icon: <LinkedinIcon size={18} />, href: 'https://www.linkedin.com/in/bijay-kumar-behera' },
    ];

    // Combine standard links and social links for the mobile Bubble Menu
    const bubbleItems = [
        ...navLinks.map((link, index) => ({
            label: link.name,
            href: `#${link.to}`, 
            ariaLabel: link.name,
            rotation: index % 2 === 0 ? -2 : 2, 
            hoverStyles: { bgColor: '#111522', textColor: '#00DBE0' }
        })),
        {
            label: 'Contact',
            href: '#contact',
            rotation: -2,
            hoverStyles: { bgColor: '#111522', textColor: '#10B981' }
        },
        ...socialLinks.map((social, index) => ({
            label: (
                <div className="d-flex align-items-center justify-content-center" title={social.name}>
                    {social.icon}
                </div>
            ),
            href: social.href,
            rotation: index % 2 === 0 ? 2 : -2,
            hoverStyles: { bgColor: '#111522', textColor: '#A855F7' }
        }))
    ];

    return (
        <>
            <style>
                {`
                    html { scroll-behavior: smooth; }

                    /* --- DESKTOP NAVBAR STYLES --- */
                    .nav-wrapper {
                        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        z-index: 1030;
                        padding-top: 1.5rem;
                    }
                    
                    .nav-scrolled {
                        padding-top: 1rem;
                    }

                    .glass-nav {
                        background: rgba(11, 15, 25, 0.7);
                        backdrop-filter: blur(16px);
                        -webkit-backdrop-filter: blur(16px);
                        border: 1px solid rgba(255, 255, 255, 0.06);
                        border-radius: 16px;
                        transition: all 0.4s ease;
                        padding: 0.75rem 1.5rem;
                        box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
                    }

                    .nav-scrolled .glass-nav {
                        background: rgba(11, 15, 25, 0.9);
                        border-color: rgba(255, 255, 255, 0.1);
                        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
                    }

                    /* Logo Styles */
                    .brand-logo {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                        text-decoration: none;
                        cursor: pointer;
                    }

                    .logo-icon {
                        color: #8B5CF6;
                    }

                    .brand-text {
                        font-weight: 700;
                        font-size: 1.25rem;
                        color: #ffffff;
                        letter-spacing: 0.5px;
                    }

                    .brand-dot {
                        color: #8B5CF6;
                    }

                    /* Center Links */
                    .nav-links-container {
                        display: flex;
                        align-items: center;
                        gap: 2rem;
                    }

                    .nav-item-link {
                        color: #9CA3AF;
                        font-weight: 500;
                        font-size: 0.95rem;
                        text-decoration: none;
                        cursor: pointer;
                        transition: color 0.3s ease, text-shadow 0.3s ease;
                    }

                    .nav-item-link:hover {
                        color: #ffffff;
                    }

                    .active-link {
                        color: #ffffff !important;
                        text-shadow: 0 0 12px rgba(255, 255, 255, 0.3);
                    }

                    /* Right Section (Contact & Socials) */
                    .nav-right-section {
                        display: flex;
                        align-items: center;
                        gap: 1.5rem;
                        /* ADJUSTED SPACING: Adds a visual separator and pushes it away from Certifications */
                        margin-left: 1rem;
                        padding-left: 1.5rem;
                        border-left: 1px solid rgba(255, 255, 255, 0.1);
                    }

                    .contact-link {
                        display: flex;
                        align-items: center;
                        gap: 8px;
                        color: #E5E7EB;
                        font-weight: 500;
                        font-size: 0.95rem;
                        text-decoration: none;
                        cursor: pointer;
                        transition: color 0.3s ease;
                    }

                    .contact-link:hover {
                        color: #ffffff;
                    }

                    .status-dot {
                        width: 8px;
                        height: 8px;
                        background-color: #10B981;
                        border-radius: 50%;
                        box-shadow: 0 0 10px rgba(16, 185, 129, 0.6);
                    }

                    .social-buttons-group {
                        display: flex;
                        align-items: center;
                        gap: 0.5rem;
                    }

                    .social-btn-desktop {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        width: 36px;
                        height: 36px;
                        background: rgba(255, 255, 255, 0.03);
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        border-radius: 8px;
                        color: #9CA3AF;
                        transition: all 0.3s ease;
                    }

                    .social-btn-desktop:hover {
                        background: rgba(255, 255, 255, 0.08);
                        border-color: rgba(255, 255, 255, 0.2);
                        color: #ffffff;
                        transform: translateY(-2px);
                    }

                    /* ==========================================
                       MOBILE BUBBLE MENU OVERRIDES
                       ========================================== */
                    @keyframes fadeOverlayIn {
                        from { opacity: 0; backdrop-filter: blur(0px); }
                        to { opacity: 1; backdrop-filter: blur(6px); }
                    }

                    .bubble-menu-items {
                        background: rgba(5, 8, 16, 0.6) !important; 
                        backdrop-filter: blur(8px) !important;      
                        -webkit-backdrop-filter: blur(8px) !important;
                        align-items: flex-start !important; 
                        padding-top: 110px !important; 
                        z-index: 1040 !important;
                        height: 100vh !important;
                        animation: fadeOverlayIn 0.4s ease-out forwards !important; 
                    }

                    .bubble-menu { 
                        z-index: 1060 !important; 
                        top: 1rem !important; 
                        left: 5% !important;
                        width: 90% !important;
                        background: rgba(11, 15, 25, 0.85) !important;
                        backdrop-filter: blur(20px) !important;
                        border: 1px solid rgba(255, 255, 255, 0.1) !important;
                        border-radius: 50px !important;
                        padding: 6px 8px 6px 14px !important;
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
                        display: flex !important;
                        justify-content: space-between !important;
                    }

                    .bubble-menu .logo-content {
                        width: auto !important;
                        min-width: max-content !important; 
                        justify-content: flex-start !important;
                        overflow: visible !important;
                    }
                    
                    .bubble-menu .bubble.logo-bubble, 
                    .bubble-menu .bubble.toggle-bubble {
                        background: transparent !important;
                        box-shadow: none !important;
                        border: none !important;
                        padding: 0 !important;
                    }

                    .pill-link {
                        border: 1px solid rgba(255, 255, 255, 0.1) !important;
                        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4) !important;
                        font-size: 1.1rem !important; 
                        padding: 12px 24px !important; 
                        font-weight: 500 !important;
                    }
                    
                    .pill-list {
                        display: flex !important;
                        flex-wrap: wrap !important;
                        justify-content: center !important;
                        gap: 12px !important; 
                        padding: 0 10px !important;
                    }
                `}
            </style>

            {/* --- DESKTOP NAVBAR --- */}
            <nav className={`fixed-top nav-wrapper d-none d-xl-block ${scrolled ? 'nav-scrolled' : ''}`}>
                <div className="container">
                    <div className="glass-nav d-flex justify-content-between align-items-center">
                        
                        {/* 1. Logo Section */}
                        <Link to="home" spy={true} smooth={true} duration={500} className="brand-logo">
                            <Code2 className="logo-icon" size={26} strokeWidth={2.5} />
                            <span className="brand-text">Bijay<span className="brand-dot">.</span></span>
                        </Link>

                        {/* 2. Center Links */}
                        <div className="nav-links-container">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    to={link.to} 
                                    spy={true} 
                                    smooth={true} 
                                    offset={-100} 
                                    duration={500} 
                                    className="nav-item-link"
                                    activeClass="active-link"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>

                        {/* 3. Right Section ( Socials) */}
                        <div className="nav-right-section">
                            <div className="social-buttons-group ms-2">
                                {socialLinks.map((social, index) => (
                                    <a 
                                        key={index}
                                        href={social.href} 
                                        target="_blank" 
                                        rel="noreferrer"
                                        className="social-btn-desktop"
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                    </div>
                </div>
            </nav>

            {/* --- MOBILE BUBBLE MENU --- */}
            <div className="d-xl-none">
                <BubbleMenu
                    logo={
                        <a href="#home" className="brand-logo">
                            <Code2 className="logo-icon" size={24} strokeWidth={2.5} />
                            <span className="brand-text">Bijay<span className="brand-dot">.</span></span>
                        </a>
                    }
                    items={bubbleItems}
                    menuAriaLabel="Toggle navigation"
                    menuBg="#0a0d14" 
                    menuContentColor="#ffffff" 
                    useFixedPosition={true}
                    animationEase="back.out(1.2)" 
                    animationDuration={0.45}      
                    staggerDelay={0.05}           
                />
            </div>
        </>
    );
};

export default Navbar;