import React from "react";
import { Col, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import {
  getNextProductListPage,
  getPreviousProductListPage,
} from "../store/actions/products";
const ProductsPagination = () => {
  const dispatch = useDispatch();
  const product = useSelector((state) => state.product);
  let {
    products,
    loading,
    next,
    current,
    previous,
    text,
    totalPages,
    totalProducts,
    type,
  } = product;

  const handleGetPreviousPage = () => {
    dispatch(getPreviousProductListPage(previous, text));
  };
  const handleGetNextPage = () => {
    dispatch(getNextProductListPage(next, text));
  };

  return (
    <Row>
      <Col lg={12} xs={12} className="text-center">
        <button
          style={{ background: "#ff4545", color: "#fff" }}
          disabled={current <= 0 ? true : false}
          className={`btn  btn-previous mr-2`}
          onClick={handleGetPreviousPage}
        >
          {"<"}
        </button>
        <span>
          {current + 1} / {totalPages} pages
        </span>
        <button
          style={{ background: "#ff4545", color: "#fff" }}
          disabled={next === totalPages}
          className="btn btn-next ml-2"
          onClick={handleGetNextPage}
        >
          {">"}
        </button>
      </Col>
    </Row>
  );
};

export default ProductsPagination;
