import { useState } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { experience, selectedDate, selectedTime, quantity: initialQuantity } = location.state || {};
  
  const [quantity, setQuantity] = useState(initialQuantity || 1);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    promoCode: '',
    agreedToTerms: false
  });
  
  const [promoStatus, setPromoStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError('');
  };

  const validatePromoCode = async () => {
    if (!formData.promoCode) return;
    
    try {
      const response = await axios.post('http://localhost:5000/api/promo/validate', {
        promoCode: formData.promoCode
      });
      setPromoStatus(response.data);
    } catch (error) {
      console.error('Error validating promo code:', error);
      setPromoStatus({ 
        valid: false, 
        message: 'Invalid promo code' 
      });
    }
  };

  const handleSubmit = async () => {
    if (!formData.fullName || !formData.email || !formData.agreedToTerms) {
      setError('Please fill in all required fields and agree to the terms');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const subtotal = experience.price * quantity;
      const tax = Math.round(subtotal * 0.06);
      const finalTotal = subtotal + tax;

      // First log the request payload for debugging
      const payload = {
        experience: {
          _id: experience._id,
          title: experience.title
        },
        selectedDate,
        selectedTime,
        quantity,
        total: finalTotal,
        fullName: formData.fullName,
        email: formData.email,
        promoCode: formData.promoCode || null
      };
      console.log('Sending booking request:', payload);
      
      const response = await axios.post('http://localhost:5000/api/bookings', payload);

      navigate('/booking-confirmed', { 
        state: { 
          bookingRef: response.data.bookingRef,
          experience,
          selectedDate,
          selectedTime,
          quantity,
          total: finalTotal,
          fullName: formData.fullName
        }
      });
    } catch (error) {
      console.error('Error creating booking:', error);
      setError('Failed to create booking. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!experience || !selectedDate) {
    navigate('/');
    return null;
  }

  const subtotal = experience.price * quantity;
  const tax = Math.round(subtotal * 0.06);
  const total = subtotal + tax;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="max-w-5xl mx-auto">
        <Link to="/" className="inline-flex items-center text-gray-500 mb-6">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          <span className="text-lg">Checkout</span>
        </Link>

        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-[1fr,400px] gap-8">
          {/* Left Column - Form */}
          <div className="space-y-6 p-8 bg-[#EFEFEF]">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">Full name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-[#DDDDDD] border-none focus:outline-none focus:ring-1 focus:ring-gray-300"
                  placeholder="Your name"
                  required
                />
              </div>

              <div>
                <label className="block text-gray-600 text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full p-3 rounded-lg bg-[#DDDDDD] border-none focus:outline-none focus:ring-1 focus:ring-gray-300"
                  placeholder="Your email"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-medium mb-2">Number of People</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-full p-3 rounded-lg bg-[#DDDDDD] border-none focus:outline-none focus:ring-1 focus:ring-gray-300"
                required
              />
            </div>

            <div>
              <label className="block text-gray-600 text-sm font-medium mb-2">Promo code</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="promoCode"
                  value={formData.promoCode}
                  onChange={handleInputChange}
                  className="flex-1 p-3 rounded-lg bg-[#DDDDDD] border-none focus:outline-none focus:ring-1 focus:ring-gray-300"
                  placeholder="Enter promo code"
                />
                <button 
                  type="button"
                  onClick={validatePromoCode}
                  disabled={!formData.promoCode}
                  className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:bg-gray-700 disabled:text-gray-100 disabled:cursor-not-allowed"
                >
                  Apply
                </button>
              </div>
              {promoStatus && (
                <p className={`mt-2 text-sm ${promoStatus.valid ? 'text-green-600' : 'text-red-600'}`}>
                  {promoStatus.message}
                </p>
              )}
            </div>

            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="checkbox"
                name="agreedToTerms"
                checked={formData.agreedToTerms}
                onChange={handleInputChange}
                className="h-4 w-4 text-black rounded border-gray-300 focus:ring-black"
                required
              />
              <span className="text-sm text-gray-600">I agree to the terms and safety policy</span>
            </label>
          </div>

          {/* Right Column - Summary */}
          <div className="p-6 rounded-lg h-fit bg-[#EFEFEF]">
            <div className="space-y-4">
              <div className="flex justify-between items-center text-base">
                <span className="text-gray-500">Experience</span>
                <span className="font-medium">{experience.title}</span>
              </div>

              <div className="flex justify-between items-center text-base">
                <span className="text-gray-500">Date</span>
                <span className="font-medium">{new Date(selectedDate).toLocaleDateString()}</span>
              </div>

              <div className="flex justify-between items-center text-base">
                <span className="text-gray-500">Time</span>
                <span className="font-medium">{selectedTime}</span>
              </div>

              <div className="flex justify-between items-center text-base">
                <span className="text-gray-500">Qty</span>
                <span className="font-medium">{quantity}</span>
              </div>

              <div className="flex justify-between items-center text-base">
                <span className="text-gray-500">Subtotal</span>
                <span className="font-medium">₹{subtotal}</span>
              </div>

              <div className="flex justify-between items-center text-base">
                <span className="text-gray-500">Taxes</span>
                <span className="font-medium">₹{tax}</span>
              </div>

              {promoStatus?.valid && (
                <div className="flex justify-between items-center text-green-600 text-base">
                  <span>Promo Discount</span>
                  <span>-₹{Math.round(subtotal * (promoStatus.discount.value / 100))}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-lg pt-2 border-t">
                <span className="font-bold">Total</span>
                <span className="font-bold">₹{total}</span>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={!formData.fullName || !formData.email || !formData.agreedToTerms || loading}
                className={`w-full py-3 rounded-lg font-semibold text-base transition-colors ${
                  formData.fullName && formData.email && formData.agreedToTerms && !loading
                  ? 'bg-[#FFD643] text-black hover:bg-[#FFE375]'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {loading ? 'Processing...' : 'Pay and Confirm'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;