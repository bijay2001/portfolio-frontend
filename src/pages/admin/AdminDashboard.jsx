import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
    FolderGit2, Briefcase, Code, Mail, User, Award, ArrowRight,
    AlertTriangle, CheckCircle2, Clock, TrendingUp
} from 'lucide-react';
import api from '../../api/axiosClient';

const AdminDashboard = () => {
    const [stats, setStats] = useState({ projects: 0, experiences: 0, skills: 0, messages: 0 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const token = localStorage.getItem('adminToken');
                const res = await api.get('/admin/stats', {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.data.success) {
                    setStats(res.data.stats);
                }
            } catch (error) {
                console.error("Error fetching stats:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const statCards = [
        { label: 'Total Projects', value: stats.projects, tag: 'projects', icon: FolderGit2, color: '#7c9cff' },
        { label: 'Experiences', value: stats.experiences, tag: 'work history', icon: Briefcase, color: '#5eead4' },
        { label: 'Skills', value: stats.skills, tag: 'technical', icon: Code, color: '#ffb454' },
        { label: 'Messages', value: stats.messages, tag: 'from visitors', icon: Mail, color: '#fb7185' },
    ];

    const managementCards = [
        { title: 'Profile', desc: 'Update personal information, bio and profile details.', icon: User, path: '/admin/profile', color: '#7c9cff' },
        { title: 'Experiences', desc: 'Add, edit or remove work experiences and positions.', icon: Briefcase, path: '/admin/experiences', color: '#5eead4' },
        { title: 'Skills', desc: 'Manage technical skills and proficiency levels.', icon: Code, path: '/admin/skills', color: '#ffb454' },
        { title: 'Projects', desc: 'Showcase projects and track ongoing work.', icon: FolderGit2, path: '/admin/projects', color: '#c792ea' },
        { title: 'Certifications', desc: 'Add and manage certifications and achievements.', icon: Award, path: '/admin/certifications', color: '#f5d76e' },
        { title: 'Contact Messages', desc: 'View and respond to messages from visitors.', icon: Mail, path: '/admin/messages', color: '#fb7185', badge: stats.messages },
    ];

    const recentMessages = [
        { initials: 'RS', name: 'Rahul Sharma', preview: 'Interested in working with you...', time: '2h ago' },
        { initials: 'SP', name: 'Sneha Patil', preview: "Great portfolio! Let's connect.", time: '5h ago' },
    ];

    const tips = [
        { icon: AlertTriangle, tone: 'warn', text: 'Keep your profile updated for better visibility' },
        { icon: CheckCircle2, tone: 'ok', text: 'Add more projects to showcase your work' },
        { icon: CheckCircle2, tone: 'ok', text: 'Enable the contact form to get more opportunities' },
        { icon: Clock, tone: 'info', text: 'Regularly update your skills and experiences' },
    ];

    if (loading) {
        return (
            <div className="dash-loading">
                <div className="dash-loading-bar"><span /></div>
                <p>Loading dashboard…</p>
                <style>{`
                    .dash-loading { display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 14px; padding: 80px 20px; font-family: 'Inter', sans-serif; color: #6b7280; }
                    .dash-loading-bar { width: 160px; height: 3px; background: #eceef1; border-radius: 4px; overflow: hidden; }
                    .dash-loading-bar span { display: block; width: 40%; height: 100%; background: #ffb454; animation: loadSlide 1.1s ease-in-out infinite; }
                    @keyframes loadSlide { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }
                `}</style>
            </div>
        );
    }

    return (
        <div className="dashboard-wrapper">

            {/* Top Stat Cards */}
            <div className="stats-grid">
                {statCards.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <div className="stat-card" style={{ '--i': i, '--accent': s.color }} key={s.label}>
                            <div className="stat-top">
                                <div className="stat-icon"><Icon size={17} strokeWidth={2} /></div>
                                <TrendingUp size={14} className="stat-trend" />
                            </div>
                            <h3>{s.value}</h3>
                            <p className="stat-label">{s.label}</p>
                            <span className="stat-tag">{s.tag}</span>
                        </div>
                    );
                })}
            </div>

            <div className="section-head">
                <div>
                    <h3 className="section-title">Manage portfolio</h3>
                    <p className="section-subtitle">Update and manage every section of your portfolio</p>
                </div>
            </div>

            {/* Management Grid */}
            <div className="management-grid">
                {managementCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <Link to={card.path} key={card.title} className="manage-card" style={{ '--i': index, '--accent': card.color }}>
                            <div className="manage-icon"><Icon size={20} strokeWidth={2} /></div>
                            <div className="manage-copy">
                                <h4>
                                    {card.title}
                                    {card.badge > 0 && <span className="notification-dot">{card.badge}</span>}
                                </h4>
                                <p>{card.desc}</p>
                            </div>
                            <span className="manage-arrow"><ArrowRight size={16} /></span>
                        </Link>
                    );
                })}
            </div>

            {/* Bottom Row */}
            <div className="bottom-grid">
                <div className="panel-card">
                    <div className="panel-header">
                        <h4>Recent messages</h4>
                        <Link to="/admin/messages" className="view-all-btn">View all</Link>
                    </div>
                    <div className="message-list">
                        {recentMessages.map((m) => (
                            <div className="message-item" key={m.name}>
                                <div className="msg-avatar">{m.initials}</div>
                                <div className="msg-content">
                                    <h5>{m.name}</h5>
                                    <p>{m.preview}</p>
                                </div>
                                <span className="msg-time">{m.time}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="panel-card">
                    <div className="panel-header">
                        <h4>Quick tips</h4>
                    </div>
                    <ul className="tips-list">
                        {tips.map((t, i) => {
                            const Icon = t.icon;
                            return (
                                <li key={i} className={`tone-${t.tone}`}>
                                    <Icon size={16} />
                                    <span>{t.text}</span>
                                </li>
                            );
                        })}
                    </ul>
                </div>
            </div>

            <style>{`
                .dashboard-wrapper {
                    --panel-border: #eceef1;
                    --panel-bg: #ffffff;
                    --ink: #111318;
                    --ink-dim: #6b7280;
                    --font-display: 'Space Grotesk', 'Inter', sans-serif;
                    --font-mono: 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace;

                    display: flex; flex-direction: column; gap: clamp(20px, 3vw, 32px); color: var(--ink);
                }

                @media (prefers-reduced-motion: reduce) {
                    .dashboard-wrapper *, .dashboard-wrapper *::before, .dashboard-wrapper *::after {
                        animation-duration: 0.01ms !important;
                        transition-duration: 0.01ms !important;
                    }
                }

                @keyframes cardIn {
                    from { opacity: 0; transform: translateY(8px); }
                    to { opacity: 1; transform: translateY(0); }
                }

                /* Stats */
                .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(160px, 1fr)); gap: 14px; }
                .stat-card {
                    background: var(--panel-bg); padding: 16px 18px; border-radius: 14px;
                    border: 1px solid var(--panel-border); border-left: 3px solid var(--accent);
                    box-shadow: 0 1px 3px rgba(17, 19, 24, 0.03);
                    opacity: 0; animation: cardIn 0.4s ease forwards; animation-delay: calc(var(--i) * 0.06s);
                    transition: transform 0.18s ease, box-shadow 0.18s ease;
                }
                .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 20px rgba(17, 19, 24, 0.07); }
                .stat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; }
                .stat-icon {
                    width: 30px; height: 30px; border-radius: 8px; display: flex; align-items: center; justify-content: center;
                    background: color-mix(in srgb, var(--accent) 14%, white); color: var(--accent);
                }
                .stat-trend { color: #d1d5db; }
                .stat-card h3 {
                    margin: 0; font-family: var(--font-mono); font-size: 1.7rem; font-weight: 600; letter-spacing: -0.02em;
                }
                .stat-label { margin: 2px 0 0; font-size: 0.82rem; color: var(--ink-dim); font-weight: 500; }
                .stat-tag {
                    display: inline-block; margin-top: 8px; font-family: var(--font-mono); font-size: 0.66rem;
                    color: var(--accent); background: color-mix(in srgb, var(--accent) 12%, white);
                    padding: 2px 8px; border-radius: 100px; text-transform: uppercase; letter-spacing: 0.04em;
                }

                .section-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 12px; }
                .section-title { margin: 0; font-size: clamp(1.05rem, 2vw, 1.2rem); font-weight: 700; font-family: var(--font-display); }
                .section-subtitle { margin: 3px 0 0; color: var(--ink-dim); font-size: 0.86rem; }

                /* Management Grid */
                .management-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(270px, 1fr)); gap: 14px; }
                .manage-card {
                    background: var(--panel-bg); padding: 18px; border-radius: 14px; text-decoration: none; color: inherit;
                    border: 1px solid var(--panel-border);
                    display: flex; align-items: flex-start; gap: 14px;
                    transition: transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease;
                    opacity: 0; animation: cardIn 0.4s ease forwards; animation-delay: calc(var(--i) * 0.05s);
                }
                .manage-card:hover {
                    transform: translateY(-3px);
                    box-shadow: 0 10px 24px rgba(17, 19, 24, 0.07);
                    border-color: color-mix(in srgb, var(--accent) 45%, var(--panel-border));
                }
                .manage-icon {
                    width: 40px; height: 40px; border-radius: 10px; flex-shrink: 0;
                    display: flex; align-items: center; justify-content: center;
                    background: color-mix(in srgb, var(--accent) 14%, white); color: var(--accent);
                }
                .manage-copy { flex: 1; min-width: 0; }
                .manage-card h4 {
                    margin: 0 0 4px 0; font-size: 0.96rem; font-weight: 600; display: flex; align-items: center; gap: 7px;
                }
                .notification-dot {
                    background: #fb7185; color: white; font-size: 0.64rem; font-weight: 700;
                    padding: 1px 6px; border-radius: 100px; line-height: 1.4;
                }
                .manage-card p { margin: 0; color: var(--ink-dim); font-size: 0.82rem; line-height: 1.45; }
                .manage-arrow {
                    color: #c9cbd3; flex-shrink: 0; margin-top: 2px; transition: transform 0.18s ease, color 0.18s ease;
                }
                .manage-card:hover .manage-arrow { transform: translateX(3px); color: var(--accent); }

                /* Bottom Grid */
                .bottom-grid { display: grid; grid-template-columns: 1.15fr 1fr; gap: 16px; }
                .panel-card {
                    background: var(--panel-bg); padding: 18px; border-radius: 14px;
                    border: 1px solid var(--panel-border); box-shadow: 0 1px 3px rgba(17, 19, 24, 0.03);
                }
                .panel-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 14px; }
                .panel-header h4 { margin: 0; font-size: 0.98rem; font-weight: 600; font-family: var(--font-display); }
                .view-all-btn {
                    color: #7c5cff; text-decoration: none; font-size: 0.78rem; font-weight: 600;
                    background: #f1edff; padding: 5px 11px; border-radius: 7px; transition: 0.18s;
                }
                .view-all-btn:hover { background: #e4dbff; }

                .message-item { display: flex; align-items: center; gap: 12px; padding: 10px 0; border-bottom: 1px solid #f2f3f5; }
                .message-item:last-child { border-bottom: none; padding-bottom: 0; }
                .msg-avatar {
                    width: 36px; height: 36px; background: #f4f5f7; border-radius: 10px;
                    display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.76rem;
                    color: #4b5563; flex-shrink: 0; font-family: var(--font-mono);
                }
                .msg-content { flex: 1; min-width: 0; }
                .msg-content h5 { margin: 0 0 2px 0; font-size: 0.87rem; font-weight: 600; }
                .msg-content p { margin: 0; font-size: 0.78rem; color: var(--ink-dim); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
                .msg-time { font-size: 0.7rem; color: #9ca3af; font-family: var(--font-mono); flex-shrink: 0; }

                .tips-list { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 12px; }
                .tips-list li { display: flex; align-items: flex-start; gap: 10px; font-size: 0.85rem; color: #374151; line-height: 1.4; }
                .tips-list li.tone-warn svg { color: #f59e0b; flex-shrink: 0; margin-top: 1px; }
                .tips-list li.tone-ok svg { color: #10b981; flex-shrink: 0; margin-top: 1px; }
                .tips-list li.tone-info svg { color: #7c9cff; flex-shrink: 0; margin-top: 1px; }

                @media (max-width: 900px) {
                    .bottom-grid { grid-template-columns: 1fr; }
                }
                @media (max-width: 480px) {
                    .stats-grid { grid-template-columns: repeat(2, 1fr); }
                    .stat-card { padding: 13px 14px; }
                    .stat-card h3 { font-size: 1.4rem; }
                    .manage-card { padding: 15px; }
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;