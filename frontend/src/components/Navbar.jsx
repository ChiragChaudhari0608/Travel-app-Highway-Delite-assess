import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    // Pass the search query to HomePage through URL params
    navigate(`/?search=${encodeURIComponent(query)}`);
  };

  return (
    <nav className="py-3 px-4 md:px-6 border-b border-gray-100">
      <div className="max-w-[1200px] mx-auto">
        {/* Desktop View */}
        <div className="hidden md:flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <img src="/assets/HighwayDeliteLogo.png" alt="Logo" className="h-[65px] w-[130px]" />
          </Link>
          
          <div className="flex-1 max-w-[420px] mx-6 flex gap-2">
            <div className="relative flex-1">
              <input
                type="search"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search destinations, experiences, and more..."
                className="w-full pl-12 pr-4 py-2 text-[15px] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300 placeholder-gray-500"
              />
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <img src="/assets/search.svg" alt="Search" className="h-5 w-5" />
              </div>
            </div>
            <button className="bg-[#FFD643] text-black font-medium text-[15px] px-4 py-2 rounded-lg hover:bg-[#FFE375] transition-colors">
              Search
            </button>
          </div>
        </div>

        {/* Mobile View */}
        <div className="md:hidden space-y-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex-shrink-0">
              <img src="/assets/HighwayDeliteLogo.png" alt="Logo" className="h-[50px] w-[100px]" />
            </Link>
          </div>
          
          <div className="flex gap-2">
            <div className="relative flex-1">
              <input
                type="search"
                value={searchQuery}
                onChange={handleSearch}
                placeholder="Search experiences..."
                className="w-full pl-12 pr-4 py-2 text-[15px] rounded-lg border border-gray-200 focus:outline-none focus:border-gray-300 placeholder-gray-500"
              />
              <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none">
                <img src="/assets/search.svg" alt="Search" className="h-5 w-5" />
              </div>
            </div>
            <button className="bg-[#FFD643] text-black font-medium text-[15px] px-4 py-2 rounded-lg hover:bg-[#FFE375] transition-colors">
              Search
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;