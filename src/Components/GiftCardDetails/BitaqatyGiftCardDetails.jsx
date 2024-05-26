import useCartContext from "../../hooks/useCartContext";
import useWishlistContext from "../../hooks/useWishlistContext";
import GiftCardDetailsComponent from "./GiftCardDetailsComponent";
import useApi from "../../hooks/useApi";
import Loader from "../Ui/Loader";
import useIsInWishlist from "../../hooks/useIsInWishlist";
import InfoMessage from "../Ui/InfoMessage";

const BitaqatyGiftCardDetails = ({ id }) => {
  const { addToCart } = useCartContext();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext();

  const {
    data: gifts,
    isPending: isGiftsPending,
    error: giftsError,
  } = useApi(`/getBitaqtyGifts?_id=${id}`);

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
        title={giftCard?.productDetails?.nameEn}
        price={giftCard?.priceInSAR.toFixed(2)}
        currency="SAR"
        addItemToWishliat={() => addToWishlist(giftCard?._id)}
        giftId={giftCard?._id}
        likeProduct={
          giftsWithWishListButton
            ? giftsWithWishListButton[0]?.isInWishlist
            : false
        }
        removeItemFromWishlist={removeFromWishlist}
        addItemInCart={addToCart}
        description = {giftCard?.description}
      />
    </>
  );
};

export default BitaqatyGiftCardDetails;
