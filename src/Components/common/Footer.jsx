import { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  COMPANY_EMAIL_ADDRESS,
  COMPANY_LOCATION,
  COMPANY_PHONE_NUMBER,
} from "../../utils/constants";

const Footer = () => {
  const location = useLocation();

  const [hide1, setHide1] = useState(false);

  useEffect(() => {
    showContent();
  }, [location]);

  const showContent = () => {
    if (window.location.pathname === "/") {
      setHide1(true);
    } else {
      setHide1(false);
    }
  };

  return (
    <>
      <>
        <footer>
          <div className="container">
            <div className="row">
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-6 col-12">
                <div
                  className="footer-inner"
                  data-aos="fade-down"
                  data-aos-delay="1000"
                  data-aos-duration="1000"
                >
                  <h6>Payment Methods</h6>
                  <ul className="payment d-flex flex-wrap">
                    <li>
                      <NavLink to="">
                        <img src={"/assets/Footer/gpay.svg"} alt="gpay" />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="">
                        <img
                          src={"/assets/Footer/master-card.svg"}
                          alt="master-card"
                        />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="">
                        <img src={"/assets/Footer/visa.svg"} alt="visa" />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="">
                        <img src={"/assets/Footer/stc-pay.svg"} alt="stc-pay" />
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="">
                        <img
                          src={"/assets/Footer/american.svg"}
                          alt="american"
                        />
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6">
                <div
                  className="footer-inner"
                  data-aos="fade-down"
                  data-aos-delay="1200"
                  data-aos-duration="1000"
                >
                  <h6>
                    <NavLink to="/profile" className={"nav-link"}>
                      My Account
                    </NavLink>
                  </h6>
                  {!localStorage.getItem("userId") ? (
                    <>
                      <ul className="account d-flex flex-column">
                        <li>
                          <NavLink to="/signin">Login</NavLink>
                        </li>
                        <li>
                          <NavLink to="/signup">Sign Up</NavLink>
                        </li>
                      </ul>
                    </>
                  ) : (
                    <NavLink to="/profile">
                      <div className="user-inner d-flex">
                        <img
                          src={"/assets/Header/user.svg"}
                          alt="user"
                          className="img-fluid d-none d-sm-block"
                        />
                        <p className="text-capitalize">
                          {localStorage.getItem("userName") || "Guest"}
                        </p>
                      </div>
                    </NavLink>
                  )}
                </div>
              </div>
              <div className="col-xxl-2 col-xl-2 col-lg-2 col-md-3 col-sm-6 col-6">
                <div
                  className="footer-inner"
                  data-aos="fade-down"
                  data-aos-delay="1400"
                  data-aos-duration="1000"
                >
                  <h6>Information</h6>
                  <ul className="account d-flex flex-column">
                    <li>
                      <NavLink to="/aboutUs">About Us</NavLink>
                    </li>
                    <li>
                      <NavLink to="/contact">Contact Us</NavLink>
                    </li>
                    <li>
                      <NavLink to="/whyus">Why Us</NavLink>
                    </li>
                    <li>
                      <NavLink to="/faq">FAQ</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-3 col-sm-6 col-12">
                <div
                  className="footer-inner"
                  data-aos="fade-down"
                  data-aos-delay="1600"
                  data-aos-duration="1000"
                >
                  <h6>Policies</h6>
                  <ul className="account d-flex flex-column">
                    <li>
                      <NavLink to="/privacy">Privacy Policy</NavLink>
                    </li>
                    <li>
                      <NavLink to="/termsandcondition">
                        Terms & Conditions
                      </NavLink>
                    </li>
                    <li>
                      <NavLink to="/payment">Payment Policy</NavLink>
                    </li>
                    <li>
                      <NavLink to="/cookie">Cookie Policy</NavLink>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                <div
                  className="footer-inner"
                  data-aos="fade-down"
                  data-aos-delay="1800"
                  data-aos-duration="1000"
                >
                  <ul className="location d-flex flex-column flex-md-row flex-lg-column">
                    <li>
                      <NavLink className="d-flex text-decoration-none" to="">
                        <img
                          src={"/assets/Footer/location.svg"}
                          alt="location"
                        />
                        <span>{COMPANY_LOCATION}</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="d-flex text-decoration-none"
                        to={`tel:${COMPANY_PHONE_NUMBER}`}
                      >
                        <img src={"/assets/Header/call2.svg"} alt="call" />
                        <span>{COMPANY_PHONE_NUMBER}</span>
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        className="d-flex text-decoration-none"
                        to={`mailto:${COMPANY_EMAIL_ADDRESS}`}
                      >
                        <img src={"/assets/Footer/mail.svg"} alt="mail" />
                        <span>{COMPANY_EMAIL_ADDRESS}</span>
                      </NavLink>
                    </li>

                    <li>
                      <div className="social_media_icon">
                        <NavLink to="https://www.facebook.com/" target="_blank">
                          <img
                            src={"/assets/Style/facebook.svg"}
                            alt="facebook"
                          />
                        </NavLink>
                        <NavLink
                          to="https://twitter.com/ArabGiftCard"
                          target="_blank"
                        >
                          <img
                            src={"/assets/Style/twetter.svg"}
                            alt="twetter"
                          />
                        </NavLink>
                        <NavLink
                          to="https://www.instagram.com/arabgiftcard/"
                          target="_blank"
                        >
                          <img
                            src={"/assets/Style/instagram.svg"}
                            alt="instagram"
                          />
                        </NavLink>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            {!hide1 && (
              <div className="subscribeField subsField">
                <form className="news-letter-form">
                  <div className="d-flex">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Enter your email for exclusive offers"
                    />
                    <button
                      type="submit"
                      className="btn  homesignupBtn subscribesignupBtn"
                    >
                      Sign up
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        </footer>
      </>
    </>
  );
};

export default Footer;
