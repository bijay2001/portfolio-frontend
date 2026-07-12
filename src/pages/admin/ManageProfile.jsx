import React, { useEffect, useState } from 'react';
import api from '../../api/axiosClient';
import { toast } from 'sonner';

const ManageProfile = () => {
    const [profile, setProfile] = useState({
        id: 1, name: '', title: '', hero_headline: '', summary: '', photo_url: '', resume_url: '' //
    });
    const [message, setMessage] = useState('');
    const token = localStorage.getItem('adminToken');

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await api.get('/profile');
                if (res.data.profile) setProfile(res.data.profile);
            } catch (error) { console.error("Error fetching profile", error); }
        };
        fetchProfile();
    }, []);

    const handleUpdate = async (e) => {
    e.preventDefault();
    try {
        const res = await api.put('/admin/profile', profile, {
            headers: { Authorization: `Bearer ${token}` }
        });
        toast.success(res.data.message || 'Profile updated successfully!');
        
    } catch (error) {
        toast.error('Update failed. Token may be expired.');
    }
};

    return (
        <div className="admin-page">
            <div className="page-header">
                <h2>Manage Profile</h2>
            </div>

            <form className="admin-form" onSubmit={handleUpdate}>
                <label>Name</label>
                <input type="text" value={profile.name || ''} onChange={e => setProfile({...profile, name: e.target.value})} />
                
                <label>Title</label>
                <input type="text" value={profile.title || ''} onChange={e => setProfile({...profile, title: e.target.value})} />
                
                <label>Hero Headline</label>
                <textarea value={profile.hero_headline || ''} onChange={e => setProfile({...profile, hero_headline: e.target.value})} rows="3" />
                
                <label>Summary</label>
                <textarea value={profile.summary || ''} onChange={e => setProfile({...profile, summary: e.target.value})} rows="6" />
                
                <label>Photo URL</label>
                <input type="text" value={profile.photo_url || ''} onChange={e => setProfile({...profile, photo_url: e.target.value})} />
                
                <label>Resume URL</label>
                <input type="text" value={profile.resume_url || ''} onChange={e => setProfile({...profile, resume_url: e.target.value})} />
                
                <button type="submit" className="btn-success">Save Profile Changes</button>
            </form>
        </div>
    );
};

export default ManageProfile;