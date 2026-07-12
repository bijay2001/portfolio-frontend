import React, { useEffect, useState } from 'react';
import api from '../../api/axiosClient';
import { toast } from 'sonner';

const ManageCertifications = () => {
    const [certifications, setCertifications] = useState([]);
    const [formData, setFormData] = useState({ title: '', description: '', certificate_url: '', live_url: '', issue_date: '' });
    const [editId, setEditId] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const token = localStorage.getItem('adminToken');

    const fetchCertifications = async () => {
        const res = await api.get('/admin/certifications', { headers: { Authorization: `Bearer ${token}` } });
        setCertifications(res.data.data);
    };

    useEffect(() => { fetchCertifications(); }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const apiCall = editId 
            ? api.put(`/admin/certifications/${editId}`, formData, { headers: { Authorization: `Bearer ${token}` } })
            : api.post('/admin/certifications', formData, { headers: { Authorization: `Bearer ${token}` } });

        toast.promise(apiCall, {
            loading: editId ? 'Updating certification...' : 'Adding certification...',
            success: () => {
                setFormData({ title: '', description: '', certificate_url: '', live_url: '', issue_date: '' });
                setEditId(null);
                setShowForm(false);
                fetchCertifications();
                return editId ? 'Certification updated successfully!' : 'Certification added successfully!';
            },
            error: 'Failed to save certification.'
        });
    };

    const handleEdit = (cert) => {
        setFormData(cert);
        setEditId(cert.id);
        setShowForm(true);
    };

    const confirmDelete = async (id) => {
        try {
            await api.delete(`/admin/certifications/${id}`, { headers: { Authorization: `Bearer ${token}` } });
            toast.success('Certification deleted permanently');
            fetchCertifications();
        } catch (error) {
            toast.error('Failed to delete certification');
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
                <h2>Manage Certifications</h2>
                <button className="btn-primary" onClick={() => setShowForm(!showForm)}>
                    {showForm ? 'Cancel' : 'Add New Certification'}
                </button>
            </div>

            {showForm && (
                <form className="admin-form" onSubmit={handleSubmit}>
                    <input type="text" placeholder="Certification Title" value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} required />
                    <input type="text" placeholder="Issue Date (e.g. Aug 2024)" value={formData.issue_date} onChange={e => setFormData({...formData, issue_date: e.target.value})} />
                    <input type="text" placeholder="Certificate Image URL" value={formData.certificate_url} onChange={e => setFormData({...formData, certificate_url: e.target.value})} />
                    <input type="text" placeholder="Live Credential URL" value={formData.live_url} onChange={e => setFormData({...formData, live_url: e.target.value})} />
                    <textarea placeholder="Description" value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} rows="4" />
                    <button type="submit" className="btn-success">{editId ? 'Update' : 'Save'} Certification</button>
                </form>
            )}

            <div className="list-container">
                {certifications.map(cert => (
                    <div key={cert.id} className="list-card">
                        <div>
                            <h4>{cert.title}</h4>
                            <p>Issued: {cert.issue_date || 'N/A'}</p>
                        </div>
                        <div className="card-actions">
                            <button onClick={() => handleEdit(cert)} className="btn-edit">Edit</button>
                            <button onClick={() => handleDelete(cert.id)} className="btn-delete">Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageCertifications;