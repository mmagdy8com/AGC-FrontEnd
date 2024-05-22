import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { headers } from "../Components/helper";
import toast from "react-hot-toast";

const Thankyou = () => {
  const navigate = useNavigate();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const orderId = searchParams.get("m_orderId");

  const [orderData, setOrderData] = useState([]);

  useEffect(() => {
    async function confirmOrder() {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/confirmOrderPayment`,
          { orderId, userId: localStorage.getItem("userId") },
          { headers: headers }
        )
        .then(() => {
          toast.success("Payment successful.");
          if (orderId) {
            axios
              .get(
                `${process.env.REACT_APP_BACKEND_URL}/getOrdersByOrderId?orderId=${orderId}`
              )
              .then((response) => {
                setOrderData(response?.data?.data[0]?.products || []);
              })
              .catch((err) => {
                console.log(err);
              });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }

    confirmOrder();
  }, [orderId]);

  return (
    <div
      style={{
        margin: "auto",
        textAlign: "center",
        marginTop: "50px",
        marginBottom: "50px",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="170"
        height="160"
        viewBox="0 0 183 180"
        fill="none"
      >
        <path
          d="M89.7252 179.451C40.2504 179.451 0 139.2 0 89.7256C0 40.2508 40.2504 0 89.7252 0C139.201 0 179.451 40.2508 179.451 89.7256C179.451 139.2 139.201 179.451 89.7252 179.451ZM89.7252 9.23227C45.3411 9.23227 9.23226 45.3415 9.23226 89.7256C9.23226 134.11 45.3411 170.219 89.7252 170.219C134.109 170.219 170.219 134.11 170.219 89.7256C170.219 45.3415 134.109 9.23227 89.7252 9.23227Z"
          fill="url(#paint0_linear_1759_21104)"
        />
        <path
          d="M30.5611 84.9596L82.5268 141.422C84.689 143.772 88.4331 143.655 90.4448 141.175L181.475 28.9761C183.353 26.6601 182.921 23.2456 180.525 21.4702L158.181 4.91907C155.892 3.22357 152.668 3.66903 150.924 5.92125L91.1248 83.1736C89.1943 85.6677 85.5129 85.9013 83.2824 83.6708L57.5106 57.8989C55.4508 55.8387 52.1051 55.8567 50.0671 57.9386L30.6719 77.751C28.7234 79.742 28.6749 82.91 30.5611 84.9596Z"
          fill="url(#paint1_linear_1759_21104)"
        />
        <defs>
          <linearGradient
            id="paint0_linear_1759_21104"
            x1="0"
            y1="0"
            x2="191.486"
            y2="9.99099"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#68D1E8" />
            <stop offset="1" stop-color="#00677E" />
          </linearGradient>
          <linearGradient
            id="paint1_linear_1759_21104"
            x1="0"
            y1="0"
            x2="191.486"
            y2="9.99099"
            gradientUnits="userSpaceOnUse"
          >
            <stop stop-color="#68D1E8" />
            <stop offset="1" stop-color="#00677E" />
          </linearGradient>
        </defs>
      </svg>

      <div className="thank-you-content-holder">
        <p style={{ marginTop: "30px", fontSize: "15px", fontWeight: 500 }}>
          Your request for{" "}
          {orderData.map((orderproduct, index) => (
            <span style={{ color: "#22839a" }}>
              {orderproduct?.productId?.productDetails?.nameEn}
              {`${index + 1 < orderData.length ? ", " : " "}`}
            </span>
          ))}
          {"  "}
          has been successfully processed.
        </p>
        <p style={{ textAlign: "left", marginTop: "50px", fontWeight: 600 }}>
          To use your gift card, follow these simple steps:
        </p>
        <div>
          <ol style={{ textAlign: "left", marginTop: "20px" }}>
            <li style={{ marginBottom: "10px" }}>1. Log in to your account.</li>
            <li style={{ marginBottom: "10px" }}>
              2. Go to the “Gift Card” section.
            </li>
            <li>3. Enter the gift card code.</li>
          </ol>
        </div>
      </div>

      <div className="to-home-page-button-holder">
        <button
          onClick={() => navigate("/")}
          className="btn btn-primary mt-5 signupbtn"
        >
          <span>Return to the home page</span>
        </button>
      </div>
    </div>
  );
};

export default Thankyou;
