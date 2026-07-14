import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { User, Lock, LogIn, Loader2, Terminal, Eye, EyeOff } from 'lucide-react';
import { toast } from 'sonner';
import api from '../../api/axiosClient';

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [shakeKey, setShakeKey] = useState(0);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const res = await api.post('/admin/login', { username, password });
            if (res.data.success) {
                localStorage.setItem('adminToken', res.data.token);
                navigate('/admin/dashboard');
            }
        } catch (err) {
            toast.error(err.response?.data?.message || 'Invalid credentials. Please try again.');
            setShakeKey((k) => k + 1);
        } finally {
            setIsLoading(false);
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 32, scale: 0.97 },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: { type: 'spring', stiffness: 110, damping: 18 }
        }
    };

    const shakeAnim = shakeKey > 0 ? { x: [0, -8, 8, -6, 6, 0], transition: { duration: 0.4 } } : {};

    return (
        <div className="login-wrapper">
            <div className="ambient-blob blob-1" />
            <div className="ambient-blob blob-2" />
            <div className="grid-overlay" />

            <motion.div
                className="login-card"
                variants={cardVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div key={shakeKey} animate={shakeAnim}>
                    <div className="login-header">
                        <div className="brand-mark"><Terminal size={22} strokeWidth={2.2} /></div>
                        <h2>portfolio<span className="accent">.admin</span></h2>
                        <p className="login-sub">restricted access &middot; sign in to continue</p>
                    </div>

                    <form onSubmit={handleLogin} className="login-form">
                        <div className="field-group">
                            <label className="field-label"><User size={12} /> Username</label>
                            <div className="input-group">
                                <User size={17} className="input-icon" />
                                <input
                                    type="text"
                                    placeholder="admin"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    required
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        <div className="field-group">
                            <label className="field-label"><Lock size={12} /> Password</label>
                            <div className="input-group">
                                <Lock size={17} className="input-icon" />
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    className="toggle-visibility"
                                    onClick={() => setShowPassword((s) => !s)}
                                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                        </div>

                        <button type="submit" className="login-btn" disabled={isLoading}>
                            {isLoading ? (
                                <><Loader2 size={18} className="spinner" /> Authenticating…</>
                            ) : (
                                <>Sign in <LogIn size={17} /></>
                            )}
                        </button>
                    </form>

                    <div className="login-footer">
                        <span className="status-dot" />
                        <span>Session secured &middot; token-based auth</span>
                    </div>
                </motion.div>
            </motion.div>

            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap');

                .login-wrapper {
                    --accent: #ffb454;
                    --accent-2: #5eead4;
                    --font-display: 'Space Grotesk', 'Inter', sans-serif;
                    --font-mono: 'JetBrains Mono', 'SFMono-Regular', Consolas, monospace;

                    position: relative;
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #05050a;
                    font-family: 'Inter', sans-serif;
                    overflow: hidden;
                    padding: 20px;
                }

                @media (prefers-reduced-motion: reduce) {
                    .login-wrapper *, .login-wrapper *::before, .login-wrapper *::after {
                        animation-duration: 0.01ms !important;
                        transition-duration: 0.01ms !important;
                    }
                }

                .grid-overlay {
                    position: absolute; inset: 0; z-index: 0;
                    background-image:
                        linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px);
                    background-size: 42px 42px;
                    mask-image: radial-gradient(ellipse 70% 60% at 50% 40%, black 30%, transparent 80%);
                }

                .ambient-blob { position: absolute; border-radius: 50%; filter: blur(110px); z-index: 0; opacity: 0.35; }
                .blob-1 { width: 320px; height: 320px; background: rgba(255, 180, 84, 0.28); top: -8%; left: -8%; }
                .blob-2 { width: 380px; height: 380px; background: rgba(94, 234, 212, 0.18); bottom: -15%; right: -10%; }

                .login-card {
                    position: relative; z-index: 10; width: 100%; max-width: 400px;
                    background: rgba(18, 20, 26, 0.72);
                    border: 1px solid rgba(255, 255, 255, 0.08);
                    border-radius: 18px;
                    padding: clamp(28px, 5vw, 38px) clamp(22px, 5vw, 30px);
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    box-shadow: 0 25px 60px -12px rgba(0, 0, 0, 0.6);
                }

                .login-header { text-align: center; margin-bottom: 28px; }
                .brand-mark {
                    width: 48px; height: 48px; margin: 0 auto 16px;
                    background: rgba(255, 180, 84, 0.12); color: var(--accent);
                    border-radius: 13px; display: flex; align-items: center; justify-content: center;
                    border: 1px solid rgba(255, 180, 84, 0.25);
                }
                .login-header h2 {
                    margin: 0 0 6px; color: #fff; font-size: 1.4rem; font-weight: 700;
                    letter-spacing: -0.01em; font-family: var(--font-display);
                }
                .login-header h2 .accent { color: var(--accent); }
                .login-sub {
                    margin: 0; color: #7c7f8a; font-size: 0.82rem; font-family: var(--font-mono);
                }

                .login-form { display: flex; flex-direction: column; gap: 16px; }
                .field-group { display: flex; flex-direction: column; gap: 7px; }
                .field-label {
                    display: flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 0.68rem;
                    color: #8b8d98; text-transform: uppercase; letter-spacing: 0.06em; padding-left: 2px;
                }

                .input-group { position: relative; display: flex; align-items: center; }
                .input-icon { position: absolute; left: 14px; color: #5b5d68; pointer-events: none; transition: color 0.2s ease; }

                .input-group input {
                    width: 100%; background: rgba(0, 0, 0, 0.28);
                    border: 1px solid rgba(255, 255, 255, 0.09);
                    border-radius: 10px;
                    padding: 12px 40px 12px 40px;
                    color: #fff; font-size: 0.94rem; font-family: inherit;
                    transition: all 0.2s ease;
                }
                .input-group input::placeholder { color: #4d4f59; }
                .input-group input:focus {
                    outline: none; border-color: var(--accent); background: rgba(0, 0, 0, 0.45);
                    box-shadow: 0 0 0 3px rgba(255, 180, 84, 0.14);
                }
                .input-group input:focus ~ .input-icon { color: var(--accent); }

                .toggle-visibility {
                    position: absolute; right: 10px; background: none; border: none; color: #6b6d78;
                    cursor: pointer; display: flex; align-items: center; padding: 4px; transition: color 0.18s ease;
                }
                .toggle-visibility:hover { color: var(--accent); }

                .login-btn {
                    display: flex; align-items: center; justify-content: center; gap: 9px; width: 100%;
                    background: var(--accent); color: #1a1200; border: none; border-radius: 10px;
                    padding: 13px; font-size: 0.94rem; font-weight: 700; cursor: pointer; margin-top: 6px;
                    transition: all 0.2s ease; font-family: var(--font-display);
                }
                .login-btn:hover:not(:disabled) { transform: translateY(-1px); filter: brightness(1.06); box-shadow: 0 8px 20px rgba(255, 180, 84, 0.25); }
                .login-btn:disabled { opacity: 0.7; cursor: not-allowed; transform: none; }

                .spinner { animation: spin 1s linear infinite; }
                @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }

                .login-footer {
                    display: flex; align-items: center; justify-content: center; gap: 7px; margin-top: 22px;
                    font-family: var(--font-mono); font-size: 0.68rem; color: #5b5d68;
                }
                .status-dot {
                    width: 6px; height: 6px; border-radius: 50%; background: var(--accent-2);
                    box-shadow: 0 0 0 0 rgba(94, 234, 212, 0.5); animation: pulseDot 2s infinite;
                }
                @keyframes pulseDot {
                    0% { box-shadow: 0 0 0 0 rgba(94, 234, 212, 0.45); }
                    70% { box-shadow: 0 0 0 5px rgba(94, 234, 212, 0); }
                    100% { box-shadow: 0 0 0 0 rgba(94, 234, 212, 0); }
                }

                @media (max-width: 420px) {
                    .login-card { border-radius: 16px; }
                    .login-header h2 { font-size: 1.25rem; }
                    .brand-mark { width: 42px; height: 42px; }
                }
            `}</style>
        </div>
    );
};

export default AdminLogin;