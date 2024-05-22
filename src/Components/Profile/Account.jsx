import React, { useEffect, useState, useMemo, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "./Design/index.css";
import OTPInput from "react-otp-input";
import api from "../Interceptor/api";
import Select from "react-select";
import countryList from "react-select-country-list";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import toast from "react-hot-toast";
import axios from "axios";
import useCartContext from "../../hooks/useCartContext";
const Account = () => {
  const { updateUserName } = useCartContext();

  const options = useMemo(() => countryList().getData(), []);
  const [accountInfo, setAccountInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    DOB: "",
    selectVal: null,
  });

  const [timeLeft, setTimeLeft] = useState(118);
  const [timerDisplay, setTimerDisplay] = useState("1:58");
  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const navigate = useNavigate();

  const [newNumber, setNewNumber] = useState("");
  const [newNum, setNewNum] = useState(true);

  const [read, setRead] = useState(true);

  const [open, setOpen] = useState(false);

  const [submit, setSubmit] = useState(false);

  const [otp, setOtp] = useState("");

  const phoneRef = useRef(null);

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    // setPhoneNumber(localStorage.getItem("phoneNumber"));
    // const y = localStorage.getItem("phoneNumber");
    console.log("newNumber", newNumber);
    const phoneNumberArray = newNumber?.split("");

    const first = phoneNumberArray?.slice(0, 3);
    const second = phoneNumberArray?.slice(-3);

    const firstDigit = first?.join("");
    setFirst(firstDigit);
    const lastDigit = second?.join("");
    setLast(lastDigit);
  }, [newNumber]);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      if (timeLeft > 0) {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;

        const formattedMinutes = minutes.toString().padStart(2, "0");
        const formattedSeconds = seconds.toString().padStart(2, "0");

        setTimerDisplay(`${formattedMinutes}:${formattedSeconds}`);

        setTimeLeft(timeLeft - 1);
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);

    return () => {
      clearInterval(timerInterval);
    };
  }, [submit]);

  const getUserInfo = () => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    api
      .get(`${process.env.REACT_APP_BACKEND_URL}/getSingleUser/${userId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        const date = new Date(res.data.data.dateOfBirth);

        const year = date.getUTCFullYear();
        const month = String(date.getUTCMonth() + 1).padStart(2, "0");
        const day = String(date.getUTCDate()).padStart(2, "0");

        const formattedDate = `${year}-${month}-${day}`;

        setAccountInfo(() => {
          return {
            ...accountInfo,
            firstName: res.data.data.firstName || res.data.data.firstName,
            lastName: res.data.data.lastName || res.data.data.lastName,
            email: res.data.data.email,
            phoneNumber: res.data.data.phoneNumber,
            DOB: formattedDate,
            selectVal: res.data.data.nationality,
          };
        });
      })
      .catch((error) => {
        console.log("error", error);
        if (error.response?.data == "Unauthorized") {
          localStorage.clear();
          navigate("/signin");
        }
      });
  };
  const getData = (e) => {
    const { name, value } = e.target;
    setAccountInfo(() => {
      return {
        ...accountInfo,
        [name]: value,
      };
    });
  };

  const handleNumber = (e) => {
    const { name, value } = e.target;
    setNewNumber(e.target.value);
  };
  const submitData = () => {
    if (
      accountInfo.firstName === "" ||
      accountInfo.lastName === "" ||
      accountInfo.email === "" ||
      accountInfo.phoneNumber === "" ||
      accountInfo.date === "" ||
      accountInfo.selectVal === ""
    ) {
      alert("Please fill all the details");
    } else {
      console.log("call api");
    }
  };
  const editUserInfo = () => {
    setRead(!read);
  };

  const editPhoneNumber = () => {
    setOpen(true);
  };

  const handle = (selectVal) => {
    setAccountInfo((prevState) => ({
      ...prevState,
      country: selectVal,
    }));
  };

  const handlePhoneNumberChange = (value, country, event, phoneNumber) => {
    // Check if 'value' and 'country' are valid
    if (value && country) {
      // Extract the dialCode and name from the 'country' object
      // const { dialCode, name } = event;

      // Format the phone number with dialCode
      // const formattedPhoneNumber = `+${dialCode}${value}`;
      // Update the 'phoneNumber' in formData

      const number = value.includes("-")
        ? value.split("-")[1].replace(/[^\d]/g, "")
        : value.replace(/[^\d]/g, ""); // Remove non-numeric characters
      const countryCode = `+${country.dialCode}`;
      const formattedNumber = `${countryCode}-${number}`;
      setAccountInfo((prevState) => ({
        ...prevState,
        phoneNumber: value,
      }));

      // setNewNumber(formattedPhoneNumber);
    }
  };

  const handlePhoneNumberChange1 = (country, value, event, phoneNumber) => {
    console.log(value, country, event, phoneNumber, "Debugging");

    // Check if 'value' and 'country' are valid
    if (value && country) {
      // Extract the dialCode and name from the 'country' object
      const { dialCode, name } = event;

      // Format the phone number with dialCode
      const formattedPhoneNumber = `+${dialCode}${value}`;
      console.log("formattedPhoneNumber", formattedPhoneNumber);
      // Update the 'phoneNumber' in formData

      setNewNumber(formattedPhoneNumber);
    }
  };

  const changePhoneNumber = () => {
    setOpen(false);
    const token = localStorage.getItem("accessToken");
    const number = {
      phoneNumber: newNumber,
    };

    console.log("number", number);

    api
      .post(`${process.env.REACT_APP_BACKEND_URL}/phoneNumOTP`, number, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log("res", res);
        setOpen(false);
        setTimeLeft(118);
        setTimerDisplay("1:58");
        setSubmit(true);
        setNewNum(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const verifyOtp = () => {
    const token = localStorage.getItem("accessToken");
    const info = {
      id: localStorage.getItem("userId"),
      phoneNumber: newNumber,
      otp: otp,
    };
    api
      .post(`${process.env.REACT_APP_BACKEND_URL}/changePhoneNum`, info, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        toast.success("Otp verified successfully!");
        // getUserInfo();
        setSubmit(false);
        console.log(phoneRef.current, "newNumber");
        setTimeout(() => {});
        // phoneRef.current.value = newNumber;
        setAccountInfo(() => {
          return {
            ...accountInfo,
            phoneNumber: newNumber,
          };
        });
        setNewNum(true);
      })

      .catch((error) => {
        console.log(error);
      });
  };

  const resendOTtp = () => {
    setTimeLeft(118);
    setTimerDisplay("01:58");
    console.log("newNumber", newNumber);
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/resendOtp`,
        {
          phoneNumber: newNumber,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((res) => {
        console.log("res", res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const updateUser = () => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    accountInfo.id = userId;
    // console.log("accountInfo", accountInfo);
    api
      .post(`${process.env.REACT_APP_BACKEND_URL}/updateUser`, accountInfo, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        let name = `${accountInfo.firstName} ${accountInfo.lastName}`;
        updateUserName(name);
        toast.success(res.data.message);
        getUserInfo();
        setRead(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <>
      <div
        className="account-heading d-flex align-items-center"
        data-aos="fade-up"
        data-aos-delay="2500"
        data-aos-duration="1000"
      >
        <h5>My Account</h5>
        <NavLink>
          <div className="edit-account d-flex align-items-center">
            {/* <img src="assets/Account/edit.svg" alt="edit" /> */}
            {/* <span onClick={editUserInfo}>Edit</span> */}
          </div>
        </NavLink>
      </div>
      <div className="col-xxl-7 col-xl-8 col-lg-8 col-md-12">
        <div className="account-info edit-profiless">
          <form>
            <div className="account-info-inner">
              <div className="row account-margin">
                <div className="col-xxl-6 col-md-6 col-12">
                  <ul
                    className="account-about"
                    data-aos="fade-up"
                    data-aos-delay="2500"
                    data-aos-duration="1000"
                  >
                    <li className="account-labal">First Name</li>
                    <li>
                      <input
                        className="account-input"
                        onChange={getData}
                        value={accountInfo.firstName}
                        name="firstName"
                        type="text"
                        // readOnly={read}
                      />
                    </li>
                  </ul>
                </div>
                <div className="col-xxl-6 col-md-6 col-12">
                  <ul
                    className="account-about cutm-padding"
                    data-aos="fade-up"
                    data-aos-delay="2600"
                    data-aos-duration="1000"
                  >
                    <li className="account-labal">Last Name</li>
                    <li>
                      <input
                        className="account-input"
                        onChange={getData}
                        value={accountInfo.lastName}
                        name="lastName"
                        type="text"
                        // readOnly={read}
                      />
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row account-margin">
                <div className="col-xxl-6 col-md-6 col-12">
                  <ul
                    className="account-about"
                    data-aos="fade-up"
                    data-aos-delay="2700"
                    data-aos-duration="1000"
                  >
                    <li className="account-labal">Email</li>
                    <li>
                      <input
                        className="account-input"
                        type="email"
                        onChange={getData}
                        value={accountInfo.email}
                        name="email"
                        readOnly
                      />
                    </li>
                  </ul>
                </div>
                <div className="col-xxl-6 col-md-6 col-12">
                  <ul
                    className="account-about contect-info-inner cutm-padding"
                    data-aos="fade-up"
                    data-aos-delay="2800"
                    data-aos-duration="1000"
                  >
                    <li className="account-labal">Mobile Number</li>
                    {/* {console.log("account", accountInfo)} */}
                    <li className="position-relative selectedCountry">
                      {/* {accountInfo?.phoneNumber && newNum && ( */}
                      <IntlTelInput
                        containerClassName="intl-tel-input telonSignupPage"
                        inputClassName="form-control"
                        initialValueFormat="national"
                        onlyCountries={["sa"]}
                        defaultCountry="sa"
                        // excludeCountries={["us", "gb"]}
                        name="phoneNumber"
                        ref={phoneRef}
                        allowDropdown={false}
                        // value={accountInfo?.phoneNumber || "+966"}
                        value={accountInfo?.phoneNumber || ""}
                        onPhoneNumberChange={(
                          status,
                          value,
                          countryData,
                          number,
                          id
                        ) => {
                          handlePhoneNumberChange(value, countryData);
                        }}
                      />
                      {/* )} */}
                      {/* <span
                        className="btn btn-primary accountSaveBtn"
                        onClick={() => editPhoneNumber()}
                      >
                        Change Mobile No
                      </span> */}
                      {/* <img
                        src="/assets/Style/editIcon.png"
                        alt="edit"
                        className="editIconforPhone"
                        onClick={() => editPhoneNumber()}
                      /> */}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="row">
                <div className="col-xxl-6 col-md-6 col-12">
                  <ul
                    className="account-about"
                    data-aos="fade-up"
                    data-aos-delay="2900"
                    data-aos-duration="1000"
                  >
                    <li className="account-labal">Date of Birth</li>
                    <li className="cstm-calender position-relative">
                      <input
                        className="account-input"
                        type="Date"
                        onChange={getData}
                        value={accountInfo.DOB}
                        name="DOB"
                        placeholder="13 - 09 - 1999"
                      />
                    </li>
                  </ul>
                </div>
                {/* <div className="col-xxl-6 col-md-6 col-12 ">
                  <ul
                    className="account-abou cutm-padding selectedCountryForUser"
                    data-aos="fade-up"
                    data-aos-delay="3000"
                    data-aos-duration="1000"
                  >
                    <li className="account-labal">Country</li>
                    <Select
                      className="selectCountry  countrySelected"
                      options={options}
                      value={accountInfo?.country || accountInfo?.selectVal}
                      onChange={handle}
                      name="selectVal"
                      // isDisabled={read}
                    />
                  </ul>
                </div> */}
              </div>
            </div>
            <div
              className="edit-profile-btn"
              data-aos="fade-up"
              data-aos-delay="3000"
              data-aos-duration="1000"
            >
              <NavLink
                type="submit"
                className="btn btn-primary accountSaveBtn"
                onClick={() => updateUser()}
              >
                Save
              </NavLink>
            </div>
          </form>
        </div>
      </div>
      {open && (
        <div>
          <div className="modal-mask numberModal">
            <div className="modal-container">
              <div>
                <ul
                  className="account-about contect-info-inner cutm-padding"
                  data-aos="fade-up"
                  data-aos-delay="2800"
                  data-aos-duration="1000"
                >
                  <li className="account-phone-labal">Phone Number</li>
                  <li className="position-relative">
                    {/* <input
                      className="account-phone-input"
                      name="newNumber"
                      onChange={handleNumber}
                      value={newNumber}
                      type="tel"
                      placeholder="12345678901"
                    /> */}
                    <IntlTelInput
                      containerClassName="intl-tel-input"
                      inputClassName="form-control"
                      initialValueFormat="national"
                      name="newNumber"
                      ref={phoneRef}
                      onPhoneNumberBlur={handlePhoneNumberChange1}
                      // onPhoneNumberChange={handlePhoneNumberChange}
                    />
                  </li>
                </ul>
              </div>
              <button
                className="btn btn-primary phoneSubmitBtn "
                onClick={() => changePhoneNumber()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
      {submit && (
        <>
          <div>
            <div className="modal-mask">
              <div className="modal-container">
                <div className="otp-container">
                  <p className="text-center">
                    A verification code was sent to your phone number
                    {first} ******{last}
                  </p>
                  <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    renderSeparator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                </div>
                {timerDisplay == "00:01" ? (
                  <>
                    <span className="d-block text-center">
                      Your time has expired. Please click on resend otp to get
                      new OTP.
                    </span>
                    <button onClick={resendOTtp} className="btn btn-primary">
                      Resend Otp
                    </button>
                  </>
                ) : (
                  <>
                    <span className="d-block text-center">
                      The verification code expires in {timerDisplay}
                    </span>
                    <button
                      onClick={() => verifyOtp()}
                      className="btn  verifyOtpBtn"
                    >
                      Verify
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};
export default Account;
