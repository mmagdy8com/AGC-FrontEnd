import { NavLink, useNavigate } from "react-router-dom";
import useCartContext from "../../hooks/useCartContext";
import useWishlistContext from "../../hooks/useWishlistContext";
import useApi from "../../hooks/useApi";
import useIsInWishlist from "../../hooks/useIsInWishlist";
import GiftCard from "./shared/GiftCard";
import Loader from "../Ui/Loader";
import InfoMessage from "../Ui/InfoMessage";
import "./Design/index.css";
import { convertToRouteString } from "../../utils/helper";
import { useEffect, useState } from "react";

const HomeGiftCardsSection = ({ title,collection, id }) => {
  const isTrendingSection = collection === "" || collection === "newArrivals";
  const navigate = useNavigate();

  const { addToCart } = useCartContext();
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlistContext();
  const [filteredGifts, setFilteredGifts]= useState()

  const {
    data: gifts,
    isPending: areGiftsPending,
    error: giftsError,
  } = useApi(`/getSearchProducts/?collectionId=${id}`
  );
  
  useEffect(() => {
    const filtered = gifts?.filter((item => item.minQty > 0))
    setFilteredGifts(filtered)
  },[gifts])
   
  const { data: giftsWithWishListButton } = useIsInWishlist(filteredGifts, wishlist);

  return (
    <>
      <section className="gift-card" id="gift-card">
        <div className="container modified_container">
          <div className="row">
            <div
              className="title title-2"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <h2 className="position-relative">{title}</h2>
            </div>
          </div>
          <div className="row justify-content-center ">
            <div className="binance-gift-cards">
              {areGiftsPending ? (
                <Loader />
              ) : giftsError ? (
                <InfoMessage text={giftsError} />
              ) : !giftsWithWishListButton?.length ? (
                <InfoMessage text="No gifts to show" />
              ) : (
                giftsWithWishListButton
                  ?.slice(0, isTrendingSection ? 6 : 3)
                        .map((data) => {  
                          if(data?.minQty > 0) {
                            return (
                              <GiftCard
                                key={data?._id}
                                image={data?.image}
                                inbuildImage={data?.productDetails?.image}
                                title={data?.productDetails?.nameEn || data?.title}
                                category={data?.productDetails?.categoryNameEn || data?.category?.name}
                                price={`${data?.priceInSAR?.toFixed(2)}`}
                                onClick={() =>
                                  navigate(
                                    `gifts/${data?.productDetails?.productTag || data?.productTag}/${convertToRouteString(
                                      data?.productDetails?.nameEn || data?.title
                                    )}/${data?._id}`
                                  )
                                }
                                addToCart={() => addToCart(data._id, false, data?.productDetails?.productTag || data?.productTag)}
                                addToWishlist={() => addToWishlist(data._id, data?.productDetails?.productTag || data?.productTag)}
                                removeFromWishlist={() => removeFromWishlist(data._id)}
                                isInWishlist={data?.isInWishlist}
                              />
                            );
                          }
                  })
              )}
            </div>

            <NavLink
              to={`/search?q=${title}`}
              type="submit"
              className="btn btn-primary shopBtn"
              data-aos="zoom-out-up"
              data-aos-duration="1000"
            >
              <span>View All</span>
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeGiftCardsSection;
