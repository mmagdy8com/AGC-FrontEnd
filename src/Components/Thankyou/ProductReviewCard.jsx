import React from "react";

const ProductReviewCard = () => {
  return (
    <div className="product-review-container">
      <div className="product-review-img">
        <img src="./assets/gift1.png" alt="" />
      </div>
      <div className="product-review-desc">
        <p className="product-review-name"></p>
        <p className="product-review-price"></p>
        <textarea
          className="product-review-text"
          cols="50"
          rows="3"
          placeholder="write your review here..."
        ></textarea>
      </div>
    </div>
  );
};

export default ProductReviewCard;
