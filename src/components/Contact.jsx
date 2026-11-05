// src/components/Contact.jsx
import React, { useState } from 'react';
import { Send, Mail, MapPin, Phone, MessageSquare } from 'lucide-react';
import Swal from 'sweetalert2';
import api from '../api/axiosClient';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await api.post('/contact', formData);
      if (response.data?.success || response.data?.status === 'success') {
        Swal.fire({
          icon: 'success',
          title: 'Message Sent!',
          text: 'Thank you! I will get back to you soon.',
          confirmButtonColor: '#8b6cff',
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error(response.data?.message || 'Submission failed');
      }
    } catch {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong! Please try again or email me directly.',
        confirmButtonColor: '#f472b6',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bk-section">
      <div className="bk-container">
        <div className="bk-sec-head">
          <span className="bk-pill-eyebrow">
            <MessageSquare size={14} /> Get In Touch
          </span>
          <h2 className="bk-title">
            Let's <span className="bk-grad-text">Connect.</span>
          </h2>
          <p className="bk-lead">
            Available for full-time opportunities and freelance projects. Let's build something impactful together.
          </p>
        </div>

        <div className="bk-card bk-contact-wrap">
          <div className="bk-contact-side">
            <div>
              <h3 className="bk-contact-h3">Contact Information</h3>
              <p className="bk-contact-sub">
                Fill out the form and I will get back to you within 24 hours.
              </p>
            </div>

            <div className="bk-contact-items">
              <a href="mailto:beherabijay685@gmail.com" className="bk-contact-row">
                <span className="bk-contact-ico">
                  <Mail size={20} />
                </span>
                <div>
                  <span className="bk-contact-lbl">Email</span>
                  <strong className="bk-contact-val">beherabijay685@gmail.com</strong>
                </div>
              </a>

              <a href="tel:+918895389456" className="bk-contact-row">
                <span className="bk-contact-ico">
                  <Phone size={20} />
                </span>
                <div>
                  <span className="bk-contact-lbl">Phone</span>
                  <strong className="bk-contact-val">+91 8895389456</strong>
                </div>
              </a>

              <div className="bk-contact-row">
                <span className="bk-contact-ico">
                  <MapPin size={20} />
                </span>
                <div>
                  <span className="bk-contact-lbl">Location</span>
                  <strong className="bk-contact-val">Bhubaneswar, Odisha, India</strong>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="bk-contact-form">
            <div className="bk-form-grid">
              <div className="bk-input-group">
                <label htmlFor="c-name">Your Name</label>
                <input
                  id="c-name"
                  type="text"
                  placeholder="John Doe"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
              </div>
              <div className="bk-input-group">
                <label htmlFor="c-email">Your Email</label>
                <input
                  id="c-email"
                  type="email"
                  placeholder="john@example.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

            <div className="bk-input-group">
              <label htmlFor="c-msg">Message</label>
              <textarea
                id="c-msg"
                rows="5"
                placeholder="Tell me about your project or role..."
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              />
            </div>

            <button
              type="submit"
              className="bk-btn bk-btn--primary"
              style={{ alignSelf: 'flex-end' }}
              disabled={isSubmitting}
            >
              <span>{isSubmitting ? 'Sending...' : 'Send Message'}</span>
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>

      <style>{`
        .bk-contact-wrap {
          display: grid;
          grid-template-columns: 0.9fr 1.1fr;
          overflow: hidden;
        }
        .bk-contact-side {
          padding: 36px;
          background: radial-gradient(circle at 0% 0%, var(--glow), transparent 70%), var(--surface-2);
          border-right: 1px solid var(--line);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          gap: 32px;
        }
        .bk-contact-h3 {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 8px;
        }
        .bk-contact-sub {
          font-size: 0.94rem;
          color: var(--muted);
          margin: 0;
        }
        .bk-contact-items {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .bk-contact-row {
          display: flex;
          align-items: center;
          gap: 14px;
        }
        .bk-contact-ico {
          width: 44px;
          height: 44px;
          border-radius: 12px;
          display: grid;
          place-items: center;
          background: var(--surface);
          border: 1px solid var(--line-strong);
          color: var(--primary);
          flex-shrink: 0;
        }
        .bk-contact-lbl {
          display: block;
          font-size: 0.74rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.06em;
          color: var(--muted);
        }
        .bk-contact-val {
          font-size: 0.95rem;
          font-weight: 600;
          color: var(--text);
        }
        .bk-contact-form {
          padding: 36px;
          display: flex;
          flex-direction: column;
          gap: 20px;
        }
        .bk-form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }
        .bk-input-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .bk-input-group label {
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--muted);
        }
        .bk-input-group input,
        .bk-input-group textarea {
          width: 100%;
          padding: 13px 16px;
          border-radius: 12px;
          background: var(--bg);
          border: 1px solid var(--line-strong);
          color: var(--text);
          font: inherit;
          font-size: 0.95rem;
          outline: none;
          transition: border-color 0.2s;
        }
        .bk-input-group input:focus,
        .bk-input-group textarea:focus {
          border-color: var(--primary);
        }
        @media (max-width: 900px) {
          .bk-contact-wrap {
            grid-template-columns: 1fr;
          }
          .bk-contact-side {
            border-right: 0;
            border-bottom: 1px solid var(--line);
          }
        }
        @media (max-width: 560px) {
          .bk-form-grid {
            grid-template-columns: 1fr;
          }
          .bk-contact-side,
          .bk-contact-form {
            padding: 24px 20px;
          }
        }
      `}</style>
    </section>
  );
}