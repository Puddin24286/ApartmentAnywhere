const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '../../public')));

// Routes
app.get('/api/listings', (req, res) => {
  // Mock data for now
  const listings = [
    {
      id: 1,
      title: 'Cozy Apartment in Downtown',
      description: 'Beautiful apartment perfect for professionals',
      price: 1200,
      location: 'Downtown',
      bedrooms: 1,
      bathrooms: 1,
      amenities: ['WiFi', 'Laundry', 'Parking']
    },
    {
      id: 2,
      title: 'Spacious 2BR Near Park',
      description: 'Large apartment with great views',
      price: 1800,
      location: 'Central Park Area',
      bedrooms: 2,
      bathrooms: 2,
      amenities: ['Gym', 'Pool', 'Pet Friendly']
    }
  ];
  res.json(listings);
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`ApartmentAnywhere server running on port ${PORT}`);
  console.log(`Visit http://localhost:${PORT} to view the application`);
});