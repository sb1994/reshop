import { combineReducers } from "redux";
import productReducer from "./productReducer";
import cart from "./cartReducer";

export default combineReducers({
  product: productReducer,
  cart,
});
