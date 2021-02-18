import { motion } from "framer-motion";
import React, { useEffect } from "react";
import { Col, Row } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import ProductListItem from "../components/ProductListItem";
import ProductsFilter from "../components/ProductsFilter";
import ProductsPagination from "../components/ProductsPagination";

import "./ProductsListScreen.css";
//reducer action
import { getProducts } from "../store/actions/products";
const ProductsListScreen = () => {
  const productsVariants = {
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

  const dispatch = useDispatch();

  const product = useSelector((state) => state.product);
  let { products, loading, totalProducts } = product;

  useEffect(() => {
    dispatch(getProducts());
  }, []);
  return (
    <motion.div
      variants={productsVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="row products mt-5"
    >
      <Col lg={12} className="products__filter-text-section">
        <ProductsFilter />
      </Col>

      <Col xs={12} className="mb-3">
        <ProductsPagination />
      </Col>

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
      <Col xs={12}>
        <ProductsPagination />
      </Col>
    </motion.div>
  );
};

export default ProductsListScreen;
