import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { Search, MapPin, ShieldCheck, TrendingUp, Handshake, Users, ArrowRight } from 'lucide-react';

export default function Home() {
  const { plots } = useContext(AppContext);
  const navigate = useNavigate();
  
  const [searchLocation, setSearchLocation] = useState('');
  const [minPrice, setMinPrice] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchLocation) queryParams.set('location', searchLocation);
    if (minPrice) queryParams.set('price', minPrice);
    navigate(`/plots?${queryParams.toString()}`);
  };

  const featuredPlots = plots.filter(plot => plot.status === 'available').slice(0, 3);

  const formatPrice = (value) => {
    if (value >= 10000000) return `${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `${(value / 100000).toFixed(1)} Lakhs`;
    return value.toLocaleString('en-IN');
  };

  return (
    <div className="home-container">
      {/* Hero Section */}
      <section className="navy-gradient-bg animate-fade-in" style={{ padding: '100px 0 120px', color: 'white', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient Gold Circle Overlay */}
        <div style={{
          position: 'absolute',
          top: '-20%',
          right: '-10%',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(197, 168, 128, 0.15) 0%, transparent 70%)',
          pointerEvents: 'none'
        }}></div>

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
            <span className="section-subtitle" style={{ color: 'var(--accent-gold)' }}>Own Your Tomorrow</span>
            <h1 style={{ 
              fontFamily: 'var(--font-heading)', 
              fontSize: '3.5rem', 
              fontWeight: '800', 
              lineHeight: '1.2', 
              marginBottom: '24px',
              background: 'linear-gradient(to right, #ffffff, #F3E7C9, var(--accent-gold))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              Discover Premium Open Plots Crafted for Luxury & Security
            </h1>
            <p style={{ fontSize: '1.2rem', color: '#94A3B8', marginBottom: '40px' }}>
              Legal titles cleared, DTCP approved layouts, and high appreciation locations 
              around Hyderabad\'s fastest-growing corridors.
            </p>

            {/* Floating Quick Search Bar */}
            <form onSubmit={handleSearch} className="filter-bar" style={{ textAlign: 'left', background: 'rgba(255,255,255,0.08)', backdropFilter: 'blur(12px)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}>
              <div className="filter-group">
                <label style={{ color: '#E2E8F0' }}>Venture Location</label>
                <input 
                  type="text" 
                  placeholder="e.g. Shankarpally, Sadashivpet" 
                  className="filter-input"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                />
              </div>
              <div className="filter-group">
                <label style={{ color: '#E2E8F0' }}>Minimum Budget (₹)</label>
                <select 
                  className="filter-input"
                  style={{ background: 'rgba(255,255,255,0.05)', color: 'white', border: '1px solid rgba(255,255,255,0.1)' }}
                  value={minPrice}
                  onChange={(e) => setMinPrice(e.target.value)}
                >
                  <option value="" style={{ color: 'black' }}>Any Price</option>
                  <option value="3000000" style={{ color: 'black' }}>₹30 Lakhs+</option>
                  <option value="5000000" style={{ color: 'black' }}>₹50 Lakhs+</option>
                  <option value="7000000" style={{ color: 'black' }}>₹70 Lakhs+</option>
                </select>
              </div>
              <div className="filter-group" style={{ gridColumn: 'span 2' }}>
                <label style={{ color: '#E2E8F0' }}>Approvals</label>
                <div style={{ display: 'flex', gap: '10px', height: '45px', alignItems: 'center', color: '#CBD5E1', fontSize: '0.9rem' }}>
                  <span>✓ DTCP Approved</span>
                  <span>✓ RERA Registered</span>
                </div>
              </div>
              <button type="submit" className="btn btn-primary" style={{ height: '48px', padding: '0 30px' }}>
                <Search size={18} />
                Find Plots
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Trust Pillars / Benefits */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container text-center">
          <span className="section-subtitle">Why Choose Us</span>
          <h2 className="section-title">Building Spaces, Trust & Futures</h2>
          <p className="section-desc">
            Amrutha Developers stands for legal clarity, robust infrastructural amenities, 
            and premium customer satisfaction.
          </p>

          <div className="grid-3">
            <div className="card animate-fade-in delay-1" style={{ padding: '40px 24px', textAlign: 'center', background: 'var(--bg-light)' }}>
              <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', backgroundColor: 'rgba(197,168,128,0.15)', color: 'var(--accent-gold)', marginBottom: '20px' }}>
                <ShieldCheck size={36} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>100% Clear Titles</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Every single square yard we sell comes with pre-verified legal titles, complete link documents, and hassle-free registration guidance.
              </p>
            </div>

            <div className="card animate-fade-in delay-2" style={{ padding: '40px 24px', textAlign: 'center', background: 'var(--bg-light)' }}>
              <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', backgroundColor: 'rgba(197,168,128,0.15)', color: 'var(--accent-gold)', marginBottom: '20px' }}>
                <TrendingUp size={36} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>High Growth Corridors</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Our ventures are strategically mapped along upcoming National Highways, IT zones, and industrial clusters guaranteeing high appreciation.
              </p>
            </div>

            <div className="card animate-fade-in delay-3" style={{ padding: '40px 24px', textAlign: 'center', background: 'var(--bg-light)' }}>
              <div style={{ display: 'inline-flex', padding: '16px', borderRadius: '50%', backgroundColor: 'rgba(197,168,128,0.15)', color: 'var(--accent-gold)', marginBottom: '20px' }}>
                <Handshake size={36} />
              </div>
              <h3 style={{ fontSize: '1.4rem', marginBottom: '12px' }}>Infrastructure First</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                Equipped with underground drainage, standard black-top roads, avenue plantations, overhead water tanks, and 24/7 solar-lit security gates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-light)' }}>
        <div className="container text-center">
          <span className="section-subtitle">Premium Selections</span>
          <h2 className="section-title">Featured Hot Open Plots</h2>
          <p className="section-desc">
            Explore a handpicked selection of our top available premium residential open plots.
          </p>

          <div className="grid-3" style={{ marginBottom: '40px' }}>
            {featuredPlots.map((plot) => (
              <div className="card animate-fade-in" key={plot.id}>
                <div className="card-img-wrapper">
                  <div className="badge badge-available">Available</div>
                  {/* Premium mock plot layouts using Unsplash landscape land */}
                  <img 
                    src={
                      plot.ventureName.includes('Meadows') 
                        ? 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600'
                        : plot.ventureName.includes('Royal')
                        ? 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=600'
                        : 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600'
                    } 
                    alt="Plot Land View" 
                    className="card-img" 
                  />
                </div>
                <div className="card-content">
                  <h3 className="card-title">Plot No. {plot.plotNumber} - {plot.ventureName}</h3>
                  <div className="card-location">
                    <MapPin size={16} />
                    <span>{plot.location}</span>
                  </div>
                  <div className="card-specs">
                    <div className="spec-item">
                      <span className="spec-label">Plot Size</span>
                      <span className="spec-val">{plot.size} Sq. Yards</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Facing</span>
                      <span className="spec-val">{plot.facing}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="card-price">
                      ₹{formatPrice(plot.price)}
                    </div>
                    <Link to={`/plots/${plot.id}`} className="btn btn-outline" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                      Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link to="/plots" className="btn btn-secondary">
            View All Open Plots
            <ArrowRight size={16} />
          </Link>
        </div>
      </section>

      {/* Interactive Map teaser / Layout Plan section */}
      <section className="section-padding" style={{ backgroundColor: 'white' }}>
        <div className="container">
          <div className="grid-2" style={{ alignItems: 'center' }}>
            <div>
              <span className="section-subtitle" style={{ textAlign: 'left', display: 'block' }}>Interactive Layouts</span>
              <h2 className="section-title section-title-left">Visual Planning for Smart Investors</h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '24px' }}>
                All our venture layouts are built around eco-friendly concepts. 
                We allocate generous green parks, water harvesting zones, and extra wide internal streets (up to 60 feet).
              </p>
              <ul style={{ listStyle: 'none', padding: 0, marginBottom: '32px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: '500' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-gold)' }}></span>
                  Standard DTCP layout grid norms
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: '500' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-gold)' }}></span>
                  Compound walls enclosing the entire venture community
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontWeight: '500' }}>
                  <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: 'var(--accent-gold)' }}></span>
                  Fully marked and numbered plot boundaries with stone pillars
                </li>
              </ul>
              <Link to="/plots" className="btn btn-primary">Choose Your Plot Number</Link>
            </div>
            <div style={{ position: 'relative', height: '400px', backgroundColor: 'var(--primary-navy)', borderRadius: '20px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyItems: 'center', color: 'white', border: '2px solid var(--accent-gold)' }}>
              {/* Representing a mock blueprint drawing */}
              <div style={{ 
                width: '100%', 
                height: '100%', 
                padding: '40px',
                backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.05) 1px, transparent 1px)',
                backgroundSize: '20px 20px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                position: 'relative'
              }}>
                <div>
                  <h4 style={{ color: 'var(--accent-gold)', fontSize: '1.25rem', marginBottom: '4px' }}>Venture Layout Masterplan</h4>
                  <span style={{ fontSize: '0.8rem', color: '#94A3B8' }}>Scale: 1 : 500 | Approved Grid</span>
                </div>
                
                {/* Visual grid blueprint look */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '10px', margin: '20px 0' }}>
                  {Array.from({ length: 15 }).map((_, i) => (
                    <div 
                      key={i} 
                      style={{ 
                        border: '1px dashed rgba(197, 168, 128, 0.4)', 
                        height: '45px', 
                        borderRadius: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '0.7rem',
                        color: i % 4 === 0 ? 'var(--status-sold)' : 'var(--status-available)',
                        background: i % 4 === 0 ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)'
                      }}
                    >
                      {i + 1}
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: '#94A3B8' }}>
                  <span>● Green Park Area</span>
                  <span>● 60 Feet Main Entrance</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews & Client Testimonials Section */}
      <section className="section-padding" style={{ backgroundColor: 'var(--bg-light)', borderTop: '1px solid var(--border-color)' }}>
        <div className="container text-center">
          <span className="section-subtitle">Verified Success</span>
          <h2 className="section-title">What Our Plot Owners Say</h2>
          <p className="section-desc">
            We measure our success by the satisfaction and asset appreciation of over 5000+ happy families.
          </p>

          <div className="grid-3">
            <div className="card" style={{ padding: '32px 24px', textAlign: 'left', background: 'var(--white)', position: 'relative' }}>
              <div style={{ color: 'var(--bright-gold)', fontSize: '1.25rem', marginBottom: '16px' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-dark)', marginBottom: '24px', fontSize: '0.95rem', lineHeight: '1.7' }}>
                "Excellent investment. Anil Kumar cleared the legal title verification process in just 3 days. The link documents and registration guidance are absolutely transparent!"
              </p>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: '700', color: 'var(--primary-navy)' }}>K. Prasad Rao</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Venture Plot Owner, Tirupati</span>
              </div>
            </div>

            <div className="card" style={{ padding: '32px 24px', textAlign: 'left', background: 'var(--white)', position: 'relative' }}>
              <div style={{ color: 'var(--bright-gold)', fontSize: '1.25rem', marginBottom: '16px' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-dark)', marginBottom: '24px', fontSize: '0.95rem', lineHeight: '1.7' }}>
                "Siva Subramanyam coordinated my site visit. Their layout infra is incredible—60ft main entry roads, electricity poles, and proper stone boundaries are already laid down."
              </p>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: '700', color: 'var(--primary-navy)' }}>Anitha Reddy</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Venture Plot Owner, Chittoor</span>
              </div>
            </div>

            <div className="card" style={{ padding: '32px 24px', textAlign: 'left', background: 'var(--white)', position: 'relative' }}>
              <div style={{ color: 'var(--bright-gold)', fontSize: '1.25rem', marginBottom: '16px' }}>★★★★★</div>
              <p style={{ fontStyle: 'italic', color: 'var(--text-dark)', marginBottom: '24px', fontSize: '0.95rem', lineHeight: '1.7' }}>
                "Purchased two plots in Golden Meadows. The road layout, street lights, and overhead water tanks were completed exactly as they promised. Highly recommended!"
              </p>
              <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '16px', display: 'flex', flexDirection: 'column' }}>
                <span style={{ fontWeight: '700', color: 'var(--primary-navy)' }}>Dr. Venkat Ramana</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Venture Investor, Nellore</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
