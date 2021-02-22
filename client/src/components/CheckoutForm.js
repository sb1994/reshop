import React, { useState } from "react";

import {
  Elements,
  CardElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { returnTotalPrice } from "../utils/functions";
import axios from "axios";
import { useDispatch } from "react-redux";
import { clearCart } from "../store/actions/products";
const stripePromise = loadStripe(
  "pk_test_51HPs8eF5vCvOfbi0ih0DYo5AAIUw4CzfK8b0lIuUUjvFyJFtPrUS1htlnjiAjXLEflm3v0w4mTGCxIAWomEyYr0k00i4RkV4sR"
);

const CheckoutForm = ({ totalPrice, handleClose }) => {
  const [paimentSuccess, setPaimentSuccess] = useState(false);
  const stripe = useStripe();
  const elements = useElements();
  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card: elements.getElement(CardElement),
    });
    if (!error) {
      const { id } = paymentMethod;

      try {
        const response = await axios.post("/api/products/purchase", {
          id,
          amount: totalPrice,
        });
        let { charge } = response.data;

        if (charge.status === "succeeded") {
          console.log("Payment success");
          setPaimentSuccess(true);
          dispatch(clearCart());
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <>
      {paimentSuccess ? (
        <h1>Thank you for your purchase</h1>
      ) : (
        <form
          onSubmit={handleSubmit}
          style={{ maxWidth: "400px", margin: "0 auto" }}
        >
          <h2>Total Price: {totalPrice}</h2>
          <CardElement />
          <button
            type="submit"
            className="btn cart__total-btn-checkout mt-3"
            disabled={!stripe}
          >
            Pay
          </button>
        </form>
      )}
    </>
  );
};

export default CheckoutForm;
