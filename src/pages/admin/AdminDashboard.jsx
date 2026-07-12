import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FolderGit2, Briefcase, Code, Mail, User, Award, ArrowRight, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
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

    const managementCards = [
        { title: 'Profile', desc: 'Update your personal information, bio, and profile details.', icon: User, path: '/admin/profile', color: '#4F46E5', bg: '#EEF2FF' },
        { title: 'Experiences', desc: 'Add, edit or remove your work experiences and positions.', icon: Briefcase, path: '/admin/experiences', color: '#10B981', bg: '#D1FAE5' },
        { title: 'Skills', desc: 'Manage your technical skills and proficiency levels.', icon: Code, path: '/admin/skills', color: '#3B82F6', bg: '#DBEAFE' },
        { title: 'Projects', desc: 'Showcase your projects and track your work.', icon: FolderGit2, path: '/admin/projects', color: '#EC4899', bg: '#FCE7F3' },
        { title: 'Certifications', desc: 'Add and manage your certifications and achievements.', icon: Award, path: '/admin/certifications', color: '#F59E0B', bg: '#FEF3C7' },
        { title: 'Contact Messages', desc: 'View and respond to messages from visitors.', icon: Mail, path: '/admin/messages', color: '#14B8A6', bg: '#CCFBF1', badge: stats.messages },
    ];

    if (loading) return <div style={{ padding: '20px' }}>Loading dashboard...</div>;

    return (
        <div className="dashboard-wrapper">
            
            {/* Top Stat Cards */}
            <div className="stats-grid">
                <div className="stat-card">
                    <div className="stat-icon-wrapper" style={{ background: '#EEF2FF', color: '#4F46E5' }}>
                        <FolderGit2 size={24} />
                    </div>
                    <div className="stat-info">
                        <p>Total Projects</p>
                        <h3>{stats.projects}</h3>
                        <span>All Projects</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrapper" style={{ background: '#D1FAE5', color: '#10B981' }}>
                        <Briefcase size={24} />
                    </div>
                    <div className="stat-info">
                        <p>Experiences</p>
                        <h3>{stats.experiences}</h3>
                        <span>Work Experience</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrapper" style={{ background: '#DBEAFE', color: '#3B82F6' }}>
                        <Code size={24} />
                    </div>
                    <div className="stat-info">
                        <p>Skills</p>
                        <h3>{stats.skills}</h3>
                        <span>Technical Skills</span>
                    </div>
                </div>
                <div className="stat-card">
                    <div className="stat-icon-wrapper" style={{ background: '#FEF3C7', color: '#F59E0B' }}>
                        <Mail size={24} />
                    </div>
                    <div className="stat-info">
                        <p>Messages</p>
                        <h3>{stats.messages}</h3>
                        <span>From Visitors</span>
                    </div>
                </div>
            </div>

            <h3 className="section-title">Manage Portfolio</h3>
            <p className="section-subtitle">Update and manage all sections of your portfolio</p>

            {/* Management Grid */}
            <div className="management-grid">
                {managementCards.map((card, index) => {
                    const Icon = card.icon;
                    return (
                        <div key={index} className="manage-card">
                            <div className="manage-icon" style={{ background: card.bg, color: card.color }}>
                                <Icon size={32} strokeWidth={1.5} />
                            </div>
                            <h4>
                                {card.title}
                                {card.badge > 0 && <span className="notification-dot">{card.badge}</span>}
                            </h4>
                            <p>{card.desc}</p>
                            <Link to={card.path} className="manage-btn">
                                Manage {card.title} <ArrowRight size={16} />
                            </Link>
                        </div>
                    );
                })}
            </div>

            {/* Bottom Row */}
            <div className="bottom-grid">
                <div className="recent-messages-card">
                    <div className="card-header">
                        <h4>Recent Messages</h4>
                        <Link to="/admin/messages" className="view-all-btn">View All</Link>
                    </div>
                    {/* Placeholder for recent messages list */}
                    <div className="message-list">
                        <div className="message-item">
                            <div className="msg-avatar">RS</div>
                            <div className="msg-content">
                                <h5>Rahul Sharma</h5>
                                <p>Interested in working with you...</p>
                            </div>
                            <span className="msg-time">2h ago</span>
                        </div>
                        <div className="message-item">
                            <div className="msg-avatar">SP</div>
                            <div className="msg-content">
                                <h5>Sneha Patil</h5>
                                <p>Great portfolio! Let's connect.</p>
                            </div>
                            <span className="msg-time">5h ago</span>
                        </div>
                    </div>
                </div>

                <div className="quick-tips-card">
                    <h4>Quick Tips</h4>
                    <ul className="tips-list">
                        <li><AlertTriangle size={18} color="#4F46E5"/> Keep your profile updated for better visibility</li>
                        <li><CheckCircle2 size={18} color="#4F46E5"/> Add more projects to showcase your work</li>
                        <li><CheckCircle2 size={18} color="#4F46E5"/> Enable contact form to get more opportunities</li>
                        <li><Clock size={18} color="#4F46E5"/> Regularly update your skills and experiences</li>
                    </ul>
                </div>
            </div>

            <style>{`
                .dashboard-wrapper { display: flex; flex-direction: column; gap: 32px; color: #111827; }
                
                /* Stats Grid */
                .stats-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
                .stat-card { background: white; padding: 24px; border-radius: 16px; display: flex; align-items: center; gap: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.02); border: 1px solid #F3F4F6; }
                .stat-icon-wrapper { width: 56px; height: 56px; border-radius: 12px; display: flex; align-items: center; justify-content: center; }
                .stat-info p { margin: 0; font-size: 0.85rem; color: #6B7280; font-weight: 500; }
                .stat-info h3 { margin: 4px 0; font-size: 1.8rem; font-weight: 700; color: #111827; }
                .stat-info span { font-size: 0.75rem; color: #9CA3AF; }

                .section-title { margin: 0; font-size: 1.25rem; font-weight: 700; }
                .section-subtitle { margin: 4px 0 0 0; color: #6B7280; font-size: 0.9rem; }

                /* Management Grid */
                .management-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; }
                .manage-card { background: white; padding: 32px 24px; border-radius: 16px; text-align: center; box-shadow: 0 2px 10px rgba(0,0,0,0.02); border: 1px solid #F3F4F6; display: flex; flex-direction: column; align-items: center; transition: transform 0.2s; }
                .manage-card:hover { transform: translateY(-4px); box-shadow: 0 10px 25px rgba(0,0,0,0.05); }
                .manage-icon { width: 72px; height: 72px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; }
                .manage-card h4 { margin: 0 0 12px 0; font-size: 1.1rem; font-weight: 600; display: flex; align-items: center; gap: 8px; justify-content: center; }
                .notification-dot { background: #EF4444; color: white; font-size: 0.7rem; padding: 2px 6px; border-radius: 100px; }
                .manage-card p { margin: 0 0 24px 0; color: #6B7280; font-size: 0.9rem; line-height: 1.5; flex: 1; }
                .manage-btn { background: #4F46E5; color: white; text-decoration: none; padding: 10px 24px; border-radius: 8px; font-size: 0.9rem; font-weight: 500; display: inline-flex; align-items: center; gap: 8px; transition: 0.2s; }
                .manage-btn:hover { background: #4338CA; }

                /* Bottom Grid */
                .bottom-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; margin-top: 16px; }
                .recent-messages-card, .quick-tips-card { background: white; padding: 24px; border-radius: 16px; box-shadow: 0 2px 10px rgba(0,0,0,0.02); border: 1px solid #F3F4F6; }
                .card-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 20px; }
                .card-header h4, .quick-tips-card h4 { margin: 0; font-size: 1.1rem; font-weight: 600; }
                .view-all-btn { color: #4F46E5; text-decoration: none; font-size: 0.85rem; font-weight: 500; background: #EEF2FF; padding: 6px 12px; border-radius: 6px; }
                
                .message-item { display: flex; align-items: center; gap: 16px; padding: 12px 0; border-bottom: 1px solid #F3F4F6; }
                .message-item:last-child { border-bottom: none; padding-bottom: 0; }
                .msg-avatar { width: 40px; height: 40px; background: #E5E7EB; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: 600; color: #4B5563; }
                .msg-content { flex: 1; }
                .msg-content h5 { margin: 0 0 4px 0; font-size: 0.95rem; font-weight: 600; }
                .msg-content p { margin: 0; font-size: 0.85rem; color: #6B7280; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 250px; }
                .msg-time { font-size: 0.75rem; color: #9CA3AF; }

                .tips-list { list-style: none; padding: 0; margin: 20px 0 0 0; display: flex; flex-direction: column; gap: 16px; }
                .tips-list li { display: flex; align-items: center; gap: 12px; font-size: 0.9rem; color: #4B5563; }

                @media (max-width: 768px) {
                    .bottom-grid { grid-template-columns: 1fr; }
                }
            `}</style>
        </div>
    );
};

export default AdminDashboard;