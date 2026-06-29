import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Landmark, LayoutDashboard } from 'lucide-react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const isDashboard = location.pathname.startsWith('/admin');

  if (isDashboard) return null; // Don't show public header in admin dashboard

  const toggleMenu = () => setIsOpen(!isOpen);

  const isActive = (path) => location.pathname === path ? 'active' : '';

  return (
    <header className="main-header">
      <div className="container header-wrapper">
        <Link to="/" className="logo-container" onClick={() => setIsOpen(false)}>
          <img src="/Logo 1.jpg.jpeg" alt="Amrutha Developers Logo" style={{ height: '48px', objectFit: 'contain', borderRadius: '4px' }} />
          <div className="logo-text">
            <span className="logo-title">AMRUTHA</span>
            <span className="logo-subtitle">D E V E L O P E R S</span>
          </div>
        </Link>

        {/* Mobile menu toggle */}
        <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle Navigation">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Nav Links */}
        <nav className={`nav-links ${isOpen ? 'open' : ''}`}>
          <Link to="/" className={`nav-item ${isActive('/')}`} onClick={() => setIsOpen(false)}>
            Home
          </Link>
          <Link to="/plots" className={`nav-item ${isActive('/plots')}`} onClick={() => setIsOpen(false)}>
            Ventures & Plots
          </Link>
          <Link to="/about" className={`nav-item ${isActive('/about')}`} onClick={() => setIsOpen(false)}>
            About Founders
          </Link>
          <Link to="/contact" className={`nav-item ${isActive('/contact')}`} onClick={() => setIsOpen(false)}>
            Contact Us
          </Link>
          <Link 
            to="/admin" 
            className="btn btn-primary" 
            style={{ 
              padding: '8px 18px', 
              fontSize: '0.85rem',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onClick={() => setIsOpen(false)}
          >
            <LayoutDashboard size={16} />
            Dashboard
          </Link>
        </nav>
      </div>
    </header>
  );
}
