const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const { Plot, Founder, Lead } = require('./models');

const app = express();
const PORT = process.env.PORT || 5008;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/amrutha';

app.use(cors());
app.use(express.json());

// Plots Routes
app.get('/api/plots', async (req, res) => {
  try {
    const plots = await Plot.find({});
    res.json(plots);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/plots', async (req, res) => {
  try {
    const newPlot = new Plot(req.body);
    await newPlot.save();
    res.status(201).json(newPlot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/plots/:id', async (req, res) => {
  try {
    const updatedPlot = await Plot.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedPlot) return res.status(404).json({ error: 'Plot not found' });
    res.json(updatedPlot);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/plots/:id', async (req, res) => {
  try {
    const deletedPlot = await Plot.findByIdAndDelete(req.params.id);
    if (!deletedPlot) return res.status(404).json({ error: 'Plot not found' });
    res.json({ message: 'Plot deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Founders Routes
app.get('/api/founders', async (req, res) => {
  try {
    const founders = await Founder.find({});
    res.json(founders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/api/founders/:id', async (req, res) => {
  try {
    const updatedFounder = await Founder.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedFounder) return res.status(404).json({ error: 'Founder not found' });
    res.json(updatedFounder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Leads Routes
app.get('/api/leads', async (req, res) => {
  try {
    const leads = await Lead.find({}).sort({ date: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/api/leads', async (req, res) => {
  try {
    const newLead = new Lead(req.body);
    await newLead.save();
    res.status(201).json(newLead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.put('/api/leads/:id', async (req, res) => {
  try {
    const updatedLead = await Lead.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedLead) return res.status(404).json({ error: 'Lead not found' });
    res.json(updatedLead);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

app.delete('/api/leads/:id', async (req, res) => {
  try {
    const deletedLead = await Lead.findByIdAndDelete(req.params.id);
    if (!deletedLead) return res.status(404).json({ error: 'Lead not found' });
    res.json({ message: 'Lead deleted successfully', id: req.params.id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.error('Database connection error:', err);
  });
