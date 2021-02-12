import React from "react";
import { Col, NavLink, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductToCart,
  removeProductFromCart,
} from "../store/actions/products";
import { Link } from "react-router-dom";
import "./ProductListItem.css";
import { useHistory } from "react-router-dom";
const ProductListItem = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const history = useHistory();
  let productAlreadyAddedToCart = cart.cart.some(
    (item) => item.id === product._id
  );
  const handleShowProduct = () => {
    history.push(`/products/${product._id}`);
  };
  const handleLikeProduct = () => {
    console.log("this needs to be done");
  };
  const handleAddToCart = () => {
    console.log("this needs to be done");
    console.log(productAlreadyAddedToCart);
    dispatch(addProductToCart(product));
  };
  const handleRemoveFromCart = () => {
    dispatch(removeProductFromCart(product._id));
  };
  return (
    <Col sm={12} lg={3} sm={6} className="product-card mb-3">
      <div className="product-card__img-container">
        <img
          src={product.images[0]}
          className="img-fluid product-card__img"
          alt=""
        />
        <div className="product-card__overlay">
          <button
            className="btn-primary btn-lg btn product-card__btn btn-search mb-2"
            onClick={handleShowProduct}
          >
            <i class="fas fa-search"></i>
          </button>
          <button className="btn-primary btn-lg btn product-card__btn btn-like mb-2">
            <i class="far fa-heart"></i>
          </button>
        </div>
        <div className="product-card__cart-input-overlay">
          {!productAlreadyAddedToCart ? (
            <button
              className="btn btn-lg product-card__btn-cart mb-2"
              onClick={handleAddToCart}
            >
              <i class="fa fa-cart-arrow-down"></i>
            </button>
          ) : (
            <button
              className="btn btn-lg product-card__btn-cart product-card__btn-cart--active  mb-2"
              onClick={handleRemoveFromCart}
            >
              <i class="fas fa-shopping-cart"></i>
            </button>
          )}
        </div>
      </div>
      <Col sm={12} className="text-center">
        <Link
          to={`/products/${product._id}`}
          className={"product-card__product-name-link"}
        >
          {product.name}
        </Link>
        <p className="product-card__product-price">€{product.price}</p>
      </Col>
    </Col>
  );
};

export default ProductListItem;
