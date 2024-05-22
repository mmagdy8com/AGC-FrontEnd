import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Design/index.css";
import { headers } from "../helper";
import axios from "axios";
import toast from "react-hot-toast";

import {
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from "react-social-login-buttons";
import useCartContext from "../../hooks/useCartContext";
import { auth, google, facebook, twitter } from "../../firebase";
import { signInWithPopup } from "firebase/auth";

const Loginpage = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    emailOrPhone: "",
    password: "",
  });

  const { updateUserName, updateCurrentUserId } = useCartContext();

  const [hide, setHide] = useState(true);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    const isFormValid = Object.values(formData).every((value) => !!value);

    if (!isFormValid) {
      console.log("Please fill in all fields.");
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/signIn`,
        { ...formData },
        {
          headers: headers,
        }
      )
      .then((res) => {
        toast.success(res.data.message);
        if (res.status == 200) {
          const name = res.data.data.firstName + " " + res.data.data.lastName;
          updateUserName(name);
          updateCurrentUserId(res?.data?.data?._id);
          localStorage.setItem("accessToken", res.data.accessToken);
          localStorage.setItem("refreshToken", res.data.refreshToken);
          localStorage.setItem("userId", res.data.data._id);
          localStorage.setItem("firstName", res.data.data.firstName);
          localStorage.setItem(
            "lastName",
            res.data.data.lastName || "Customer"
          );

          localStorage.setItem("userName", name);
          localStorage.setItem("email", res.data.data.email);
          navigate("/");
        }
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  const handleSignInWithFirebase = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/loginWithGoogle`,
          {
            email: result?.user?.email || "",
            firstName: result?.user?.displayName?.split(" ")[0] || "",
            lastName: result?.user?.displayName?.split(" ")[1] || "",
            loginWithSocial: true,
            role: "customer",
          },
          {
            headers: headers,
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          if (res.status == 200) {
            const name = result?.user?.displayName;
            updateUserName(name);
            updateCurrentUserId(res.data.data._id);
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            localStorage.setItem("userId", res.data.data._id);
            localStorage.setItem("userName", name);
            localStorage.setItem(
              "firstName",
              result?.user?.displayName?.split(" ")[0]
            );
            localStorage.setItem(
              "lastName",
              result?.user?.displayName?.split(" ")[1]
            );
            localStorage.setItem("email", res.data.data.email);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.success("Something went wrong.");
        });
    } catch (err) {
      console.log(err);
      toast.error("Please choose correct Social media");
    }
  };

  const handleSignInWithTwitterFirebase = async (provider) => {
    try {
      const result = await signInWithPopup(auth, provider);
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/loginWithGoogle`,
          {
            email: result?._tokenResponse?.email || "",
            firstName: result?._tokenResponse?.displayName || "",
            lastName: "",
            loginWithSocial: true,
            role: "customer",
          },
          {
            headers: headers,
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          if (res.status == 200) {
            const name = result?._tokenResponse?.displayName;
            updateUserName(name);
            updateCurrentUserId(res.data.data._id);
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            localStorage.setItem("userId", res.data.data._id);
            localStorage.setItem("userName", name);
            localStorage.setItem(
              "firstName",
              result?._tokenResponse?.displayName
            );
            localStorage.setItem("lastName", "Customer");
            localStorage.setItem("email", res.data.data.email);
            navigate("/");
          }
        })
        .catch((err) => {
          console.log(err);
          toast.success("Something went wrong.");
        });
    } catch (err) {
      console.log(err);
      toast.error("Please choose correct Social media");
    }
  };

  return (
    <>
      <main>
        <div className="form-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="login-form-inner">
                  <div className="login-form-innerr text-start">
                    <label className="form-label">Email or Phone Number</label>
                    <input
                      type="email"
                      className="form-control"
                      name="emailOrPhone"
                      onChange={handleChange}
                      value={formData.emailOrPhone}
                    />
                  </div>
                  <div className="text-start">
                    <label className="form-label">Password</label>
                    <div className="position-relative">
                      {hide ? (
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          onChange={handleChange}
                          value={formData.password}
                        />
                      ) : (
                        <input
                          type="text"
                          className="form-control"
                          name="password"
                          onChange={handleChange}
                          value={formData.password}
                        />
                      )}

                      {hide ? (
                        <img
                          src={"assets/Login/eye.svg"}
                          alt="eye"
                          className="position-absolute eye"
                          onClick={() => setHide(false)}
                        />
                      ) : (
                        <img
                          src={"assets/Login/hideEye.png"}
                          alt="eye"
                          className="position-absolute eye"
                          onClick={() => setHide(true)}
                        />
                      )}
                    </div>
                    {/* <NavLink to="/registerNumber"> */}
                    <div className="d-flex justify-content-end">
                      <span
                        className="form-forgot "
                        onClick={() => navigate("/signup")}
                      >
                        Sign Up
                      </span>
                      <span
                        className="form-forgot ms-3"
                        onClick={() => navigate("/forgotpassword")}
                      >
                        Forgot Password?
                      </span>
                    </div>
                    {/* </NavLink> */}
                  </div>
                  <div className="w-100 d-flex flex-column mt-5 justify-content-center">
                    <button
                      onClick={() => handleSubmit()}
                      className="btn btn-primary cntBtn1 m-auto w-70"
                    >
                      <span className="loginBtn ">Continue</span>
                    </button>
                    {/* <button className="btn btn-primary-2 nafath-btn">
                      Continue with{" "}
                      <img src={"assets/Login/nafath.svg"} alt="nafath" />
                    </button> */}
                  </div>

                  {/* <div className="w-100 d-flex mt-5 justify-content-center">
                    <GoogleLoginButton
                      onClick={() => handleSignInWithFirebase(google)}
                    />
                  </div>

                  <div className="w-100 d-flex justify-content-center">
                    <FacebookLoginButton
                      onClick={() => handleSignInWithFirebase(facebook)}
                    />
                  </div>

                  <div className="w-100 d-flex justify-content-center">
                    <TwitterLoginButton
                      onClick={() => handleSignInWithTwitterFirebase(twitter)}
                    />
                  </div> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Loginpage;
