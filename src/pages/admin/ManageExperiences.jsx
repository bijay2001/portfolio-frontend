import React, { useEffect, useState } from 'react';
import api from '../../api/axiosClient';
import { toast } from 'sonner';
import { Briefcase, Plus, X, Pencil, Trash2, Building2, CalendarRange, MapPin, FileText } from 'lucide-react';

const ManageExperiences = () => {
    const [experiences, setExperiences] = useState([]);
    const [formData, setFormData] = useState({ role: '', company: '', duration: '', description: '', location: '' });
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('adminToken');

    const fetchExperiences = async () => {
        try {
            const res = await api.get('/admin/experiences', { headers: { Authorization: `Bearer ${token}` } });
            setExperiences(res.data.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchExperiences(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiCall = editId
            ? api.put(`/admin/experiences/${editId}`, formData, { headers: { Authorization: `Bearer ${token}` } })
            : api.post('/admin/experiences', formData, { headers: { Authorization: `Bearer ${token}` } });

        toast.promise(apiCall, {
            loading: editId ? 'Updating experience...' : 'Adding experience...',
            success: () => {
                setFormData({ role: '', company: '', duration: '', description: '', location: '' });
                setEditId(null);
                setShowForm(false);
                fetchExperiences();
                return editId ? 'Experience updated successfully!' : 'Experience added successfully!';
            },
            error: 'Failed to save experience.'
        });
    };

    const handleEdit = (exp) => {
        setFormData(exp);
        setEditId(exp.id);
        setShowForm(true);
    };

    const confirmDelete = async (id) => {
        try {
            await api.delete(`/admin/experiences/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            toast.success('Experience deleted permanently');
            fetchExperiences();
        } catch (error) {
            toast.error('Failed to delete experience');
        }
    };

    const handleDelete = (id) => {
        toast.warning('Are you sure you want to delete this?', {
            description: 'This action cannot be undone.',
            action: { label: 'Delete', onClick: () => confirmDelete(id) },
            cancel: { label: 'Cancel' }
        });
    };

    const closeForm = () => {
        setShowForm(false);
        setEditId(null);
        setFormData({ role: '', company: '', duration: '', description: '', location: '' });
    };

    return (
        <div className="mgmt-page">
            <div className="mgmt-header">
                <div>
                    <span className="mgmt-eyebrow">portfolio / experiences</span>
                    <h2 className="mgmt-title">Manage Experiences</h2>
                </div>
                <button className="btn-primary-mgmt" onClick={() => (showForm ? closeForm() : setShowForm(true))}>
                    {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add experience</>}
                </button>
            </div>

            {showForm && (
                <form className="mgmt-form-card" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="field-group">
                            <label className="field-label"><Briefcase size={13} /> Role</label>
                            <input type="text" placeholder="e.g. Junior Software Developer" value={formData.role} onChange={e => setFormData({ ...formData, role: e.target.value })} required />
                        </div>
                        <div className="field-group">
                            <label className="field-label"><Building2 size={13} /> Company</label>
                            <input type="text" placeholder="e.g. Orisys Infotech Pvt Ltd" value={formData.company} onChange={e => setFormData({ ...formData, company: e.target.value })} required />
                        </div>
                        <div className="field-group">
                            <label className="field-label"><CalendarRange size={13} /> Duration</label>
                            <input type="text" placeholder="e.g. 2024 - Present" value={formData.duration} onChange={e => setFormData({ ...formData, duration: e.target.value })} required />
                        </div>
                        <div className="field-group">
                            <label className="field-label"><MapPin size={13} /> Location</label>
                            <input type="text" placeholder="e.g. Bhubaneswar, Odisha" value={formData.location} onChange={e => setFormData({ ...formData, location: e.target.value })} />
                        </div>
                        <div className="field-group span-2">
                            <label className="field-label"><FileText size={13} /> Description</label>
                            <textarea placeholder="Key responsibilities and impact..." value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} rows="4" />
                        </div>
                    </div>
                    <button type="submit" className="btn-success-mgmt">{editId ? 'Update experience' : 'Save experience'}</button>
                </form>
            )}

            {loading ? (
                <div className="loading-state"><div className="loading-bar"><span /></div><p>Loading experiences…</p></div>
            ) : experiences.length === 0 ? (
                <div className="empty-state">
                    <Briefcase size={26} />
                    <p>No experiences yet</p>
                    <span>Add your first role to build out your work history.</span>
                </div>
            ) : (
                <div className="mgmt-list">
                    {experiences.map((exp, i) => (
                        <div key={exp.id} className="mgmt-item" style={{ '--i': i }}>
                            <div className="item-icon"><Briefcase size={18} /></div>
                            <div className="item-body">
                                <h4>{exp.role} <span className="at">@</span> {exp.company}</h4>
                                <p className="item-meta">{exp.duration}{exp.location ? ` · ${exp.location}` : ''}</p>
                            </div>
                            <div className="item-actions">
                                <button onClick={() => handleEdit(exp)} className="icon-btn-edit" aria-label="Edit"><Pencil size={15} /></button>
                                <button onClick={() => handleDelete(exp.id)} className="icon-btn-delete" aria-label="Delete"><Trash2 size={15} /></button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            <style>{`
                .mgmt-page {
                    --bg-panel: #ffffff; --border: #eceef1; --ink: #111318; --ink-dim: #6b7280; --ink-faint: #9ca3af;
                    --accent: #7c9cff; --accent-2: #5eead4; --danger: #fb7185;
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

                .btn-primary-mgmt {
                    display: inline-flex; align-items: center; gap: 7px; background: #111318; color: #fff; border: none;
                    padding: 10px 16px; border-radius: 10px; cursor: pointer; font-weight: 600; font-size: 0.86rem;
                    transition: 0.18s; flex-shrink: 0;
                }
                .btn-primary-mgmt:hover { background: #22242c; transform: translateY(-1px); }

                .mgmt-form-card {
                    background: var(--bg-panel); border: 1px solid var(--border); border-left: 3px solid var(--accent);
                    border-radius: 14px; padding: 20px; margin-bottom: 22px;
                    box-shadow: 0 8px 24px rgba(17,19,24,0.06);
                    animation: formIn 0.28s ease;
                }
                @keyframes formIn { from { opacity: 0; transform: translateY(-6px); } to { opacity: 1; transform: translateY(0); } }

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
                    outline: none; border-color: var(--accent); background: white; box-shadow: 0 0 0 3px rgba(124,156,255,0.14);
                }
                .btn-success-mgmt {
                    margin-top: 16px; background: #10b981; color: white; border: none; padding: 11px 20px;
                    border-radius: 10px; cursor: pointer; font-weight: 700; font-size: 0.9rem; transition: 0.18s;
                }
                .btn-success-mgmt:hover { filter: brightness(1.06); transform: translateY(-1px); }

                .mgmt-list { display: flex; flex-direction: column; gap: 10px; }
                .mgmt-item {
                    display: flex; align-items: center; gap: 14px; background: var(--bg-panel); padding: 14px 16px;
                    border-radius: 12px; border: 1px solid var(--border); transition: transform 0.18s ease, box-shadow 0.18s ease;
                    opacity: 0; animation: itemIn 0.35s ease forwards; animation-delay: calc(var(--i) * 0.04s);
                }
                @keyframes itemIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
                .mgmt-item:hover { box-shadow: 0 8px 20px rgba(17,19,24,0.06); transform: translateY(-1px); border-color: #e2e4e9; }

                .item-icon {
                    width: 38px; height: 38px; border-radius: 10px; flex-shrink: 0; display: flex; align-items: center;
                    justify-content: center; background: rgba(124,156,255,0.14); color: #4a63d6;
                }
                .item-body { flex: 1; min-width: 0; }
                .item-body h4 { margin: 0 0 3px; font-size: 0.94rem; font-weight: 600; }
                .item-body .at { color: var(--ink-faint); font-weight: 400; }
                .item-meta { margin: 0; font-size: 0.78rem; color: var(--ink-dim); font-family: var(--font-mono); }

                .item-actions { display: flex; gap: 6px; flex-shrink: 0; }
                .icon-btn-edit, .icon-btn-delete {
                    width: 32px; height: 32px; border-radius: 8px; border: 1px solid var(--border); background: white;
                    display: flex; align-items: center; justify-content: center; cursor: pointer; transition: 0.18s;
                }
                .icon-btn-edit { color: #6366f1; }
                .icon-btn-edit:hover { background: #eef2ff; border-color: #c7d2fe; }
                .icon-btn-delete { color: var(--danger); }
                .icon-btn-delete:hover { background: #fef2f2; border-color: #fecaca; }

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
                    .form-grid { grid-template-columns: 1fr; }
                    .field-group.span-2 { grid-column: span 1; }
                    .mgmt-item { padding: 12px; gap: 11px; }
                    .item-icon { width: 34px; height: 34px; }
                }
            `}</style>
        </div>
    );
};

export default ManageExperiences;