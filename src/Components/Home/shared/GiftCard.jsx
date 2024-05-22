import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GiftCard = ({
  image,
  inbuildImage,
  title,
  category,
  price,
  onClick,
  addToCart,
  addToWishlist,
  removeFromWishlist,
  isInWishlist,
  productId,
  smallGrid = false,
  binanceGrid = false,
}) => {
  const navigate = useNavigate();

  const [isUserLogin, setIsUserLogin] = useState(false);

  useEffect(() => {
    setIsUserLogin(localStorage.getItem("userId") ? true : false);
  }, []);

  return (
    <div
      className={
        smallGrid
          ? "col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12"
          : "col-xxl-4 px-3 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-9"
      }
      key={productId}
    >
      <div
        className="gift-card-inner"
        data-aos="zoom-out"
        data-aos-delay="1000"
        data-aos-duration="1000"
      >
        <div className="card position-relative">
          <img
            src={
              image
                ? `${process.env.REACT_APP_IMAGE_URL}/${image}`
                : inbuildImage
                ? inbuildImage
                : "/assets/Giftcard/default-gift-card.jpg"
            }
            className="card-img-top"
            alt="gift"
            onError={(e) => {
              e.target.src = "/assets/Giftcard/default-gift-card.jpg";
            }}
            onClick={onClick}
          />

          <div className="like d-flex align-items-center rounded-circle justify-content-center position-absolute likeIcon">
            {isInWishlist ? (
              <>
                <img
                  src={"/assets/Style/heart.png"}
                  alt="like"
                  className="liked"
                  onClick={removeFromWishlist}
                />
              </>
            ) : (
              <>
                <img
                  src={"/assets/Trendinggiftcard/like.svg"}
                  alt="like"
                  onClick={addToWishlist}
                />
              </>
            )}
          </div>
          <div className="card-body position-relative">
            <div className="names">
            <h5 className="card-title">{title}</h5>
            <span className="card-dip">{category}</span></div>
        
            <p className="card-text" style={{position: 'absolute', bottom: '7px'}}>
              {price}
              <span className="product-currency">SAR</span>
            </p>

            <div
              className={`add-top-cart-icon position-absolute d-flex align-items-center justify-content-center`}
              onClick={addToCart}
            >
              <img
                src={"/assets/Trendinggiftcard/gift-card-icon.svg"}
                alt="gift-card-icon"
              />
              <span>Add</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GiftCard;
