import React, { useState, useEffect } from 'react';
import { Link } from 'react-scroll';
import { Terminal } from 'lucide-react';
import BubbleMenu from '../animations/BubbleMenu'; 

const Navbar = () => {
    const [scrolled, setScrolled] = useState(false);

    // 1. Handle Desktop Scroll Styling
    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // 2. MAGIC FIX: Automatically close the Bubble Menu on click
    useEffect(() => {
        const handleMobileMenuClick = (e) => {
            const clickedPill = e.target.closest('.pill-link');
            if (clickedPill) {
                // Find the open toggle button and programmatically click it to close
                const toggleBtn = document.querySelector('.toggle-bubble.open');
                if (toggleBtn) {
                    toggleBtn.click();
                }
            }
        };
        document.addEventListener('click', handleMobileMenuClick);
        return () => document.removeEventListener('click', handleMobileMenuClick);
    }, []);

    const navLinks = [
        { name: 'Home', to: 'home' },
        { name: 'About', to: 'about' },
        { name: 'Skills', to: 'skills' },
        { name: 'Experience', to: 'experience' },
        { name: 'Projects', to: 'projects' },
        { name: 'Certifications', to: 'certifications' },
        { name: 'Resume', to: 'resume' },
        { name: 'Contact', to: 'contact' },
    ];

    const bubbleItems = navLinks.map((link, index) => ({
        label: link.name,
        href: `#${link.to}`, 
        ariaLabel: link.name,
        rotation: index % 2 === 0 ? -2 : 2, 
        hoverStyles: { 
            bgColor: '#111522', 
            textColor: '#00DBE0' 
        }
    }));

    return (
        <>
            <style>
                {`
                    html { scroll-behavior: smooth; }

                    /* --- DESKTOP NAVBAR STYLES --- */
                    .nav-wrapper {
                        transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
                        z-index: 1030;
                    }
                    .nav-scrolled .glass-nav {
                        background: rgba(11, 15, 25, 0.85);
                        border-color: rgba(0, 219, 224, 0.4);
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.6);
                        backdrop-filter: blur(20px);
                        -webkit-backdrop-filter: blur(20px);
                    }
                    .glass-nav {
                        background: rgba(255, 255, 255, 0.03);
                        backdrop-filter: blur(16px);
                        -webkit-backdrop-filter: blur(16px);
                        border: 1px solid rgba(255, 255, 255, 0.08);
                        border-radius: 50px;
                        transition: all 0.4s ease;
                    }
                    .bg-gradient-premium {
                        background: linear-gradient(135deg, var(--neon-purple), var(--neon-cyan));
                    }
                    .nav-item-link {
                        color: var(--text-muted);
                        font-weight: 600;
                        text-decoration: none;
                        transition: color 0.3s ease, text-shadow 0.3s ease;
                    }
                    .nav-item-link:hover {
                        color: var(--neon-cyan);
                    }
                    .active-link {
                        color: #ffffff !important;
                        text-shadow: 0 0 12px rgba(0, 219, 224, 0.6);
                    }

                    /* ==========================================
                       MOBILE BUBBLE MENU - NATIVE UI FIXES
                       ========================================== */
                    
                    @keyframes fadeOverlayIn {
                        from { opacity: 0; backdrop-filter: blur(0px); }
                        to { opacity: 1; backdrop-filter: blur(6px); }
                    }

                    /* 1. Blurred Overlay when Menu is Open */
                    .bubble-menu-items {
                        background: rgba(5, 8, 16, 0.4) !important; 
                        backdrop-filter: blur(6px) !important;      
                        -webkit-backdrop-filter: blur(6px) !important;
                        align-items: flex-start !important; 
                        padding-top: 110px !important; 
                        z-index: 1040 !important;
                        height: 100vh !important;
                        animation: fadeOverlayIn 0.4s ease-out forwards !important; 
                    }

                    /* 2. Top Nav Bar -> Perfect Glass Pill */
                    .bubble-menu { 
                        z-index: 1060 !important; 
                        top: 1rem !important; 
                        left: 5% !important;
                        width: 90% !important;
                        background: rgba(11, 15, 25, 0.85) !important;
                        backdrop-filter: blur(20px) !important;
                        -webkit-backdrop-filter: blur(20px) !important;
                        border: 1px solid rgba(255, 255, 255, 0.1) !important;
                        border-radius: 50px !important;
                        padding: 6px 8px 6px 14px !important; /* Proper padding around logo/button */
                        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5) !important;
                        display: flex !important;
                        justify-content: space-between !important;
                    }

                    /* 3. Force Logo Container to show Full Text */
                    .bubble-menu .logo-content {
                        width: auto !important;
                        min-width: max-content !important; 
                        justify-content: flex-start !important;
                        overflow: visible !important;
                    }
                    
                    .bubble-menu .bubble.logo-bubble {
                        padding: 0 !important;
                        width: auto !important;
                    }

                    /* Remove individual bubble backgrounds so they merge into the pill */
                    .bubble-menu .bubble.logo-bubble, 
                    .bubble-menu .bubble.toggle-bubble {
                        background: transparent !important;
                        box-shadow: none !important;
                        border: none !important;
                    }

                    /* 4. The Interactive Navigation Pills */
                    .pill-link {
                        border: 1px solid rgba(255, 255, 255, 0.1) !important;
                        box-shadow: 0 10px 20px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05) !important;
                        font-size: 1.15rem !important; 
                        padding: 12px 24px !important; 
                        min-height: 52px !important;   
                        font-weight: 500 !important;
                        letter-spacing: 0.02em !important;
                    }
                    .pill-link:hover { border-color: var(--neon-cyan) !important; }

                    .pill-list {
                        display: flex !important;
                        flex-wrap: wrap !important;
                        justify-content: center !important;
                        gap: 12px !important; 
                        row-gap: 16px !important;
                        padding: 0 10px !important;
                    }
                    .pill-col {
                        flex: 0 0 auto !important; 
                        margin: 0 !important;
                    }
                `}
            </style>

            {/* --- DESKTOP NAVBAR --- */}
            <nav className={`fixed-top nav-wrapper d-none d-xl-block ${scrolled ? 'nav-scrolled py-2' : 'py-4'}`}>
                <div className="container">
                    <div className="glass-nav d-flex justify-content-between align-items-center px-4 py-2">
                        <a href="#home" className="d-flex align-items-center gap-2 text-decoration-none" style={{ cursor: 'pointer' }}>
                            <div className="logo-icon bg-gradient-premium rounded-circle p-2 d-flex align-items-center justify-content-center">
                                <Terminal size={20} color="white" />
                            </div>
                            <span className="fw-bold fs-5 text-white tracking-wide">Bijay<span className="text-gradient">.Dev</span></span>
                        </a>

                        <div className="d-flex gap-4">
                            {navLinks.map((link) => (
                                <Link 
                                    key={link.name} 
                                    to={link.to} 
                                    spy={true} 
                                    smooth={true} 
                                    offset={-80} 
                                    duration={500} 
                                    className="nav-item-link cursor-pointer"
                                    activeClass="active-link"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                </div>
            </nav>

            {/* --- MOBILE BUBBLE MENU --- */}
            <div className="d-xl-none">
                <BubbleMenu
                    logo={
                        /* Full Custom Logo Override */
                        <a href="#home" className="d-flex align-items-center gap-2 text-decoration-none">
                            <div className="bg-gradient-premium rounded-circle d-flex align-items-center justify-content-center" style={{ width: '32px', height: '32px' }}>
                                <Terminal size={16} color="white" />
                            </div>
                            <span className="fw-bold fs-5 text-white tracking-wide m-0 p-0" style={{ lineHeight: '1' }}>
                                Bijay<span className="text-gradient">.Dev</span>
                            </span>
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