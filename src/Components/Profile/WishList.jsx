import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
// import Wishlistjsondata from "../../JsonData/data.json";
import api from "../Interceptor/api";
import "./Design/index.css";
import toast from "react-hot-toast";

const WishlistItem = () => {
  console.log("dsgbdfbhdgb");
  // const { wishList } = Wishlistjsondata;
  const [wishlistItem, setWishlistItem] = useState([]);

  useEffect(() => {
    getWishlistitem();
  }, []);

  const getWishlistitem = () => {
    api
      .get(
        `${
          process.env.REACT_APP_BACKEND_URL
        }/getWishlist/${localStorage.getItem("userId")}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res.data.data);
        setWishlistItem(res.data.data);
        // getGiftCards(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const removeWishlistItem = (itemId) => {
    // e.stopPropagation();
    const info = {
      userId: localStorage.getItem("userId"),
      productId: itemId,
      productType: "bitaqty",
    };
    api
      .post(`${process.env.REACT_APP_BACKEND_URL}/removeFromWishlist`, info, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        toast.success(res.data.message);
        getWishlistitem();
        // const updatedGiftCards = giftCards.map((item) => {
        //   if (item._id === itemId) {
        //     return { ...item, isWishlist: false };
        //   }
        //   return item;
        // });
        // setGiftCards(updatedGiftCards);
      })
      .catch((error) => {
        console.log(error);
      });
  };
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
      <div className="col-xxl-9 col-xl-8 col-lg-8 col-md-12">
        <div className="row justify-content-center">
          {wishlistItem.map((item, index) => {
            return (
              <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-9">
                <NavLink to="">
                  {console.log("item", item)}
                  <div
                    className="gift-card-inner"
                    data-aos="zoom-out"
                    data-aos-delay="1200"
                    data-aos-duration="1000"
                  >
                    <div className="card position-relative wishListItem">
                      {console.log("image", item)}
                      <img
                        src={
                          item.item.image
                            ? item.item.image
                            : item.item.productDetails.image
                        }
                        className="card-img-top"
                        alt="gift"
                        onError={(e) => {
                          e.target.src =
                            "/assets/Giftcard/default-gift-card.jpg";
                        }}
                      />

                      <NavLink
                        to=""
                        className="like d-flex align-items-center rounded-circle justify-content-center position-absolute"
                      >
                        <img
                          src={`/assets/Style/heart.png`}
                          alt="like"
                          className="likeImg"
                          onClick={() => removeWishlistItem(item.item._id)}
                        />
                      </NavLink>
                      <div className="card-body position-relative">
                        <h5 className="card-title">
                          {item.item.productDetails.nameEn}
                        </h5>
                        <span className="card-dip">
                          {item.item.productDetails.categoryNameEn}
                        </span>
                        <p className="card-text">
                          {item?.item?.priceInSAR?.toFixed(2)}
                          {" SAR"}
                          {/* {item.item.productDetails.currency} */}
                        </p>
                        <NavLink
                          to=""
                          className="add-top-cart-icon position-absolute d-flex align-items-center"
                        >
                          <img
                            src={`/assets/Trendinggiftcard/gift-card-icon.svg`}
                            alt="gift-card-icon"
                          />
                          <span>Add</span>
                        </NavLink>
                      </div>
                    </div>
                  </div>
                </NavLink>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
};
export default WishlistItem;
