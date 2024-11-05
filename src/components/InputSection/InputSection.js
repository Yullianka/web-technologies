import React from 'react';
import './InputSection.css';

const InputSection = ({ setSearchQuery, searchQuery }) => {
  return (
    <div className="catalog-filters">
      <input 
        type="text" 
        placeholder="Search iPhones"
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
};

export default InputSection;
