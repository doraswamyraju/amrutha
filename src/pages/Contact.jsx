import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { MapPin, Phone, Mail, Clock, Send, ShieldAlert } from 'lucide-react';

export default function Contact() {
  const { addLead } = useContext(AppContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    addLead({
      name,
      email,
      phone,
      plotInterest: '',
      message: message || 'General contact inquiry.'
    });

    setSuccess(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="container section-padding animate-fade-in">
      <div className="text-center" style={{ marginBottom: '60px' }}>
        <span className="section-subtitle">Get In Touch</span>
        <h1 className="section-title">Contact Our Offices</h1>
        <p className="section-desc">
          Have questions about pricing, payment schedules, or want to schedule a guided site visit? 
          Send us a message or visit our head office.
        </p>
      </div>

      <div className="grid-2" style={{ gap: '48px' }}>
        {/* Contact info column */}
        <div>
          <div style={{ background: 'var(--primary-navy)', color: 'white', padding: '40px', borderRadius: '20px', borderLeft: '6px solid var(--accent-gold)' }}>
            <h3 style={{ color: 'var(--accent-gold)', fontSize: '1.6rem', marginBottom: '24px' }}>Corporate HQ</h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px' }}>
                  <MapPin size={24} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div>
                  <h4 style={{ color: 'white', fontWeight: '600' }}>Office Address</h4>
                  <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '4px' }}>
                    Amrutha Developers,<br />
                    D MART stores Building Besides, 1st Floor,<br />
                    Air Bypass road, Tirupati
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px' }}>
                  <Phone size={24} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div>
                  <h4 style={{ color: 'white', fontWeight: '600' }}>Phone Lines</h4>
                  <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '4px' }}>
                    Business: +91 86864 65933<br />
                    Support: +91 73308 13128 / 70136 77164
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px' }}>
                  <Mail size={24} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div>
                  <h4 style={{ color: 'white', fontWeight: '600' }}>Inquiries Inbox</h4>
                  <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '4px' }}>
                    Corporate: info@amrutha.com<br />
                    Sales: deals@amrutha.com
                  </p>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', padding: '12px', borderRadius: '8px' }}>
                  <Clock size={24} style={{ color: 'var(--accent-gold)' }} />
                </div>
                <div>
                  <h4 style={{ color: 'white', fontWeight: '600' }}>Business Hours</h4>
                  <p style={{ color: '#94A3B8', fontSize: '0.95rem', marginTop: '4px' }}>
                    Mon - Sat: 9:00 AM to 7:00 PM<br />
                    Sunday: Closed (Site visits active)
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Lead capture form column */}
        <div>
          <div className="inquiry-form">
            <h3 style={{ fontSize: '1.6rem', marginBottom: '24px', color: 'var(--primary-navy)' }}>
              Send General Message
            </h3>

            {success ? (
              <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--status-available)', padding: '24px', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--status-available)' }}>
                <h4 style={{ marginBottom: '8px', fontSize: '1.2rem' }}>Message Submitted!</h4>
                <p style={{ fontSize: '0.95rem' }}>Thank you for reaching out. A client relationship officer will call you back shortly with further information.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label>Full Name *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    placeholder="Enter your name" 
                    required 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Phone Number *</label>
                  <input 
                    type="tel" 
                    className="form-input" 
                    placeholder="Enter 10-digit mobile number" 
                    required 
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Email Address</label>
                  <input 
                    type="email" 
                    className="form-input" 
                    placeholder="Enter email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Message / Notes *</label>
                  <textarea 
                    className="form-input" 
                    rows="4" 
                    placeholder="Write your comments or questions here..." 
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ resize: 'vertical' }}
                  ></textarea>
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', height: '48px' }}>
                  <Send size={16} />
                  Submit Inquiry
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
