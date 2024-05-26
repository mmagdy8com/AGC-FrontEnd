import { NavLink, useNavigate } from "react-router-dom";
import useSearchContext from "../../../hooks/useSearchContext";
import { useEffect, useState } from "react";
import { backgroundImagesForBanner } from "../../../utils/constants";
import { separateCMSImages } from "../../../utils/helper";
import api from "../../../services/api";
import axios from "axios";

const Banner = () => {
  const navigate = useNavigate();

  const [backgroundImagesForBanner, setBackgroundImagesForBanner] = useState(
    []
  );

  useEffect(() => {
    async function fetch() {
      const result = await axios.get(
        `${process.env.REACT_APP_BACKEND_URL}/cms/getCMSImages`
      );
      setBackgroundImagesForBanner(
        separateCMSImages(result.data.data, "cardSlider")
      );
    }

    fetch();
  }, []);

  const [bannerBackground, setBannerBackground] = useState([]);

  useEffect(() => {
    setBannerBackground(backgroundImagesForBanner[0]);
  }, [backgroundImagesForBanner]);

  const handleBackgroundImageChange = () => {
    const currentIndex = backgroundImagesForBanner.indexOf(bannerBackground);
    const nextIndex = (currentIndex + 1) % backgroundImagesForBanner.length;
    setBannerBackground(backgroundImagesForBanner[nextIndex]);
  };

  useEffect(() => {
    const interval = setInterval(handleBackgroundImageChange, 3000);

    return () => {
      clearInterval(interval);
    };
  }, [bannerBackground]);

  const { searchQuery, setSearchQuery } = useSearchContext();

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      navigate(`/search?q=${searchQuery}`);
    } else {
      setSearchQuery(event.target.value);
    }
  };

  return (
    <section
      className="main-banner d-flex align-items-center"
      style={{
        backgroundImage: `url(${process.env.REACT_APP_IMAGE_URL}${bannerBackground})`,
      }}
    >
      <div className="container">
        <div className="row">
          <div className="col-xxl-5 col-xl-5 col-lg-6 col-md-12 col-12">
            <div
              className="main-banner-inner"
              data-aos="fade-up"
              data-aos-delay="2500"
              data-aos-duration="1000"
            >
              <h1>
                Elevate your shopping <br />
                experience
                <span className="text-botder position-relative">
                  {" "}
                  with gift cards
                </span>
                <br />
                from top stores and brands!
              </h1>
              <form>
                <div className="position-relative form-inner">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                    name="searchGiftCard"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleKeyDown}
                  />
                  <img
                    className="position-absolute input-search"
                    src={"assets/Banner/search.svg"}
                    alt="search"
                    onClick={() => navigate(`/search?q=${searchQuery}`)}
                  />
                </div>
                <NavLink
                  to={`/search?q=${searchQuery}`}
                  type="submit"
                  className="btn  bannerBtn"
                >
                  Shop Now
                </NavLink>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
