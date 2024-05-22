import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";

const Subbanner = ({ updateSharedValue }) => {
  const [searchGiftVal, setSearchGiftVal] = useState("");
  const params = useParams();
  const handleSearch = (e) => {
    const { name, value } = e.target;

    setSearchGiftVal(e.target.value);
    updateSharedValue(e.target.value);
  };
  return (
    <section className="sub-banner-link">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-7 col-12">
            <ul
              className="product-banner-link banner-links d-flex align-items-center justify-content-md-start justify-content-center"
              data-aos="fade-right"
              data-aos-delay="2500"
              data-aos-duration="1000">
              <li>
                <NavLink to="/">Home Page</NavLink>
              </li>
              <li>
                <img src={"/assets/Giftcard/arrow.svg"} alt="arrow" />
              </li>
              <li>
                <NavLink to={`/category/${params.categoryId}`}>
                  Mobile & Data
                </NavLink>
              </li>
              <li>
                <img src={"/assets/Giftcard/arrow.svg"} alt="arrow" />
              </li>
              <li>
                <NavLink to="">Mobily - Saudi Arabia</NavLink>
              </li>
            </ul>
          </div>
          <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-5 col-12">
            <form>
              <div
                className="position-relative form-inner"
                data-aos="fade-left"
                data-aos-delay="2500"
                data-aos-duration="1000">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Search"
                  name="searchGiftVal"
                  value={searchGiftVal}
                  onChange={handleSearch}
                />
                <img
                  className="position-absolute input-search"
                  src={"/assets/Giftcard/search-2.svg"}
                  alt="search"
                />
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Subbanner;
