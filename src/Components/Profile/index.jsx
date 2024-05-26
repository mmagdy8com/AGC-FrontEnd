import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Account from "./Account";
import OrderHistoryComponent from "./shared/OrderHistory";
import WishlistItem from "./shared/WishList";
import data from "../../JsonData/data.json";
import PasswordChange from "./shared/PasswordChange";
import useCartContext from "../../hooks/useCartContext";

const ProfileComponent = ({ name }) => {
  const navigate = useNavigate();

  const { cartData, profileList } = data;

  const [activeComponent, setActiveComponent] = useState(
    "Personal Information"
  );

  const { updateUserName } = useCartContext();

  useEffect(() => {
    if (name) {
      setActiveComponent(name);
    }
  }, [name]);

  return (
    <main>
      <section className="sub-banner-link">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-5 col-12">
              <ul
                className="banner-links d-flex align-items-center justify-content-md-start justify-content-center"
                data-aos="fade-right"
                data-aos-delay="2500"
                data-aos-duration="1000"
              >
                <li>
                  <NavLink to="/">Home Page</NavLink>
                </li>
                <li>
                  <img src="/assets/Contact/arrow.svg" alt="arrow" />
                </li>
                <li>
                  <NavLink to="">My Account</NavLink>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
      <div className="profile">
        <div className="container">
          <div className="row justify-content-between">
            {activeComponent == "Order History" && (
              <OrderHistoryComponent cartData={cartData} />
            )}
            {activeComponent == "My Favorites" && <WishlistItem />}
            {activeComponent == "Personal Information" && <Account />}
            {activeComponent == "Change Password" && <PasswordChange />}
            <div className="col-xxl-3 col-4 d-none d-lg-block">
              <div
                className="personal-information"
                data-aos="fade-left"
                data-aos-delay="2500"
                data-aos-duration="1000"
              >
                <ul className="d-flex flex-column">
                  {profileList.map((data) => (
                    <li
                      className={activeComponent == data.name ? "active" : ""}
                      onClick={() => setActiveComponent(data.name)}
                    >
                      <a className="d-flex align-items-center">
                        <img src={data.image} />
                        {data.name === "Sign Out" ? (
                          <span
                            className="renderComponent"
                            onClick={() => {
                              localStorage.clear();
                              updateUserName("Guest");
                              navigate("/signin");
                            }}
                          >
                            {data.name}
                          </span>
                        ) : (
                          <span className="renderComponent">{data.name}</span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProfileComponent;
