import { useNavigate } from "react-router-dom";
import useCartContext from "../../../hooks/useCartContext";
import useWishlistContext from "../../../hooks/useWishlistContext";
import GiftCard from "../../Home/shared/GiftCard";
import Loader from "../../Ui/Loader";
import InfoMessage from "../../Ui/InfoMessage";
import "../Design/index.css";

const WishlistItem = () => {
  const navigate = useNavigate();

  const { addToCart } = useCartContext();
  const { wishlist, isWishlistPending, wishlistError, removeFromWishlist } =
    useWishlistContext();

  return (
    <>
      <div
        className="account-heading d-flex align-items-center"
        data-aos="fade-up"
        data-aos-delay="2500"
        data-aos-duration="1000"
      >
        <h5 className="mb-5">My Favorites</h5>
      </div>
      <div className="col-xxl-9 col-xl-8 col-lg-8 col-md-12 ">
        <div className="row justify-content-center">
          {isWishlistPending ? (
            <Loader />
          ) : wishlistError ? (
            <InfoMessage text={wishlistError} />
          ) : !wishlist?.length ? (
            <InfoMessage text="No gifts to show" />
          ) : (
                  wishlist.map((item, index) => {
                    if(item?.productDetails?.minQty > 0) {
                      return (
                        <GiftCard
                          key={item?.productDetails._id}
                          image={item?.productDetails.image}
                          inbuildImage={item?.item?.image}
                          title={
                            item?.item?.productDetails?.nameEn || item?.productDetails?.title
                          }
                          category={item?.categoryName}
                          price={`${item?.productDetails?.priceInSAR?.toFixed(2)}`}
                          onClick={() => navigate(`/gifts/${item?.productDetails?.productTag || item?.productTag}/${item?.productDetails?.nameEn || item?.productDetails?.title}/${item?.productDetails?._id}`)}
                          addToCart={() =>
                            item?.item?.productDetails?.productTag === "bitaqty"
                              ? addToCart(item?.productDetails?._id)
                              : addToCart(item?.productDetails?._id, false, "binance")
                          }
                          removeFromWishlist={() => removeFromWishlist(item?.productDetails?._id)}
                          isInWishlist
                          smallGrid={true}
                        />
                      );
                    }
            })
          )}
        </div>
      </div>
    </>
  );
};
export default WishlistItem;
