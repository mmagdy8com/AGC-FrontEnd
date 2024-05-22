import { NavLink, useNavigate, useParams } from "react-router-dom";
import useCartContext from "../hooks/useCartContext";
import useWishlistContext from "../hooks/useWishlistContext";
import useApi from "../hooks/useApi";
import useIsInWishlist from "../hooks/useIsInWishlist";
import BinanceGiftCardDetails from "../Components/GiftCardDetails/BinanceGiftCardDetails";
import BitaqatyGiftCardDetails from "../Components/GiftCardDetails/BitaqatyGiftCardDetails";
import GiftCard from "../Components/Home/shared/GiftCard";
import Loader from "../Components/Ui/Loader";
import InfoMessage from "../Components/Ui/InfoMessage";
import useSearchContext from "../hooks/useSearchContext";

const GiftCardDetails = () => {
  const navigate = useNavigate();

  const { searchQuery, setSearchQuery } = useSearchContext();
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?q=${searchQuery}`);
    } else {
      setSearchQuery(event.target.value);
    }
  };

  const params = useParams();
  const { productTag, id, productName } = params;

  const { addToCart } = useCartContext();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext();

  const {
    data: similarGifts,
    isPending: aresimilarGiftsPending,
    error: similarGiftsError,
  } = useApi(`/gift-cards/getSimilarCards/${id}`);

  const { data: similarGiftsWithWishListButton } = useIsInWishlist(
    similarGifts,
    wishlist
  );

  const giftCardDetailsComponents = {
    binance: <BinanceGiftCardDetails id={id} />,
    bitaqty: <BitaqatyGiftCardDetails id={id} />,
  };

  const GiftCardDetails = giftCardDetailsComponents[productTag];

  return (
    <div className="container">
      <div className="category_path_container d-flex justify-content-between align-items-center detailLink">
        <p className="category_path_title m-0 detailLink">
          <NavLink to="/" className="detailLink">
            Home{" "}
          </NavLink>
          {`>`} <span>{"gift-cards "}</span>
          {`>`} <span>{productTag} </span>
          {`>`} <span>{productName} </span>{" "}
        </p>
        {productTag !== "binance" && (
          <div className="position-relative form-inner category_search_container ">
            <input
              type="text"
              className="category_search_input"
              placeholder="Search"
              name="searchGiftCard"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <img
              className="position-absolute category_search_icon"
              src="/assets/Banner/search.svg"
              alt="search"
            />
          </div>
        )}
      </div>
      <div className="my-0 my-sm-5">{GiftCardDetails}</div>
      {productTag !== "binance" && (
        <>
          <h4>You May Also Like</h4>
          <div className="row justify-content-center my-5">
            {aresimilarGiftsPending ? (
              <Loader />
            ) : similarGiftsError ? (
              <InfoMessage text={similarGiftsError} />
            ) : !similarGiftsWithWishListButton?.length ? (
              <InfoMessage text="No gifts to show" />
            ) : (
                    similarGiftsWithWishListButton?.map((data) => {
                return (
                  <GiftCard
                    key={data?._id}
                    productId={data?._id}
                    image={
                      data?.image ? data?.image : data?.productDetails?.image
                    }
                    title={data?.productDetails?.nameEn || data?.title}
                    category={data?.productDetails?.categoryNameEn}
                    price={data?.priceInSAR?.toFixed(2)}
                    onClick={() => navigate(`/gifts/${data?.productDetails?.productTag || data?.productTag}/${data?.productDetails?.nameEn || data?.title}/${data._id}`)}
                    addToCart={() => addToCart(data._id,false,data?.productDetails?.productTag || data?.productTag)}
                    addToWishlist={() => addToWishlist(data._id,data?.productDetails?.productTag || data?.productTag)}
                    removeFromWishlist={() => removeFromWishlist(data._id)}
                    isInWishlist={data.isInWishlist}
                    binanceGrid
                  />
                );
              })
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default GiftCardDetails;
