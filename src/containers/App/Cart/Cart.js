import { useSelector, useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { removeItemFromCart, updateItemQuantity } from '../../../action/cartAction';
import sad from '../../../Icons/sad.jpg';
import './Cart.css';

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  const handleRemove = (itemID, color) => {
    dispatch(removeItemFromCart(itemID, color));
  };

  const handleQuantityChange = (itemID, color, newQuantity) => {
    dispatch(updateItemQuantity(itemID, color, newQuantity));
  };

  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div className="cart-container">
      <h1 className="cart-header">Shopping Cart</h1>
      {cartItems.length === 0 ? (
        <div className="cart-empty">
          <p>Your cart is empty</p>
          <img src={sad} alt="Sad face" className="empty-cart-image" />
        </div>
      ) : (
        <div className="cart-items">
          {cartItems.map((item) => (
            <div key={`${item.id}-${item.color}`} className="cart-item">
              <img src={item.imageSrc} alt={item.title} />
              <h2>{item.title}</h2>
              <p>Color: {item.color}</p>
              <p>Price: ${item.price}</p>
              <div className="quantity-controls">
                <button
                  onClick={() =>
                    item.quantity > 1
                      ? handleQuantityChange(item.id, item.color, item.quantity - 1)
                      : handleRemove(item.id, item.color)
                  }
                  className="quantity-button"
                >
                  -
                </button>
                <span>{item.quantity}</span>
                <button
                  onClick={() =>
                    handleQuantityChange(item.id, item.color, item.quantity + 1)
                  }
                  className="quantity-button"
                >
                  +
                </button>
              </div>
              <button
                className="remove-button"
                onClick={() => handleRemove(item.id, item.color)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {cartItems.length > 0 && (
        <>
          <div className="cart-summary">
            <p>Total: ${calculateTotalPrice()}</p>
          </div>

          <div className="cart-actions">
            <button className="checkout-button">Proceed to Checkout</button>
            <NavLink className="continue-button" to="/catalog">
              Continue Shopping
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
