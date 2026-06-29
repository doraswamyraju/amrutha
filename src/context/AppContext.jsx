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
  const [plots, setPlots] = useState(() => {
    const saved = localStorage.getItem('amrutha_plots');
    return saved ? JSON.parse(saved) : initialPlots;
  });

  const [founders, setFounders] = useState(() => {
    const saved = localStorage.getItem('amrutha_founders');
    if (saved) {
      const parsed = JSON.parse(saved);
      if (parsed.some(f => f.name.includes('Amrutha Rao') || f.name.includes('Kiran Kumar'))) {
        return initialFounders;
      }
      return parsed;
    }
    return initialFounders;
  });

  const [leads, setLeads] = useState(() => {
    const saved = localStorage.getItem('amrutha_leads');
    return saved ? JSON.parse(saved) : initialLeads;
  });

  useEffect(() => {
    localStorage.setItem('amrutha_plots', JSON.stringify(plots));
  }, [plots]);

  useEffect(() => {
    localStorage.setItem('amrutha_founders', JSON.stringify(founders));
  }, [founders]);

  useEffect(() => {
    localStorage.setItem('amrutha_leads', JSON.stringify(leads));
  }, [leads]);

  // CRUD actions for Plots
  const addPlot = (plot) => {
    const newPlot = {
      ...plot,
      id: `plot-${Date.now()}`
    };
    setPlots(prev => [newPlot, ...prev]);
  };

  const updatePlot = (id, updatedPlot) => {
    setPlots(prev => prev.map(p => p.id === id ? { ...p, ...updatedPlot } : p));
  };

  const deletePlot = (id) => {
    setPlots(prev => prev.filter(p => p.id !== id));
  };

  // Profile actions for Founders
  const updateFounder = (id, updatedFounder) => {
    setFounders(prev => prev.map(f => f.id === id ? { ...f, ...updatedFounder } : f));
  };

  // Inquiry/Lead actions
  const addLead = (lead) => {
    const newLead = {
      ...lead,
      id: `lead-${Date.now()}`,
      date: new Date().toISOString(),
      status: 'new'
    };
    setLeads(prev => [newLead, ...prev]);
  };

  const updateLeadStatus = (id, status) => {
    setLeads(prev => prev.map(l => l.id === id ? { ...l, status } : l));
  };

  const deleteLead = (id) => {
    setLeads(prev => prev.filter(l => l.id !== id));
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
      deleteLead
    }}>
      {children}
    </AppContext.Provider>
  );
};
