import React, { useState, useMemo, useRef, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { headers } from "../helper";
import toast, { Toaster } from "react-hot-toast";
import Select from "react-select";
import countryList from "react-select-country-list";
import useCartContext from "../../hooks/useCartContext";
import { auth, facebook, google, twitter } from "../../firebase";
import { signInWithPopup } from "firebase/auth";
import {
  FacebookLoginButton,
  GoogleLoginButton,
  TwitterLoginButton,
} from "react-social-login-buttons";

const Signuppage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    // statusOrResidenceNumber: "",
    // dateOfBirth: null,
    email: "",
    password: "",
    // nationality: "",
    phoneNumber: "",
    firstName: "",
    lastName: "",
    confirmPassword: "",
    role: "customer",
  });
  const phoneRef = useRef(null);
  const { updateUserName } = useCartContext();
  const [timerDisplay, setTimerDisplay] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const options = useMemo(() => countryList().getData(), []);

  const [initialPhoneNumber, setInitialPhoneNumber] = useState("");

  const [value, setValue] = useState("");

  const [loader, setLoader] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [nationalId, setNationalId] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [transId, setTransId] = useState();
  const [randomNumber, setRandomNumber] = useState();
  const [intervalId, setIntervalId] = useState(null);
  const [initialCallMade, setInitialCallMade] = useState(false);
  const [flag, setFlag] = useState(true);
  const authToken = "3jS7:4yl(*9KwEDqq";

  useEffect(() => {
    if (initialCallMade === true && flag === true) {
      const checkStatus = async () => {
        try {
          if (flag === true) {
            axios
              .get(`${process.env.REACT_APP_BACKEND_URL}/getStatus`, {
                headers: {
                  "national-id": nationalId,
                  Authorization: authToken,
                  transId: transId,
                  random: randomNumber,
                },
              })
              .then((res) => {
                if (res.data.data.nafath_resp.status !== "400") {
                  
                  if (res.data.data.nafath_resp.status !== "WAITING") {
                    if (res.data.data.nafath_resp.status === "COMPLETED") {
                  
                      setIsVerified(true);
                      closeModal();
                      clearInterval(intervalId);
                      setInitialCallMade(false);
                      setFlag(false);
                      toast.success("verification successful!");
                      return;
                    } else {
                     
                      setIsVerified(false);
                      clearInterval(intervalId);
                      setInitialCallMade(false);
                      closeModal();
                      setFlag(false);
                      toast.error(
                        "verification failed! Please try again after sometime"
                      );
                    }
                  }
                } else {
               
                  setIsVerified(false);
                  clearInterval(intervalId);
                  // setInitialCallMade(false);
                }
              })
              .catch((error) => {
              
                setIsVerified(false);
                clearInterval(intervalId);
                setInitialCallMade(false);
                toast.error("An error occurred while fetching status.");
              });
          } else {
           
            return;
          }
        } catch (error) {
          console.error("Error fetching status:", error);
          setIsVerified(false);
          clearInterval(intervalId);
          setInitialCallMade(false);
          toast.error("An error occurred while fetching status.");
        }
      };

      if (initialCallMade) {
        
        const id = setInterval(checkStatus, 2000);
       
        setIntervalId(id);

        const timeoutId = setTimeout(() => {
          clearInterval(id);
          setInitialCallMade(false);
        }, 60000);

        return () => {
       
          clearInterval(intervalId);
          clearTimeout(timeoutId);
        };
      }
    }
  }, [initialCallMade]);
  
  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        // const minutes = Math.floor(timeLeft / 60);
        // const seconds = timeLeft % 60;

        // const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = timeLeft.toString().padStart(2, "0");

        setTimerDisplay(`${formattedSeconds}`);

        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(timerInterval);
        setInitialCallMade(false);
      }
    }, 1000);

    return () => {
      console.log("timerInterval", timerInterval);
      clearInterval(timerInterval);
    };
  }, [timeLeft]);

  console.log(timeLeft, "time left===");
  const changeHandler = (value) => {
    setValue(value);
  };

  const [termsAndConditions, setTermsAndConditions] = useState(false);
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleIdChange = (event) => {
    setNationalId(event.target.value);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDateChange = (date) => {
    setFormData((prevState) => ({
      ...prevState,
      dateOfBirth: date,
    }));
  };
  const handlePhoneNumberChange = (country, value, event) => {
    // console.log(value, country, event, "Debugging");

    console.log("value", value);
    console.log("country", country);
    // Check if 'value' and 'country' are valid
    if (value) {
      // Extract the dialCode and name from the 'country' object
      const { dialCode, name } = event;

      // Format the phone number with dialCode
      const formattedPhoneNumber = `+${dialCode}${value}`;
      console.log("dialCode", formattedPhoneNumber);
      // Update the 'phoneNumber' in formData
      setFormData((prevState) => ({
        ...prevState,
        phoneNumber: formattedPhoneNumber,
      }));
    }
  };

  const handleSubmit = () => {
    console.log(formData, "formsdasdf");
    const isFormValid = Object.values(formData).every((value) => !!value);
    console.log(formData, "formData");

    if (!isFormValid) {
      console.log("Please fill in all fields.");
      return;
    }
    if (!termsAndConditions) {
      console.log("Please agreed terms and conditions");
      return;
    }
    setLoader(true);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/signUp`,
        { ...formData },
        {
          headers: headers,
        }
      )
      .then((res) => {
        console.log("res", res);
        setLoader(false);
        toast.success(res.data.message);

        localStorage.setItem("phoneNumber", formData.phoneNumber);
        localStorage.setItem("email", formData.email);
        navigate("/verifysignupotp");
      })
      .catch((error) => {
        toast.error(
          error.response.data.message._message || error.response.data.message
        );
        setLoader(false);
        console.log(error);
      });
  };

  const handleSubmitId = () => {
    if (nationalId === "" && nationalId <= 0) {
      toast.error("Please enter valid Id");
      return;
    } else if (nationalId.length !== 10) {
      toast.error("Please enter 10 digit national id");
      return;
    } else {
      // setIsModalOpen(true)
      try {
        axios
          .post(
            `${process.env.REACT_APP_BACKEND_URL}/createSession`,
            {
              "National-ID": nationalId,
            },
            {
              headers: {
                Authorization: `Bearer ${authToken}`,
              },
            }
          )
          .then((res) => {
            // toast.success(res.data.message);
            if (
              res.data.data.nafath_resp.transId &&
              res.data.data.nafath_resp.random
            ) {
              // console.log(
              //   res.data.data.nafath_resp.transId,
              //   "responseeeeeeeeeeeeeeeeeee",
              //   res.data.data.nafath_resp.random
              // );
              setTimeLeft(59);
              setTimerDisplay("59");
              setInitialCallMade(true);
              openModal();
              setTransId(res.data.data.nafath_resp.transId);
              setRandomNumber(res.data.data.nafath_resp.random);
            } else {
              toast.error(res.data.data.nafath_resp.message);
            }
          })
          .catch((error) => {
            console.log(error, "error");
            // toast.error(error.data.nafath_resp.message);
          });
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    }
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
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            localStorage.setItem("userId", res.data.data._id);
            localStorage.setItem("userName", name);
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
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            localStorage.setItem("userId", res.data.data._id);
            localStorage.setItem("userName", name);
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

  const handle = (nationality) => {
    setFormData((prevState) => ({
      ...prevState,
      nationality: nationality,
    }));
  };

  // console.log(nationalId, "id////==_____");

  return (
    <>
      <main>
        <div className="form-section sign-up-section position-relative">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="sign-up-form">
                  {!isVerified && (
                    <div className="nafath-verify">
                      {" "}
                      <h1 style={{ fontWeight: "600", marginBottom: "20px" }}>
                        Verify your identity
                      </h1>
                      <p>
                        You will be able to Sign Up after successfully verifying
                        your identity
                      </p>
                      <div className="text-start contact-form-innerrrr padding-bottomm nafath-id-input">
                        <label className="form-label">
                          Status/residence number
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          // placeholder="****"
                          name="nafatId"
                          onChange={handleIdChange}
                          // value={formData.confirmPassword}
                        />
                        <p>
                          Already have an account?{" "}
                          <span
                            className="login-link"
                            onClick={() => navigate("/signin")}
                          >
                            Login
                          </span>
                        </p>
                        <button
                          type="button"
                          className="btn btn-primary-2 nafath-btn"
                          style={{ marginBottom: "70px" }}
                          // onClick={() => setIsVerified(true)}
                          onClick={handleSubmitId}
                        >
                          Go to{" "}
                          <img src={"assets/Login/nafath.svg"} alt="nafath" />
                        </button>

                        {isModalOpen && (
                          <div
                            className="position-absolute top-0 verify-model bg-white"
                            id="exampleModal"
                            // tabindex="-1"
                            // role="dialog"
                            // aria-labelledby="exampleModalLabel"
                            // aria-hidden="true"
                          >
                            <div className="modal-dialog p-5" role="document">
                              <div className="modal-content">
                                <div className="modal-header">
                                  <h5
                                    className="modal-title flex-grow-1"
                                    id="exampleModalLabel"
                                  >
                                    Open your phone and select correct number
                                  </h5>
                                  <button
                                    type="button"
                                    className="close"
                                    data-dismiss="modal"
                                    aria-label="Close"
                                    onClick={() => closeModal()}
                                  >
                                    {/* <span aria-hidden="true">&times;</span> */}
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="30"
                                      height="30"
                                      fill="#fff"
                                      class="bi bi-x-lg"
                                      viewBox="0 0 16 16"
                                    >
                                      <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                                    </svg>
                                  </button>
                                </div>
                                <div className="modal-body">
                                  <div>
                                    {/* <h2>77</h2> */}
                                    {randomNumber ? (
                                      <h2>{randomNumber}</h2>
                                    ) : (
                                      <h2>77</h2>
                                    )}
                                    {/* <div>
                                      <h1 className="fs-1">60</h1>
                                    </div> */}

                                    {timerDisplay == "01" ? (
                                      <>
                                        <span className="d-block text-center timer-block">
                                          Your time has expired.
                                        </span>
                                        {/* <button onClick={resendOTtp} className="btn  reasendOtpBtn">
                                              Resend Otp
                                            </button> */}
                                      </>
                                    ) : (
                                      <>
                                        <span className="d-block text-center timer-block">
                                          <p>
                                            The verification code expires in
                                          </p>{" "}
                                          <h1>{timerDisplay}</h1>
                                        </span>
                                        {/* <button
                                          onClick={handleSubmit}
                                          className="btn  verifyOtpBtn"
                                        >
                                          Verify
                                        </button> */}
                                      </>
                                    )}
                                  </div>
                                </div>
                                <div className="modal-footer">
                                  {/* <button
                                  type="button"
                                  className="btn btn-secondary"
                                  data-dismiss="modal"
                                >
                                  Close
                                </button>
                                <button type="button" className="btn btn-primary">
                                  Save changes
                                </button> */}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      {/* <button
                        className="btn btn-primary-2 nafath-btn"
                        style={{ marginBottom: "70px" }}
                        onClick={() => setIsVerified(true)}
                      >
                        Continue with{" "}
                        <img src={"assets/Login/nafath.svg"} alt="nafath" />
                      </button> */}
                    </div>
                  )}

                  {/* <div className="row">
                    <div className=" col-md-6 col-12">
                      <div className="login-form-innerr text-start padding-bottomm">
                        <label className="form-label">
                          Status/residence number
                        </label>
                        <input
                          type="number"
                          name="statusOrResidenceNumber"
                          className="form-control"
                          placeholder="12345678910"
                          onChange={handleChange}
                          value={formData.statusOrResidenceNumber}
                        />
                      </div>
                    </div>
                    <div className="col-md-6 col-12">
                      <div className="text-start padding-bottomm">
                        <label className="form-label">Date of Birth</label>
                        <div className="position-relative">
                          <DatePicker
                            selected={formData.dateOfBirth}
                            onChange={handleDateChange}
                            dateFormat="dd - MM - yyyy"
                            placeholderText="13 - 09 - 1999"
                            className="form-control"
                          />
                          <img
                            src={"assets/Signup/calender.svg"}
                            alt="calender"
                            className="position-absolute eye"
                          />
                        </div>
                      </div>
                    </div>
                  </div> */}

                  {isVerified && (
                    <div className="signup-form">
                      {" "}
                      <div className="row">
                        <div className=" col-md-6 col-12">
                          <div className="login-form-innerr text-start padding-bottomm">
                            <label className="form-label">First Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              name="firstName"
                              onChange={handleChange}
                              value={formData.firstName}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="login-form-innerr text-start padding-bottomm">
                            <label className="form-label">Last Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder=""
                              name="lastName"
                              onChange={handleChange}
                              value={formData.lastName}
                            />
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className=" col-md-6 col-12">
                          <div className="login-form-innerr text-start padding-bottomm">
                            <label className="form-label">Email</label>
                            <input
                              type="email"
                              className="form-control"
                              name="email"
                              onChange={handleChange}
                              value={formData.email}
                            />
                          </div>
                        </div>
                        <div className="col-md-6 col-12">
                          <div className="text-start contact-form-innerrrr padding-bottomm">
                            <label className="form-label">Phone Number</label>
                            <div className="position-relative">
                              <IntlTelInput
                                containerClassName="intl-tel-input telonSignupPage"
                                inputClassName="form-control"
                                initialValueFormat="national"
                                name="phoneNumber"
                                defaultValue={formData.phoneNumber}
                                ref={phoneRef}
                                defaultCountry="sa"
                                allowDropdown={false}
                                onPhoneNumberBlur={handlePhoneNumberChange}
                                // onPhoneNumberChange={handlePhoneNumberChange}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="row">
                        <div className=" col-md-6 col-12">
                          <div className="login-form-innerr text-start padding-bottomm">
                            <label className="form-label">Password</label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="****"
                              name="password"
                              onChange={handleChange}
                              value={formData.password}
                            />
                          </div>
                        </div>
                        <div className=" col-md-6 col-12">
                          <div className="text-start padding-bottomm">
                            <label className="form-label">
                              Confirm Password
                            </label>
                            <input
                              type="password"
                              className="form-control"
                              placeholder="****"
                              name="confirmPassword"
                              onChange={handleChange}
                              value={formData.confirmPassword}
                            />
                          </div>
                        </div>
                      </div>
                      {/* <div className="row">
                    <div className=" col-md-6 col-12">
                      <div className="text-start padding-bottomm">
                        <label className="form-label">Nationality</label>
                        <Select
                          className="selectCountry"
                          options={options}
                          value={formData.nationality}
                          onChange={handle}
                          name="nationality"
                        />
                      </div>
                    </div>
                  </div> */}
                      <div className="col-12 linkStyle">
                        <div className="form-check text-start padding-bottomm">
                          <input
                            type="checkbox"
                            className="form-check-input"
                            id="agreeToTerms"
                            name="agreeToTerms"
                            onChange={(event) =>
                              setTermsAndConditions(event.target.checked)
                            }
                            checked={termsAndConditions}
                          />
                          <label
                            className="form-check-label"
                            for="exampleCheck1"
                          >
                            I have read and agreed to the{" "}
                            <Link
                              to={"/termsandcondition"}
                              className="linkStyle"
                            >
                              terms and conditions
                            </Link>
                          </label>
                        </div>
                      </div>
                      <button
                        onClick={handleSubmit}
                        className="btn btn-primary mt-5 signupbtn"
                      >
                        {loader == true ? (
                          <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                          </div>
                        ) : (
                          <span>Continue</span>
                        )}
                      </button>
                    </div>
                  )}

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

export default Signuppage;
