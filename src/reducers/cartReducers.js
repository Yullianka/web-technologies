import {
  ADD_ITEM_TO_CART,
  REMOVE_ITEM_FROM_CART,
  SET_CART,
  UPDATE_ITEM_QUANTITY,
} from '../action/cartAction';
import { saveCartToLocalStorage } from '../action/cartAction';

const initialState = {
  items: [],
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_ITEM_TO_CART:
      const existingItemIndex = state.items.findIndex(
        (item) => item.id === action.payload.id && item.color === action.payload.color
      );
      let updatedItems;

      if (existingItemIndex !== -1) {
        updatedItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        updatedItems = [...state.items, { ...action.payload }];
      }

      saveCartToLocalStorage(updatedItems);
      return {
        ...state,
        items: updatedItems,
      };

    case REMOVE_ITEM_FROM_CART:
      const itemsAfterRemove = state.items.filter(
        (item) => !(item.id === action.payload.itemID && item.color === action.payload.color)
      );

      saveCartToLocalStorage(itemsAfterRemove);
      return {
        ...state,
        items: itemsAfterRemove,
      };

    case SET_CART:
      return {
        ...state,
        items: action.payload,
      };

    case UPDATE_ITEM_QUANTITY:
      const itemsAfterUpdate = state.items.map((item) =>
        item.id === action.payload.id && item.color === action.payload.color
          ? { ...item, quantity: action.payload.quantity }
          : item
      );

      saveCartToLocalStorage(itemsAfterUpdate);
      return {
        ...state,
        items: itemsAfterUpdate,
      };

    default:
      return state;
  }
};

export default cartReducer;
