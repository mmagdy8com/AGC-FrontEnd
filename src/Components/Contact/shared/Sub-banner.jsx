import React from 'react'
import { NavLink } from "react-router-dom";
import "../Design/index.css";
const Subbanner = () => {
  return (
      <>
     
            <section className="sub-banner-link">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-12">
                            <ul className="banner-links d-flex align-items-center justify-content-md-start justify-content-center" data-aos="fade-right" data-aos-delay="2500" data-aos-duration="1000">
                                <li><NavLink to="/">Home Page</NavLink></li>
                                <li><img src={"assets/Contact/arrow.svg"} alt="arrow" /></li>
                                <li><NavLink to="">Contact Us</NavLink></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>
      
      </>
  )
}

export default Subbanner