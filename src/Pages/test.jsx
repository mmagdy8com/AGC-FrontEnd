import React, { useState, useEffect } from "react";
// import { motion, AnimatePresence } from "framer-motion";
import "../App.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
export default function CategorySection() {
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
          slidesToShow: 3,
          slidesToScroll: 3,
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
    <section className="weddingo-container">
      <Slider {...settings}>
        {array.map((item, index) => {
          return (
            <div className="item">
              <div className="testimonial-inner">
                <div className="testimonial-customer d-flex align-items-center">
                  <div className="testimonial-customer-img">
                    <img src={item.img1} alt="costomer" className="img-fluid" />
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
    </section>
  );
}
