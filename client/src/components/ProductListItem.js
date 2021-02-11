import React from "react";
import { Col, NavLink, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./ProductListItem.css";
const ProductListItem = ({ product }) => {
  return (
    <Col sm={12} lg={3} sm={6} className="product-card mb-3">
      <div className="product-card__img-container">
        <img
          src={product.images[0]}
          className="img-fluid product-card__img"
          alt=""
        />
        <div className="product-card__overlay">
          <button className="btn-primary btn-lg btn product-card__btn btn-search mb-2">
            <i class="fas fa-search"></i>
          </button>
          <button className="btn-primary btn-lg btn product-card__btn btn-like mb-2">
            <i class="far fa-heart"></i>
          </button>
        </div>
        <div className="product-card__cart-input-overlay">
          <button className="btn-primary btn btn-lg product-card__btn-cart mb-2">
            <i class="fas fa-cart-plus "></i>
          </button>
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
