import React, { useEffect, useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { addItemToCart } from '../../action/cartAction';
import './IphoneDetails.css';

const IphoneDetails = () => {
  const { iphoneID } = useParams();
  const [item, setItem] = useState(null);
  const [color, setColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [availableStock, setAvailableStock] = useState(0);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/iphones/${iphoneID}`);
        setItem(response.data);
      } catch (error) {
        console.error('Error fetching item:', error);
        setItem(null);
      }
    };
    fetchItem();
  }, [iphoneID]);

  useEffect(() => {
    if (color && item) {
      const colorStock = item.stock.find(stockItem => stockItem.color === color);
      const itemInCart = cartItems.find(cartItem => cartItem.id === item.id && cartItem.color === color);
      const cartQuantity = itemInCart ? itemInCart.quantity : 0;
      setAvailableStock(colorStock ? colorStock.quantity - cartQuantity : 0);
    }
  }, [color, item, cartItems]);

  if (!item) {
    return <div>Item not found</div>;
  }

  const handleAddToCart = () => {
    if (!color) {
      alert('Будь ласка, виберіть колір товару перед додаванням до кошика');
      return;
    }
    if (quantity > availableStock) {
      alert('Обрана кількість перевищує доступну на складі');
      return;
    }
    dispatch(addItemToCart({ ...item, color, quantity }));
  };

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

        <select value={color} onChange={(e) => setColor(e.target.value)}>
          <option value="">Select a color</option>
          {item.stock.map(stockItem => (
            <option key={stockItem.color} value={stockItem.color}>
              {stockItem.color} 
            </option>
          ))}
        </select>

        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          disabled={!color}
        >
          {[...Array(availableStock).keys()].map(num => (
            <option key={num + 1} value={num + 1}>{num + 1}</option>
          ))}
        </select>

        <div className="modal-buttons">
          <NavLink className="link_to_catalog" to="/catalog">
            Back
          </NavLink>
          <button onClick={handleAddToCart}>Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default IphoneDetails;
