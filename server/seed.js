const mongoose = require('mongoose');
require('dotenv').config();
const { Plot, Founder, Lead } = require('./models');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/amrutha';

const initialPlots = [
  {
    plotNumber: '45',
    ventureName: 'Amrutha Golden Meadows',
    location: 'Sadashivpet, Hyderabad',
    size: 200,
    price: 3600000,
    facing: 'East Facing',
    roadWidth: '40 Feet',
    status: 'available',
    highlights: ['100% Vastu Compliant', 'Clear Title', 'Spot Registration'],
    description: 'Premium east-facing residential open plot located in the rapidly developing corridor of Sadashivpet. Excellent connectivity to NH-65 and the NIMZ project.'
  },
  {
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
    name: 'Cheedalla Anil Kumar',
    role: 'Managing Director & Founder',
    image: '/Cheedalla Anil Kumar.jpeg',
    bio: 'Cheedalla Anil Kumar is the founder of Amrutha Developers. Committed to transparency and structural excellence, he drives the venture acquisition process and handles legal title clearances to ensure zero-dispute open plots for every investor.',
    email: 'anil@amrutha.com',
    linkedin: 'linkedin.com/in/anil-kumar-amrutha',
    phone: '7330813128'
  },
  {
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
    name: 'Ramesh Reddy',
    email: 'ramesh.reddy@gmail.com',
    phone: '+91 99887 76655',
    message: 'I am highly interested in purchasing Plot No. 45 in Sadashivpet. Please contact me with the payment schedule.',
    status: 'new'
  },
  {
    name: 'Sneha Rao',
    email: 'sneha.rao@yahoo.com',
    phone: '+91 88776 65544',
    message: 'Is there a site visit planned this coming Sunday for Shankarpally Royal County? Please call me back.',
    status: 'contacted'
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('Connected to MongoDB for seeding');

    // Clean existing database (optional, but good for clean initial state)
    await Plot.deleteMany({});
    await Founder.deleteMany({});
    await Lead.deleteMany({});

    // Seed plots
    const seededPlots = await Plot.insertMany(initialPlots);
    console.log(`Seeded ${seededPlots.length} plots`);

    // Seed founders
    const seededFounders = await Founder.insertMany(initialFounders);
    console.log(`Seeded ${seededFounders.length} founders`);

    // Seed leads and map plot interest
    if (seededPlots.length > 0) {
      initialLeads[0].plotInterest = seededPlots[0]._id.toString(); // Golden Meadows Plot 45
      initialLeads[1].plotInterest = seededPlots[3]._id.toString(); // Royal County Plot 34
    }
    const seededLeads = await Lead.insertMany(initialLeads);
    console.log(`Seeded ${seededLeads.length} leads`);

    console.log('Database seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
