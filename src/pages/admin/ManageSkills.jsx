import React, { useEffect, useState } from 'react';
import api from '../../api/axiosClient';
import { toast } from 'sonner';

const ManageSkills = () => {
    const [skills, setSkills] = useState([]);
    const [formData, setFormData] = useState({ name: '', category: '', display_order: 99 });
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const token = localStorage.getItem('adminToken');

    const fetchSkills = async () => {
        const res = await api.get('/admin/skills', { headers: { Authorization: `Bearer ${token}` } });
        setSkills(res.data.data);
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
            action: {
                label: 'Delete',
                onClick: () => confirmDelete(id)
            },
            cancel: {
                label: 'Cancel',
            }
        });
    };

    return (
        <div className="admin-page">
            <div className="page-header">
                <h2>Manage Skills</h2>
                <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add New Skill'}
                </button>
            </div>

            {showForm && (
                <form className="admin-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Skill Name (e.g. React.js)" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} required />
                    <input type="text" placeholder="Category (e.g. Frontend, Database)" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})} />
                    <input type="number" placeholder="Display Order (lower numbers show first)" value={formData.display_order} onChange={e => setFormData({...formData, display_order: e.target.value})} />
                    <button type="submit" className="btn-success">{editId ? 'Update' : 'Save'} Skill</button>
                </form>
            )}

            <div className="list-container">
                {skills.map(skill => (
                    <div key={skill.id} className="list-card">
                        <div>
                            <h4>{skill.name} <span style={{fontSize:'0.8rem', color:'#6B7280'}}>({skill.category})</span></h4>
                            <p>Order: {skill.display_order}</p>
                        </div>
                        <div className="card-actions">
                            <button onClick={() => handleEdit(skill)} className="btn-edit">Edit</button>
                            <button onClick={() => handleDelete(skill.id)} className="btn-delete">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageSkills;