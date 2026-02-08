import React from 'react';
import './Search.css';

const Search = () => {
  return (
    <div className="search-container">
      <input className="search-input" type="text" placeholder="Search..." />
      <button className="search-button">🔍</button>
    </div>
  );
};

export default Search;