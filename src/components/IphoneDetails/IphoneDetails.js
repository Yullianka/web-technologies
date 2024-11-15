import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import './IphoneDetails.css';

const IphoneDetails = ({ cardItems }) => {
  const { iphoneID } = useParams();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const foundItem = cardItems.find(i => i.id === iphoneID);
    if (foundItem) {
      setItem(foundItem);
    } else {
      setItem(null);
    }
  }, [iphoneID, cardItems]); 

  if (!item) {
    return <div>Item not found</div>;
  }

  return (
    <div className="iphone-details-container">
        <div className='container'>
        <h2 className="iphone-details-title">{item.title}</h2>
        <img src={item.imageSrc} alt={item.title} className="iphone-details-image" />
      </div>
        <div className='info-block'>
            <p className="iphone-details-info">Capacity: 128GB</p>
            <p className="iphone-details-info">Max Speed: 5G</p> 
            <p className="iphone-details-price">Price: ${item.price}</p>
            <p className="iphone-details-info">Description: {item.description}</p>
        
            <select>
                    <option value="">Select a color</option>
                    <option value="red">Red</option>
                    <option value="blue">Blue</option>
                    <option value="green">Green</option>
                    </select>
                    <select>
                    <option value="">Select a кількість</option>
                    <option value="red">1</option>
                    <option value="blue">2</option>
                    <option value="green">3</option>
                    </select>
                <div className="modal-buttons">
                    <NavLink className="link_to_catalog" to="/catalog">
                    Back
                    </NavLink>
                    <button>Add to Cart</button>
          </div>
        </div>
    </div>
  );
};

export default IphoneDetails;
