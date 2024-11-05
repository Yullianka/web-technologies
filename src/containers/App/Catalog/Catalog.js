import React, { useState } from 'react';
import CardItem from '../../../components/CardItem';
import CatalogFilter from '../../../components/Filter/CatalogFilter';

const Catalog = ({ cardItems }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState('all');
  const [sortOrder, setSortOrder] = useState('low-to-high');

  const filteredItems = cardItems.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesModel = selectedModel === 'all' || item.title.toLowerCase().includes(selectedModel);
    return matchesSearch && matchesModel;
  });

  const sortedItems = filteredItems.sort((a, b) => {
    return sortOrder === 'low-to-high' ? a.price - b.price : b.price - a.price;
  });

  return (
    <div className="container">
      <CatalogFilter 
        setSearchQuery={setSearchQuery} 
        setSelectedModel={setSelectedModel} 
        setSortOrder={setSortOrder} 
      />
      <div className="cards-container">
        {sortedItems.map(item => (
          <CardItem
            key={item.id}
            title={item.title}
            description={item.description}
            price={item.price}
            imageSrc={item.imageSrc}
            iphoneID={item.id}
          />
        ))}
      </div>
    </div>
  );
};

export default Catalog;
