import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';
import { 
  Building, Users, MailCheck, Coins, Plus, Edit, Trash2, CheckCircle2, UserCheck, Calendar, X, Save, Eye, LogOut
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  const { 
    plots, addPlot, updatePlot, deletePlot, 
    founders, updateFounder, 
    leads, updateLeadStatus, deleteLead 
  } = useContext(AppContext);

  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return sessionStorage.getItem('amrutha_admin_auth') === 'true';
  });
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Password Reset State
  const [isResetMode, setIsResetMode] = useState(false);
  const [resetEmail, setResetEmail] = useState('');
  const [resetSuccessMessage, setResetSuccessMessage] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (email.trim() === 'admin@amruthadevelopers.com' && password === 'Admin@2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('amrutha_admin_auth', 'true');
      setError('');
    } else {
      setError('Invalid email or password. Please use authorized credentials.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('amrutha_admin_auth');
    setEmail('');
    setPassword('');
  };

  const handleResetPassword = (e) => {
    e.preventDefault();
    if (resetEmail.trim() === 'admin@amruthadevelopers.com') {
      setResetSuccessMessage('Password reset instructions have been sent to your email.');
      setError('');
    } else {
      setError('The entered email address is not registered in our system.');
    }
  };

  const [activeTab, setActiveTab] = useState('overview'); // overview, properties, founders, leads

  // CRUD MODAL STATE FOR PLOTS
  const [showPlotModal, setShowPlotModal] = useState(false);
  const [editingPlot, setEditingPlot] = useState(null);
  
  // Plot form inputs
  const [plotNumber, setPlotNumber] = useState('');
  const [ventureName, setVentureName] = useState('Amrutha Golden Meadows');
  const [location, setLocation] = useState('Sadashivpet, Hyderabad');
  const [size, setSize] = useState('');
  const [price, setPrice] = useState('');
  const [facing, setFacing] = useState('East Facing');
  const [roadWidth, setRoadWidth] = useState('40 Feet');
  const [status, setStatus] = useState('available');
  const [description, setDescription] = useState('');

  // FOUNDERS EDIT STATE
  const [editingFounder, setEditingFounder] = useState(null);
  const [founderName, setFounderName] = useState('');
  const [founderRole, setFounderRole] = useState('');
  const [founderBio, setFounderBio] = useState('');
  const [founderEmail, setFounderEmail] = useState('');
  const [founderPhone, setFounderPhone] = useState('');
  const [founderImage, setFounderImage] = useState('');

  // 1. STATS CALCULATIONS
  const totalPlots = plots.length;
  const soldPlots = plots.filter(p => p.status === 'sold').length;
  const bookingPlots = plots.filter(p => p.status === 'booking').length;
  const availablePlots = plots.filter(p => p.status === 'available').length;
  const totalLeads = leads.length;
  const estRevenue = plots.filter(p => p.status === 'sold').reduce((sum, p) => sum + p.price, 0);

  // 2. CHART DATA FORMULATION
  const chartDataStatus = [
    { name: 'Available', value: availablePlots, color: '#10B981' },
    { name: 'Under Booking', value: bookingPlots, color: '#F59E0B' },
    { name: 'Sold Out', value: soldPlots, color: '#EF4444' }
  ];

  const chartDataVenture = [
    { name: 'Golden Meadows', available: plots.filter(p => p.ventureName === 'Amrutha Golden Meadows' && p.status === 'available').length, sold: plots.filter(p => p.ventureName === 'Amrutha Golden Meadows' && p.status === 'sold').length },
    { name: 'Royal County', available: plots.filter(p => p.ventureName === 'Amrutha Royal County' && p.status === 'available').length, sold: plots.filter(p => p.ventureName === 'Amrutha Royal County' && p.status === 'sold').length },
    { name: 'Elite Enclave', available: plots.filter(p => p.ventureName === 'Amrutha Elite Enclave' && p.status === 'available').length, sold: plots.filter(p => p.ventureName === 'Amrutha Elite Enclave' && p.status === 'sold').length }
  ];

  // 3. PLOT SAVE/UPDATE ACTIONS
  const handleSavePlot = (e) => {
    e.preventDefault();
    const plotData = {
      plotNumber,
      ventureName,
      location,
      size: Number(size),
      price: Number(price),
      facing,
      roadWidth,
      status,
      description: description || `Premium ${facing} open plot in ${ventureName}.`,
      highlights: ['Clear Title', '100% Vastu', 'Spot Registration']
    };

    if (editingPlot) {
      updatePlot(editingPlot.id, plotData);
    } else {
      addPlot(plotData);
    }

    resetPlotForm();
  };

  const openAddPlotModal = () => {
    setEditingPlot(null);
    setPlotNumber('');
    setVentureName('Amrutha Golden Meadows');
    setLocation('Sadashivpet, Hyderabad');
    setSize('');
    setPrice('');
    setFacing('East Facing');
    setRoadWidth('40 Feet');
    setStatus('available');
    setDescription('');
    setShowPlotModal(true);
  };

  const openEditPlotModal = (plot) => {
    setEditingPlot(plot);
    setPlotNumber(plot.plotNumber);
    setVentureName(plot.ventureName);
    setLocation(plot.location);
    setSize(plot.size);
    setPrice(plot.price);
    setFacing(plot.facing);
    setRoadWidth(plot.roadWidth);
    setStatus(plot.status);
    setDescription(plot.description);
    setShowPlotModal(true);
  };

  const resetPlotForm = () => {
    setShowPlotModal(false);
    setEditingPlot(null);
  };

  // 4. FOUNDER SAVE ACTION
  const handleSaveFounder = (e) => {
    e.preventDefault();
    if (!editingFounder) return;

    updateFounder(editingFounder.id, {
      name: founderName,
      role: founderRole,
      bio: founderBio,
      email: founderEmail,
      phone: founderPhone,
      image: founderImage
    });

    setEditingFounder(null);
  };

  const startEditFounder = (founder) => {
    setEditingFounder(founder);
    setFounderName(founder.name);
    setFounderRole(founder.role);
    setFounderBio(founder.bio);
    setFounderEmail(founder.email);
    setFounderPhone(founder.phone);
    setFounderImage(founder.image);
  };

  const formatCurrency = (val) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(2)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(1)} L`;
    return `₹${val.toLocaleString('en-IN')}`;
  };

  if (!isAuthenticated) {
    return (
      <div className="login-screen-wrapper" style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0b1e36 0%, #1e3a5f 100%)',
        fontFamily: 'Inter, sans-serif',
        padding: '20px'
      }}>
        <div className="login-card" style={{
          background: 'rgba(255, 255, 255, 0.95)',
          borderRadius: '16px',
          padding: '40px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
          width: '100%',
          maxWidth: '420px',
          backdropFilter: 'blur(10px)',
          textAlign: 'center',
          animation: 'fadeIn 0.5s ease'
        }}>
          <div className="login-logo-container" style={{ marginBottom: '24px' }}>
            <img src="/Logo 1.jpg.jpeg" alt="Amrutha Developers Logo" style={{ height: '60px', borderRadius: '4px', objectFit: 'contain' }} />
            <h2 style={{ color: '#0b1e36', marginTop: '12px', fontSize: '1.5rem', fontWeight: '800', letterSpacing: '1px' }}>AMRUTHA DEVELOPERS</h2>
            <p style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '2px', marginTop: '4px' }}>Partners Panel Login</p>
          </div>

          {error && (
            <div style={{
              backgroundColor: '#FEE2E2',
              color: '#991B1B',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              marginBottom: '20px',
              border: '1px solid #FCA5A5',
              textAlign: 'left'
            }}>
              {error}
            </div>
          )}

          {resetSuccessMessage && (
            <div style={{
              backgroundColor: '#D1FAE5',
              color: '#065F46',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '0.85rem',
              marginBottom: '20px',
              border: '1px solid #A7F3D0',
              textAlign: 'left'
            }}>
              {resetSuccessMessage}
            </div>
          )}

          {!isResetMode ? (
            <form onSubmit={handleLogin} style={{ textAlign: 'left' }}>
              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Email Address</label>
                <input 
                  type="email" 
                  className="form-input" 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  required
                  placeholder="admin@amruthadevelopers.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Password</label>
                <input 
                  type="password" 
                  className="form-input" 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '0.95rem', fontWeight: '600', borderRadius: '8px' }}>
                Sign In
              </button>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button 
                  type="button" 
                  onClick={() => { setIsResetMode(true); setError(''); setResetSuccessMessage(''); }}
                  style={{ border: 'none', background: 'none', color: '#1d4ed8', fontSize: '0.85rem', cursor: 'pointer', fontWeight: '500' }}
                >
                  Forgot / Reset Password?
                </button>
              </div>
            </form>
          ) : (
            <form onSubmit={handleResetPassword} style={{ textAlign: 'left' }}>
              <p style={{ fontSize: '0.85rem', color: '#4B5563', marginBottom: '20px', lineHeight: '1.5' }}>
                Enter your registered administrator email to receive instructions to reset your password.
              </p>

              <div className="form-group" style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: '600', color: '#374151', marginBottom: '6px' }}>Registered Email</label>
                <input 
                  type="email" 
                  className="form-input" 
                  style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid #D1D5DB' }}
                  required
                  placeholder="admin@amruthadevelopers.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>

              <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '12px', fontSize: '0.95rem', fontWeight: '600', borderRadius: '8px' }}>
                Send Reset Link
              </button>

              <div style={{ marginTop: '20px', textAlign: 'center' }}>
                <button 
                  type="button" 
                  onClick={() => { setIsResetMode(false); setError(''); setResetSuccessMessage(''); }}
                  style={{ border: 'none', background: 'none', color: '#4B5563', fontSize: '0.85rem', cursor: 'pointer', fontWeight: '500' }}
                >
                  Back to Sign In
                </button>
              </div>
            </form>
          )}

          <div style={{ marginTop: '30px', borderTop: '1px solid #E5E7EB', paddingTop: '20px' }}>
            <Link to="/" style={{ color: '#0b1e36', textDecoration: 'none', fontSize: '0.85rem', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
              ← Return to Main Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-layout animate-fade-in">
      
      {/* Sidebar Navigation */}
      <aside className="dashboard-sidebar">
        <div className="sidebar-logo">
          <Link to="/" className="logo-container">
            <div className="logo-icon" style={{ width: '35px', height: '35px' }}></div>
            <div className="logo-text">
              <span className="logo-title" style={{ fontSize: '1.1rem', letterSpacing: '1px' }}>AMRUTHA</span>
              <span className="logo-subtitle" style={{ fontSize: '0.5rem', letterSpacing: '2px' }}>PARTNERS PANEL</span>
            </div>
          </Link>
        </div>
 
        <nav className="sidebar-nav">
          <button 
            className={`sidebar-item ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            <Building size={18} />
            Analytics Overview
          </button>
          
          <button 
            className={`sidebar-item ${activeTab === 'properties' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties')}
          >
            <Coins size={18} />
            Manage Plots
          </button>
          
          <button 
            className={`sidebar-item ${activeTab === 'founders' ? 'active' : ''}`}
            onClick={() => setActiveTab('founders')}
          >
            <Users size={18} />
            Founders Profiles
          </button>
          
          <button 
            className={`sidebar-item ${activeTab === 'leads' ? 'active' : ''}`}
            onClick={() => setActiveTab('leads')}
            style={{ position: 'relative' }}
          >
            <MailCheck size={18} />
            Customer Leads
            {leads.filter(l => l.status === 'new').length > 0 && (
              <span style={{ 
                position: 'absolute', right: '16px', top: '50%', transform: 'translateY(-50%)',
                backgroundColor: 'var(--status-sold)', color: 'white', borderRadius: '50%',
                width: '18px', height: '18px', display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.65rem', fontWeight: 'bold'
              }}>
                {leads.filter(l => l.status === 'new').length}
              </span>
            )}
          </button>
        </nav>
 
        <div style={{ marginTop: 'auto', padding: '0 16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button onClick={handleLogout} className="sidebar-item" style={{ color: '#F87171', border: '1px solid rgba(248,113,113,0.2)', width: '100%', textAlign: 'left', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LogOut size={18} />
            Logout Session
          </button>
          <Link to="/" className="sidebar-item" style={{ color: '#F1F5F9', border: '1px solid rgba(255,255,255,0.1)' }}>
            <Building size={18} />
            Back to Website
          </Link>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="dashboard-content-wrapper">
        <header className="dashboard-header">
          <div>
            <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Admin Dashboard</span>
            <h2 style={{ fontSize: '1.6rem', color: 'var(--primary-navy)' }}>
              {activeTab === 'overview' && 'Sales & Analytics Overview'}
              {activeTab === 'properties' && 'Real Estate Properties Catalog'}
              {activeTab === 'founders' && 'Manage Founders Executive Profiles'}
              {activeTab === 'leads' && 'Customer Inquiries & Site Visits'}
            </h2>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontWeight: '700', fontSize: '0.95rem', color: 'var(--primary-navy)' }}>Admin Manager</p>
              <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Authorized Access</p>
            </div>
            <div style={{ width: '40px', height: '40px', borderRadius: '50%', backgroundColor: 'var(--accent-gold)', color: 'var(--primary-navy)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
              AM
            </div>
          </div>
        </header>

        <main className="dashboard-body">

          {/* OVERVIEW PANEL */}
          {activeTab === 'overview' && (
            <div className="animate-fade-in">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon" style={{ backgroundColor: 'rgba(11, 30, 54, 0.1)', color: 'var(--primary-navy)' }}><Building size={24} /></div>
                  <div className="stat-info">
                    <span className="stat-label">Total Plots</span>
                    <span className="stat-value">{totalPlots}</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ backgroundColor: 'var(--status-available-bg)', color: 'var(--status-available)' }}><CheckCircle2 size={24} /></div>
                  <div className="stat-info">
                    <span className="stat-label">Available Plots</span>
                    <span className="stat-value">{availablePlots}</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ backgroundColor: 'var(--status-sold-bg)', color: 'var(--status-sold)' }}><Coins size={24} /></div>
                  <div className="stat-info">
                    <span className="stat-label">Est. Sales Revenue</span>
                    <span className="stat-value">{formatCurrency(estRevenue)}</span>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon" style={{ backgroundColor: 'rgba(245, 158, 11, 0.1)', color: 'var(--status-booking)' }}><MailCheck size={24} /></div>
                  <div className="stat-info">
                    <span className="stat-label">Total Leads</span>
                    <span className="stat-value">{totalLeads}</span>
                  </div>
                </div>
              </div>

              {/* Analytical Charts */}
              <div className="grid-2" style={{ marginBottom: '40px' }}>
                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Plot Stock Allocation Status</h3>
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={chartDataStatus}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={90}
                          paddingAngle={5}
                          dataKey="value"
                        >
                          {chartDataStatus.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => [`${value} Plots`, 'Count']} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.85rem', fontWeight: '600' }}>
                    <span style={{ color: 'var(--status-available)' }}>● Available ({availablePlots})</span>
                    <span style={{ color: 'var(--status-booking)' }}>● Booking ({bookingPlots})</span>
                    <span style={{ color: 'var(--status-sold)' }}>● Sold Out ({soldPlots})</span>
                  </div>
                </div>

                <div style={{ background: 'white', padding: '24px', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '20px' }}>Sales Status per Venture Area</h3>
                  <div style={{ height: '300px' }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={chartDataVenture}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="available" fill="#10B981" name="Available Plots" />
                        <Bar dataKey="sold" fill="#EF4444" name="Sold Plots" />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* PROPERTIES MANAGER */}
          {activeTab === 'properties' && (
            <div className="animate-fade-in">
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '20px' }}>
                <button className="btn btn-primary" onClick={openAddPlotModal}>
                  <Plus size={16} />
                  Add New Plot
                </button>
              </div>

              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Plot No.</th>
                      <th>Venture / Project</th>
                      <th>Size (Sq Yd)</th>
                      <th>Facing</th>
                      <th>Road Width</th>
                      <th>Price Value</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {plots.map((plot) => (
                      <tr key={plot.id}>
                        <td style={{ fontWeight: '700' }}>{plot.plotNumber}</td>
                        <td>
                          <div>
                            <p style={{ fontWeight: '600', color: 'var(--primary-navy)' }}>{plot.ventureName}</p>
                            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{plot.location}</p>
                          </div>
                        </td>
                        <td>{plot.size}</td>
                        <td>{plot.facing}</td>
                        <td>{plot.roadWidth}</td>
                        <td style={{ fontWeight: '600' }}>{formatCurrency(plot.price)}</td>
                        <td>
                          <span className={`status-pill ${plot.status}`}>
                            {plot.status === 'available' ? 'Available' : plot.status === 'booking' ? 'Booking' : 'Sold'}
                          </span>
                        </td>
                        <td>
                          <div style={{ display: 'flex', gap: '8px' }}>
                            <button 
                              onClick={() => openEditPlotModal(plot)}
                              style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--primary-navy)' }}
                              title="Edit Plot"
                            >
                              <Edit size={16} />
                            </button>
                            
                            {/* Fast Status Toggles */}
                            <select 
                              value={plot.status}
                              onChange={(e) => updatePlot(plot.id, { status: e.target.value })}
                              style={{ padding: '4px', fontSize: '0.75rem', borderRadius: '4px', border: '1px solid var(--border-color)' }}
                            >
                              <option value="available">Available</option>
                              <option value="booking">Booking</option>
                              <option value="sold">Sold</option>
                            </select>

                            <button 
                              onClick={() => deletePlot(plot.id)}
                              style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--status-sold)' }}
                              title="Delete Plot"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* FOUNDERS MANAGER */}
          {activeTab === 'founders' && (
            <div className="animate-fade-in">
              {editingFounder ? (
                <div className="inquiry-form" style={{ maxWidth: '700px', margin: '0 auto' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                    <h3 style={{ color: 'var(--primary-navy)' }}>Modify Profile: {editingFounder.name}</h3>
                    <button 
                      onClick={() => setEditingFounder(null)}
                      style={{ border: 'none', background: 'none', cursor: 'pointer' }}
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <form onSubmit={handleSaveFounder}>
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        required 
                        value={founderName} 
                        onChange={(e) => setFounderName(e.target.value)} 
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Corporate Role / Designation *</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        required 
                        value={founderRole} 
                        onChange={(e) => setFounderRole(e.target.value)} 
                      />
                    </div>

                    <div className="form-group">
                      <label>Photo URL / Avatar Link</label>
                      <input 
                        type="text" 
                        className="form-input" 
                        value={founderImage} 
                        onChange={(e) => setFounderImage(e.target.value)} 
                      />
                    </div>

                    <div className="grid-2">
                      <div className="form-group">
                        <label>Email Address</label>
                        <input 
                          type="email" 
                          className="form-input" 
                          value={founderEmail} 
                          onChange={(e) => setFounderEmail(e.target.value)} 
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input 
                          type="text" 
                          className="form-input" 
                          value={founderPhone} 
                          onChange={(e) => setFounderPhone(e.target.value)} 
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Biography / Profile Summary *</label>
                      <textarea 
                        className="form-input" 
                        rows="5" 
                        required
                        value={founderBio} 
                        onChange={(e) => setFounderBio(e.target.value)}
                        style={{ resize: 'vertical' }}
                      ></textarea>
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '20px' }}>
                      <button type="button" className="btn btn-outline" onClick={() => setEditingFounder(null)}>
                        Cancel
                      </button>
                      <button type="submit" className="btn btn-primary">
                        <Save size={16} />
                        Update Profile
                      </button>
                    </div>
                  </form>
                </div>
              ) : (
                <div className="grid-2" style={{ maxWidth: '900px', margin: '0 auto', gap: '30px' }}>
                  {founders.map((founder) => (
                    <div className="card" key={founder.id} style={{ display: 'flex', flexDirection: 'column', padding: '24px' }}>
                      <div style={{ display: 'flex', gap: '20px', alignItems: 'center', marginBottom: '20px' }}>
                        <img 
                          src={founder.image} 
                          alt={founder.name} 
                          style={{ width: '80px', height: '80px', borderRadius: '50%', objectFit: 'cover', border: '2px solid var(--accent-gold)' }}
                        />
                        <div>
                          <h3 style={{ fontSize: '1.25rem', color: 'var(--primary-navy)' }}>{founder.name}</h3>
                          <span style={{ fontSize: '0.8rem', color: 'var(--accent-gold)', fontWeight: 'bold' }}>{founder.role}</span>
                        </div>
                      </div>
                      
                      <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: '1.5', flexGrow: 1, marginBottom: '20px' }}>
                        {founder.bio.substring(0, 160)}...
                      </p>

                      <button 
                        className="btn btn-secondary" 
                        style={{ width: '100%', display: 'flex', gap: '8px' }}
                        onClick={() => startEditFounder(founder)}
                      >
                        <Edit size={16} />
                        Edit Founder Profile
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* LEADS PANEL */}
          {activeTab === 'leads' && (
            <div className="animate-fade-in">
              <div className="admin-table-container">
                <table className="admin-table">
                  <thead>
                    <tr>
                      <th>Submission Date</th>
                      <th>Customer Details</th>
                      <th>Venture Interest</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {leads.map((lead) => {
                      const relatedPlot = plots.find(p => p.id === lead.plotInterest);
                      return (
                        <tr key={lead.id}>
                          <td>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem' }}>
                              <Calendar size={14} style={{ color: 'var(--text-muted)' }} />
                              <span>{new Date(lead.date).toLocaleDateString()}</span>
                            </div>
                          </td>
                          <td>
                            <div>
                              <p style={{ fontWeight: '700', color: 'var(--primary-navy)' }}>{lead.name}</p>
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lead.phone}</p>
                              <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{lead.email}</p>
                            </div>
                          </td>
                          <td>
                            {relatedPlot ? (
                              <div>
                                <p style={{ fontWeight: '600' }}>Plot {relatedPlot.plotNumber}</p>
                                <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{relatedPlot.ventureName}</p>
                              </div>
                            ) : (
                              <span style={{ fontStyle: 'italic', color: 'var(--text-muted)', fontSize: '0.85rem' }}>General Query</span>
                            )}
                          </td>
                          <td style={{ maxWidth: '280px', fontSize: '0.9rem', color: 'var(--text-dark)' }}>
                            {lead.message}
                          </td>
                          <td>
                            <span style={{ 
                              padding: '4px 10px', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 'bold',
                              backgroundColor: lead.status === 'new' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(16, 185, 129, 0.1)',
                              color: lead.status === 'new' ? 'var(--status-sold)' : 'var(--status-available)'
                            }}>
                              {lead.status === 'new' ? 'New lead' : 'Contacted'}
                            </span>
                          </td>
                          <td>
                            <div style={{ display: 'flex', gap: '8px' }}>
                              {lead.status === 'new' ? (
                                <button 
                                  className="btn btn-primary" 
                                  style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                                  onClick={() => updateLeadStatus(lead.id, 'contacted')}
                                >
                                  Mark Contacted
                                </button>
                              ) : (
                                <button 
                                  className="btn btn-outline" 
                                  style={{ padding: '6px 12px', fontSize: '0.75rem' }}
                                  onClick={() => updateLeadStatus(lead.id, 'new')}
                                >
                                  Mark New
                                </button>
                              )}
                              <button 
                                style={{ border: 'none', background: 'none', cursor: 'pointer', color: 'var(--status-sold)' }}
                                onClick={() => deleteLead(lead.id)}
                              >
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

        </main>
      </div>

      {/* ADD/EDIT PROPERTIES MODAL */}
      {showPlotModal && (
        <div className="modal-overlay">
          <div className="modal-content animate-fade-in">
            <div className="modal-header">
              <h3 style={{ color: 'var(--primary-navy)' }}>{editingPlot ? 'Edit Open Plot Details' : 'Add New Open Plot Listing'}</h3>
              <button className="modal-close-btn" onClick={resetPlotForm}><X size={20} /></button>
            </div>
            
            <form onSubmit={handleSavePlot}>
              <div className="modal-body" style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="grid-2">
                  <div className="form-group">
                    <label>Plot Number *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 45" 
                      className="form-input" 
                      required 
                      value={plotNumber}
                      onChange={(e) => setPlotNumber(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Plot Status *</label>
                    <select 
                      className="form-input" 
                      value={status}
                      onChange={(e) => setStatus(e.target.value)}
                    >
                      <option value="available">Available</option>
                      <option value="booking">Under Booking</option>
                      <option value="sold">Sold Out</option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Venture Project Name *</label>
                  <select 
                    className="form-input" 
                    value={ventureName}
                    onChange={(e) => {
                      setVentureName(e.target.value);
                      // Auto-fill location matching the venture
                      if (e.target.value === 'Amrutha Golden Meadows') setLocation('Sadashivpet, Hyderabad');
                      else if (e.target.value === 'Amrutha Royal County') setLocation('Shankarpally, Hyderabad');
                      else setLocation('Patancheru, Hyderabad');
                    }}
                  >
                    <option value="Amrutha Golden Meadows">Amrutha Golden Meadows</option>
                    <option value="Amrutha Royal County">Amrutha Royal County</option>
                    <option value="Amrutha Elite Enclave">Amrutha Elite Enclave</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Location Area *</label>
                  <input 
                    type="text" 
                    className="form-input" 
                    required 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label>Size (Sq. Yards) *</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 200" 
                      className="form-input" 
                      required 
                      value={size}
                      onChange={(e) => setSize(e.target.value)}
                    />
                  </div>
                  <div className="form-group">
                    <label>Price Value (INR) *</label>
                    <input 
                      type="number" 
                      placeholder="e.g. 3600000" 
                      className="form-input" 
                      required 
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid-2">
                  <div className="form-group">
                    <label>Facing alignment *</label>
                    <select 
                      className="form-input" 
                      value={facing}
                      onChange={(e) => setFacing(e.target.value)}
                    >
                      <option value="East Facing">East Facing</option>
                      <option value="West Facing">West Facing</option>
                      <option value="North Facing">North Facing</option>
                      <option value="South Facing">South Facing</option>
                      <option value="North-East Corner">North-East Corner</option>
                    </select>
                  </div>
                  <div className="form-group">
                    <label>Internal Road Width *</label>
                    <input 
                      type="text" 
                      placeholder="e.g. 40 Feet" 
                      className="form-input" 
                      required 
                      value={roadWidth}
                      onChange={(e) => setRoadWidth(e.target.value)}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Plot Description</label>
                  <textarea 
                    className="form-input" 
                    rows="3" 
                    placeholder="Provide details about topography, elevations or appreciation..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  ></textarea>
                </div>
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-outline" onClick={resetPlotForm}>Cancel</button>
                <button type="submit" className="btn btn-primary">
                  {editingPlot ? 'Apply Changes' : 'Publish Listing'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
