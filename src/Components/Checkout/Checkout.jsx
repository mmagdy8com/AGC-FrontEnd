import React, { useState, useEffect } from "react";
import data from "../../JsonData/data.json";
import "./Design/CheckoutStyle.css";
import api from "../Interceptor/api";
import { useCart } from "../../context/createContext";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const CheckoutComponent = () => {
  const { cryptoCoins } = data;

  const [cartItems, setCartItems] = useState([]);
  const [formData, setFormData] = useState({
    cardNumber: "",
    nameOfCard: "",
    expiry: "",
    securityCode: "",
  });
  const [debitCreditCardOpen, setDebitCreditCardOpen] = useState(false);
  const [cryptocurrencyOpen, setCryptocurrencyOpen] = useState(false);
  const [cryptoCoinsData, setCryptoCoinsData] = useState(cryptoCoins);
  const [selectedCrypto, setSelectedCrypto] = useState(null);

  const { cartData, setCartData } = useCart();

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

  // const { cartData } = useCart();

  // useEffect(() => {
  //   // Create a script element
  //   const script = document.createElement("script");
  //   script.src = "https://core.paytiko.com/cdn/js/sdk/paytiko-sdk.1.0.min.js";
  //   script.async = true;

  //   // Define a function to load and execute the Paytiko SDK
  //   const loadPaytikoSdk = (sessionToken) => {
  //     script.onload = () => {
  //       // Now the Paytiko SDK is available, and you can use it
  //       // For example, you can initialize Paytiko here
  //       // Paytiko.init();

  //       // Use PaytikoSdk.cashier.invoke() here
  //       PaytikoSdk.cashier.invoke({
  //         environment: "UAT",
  //         amount: 12.58,
  //         orderId: "123",
  //         sessionToken: sessionToken,
  //         iframeContainerSelector: "div#cashier-iframe-container",
  //         displayMode: "PAYTIKO_CASHIER_DISPLAY_MODE.IFRAME",
  //         locale: "'en-US",
  //       });
  //     };

  //     // Append the script element to the document's head
  //     document.head.appendChild(script);
  //   };

  //   // setCartItems(data.cartData);
  //   // setCartData(data.cartData);
  //   // PaytikoSdk.cashier.invoke({
  //   //   environment: "UAT",
  //   //   amount: 12.58,
  //   //   orderId: "",
  //   //   sessionToken: "",
  //   //   iframeContainerSelector: "",
  //   //   displayMode: "",
  //   //   locale: "",
  //   // });

  //   // Clean up by removing the script element when the component unmounts
  //   return () => {
  //     document.head.removeChild(script);
  //   };
  // }, []);
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

  useEffect(() => {
    getCartList();
  }, []);

  const getCartList = () => {
    api
      .get(
        `${process.env.REACT_APP_BACKEND_URL}/getCart/${localStorage.getItem(
          "userId"
        )}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
      .then((res) => {
        console.log("getcartlist", res.data.data);
        setCartItems(res.data.data);
        setCartData(res.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const increaseQuantity = (itemId) => {
     const findItem = cartItems.find((item) => item.id === itemId);
    if (findItem.quantity + 1 > findItem.productDetails?.minQty) {
      toast.error("Selected quantity not available");
      return;
    }
    try {
      const updatedCartItems = cartItems.map((item) => {
        if(item.id === itemId) {
          return { ...item, quantity: (item.quantity || 0) + 1 };
        }
        return item;
      });
      setCartItems(updatedCartItems);
      calculateTotalPrice();
    }
    catch(error){
      console.error("Error while increasing quantity: ", error);
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const decreaseQuantity = (itemId) => {
    const updatedCartItems = cartItems
      .map((item) => {
        if (item.id === itemId) {
          const newQuantity = (item.quantity || 0) - 1;
          if (newQuantity <= 0) {
            return null;
          }
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
      .filter((item) => item !== null);
    setCartItems(updatedCartItems);
    calculateTotalPrice();
  };
  const calculateTotalPrice = () => {
    let totalPrice = 0;
    let totalVAT = 0;

    cartItems.forEach((item) => {
      // console.log("item11111", item);
      // const itemVAT = item.VAT || 0;
      const itemPrice = item?.productDetails?.priceInSAR || 0;
      const itemQuantity = item?.quantity || 1; // Default quantity to 1 if undefined
      const itemVAT = item?.VAT || 0;

      const itemTotalPrice = itemPrice * itemQuantity;
      totalPrice += itemTotalPrice;
      // const itemTotalVAT = itemQuantity * itemVAT;
      // totalVAT += itemTotalVAT;
    });

    const grandTotal = totalPrice;

    return {
      totalPrice: totalPrice.toFixed(2),
      // totalVAT: totalVAT.toFixed(2),
      grandTotal: grandTotal.toFixed(2),
    };
  };

  const removeFromCart = (itemId) => {
    const updatedCartItems = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCartItems);

    const info = {
      userId: localStorage.getItem("userId"),
      productId: itemId,
    };

    api
      .post(`${process.env.REACT_APP_BACKEND_URL}/removeFromCart`, info, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      })
      .then((res) => {
        // console.log("getcartlist", res);
        toast.success(res.data.message);
        getCartList();
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const togglePaymentMethod = (method) => {
    if (method === "debitCreditCard") {
      setDebitCreditCardOpen((prevOpen) => !prevOpen);
      setCryptocurrencyOpen(false);
    } else if (method === "cryptocurrency") {
      setCryptocurrencyOpen((prevOpen) => !prevOpen);

      setDebitCreditCardOpen(false);
    }
  };

  const handleSearch = (searchQuery) => {
    const filteredCoins = cryptoCoins.filter((coin) =>
      coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setCryptoCoinsData(filteredCoins);
  };
  const handleCryptoSelection = (coin) => {
    setSelectedCrypto(coin.id);
  };

  const getProductsForOrders = () => {
    let list = [];
    cartData &&
      cartData.map((items) => {
        let productObject = {
          productId: items?.id,
          quantity: items?.quantity,
          productType: items?.productType,
          image: items?.productDetails?.image
        };

        list.push(productObject);
      });

    return list;
  };
  const handleSubmit = () => {
    const paymentInfo = {
      email: localStorage.getItem("email"),
      timestamp: "",
      amount: calculateTotalPrice().grandTotal,
      firstname: localStorage.getItem("firstName") || "John",
      lastname: localStorage.getItem("lastName") || "Doe",
      countryCode: "SA",
      currency: "SAR",

      orderData: {
        userId: localStorage.getItem("userId"),
        products: getProductsForOrders(),
        grandTotal: calculateTotalPrice().grandTotal,
        orderId: orderID,
      },
      // currency: "AED",
    };

    if(cartItems?.length) {
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
    <main>
      <section className="sub-banner-link">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12">
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
                  <NavLink to="/cart">Cart</NavLink>
                </li>
                <li>
                  <img src="/assets/Contact/arrow.svg" alt="arrow" />
                </li>
                <li>
                  <NavLink to="">Checkout</NavLink>
                </li>
              </ul>
            </div>
            <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-6 col-12">
              <form>
                <div
                  className="position-relative form-inner"
                  data-aos="fade-left"
                  data-aos-delay="2500"
                  data-aos-duration="1000"
                >
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Search"
                  />
                  <img
                    className="position-absolute input-search"
                    src="/assets/Banner/search.svg"
                    alt="search"
                  />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
      <section className="checkout">
        <div className="container">
          <div className="row">
            <div className="col-xxl-8 col-xl-8 col-lg-7 col-md-12">
              <div className="chekout-forms">
                <h5
                  data-aos="fade-right"
                  data-aos-delay="2700"
                  data-aos-duration="1000"
                >
                  Payment Method
                </h5>
                <div
                  className="accordion accordion-flush"
                  id="accordionFlushExample"
                >
                  <div
                    className="accordion-item"
                    data-aos="fade-up"
                    data-aos-delay="2800"
                    data-aos-duration="1000"
                  >
                    <h2 className="accordion-header">
                      <button
                        // className={`accordion-button ${
                        //   debitCreditCardOpen ? "" : "collapsed"
                        // }`}
                        className={`accordion-button collapsed`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                        // onClick={() => togglePaymentMethod("debitCreditCard")}
                      >
                        Debit/Credit Card
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      // className={`accordion-collapse collapse ${
                      //   debitCreditCardOpen ? "show" : ""
                      // }`}
                      // className={`accordion-collapse collapse`}
                      data-bs-parent="#accordionFlushExample"
                    >
                      {/* Commented because Other Payment Method is not working. */}

                      {/* <div className="accordion-body">
                        <div className="row">
                          <div className=" col-12 checkout-margin">
                            <label className="form-label">Card Number</label>
                            <input
                              type="text"
                              className="form-control"
                              name="cardNumber"
                              onChange={handleChange}
                              value={formData.cardNumber}
                            />
                          </div>
                          <div className=" col-12 checkout-margin">
                            <label className="form-label">Name on Card</label>
                            <input
                              type="text"
                              className="form-control"
                              name="nameOfCard"
                              onChange={handleChange}
                              value={formData.nameOfCard}
                            />
                          </div>
                          <div className=" col-6">
                            <label className="form-label">
                              Expiration Date
                            </label>
                            <input
                              type="text"
                              className="form-control"
                              name="expiry"
                              onChange={handleChange}
                              value={formData.expiry}
                            />
                          </div>
                          <div className=" col-6">
                            <label className="form-label">Security Code</label>
                            <input
                              type="text"
                              className="form-control"
                              name="securityCode"
                              onChange={handleChange}
                              value={formData.securityCode}
                            />
                          </div>
                        </div>
                      </div> */}
                    </div>
                  </div>
                  {/* <div
                    className="accordion-item"
                    data-aos="fade-up"
                    data-aos-delay="3000"
                    data-aos-duration="1000">
                    <h2 className="accordion-header">
                      <button
                        className={`accordion-button ${
                          cryptocurrencyOpen ? "" : "collapsed"
                        }`}
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseTwo"
                        onClick={() => togglePaymentMethod("cryptocurrency")}>
                        Cryptocurrency
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      className={`accordion-collapse collapse ${
                        cryptocurrencyOpen ? "show" : ""
                      }`}
                      data-bs-parent="#accordionFlushExample">
                      <div className="accordion-body Cryptocurrency-form">
                        <div className=" col-12 checkout-margin position-relative">
                          <input
                            type="text"
                            placeholder="Search for currency"
                            className="form-control"
                            onChange={(e) => handleSearch(e.target.value)}
                          />
                          <img
                            src="/assets/Banner/search.svg"
                            alt="shearch-3"
                          />
                        </div>
                        <ul className="Cryptocurrency-list d-flex flex-column">
                          {cryptoCoinsData.map((coin) => (
                            <li
                              key={coin.id}
                              onClick={() => handleCryptoSelection(coin)}>
                              <a
                                className={`d-flex align-items-center cursor-pointer ${
                                  selectedCrypto === coin.id ? "selected" : ""
                                }`}>
                                <img src={coin.image} alt={coin.name} />
                                <span>{coin.name}</span>
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div> */}
                </div>
                <div className="chekout-forms-btn">
                  <div
                    className="d-inline-block"
                    data-aos="zoom-in"
                    data-aos-delay="3000"
                    data-aos-duration="1000"
                  >
                    <button
                      type="submit"
                      className="btn btn-primary paynoWBtn"
                      // data-bs-toggle="modal"
                      onClick={() =>
                        cartItems?.length
                          ? handleSubmit()
                          : toast.error("No item to checkout")
                      } // need to check is there is item or not
                    >
                      Pay Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xxl-4 col-xl-4 col-lg-5 d-none d-lg-block">
              <div className="checkout-items">
                <h5
                  data-aos="fade-left"
                  data-aos-delay="2700"
                  data-aos-duration="1000"
                >
                  Order Summary
                </h5>
                <div
                  className="checkout-cart"
                  data-aos="fade-up"
                  data-aos-delay="2800"
                  data-aos-duration="1000"
                >
                  <ul>
                    {cartItems?.length ? (
                      cartItems?.map((cart, index) => (
                        <li
                          className="d-flex align-items-center justify-content-between"
                          key={index}
                        >
                          <div className="checkout-cart-inner d-flex align-items-center">
                            <img
                              src={`${process.env.REACT_APP_IMAGE_URL}/${cart?.productDetails?.image}`}
                              alt="cart"
                              style={{ objectFit: "cover" }}
                              onError={(e) => {
                                e.target.src =
                                  "/assets/Giftcard/default-gift-card.jpg";
                              }}
                            />
                            <div className="checkout-cart-text d-flex flex-column">
                              <p>{cart?.productDetails?.productDetails?.nameEn ||
                              cart?.productDetails?.title}</p>
                              <h6>{cart?.productDetails?.priceInSAR.toFixed(2)} SAR</h6>
                              <ul className="d-flex checkout-cart-text-btn">
                                <li
                                  className="d-flex align-items-center justify-content-center cursor-pointer"
                                  onClick={() => decreaseQuantity(cart?.id)}
                                >
                                  -
                                </li>
                                <li className="d-flex align-items-center justify-content-center">
                                  <a href="#">{cart?.quantity}</a>
                                </li>
                                <li
                                  className="d-flex align-items-center justify-content-center cursor-pointer"
                                  onClick={() => increaseQuantity(cart?.id)}
                                >
                                  +
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div
                            className="checkout-cart-icon cursor-pointer"
                            onClick={() => removeFromCart(cart?.id)}
                          >
                            <img src="/assets/Header/bin.svg" alt="bin" />
                          </div>
                        </li>
                      ))
                    ) : (
                      <h6 style={{ textAlign: "center", marginBottom: "20px" }}>
                        No items to Checkout
                      </h6>
                    )}
                  </ul>
                  <div className="checkout-prices-inner">
                    <ul className="d-flex align-items-center">
                      <li className="w-50">Total</li>
                      <li className="w-50 text-end">
                        {calculateTotalPrice().grandTotal} SAR
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default CheckoutComponent;
