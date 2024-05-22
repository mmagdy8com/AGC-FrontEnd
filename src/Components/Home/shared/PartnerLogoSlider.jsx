import React, { useEffect, useState } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { responsiveImageSliderConfig } from "../../../utils/constants";
import api from "../../../services/api";
import { separateCMSImages } from "../../../utils/helper";

const PartnerLogoSlider = () => {
  const [partnerLogo, setPartnerLogo] = useState([]);

  useEffect(() => {
    async function fetch() {
      const result = await api.get(
        `${process.env.REACT_APP_BACKEND_URL}/cms/getCMSImages`
      );
      setPartnerLogo(separateCMSImages(result.data.data, "partnerLogo"));
    }

    fetch();
  }, []);

  return (
    <div className="image-slider-holder">
      <Carousel responsive={responsiveImageSliderConfig}>
        {partnerLogo?.map((partner) => (
          <div>
            <img
              src={`${process.env.REACT_APP_IMAGE_URL}${partner}`}
              style={{ height: "200px", width: "300px", objectFit: "contain" }}
            />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default PartnerLogoSlider;
