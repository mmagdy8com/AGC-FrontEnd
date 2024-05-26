import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testimonial = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const array = [
    {
      img1: "assets/Testimonial/customer2.png",
      img2: "assets/Testimonial/star.png",
      description:
        "  Great selection and simple transaction process. Seamleprocess. Will use again!",
    },
    {
      img1: "assets/Testimonial/customer2.png",
      img2: "assets/Testimonial/star.png",
      description:
        "  Great selection and simple transaction process. Seamleprocess. Will use again!",
    },
    {
      img1: "assets/Testimonial/customer2.png",
      img2: "assets/Testimonial/star.png",
      description:
        "  Great selection and simple transaction process. Seamleprocess. Will use again!",
    },
  ];
  return (
    <>
      <section className="testimonial">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-12 order-1 order-lg-0">
              <div className="owl-carousel owl-theme">
                <Slider {...settings}>
                  {array.map((item, index) => {
                    return (
                      <div className="item" key={index}>
                        <div className="testimonial-inner">
                          <div className="testimonial-customer d-flex align-items-center">
                            <div className="testimonial-customer-img">
                              <img
                                src={item.img1}
                                alt="costomer"
                                className="img-fluid"
                              />
                            </div>
                            <div className="testimonial-name">
                              <h2>Ahmed Khaled</h2>
                              <ul className="stars d-flex">
                                <li>
                                  <img src={item.img2} alt="star" />
                                </li>
                                <li>
                                  <img src={item.img2} alt="star" />
                                </li>
                                <li>
                                  <img src={item.img2} alt="star" />
                                </li>
                                <li>
                                  <img src={item.img2} alt="star" />
                                </li>
                                <li>
                                  <img src={item.img2} alt="star" />
                                </li>
                              </ul>
                            </div>
                          </div>
                          <p className="testimonial-text">{item.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </Slider>
                {/* <div className="item">
                  <div className="testimonial-inner">
                    <div className="testimonial-customer d-flex align-items-center">
                      <div className="testimonial-customer-img">
                        <img
                          src={"assets/Testimonial/customer2.png"}
                          alt="costomer"
                          className="img-fluid"
                        />
                      </div>
                      <div className="testimonial-name">
                        <h2>Ahmed Khaled</h2>
                        <ul className="stars d-flex">
                          <li>
                            <img
                              src={"assets/Testimonial/star.png"}
                              alt="star"
                            />
                          </li>
                          <li>
                            <img
                              src={"assets/Testimonial/star.png"}
                              alt="star"
                            />
                          </li>
                          <li>
                            <img
                              src={"assets/Testimonial/star.png"}
                              alt="star"
                            />
                          </li>
                          <li>
                            <img
                              src={"assets/Testimonial/star.png"}
                              alt="star"
                            />
                          </li>
                          <li>
                            <img
                              src={"assets/Testimonial/star.png"}
                              alt="star"
                            />
                          </li>
                        </ul>
                      </div>
                    </div>
                    <p className="testimonial-text">
                      Great selection and simple transaction process. Seamless
                      process. Will use again!
                    </p>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-5 col-md-12 col-12 order-0 order-lg-1">
              <div
                className="testimonial-img text-center text-lg-end"
                data-aos="fade-up"
                data-aos-delay="1200"
                data-aos-duration="1000">
                <img
                  src={"assets/Testimonial/Testimonial element.png"}
                  alt="testimonial"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Testimonial;
