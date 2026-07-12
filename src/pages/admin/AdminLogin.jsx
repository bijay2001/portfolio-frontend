import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, LogIn, Loader2, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../api/axiosClient';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);
        
        try {
            const res = await api.post('/admin/login', { username, password });
            if (res.data.success) {
                localStorage.setItem('adminToken', res.data.token);
                navigate('/admin/dashboard');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid credentials. Please try again.');
        } finally {
                    setIsLoading(false);
                }
            };

    // Animation Variants
    const cardVariants = {
        hidden: { opacity: 0, y: 40, scale: 0.95 },
        visible: { 
            opacity: 1, 
            y: 0, 
            scale: 1,
            transition: { type: "spring", stiffness: 100, damping: 20 }
        }
    };

    const shakeVariants = {
        shake: { x: [-10, 10, -10, 10, 0], transition: { duration: 0.4 } }
    };

    return (
        <div className="login-wrapper">
            
            {/* Ambient Background Elements */}
            <div className="ambient-blob blob-1"></div>
            <div className="ambient-blob blob-2"></div>

            <motion.div 
                className="login-card"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
            >
                <div className="login-header">
                    <div className="shield-icon">
                        <ShieldCheck size={28} color="#06B6D4" />
                    </div>
                    <h2>Admin Portal</h2>
                    <p>Secure access for portfolio management</p>
                </div>

                <form onSubmit={handleLogin} className="login-form">

                    <div className="input-group">
                        <User size={18} className="input-icon" />
                        <input 
                            type="text" 
                            placeholder="Username" 
                            value={username} 
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            autoComplete="off"
                        />
                    </div>

                    <div className="input-group">
                        <Lock size={18} className="input-icon" />
                        <input 
                            type="password" 
                            placeholder="Password" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn" disabled={isLoading}>
                        {isLoading ? (
                            <Loader2 size={20} className="spinner" />
                        ) : (
                            <>
                                <span>Sign In</span>
                                <LogIn size={18} />
                            </>
                        )}
                    </button>
                </form>
            </motion.div>

            {/* --- SCOPED CSS --- */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');

                .login-wrapper {
                    position: relative;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #05050A;
                    font-family: 'Inter', sans-serif;
                    overflow: hidden;
                    padding: 20px;
                }

                /* Background Ambient Glows */
                .ambient-blob {
                    position: absolute;
                    border-radius: 50%;
                    filter: blur(100px);
                    z-index: 0;
                    opacity: 0.4;
                }
                .blob-1 {
                    width: 300px;
                    height: 300px;
                    background: rgba(6, 182, 212, 0.3); /* Cyan */
                    top: -10%;
                    left: -10%;
                }
                .blob-2 {
                    width: 400px;
                    height: 400px;
                    background: rgba(147, 51, 234, 0.2); /* Purple */
                    bottom: -20%;
                    right: -10%;
                }

                /* Glassmorphism Card */
                .login-card {
                    position: relative;
                    z-index: 10;
                    width: 100%;
                    max-width: 420px;
                    background: rgba(20, 20, 25, 0.7);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 20px;
                    padding: 40px 32px;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }

                .login-header {
                    text-align: center;
                    margin-bottom: 32px;
                }

                .shield-icon {
                    width: 56px;
                    height: 56px;
                    background: rgba(6, 182, 212, 0.1);
                    border-radius: 16px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 16px auto;
                    border: 1px solid rgba(6, 182, 212, 0.2);
                }

                .login-header h2 {
                    margin: 0 0 8px 0;
                    color: #FFFFFF;
                    font-size: 1.75rem;
                    font-weight: 700;
                    letter-spacing: -0.02em;
                }

                .login-header p {
                    margin: 0;
                    color: #9CA3AF;
                    font-size: 0.95rem;
                }

                .login-form {
                    display: flex;
                    flex-direction: column;
                    gap: 16px;
                }

                .error-message {
                    background: rgba(239, 68, 68, 0.1);
                    color: #FCA5A5;
                    border: 1px solid rgba(239, 68, 68, 0.2);
                    padding: 12px;
                    border-radius: 8px;
                    font-size: 0.85rem;
                    text-align: center;
                    font-weight: 500;
                }

                .input-group {
                    position: relative;
                    display: flex;
                    align-items: center;
                }

                .input-icon {
                    position: absolute;
                    left: 16px;
                    color: #6B7280;
                    transition: color 0.3s ease;
                }

                .input-group input {
                    width: 100%;
                    background: rgba(0, 0, 0, 0.3);
                    border: 1px solid rgba(255, 255, 255, 0.1);
                    border-radius: 10px;
                    padding: 14px 16px 14px 44px;
                    color: #FFFFFF;
                    font-size: 1rem;
                    font-family: inherit;
                    transition: all 0.3s ease;
                }

                .input-group input::placeholder {
                    color: #6B7280;
                }

                .input-group input:focus {
                    outline: none;
                    border-color: #06B6D4;
                    background: rgba(0, 0, 0, 0.5);
                    box-shadow: 0 0 0 3px rgba(6, 182, 212, 0.15);
                }

                .input-group input:focus + .input-icon,
                .input-group input:not(:placeholder-shown) ~ .input-icon {
                    color: #06B6D4;
                }

                .login-btn {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                    width: 100%;
                    background: linear-gradient(135deg, #06B6D4 0%, #3B82F6 100%);
                    color: #FFFFFF;
                    border: none;
                    border-radius: 10px;
                    padding: 14px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    margin-top: 8px;
                    transition: all 0.3s ease;
                    box-shadow: 0 4px 15px rgba(6, 182, 212, 0.3);
                }

                .login-btn:hover:not(:disabled) {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(6, 182, 212, 0.4);
                }

                .login-btn:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                .spinner {
                    animation: spin 1s linear infinite;
                }

                @keyframes spin {
                    from { transform: rotate(0deg); }
                    to { transform: rotate(360deg); }
                }

                /* Mobile Adjustments */
                @media (max-width: 480px) {
                    .login-card {
                        padding: 32px 24px;
                    }
                    .login-header h2 {
                        font-size: 1.5rem;
                    }
                    .shield-icon {
                        width: 48px;
                        height: 48px;
                    }
                }
            `}</style>
        </div>
    );
};

export default AdminLogin;