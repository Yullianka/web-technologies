import React from 'react';
import { useNavigate } from 'react-router-dom';
import './CardItem.css';

const CardItem = (props) => {
  const { title, description, price, imageSrc, iphoneID } = props;
  const navigate = useNavigate();

  const handleMoreDetails = () => {
    navigate(`/catalog/${iphoneID}`);
  };

  return (
    <div className="card">
      <img src={imageSrc} alt="Product" className="card-image" />
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <p className="card-price">${price}</p>
      <button className="buy-button" onClick={handleMoreDetails}>More details</button>
    </div>
  );
};

export default CardItem;
