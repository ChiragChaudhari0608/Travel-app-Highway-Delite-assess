import { useLocation, Link } from 'react-router-dom';

const BookingConfirmedPage = () => {
  const location = useLocation();
  const { refId } = location.state || {};

  return (
    <div className="m-12 flex flex-col items-center justify-center p-4">
      {/* Success Icon */}
      <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mb-6">
        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            strokeWidth={3} 
            d="M5 13l4 4L19 7" 
          />
        </svg>
      </div>

      {/* Confirmation Text */}
      <h1 className="text-3xl font-semibold text-gray-900 mb-2">
        Booking Confirmed
      </h1>

      {/* Reference ID */}
      <p className="text-gray-600 mb-8">
        Ref ID: {refId || 'HUF56&SO'}
      </p>

      {/* Back to Home Button */}
      <Link
        to="/"
        className="px-6 py-3 bg-gray-100 text-gray-800 rounded-lg hover:bg-gray-200 transition-colors"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default BookingConfirmedPage;