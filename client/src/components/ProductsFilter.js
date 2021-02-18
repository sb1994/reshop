import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import { Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { setProductFilterText } from "../store/actions/products";

const ProductsFilter = () => {
  const dispatch = useDispatch();
  const handleFilterText = (e) => {
    console.log(e.target.value);

    dispatch(setProductFilterText(e.target.value));
  };

  return (
    <>
      <div className="form-group">
        <input
          className="form-control"
          type="text"
          name="filterText"
          placeholder="Search Text"
          onChange={handleFilterText}
        />
      </div>
    </>
  );
};

export default ProductsFilter;
