import React from 'react';
import { Outlet, Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, User, Briefcase, Code, FolderGit2, Award, Mail, LogOut, Bell, Search, Menu } from 'lucide-react';

const AdminLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('adminToken');
        navigate('/admin');
    };

    const navItems = [
        { path: '/admin/dashboard', name: 'Dashboard', icon: LayoutDashboard },
        { path: '/admin/profile', name: 'Profile', icon: User },
        { path: '/admin/experiences', name: 'Experiences', icon: Briefcase },
        { path: '/admin/skills', name: 'Skills', icon: Code },
        { path: '/admin/projects', name: 'Projects', icon: FolderGit2 },
        { path: '/admin/certifications', name: 'Certifications', icon: Award },
        { path: '/admin/messages', name: 'Contact Messages', icon: Mail },
    ];

    return (
        <div className="admin-container">
            {/* Sidebar */}
            <aside className="admin-sidebar">
                <div className="sidebar-brand">
                    <div className="brand-icon"></div>
                    <div>
                        <h3>My Portfolio</h3>
                        <p>Admin Dashboard</p>
                    </div>
                </div>

                <nav className="sidebar-nav">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname.includes(item.path);
                        return (
                            <Link key={item.name} to={item.path} className={`nav-link ${isActive ? 'active' : ''}`}>
                                <Icon size={20} />
                                <span>{item.name}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="sidebar-footer">
                    <div className="user-info">
                        <div className="avatar-placeholder">BK</div>
                        <div className="user-details">
                            <h4>Bijay Kumar Behera</h4>
                            <p>Admin</p>
                        </div>
                    </div>
                    <button onClick={handleLogout} className="logout-btn">
                        <LogOut size={20} />
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="admin-main">
                {/* Topbar */}
                <header className="admin-topbar">
                    <button className="mobile-menu-btn"><Menu size={24} /></button>
                    
                    <div className="topbar-welcome">
                        <h2>Welcome back, Bijay! 👋</h2>
                        <p>Manage your portfolio content from here.</p>
                    </div>

                    <div className="topbar-actions">
                        <div className="search-bar">
                            <input type="text" placeholder="Search anything..." />
                            <Search size={18} className="search-icon" />
                        </div>
                        <button className="notification-btn">
                            <Bell size={20} />
                            <span className="badge">3</span>
                        </button>
                        <div className="topbar-avatar">BK</div>
                    </div>
                </header>

                {/* Dynamic Page Content goes here (Dashboard, Profile, etc.) */}
                <div className="admin-content-scroll">
                    <Outlet />
                </div>
            </main>

            <style>{`
                .admin-container { display: flex; height: 100vh; background-color: #F8F9FA; font-family: 'Inter', sans-serif; overflow: hidden; }
                
                /* Sidebar */
                .admin-sidebar { width: 280px; background-color: #111827; color: white; display: flex; flex-direction: column; flex-shrink: 0; }
                .sidebar-brand { padding: 24px; display: flex; align-items: center; gap: 12px; border-bottom: 1px solid rgba(255,255,255,0.1); }
                .brand-icon { width: 32px; height: 32px; background: linear-gradient(135deg, #4F46E5, #7C3AED); border-radius: 8px; }
                .sidebar-brand h3 { margin: 0; font-size: 1.1rem; font-weight: 600; }
                .sidebar-brand p { margin: 0; font-size: 0.8rem; color: #9CA3AF; }
                
                .sidebar-nav { padding: 20px 12px; flex: 1; display: flex; flex-direction: column; gap: 4px; }
                .nav-link { display: flex; align-items: center; gap: 12px; padding: 12px 16px; color: #D1D5DB; text-decoration: none; border-radius: 8px; transition: all 0.2s; font-size: 0.95rem; }
                .nav-link:hover { background-color: rgba(255,255,255,0.05); color: white; }
                .nav-link.active { background-color: #4F46E5; color: white; box-shadow: 0 4px 12px rgba(79, 70, 229, 0.3); font-weight: 500; }
                
                .sidebar-footer { padding: 20px; border-top: 1px solid rgba(255,255,255,0.1); }
                .user-info { display: flex; align-items: center; gap: 12px; margin-bottom: 16px; }
                .avatar-placeholder { width: 40px; height: 40px; background: #374151; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.9rem; }
                .user-details h4 { margin: 0; font-size: 0.9rem; font-weight: 500; }
                .user-details p { margin: 0; font-size: 0.8rem; color: #9CA3AF; }
                .logout-btn { width: 100%; display: flex; align-items: center; gap: 12px; padding: 12px; background: transparent; border: none; color: #FCA5A5; cursor: pointer; border-radius: 8px; transition: 0.2s; font-size: 0.95rem; }
                .logout-btn:hover { background-color: rgba(248, 113, 113, 0.1); }

                /* Main Area */
                .admin-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
                
                /* Topbar */
                .admin-topbar { background: white; padding: 20px 32px; display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 1px solid #E5E7EB; }
                .mobile-menu-btn { display: none; background: none; border: none; cursor: pointer; color: #4B5563; margin-right: 16px; }
                .topbar-welcome h2 { margin: 0 0 4px 0; font-size: 1.5rem; color: #111827; font-weight: 700; }
                .topbar-welcome p { margin: 0; color: #6B7280; font-size: 0.95rem; }
                
                .topbar-actions { display: flex; align-items: center; gap: 20px; }
                .search-bar { position: relative; }
                .search-bar input { padding: 10px 16px 10px 40px; border: 1px solid #E5E7EB; border-radius: 100px; width: 250px; outline: none; background: #F9FAFB; transition: 0.2s; }
                .search-bar input:focus { border-color: #4F46E5; background: white; box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1); }
                .search-icon { position: absolute; left: 14px; top: 50%; transform: translateY(-50%); color: #9CA3AF; }
                
                .notification-btn { position: relative; background: white; border: 1px solid #E5E7EB; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; cursor: pointer; color: #4B5563; }
                .badge { position: absolute; top: -2px; right: -2px; background: #4F46E5; color: white; font-size: 0.7rem; font-weight: bold; width: 18px; height: 18px; border-radius: 50%; display: flex; align-items: center; justify-content: center; border: 2px solid white; }
                .topbar-avatar { width: 40px; height: 40px; background: #4F46E5; color: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; cursor: pointer; }

                .admin-content-scroll { flex: 1; overflow-y: auto; padding: 32px; }

                @media (max-width: 1024px) {
                    .admin-sidebar { display: none; } /* Add logic for mobile drawer later if needed */
                    .mobile-menu-btn { display: block; }
                    .topbar-welcome p { display: none; }
                    .search-bar { display: none; }
                }
            `}</style>
        </div>
    );
};

export default AdminLayout;