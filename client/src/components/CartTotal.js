import React, { useState } from "react";

import { Button, Col, Modal } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { loadStripe } from "@stripe/stripe-js";

import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";

import { returnTotalPrice } from "../utils/functions";
import { clearCart } from "../store/actions/products";
import { Link } from "react-router-dom";
import CheckoutForm from "./CheckoutForm";
const stripePromise = loadStripe(
  "pk_test_51HPs8eF5vCvOfbi0ih0DYo5AAIUw4CzfK8b0lIuUUjvFyJFtPrUS1htlnjiAjXLEflm3v0w4mTGCxIAWomEyYr0k00i4RkV4sR"
);

const CartTotal = ({ cart }) => {
  let totalPrice = returnTotalPrice(cart);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Col lg={6} xs={6}>
        <p className="cart__total-text">Total:</p>
      </Col>
      <Col lg={6} xs="6" style={{ textAlign: "right" }}>
        <span className="cart__total-value">€{totalPrice}</span>
      </Col>
      <Col lg={12} xs="12" className="mb-3">
        {parseInt(totalPrice) === 0 ? null : (
          <Button
            className="btn cart__total-btn-checkout  btn-block"
            onClick={handleShow}
            block
          >
            Proceed To Checkout
          </Button>
        )}
        <Link
          to="/products"
          className="btn cart__total-btn-continue-shopping  btn-block"
        >
          Continue Shopping
        </Link>
      </Col>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Total Price: {totalPrice}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Elements stripe={stripePromise}>
            <CheckoutForm totalPrice={totalPrice} handleClose={handleClose} />
          </Elements>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CartTotal;
