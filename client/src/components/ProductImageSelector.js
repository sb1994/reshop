import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";

const ProductImageSelector = ({ images }) => {
  const [previewImages, setPreviewImages] = useState([]);
  const [currentImgIndex, setCurrentImgIndex] = useState(0);

  useEffect(() => {
    let selectedImages = images.slice(0, 4).map((i) => {
      return i;
    });
    setPreviewImages(selectedImages);
  }, [images]);

  const setCurrentImg = (index) => {
    setCurrentImgIndex(index);
  };

  return (
    <>
      <Row>
        <Col className="product-detail__main-img-section " lg={12}>
          <img
            src={previewImages[currentImgIndex]}
            alt=""
            className="img-fluid product-detail__main-img"
          />
        </Col>
        <Col lg={12} className="mt-3 p-3">
          <Row>
            {previewImages.map((img, index) => (
              <Col
                lg={3}
                sm={3}
                xs={3}
                className="product-detail__preview-img-container"
                onClick={() => setCurrentImg(index)}
              >
                <img
                  src={img}
                  alt=""
                  className="img-fluid product-detail__preview-img"
                />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ProductImageSelector;
