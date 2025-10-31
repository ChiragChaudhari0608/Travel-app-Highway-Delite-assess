import axios from 'axios';

const BASE_URL = 'http://localhost:5000/api';

export const api = {
  // Experiences
  getAllExperiences: () => 
    axios.get(`${BASE_URL}/experiences`),
  
  getExperienceById: (id) => 
    axios.get(`${BASE_URL}/experiences/${id}`),
  
  // Bookings
  createBooking: (bookingData) => 
    axios.post(`${BASE_URL}/bookings`, bookingData),
  
  // Promo codes
  validatePromoCode: (promoCode) => 
    axios.post(`${BASE_URL}/promo/validate`, { promoCode })
};