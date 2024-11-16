export const ADD_ITEM_TO_CART = 'ADD_ITEM_TO_CART';
export const REMOVE_ITEM_FROM_CART = 'REMOVE_ITEM_FROM_CART';
export const SET_CART = 'SET_CART';
export const UPDATE_ITEM_QUANTITY = 'UPDATE_ITEM_QUANTITY';

export const addItemToCart = (item) => (dispatch, getState) => {
  const { cart } = getState();
  const existingItem = cart.items.find(
    (cartItem) => cartItem.id === item.id && cartItem.color === item.color
  );

  if (!item.color) {
    alert('Будь ласка, виберіть колір товару перед додаванням до кошика');
    return;
  }


  const availableStock = item.stock.find(stockItem => stockItem.color === item.color).quantity;
  const currentQuantityInCart = existingItem ? existingItem.quantity : 0;
  const totalQuantity = currentQuantityInCart + item.quantity;

  if (totalQuantity > availableStock) {
    alert('Неможливо додати більше товару, ніж є на складі');
    return;
  }

  if (existingItem) {

    dispatch({
      type: UPDATE_ITEM_QUANTITY,
      payload: { id: item.id, color: item.color, quantity: totalQuantity },
    });
  } else {

    dispatch({
      type: ADD_ITEM_TO_CART,
      payload: { ...item },
    });
  }


  localStorage.setItem('cart', JSON.stringify(getState().cart.items));
};

export const removeItemFromCart = (itemID, color) => {
  return {
    type: REMOVE_ITEM_FROM_CART,
    payload: { itemID, color },
  };
};

export const updateItemQuantity = (id, color, quantity) => (dispatch, getState) => {
  const { cart } = getState();
  const item = cart.items.find(
    (cartItem) => cartItem.id === id && cartItem.color === color
  );

  if (!item) return;


  const availableStock = item.stock.find(stockItem => stockItem.color === color).quantity;
  if (quantity > availableStock) {
    alert('Неможливо додати більше товару, ніж є на складі');
    return;
  }

  dispatch({
    type: UPDATE_ITEM_QUANTITY,
    payload: { id, color, quantity },
  });


  saveCartToLocalStorage(getState().cart.items);
};

export const saveCartToLocalStorage = (cart) => {
  localStorage.setItem('cart', JSON.stringify(cart));
};

export const loadCartFromLocalStorage = () => {
  return (dispatch) => {
    const savedCart = JSON.parse(localStorage.getItem('cart')) || [];
    dispatch({ type: SET_CART, payload: savedCart });
  };
};
