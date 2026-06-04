import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, MapPin, Phone } from 'lucide-react';
import Swal from 'sweetalert2';
import api from '../api/axiosClient';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await api.post('/contact', formData);
            if (response.data.status === 'success') {
                Swal.fire({
                    icon: 'success',
                    title: 'Message Sent!',
                    text: 'Thank you! I will get back to you soon.',
                    background: '#0a0d14',
                    color: '#ffffff',
                    confirmButtonColor: '#7B61FF',
                    customClass: {
                        popup: 'border border-light border-opacity-10 rounded-4 shadow-lg',
                        confirmButton: 'btn btn-primary px-5 py-2 rounded-pill fw-bold'
                    }
                });
                setFormData({ name: '', email: '', message: '' });
            } else {
                throw new Error(response.data.message);
            }
        } catch (error) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Something went wrong! Please try again.',
                background: '#0a0d14',
                color: '#ffffff',
                confirmButtonColor: '#ec4899',
                customClass: {
                    popup: 'border border-light border-opacity-10 rounded-4 shadow-lg',
                    confirmButton: 'btn btn-danger px-5 py-2 rounded-pill fw-bold'
                }
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="py-5 my-5 position-relative z-1">
            <div className="container">
                
                {/* Section Header */}
                <div className="text-center mb-5">
                    <motion.h2 
                        initial={{ opacity: 0, y: -20 }} 
                        whileInView={{ opacity: 1, y: 0 }} 
                        viewport={{ once: true }} 
                        className="display-4 fw-bolder text-white mb-3"
                    >
                        Let's <span className="text-gradient-primary">Connect</span>
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0 }} 
                        whileInView={{ opacity: 1 }} 
                        viewport={{ once: true }} 
                        transition={{ delay: 0.2 }}
                        className="sub-text-light lead mx-auto" 
                        style={{ maxWidth: '600px' }}
                    >
                        I'm currently available for freelance work or full-time opportunities. Let's build something amazing together.
                    </motion.p>
                </div>

                {/* Main Unique Panel Container */}
                <motion.div 
                    initial={{ opacity: 0, y: 30 }} 
                    whileInView={{ opacity: 1, y: 0 }} 
                    viewport={{ once: true }} 
                    transition={{ duration: 0.6 }}
                    className="unique-contact-panel shadow-lg"
                >
                    <div className="row g-0 h-100">
                        
                        {/* Left Side: Info Hub */}
                        <div className="col-lg-5 p-4 p-md-5 position-relative overflow-hidden info-hub-side d-flex flex-column justify-content-between">
                            {/* Animated Background Blob inside the left panel */}
                            <div className="info-blob"></div>
                            
                            <div className="position-relative z-1 mb-5">
                                <h3 className="text-white fw-bold mb-2">Get In Touch</h3>
                                <p className="sub-text-light mb-0">Fill out the form and I'll get back to you within 24 hours.</p>
                            </div>

                            <div className="d-flex flex-column gap-4 position-relative z-1">
                                <a href="mailto:beherabijay685@gmail.com" className="text-decoration-none group-contact">
                                    <div className="d-flex align-items-center gap-4">
                                        <div className="icon-wrapper bg-white bg-opacity-10 d-flex justify-content-center align-items-center">
                                            <Mail size={22} className="text-white transition-all" />
                                        </div>
                                        <div>
                                            <h6 className="text-white mb-1 fw-semibold fs-5">Email</h6>
                                            <span className="sub-text-light">beherabijay685@gmail.com</span>
                                        </div>
                                    </div>
                                </a>
                                
                                <a href="tel:+918895389456" className="text-decoration-none group-contact">
                                    <div className="d-flex align-items-center gap-4">
                                        <div className="icon-wrapper bg-white bg-opacity-10 d-flex justify-content-center align-items-center">
                                            <Phone size={22} className="text-white transition-all" />
                                        </div>
                                        <div>
                                            <h6 className="text-white mb-1 fw-semibold fs-5">Phone</h6>
                                            <span className="sub-text-light">+91 8895389456</span>
                                        </div>
                                    </div>
                                </a>

                                <div className="d-flex align-items-center gap-4 group-contact">
                                    <div className="icon-wrapper bg-white bg-opacity-10 d-flex justify-content-center align-items-center">
                                        <MapPin size={22} className="text-white transition-all" />
                                    </div>
                                    <div>
                                        <h6 className="text-white mb-1 fw-semibold fs-5">Location</h6>
                                        <span className="sub-text-light">Bhubaneswar, Odisha, India</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Form */}
                        <div className="col-lg-7 p-4 p-md-5 form-hub-side">
                            <form onSubmit={handleSubmit} className="d-flex flex-column gap-4 mt-2">
                                <div className="row g-4">
                                    <div className="col-md-6">
                                        <label className="text-white small fw-bold text-uppercase tracking-wide mb-2 ps-1">Your Name</label>
                                        <input 
                                            type="text" 
                                            className="form-control sleek-input" 
                                            placeholder="John Doe" 
                                            required 
                                            value={formData.name} 
                                            onChange={(e) => setFormData({...formData, name: e.target.value})} 
                                        />
                                    </div>
                                    <div className="col-md-6">
                                        <label className="text-white small fw-bold text-uppercase tracking-wide mb-2 ps-1">Your Email</label>
                                        <input 
                                            type="email" 
                                            className="form-control sleek-input" 
                                            placeholder="john@example.com" 
                                            required 
                                            value={formData.email} 
                                            onChange={(e) => setFormData({...formData, email: e.target.value})} 
                                        />
                                    </div>
                                </div>
                                <div className="mt-2">
                                    <label className="text-white small fw-bold text-uppercase tracking-wide mb-2 ps-1">Message</label>
                                    <textarea 
                                        rows="5" 
                                        className="form-control sleek-input" 
                                        placeholder="Tell me about your project..." 
                                        required 
                                        value={formData.message} 
                                        onChange={(e) => setFormData({...formData, message: e.target.value})}
                                    ></textarea>
                                </div>
                                
                                <div className="mt-4 text-end">
                                    <button type="submit" className="btn-aceternity px-5 py-3 fw-bold fs-5" disabled={isSubmitting}>
                                        {isSubmitting ? 'Sending...' : <>Send Message <Send size={20} className="ms-2 mb-1" /></>}
                                    </button>
                                </div>
                            </form>
                        </div>

                    </div>
                </motion.div>
            </div>

            <style>{`
                /* --- Explicit Text Visibility Fix --- */
                .sub-text-light {
                    color: #94a3b8 !important; /* Bright silver, highly visible on black */
                }
                
                /* --- Main Panel Design --- */
                .unique-contact-panel {
                    background: #0a0d14; /* Deep dark background */
                    border-radius: 1.5rem;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    overflow: hidden;
                    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
                }

                /* --- Left Side: Info Hub --- */
                .info-hub-side {
                    background: linear-gradient(145deg, rgba(123, 97, 255, 0.05) 0%, rgba(0, 0, 0, 0) 100%);
                    border-right: 1px solid rgba(255, 255, 255, 0.05);
                }
                
                .info-blob {
                    position: absolute;
                    top: -20%;
                    left: -20%;
                    width: 300px;
                    height: 300px;
                    background: var(--neon-purple);
                    opacity: 0.2;
                    filter: blur(80px);
                    border-radius: 50%;
                    z-index: 0;
                    animation: floatBlob 10s ease-in-out infinite alternate;
                }

                @keyframes floatBlob {
                    0% { transform: translate(0, 0) scale(1); }
                    100% { transform: translate(50px, 50px) scale(1.2); }
                }

                /* Icon Wrappers */
                .icon-wrapper {
                    width: 50px;
                    height: 50px;
                    border-radius: 12px;
                    border: 1px solid rgba(255, 255, 255, 0.05);
                    transition: all 0.4s ease;
                }
                
                .group-contact:hover .icon-wrapper {
                    background: var(--neon-purple) !important;
                    border-color: var(--neon-purple);
                    box-shadow: 0 0 20px rgba(123, 97, 255, 0.4);
                    transform: scale(1.1);
                }

                .group-contact:hover h6 {
                    color: var(--neon-cyan) !important;
                }

                /* --- Right Side: Form Hub --- */
                .form-hub-side {
                    background: #07090f;
                }

                /* Sleek Inputs (Aceternity Style) */
                .sleek-input {
                    background: rgba(255, 255, 255, 0.02) !important;
                    border: 1px solid rgba(255, 255, 255, 0.08) !important;
                    color: #ffffff !important;
                    border-radius: 0.75rem;
                    padding: 0.875rem 1.25rem;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    box-shadow: inset 0 2px 4px rgba(0,0,0,0.2);
                    resize: none;
                }
                
                .sleek-input::placeholder {
                    color: #64748b !important; /* Lighter placeholder */
                }

                .sleek-input:focus {
                    background: rgba(0, 0, 0, 0.5) !important;
                    border-color: var(--neon-cyan) !important;
                    box-shadow: 0 0 0 3px rgba(0, 219, 224, 0.15), inset 0 2px 4px rgba(0,0,0,0.2) !important;
                }

                /* --- Aceternity Send Button --- */
                .btn-aceternity {
                    background: #ffffff;
                    color: #000000;
                    border: none;
                    border-radius: 0.75rem;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.3s ease;
                    z-index: 1;
                }

                .btn-aceternity::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: linear-gradient(135deg, var(--neon-cyan), var(--neon-purple));
                    z-index: -1;
                    transition: opacity 0.3s ease;
                    opacity: 0;
                }

                .btn-aceternity:hover {
                    color: #ffffff;
                    transform: translateY(-3px);
                    box-shadow: 0 10px 25px rgba(123, 97, 255, 0.3);
                }

                .btn-aceternity:hover::before {
                    opacity: 1;
                }
                
                .btn-aceternity:disabled {
                    opacity: 0.6;
                    cursor: not-allowed;
                }

                @media (max-width: 991.98px) {
                    .info-hub-side {
                        border-right: none;
                        border-bottom: 1px solid rgba(255, 255, 255, 0.05);
                    }
                }
            `}</style>
        </section>
    );
};

export default Contact;