import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import experiences data
import { experiences } from './data/experiences.js';

// Routes
app.get('/api/experiences', (req, res) => {
  res.json(experiences);
});

app.get('/api/experiences/:id', (req, res) => {
  const experience = experiences.find(exp => exp._id === req.params.id);
  if (!experience) {
    return res.status(404).json({ message: 'Experience not found' });
  }
  res.json(experience);
});

// Health check route
app.get('/', (req, res) => {
  res.send('BookIt API is running');
});

// Booking Model Schema
const bookingSchema = new mongoose.Schema({
  experienceId: String,
  experienceTitle: String,
  fullName: String,
  email: String,
  date: Date,
  time: String,
  quantity: Number,
  total: Number,
  promoCode: String,
  bookingRef: {
    type: String,
    required: true,
    unique: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Booking = mongoose.model('Booking', bookingSchema);

// Booking Route
app.post('/api/bookings', async (req, res) => {
  try {
    const {
      experience,
      selectedDate,
      selectedTime,
      quantity,
      total,
      fullName,
      email,
      promoCode
    } = req.body;

    // Generate booking reference
    const bookingRef = 'HUF' + Math.random().toString(36).substr(2, 3) + '&SO';

    const booking = new Booking({
      experienceId: experience._id,
      experienceTitle: experience.title,
      fullName,
      email,
      date: new Date(selectedDate),
      time: selectedTime,
      quantity,
      total,
      promoCode,
      bookingRef
    });

    await booking.save();
    res.status(201).json({ bookingRef });
  } catch (error) {
    console.error('Error creating booking:', error);
    res.status(500).json({ message: 'Error creating booking' });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});