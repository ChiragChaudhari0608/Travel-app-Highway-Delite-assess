import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';


export const api = {
  // Experiences
  getAllExperiences: () => 
    axios.get(`${BASE_URL}/api/experiences`),
  
  getExperienceById: (id) => 
    axios.get(`${BASE_URL}/api/experiences/${id}`),
  
  // Bookings
  createBooking: (bookingData) => 
    axios.post(`${BASE_URL}/api/bookings`, bookingData),

  // Promo codes
  validatePromoCode: (promoCode) => 
    axios.post(`${BASE_URL}/api/promo/validate`, { promoCode })
};