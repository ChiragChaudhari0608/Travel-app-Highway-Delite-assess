import { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from 'axios';

const HomePage = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get('search') || '';

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        setError(null);
        const response = await axios.get('http://localhost:5000/api/experiences');
        setExperiences(response.data);
      } catch (err) {
        console.error('Error fetching experiences:', err);
        setError('Failed to load experiences. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="spinner" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Oops! Something went wrong</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="inline-flex items-center px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors"
          >
            <svg className="w-4 h-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clipRule="evenodd" />
            </svg>
            Retry
          </button>
        </div>
      </div>
    );
  }

  // Filter experiences based on search query
  const filteredExperiences = experiences.filter(experience =>
    experience.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container mx-auto px-4 py-2">
      <h1 className="text-3xl font-bold mb-8">Discover Experiences</h1>
      <div className="grid grid-cols-1 pb-10 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExperiences.map((experience) => (
          <div key={experience._id} className="bg-white rounded-lg shadow-soft overflow-hidden flex flex-col h-full">
            <img 
              src={experience.imageUrl} 
              alt={experience.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 flex-grow">
              <div className="h-full flex flex-col">
                <div className="flex flex-row justify-between items-start gap-2">
                  <h2 className="text-lg font-semibold mb-1 flex-grow line-clamp-2">{experience.title}</h2>
                  <span className="inline-block flex-shrink-0 bg-gray-100 text-sm text-gray-600 px-3 py-1 rounded-md whitespace-nowrap">{experience.location}</span>
                </div>
                <div className="mt-4 flex-grow">
                  <p className="text-sm text-gray-500 line-clamp-3">{experience.description}</p>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100">
              <div className="flex justify-between items-center">
                <span className="text-gray-900 font-bold">From ₹{experience.price}</span>
                <button 
                  onClick={() => navigate(`/experience/${experience._id}`)} 
                  className="bg-[#FFD643] text-gray-900 px-4 py-2 rounded-md font-semibold hover:bg-[#FFE375] transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;