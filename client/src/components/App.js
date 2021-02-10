import React from "react";

import { Route, Switch, useLocation } from "react-router-dom";

// app screen components
import LoginScreen from "../pages/LoginScreen";
import LandingScreen from "../pages/LandingScreen";
import CartScreen from "../pages/CartScreen";
import CheckoutScreen from "../pages/CheckoutScreen";
import RegisterScreen from "../pages/RegisterScreen";
import ProductsListScreen from "../pages/ProductsListScreen";
import ProductsDetailScreen from "../pages/ProductsDetailScreen";

import { setProductCart } from "../store/actions/products";

import { Container, Row } from "react-bootstrap";

import "./App.css";

import store from "../store";
import Header from "./Header";

if (localStorage.cart) {
  //checking if there is already products in the cart
  let { cart } = localStorage;
  store.dispatch(setProductCart(JSON.parse(cart)));
}

const App = () => {
  //we use loaction so we can style the nav bar
  const location = useLocation();

  return (
    <>
      <Header />
      <Container style={{ height: "100vh" }}>
        <Switch location={location} key={location.key}>
          <Route exact path="/">
            <LandingScreen />
          </Route>
          <Route path="/login">
            <LoginScreen />
          </Route>
          <Route path="/cart">
            <CartScreen />
          </Route>
          <Route path="/register">
            <RegisterScreen />
          </Route>
          <Route exact path="/products" component={ProductsListScreen} />

          <Route exact path="/checkout" component={CheckoutScreen} />

          <Route exact path="/:id" component={ProductsDetailScreen} />
        </Switch>
      </Container>
    </>
  );
};

export default App;
