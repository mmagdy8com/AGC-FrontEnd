import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Design/GiftCardDetailsComponent.css";
import {
  FacebookIcon,
  FacebookShareButton,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import toast from "react-hot-toast";

const GiftCardDetailsComponent = ({
  image,
  title,
  price,
  currency,
  addItemToWishliat,
  giftId,
  likeProduct,
  removeItemFromWishlist,
  addItemInCart,
  outerImage,
  description
}) => {
  const { pathname } = useLocation();

  const navigate = useNavigate();

  const handleBuyNow = async () => {
    await addItemInCart(giftId);
    navigate("/checkout");
  };

  return (
    <div className="gift-card-details justify-content-between align-items-center">
      <div className="gift-card-details__image">
        <div>
          <img
            style={{ objectFit: "contain" }}
            src={
              outerImage
                ? `${process.env.REACT_APP_IMAGE_URL}/${outerImage}`
                : image
                ? image
                : "/assets/Giftcard/default-gift-card.jpg"
            }
            alt={title}
            onError={(e) => {
              e.target.src = "/assets/Giftcard/default-gift-card.jpg";
            }}
          />
        </div>
        <h3 style={{ display: "flex", alignItems: "center" }}>
          {title}
          {pathname && (
            <div
              style={{
                display: "flex",
                maxHeight: "50px",
                marginLeft: "30px",
                alignItems: "center",
              }}
            >
              <FacebookShareButton
                url={`${process.env.REACT_APP_FRONTEND_BASE_URL}${pathname}`}
                quote={"Check out the Card!"}
                hashtag="#ArabGiftCards"
              >
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton
                url={`${process.env.REACT_APP_FRONTEND_BASE_URL}${pathname}`}
                quote={"Check out the Card!"}
                hashtag="#ArabGiftCards"
                style={{ marginLeft: "15px" }}
              >
                <TwitterIcon size={32} round />
              </TwitterShareButton>

              <p
                style={{
                  fontSize: "15px",
                  marginBottom: "0px",
                  marginLeft: "15px",
                  cursor: "pointer",
                }}
                onClick={() => {
                  navigator.clipboard.writeText(
                    `${process.env.REACT_APP_FRONTEND_BASE_URL}${pathname}`
                  );
                  toast.success("Linked Copied!");
                }}
              >
                Copy link
              </p>
            </div>
          )}
        </h3>
      </div>

      <div className="like d-flex  rounded-circle p likeIcon wishlistIcob">
        {likeProduct ? (
          <>
            <img
              src={"/assets/Style/heart.png"}
              alt="like"
              className="liked"
              onClick={() => removeItemFromWishlist(giftId)}
            />
          </>
        ) : (
          <>
            <img
              src={"/assets/Trendinggiftcard/like.svg"}
              alt="like"
              onClick={() => addItemToWishliat(giftId)}
            />
          </>
        )}
      </div>
      <div className="gift-card-details__desc">
        <p>{description}</p>
        <div className="gift-card-details__buttons">
          <div>
            <h3>
              <strong>{price}</strong>
              <strong>{currency}</strong>
            </h3>
          </div>
          {/* <div className="gift-card-details__offer">
            Pay with cryptocurrency and <strong>save 10%</strong>
          </div> */}
          <div
            className="add-top-cart-icon d-flex justify-content-center align-items-center cart-icon "
            onClick={() => addItemInCart(giftId)}
          >
            <img
              src={"/assets/Trendinggiftcard/gift-card-icon.svg"}
              alt="gift-card-icon"
            />
            <span>Add</span>
          </div>
        </div>
        <button
          onClick={handleBuyNow}
          type="submit"
          className="btn btn-primary deatilBtn"
        >
          Buy Now
        </button>
      </div>
    </div>
  );
};

export default GiftCardDetailsComponent;
