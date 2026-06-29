import React, { useContext, useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import { MapPin, Search, Grid, Eye } from 'lucide-react';

export default function Plots() {
  const { plots } = useContext(AppContext);
  const [searchParams] = useSearchParams();

  // Filters State
  const [search, setSearch] = useState('');
  const [venture, setVenture] = useState('');
  const [status, setStatus] = useState('');
  const [facing, setFacing] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // Hydrate filters from home quick-search parameters
  useEffect(() => {
    const locParam = searchParams.get('location');
    const priceParam = searchParams.get('price');

    if (locParam) setSearch(locParam);
    if (priceParam) setMaxPrice(priceParam);
  }, [searchParams]);

  // Unique Ventures and Facings for dropdown selectors
  const venturesList = [...new Set(plots.map(p => p.ventureName))];
  const facingsList = [...new Set(plots.map(p => p.facing))];

  // Filtered Plots logic
  const filteredPlots = plots.filter(plot => {
    const matchesSearch = 
      plot.location.toLowerCase().includes(search.toLowerCase()) ||
      plot.ventureName.toLowerCase().includes(search.toLowerCase()) ||
      plot.plotNumber.includes(search);
    
    const matchesVenture = venture === '' || plot.ventureName === venture;
    const matchesStatus = status === '' || plot.status === status;
    const matchesFacing = facing === '' || plot.facing.includes(facing);
    const matchesPrice = maxPrice === '' || plot.price >= Number(maxPrice);

    return matchesSearch && matchesVenture && matchesStatus && matchesFacing && matchesPrice;
  });

  const formatPrice = (value) => {
    if (value >= 10000000) return `${(value / 10000000).toFixed(2)} Cr`;
    if (value >= 100000) return `${(value / 100000).toFixed(1)} Lakhs`;
    return value.toLocaleString('en-IN');
  };

  const getStatusBadge = (plotStatus) => {
    switch (plotStatus) {
      case 'available':
        return <div className="badge badge-available">Available</div>;
      case 'booking':
        return <div className="badge badge-booking">Booking</div>;
      case 'sold':
        return <div className="badge badge-sold">Sold Out</div>;
      default:
        return null;
    }
  };

  return (
    <div className="container section-padding animate-fade-in">
      <div className="text-center" style={{ marginBottom: '50px' }}>
        <span className="section-subtitle">Realize Your Investments</span>
        <h1 className="section-title">Ventures & Available Plots</h1>
        <p className="section-desc">
          Browse through our verified portfolio of residential open plots. Filter by venture names, 
          facing alignments, budgets, and status.
        </p>
      </div>

      {/* Advanced Filter Panel */}
      <div className="filter-bar">
        <div className="filter-group">
          <label>Search Plots</label>
          <div style={{ position: 'relative' }}>
            <input 
              type="text" 
              placeholder="Plot No., Venture, or Area..." 
              className="filter-input"
              style={{ width: '100%' }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="filter-group">
          <label>Select Venture</label>
          <select 
            className="filter-input"
            value={venture}
            onChange={(e) => setVenture(e.target.value)}
          >
            <option value="">All Ventures</option>
            {venturesList.map((v, i) => (
              <option key={i} value={v}>{v}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Plot Status</label>
          <select 
            className="filter-input"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="">All Statuses</option>
            <option value="available">Available Only</option>
            <option value="booking">Under Booking</option>
            <option value="sold">Sold Out</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Facing Direction</label>
          <select 
            className="filter-input"
            value={facing}
            onChange={(e) => setFacing(e.target.value)}
          >
            <option value="">Any Facing</option>
            <option value="East">East Facing</option>
            <option value="West">West Facing</option>
            <option value="North">North Facing</option>
            <option value="South">South Facing</option>
          </select>
        </div>

        <button 
          className="btn btn-outline" 
          style={{ height: '48px', padding: '0 20px' }}
          onClick={() => {
            setSearch('');
            setVenture('');
            setStatus('');
            setFacing('');
            setMaxPrice('');
          }}
        >
          Reset Filters
        </button>
      </div>

      {/* Grid List */}
      {filteredPlots.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '80px 0', border: '1px dashed var(--border-color)', borderRadius: '12px' }}>
          <h3 style={{ color: 'var(--primary-navy)', fontSize: '1.5rem', marginBottom: '8px' }}>No Plots Found</h3>
          <p style={{ color: 'var(--text-muted)' }}>Try adjusting your search criteria or reset filters.</p>
        </div>
      ) : (
        <>
          <div style={{ marginBottom: '20px', color: 'var(--text-muted)', fontWeight: '500' }}>
            Showing {filteredPlots.length} Open Plots
          </div>
          <div className="grid-3">
            {filteredPlots.map((plot) => (
              <div className="card" key={plot.id}>
                <div className="card-img-wrapper">
                  {getStatusBadge(plot.status)}
                  <img 
                    src={
                      plot.ventureName.includes('Meadows') 
                        ? 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&q=80&w=600'
                        : plot.ventureName.includes('Royal')
                        ? 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&q=80&w=600'
                        : 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=80&w=600'
                    } 
                    alt="Plot Landscape" 
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
                      <span className="spec-label">Road Width</span>
                      <span className="spec-val">{plot.roadWidth}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Facing Direction</span>
                      <span className="spec-val">{plot.facing}</span>
                    </div>
                    <div className="spec-item">
                      <span className="spec-label">Legal Title</span>
                      <span className="spec-val" style={{ color: 'var(--status-available)', fontWeight: 'bold' }}>DTCP Cleared</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div className="card-price">
                      ₹{formatPrice(plot.price)}
                    </div>
                    <Link to={`/plots/${plot.id}`} className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }}>
                      <Eye size={14} />
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
