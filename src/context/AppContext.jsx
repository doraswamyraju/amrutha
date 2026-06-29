import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

const initialPlots = [
  {
    id: 'plot-1',
    plotNumber: '45',
    ventureName: 'Amrutha Golden Meadows',
    location: 'Sadashivpet, Hyderabad',
    size: 200, // sq yards
    price: 3600000, // INR
    facing: 'East Facing',
    roadWidth: '40 Feet',
    status: 'available',
    highlights: ['100% Vastu Compliant', 'Clear Title', 'Spot Registration'],
    description: 'Premium east-facing residential open plot located in the rapidly developing corridor of Sadashivpet. Excellent connectivity to NH-65 and the NIMZ project.'
  },
  {
    id: 'plot-2',
    plotNumber: '12',
    ventureName: 'Amrutha Golden Meadows',
    location: 'Sadashivpet, Hyderabad',
    size: 240,
    price: 4320000,
    facing: 'West Facing',
    roadWidth: '40 Feet',
    status: 'booking',
    highlights: ['Near Highway', 'Gated Community', 'Underground Drainage'],
    description: 'Spacious corner plot close to the venture entrance. Features modern underground sewage layout and ready electricity lines.'
  },
  {
    id: 'plot-3',
    plotNumber: '89',
    ventureName: 'Amrutha Royal County',
    location: 'Shankarpally, Hyderabad',
    size: 300,
    price: 7500000,
    facing: 'North Facing',
    roadWidth: '50 Feet',
    status: 'sold',
    highlights: ['Premium Location', 'Avenue Plantation', 'Children Play Area'],
    description: 'High-end premium open plot in Shankarpally, surrounded by lush green landscapes. Minutes away from top international schools and IT hubs.'
  },
  {
    id: 'plot-4',
    plotNumber: '34',
    ventureName: 'Amrutha Royal County',
    location: 'Shankarpally, Hyderabad',
    size: 180,
    price: 4500000,
    facing: 'East Facing',
    roadWidth: '33 Feet',
    status: 'available',
    highlights: ['Vastu Compliant', 'Water Connection', '24/7 Security'],
    description: 'Perfect investment opportunity in one of Shankarpallys most premium gated layout ventures. Ready for immediate villa construction.'
  },
  {
    id: 'plot-5',
    plotNumber: '7',
    ventureName: 'Amrutha Elite Enclave',
    location: 'Patancheru, Hyderabad',
    size: 150,
    price: 4950000,
    facing: 'South Facing',
    roadWidth: '33 Feet',
    status: 'available',
    highlights: ['High Appreciation Zone', 'Black Top Roads', 'Street Lights'],
    description: 'Strategically located plot in Patancheru. Superb connectivity to Outer Ring Road (ORR) and prominent industrial centers.'
  },
  {
    id: 'plot-6',
    plotNumber: '112',
    ventureName: 'Amrutha Elite Enclave',
    location: 'Patancheru, Hyderabad',
    size: 220,
    price: 7260000,
    facing: 'North-East Facing',
    roadWidth: '60 Feet Corner',
    status: 'sold',
    highlights: ['Double Road Corner', 'Near Club House', 'Premium Security'],
    description: 'Exclusive double road corner plot facing the club house and park. Sold out to a premium custom villa buyer.'
  }
];

const initialFounders = [
  {
    id: 'founder-1',
    name: 'Cheedalla Anil Kumar',
    role: 'Managing Director & Founder',
    image: '/Cheedalla Anil Kumar.jpeg',
    bio: 'Cheedalla Anil Kumar is the founder of Amrutha Developers. Committed to transparency and structural excellence, he drives the venture acquisition process and handles legal title clearances to ensure zero-dispute open plots for every investor.',
    email: 'anil@amrutha.com',
    linkedin: 'linkedin.com/in/anil-kumar-amrutha',
    phone: '7330813128'
  },
  {
    id: 'founder-2',
    name: 'Siva Subramanyam',
    role: 'Executive Partner & Co-Founder',
    image: '/Siva Subramanyam.jpeg',
    bio: 'Siva Subramanyam oversees marketing, client relationships, and layout infrastructure developments. He coordinates with RERA and DTCP authorities to design modern gated layouts that feature eco-drainage, wide roads, and community parks.',
    email: 'siva@amrutha.com',
    linkedin: 'linkedin.com/in/siva-subramanyam-amrutha',
    phone: '7013677164'
  }
];

