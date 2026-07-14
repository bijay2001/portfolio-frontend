import React, { useEffect, useState } from 'react';
import api from '../../api/axiosClient';
import { toast } from 'sonner';
import { User, Type, Sparkles, FileText, ImageIcon, FileBadge, Save, UserRound } from 'lucide-react';

const ManageProfile = () => {
    const [profile, setProfile] = useState({
        id: 1, name: '', title: '', hero_headline: '', summary: '', photo_url: '', resume_url: ''
    });
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/profile');
                if (res.data.profile) setProfile(res.data.profile);
            } catch (error) {
                console.error("Error fetching profile", error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleUpdate = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            const res = await api.put('/admin/profile', profile, {
                headers: { Authorization: `Bearer ${token}` }
            });
            toast.success(res.data.message || 'Profile updated successfully!');
        } catch (error) {
            toast.error('Update failed. Token may be expired.');
        } finally {
            setSaving(false);
        }
    };

    const initials = (profile.name || '').split(' ').filter(Boolean).slice(0, 2).map(w => w[0]?.toUpperCase()).join('') || '?';

    return (
        <div className="mgmt-page">
            <div className="mgmt-header">
                <div>
                    <span className="mgmt-eyebrow">portfolio / profile</span>
                    <h2 className="mgmt-title">Manage Profile</h2>
                </div>
            </div>

            {loading ? (
                <div className="loading-state"><div className="loading-bar"><span /></div><p>Loading profile…</p></div>
            ) : (
                <form className="profile-layout" onSubmit={handleUpdate}>
                    <div className="profile-preview">
                        <div className="preview-avatar">
                            {profile.photo_url ? <img src={profile.photo_url} alt={profile.name} /> : <span>{initials}</span>}
                        </div>
                        <h3>{profile.name || 'Your name'}</h3>
                        <p>{profile.title || 'Your title'}</p>
                        <span className="preview-tag"><UserRound size={12} /> Live preview</span>
                    </div>

                    <div className="mgmt-form-card">
                        <div className="form-grid">
                            <div className="field-group">
                                <label className="field-label"><User size={13} /> Name</label>
                                <input type="text" value={profile.name || ''} onChange={e => setProfile({ ...profile, name: e.target.value })} placeholder="Your full name" />
                            </div>
                            <div className="field-group">
                                <label className="field-label"><Type size={13} /> Title</label>
                                <input type="text" value={profile.title || ''} onChange={e => setProfile({ ...profile, title: e.target.value })} placeholder="e.g. Junior Software Developer" />
                            </div>
                            <div className="field-group span-2">
                                <label className="field-label"><Sparkles size={13} /> Hero headline</label>
                                <textarea value={profile.hero_headline || ''} onChange={e => setProfile({ ...profile, hero_headline: e.target.value })} rows="3" placeholder="The line visitors see first" />
                            </div>
                            <div className="field-group span-2">
                                <label className="field-label"><FileText size={13} /> Summary</label>
                                <textarea value={profile.summary || ''} onChange={e => setProfile({ ...profile, summary: e.target.value })} rows="6" placeholder="A short bio about your background and focus" />
                            </div>
                            <div className="field-group">
                                <label className="field-label"><ImageIcon size={13} /> Photo URL</label>
                                <input type="text" value={profile.photo_url || ''} onChange={e => setProfile({ ...profile, photo_url: e.target.value })} placeholder="https://..." />
                            </div>
                            <div className="field-group">
                                <label className="field-label"><FileBadge size={13} /> Resume URL</label>
                                <input type="text" value={profile.resume_url || ''} onChange={e => setProfile({ ...profile, resume_url: e.target.value })} placeholder="https://..." />
                            </div>
                        </div>
                        <button type="submit" className="btn-success-mgmt" disabled={saving}>
                            <Save size={15} /> {saving ? 'Saving...' : 'Save profile changes'}
                        </button>
                    </div>
                </form>
            )}

            <style>{`
                .mgmt-page {
                    --bg-panel: #ffffff; --border: #eceef1; --ink: #111318; --ink-dim: #6b7280; --ink-faint: #9ca3af;
                    --accent: #ffb454; --font-display: 'Space Grotesk', 'Inter', sans-serif;
                    --font-mono: 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace;
                    max-width: 1000px; margin: 0 auto; color: var(--ink); font-family: 'Inter', sans-serif;
                }
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');
                @media (prefers-reduced-motion: reduce) {
                    .mgmt-page *, .mgmt-page *::before, .mgmt-page *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
                }

                .mgmt-header { display: flex; justify-content: space-between; align-items: flex-end; gap: 14px; margin-bottom: 22px; flex-wrap: wrap; }
                .mgmt-eyebrow { font-family: var(--font-mono); font-size: 0.72rem; color: var(--ink-faint); text-transform: uppercase; letter-spacing: 0.06em; }
                .mgmt-title { margin: 4px 0 0; font-size: clamp(1.1rem, 2.4vw, 1.4rem); font-weight: 700; font-family: var(--font-display); }

                .profile-layout { display: grid; grid-template-columns: 240px 1fr; gap: 20px; align-items: start; }

                .profile-preview {
                    background: #111318; border-radius: 16px; padding: 28px 20px; text-align: center; color: white;
                    position: sticky; top: 16px;
                }
                .preview-avatar {
                    width: 76px; height: 76px; border-radius: 50%; margin: 0 auto 14px; overflow: hidden;
                    background: rgba(255,180,84,0.16); color: var(--accent); display: flex; align-items: center;
                    justify-content: center; font-size: 1.4rem; font-weight: 700; font-family: var(--font-display);
                    border: 2px solid rgba(255,180,84,0.35);
                }
                .preview-avatar img { width: 100%; height: 100%; object-fit: cover; }
                .profile-preview h3 { margin: 0 0 3px; font-size: 1rem; font-weight: 700; font-family: var(--font-display); }
                .profile-preview p { margin: 0 0 14px; font-size: 0.82rem; color: #9CA3AF; }
                .preview-tag {
                    display: inline-flex; align-items: center; gap: 5px; font-family: var(--font-mono); font-size: 0.68rem;
                    color: #5eead4; background: rgba(94,234,212,0.1); padding: 4px 10px; border-radius: 100px;
                    text-transform: uppercase; letter-spacing: 0.04em;
                }

                .mgmt-form-card {
                    background: var(--bg-panel); border: 1px solid var(--border); border-left: 3px solid var(--accent);
                    border-radius: 14px; padding: 20px; box-shadow: 0 1px 3px rgba(17,19,24,0.03);
                }
                .form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 14px; }
                .field-group { display: flex; flex-direction: column; gap: 6px; }
                .field-group.span-2 { grid-column: span 2; }
                .field-label {
                    display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 0.72rem;
                    color: var(--ink-dim); text-transform: uppercase; letter-spacing: 0.03em;
                }
                .mgmt-form-card input, .mgmt-form-card textarea {
                    padding: 10px 12px; border: 1px solid var(--border); border-radius: 9px; font-family: inherit;
                    font-size: 0.9rem; background: #fafafb; transition: 0.18s; resize: vertical;
                }
                .mgmt-form-card input:focus, .mgmt-form-card textarea:focus {
                    outline: none; border-color: var(--accent); background: white; box-shadow: 0 0 0 3px rgba(255,180,84,0.14);
                }
                .btn-success-mgmt {
                    margin-top: 16px; display: inline-flex; align-items: center; gap: 8px; background: var(--accent);
                    color: #1a1200; border: none; padding: 11px 20px; border-radius: 10px; cursor: pointer;
                    font-weight: 700; font-size: 0.9rem; transition: 0.18s;
                }
                .btn-success-mgmt:hover { filter: brightness(1.06); transform: translateY(-1px); }
                .btn-success-mgmt:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

                .loading-state { display: flex; flex-direction: column; align-items: center; gap: 12px; padding: 60px 20px; color: var(--ink-dim); }
                .loading-bar { width: 150px; height: 3px; background: #eceef1; border-radius: 4px; overflow: hidden; }
                .loading-bar span { display: block; width: 40%; height: 100%; background: var(--accent); animation: loadSlide 1.1s ease-in-out infinite; }
                @keyframes loadSlide { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }

                @media (max-width: 800px) {
                    .profile-layout { grid-template-columns: 1fr; }
                    .profile-preview { position: static; }
                    .form-grid { grid-template-columns: 1fr; }
                    .field-group.span-2 { grid-column: span 1; }
                }
            `}</style>
        </div>
    );
};

export default ManageProfile;