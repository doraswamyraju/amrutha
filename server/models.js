const mongoose = require('mongoose');

const plotSchema = new mongoose.Schema({
  plotNumber: { type: String, required: true },
  ventureName: { type: String, required: true },
  location: { type: String, required: true },
  size: { type: Number, required: true },
  price: { type: Number, required: true },
  facing: { type: String, required: true },
  roadWidth: { type: String, required: true },
  status: { type: String, enum: ['available', 'booking', 'sold'], default: 'available' },
  highlights: [{ type: String }],
  description: { type: String }
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    }
  }
});

const founderSchema = new mongoose.Schema({
  name: { type: String, required: true },
  role: { type: String, required: true },
  image: { type: String },
  bio: { type: String },
  email: { type: String },
  linkedin: { type: String },
  phone: { type: String }
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    }
  }
});

const leadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String },
  phone: { type: String, required: true },
  plotInterest: { type: String }, // stores the plot ID
  message: { type: String },
  status: { type: String, enum: ['new', 'contacted', 'closed'], default: 'new' },
  date: { type: Date, default: Date.now }
}, {
  toJSON: {
    transform: (doc, ret) => {
      ret.id = ret._id.toString();
      delete ret._id;
      delete ret.__v;
    }
  }
});

const Plot = mongoose.model('Plot', plotSchema);
const Founder = mongoose.model('Founder', founderSchema);
const Lead = mongoose.model('Lead', leadSchema);

module.exports = { Plot, Founder, Lead };
