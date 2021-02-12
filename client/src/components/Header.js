import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import "./Header.css";
const Header = () => {
  const [addBorderShadow, setAddBorderShadow] = useState(false);

  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);

  const checkScrollStatus = () => {
    if (window.scrollY > 50) {
      setAddBorderShadow(true);
      console.log(addBorderShadow);
    } else {
      setAddBorderShadow(false);
    }
  };

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", checkScrollStatus);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", checkScrollStatus);
    };
  });

  return (
    <Navbar
      sticky="top"
      className={`header ${addBorderShadow ? "header__border-shadow" : null}`}
      expand="sm"
    >
      <Container>
        <Navbar.Brand href="/" className="header__logo">
          <span>ReShop</span>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto header__nav">
            <Nav.Link className="header__nav-link mr-2" href="/products">
              <span>Products</span>
            </Nav.Link>
            <Nav.Link
              className="header__nav-link header__nav-link-cart mr-2"
              href="/cart"
            >
              <span className="header__nav-link-cart--number">
                <span className="fas fa-cart-plus header__cart-icon"></span>(
                {cart.cart.length})
              </span>
            </Nav.Link>
            <Nav.Link className="header__nav-link" href="/login">
              <span>Login</span>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