const initialLeads = [
  {
    id: 'lead-1',
    name: 'Ramesh Reddy',
    email: 'ramesh.reddy@gmail.com',
    phone: '+91 99887 76655',
    plotInterest: 'plot-1', // Sadashivpet Plot 45
    message: 'I am highly interested in purchasing Plot No. 45 in Sadashivpet. Please contact me with the payment schedule.',
    date: '2026-06-06T10:30:00Z',
    status: 'new'
  },
  {
    id: 'lead-2',
    name: 'Sneha Rao',
    email: 'sneha.rao@yahoo.com',
    phone: '+91 88776 65544',
    plotInterest: 'plot-4', // Shankarpally Plot 34
    message: 'Is there a site visit planned this coming Sunday for Shankarpally Royal County? Please call me back.',
    date: '2026-06-07T08:15:00Z',
    status: 'contacted'
  }
];

export const AppProvider = ({ children }) => {
  const [plots, setPlots] = useState([]);
  const [founders, setFounders] = useState([]);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);

  const API_URL = '/api';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [plotsRes, foundersRes, leadsRes] = await Promise.all([
          fetch(`${API_URL}/plots`).then(r => {
            if (!r.ok) throw new Error('Failed to fetch plots');
            return r.json();
          }),
          fetch(`${API_URL}/founders`).then(r => {
            if (!r.ok) throw new Error('Failed to fetch founders');
            return r.json();
          }),
          fetch(`${API_URL}/leads`).then(r => {
            if (!r.ok) throw new Error('Failed to fetch leads');
            return r.json();
          })
        ]);

        setPlots(Array.isArray(plotsRes) ? plotsRes : initialPlots);
        setFounders(Array.isArray(foundersRes) ? foundersRes : initialFounders);
        setLeads(Array.isArray(leadsRes) ? leadsRes : initialLeads);
      } catch (error) {
        console.error('Error fetching data from API, using defaults:', error);
        // Fallback to defaults
        setPlots(initialPlots);
        setFounders(initialFounders);
        setLeads(initialLeads);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // CRUD actions for Plots
  const addPlot = async (plot) => {
    try {
      const res = await fetch(`${API_URL}/plots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(plot)
      });
      if (res.ok) {
        const newPlot = await res.json();
        setPlots(prev => [newPlot, ...prev]);
      }
    } catch (error) {
      console.error('Error adding plot:', error);
    }
  };

  const updatePlot = async (id, updatedPlot) => {
    try {
      const res = await fetch(`${API_URL}/plots/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedPlot)
      });
      if (res.ok) {
        const savedPlot = await res.json();
        setPlots(prev => prev.map(p => p.id === id ? savedPlot : p));
      }
    } catch (error) {
      console.error('Error updating plot:', error);
    }
  };

  const deletePlot = async (id) => {
    try {
      const res = await fetch(`${API_URL}/plots/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setPlots(prev => prev.filter(p => p.id !== id));
      }
    } catch (error) {
      console.error('Error deleting plot:', error);
    }
  };

  // Profile actions for Founders
  const updateFounder = async (id, updatedFounder) => {
    try {
      const res = await fetch(`${API_URL}/founders/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedFounder)
      });
      if (res.ok) {
        const savedFounder = await res.json();
        setFounders(prev => prev.map(f => f.id === id ? savedFounder : f));
      }
    } catch (error) {
      console.error('Error updating founder:', error);
    }
  };

  // Inquiry/Lead actions
  const addLead = async (lead) => {
    try {
      const res = await fetch(`${API_URL}/leads`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(lead)
      });
      if (res.ok) {
        const newLead = await res.json();
        setLeads(prev => [newLead, ...prev]);
      }
    } catch (error) {
      console.error('Error adding lead:', error);
    }
  };

  const updateLeadStatus = async (id, status) => {
    try {
      const res = await fetch(`${API_URL}/leads/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) {
        const savedLead = await res.json();
        setLeads(prev => prev.map(l => l.id === id ? savedLead : l));
      }
    } catch (error) {
      console.error('Error updating lead status:', error);
    }
  };

  const deleteLead = async (id) => {
    try {
      const res = await fetch(`${API_URL}/leads/${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        setLeads(prev => prev.filter(l => l.id !== id));
      }
    } catch (error) {
      console.error('Error deleting lead:', error);
    }
  };

  return (
    <AppContext.Provider value={{
      plots,
      addPlot,
      updatePlot,
      deletePlot,
      founders,
      updateFounder,
      leads,
      addLead,
      updateLeadStatus,
      deleteLead,
      loading
    }}>
      {children}
    </AppContext.Provider>
  );
};
