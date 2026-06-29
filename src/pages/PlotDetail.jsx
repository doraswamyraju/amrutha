import React, { useContext, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { MapPin, ArrowLeft, Send, Sparkles, Receipt, PhoneCall } from 'lucide-react';

export default function PlotDetail() {
  const { id } = useParams();
  const { plots, addLead } = useContext(AppContext);
  
  const plot = plots.find(p => p.id === id);

  // Gallery state
  const [activeMediaIndex, setActiveMediaIndex] = useState(0);

  // Lead capture state
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  // Calculator State
  const [pricePerSqYard, setPricePerSqYard] = useState(() => plot ? Math.round(plot.price / plot.size) : 15000);
  const [developmentCharges, setDevelopmentCharges] = useState(150000);
  const [registrationCharges, setRegistrationCharges] = useState(() => plot ? Math.round(plot.price * 0.06) : 200000);

  if (!plot) {
    return (
      <div className="container section-padding text-center">
        <h2>Plot Not Found</h2>
        <p style={{ marginBottom: '24px' }}>The plot you are looking for does not exist or has been removed.</p>
        <Link to="/plots" className="btn btn-primary">Back to Listings</Link>
      </div>
    );
  }

  const handleSubmitInquiry = (e) => {
    e.preventDefault();
    if (!name || !phone) return;

    addLead({
      name,
      email,
      phone,
      plotInterest: plot.id,
      message: message || `Interested in Plot No. ${plot.plotNumber} of ${plot.ventureName}.`
    });

    setSuccess(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  const totalPrice = plot.price + developmentCharges + registrationCharges;

  const formatPrice = (value) => {
    return value.toLocaleString('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 });
  };

  const defaultMedia = [
    {
      url: plot.ventureName.includes('Meadows') 
        ? 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=800'
        : plot.ventureName.includes('Royal')
        ? 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=800'
        : 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=800',
      type: 'image'
    }
  ];
  const galleryMedia = plot.media && plot.media.length > 0 ? plot.media : defaultMedia;
  const activeMedia = galleryMedia[activeMediaIndex] || galleryMedia[0];

  return (
    <div className="container section-padding animate-fade-in">
      <Link to="/plots" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--accent-gold)', marginBottom: '32px', fontWeight: '600' }}>
        <ArrowLeft size={16} />
        Back to Listings
      </Link>

      <div className="grid-2">
        {/* Left Column: Image and Details */}
        <div>
          <div style={{ position: 'relative', borderRadius: '16px', overflow: 'hidden', height: '380px', marginBottom: '16px', boxShadow: 'var(--shadow-md)', backgroundColor: '#000' }}>
            {activeMedia.type === 'video' ? (
              <video 
                src={activeMedia.url} 
                controls 
                style={{ width: '100%', height: '100%', objectFit: 'contain' }} 
              />
            ) : (
              <img 
                src={activeMedia.url} 
                alt="Plot Media" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            )}
            <div 
              className={`badge badge-${plot.status}`} 
              style={{ top: '24px', right: '24px', fontSize: '0.9rem', padding: '8px 18px', zIndex: 10 }}
            >
              {plot.status === 'available' ? 'Available' : plot.status === 'booking' ? 'Booking Open' : 'Sold Out'}
            </div>
          </div>

          {/* Thumbnails */}
          {galleryMedia.length > 1 && (
            <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', paddingBottom: '10px', marginBottom: '30px' }}>
              {galleryMedia.map((media, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveMediaIndex(idx)}
                  style={{
                    width: '70px',
                    height: '50px',
                    borderRadius: '6px',
                    overflow: 'hidden',
                    border: activeMediaIndex === idx ? '2.5px solid var(--accent-gold)' : '1px solid var(--border-color)',
                    padding: 0,
                    cursor: 'pointer',
                    flexShrink: 0,
                    backgroundColor: '#000'
                  }}
                >
                  {media.type === 'video' ? (
                    <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                      <video src={media.url} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.3)', color: '#fff', fontSize: '0.65rem' }}>
                        ▶
                      </div>
                    </div>
                  ) : (
                    <img src={media.url} alt="Thumbnail" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  )}
                </button>
              ))}
            </div>
          )}

          <h2 style={{ fontSize: '2rem', marginBottom: '8px' }}>Plot No. {plot.plotNumber} — {plot.ventureName}</h2>
          <div className="card-location" style={{ fontSize: '1.05rem', marginBottom: '24px' }}>
            <MapPin size={20} />
            <span>{plot.location}</span>
          </div>

          <p style={{ color: 'var(--text-muted)', marginBottom: '30px', fontSize: '1.05rem' }}>
            {plot.description}
          </p>

          <h3 style={{ fontSize: '1.4rem', marginBottom: '16px', borderBottom: '2px solid var(--accent-gold)', paddingBottom: '8px' }}>
            Venture Highlights & Specs
          </h3>
          <div className="grid-2" style={{ gap: '16px', marginBottom: '40px' }}>
            <div style={{ padding: '12px', background: 'var(--white)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>FACING</span>
              <p style={{ fontWeight: '700', color: 'var(--primary-navy)' }}>{plot.facing}</p>
            </div>
            <div style={{ padding: '12px', background: 'var(--white)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>ROAD WIDTH</span>
              <p style={{ fontWeight: '700', color: 'var(--primary-navy)' }}>{plot.roadWidth}</p>
            </div>
            <div style={{ padding: '12px', background: 'var(--white)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>PLOT AREA</span>
              <p style={{ fontWeight: '700', color: 'var(--primary-navy)' }}>{plot.size} Sq. Yards</p>
            </div>
            <div style={{ padding: '12px', background: 'var(--white)', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>APPROVALS</span>
              <p style={{ fontWeight: '700', color: 'var(--status-available)' }}>DTCP & RERA Cleared</p>
            </div>
          </div>

          <div style={{ padding: '24px', background: 'rgba(197, 168, 128, 0.1)', borderRadius: '12px', borderLeft: '4px solid var(--accent-gold)' }}>
            <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', color: 'var(--primary-navy)' }}>
              <Sparkles size={18} style={{ color: 'var(--accent-gold)' }} />
              Developer Commitments
            </h4>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              {plot.highlights.map((h, idx) => (
                <li key={idx} style={{ fontSize: '0.9rem', color: 'var(--text-dark)', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ color: 'var(--accent-gold)' }}>✓</span> {h}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Right Column: Calculator and Lead Form */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          {/* Cost Estimator */}
          <div className="inquiry-form" style={{ padding: '30px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.4rem', marginBottom: '20px', color: 'var(--primary-navy)' }}>
              <Receipt size={22} style={{ color: 'var(--accent-gold)' }} />
              Premium Pricing Estimator
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Base Plot Value ({plot.size} sq yards)</span>
                <span style={{ fontWeight: '600' }}>{formatPrice(plot.price)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Amenities & Dev Charges</span>
                <span style={{ fontWeight: '600' }}>{formatPrice(developmentCharges)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
                <span style={{ color: 'var(--text-muted)' }}>Est. Registration & Stamp duty (6%)</span>
                <span style={{ fontWeight: '600' }}>{formatPrice(registrationCharges)}</span>
              </div>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 0', borderTop: '2px double var(--accent-gold)', marginTop: '6px' }}>
                <span style={{ fontWeight: '800', fontSize: '1.1rem', color: 'var(--primary-navy)' }}>Estimated Net Outlay</span>
                <span style={{ fontWeight: '800', fontSize: '1.3rem', color: 'var(--primary-navy)' }}>{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>
              *Registration charges are subject to government guidelines at registration date. Price estimates are subject to terms of the sales agreement.
            </p>
          </div>

          {/* Inquiry Form */}
          <div className="inquiry-form" style={{ padding: '30px' }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.4rem', marginBottom: '20px', color: 'var(--primary-navy)' }}>
              <PhoneCall size={22} style={{ color: 'var(--accent-gold)' }} />
              Schedule Inquiry & Site Visit
            </h3>

            {success ? (
              <div style={{ backgroundColor: 'rgba(16, 185, 129, 0.1)', color: 'var(--status-available)', padding: '16px', borderRadius: '8px', textAlign: 'center', border: '1px solid var(--status-available)' }}>
                <h4 style={{ marginBottom: '4px' }}>Inquiry Submitted Successfully!</h4>
                <p style={{ fontSize: '0.9rem' }}>Our sales coordinator will call you back within 2 hours to share layout schedules and book site visits.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry}>
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
                    placeholder="Enter 10-digit mobile" 
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
                    placeholder="Enter your email" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Message / Notes</label>
                  <textarea 
                    className="form-input" 
                    rows="3" 
                    placeholder="Ask about down-payment plans or request site visits..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    style={{ resize: 'vertical' }}
                  ></textarea>
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={plot.status === 'sold'}
                  style={{ width: '100%', height: '48px', opacity: plot.status === 'sold' ? 0.6 : 1 }}
                >
                  <Send size={16} />
                  {plot.status === 'sold' ? 'Sold Out' : 'Submit Booking Inquiry'}
                </button>
              </form>
            )}
          </div>
        </div>

      </div>
    </div>
  );
}
