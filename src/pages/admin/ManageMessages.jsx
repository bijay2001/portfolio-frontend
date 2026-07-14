import React, { useEffect, useState } from 'react';
import api from '../../api/axiosClient';
import { toast } from 'sonner';
import { Mail, Trash2, Inbox } from 'lucide-react';

const ManageMessages = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('adminToken');

    const fetchMessages = async () => {
        try {
            const res = await api.get('/admin/messages', { headers: { Authorization: `Bearer ${token}` } });
            setMessages(res.data.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMessages(); }, []);

    const confirmDelete = async (id) => {
        try {
            await api.delete(`/admin/messages/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            toast.success('Message deleted permanently');
            fetchMessages();
        } catch (error) {
            toast.error('Failed to delete message');
        }
    };

    const handleDelete = (id) => {
        toast.warning('Delete this message?', {
            description: 'This action cannot be undone.',
            action: { label: 'Delete', onClick: () => confirmDelete(id) },
            cancel: { label: 'Cancel' }
        });
    };

    const initialsOf = (name = '') => name.split(' ').filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase()).join('') || '?';

    return (
        <div className="mgmt-page">
            <div className="mgmt-header">
                <div>
                    <span className="mgmt-eyebrow">portfolio / inbox</span>
                    <h2 className="mgmt-title">Contact Messages</h2>
                </div>
                {!loading && messages.length > 0 && <span className="count-pill">{messages.length} total</span>}
            </div>

            {loading ? (
                <div className="loading-state"><div className="loading-bar"><span /></div><p>Loading messages…</p></div>
            ) : messages.length === 0 ? (
                <div className="empty-state">
                    <Inbox size={26} />
                    <p>Your inbox is empty</p>
                    <span>Messages from your portfolio's contact form will show up here.</span>
                </div>
            ) : (
                <div className="msg-list">
                    {messages.map((msg, i) => (
                        <div key={msg.id} className="msg-card" style={{ '--i': i }}>
                            <div className="msg-card-head">
                                <div className="msg-avatar">{initialsOf(msg.name)}</div>
                                <div className="msg-who">
                                    <h4>{msg.name}</h4>
                                    <a href={`mailto:${msg.email}`} className="msg-email"><Mail size={12} /> {msg.email}</a>
                                </div>
                                <span className="msg-date">{new Date(msg.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}</span>
                            </div>
                            <div className="msg-body">
                                <p>{msg.message}</p>
                            </div>
                            <div className="msg-card-foot">
                                <button onClick={() => handleDelete(msg.id)} className="btn-delete-msg">
                                    <Trash2 size={14} /> Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
                .mgmt-page {
                    --bg-panel: #ffffff; --border: #eceef1; --ink: #111318; --ink-dim: #6b7280; --ink-faint: #9ca3af;
                    --accent: #fb7185; --danger: #fb7185;
                    --font-display: 'Space Grotesk', 'Inter', sans-serif;
                    --font-mono: 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace;
                    max-width: 900px; margin: 0 auto; color: var(--ink); font-family: 'Inter', sans-serif;
                }
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
                @media (prefers-reduced-motion: reduce) {
                    .mgmt-page *, .mgmt-page *::before, .mgmt-page *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
                }

                .mgmt-header { display: flex; justify-content: space-between; align-items: flex-end; gap: 14px; margin-bottom: 22px; flex-wrap: wrap; }
                .mgmt-eyebrow { font-family: var(--font-mono); font-size: 0.72rem; color: var(--ink-faint); text-transform: uppercase; letter-spacing: 0.06em; }
                .mgmt-title { margin: 4px 0 0; font-size: clamp(1.1rem, 2.4vw, 1.4rem); font-weight: 700; font-family: var(--font-display); }
                .count-pill {
                    font-family: var(--font-mono); font-size: 0.76rem; color: var(--ink-dim); background: #f4f5f7;
                    border: 1px solid var(--border); padding: 5px 12px; border-radius: 100px;
                }

                .msg-list { display: flex; flex-direction: column; gap: 12px; }
                .msg-card {
                    background: var(--bg-panel); border: 1px solid var(--border); border-radius: 14px; padding: 16px;
                    transition: box-shadow 0.18s ease, transform 0.18s ease;
                    opacity: 0; animation: itemIn 0.35s ease forwards; animation-delay: calc(var(--i) * 0.05s);
                }
                @keyframes itemIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
                .msg-card:hover { box-shadow: 0 8px 20px rgba(17,19,24,0.06); }

                .msg-card-head { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
                .msg-avatar {
                    width: 38px; height: 38px; border-radius: 10px; background: rgba(251,113,133,0.12); color: #d94b62;
                    display: flex; align-items: center; justify-content: center; font-weight: 600; font-size: 0.8rem;
                    font-family: var(--font-mono); flex-shrink: 0;
                }
                .msg-who { flex: 1; min-width: 0; }
                .msg-who h4 { margin: 0 0 2px; font-size: 0.92rem; font-weight: 600; }
                .msg-email {
                    display: inline-flex; align-items: center; gap: 5px; font-size: 0.78rem; color: var(--ink-dim);
                    text-decoration: none;
                }
                .msg-email:hover { color: #d94b62; text-decoration: underline; }
                .msg-date { font-size: 0.72rem; color: var(--ink-faint); font-family: var(--font-mono); flex-shrink: 0; white-space: nowrap; }

                .msg-body {
                    background: #fafafb; border: 1px solid var(--border); border-radius: 10px; padding: 13px 14px;
                }
                .msg-body p { margin: 0; font-size: 0.88rem; color: #374151; line-height: 1.55; }

                .msg-card-foot { display: flex; justify-content: flex-end; margin-top: 10px; }
                .btn-delete-msg {
                    display: inline-flex; align-items: center; gap: 6px; background: white; color: var(--danger);
                    border: 1px solid #fecaca; padding: 7px 13px; border-radius: 8px; cursor: pointer;
                    font-size: 0.8rem; font-weight: 500; transition: 0.18s;
                }
                .btn-delete-msg:hover { background: #fef2f2; }

                .empty-state {
                    display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px;
                    padding: 56px 20px; color: var(--ink-faint); background: var(--bg-panel); border: 1px dashed var(--border);
                    border-radius: 14px; text-align: center;
                }
                .empty-state svg { color: #d1d3da; margin-bottom: 4px; }
                .empty-state p { margin: 0; font-weight: 600; color: var(--ink-dim); font-size: 0.92rem; }
                .empty-state span { font-size: 0.82rem; max-width: 320px; }

                .loading-state { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 60px 20px; color: var(--ink-dim); }
                .loading-bar { width: 150px; height: 3px; background: #eceef1; border-radius: 4px; overflow: hidden; }
                .loading-bar span { display: block; width: 40%; height: 100%; background: var(--accent); animation: loadSlide 1.1s ease-in-out infinite; }
                @keyframes loadSlide { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }

                @media (max-width: 640px) {
                    .msg-card-head { flex-wrap: wrap; }
                    .msg-date { margin-left: 50px; }
                }
            `}</style>
        </div>
    );
};

export default ManageMessages;