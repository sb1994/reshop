import React, { useEffect } from "react";
import { Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";

//reducer action
import { getProducts } from "../store/actions/products";
const ProductsListScreen = () => {
  const dispatch = useDispatch();

  const product = useSelector((state) => state.product);
  let { products, loading, totalProducts } = product;

  console.log(products);
  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <div className="row products mt-5">
      <Col xs={12}>Search Filter</Col>
      <Col xs={12}>Page Pagination</Col>
      <Col xs={12}>Products</Col>
      <Col xs={12}>Page Pagination</Col>
    </div>
  );
};

export default ProductsListScreen;
