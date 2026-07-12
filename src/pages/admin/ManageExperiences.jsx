import React, { useEffect, useState } from 'react';
import api from '../../api/axiosClient';
import { toast } from 'sonner'; // 1. Import toast

const ManageExperiences = () => {
    const [experiences, setExperiences] = useState([]);
    const [formData, setFormData] = useState({ role: '', company: '', duration: '', description: '', location: '' });
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const token = localStorage.getItem('adminToken');

    const fetchExperiences = async () => {
        const res = await api.get('/admin/experiences', { headers: { Authorization: `Bearer ${token}` } });
        setExperiences(res.data.data);
    };

    useEffect(() => { fetchExperiences(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 2. Wrap API calls in a toast.promise for automatic Loading, Success, and Error states
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

    // 3. The New Delete Logic with Sonner Action
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
        // This creates the dynamic island warning alert
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
                <h2>Manage Experiences</h2>
                <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add New Experience'}
                </button>
            </div>

            {showForm && (
                <form className="admin-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Role" value={formData.role} onChange={e => setFormData({...formData, role: e.target.value})} required />
                    <input type="text" placeholder="Company" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} required />
                    <input type="text" placeholder="Duration (e.g. 2020 - Present)" value={formData.duration} onChange={e => setFormData({...formData, duration: e.target.value})} required />
                    <input type="text" placeholder="Location" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} />
                    <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="4" />
                    <button type="submit" className="btn-success">{editId ? 'Update' : 'Save'} Experience</button>
                </form>
            )}

            <div className="list-container">
                {experiences.map(exp => (
                    <div key={exp.id} className="list-card">
                        <div>
                            <h4>{exp.role} at {exp.company}</h4>
                            <p>{exp.duration} | {exp.location}</p>
                        </div>
                        <div className="card-actions">
                            <button onClick={() => handleEdit(exp)} className="btn-edit">Edit</button>
                            {/* Uses the new handleDelete */}
                            <button onClick={() => handleDelete(exp.id)} className="btn-delete">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageExperiences;