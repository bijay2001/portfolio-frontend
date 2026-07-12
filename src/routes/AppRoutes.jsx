// src/routes/AppRoutes.jsx
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import AdminLogin from '../pages/admin/AdminLogin';
import AdminLayout from '../pages/admin/AdminLayout';
import AdminDashboard from '../pages/admin/AdminDashboard';
import ManageProfile from '../pages/admin/ManageProfile';
import ManageExperiences from '../pages/admin/ManageExperiences';
import ManageProjects from '../pages/admin/ManageProjects';
import ManageSkills from '../pages/admin/ManageSkills';
import ManageMessages from '../pages/admin/ManageMessages'; 
import ManageCertifications from '../pages/admin/ManageCertifications';

const ProtectedRoute = ({ children }) => {
    const token = localStorage.getItem('adminToken');
    return token ? children : <Navigate to="/admin" replace />;
};

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/admin" element={<AdminLogin />} />
            
            <Route path="/admin" element={<ProtectedRoute><AdminLayout /></ProtectedRoute>}>
                <Route path="dashboard" element={<AdminDashboard />} />
                <Route path="profile" element={<ManageProfile />} />
                <Route path="experiences" element={<ManageExperiences />} />
                <Route path="projects" element={<ManageProjects />} />
                <Route path="skills" element={<ManageSkills />} />
                <Route path="messages" element={<ManageMessages />} />
                <Route path="certifications" element={<ManageCertifications />} />
            </Route>
        </Routes>
    );
};

export default AppRoutes;