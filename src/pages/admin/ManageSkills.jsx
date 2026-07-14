import React, { useEffect, useState } from 'react';
import api from '../../api/axiosClient';
import { toast } from 'sonner';
import { Code, Plus, X, Pencil, Trash2, Tag, ListOrdered } from 'lucide-react';

const ManageSkills = () => {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({ name: '', category: '', display_order: 99 });
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem('adminToken');

    const fetchSkills = async () => {
        try {
            const res = await api.get('/admin/skills', { headers: { Authorization: `Bearer ${token}` } });
            setSkills(res.data.data);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchSkills(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const apiCall = editId
            ? api.put(`/admin/skills/${editId}`, formData, { headers: { Authorization: `Bearer ${token}` } })
            : api.post('/admin/skills', formData, { headers: { Authorization: `Bearer ${token}` } });

        toast.promise(apiCall, {
            loading: editId ? 'Updating skill...' : 'Adding skill...',
            success: () => {
                setFormData({ name: '', category: '', display_order: 99 });
                setEditId(null);
                setShowForm(false);
                fetchSkills();
                return editId ? 'Skill updated successfully!' : 'Skill added successfully!';
            },
            error: 'Failed to save skill.'
        });
    };

    const handleEdit = (skill) => {
        setFormData(skill);
        setEditId(skill.id);
        setShowForm(true);
    };

    const confirmDelete = async (id) => {
        try {
            await api.delete(`/admin/skills/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            toast.success('Skill deleted permanently');
            fetchSkills();
        } catch (error) {
            toast.error('Failed to delete skill');
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
        setFormData({ name: '', category: '', display_order: 99 });
    };

    return (
        <div className="mgmt-page">
            <div className="mgmt-header">
                <div>
                    <span className="mgmt-eyebrow">portfolio / skills</span>
                    <h2 className="mgmt-title">Manage Skills</h2>
                </div>
                <button className="btn-primary-mgmt" onClick={() => (showForm ? closeForm() : setShowForm(true))}>
                    {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add skill</>}
                </button>
            </div>

            {showForm && (
                <form className="mgmt-form-card" onSubmit={handleSubmit}>
                    <div className="form-grid">
                        <div className="field-group span-2">
                            <label className="field-label"><Code size={13} /> Skill name</label>
                            <input type="text" placeholder="e.g. React.js" value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} required />
                        </div>
                        <div className="field-group">
                            <label className="field-label"><Tag size={13} /> Category</label>
                            <input type="text" placeholder="e.g. Frontend, Database" value={formData.category} onChange={e => setFormData({ ...formData, category: e.target.value })} />
                        </div>
                        <div className="field-group">
                            <label className="field-label"><ListOrdered size={13} /> Display order</label>
                            <input type="number" placeholder="Lower shows first" value={formData.display_order} onChange={e => setFormData({ ...formData, display_order: e.target.value })} />
                        </div>
                    </div>
                    <button type="submit" className="btn-success-mgmt">{editId ? 'Update skill' : 'Save skill'}</button>
                </form>
            )}

            {loading ? (
                <div className="loading-state"><div className="loading-bar"><span /></div><p>Loading skills…</p></div>
            ) : skills.length === 0 ? (
                <div className="empty-state">
                    <Code size={26} />
                    <p>No skills yet</p>
                    <span>Add your first technical skill to build your stack.</span>
                </div>
            ) : (
                <div className="skills-grid">
                    {skills.map((skill, i) => (
                        <div key={skill.id} className="skill-chip" style={{ '--i': i }}>
                            <div className="chip-top">
                                <span className="chip-order">#{skill.display_order}</span>
                                <div className="chip-actions">
                                    <button onClick={() => handleEdit(skill)} className="icon-btn-edit" aria-label="Edit"><Pencil size={13} /></button>
                                    <button onClick={() => handleDelete(skill.id)} className="icon-btn-delete" aria-label="Delete"><Trash2 size={13} /></button>
                                </div>
                            </div>
                            <h4>{skill.name}</h4>
                            {skill.category && <span className="chip-category">{skill.category}</span>}
                        </div>
                    ))}
                </div>
            )}

            <style>{`
                .mgmt-page {
                    --bg-panel: #ffffff; --border: #eceef1; --ink: #111318; --ink-dim: #6b7280; --ink-faint: #9ca3af;
                    --accent: #5eead4; --accent-dark: #0f9c88; --danger: #fb7185;
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
                    background: var(--bg-panel); border: 1px solid var(--border); border-left: 3px solid var(--accent-dark);
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
                .mgmt-form-card input {
                    padding: 10px 12px; border: 1px solid var(--border); border-radius: 9px; font-family: inherit;
                    font-size: 0.9rem; background: #fafafb; transition: 0.18s;
                }
                .mgmt-form-card input:focus {
                    outline: none; border-color: var(--accent-dark); background: white; box-shadow: 0 0 0 3px rgba(94,234,212,0.16);
                }
                .btn-success-mgmt {
                    margin-top: 16px; background: #10b981; color: white; border: none; padding: 11px 20px;
                    border-radius: 10px; cursor: pointer; font-weight: 700; font-size: 0.9rem; transition: 0.18s;
                }
                .btn-success-mgmt:hover { filter: brightness(1.06); transform: translateY(-1px); }

                /* Skill chips grid — distinct compact layout for this page */
                .skills-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(170px, 1fr)); gap: 12px; }
                .skill-chip {
                    background: var(--bg-panel); border: 1px solid var(--border); border-radius: 12px; padding: 13px 14px;
                    transition: transform 0.18s ease, box-shadow 0.18s ease;
                    opacity: 0; animation: itemIn 0.35s ease forwards; animation-delay: calc(var(--i) * 0.03s);
                }
                @keyframes itemIn { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: translateY(0); } }
                .skill-chip:hover { box-shadow: 0 8px 20px rgba(17,19,24,0.06); transform: translateY(-2px); border-color: #d5f5ef; }

                .chip-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
                .chip-order { font-family: var(--font-mono); font-size: 0.7rem; color: var(--ink-faint); }
                .chip-actions { display: flex; gap: 4px; opacity: 0; transition: opacity 0.18s ease; }
                .skill-chip:hover .chip-actions, .skill-chip:focus-within .chip-actions { opacity: 1; }

                .skill-chip h4 { margin: 0 0 6px; font-size: 0.92rem; font-weight: 600; }
                .chip-category {
                    display: inline-block; font-family: var(--font-mono); font-size: 0.68rem; color: var(--accent-dark);
                    background: rgba(94,234,212,0.14); padding: 2px 8px; border-radius: 100px; text-transform: uppercase;
                    letter-spacing: 0.03em;
                }

                .icon-btn-edit, .icon-btn-delete {
                    width: 26px; height: 26px; border-radius: 7px; border: 1px solid var(--border); background: white;
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
                .loading-bar span { display: block; width: 40%; height: 100%; background: var(--accent-dark); animation: loadSlide 1.1s ease-in-out infinite; }
                @keyframes loadSlide { 0% { transform: translateX(-100%); } 100% { transform: translateX(350%); } }

                @media (max-width: 640px) {
                    .form-grid { grid-template-columns: 1fr; }
                    .field-group.span-2 { grid-column: span 1; }
                    .skills-grid { grid-template-columns: repeat(auto-fill, minmax(140px, 1fr)); }
                    .chip-actions { opacity: 1; }
                }
            `}</style>
        </div>
    );
};

export default ManageSkills;