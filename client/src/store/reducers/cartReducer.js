import * as types from "../actions/types";

const initialState = {
  cart: [],
};
const cart = (state = initialState, action) => {
  switch (action.type) {
    case types.CLEAR_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case types.SET_USER_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case types.ADD_PRODUCT_TO_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case types.REMOVE_PRODUCT_FROM_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case types.ADD_TO_PRODUCT_QUANTITY:
      return {
        ...state,
        cart: action.payload,
      };
    case types.REMOVE_FROM_PRODUCT_QUANTITY:
      return {
        ...state,
        cart: action.payload,
      };
    default:
      return state;
  }
};

export default cart;
