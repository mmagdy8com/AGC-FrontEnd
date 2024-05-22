import GiftCardDetailsComponent from "./GiftCardDetailsComponent";
import useApi from "../../hooks/useApi";
import useCartContext from "../../hooks/useCartContext";
import Loader from "../Ui/Loader";
import InfoMessage from "../Ui/InfoMessage";
import useIsInWishlist from "../../hooks/useIsInWishlist";
import useWishlistContext from "../../hooks/useWishlistContext";

const BinanceGiftCardDetails = ({ id }) => {
  const { addToCart } = useCartContext();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext();

  const {
    data: gifts,
    isPending: isGiftsPending,
    error: giftsError,
  } = useApi(`/getAdvancedBinanceGifts?_id=${id}`);

  const { data: giftsWithWishListButton } = useIsInWishlist(gifts, wishlist);

  if (isGiftsPending) return <Loader />;

  if (giftsError) {
    return <InfoMessage text={giftsError} />;
  }

  const giftCard = gifts[0];
  return (
    <>
      <GiftCardDetailsComponent
        image={giftCard?.productDetails?.image}
        outerImage={giftCard?.image}
        title={giftCard?.title}
        price={`${giftCard?.priceInSAR.toFixed(2)} SAR`}
        giftId={giftCard?._id}
        addItemInCart={() => addToCart(giftCard._id, false, "binance")}
        likeProduct={
          giftsWithWishListButton
            ? giftsWithWishListButton[0]?.isInWishlist
            : false
        }
        addItemToWishliat={() => addToWishlist(giftCard?._id, "binance")}
        removeItemFromWishlist={removeFromWishlist}
        description={giftCard?.description}
      />
    </>
  );
};

export default BinanceGiftCardDetails;
