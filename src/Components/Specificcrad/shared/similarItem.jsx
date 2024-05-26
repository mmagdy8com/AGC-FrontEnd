import React from "react";
import { NavLink } from "react-router-dom";
import jsonData from "../data/similarItem.json";

const SimilarItem = () => {
  console.log("jsonData", jsonData);
  return (
    <section className="also-like">
      <div className="container">
        <div className="row">
          <div className="title" data-aos="fade-right" data-aos-duration="1000">
            <h6>You May Also Like</h6>
          </div>
        </div>
        <div className="row justify-content-center">
          {jsonData.map((item, index) => {
            return (
              <div
                className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-9"
                key={index}
              >
                <NavLink to="">
                  <div
                    className="gift-card-inner"
                    data-aos="zoom-out"
                    data-aos-delay="1000"
                    data-aos-duration="1000"
                  >
                    <div className="card position-relative">
                      {console.log("image", item.image)}
                      <img
                        src={`/assets/Trendinggiftcard/${item.image}`}
                        className="card-img-top"
                        alt="gift"
                      />
                      <NavLink
                        to=""
                        className="like d-flex align-items-center rounded-circle justify-content-center position-absolute"
                      >
                        <img
                          src="/assets/Trendinggiftcard/like.svg"
                          alt="like"
                        />
                      </NavLink>
                      <div className="card-body position-relative">
                        <h5 className="card-title">{item.title}</h5>
                        <span className="card-dip">{item.category}</span>
                        <p className="card-text">{item.priceInSAR}</p>
                        <NavLink
                          to=""
                          className="add-top-cart-icon position-absolute d-flex align-items-center"
                        >
                          <img
                            src="/assets/Trendinggiftcard/gift-card-icon.svg"
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
    </section>
  );
};

export default SimilarItem;
