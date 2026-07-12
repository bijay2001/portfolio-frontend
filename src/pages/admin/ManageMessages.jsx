import React, { useEffect, useState } from 'react';
import api from '../../api/axiosClient';
import { toast } from 'sonner';

const ManageMessages = () => {
    const [messages, setMessages] = useState([]);
    const token = localStorage.getItem('adminToken');

    const fetchMessages = async () => {
        const res = await api.get('/admin/messages', { headers: { Authorization: `Bearer ${token}` } });
        setMessages(res.data.data);
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
                <h2>Contact Messages</h2>
            </div>

            <div className="list-container">
                {messages.length === 0 && <p>No messages found.</p>}
                {messages.map(msg => (
                    <div key={msg.id} className="list-card" style={{flexDirection: 'column', alignItems: 'flex-start', gap: '10px'}}>
                        <div style={{display: 'flex', justifyContent: 'space-between', width: '100%'}}>
                            <div>
                                <h4>{msg.name}</h4>
                                <a href={`mailto:${msg.email}`} style={{color: '#4F46E5', fontSize: '0.9rem'}}>{msg.email}</a>
                            </div>
                            <span style={{fontSize: '0.8rem', color: '#9CA3AF'}}>
                                {new Date(msg.created_at).toLocaleDateString()}
                            </span>
                        </div>
                        <div style={{background: '#F9FAFB', padding: '15px', borderRadius: '8px', width: '100%', border: '1px solid #E5E7EB'}}>
                            <p style={{margin: 0}}>{msg.message}</p>
                        </div>
                        <button onClick={() => handleDelete(msg.id)} className="btn-delete" style={{alignSelf: 'flex-end'}}>Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ManageMessages;