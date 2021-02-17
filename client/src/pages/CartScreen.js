import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

import CartListItems from "../components/CartListItems";
import "./CartScreen.css";
import { returnTotalPrice } from "../utils/functions";
const CartScreen = () => {
  const cartVariants = {
    hidden: {
      opacity: 0,
      x: "-100vw",
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        delay: 0.2,
        duration: 0.3,
      },
    },
    exit: {
      x: "100vw",
      transition: {
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  };
  const cart = useSelector((state) => state.cart);
  let totalPrice = returnTotalPrice(cart.cart);

  return (
    <motion.div
      variants={cartVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="m-3 "
    >
      <Row>
        <Col lg={12}>
          <Row>
            <Col
              xs={12}
              className="cart__labels mb-3"
              style={{ background: "#ff4545", color: "white" }}
            >
              <Row>
                <Col xs={6} className="p-3">
                  <span>Product</span>
                </Col>
                <Col xs={3} className="p-3 ">
                  <span>Quantity</span>
                </Col>
                <Col xs={3} className="p-3" style={{ textAlign: "right" }}>
                  <span>Subtotal</span>
                </Col>
              </Row>
            </Col>
            {cart.cart.length > 0 ? (
              cart.cart.map((product) => (
                <CartListItems product={product} key={product.id} />
              ))
            ) : (
              <>
                <Col xs={12}>
                  <h4>
                    You have nothing in your cart click <Link to="/">Here</Link>{" "}
                    to keep shopping
                  </h4>
                </Col>
              </>
            )}
          </Row>
        </Col>

        {/* <CartTotal cart={cart.cart} /> */}
        <Col lg={4} className="mt-3 cart__total">
          <Row className="pt-3">
            <Col lg={6} xs={6}>
              <p className="cart__total-text">Total:</p>
            </Col>
            <Col lg={6} xs="6" style={{ textAlign: "right" }}>
              <span className="cart__total-value">€{totalPrice}</span>
            </Col>
            <Col lg={12} xs="12" className="mb-3">
              <button className="btn cart__total-btn-checkout  btn-block">
                Proceed To Checkout
              </button>
              <Link
                to="/products"
                className="btn cart__total-btn-continue-shopping  btn-block"
              >
                Continue Shopping
              </Link>
            </Col>
          </Row>
        </Col>
      </Row>
    </motion.div>
  );
};

export default CartScreen;
