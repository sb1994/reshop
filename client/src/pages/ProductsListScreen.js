import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import ProductListItem from "../components/ProductListItem";

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
      <Col xs={12}>
        <Row>
          {loading ? (
            <Col>
              <h1>Loading</h1>
            </Col>
          ) : (
            <Col>
              {products.length === 0 ? (
                <>
                  <h1>No Products with this name</h1>
                </>
              ) : (
                <>
                  <Row>
                    {products.map((product, i) => (
                      <ProductListItem product={product} key={i} />
                    ))}
                  </Row>
                </>
              )}
            </Col>
          )}
        </Row>
      </Col>
      <Col xs={12}>Products</Col>
      <Col xs={12}>Page Pagination</Col>
    </div>
  );
};

export default ProductsListScreen;
