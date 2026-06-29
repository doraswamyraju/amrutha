import React, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import { Mail, Globe, Phone, Calendar, Award, CheckCircle } from 'lucide-react';

export default function About() {
  const { founders } = useContext(AppContext);

  return (
    <div className="container section-padding animate-fade-in">
      <div className="text-center" style={{ marginBottom: '60px' }}>
        <span className="section-subtitle">Heritage & Leadership</span>
        <h1 className="section-title">About Amrutha Developers</h1>
        <p className="section-desc">
          For over two decades, we have been delivering premium layout structures, bringing 
          clarity, legally secure deeds, and high growth opportunities to thousands of investors.
        </p>
      </div>

      {/* Story Section */}
      <div className="grid-2" style={{ alignItems: 'center', marginBottom: '80px', gap: '48px' }}>
        <div>
          <h2 style={{ fontSize: '2rem', marginBottom: '20px', color: 'var(--primary-navy)' }}>
            The Blueprint of Our Success
          </h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '16px', fontSize: '1.05rem' }}>
            Amrutha Developers was founded on the fundamental principle that buying land should 
            be transparent, legal, and highly appreciative. We specialize in identification, 
            layout development, and title verification of open plots.
          </p>
          <p style={{ color: 'var(--text-muted)', marginBottom: '24px', fontSize: '1.05rem' }}>
            We work extensively with the Directorate of Town and Country Planning (DTCP) 
            and RERA to design layouts that integrate wide networks of blacktop roads, eco-friendly 
            drains, and community green spaces.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <Award size={24} style={{ color: 'var(--accent-gold)' }} />
              <div>
                <h4 style={{ fontWeight: '700' }}>22+ Years</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Proven Track Record</p>
              </div>
            </div>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
              <Calendar size={24} style={{ color: 'var(--accent-gold)' }} />
              <div>
                <h4 style={{ fontWeight: '700' }}>15+ Ventures</h4>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Delivered Successfully</p>
              </div>
            </div>
          </div>
        </div>

        <div style={{ position: 'relative', height: '380px', borderRadius: '16px', overflow: 'hidden', boxShadow: 'var(--shadow-md)' }}>
          <img 
            src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=800" 
            alt="Real estate land mapping" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Core Values */}
      <section style={{ backgroundColor: 'white', padding: '60px 40px', borderRadius: '20px', marginBottom: '80px', border: '1px solid var(--border-color)' }}>
        <h3 className="text-center" style={{ fontSize: '1.8rem', marginBottom: '40px', color: 'var(--primary-navy)' }}>
          Our Founding Anchors
        </h3>
        <div className="grid-3" style={{ gap: '30px' }}>
          <div style={{ display: 'flex', gap: '16px' }}>
            <CheckCircle size={24} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
            <div>
              <h4 style={{ fontWeight: '700', marginBottom: '8px' }}>Legally Sound Titles</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>We conduct 30-year search studies on every plot venture before acquiring titles, securing zero disputes.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <CheckCircle size={24} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
            <div>
              <h4 style={{ fontWeight: '700', marginBottom: '8px' }}>Approved Layout Plan</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Strict execution of DTCP blueprints ensuring spacious avenues, proper green allocations and utilities.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '16px' }}>
            <CheckCircle size={24} style={{ color: 'var(--accent-gold)', flexShrink: 0 }} />
            <div>
              <h4 style={{ fontWeight: '700', marginBottom: '8px' }}>Customer First Care</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>Our support continues way past layout registration, offering support with custom builder referrals.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Section - 2 Members */}
      <section>
        <div className="text-center" style={{ marginBottom: '50px' }}>
          <span className="section-subtitle">The Founders</span>
          <h2 className="section-title">Our Leadership Profile</h2>
          <p className="section-desc">
            Governed by clarity, execution strength, and commitment, our founders pave the path 
            of sustainable expansions.
          </p>
        </div>

        <div className="grid-2" style={{ maxWidth: '1000px', margin: '0 auto', gap: '40px' }}>
          {founders.map((founder) => (
            <div className="card" key={founder.id} style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}>
              <div style={{ height: '300px', width: '100%', overflow: 'hidden', background: '#E2E8F0' }}>
                <img 
                  src={founder.image} 
                  alt={founder.name} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              <div className="card-content" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--accent-gold)', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px' }}>
                  {founder.role}
                </span>
                <h3 style={{ fontSize: '1.6rem', margin: '6px 0 16px', color: 'var(--primary-navy)' }}>
                  {founder.name}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '24px', flexGrow: 1, lineHeight: '1.6' }}>
                  {founder.bio}
                </p>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '16px', borderTop: '1px solid var(--border-color)', fontSize: '0.88rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)' }}>
                    <Mail size={16} style={{ color: 'var(--accent-gold)' }} />
                    <span>{founder.email}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)' }}>
                    <Phone size={16} style={{ color: 'var(--accent-gold)' }} />
                    <span>{founder.phone}</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-dark)' }}>
                    <Globe size={16} style={{ color: 'var(--accent-gold)' }} />
                    <span style={{ color: 'var(--primary-navy)' }}>{founder.linkedin}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
