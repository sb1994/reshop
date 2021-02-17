import { motion } from "framer-motion";
import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import "./CartListItem.css";
import {
  addToProductQuantity,
  removeFromProductQuantity,
  removeProductFromCart,
} from "../store/actions/products";

const CartListItems = ({ product }) => {
  const dispatch = useDispatch();
  const handleRemoveProductFromCart = () => {
    console.log("Removing from cart");
    console.log(product);
    dispatch(removeProductFromCart(product.id));
  };
  const handleRemoveProductQuantity = () => {
    console.log("removing one from product quantity");
    dispatch(removeFromProductQuantity(product.id));
  };
  const handleAddProductQuantity = () => {
    console.log("adding one from product quantity");
    dispatch(addToProductQuantity(product.id));
  };

  return (
    <motion.div className="col-12 col-lg-12 col-sm-12 cart-item  mb-3">
      <Row>
        <Col lg={3} xs={3} className="cart-item__img-section">
          <img src={product.product.images[0]} className="img-fluid" />
        </Col>
        <Col xs={3} lg={3} className="cart-item__details-section pt-4">
          <p className="cart-item__name"> {product.product.name}</p>
          <p className="cart-item__price">Price: €{product.product.price}</p>
          <span
            className="cart-item__btn-remove"
            onClick={handleRemoveProductFromCart}
          >
            Remove
          </span>
        </Col>
        <Col xs={3} lg={3} className="pt-4 cart-item__quantity-inputs">
          <button
            className="btn btn-secondary  mr-2 btn-plus"
            onClick={
              product.quantity === 1
                ? handleRemoveProductFromCart
                : handleRemoveProductQuantity
            }
          >
            -
          </button>
          <span>{product.quantity}</span>
          <button
            className="btn btn-secondary ml-2 btn-plus"
            onClick={handleAddProductQuantity}
          >
            +
          </button>
        </Col>

        <Col
          className="pt-4"
          xs={3}
          lg={3}
          style={{ textAlign: "right", fontSize: "1.25rem" }}
        >
          <span> €{product.quantity * product.product.price}</span>
        </Col>

        {/* <Col lg={8} xs={8} className="mb-3 mt-3">
          <Row>
            <Col lg={8}>
              <Row>
                <Col xs={12} lg={9}>
                  <p> {product.product.name}</p>
                </Col>
              </Row>
            </Col>
            <Col lg={4}>
              <Row>
                <Col xs={8} lg={12}>
                  <button
                    className="btn btn-secondary mr-1 "
                    onClick={
                      product.quantity === 1
                        ? handleRemoveProductFromCart
                        : handleRemoveProductQuantity
                    }
                  >
                    -
                  </button>
                  <span>{product.quantity}</span>
                  <button
                    className="btn btn-secondary ml-1"
                    onClick={handleAddProductQuantity}
                  >
                    +
                  </button>
                </Col>
               
                <Col xs={12}>
                  <span
                    className="cart-item__btn-remove"
                    onClick={handleRemoveProductFromCart}
                  >
                    Remove
                  </span>
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>  */}
      </Row>
    </motion.div>
  );
};

export default CartListItems;
