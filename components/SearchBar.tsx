// src/components/SearchBar.tsx

import React, { useState } from 'react';

interface SearchBarProps {
  onSearch: (city: string, country: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (city && country) {
      onSearch(city, country);
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city"
          style={{ padding: '10px', fontSize: '16px', width: '200px', marginRight: '10px' }}
        />
        <input
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          placeholder="Enter country"
          style={{ padding: '10px', fontSize: '16px', width: '200px', marginRight: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
