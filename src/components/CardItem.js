import React from 'react';
import './CardItem.css';

const CardItem = (props) => {
  const { title, description, price, imageSrc } = props;

  return (
    <div className="card">
      <img src={imageSrc} alt="Product" className="card-image" />
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <p className="card-price">${price}</p>
      <button className="buy-button">Buy Now</button>
    </div>
  );
};

export default CardItem;