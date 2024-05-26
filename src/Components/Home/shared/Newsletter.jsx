import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../Design/index.css";

const Newsletter = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://js.hsforms.net/forms/v2.js";
    document.body.appendChild(script);

    script.addEventListener("load", () => {
      if (window.hbspt) {
        window.hbspt.forms.create({
          portalId: "44487984",
          formId: "618403ba-f0f8-4f99-9f56-38ac2f5a07ad",
          target: "#hubspotForm",
        });
      }
    });
  }, []);

  return (
    <>
      <section className="news-letter">
        <div className="container">
          <div className="row justify-content-between align-items-center">
            <div className="col-xxl-6 col-xl-7 col-lg-7 col-md-12 col-sm-12 col-12">
              <div
                className="news-letter-inner"
                data-aos="fade-down"
                data-aos-delay="1000"
                data-aos-duration="1000"
              >
                <h6>Stay Connected</h6>
                {/* <form className="news-letter-form">
                  <div className="d-flex">
                    <input
                      type="email"
                      className="form-control subscribeInputField"
                      placeholder="Enter your email for exclusive offers"
                    />
                    <button
                      type="submit"
                      className="btn btn-primary homesignupBtn">
                      Sign up
                    </button>
                  </div>
                </form> */}
                <br />
                <div id="hubspotForm"></div>
                <br />
                {/* <ul className="social-icon d-flex align-items-center">
                  <li>
                    <NavLink to="https://www.facebook.com/" target="_blank">
                      <img
                        src={"assets/Newsletter/facebook.svg"}
                        alt="facebook"
                      />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="https://twitter.com/ArabGiftCard"
                      target="_blank"
                    >
                      <img
                        src={"assets/Newsletter/twetter.svg"}
                        alt="twetter"
                      />
                    </NavLink>
                  </li>
                  <li>
                    <NavLink
                      to="https://www.instagram.com/arabgiftcard/"
                      target="_blank"
                    >
                      <img
                        src={"assets/Newsletter/instagram.svg"}
                        alt="instagram"
                      />
                    </NavLink>
                  </li>
                </ul> */}
              </div>
            </div>
            <div className="col-xxl-5 col-xl-5 col-lg-5 col-md-12 col-sm-12 col-12">
              <div
                className="news-product"
                data-aos="fade-down"
                data-aos-delay="1000"
                data-aos-duration="1000"
              >
                <h5>Over 10,000 products</h5>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Newsletter;
