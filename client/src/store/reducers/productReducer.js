import * as types from "../actions/types";

const initialState = {
  selectedProduct: {},
  products: [],
  relatedProducts: [],
  totalPages: 0,
  next: 0,
  previous: 0,
  totalProducts: 0,
  filteredProducts: [],
  current: 0,
  type: "",
  text: "",
};

const product = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_PRODUCTS:
      return {
        ...state,
        next: action.payload.next,
        previous: action.payload.previous,
        products: action.payload.products,
        totalProducts: action.payload.totalProducts,
        current: action.payload.current,
        totalPages: action.payload.totalPages,
      };
    case types.SET_PRODUCT_FILTER_TYPE:
      return {
        ...state,
      };
    case types.SET_PRODUCT_FILTER_TEXT:
      return {
        ...state,
        products: action.payload.products,
        next: action.payload.next,
        previous: action.payload.previous,
        totalProducts: action.payload.totalProducts,

        totalPages: action.payload.totalPages,
        current: action.payload.current,
        loading: false,
      };
    case types.SET_PRODUCT_FILTER_TEXT_REQUEST:
      return {
        ...state,
        text: action.payload.text,
        loading: true,
      };
    case types.GET_PRODUCT:
      return {
        ...state,
        selectedProduct: action.payload.selectedProduct,
        relatedProducts: action.payload.relatedProducts,
        loading: false,
      };
    case types.GET_PRODUCT_REQUEST:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};

export default product;
