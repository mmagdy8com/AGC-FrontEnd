import React, { useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import api from "../../Interceptor/api";
import toast from "react-hot-toast";

const Card = () => {
  const [giftInfo, specificGiftInfo] = useState({});

  useEffect(() => {
    getGiftCardSpecificInfo();
  }, []);

  const params = useParams();

  const getGiftCardSpecificInfo = () => {
    api
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/getGift/${params.SpecificInfo}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        // console.log("specific info", res.data.data);
        specificGiftInfo(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const addItemToCartList = () => {
    const cartInfo = {
      id: localStorage.getItem("userId"),
      productId: params.SpecificInfo,
    };

    api
      .post(`${process.env.REACT_APP_BACKEND_URL}/addToCart`, cartInfo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        console.log("WishlistItem------>", res.data);
        toast.success(res.data.message);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <section className="main-product">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div
              className="product-inner position-relative"
              data-aos="fade-up"
              data-aos-delay="2800"
              data-aos-duration="1000"
            >
              <div className="product-inner-image position-absolute">
                <img
                  src={`${process.env.REACT_APP_IMAGE_URL}//${giftInfo?.image}`}
                  alt="main-product"
                  className="img-fluid"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="product-inner-dip d-flex flex-column align-items-center">
                <h4 className="product-main-heading">{giftInfo?.name}</h4>
                <p className="product-main-text">{giftInfo.description}</p>
                <ul className="d-flex align-items-center flex-wrap justify-content-center">
                  <li>{giftInfo?.priceInSAR} SAR</li>
                  <li>
                    <span>
                      Pay with cryptocurrency and <span>save 10%</span>
                    </span>
                  </li>
                  <li
                    onClick={() => {
                      addItemToCartList();
                    }}
                  >
                    <NavLink type="submit" className="btn btn-primary">
                      <img src={`/assets/SpecificProduct/cart-2.svg`} alt="" />
                      <span>Add to Cart</span>
                    </NavLink>
                  </li>
                  <li>
                    <NavLink type="submit" className="btn btn-primary">
                      <img src={`/assets/SpecificProduct/cart-3.svg`} alt="" />
                      Buy Now
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Card;
