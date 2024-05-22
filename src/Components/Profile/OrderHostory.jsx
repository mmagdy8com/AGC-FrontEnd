import React from "react";
const OrderHistoryComponent = ({ cartData }) => {
  return (
    <>
      <div
        className="account-heading d-flex align-items-center"
        data-aos="fade-up"
        data-aos-delay="2500"
        data-aos-duration="1000"
      >
        <h5 className="mb-5">Order History</h5>
      </div>
      <div className="col-xxl-9 col-xl-8 col-lg-8 col-md-12">
        <div className="row justify-content-center">
          {cartData.map((cart) => (
            <div className="col-12 mb-3">
              <div
                className="history-inner d-flex align-items-center position-relative"
                data-aos="fade-up"
                data-aos-delay="2500"
                data-aos-duration="1000"
              >
                <div className="history-img">
                  <img
                    src={cart.image}
                    alt="cart"
                    style={{ objectFit: "cover" }}
                  />
                </div>
                <div className="w-100 history-text d-flex flex-column">
                  <ul className="d-flex justify-content-between p-0">
                    <li>
                      {cart.title}
                      <span>x2</span>
                    </li>
                    <li>Total: {(cart.price * 2).toFixed(2)} SAR </li>
                  </ul>
                  <span>{cart.category}</span>
                  <p>{cart.price.toFixed(2)} SAR</p>
                  <p>April 1st, 12:00 AM</p>
                </div>
                <a
                  href="checkout.html"
                  type="submit"
                  className="btn btn-primary position-absolute"
                >
                  buy Again
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default OrderHistoryComponent;
