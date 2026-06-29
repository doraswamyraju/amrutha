import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MapPin, Phone, Mail, Clock, Globe, Share2, Link as LinkIcon } from 'lucide-react';

export default function Footer() {
  const location = useLocation();
  const isDashboard = location.pathname.startsWith('/admin');

  if (isDashboard) return null; // Don't show public footer in dashboard

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="logo-container" style={{ marginBottom: '16px' }}>
              <img src="/Logo 1.jpg.jpeg" alt="Aamruthaa Developers Logo" style={{ height: '48px', objectFit: 'contain', borderRadius: '4px' }} />
              <div className="logo-text">
                <span className="logo-title" style={{ color: '#ffffff' }}>AMRUTHAA</span>
                <span className="logo-subtitle" style={{ color: 'var(--accent-gold)' }}>D E V E L O P E R S</span>
              </div>
            </Link>
            <p>
              Leading developer of premium open plots and residential layouts. 
              We are committed to delivering legally secure, high-potential investment zones 
              backed by top-tier infrastructure.
            </p>
          </div>

          <div>
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/plots">Ventures & Plots</Link></li>
              <li><Link to="/about">About Founders</Link></li>
              <li><Link to="/contact">Contact Us</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Our Locations</h4>
            <ul className="footer-links">
              <li><Link to="/plots">Sadashivpet Venture</Link></li>
              <li><Link to="/plots">Shankarpally Venture</Link></li>
              <li><Link to="/plots">Patancheru Venture</Link></li>
              <li><Link to="/plots">Upcoming Projects</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="footer-heading">Contact Details</h4>
            <div className="footer-contact-item">
              <MapPin size={20} />
              <span>
                Amrutha Developers,<br />
                D MART stores Building Besides, 1st Floor,<br />
                Air Bypass road, Tirupati
              </span>
            </div>
            <div className="footer-contact-item">
              <Phone size={18} />
              <span>+91 86864 65933</span>
            </div>
            <div className="footer-contact-item">
              <Mail size={18} />
              <span>info@amrutha.com</span>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            © {new Date().getFullYear()} Aamruthaa Developers. All Rights Reserved. Designed for Trust & Growth.
          </div>
          <div className="footer-socials">
            <a href="#" className="social-circle" aria-label="Website"><Globe size={18} /></a>
            <a href="#" className="social-circle" aria-label="Share"><Share2 size={18} /></a>
            <a href="#" className="social-circle" aria-label="Portal"><LinkIcon size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
