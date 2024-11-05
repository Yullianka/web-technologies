import React from 'react';
import './Selection.css';

const Selection = ({ setSelectedModel, setSortOrder, modelOptions, sortOptions }) => {
  return (
    <div className="sort-section">
      <select onChange={(e) => setSelectedModel(e.target.value)}>
        {modelOptions.map((model) => (
          <option key={model.value} value={model.value}>
            {model.label}
          </option>
        ))}
      </select>
      <select onChange={(e) => setSortOrder(e.target.value)}>
        {sortOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Selection;
