import React, { useEffect, useState } from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import {
    LayoutDashboard, User, Briefcase, Code, FolderGit2, Award, Mail,
    LogOut, Bell, Search, Menu, X, Terminal
} from 'lucide-react';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [clock, setClock] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    const navItems = [
        { path: '/admin/dashboard', name: 'Dashboard', icon: LayoutDashboard, key: 'D' },
        { path: '/admin/profile', name: 'Profile', icon: User, key: 'P' },
        { path: '/admin/experiences', name: 'Experiences', icon: Briefcase, key: 'E' },
        { path: '/admin/skills', name: 'Skills', icon: Code, key: 'S' },
        { path: '/admin/projects', name: 'Projects', icon: FolderGit2, key: 'J' },
        { path: '/admin/certifications', name: 'Certifications', icon: Award, key: 'C' },
        { path: '/admin/messages', name: 'Contact Messages', icon: Mail, key: 'M' },
    ];

    // Close drawer whenever the route changes (mobile)
    useEffect(() => { setDrawerOpen(false); }, [location.pathname]);

    // Lightweight live clock — reinforces the "console" identity
    useEffect(() => {
        const tick = () => setClock(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }));
        tick();
        const id = setInterval(tick, 30000);
        return () => clearInterval(id);
    }, []);

    // Close on Escape
    useEffect(() => {
        const onKey = (e) => { if (e.key === 'Escape') setDrawerOpen(false); };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, []);

    return (
        <div className="admin-shell">
            {/* Mobile backdrop */}
            <div
                className={`shell-backdrop ${drawerOpen ? 'visible' : ''}`}
                onClick={() => setDrawerOpen(false)}
                aria-hidden="true"
            />

            {/* Sidebar */}
            <aside className={`admin-sidebar ${drawerOpen ? 'open' : ''}`}>
                <div className="sidebar-brand">
                    <div className="brand-mark"><Terminal size={18} strokeWidth={2.2} /></div>
                    <div className="brand-copy">
                        <h3>portfolio<span className="accent">.admin</span></h3>
                        <p>root@bijay &middot; v2.0</p>
                    </div>
                    <button className="drawer-close" onClick={() => setDrawerOpen(false)} aria-label="Close menu">
                        <X size={18} />
                    </button>
                </div>

                <nav className="sidebar-nav">
                    <span className="nav-group-label">Menu</span>
                    {navItems.map((item, i) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.includes(item.path);
                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`nav-link ${isActive ? 'active' : ''}`}
                                style={{ '--i': i }}
                            >
                                <span className="nav-link-bar" />
                                <Icon size={18} strokeWidth={2} />
                                <span className="nav-link-text">{item.name}</span>
                                <kbd className="nav-key">{item.key}</kbd>
                            </Link>
                        );
                    })}
                </nav>

                <div className="sidebar-footer">
                    <div className="status-line">
                        <span className="status-dot" />
                        <span>All systems operational</span>
                        <span className="status-clock">{clock}</span>
                    </div>
                    <div className="user-info">
                        <div className="avatar-placeholder">BK</div>
                        <div className="user-details">
                            <h4>Bijay Kumar Behera</h4>
                            <p>Administrator</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={17} />
                        <span>Sign out</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="admin-main">
                <header className="admin-topbar">
                    <button className="mobile-menu-btn" onClick={() => setDrawerOpen(true)} aria-label="Open menu">
                        <Menu size={22} />
                    </button>

                    <div className="topbar-welcome">
                        <h2>Welcome back, Bijay <span className="wave">👋</span></h2>
                        <p>Manage your portfolio content from here</p>
                    </div>

                    <div className="topbar-actions">
                        <div className="search-bar">
                            <span className="search-prompt">$</span>
                            <input type="text" placeholder="search anything..." />
                            <Search size={16} className="search-icon" />
                        </div>
                        <button className="icon-btn notification-btn" aria-label="Notifications">
                            <Bell size={18} />
                            <span className="badge">3</span>
                        </button>
                        <div className="topbar-avatar">BK</div>
                    </div>
                </header>

                <div className="admin-content-scroll">
                    <Outlet />
                </div>
            </main>

            <style>{`
                .admin-shell {
                    --bg: #0a0b0f;
                    --panel: #12141a;
                    --panel-alt: #171922;
                    --border: #23262f;
                    --text: #e8e8ec;
                    --text-dim: #8b8d98;
                    --text-faint: #5b5d68;
                    --accent: #ffb454;
                    --accent-soft: rgba(255, 180, 84, 0.12);
                    --accent-2: #5eead4;
                    --danger: #fb7185;
                    --radius: 14px;
                    --font-display: 'Space Grotesk', 'Inter', sans-serif;
                    --font-body: 'Inter', sans-serif;
                    --font-mono: 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace;

                    display: flex;
                    height: 100vh;
                    background-color: #f5f6f8;
                    font-family: var(--font-body);
                    overflow: hidden;
                    position: relative;
                }

                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

                @media (prefers-reduced-motion: reduce) {
                    .admin-shell *, .admin-shell *::before, .admin-shell *::after {
                        animation-duration: 0.01ms !important;
                        transition-duration: 0.01ms !important;
                    }
                }

                /* Backdrop (mobile only) */
                .shell-backdrop {
                    display: none;
                }

                /* Sidebar */
                .admin-sidebar {
                    width: 264px;
                    background: var(--bg);
                    color: var(--text);
                    display: flex;
                    flex-direction: column;
                    flex-shrink: 0;
                    border-right: 1px solid var(--border);
                }

                .sidebar-brand {
                    padding: 20px 18px;
                    display: flex;
                    align-items: center;
                    gap: 11px;
                    border-bottom: 1px solid var(--border);
                }
                .brand-mark {
                    width: 34px; height: 34px; flex-shrink: 0;
                    background: var(--accent-soft);
                    color: var(--accent);
                    border-radius: 9px;
                    display: flex; align-items: center; justify-content: center;
                    border: 1px solid rgba(255, 180, 84, 0.25);
                }
                .brand-copy { flex: 1; min-width: 0; }
                .brand-copy h3 {
                    margin: 0; font-family: var(--font-display); font-size: 1rem; font-weight: 600;
                    color: var(--text); letter-spacing: -0.01em;
                }
                .brand-copy h3 .accent { color: var(--accent); }
                .brand-copy p {
                    margin: 2px 0 0; font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-faint);
                }
                .drawer-close { display: none; background: none; border: none; color: var(--text-dim); cursor: pointer; padding: 4px; }

                .sidebar-nav {
                    padding: 16px 12px; flex: 1; display: flex; flex-direction: column; gap: 2px; overflow-y: auto;
                }
                .nav-group-label {
                    font-family: var(--font-mono); font-size: 0.68rem; text-transform: uppercase; letter-spacing: 0.08em;
                    color: var(--text-faint); padding: 4px 12px 8px;
                }
                .nav-link {
                    position: relative;
                    display: flex; align-items: center; gap: 11px;
                    padding: 10px 12px 10px 14px;
                    color: var(--text-dim);
                    text-decoration: none;
                    border-radius: 9px;
                    transition: background-color 0.18s ease, color 0.18s ease;
                    font-size: 0.88rem;
                    opacity: 0;
                    animation: navIn 0.4s ease forwards;
                    animation-delay: calc(var(--i) * 0.04s);
                }
                @keyframes navIn {
                    from { opacity: 0; transform: translateX(-6px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                .nav-link-bar {
                    position: absolute; left: 0; top: 50%; transform: translateY(-50%);
                    width: 3px; height: 0; background: var(--accent); border-radius: 0 3px 3px 0;
                    transition: height 0.18s ease;
                }
                .nav-link:hover { background-color: var(--panel-alt); color: var(--text); }
                .nav-link.active {
                    background-color: var(--accent-soft);
                    color: var(--accent);
                    font-weight: 500;
                }
                .nav-link.active .nav-link-bar { height: 60%; }
                .nav-link-text { flex: 1; }
                .nav-key {
                    font-family: var(--font-mono); font-size: 0.68rem; color: var(--text-faint);
                    background: var(--panel-alt); border: 1px solid var(--border);
                    border-radius: 5px; padding: 1px 6px; line-height: 1.5;
                }
                .nav-link.active .nav-key { color: var(--accent); border-color: rgba(255,180,84,0.25); }

                .sidebar-footer { padding: 16px 18px 18px; border-top: 1px solid var(--border); }
                .status-line {
                    display: flex; align-items: center; gap: 7px;
                    font-family: var(--font-mono); font-size: 0.7rem; color: var(--text-faint);
                    margin-bottom: 14px;
                }
                .status-dot {
                    width: 6px; height: 6px; border-radius: 50%; background: var(--accent-2); flex-shrink: 0;
                    box-shadow: 0 0 0 0 rgba(94, 234, 212, 0.6);
                    animation: pulseDot 2s infinite;
                }
                @keyframes pulseDot {
                    0% { box-shadow: 0 0 0 0 rgba(94, 234, 212, 0.45); }
                    70% { box-shadow: 0 0 0 5px rgba(94, 234, 212, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(94, 234, 212, 0); }
                }
                .status-clock { margin-left: auto; color: var(--text-dim); }

                .user-info { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
                .avatar-placeholder {
                    width: 36px; height: 36px; background: var(--panel-alt); border: 1px solid var(--border);
                    border-radius: 50%; display: flex; align-items: center; justify-content: center;
                    font-weight: 600; font-size: 0.82rem; color: var(--accent); font-family: var(--font-display);
                }
                .user-details h4 { margin: 0; font-size: 0.86rem; font-weight: 500; color: var(--text); }
                .user-details p { margin: 1px 0 0; font-size: 0.74rem; color: var(--text-faint); }
                .logout-btn {
                    width: 100%; display: flex; align-items: center; justify-content: center; gap: 9px;
                    padding: 10px; background: transparent; border: 1px solid var(--border); color: var(--danger);
                    cursor: pointer; border-radius: 9px; transition: 0.18s; font-size: 0.86rem; font-weight: 500;
                }
                .logout-btn:hover { background-color: rgba(251, 113, 133, 0.08); border-color: rgba(251, 113, 133, 0.3); }

                /* Main Area */
                .admin-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }

                .admin-topbar {
                    background: white; padding: 16px clamp(16px, 3vw, 32px);
                    display: flex; justify-content: space-between; align-items: center;
                    border-bottom: 1px solid #e9eaee; gap: 16px;
                }
                .mobile-menu-btn { display: none; background: none; border: none; cursor: pointer; color: #4b5563; flex-shrink: 0; }
                .topbar-welcome { min-width: 0; }
                .topbar-welcome h2 {
                    margin: 0; font-size: clamp(1.05rem, 2.4vw, 1.35rem); color: #111318; font-weight: 700;
                    font-family: var(--font-display); display: flex; align-items: center; gap: 8px;
                }
                .wave { display: inline-block; animation: wave 2.4s ease-in-out infinite; transform-origin: 70% 70%; }
                @keyframes wave {
                    0%, 100% { transform: rotate(0deg); }
                    10%, 30% { transform: rotate(14deg); }
                    20% { transform: rotate(-8deg); }
                    40% { transform: rotate(0deg); }
                }
                .topbar-welcome p { margin: 2px 0 0; color: #6b7280; font-size: 0.85rem; }

                .topbar-actions { display: flex; align-items: center; gap: 14px; flex-shrink: 0; }
                .search-bar {
                    position: relative; display: flex; align-items: center;
                    background: #f4f5f7; border: 1px solid #e9eaee; border-radius: 9px;
                    padding: 8px 12px 8px 10px; transition: 0.18s;
                }
                .search-bar:focus-within { border-color: var(--accent); background: white; box-shadow: 0 0 0 3px rgba(255, 180, 84, 0.12); }
                .search-prompt { font-family: var(--font-mono); font-size: 0.82rem; color: var(--text-faint); margin-right: 6px; }
                .search-bar input { border: none; outline: none; background: transparent; width: 190px; font-size: 0.86rem; }
                .search-icon { color: #9ca3af; margin-left: 6px; flex-shrink: 0; }

                .icon-btn {
                    position: relative; background: white; border: 1px solid #e9eaee; width: 38px; height: 38px;
                    border-radius: 10px; display: flex; align-items: center; justify-content: center;
                    cursor: pointer; color: #4b5563; transition: 0.18s;
                }
                .icon-btn:hover { border-color: var(--accent); color: var(--accent); }
                .badge {
                    position: absolute; top: -3px; right: -3px; background: var(--accent); color: #1a1200;
                    font-size: 0.64rem; font-weight: 700; width: 16px; height: 16px; border-radius: 50%;
                    display: flex; align-items: center; justify-content: center; border: 2px solid white;
                }
                .topbar-avatar {
                    width: 38px; height: 38px; background: #111318; color: white; border-radius: 10px;
                    display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.8rem;
                    cursor: pointer; font-family: var(--font-display); flex-shrink: 0;
                }

                .admin-content-scroll { flex: 1; overflow-y: auto; padding: clamp(10px, 3vw, 30px); }

                /* ===== Responsive ===== */
                @media (max-width: 1024px) {
                    .admin-sidebar {
                        position: fixed; top: 0; left: 0; height: 100%; z-index: 60;
                        transform: translateX(-100%);
                        transition: transform 0.28s cubic-bezier(0.4, 0, 0.2, 1);
                        box-shadow: 0 0 40px rgba(0,0,0,0.35);
                    }
                    .admin-sidebar.open { transform: translateX(0); }
                    .drawer-close { display: block; }
                    .mobile-menu-btn { display: block; }
                    .shell-backdrop {
                        display: block; position: fixed; inset: 0; background: rgba(10, 11, 15, 0.55);
                        backdrop-filter: blur(2px); z-index: 55; opacity: 0; pointer-events: none;
                        transition: opacity 0.25s ease;
                    }
                    .shell-backdrop.visible { opacity: 1; pointer-events: auto; }
                    .topbar-welcome p { display: none; }
                }

                @media (max-width: 640px) {
                    .search-bar { display: none; }
                    .admin-topbar { padding: 14px 16px; }
                    .topbar-welcome h2 { font-size: 1.02rem; }
                    .topbar-actions { gap: 10px; }
                }
            `}</style>
        </div>
    );
};

export default AdminLayout;