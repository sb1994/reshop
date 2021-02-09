import axios from "axios";
import * as types from "./types";

export const getProducts = () => async (dispatch) => {
  let { data } = await axios.get(`/api/products`);
  console.log(data);
  let { products, next, previous, totalProducts, current, totalPages } = data;

  dispatch({
    type: types.GET_PRODUCTS,
    payload: { products, next, previous, totalProducts, current, totalPages },
  });
};
export const setProductFilterType = (type, products, text) => (dispatch) => {
  // console.log(type, products, text)
  dispatch({
    type: types.SET_PRODUCT_FILTER_TYPE,
    payload: type,
  });
};
export const setProductFilterText = (text, products, type) => async (
  dispatch
) => {
  // console.log(type, products, text)
  dispatch({
    type: types.SET_PRODUCT_FILTER_TEXT_REQUEST,
    payload: { text },
  });
  let { data } = await axios.get(`/api/products/search/filter?search=${text}`);
  let { products, next, previous, totalProducts, current, totalPages } = data;
  dispatch({
    type: types.SET_PRODUCT_FILTER_TEXT,
    payload: { products, next, previous, totalProducts, current, totalPages },
  });
};
export const getNextProductListPage = (nextPage, text) => async (dispatch) => {
  // console.log();
  // console.log(next, text);
  dispatch({
    type: types.SET_PRODUCT_FILTER_TEXT_REQUEST,
    payload: { text },
  });
  let { data } = await axios.get(
    `/api/products/search/filter?search=${text}&page=${nextPage}`
  );
  console.log(data);

  // let { data } = await axios.get(`/api/products/search/filter?search=${text}`);
  let { products, next, previous, totalPages, current, totalProducts } = data;
  console.log(current, previous, next);
  dispatch({
    type: types.SET_PRODUCT_FILTER_TEXT,
    payload: { products, next, previous, totalPages, current, totalProducts },
  });
};
export const getPreviousProductListPage = (previousPage, text) => async (
  dispatch
) => {
  dispatch({
    type: types.SET_PRODUCT_FILTER_TEXT_REQUEST,
    payload: { text },
  });
  let { data } = await axios.get(
    `/api/products/search/filter?search=${text}&page=${previousPage}`
  );
  console.log(data);

  // let { data } = await axios.get(`/api/products/search/filter?search=${text}`);
  let { products, next, previous, totalPages, current, totalProducts } = data;
  console.log(current, previous, previous);
  dispatch({
    type: types.SET_PRODUCT_FILTER_TEXT,
    payload: { products, next, previous, totalPages, current, totalProducts },
  });
};
export const getSelectedProduct = (id) => async (dispatch) => {
  dispatch({
    type: types.GET_PRODUCT_REQUEST,
  });

  let { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: types.GET_PRODUCT,
    payload: {
      selectedProduct: data.product,
      relatedProducts: data.relatedProducts,
    },
  });
};

export const setProductCart = (cartToken) => (dispatch) => {
  dispatch({
    type: types.SET_USER_CART,
    payload: cartToken,
  });
};
export const addProductToCart = (product) => (dispatch) => {
  //cookie solution
  let cart = localStorage.getItem("cart");

  if (cart === null) {
    console.log("cart token doesnt exist");
    let quantity = 1;
    let cartProduct = {
      id: product._id,
      quantity,
      product,
    };
    let updatedCart = [];
    updatedCart.push(cartProduct);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch({
      type: types.ADD_PRODUCT_TO_CART,
      payload: updatedCart,
    });
  } else {
    //parses the cart token into an array
    let parsedCart = JSON.parse(cart);

    //checks wether the product is already in the cart
    let productAlreadyAddedToCart = parsedCart.some(
      (item) => item.id === product._id
    );

    if (!productAlreadyAddedToCart) {
      // if the product doesnt exist in the cart then it gets pushed into the cart
      let quantity = 1;
      let cartProduct = {
        id: product._id,
        quantity,
        product,
      };
      let updatedCart = parsedCart;
      updatedCart.push(cartProduct);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      dispatch({
        type: types.ADD_PRODUCT_TO_CART,
        payload: updatedCart,
      });
    }
  }
};

export const removeProductFromCart = (product) => (dispatch) => {
  //cookie solution
  let cart = localStorage.getItem("cart");

  if (cart === null) {
    console.log("cart token doesnt exist");
  } else {
    //   //parses the cart token into an array
    let parsedCart = JSON.parse(cart);

    console.log(product._id);
    //removing the product from the cart array and returning the updated
    //list of products
    // console.log(parsedCart);
    let updatedCart = parsedCart.filter((item) => item.id !== product);

    console.log(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch({
      type: types.REMOVE_PRODUCT_FROM_CART,
      payload: updatedCart,
    });
  }
};
export const clearCart = () => (dispatch) => {
  //cookie solution
  let cart = localStorage.getItem("cart");

  if (cart !== null) {
    // console.log(cart)
    localStorage.removeItem("cart");
    let updatedCart = [];
    dispatch({
      type: types.CLEAR_CART,
      payload: updatedCart,
    });
  }
};

export const addToProductQuantity = (id) => (dispatch) => {
  //cookie solution
  let cart = localStorage.getItem("cart");
  let parsedCart = JSON.parse(cart);
  //gets the index of where the product sits in the array
  let index = parsedCart.findIndex((item) => item.id === id);
  let updatedCart = parsedCart;
  updatedCart[index].quantity = updatedCart[index].quantity + 1;
  localStorage.setItem("cart", JSON.stringify(updatedCart));
  dispatch({
    type: types.ADD_TO_PRODUCT_QUANTITY,
    payload: updatedCart,
  });
};
export const removeFromProductQuantity = (id) => (dispatch) => {
  //cookie solution
  let cart = localStorage.getItem("cart");

  let parsedCart = JSON.parse(cart);
  // //gets the index of where the product sits in the array
  let index = parsedCart.findIndex((item) => item.id === id);
  let updatedCart = parsedCart;
  updatedCart[index].quantity = updatedCart[index].quantity - 1;
  //checks if the product need to be removed from the car if quantity is set to zero
  if (updatedCart[index].quantity === 0) {
    updatedCart = updatedCart.filter((item) => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch({
      type: types.REMOVE_FROM_PRODUCT_QUANTITY,
      payload: updatedCart,
    });
  } else {
    // updatedCart[index].quantity = updatedCart[index].quantity - 1
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    dispatch({
      type: types.REMOVE_FROM_PRODUCT_QUANTITY,
      payload: updatedCart,
    });
  }
  // let updatedCart = parsedCart
};
