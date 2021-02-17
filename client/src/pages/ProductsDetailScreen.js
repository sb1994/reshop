// import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { getSelectedProduct } from "../store/actions/products";
import "../components/ProductDetailScreen.css";
import "./ProductsScreenDetail.css";
import {
  addProductToCart,
  removeProductFromCart,
} from "../store/actions/products";

import "../components/ProductListItem.css";
import ProductImageSelector from "../components/ProductImageSelector";
const ProductsDetailScreen = ({ match }) => {
  const dispatch = useDispatch();
  let { id } = match.params;
  const product = useSelector((state) => state.product);
  let cart = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(getSelectedProduct(id));
  }, []);
  const handleAddToCart = () => {
    dispatch(addProductToCart(product.selectedProduct));
  };
  const handleRemoveFromCart = () => {
    dispatch(removeProductFromCart(id));
  };

  let productAlreadyAddedToCart = cart.cart.some((item) => item.id === id);
  console.log(productAlreadyAddedToCart);
  let { loading, selectedProduct, relatedProducts } = product;
  return (
    <div className="row product-detail pt-5">
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <Col lg={4} sm={6} className="product-detail__img-section">
            {selectedProduct.images !== undefined && (
              <ProductImageSelector images={selectedProduct.images} />
            )}
          </Col>
          <Col lg={8} sm={6} className="product-detail__details-section">
            <h1 className="product-detail__title">{selectedProduct.name}</h1>
            <div className="product-detail__price">
              €{selectedProduct.price}
            </div>

            {!productAlreadyAddedToCart ? (
              <button className="btn btn-buy " onClick={handleAddToCart}>
                Add Cart
              </button>
            ) : (
              <button
                className="btn btn-warning "
                onClick={handleRemoveFromCart}
              >
                Remove
              </button>
            )}
          </Col>
        </>
      )}
      <Col lg={6} className="product-detail__img-section"></Col>
      <Col lg={6} className="product-detail__details-section"></Col>
    </div>
  );
};

export default ProductsDetailScreen;
