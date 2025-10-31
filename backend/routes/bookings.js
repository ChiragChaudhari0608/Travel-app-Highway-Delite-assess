import express from 'express';
import Booking from '../models/Booking.js';
import Experience from '../models/Experience.js';

const router = express.Router();

// Create new booking
router.post('/', async (req, res) => {
  try {
    const { experienceId, date, numberOfPeople, userName, userEmail, promoCode } = req.body;

    // Check experience availability
    const experience = await Experience.findById(experienceId);
    if (!experience) {
      return res.status(404).json({ message: 'Experience not found' });
    }

    // Find the selected slot
    const slot = experience.slots.find(
      (slot) => new Date(slot.date).toISOString().split('T')[0] === new Date(date).toISOString().split('T')[0]
    );

    if (!slot || slot.availableSpots < numberOfPeople) {
      return res.status(400).json({ message: 'Slot not available or insufficient spots' });
    }

    // Calculate total price (implement promo code logic here)
    let totalPrice = experience.price * numberOfPeople;
    if (promoCode) {
      // Add promo code logic here
      if (promoCode === 'SAVE10') {
        totalPrice = totalPrice * 0.9; // 10% discount
      } else if (promoCode === 'FLAT100') {
        totalPrice = totalPrice - 100; // ₹100 off
      }
    }

    // Create booking
    const booking = new Booking({
      experienceId,
      userName,
      userEmail,
      date,
      numberOfPeople,
      totalPrice,
      promoCode
    });

    // Update slot availability
    slot.availableSpots -= numberOfPeople;
    if (slot.availableSpots === 0) {
      slot.isBooked = true;
    }
    await experience.save();

    const savedBooking = await booking.save();
    res.status(201).json(savedBooking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;