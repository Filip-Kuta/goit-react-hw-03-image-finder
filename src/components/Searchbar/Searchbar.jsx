import React, { useState } from 'react';
import './Searchbar.css';

function Searchbar({ onSearch }) {
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleSubmit = (e) => {
      e.preventDefault();
      onSearch(searchTerm);
    };
  
    return (
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search images..."
        />
        <button type="submit" className="search-button">
          🔍
        </button>
      </form>
    );
  }
  
  export default Searchbar;
