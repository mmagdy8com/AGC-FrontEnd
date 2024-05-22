import { NavLink, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useCartContext from "../../hooks/useCartContext";
import api from "../Interceptor/api";
import Loader from "../Ui/Loader";
import InfoMessage from "../Ui/InfoMessage";
import "./Design/CartStyle.css";

const CartComponent = () => {
  const navigate = useNavigate();

  const {
    cart,
    isCartPending,
    cartError,
    matchProduct,
    addToCart,
    removeFromCart,
    increaseQuantity,
    decreaseQuantity,
  } = useCartContext();

  const calculateTotalPrice = () => {
    let totalPrice = 0;
    let totalVAT = 0;
    cart?.forEach((item) => {
      // console.log("---item", item)
      const itemPrice = item?.productDetails?.priceInSAR || 0;
      const itemQuantity = item?.quantity || 1; // Default quantity to 1 if undefined
      const itemVAT = item?.VAT || 0;

      // console.log("itemPrice", itemPrice)
      const itemTotalPrice = itemPrice * itemQuantity;
      totalPrice += itemTotalPrice;

      // Calculate VAT for each item and add it to totalVAT
      const itemTotalVAT = itemQuantity * itemVAT;
      totalVAT += itemTotalVAT;
    });

    const grandTotal = totalPrice + totalVAT;
    // console.log( totalPrice, "grandTotal",grandTotal)
 
    return {
      totalPrice: totalPrice.toFixed(2),
      totalVAT: totalVAT.toFixed(2),
      grandTotal: grandTotal.toFixed(2),
    };
  };

  const generateRandomString = (length) => {
    const chars = "0123456789";
    let result = "";

    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * chars.length);
      result += chars.charAt(randomIndex);
    }

    return result;
  };

  const orderID = generateRandomString(8);

  const loadPaytikoSdk = (sessionToken) => {
    // Create a script element

    const script = document.createElement("script");
    script.src = "https://core.paytiko.com/cdn/js/sdk/paytiko-sdk.1.0.min.js";
    script.async = true;

    script.onload = () => {
      // Now the Paytiko SDK is available, and you can use it
      // For example, you can initialize Paytiko here
      // Paytiko.init();

      // Use PaytikoSdk.cashier.invoke() here
      // eslint-disable-next-line no-undef
      PaytikoSdk.cashier.invoke({
        environment: "PROD",
        amount: calculateTotalPrice().grandTotal,
        orderId: orderID,
        sessionToken: sessionToken,
        // iframeContainerSelector: "div#cashier-iframe-container",
        // eslint-disable-next-line no-undef
        displayMode: PAYTIKO_CASHIER_DISPLAY_MODE.REDIRECT,
        locale: "en-US",
      });
    };

    // Append the script element to the document's head
    document.head.appendChild(script);
  };
  const getProductsForOrders = () => {
    let list = [];
    cart &&
      cart.map((items) => {
        let productObject = {
          productId: items?.id,
          quantity: items?.quantity,
          productType: items?.productType,
        };

        list.push(productObject);
      });

    return list;
  };

  const handleSubmit = () => {
    const paymentInfo = {
      email: localStorage.getItem("email"),
      timestamp: "",
      firstname: localStorage.getItem("firstName") || "John",
      lastname: localStorage.getItem("lastName") || "Doe",
      countryCode: "SA", // not getting from Database
      currency: "SAR", // not getting from Database

      orderData: {
        userId: localStorage.getItem("userId"),
        products: getProductsForOrders(),
        grandTotal: calculateTotalPrice().grandTotal,
        orderId: orderID,
      },
      // currency: "AED",
    };

    if (cart?.length) {
      api
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/payments/checkout`,
          paymentInfo,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        )
        .then((res) => {
          console.log("checkout", res.data.data.cashierSessionToken);
          loadPaytikoSdk(res.data.data.cashierSessionToken);
          // toast.success(res.data.message);
        })
        .catch((error) => {
          console.log(error);
          // if (error.response?.data == "Unauthorized") {
          //   localStorage.clear();
          //   navigate("/signin");
          // }
        });
    } else {
      toast.error("Cart is empty.");
    }
  };

  return (
    <>
      <main>
        <section className="sub-banner-link">
          <div className="container">
            <div className="row align-items-center">
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-7 col-12">
                <ul
                  className="product-banner-link banner-links d-flex align-items-center justify-content-md-start justify-content-center"
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
                    <NavLink to="">Cart</NavLink>
                  </li>
                </ul>
              </div>
              <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-5 col-12"></div>
            </div>
          </div>
        </section>
        <section className="cart-items">
          <div className="container">
            <div className="row">
              {isCartPending ? (
                <Loader />
              ) : cartError ? (
                <InfoMessage text={cartError} />
              ) : !cart?.length ? (
                <InfoMessage text="No products to show" />
              ) : (
                cart?.map((cart, index) => (
                  <div className="col-12" key={index}>
                    <div
                      className="cart-items-inner d-flex justify-content-between align-items-center"
                      data-aos="fade-up"
                      data-aos-delay="2500"
                      data-aos-duration="1000"
                    >
                      <div className="cart-item-img d-flex align-items-center">
                        <img
                          height={120}
                          width={150}
                          style={{ objectFit: "cover" }}
                          src={
                            cart?.productDetails?.image
                              ? `${process.env.REACT_APP_IMAGE_URL}/${cart?.productDetails?.image}`
                              : cart?.productDetails?.image
                              ? cart?.productDetails?.image
                              : "/assets/Giftcard/default-gift-card.jpg"
                          }
                          alt="cart"
                          onError={(e) => {
                            e.target.src =
                              "/assets/Giftcard/default-gift-card.jpg";
                          }}
                        />
                        <div className="cart-text d-flex flex-column">
                          <h6>
                            {cart?.productDetails?.productDetails?.nameEn ||
                              cart?.productDetails?.title}
                          </h6>
                          <span>{cart?.categoryName}</span>
                          <p>{cart?.productDetails?.priceInSAR?.toFixed(2)} SAR</p>
                        </div>
                      </div>
                      <div className="cart-items-inner-cantent d-flex justify-content-between align-items-center">
                        <div className="quantity d-flex flex-column align-items-center">
                          <p>Quantity</p>
                          <ul className="d-flex align-items-center">
                            <li
                              className="d-flex align-items-center justify-content-center cursor-pointer"
                              onClick={() => decreaseQuantity(cart.id)}
                            >
                              -
                            </li>
                            <li className="d-flex align-items-center justify-content-center">
                              <a href="#">{cart?.quantity}</a>
                            </li>
                            <li
                              className="d-flex align-items-center justify-content-center cursor-pointer"
                              onClick={() =>
                                cart?.productType ===
                                "bitaqty"
                                  ? increaseQuantity(cart.id)
                                  : increaseQuantity(cart.id, "binance")
                              }
                            >
                              +
                            </li>
                          </ul>
                        </div>
                        <div className="price-inner d-flex flex-column align-items-center">
                          <p>Total</p>
                          <h4>
                            {(
                              Number(cart?.productDetails?.priceInSAR) *
                              Number(cart?.quantity)
                            ).toFixed(2)}
                            {" SAR"}
                            {/* {cart?.id?.productDetails?.currency} */}
                          </h4>
                        </div>

                        <div
                          className="cart-bin-inner cursor-pointer"
                          onClick={() => removeFromCart(cart.id)}
                        >
                          <img src="/assets/Header/bin.svg" alt="bin" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </section>
        <section className="prices">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div
                  className="prices-inner"
                  data-aos="fade-up"
                  data-aos-delay="1200"
                  data-aos-duration="1000"
                >
                  <ul className="d-flex">
                    <li className="w-50">Total</li>
                    <li className="w-50 text-end">
                      {calculateTotalPrice().grandTotal} SAR
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-12">
                <ul className="prices-button d-flex align-items-center flex-wrap justify-content-end">
                  <li
                    data-aos="zoom-in"
                    data-aos-delay="1200"
                    data-aos-duration="1000"
                  >
                    <p
                      onClick={() => navigate(-1)}
                      type="submit"
                      className="btn btn-primary"
                    >
                      Continue Shopping
                    </p>
                  </li>
                  <li
                    data-aos="zoom-in"
                    data-aos-delay="1400"
                    data-aos-duration="1000"
                  >
                    <button
                      className="btn btn-primary checkoutBtn"
                      onClick={() => {
                        // handleSubmit();
                        navigate("/checkout")
                      }}
                    >
                      Checkout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
        <section className="also-like also-likes">
          <div className="container">
            <div className="row">
              <div
                className="title"
                data-aos="fade-right"
                data-aos-duration="1000"
              >
                <h6>You May Also Like</h6>
              </div>
            </div>
            <div className="row justify-content-center">
              {matchProduct &&
                matchProduct.map((product) => (
                  <div className="col-xxl-4 col-xl-4 col-lg-4 col-md-4 col-sm-6 col-9">
                    <div
                      className="gift-card-inner"
                      data-aos="zoom-out"
                      data-aos-delay="1000"
                      data-aos-duration="1000"
                    >
                      <div className="card position-relative">
                        <img
                          src={
                            product?.productDetails?.image
                              ?`${process.env.REACT_APP_IMAGE_URL}/${ product?.productDetails?.image}`        
                              : product?.image
                                ?`${process.env.REACT_APP_IMAGE_URL}/${product.image}`
                              : "/assets/Giftcard/default-gift-card.jpg"
                          }
                          className="card-img-top"
                          alt="gift"
                          onError={(e) => {
                            e.target.src =
                              "/assets/Giftcard/default-gift-card.jpg";
                          }}
                          onClick={() =>
                            navigate(`/gifts/${product?.productDetails?.productTag}/${product?.nameEn}/${product._id}`)
                          }
                        />
                        <div className="card-body position-relative ">
                          <h5 className="card-title">
                            {product?.productDetails?.nameEn}
                          </h5>
                          <span className="card-dip">
                            {product?.productDetails?.merchantNameEn}
                          </span>
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              width: "98%",
                              margin: "auto",
                            }}
                          >
                            <p
                              className="card-text"
                              style={{ marginBottom: "0px" }}
                            >
                              {product?.priceInSAR.toFixed(2)}

                              <span className="currencyInsar">SAR</span>
                            </p>
                            <div
                              onClick={() => addToCart(product?._id)}
                              className="add-top-cart-icon d-flex align-items-center"
                            >
                              <img
                                src="/assets/Trendinggiftcard/gift-card-icon.svg"
                                alt="gift-card-icon"
                              />
                              <span>Add</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

export default CartComponent;
