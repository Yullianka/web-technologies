import React, { useEffect, useState } from 'react';
import CardItem from '../../../components/CardItem';
import CatalogFilter from '../../../components/Filter/CatalogFilter';
import Loader from '../../../components/Loader/Loader';
import { fetchItems } from '../../../service/api';
// import './Catalog.css'

const Catalog = () => {
  const [cardItems, setCardItems] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState('all');
  const [sortOrder, setSortOrder] = useState('low-to-high');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadItems = async () => {
      setLoading(true);
      try {
        const response = await fetchItems(searchQuery, selectedModel, sortOrder);
        setTimeout(() => {
          setCardItems(response.data);
          setLoading(false);
        }, 1000);
        
      } catch (error) {
        console.error('Error fetching items:', error);
        setLoading(false);
      }
    };

    loadItems();
  }, [searchQuery, selectedModel, sortOrder]);

  return (
    <div className="container">
      <CatalogFilter 
        setSearchQuery={setSearchQuery} 
        setSelectedModel={setSelectedModel} 
        setSortOrder={setSortOrder} 
      />
      {loading ? (
        <Loader />
      ) : (
        <div className="cards-container">
          {cardItems.map(item => (
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
      )}
    </div>
  );
};

export default Catalog;
