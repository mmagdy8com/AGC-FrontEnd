import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import useCartContext from "../../hooks/useCartContext";
import useApi from "../../hooks/useApi";
import "./Design/index.css";
import { convertToRouteString } from "../../utils/helper";

const hyphenateUrlName = (name) => {
  return name?.toLowerCase().replace(/&/g, "and").replace(/\s+/g, "-");
};

const Header = ({ isAuthLayout }) => {
  const navigate = useNavigate();

  const {
    cart,
    isCartPending,
    cartError,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
    currentUsername,
  } = useCartContext();

  const {
    data: category,
    isPending: isCategoryPending,
    error: categoryError,
  } = useApi(`/getCategory`);

  const [hide, setHide] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  useEffect(() => {
    showContent();
  }, []);
  const authLayoutPaths = [
    "/signin",
    "/statusnumber",
    "/signup",
    "/forgotpasswordotp",
    "/registerNumber",
    "/resetpassword",
  ];

  const showContent = () => {
    if (authLayoutPaths.includes(window.location.pathname)) {
      setHide(true);
    } else {
      setHide(false);
    }
  };

  const navigateHome = () => {
    navigate("/");
    window.location.reload();
  };

  return (
    <>
      <header>
        <div className="header top-bar d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-5 d-flex align-items-center logo-menu">
                {!hide && (
                  <a
                    className="respon-menu d-block d-lg-none"
                    data-bs-toggle="offcanvas"
                    href="#offcanvasExample"
                    role="button"
                    aria-controls="offcanvasExample"
                  >
                    <img src={"/assets/Header/menu.svg"} alt="menu" />
                  </a>
                )}

                <div className="logo pointer" onClick={navigateHome}>
                  {/* <NavLink to="/"> */}
                  <img
                    src={"/assets/Header/gift_card logo.png"}
                    alt="logo"
                    className=" gift_card_logo"
                  />
                  {/* </NavLink> */}
                </div>
              </div>

              <div className="col-7">
                <ul className="top-right-bar d-flex align-items-center justify-content-end">
                  {!hide && (
                    <>
                      <li className="user d-inline-block">
                        {currentUsername && (
                          <NavLink to="/profile">
                            <div className="user-inner d-flex">
                              <img
                                src={"/assets/Header/user.svg"}
                                alt="user"
                                className="img-fluid d-none d-sm-block"
                              />
                              <p className="text-capitalize">
                                {/* {localStorage.getItem("userName") || "Guest"} */}
                                {currentUsername}
                              </p>
                            </div>
                          </NavLink>
                        )}
                        {!currentUsername && (
                          <div className="user-inner d-flex">
                            {/* <img
                              src={"/assets/Header/user.svg"}
                              alt="user"
                              className="img-fluid d-none d-sm-block"
                            /> */}
                            <p className="text-capitalize">
                              {/* {localStorage.getItem("userName") || "Guest"} */}
                              {currentUsername ? (
                                currentUsername
                              ) : (
                                <span className="pointer">
                                  <span onClick={() => navigate("/signin")}>
                                    Log In{" "}
                                  </span>
                                  /{" "}
                                  <span onClick={() => navigate("/signup")}>
                                    Sign Up
                                  </span>
                                </span>
                              )}
                            </p>
                          </div>
                        )}
                      </li>
                      <li className="add-top-cart position-relative d-none d-md-block position-relative">
                        <button
                          className="header-icon mt-2"
                          onClick={() =>
                            currentUsername !== "Guest" && currentUsername
                              ? navigate("/wishlist")
                              : navigate("/signin")
                          }
                        >
                          <img
                            src={"/assets/Style/like.svg"}
                            alt="user"
                            className="img-fluid d-none d-sm-block"
                          />
                        </button>
                      </li>
                      <li className="add-top-cart cart-option position-relative d-none d-md-block position-relative">
                        <button
                          className="header-icon"
                          onClick={() =>
                            currentUsername !== "Guest" && currentUsername
                              ? navigate("/cart")
                              : navigate("/signin")
                          }
                        >
                          <img
                            src={"/assets/Header/cart.svg"}
                            alt="cart"
                            className="img-fluid"
                          />
                          <span className="position-absolute">
                            {cart?.length || 0}
                          </span>
                        </button>

                        <div className="cart-mega position-absolute">
                          <div
                            className="checkout-cart"
                            style={{
                              maxHeight: "500px",
                              overflowY: "auto",
                            }}
                          >
                            <ul>
                              {cart?.map((item) => {
                                return (
                                  <li
                                    className="d-flex align-items-center justify-content-between"
                                    key={item?.id}
                                  >
                                    <div className="checkout-cart-inner d-flex align-items-center">
                                      <img
                                        height={100}
                                        src={
                                          item?.productDetails?.image
                                            ? `${process.env.REACT_APP_IMAGE_URL}/${item?.productDetails?.image}`
                                            : item?.productDetails?.image
                                            ? item?.productDetails?.image
                                            : "/assets/Giftcard/default-gift-card.jpg"
                                        }
                                        alt="cart"
                                        onError={(e) => {
                                          e.target.src =
                                            "/assets/Giftcard/default-gift-card.jpg";
                                        }}
                                      />
                                      <div className="checkout-cart-text  ">
                                        <p>
                                          {item?.productDetails?.productDetails?.nameEn ||
                                            item?.productDetails?.title}
                                        </p>
                                        <h6>
                                          {" "}
                                          {(
                                            Number(item?.productDetails?.priceInSAR) *
                                            Number(item?.quantity)
                                          ).toFixed(2)}{" "}
                                          SAR
                                        </h6>
                                        <ul
                                          className="d-flex checkout-cart-text-btn item-center align-items-center"
                                          style={{ marginTop: "10px" }}
                                        >
                                          <li className="d-flex align-items-center justify-content-center">
                                            <p
                                              className="cursor-pointer"
                                              onClick={() =>
                                                decreaseQuantity(item?.id)
                                              }
                                            >
                                              -
                                            </p>
                                          </li>
                                          <li className="d-flex align-items-center justify-content-center">
                                            <p>{item?.quantity}</p>
                                          </li>
                                          <li className="d-flex align-items-center justify-content-center">
                                            <p
                                              onClick={() =>
                                                increaseQuantity(item?.id)
                                              }
                                              className="cursor-pointer"
                                            >
                                              +
                                            </p>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="checkout-cart-icon pointer">
                                      <div
                                        onClick={() =>
                                          removeFromCart(item?.id)
                                        }
                                      >
                                        <img
                                          src={"/assets/Header/bin.svg"}
                                          alt="bin"
                                        />
                                      </div>
                                    </div>
                                  </li>
                                );
                              })}
                            </ul>
                            {currentUsername !== "Guest" && currentUsername && (
                              <div className="checkout-prices-inner">
                                <ul className="d-flex align-items-center justify-content-between">
                                  <li>
                                    <NavLink
                                      to="/checkout"
                                      type="submit"
                                      className="btn btn-primary"
                                    >
                                      Checkout
                                    </NavLink>
                                  </li>
                                  <li>
                                    <NavLink
                                      to="/cart"
                                      type="submit"
                                      className="btn btn-primary viewCartBtn"
                                    >
                                      View Cart
                                    </NavLink>
                                  </li>
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </li>
                    </>
                  )}
                  <li className="lang d-none d-md-block">
                    <NavLink to="" className="d-flex align-items-center">
                      <img
                        src={"/assets/Header/lang.svg"}
                        alt="lang"
                        className="img-fluid"
                      />
                      <span>English</span>
                    </NavLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        {!isAuthLayout && (
          <>
            <div className="manu-bar d-none d-lg-block h">
              <div className="container nav-container">
                <div className="row">
                  <ul className="nav justify-content-center p-0 position-relative flex-nowrap">
                    {category?.map((cat) => (
                      <li key={cat?._id} className="nav-item">
                        {cat?.name !== "Binance Gift Card" &&
                        cat?.name !== "Noun" &&
                        cat?.name !== "TikTok" ? (
                          <NavLink
                            className="nav-link"
                            to={`/categories/${convertToRouteString(
                              cat?.name
                            )}/${cat?._id}`}
                          >
                            {cat?.name}
                          </NavLink>
                        ) : null}

                        <div className="mega-menu position-absolute">
                          <div className="mega-menu-text d-flex align-items-center">
                            <h6>{cat?.name}</h6>
                          </div>
                          <div className="row">
                            {cat?.subCategories?.map(
                              (subCat, index) =>
                                subCat?.subCategoryName && (
                                  <div key={subCat?._id} className="mega-col">
                                    <NavLink
                                      to={`/gift-cards/${
                                        cat?._id
                                      }/${hyphenateUrlName(
                                        subCat.subCategoryName
                                      )}?categoryName=${hyphenateUrlName(
                                        cat?.name
                                      )}&subCategoryId=${
                                        subCat.id
                                      }&subCatImage=${
                                        process.env.REACT_APP_IMAGE_URL
                                      }/${subCat?.subCategoryImage}`}
                                    >
                                      <div className="mega-menu-inner d-flex  align-items-center">
                                        <img
                                          src={`${process.env.REACT_APP_IMAGE_URL}/${subCat?.subCategoryImage}`}
                                          alt="mega-1"
                                          className="img-fluid"
                                          onError={(e) => {
                                            e.target.src =
                                              "/assets/Style/new-banner.png";
                                          }}
                                        />
                                        <p>{subCat?.subCategoryName}</p>
                                      </div>
                                    </NavLink>
                                  </div>
                                )
                            )}
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div
              className="offcanvas offcanvas-start"
              id="offcanvasExample"
              aria-labelledby="offcanvasExampleLabel"
            >
              <div className="offcanvas-header">
                <img
                  src={"/assets/Header/gift_card logo.png"}
                  alt="logo"
                  className="img-fluid gift-card-logo-mobileview"
                />
                <button
                  type="button"
                  className="close bg-transparent p-0 border-0"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                >
                  <img
                    src={"/assets/Header/close2.png"}
                    alt="close"
                    className="img-fluid"
                  />
                </button>
              </div>
              <div className="offcanvas-body">
                {/* <ul className="nav justify-content-center p-0 flex-column">
                  {category?.map((cat) => (
                    <li className="nav-item">
                      {cat.name !=="Binance Gift Card" && cat?.name !== "Noun" && cat?.name !== "TikTok"?   <NavLink
                        className="nav-link mobileViewLink"
                        to=''
                        onClick={()=> navigate(`/categories/${convertToRouteString(cat?.name)}/${cat?._id}`)}
                        aria-label="Close"
                        data-bs-dismiss="offcanvas"
                      >
                        {cat?.name}
                      </NavLink>: null }
                    
                    </li>
                  ))}
                </ul> */}
                <ul className="nav justify-content-center p-0 flex-column">
                  <div id="accordion">
                    {category?.map(
                      (cat, index) =>
                        cat.name !== "Binance Gift Card" &&
                        cat?.name !== "Noun" &&
                        cat?.name !== "TikTok" && (
                          <li className="nav-item" key={index}>
                            {/* <div className="" id={`heading${index}`}>     */}

                            <div
                              className="nav-link mobileViewLink pointer"
                              onClick={() => toggleAccordion(index)}
                              aria-expanded={
                                activeIndex === index ? "true" : "false"
                              }
                              aria-controls={`collapse${index}`}
                            >
                              <div className="d-flex justify-content-between">
                                {" "}
                                {cat.name}
                                <div>
                                  {activeIndex === index ? (
                                    <img
                                      src={"/assets/Header/chevron-up.svg"}
                                      alt="up"
                                      className="img-fluid"
                                    />
                                  ) : (
                                    <img
                                      src={"/assets/Header/chevron-down.svg"}
                                      alt="down"
                                      className="img-fluid"
                                    />
                                  )}
                                </div>
                              </div>
                            </div>

                            {/* </div> */}
                            <div
                              id={`collapse${index}`}
                              className={`collapse ${
                                activeIndex === index ? "show" : ""
                              }`}
                              aria-labelledby={`heading${index}`}
                              data-parent="#accordion"
                            >
                              <div className="card-body">
                                {cat?.subCategories?.map(
                                  (subCat, subIndex) =>
                                    subCat?.subCategoryName && (
                                      <div key={subIndex} className="sub-nav-link-parent">
                                        <NavLink
                                          className="sub-cat-link mobileViewLink"
                                          to=""
                                          onClick={()=>navigate(`/gift-cards/${
                                            cat._id
                                          }/${hyphenateUrlName(
                                            subCat.subCategoryName
                                          )}?categoryName=${hyphenateUrlName(
                                            cat.name
                                          )}&subCategoryId=${
                                            subCat.id
                                          }&subCatImage=${
                                            process.env.REACT_APP_IMAGE_URL
                                          }/${subCat.subCategoryImage}`)}
                                          aria-label="Close"
                                          data-bs-dismiss="offcanvas"
                                        >
                                          {subCat.subCategoryName}
                                        </NavLink>
                                      </div>
                                    )
                                )}
                              </div>
                            </div>
                          </li>
                        )
                    )}
                  </div>
                </ul>

                <div className="offcanvas-bottom d-block d-md-none">
                  <NavLink
                    to=""
                    onClick={() => navigate("/cart")}
                    aria-label="Close"
                    data-bs-dismiss="offcanvas"
                  >
                    <div className="shipping-to d-flex align-items-center">
                      <img
                        src={"/assets/Header/cart.svg"}
                        alt="cart"
                        className="img-fluid"
                      />
                      <div className="shippng-text">
                        <h3 className="mobileViewText">Cart</h3>
                        {/* <p className="mobileViewText">cart</p> */}
                      </div>
                    </div>
                  </NavLink>
                  <NavLink
                    to=""
                    onClick={() => navigate("/wishlist")}
                    aria-label="Close"
                    data-bs-dismiss="offcanvas"
                  >
                    <div className="shipping-to d-flex align-items-center">
                      <img
                        src={"assets/Style/like.svg"}
                        alt="cart"
                        className="img-fluid"
                      />
                      <div className="shippng-text">
                        <h3 className="mobileViewText">Wishlist</h3>
                      </div>
                    </div>
                  </NavLink>

                  <NavLink to="">
                    <div className="shipping-to d-flex align-items-center">
                      <img
                        src={"/assets/Header/lang.svg"}
                        alt="cart"
                        className="img-fluid"
                      />
                      <div className="shippng-text">
                        <h3 className="mobileViewText">Change language</h3>
                        {/* <p className="mobileViewText">English</p> */}
                      </div>
                    </div>
                  </NavLink>
                </div>
                <NavLink
                  to=""
                  onClick={() => navigate("/orderhistory")}
                  aria-label="Close"
                  data-bs-dismiss="offcanvas"
                >
                  <div className="shipping-to d-flex align-items-center">
                    <img
                      src={"/assets/Style/info-history.svg"}
                      alt="cart"
                      className="img-fluid"
                    />
                    <div className="shippng-text">
                      <h3 className="mobileViewText">Order History</h3>
                    </div>
                  </div>
                </NavLink>
                {currentUsername && (
                  <NavLink
                    to=""
                    onClick={() => {
                      localStorage.clear();
                      navigate("/signin");
                    }}
                    aria-label="Close"
                    data-bs-dismiss="offcanvas"
                  >
                    <div className="shipping-to d-flex align-items-center">
                      <img
                        src={"/assets/Style/info-logout.svg"}
                        alt="cart"
                        className="img-fluid"
                      />
                      <div className="shippng-text">
                        <h3 className="mobileViewText">Sign Out</h3>
                      </div>
                    </div>
                  </NavLink>
                )}
              </div>
            </div>
          </>
        )}
      </header>
    </>
  );
};

export default Header;
