import React, { useEffect, useState } from 'react';
import api from '../../api/axiosClient';
import { toast } from 'sonner';

const ManageProjects = () => {
    const [projects, setProjects] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', link: '', image_url: '' });
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const token = localStorage.getItem('adminToken');

    const fetchProjects = async () => {
        const res = await api.get('/admin/projects', { headers: { Authorization: `Bearer ${token}` } });
        setProjects(res.data.data);
    };

    useEffect(() => { fetchProjects(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const apiCall = editId 
            ? api.put(`/admin/projects/${editId}`, formData, { headers: { Authorization: `Bearer ${token}` } })
            : api.post('/admin/projects', formData, { headers: { Authorization: `Bearer ${token}` } });

        toast.promise(apiCall, {
            loading: editId ? 'Updating project...' : 'Adding project...',
            success: () => {
                setFormData({ title: '', description: '', link: '', image_url: '' });
                setEditId(null);
                setShowForm(false);
                fetchProjects();
                return editId ? 'Project updated successfully!' : 'Project added successfully!';
            },
            error: 'Failed to save project.'
        });
    };

    const handleEdit = (proj) => {
        setFormData(proj);
        setEditId(proj.id);
        setShowForm(true);
    };

    const confirmDelete = async (id) => {
        try {
            await api.delete(`/admin/projects/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            toast.success('Project deleted permanently');
            fetchProjects();
        } catch (error) {
            toast.error('Failed to delete project');
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
                <h2>Manage Projects</h2>
                <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add New Project'}
                </button>
            </div>

            {showForm && (
                <form className="admin-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Project Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                    <input type="text" placeholder="Project Link (URL)" value={formData.link} onChange={e => setFormData({...formData, link: e.target.value})} />
                    <input type="text" placeholder="Image URL" value={formData.image_url} onChange={e => setFormData({...formData, image_url: e.target.value})} />
                    <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="4" />
                    <button type="submit" className="btn-success">{editId ? 'Update' : 'Save'} Project</button>
                </form>
            )}

            <div className="list-container">
                {projects.map(proj => (
                    <div key={proj.id} className="list-card">
                        <div>
                            <h4>{proj.title}</h4>
                            <a href={proj.link} target="_blank" rel="noreferrer" style={{color: '#4F46E5'}}>{proj.link}</a>
                        </div>
                        <div className="card-actions">
                            <button onClick={() => handleEdit(proj)} className="btn-edit">Edit</button>
                            <button onClick={() => handleDelete(proj.id)} className="btn-delete">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageProjects;