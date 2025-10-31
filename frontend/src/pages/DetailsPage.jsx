import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const DetailsPage = () => {
  const { id } = useParams();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();

  // Sample dates (October 22-26)
  const dates = [
    { date: "Oct 22", value: "2025-10-22" },
    { date: "Oct 23", value: "2025-10-23" },
    { date: "Oct 24", value: "2025-10-24" },
    { date: "Oct 25", value: "2025-10-25" },
    { date: "Oct 26", value: "2025-10-26" }
  ];

  // Sample time slots
  const timeSlots = [
    { time: "07:00 am", spots: 4 },
    { time: "09:00 am", spots: 2 },
    { time: "11:00 am", spots: 3 },
    { time: "01:00 pm", spots: "Sold out" }
  ];

  useEffect(() => {
    const fetchExperience = async () => {
      try {
        setError(null);
        const response = await axios.get(`http://localhost:5000/api/experiences/${id}`);
        setExperience(response.data);
      } catch (err) {
        console.error('Error fetching experience:', err);
        setError('Failed to load experience details.');
      } finally {
        setLoading(false);
      }
    };

    fetchExperience();
  }, [id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <p className="text-red-600 mb-4">{error}</p>
      </div>
    );
  }

  if (error || !experience) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Experience not found</h2>
          <p className="text-gray-600 mb-4">{error || "This experience doesn't exist or has been removed."}</p>
          <Link to="/" className="text-blue-500 hover:text-blue-600">← Back to Experiences</Link>
        </div>
      </div>
    );
  }

  const subtotal = experience.price * quantity;
  const tax = Math.round(subtotal * 0.06); // 6% tax
  const total = subtotal + tax;

  return (
    <div className="container mx-auto px-4 py-6 max-w-6xl">
      {/* Back Button */}
      <Link to="/" className="inline-flex items-center text-gray-600 mb-6">
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Details
      </Link>

      <div className="grid grid-cols-12 gap-8">
        {/* Main Content Area (8 columns) */}
        <div className="col-span-12 lg:col-span-8">
          {/* Image */}
          <div className="mb-8">
            <img 
              src={experience.imageUrl} 
              alt={experience.title}
              className="w-full rounded-lg object-cover h-[400px]"
            />
          </div>

          {/* Title and Description */}
          <div className="mb-8">
            <h1 className="text-2xl font-semibold mb-4">{experience.title}</h1>
            <p className="text-gray-600">{experience.description}</p>
          </div>

          {/* Date Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Choose date</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {dates.map((date) => (
                <button
                  key={date.value}
                  onClick={() => setSelectedDate(date.value)}
                  className={`px-4 py-2 rounded-lg ${
                    selectedDate === date.value 
                    ? 'bg-[#FFD643] text-black' 
                    : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {date.date}
                </button>
              ))}
            </div>
          </div>

          {/* Time Selection */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold mb-4">Choose time</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {timeSlots.map((slot) => (
                <button
                  key={slot.time}
                  onClick={() => setSelectedTime(slot.time)}
                  disabled={slot.spots === "Sold out"}
                  className={`px-4 py-2 rounded-lg flex flex-col items-center ${
                    selectedTime === slot.time
                    ? 'bg-[#FFD643] text-black'
                    : slot.spots === "Sold out"
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  <span>{slot.time}</span>
                  <span className="text-sm">
                    {typeof slot.spots === 'number' ? `${slot.spots} left` : slot.spots}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* About Section */}
          <div>
            <h2 className="text-lg font-semibold mb-4">About</h2>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-gray-600 text-sm">
                Scenic routes, trained guides, and safety briefing. Minimum age 10.
              </p>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Pricing (4 columns) */}
        <div className="col-span-12 lg:col-span-4">
          <div className="bg-gray-50 rounded-lg p-6 sticky top-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Starts at</span>
              <span className="font-semibold">₹{experience.price}</span>
            </div>
            
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Quantity</span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-6 h-6 flex items-center justify-center border rounded"
                >
                  -
                </button>
                <span>{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-6 h-6 flex items-center justify-center border rounded"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-600">Taxes</span>
              <span>₹{tax}</span>
            </div>

            <div className="flex justify-between items-center text-lg font-semibold mb-4">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <button 
              className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                selectedDate && selectedTime
                ? 'bg-[#FFD643] text-black hover:bg-[#FFE375]'
                : 'bg-gray-200 text-gray-600 cursor-not-allowed'
              }`}
              onClick={() => {
                if (selectedDate && selectedTime) {
                  navigate('/checkout', { 
                    state: { 
                      experience,
                      selectedDate,
                      selectedTime,
                      quantity,
                      total
                    } 
                  });
                }
              }}
              disabled={!selectedDate || !selectedTime}
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailsPage;