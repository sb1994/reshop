// import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { getSelectedProduct } from "../store/actions/products";
import "../components/ProductDetailScreen.css";

import {
  addProductToCart,
  removeProductFromCart,
} from "../store/actions/products";
import ProductImageSelector from "../components/ProductImageSelector";
const ProductsDetailScreen = ({ match }) => {
  const dispatch = useDispatch();

  let { id } = match.params;
  const product = useSelector((state) => state.product);
  const cart = useSelector((state) => state.cart);

  // console.log(productAlreadyAddedToCart);
  useEffect(() => {
    dispatch(getSelectedProduct(id));
    console.log(product.selectedProduct);
  }, []);

  let productAlreadyAddedToCart = cart.cart.some((item) => item.id === id);
  console.log(productAlreadyAddedToCart);
  let { loading, selectedProduct, relatedProducts } = product;
  return (
    <div className="row product-detail pt-5">
      {loading ? (
        <div>Loading</div>
      ) : (
        <>
          <Col lg={4} className="product-detail__img-section">
            <ProductImageSelector images={selectedProduct.images} />
          </Col>
          <Col lg={8}>
            <h1>{selectedProduct.name}</h1>
            <h2>Product Details</h2>
          </Col>
        </>
        // <Row>
        //   <Col lg={12}>
        //     <Row className="mt-3">
        //       <Col lg={6} className="pb-3" style={{ maxHeight: "350px" }}>
        //         {selectedProduct.images !== undefined ? (
        //           <ProductImages images={selectedProduct.images} />
        //         ) : null}
        //       </Col>
        //       <Col lg={6} className="mt-3">
        //         <h2 className="product-title">{selectedProduct.name}</h2>
        //         <h4 className="product-price">€ {selectedProduct.price}</h4>
        //         {!productAlreadyAddedToCart ? (
        //           <button className="btn  btn-buy" onClick={handleAddToCart}>
        //             Add Cart
        //           </button>
        //         ) : (
        //           <button
        //             className="btn btn-warning btn-block"
        //             onClick={handleRemoveFromCart}
        //           >
        //             Remove
        //           </button>
        //         )}
        //       </Col>
        //     </Row>
        //   </Col>
        //   <Col lg={12}>
        //     <h3>Related Products</h3>

        //     <Row>
        //       {relatedProducts.map((product) => (
        //         <ProductsListItem key={product._id} product={product} />
        //       ))}
        //     </Row>
        //   </Col>
        // </Row>
      )}
      <Col lg={6} className="product-detail__img-section"></Col>
      <Col lg={6} className="product-detail__details-section"></Col>
    </div>
  );
};

export default ProductsDetailScreen;
