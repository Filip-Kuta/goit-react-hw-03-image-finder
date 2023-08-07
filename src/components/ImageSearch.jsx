// ImageSearch.jsx
import React, { useState } from 'react';
import './ImageSearch.css';

function ImageSearch({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <div className="image-search-container">
      <form onSubmit={handleSubmit} className="image-search-form">
        <input
          type="text"
          placeholder="Search images..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="image-search-input"
        />
        <button type="submit" className="image-search-button">
          🔍 
        </button>
      </form>
    </div>
  );
}

export default ImageSearch;
