import axios from "axios";
import React, { useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import IntlTelInput from "react-intl-tel-input";

const Contactus = () => {
  const phoneRef = useRef(null);

  const [contactUsInfo, setContactUsInfo] = useState({
    email: "",
    phoneNum: "",
    subject: "",
    fullName: "",
    message: "",
  });

  const handleInputChange = (telNumber, selectedCountry) => {
    const number = telNumber.replace(/[^\d]/g, ""); // Remove non-numeric characters
    const countryCode = `+${selectedCountry.dialCode}`;
    const formattedNumber = `${countryCode}-${number}`;
    setContactUsInfo((prev) => ({ ...prev, phoneNum: formattedNumber }));
  };

  const handleChange = (e) => {
    setContactUsInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  function findEmptyFields(obj) {
    const emptyFields = [];

    for (let key in obj) {
      if (
        obj.hasOwnProperty(key) &&
        (obj[key] === "" || obj[key] === null || obj[key] === undefined)
      ) {
        emptyFields.push(key);
      }
    }

    return emptyFields;
  }

  const handleSubmit = async (e) => {
    const emptyFields = findEmptyFields(contactUsInfo);
    if (emptyFields?.length) {
      toast.error(`Please enter ${emptyFields[0]}`);
    } else {
      await axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/contactUs`, contactUsInfo, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          if (res.status == 200) {
            toast(res.data.message);
            setContactUsInfo({
              email: "",
              phoneNum: "",
              subject: "",
              fullName: "",
              message: "",
            });
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  return (
    <>
      <div className="contact-us position-relative">
        <div className="contact-img position-absolute d-none d-lg-block">
          <img
            src={"assets/Contact/contact-1.svg"}
            alt=""
            className="img-fluid"
          />
        </div>
        <div className="container">
          <div className="row">
            <div
              className="contact-title"
              data-aos="fade-up"
              data-aos-delay="2500"
              data-aos-duration="1000">
              <h5>Contact Us</h5>
            </div>
          </div>
          <div className="row">
            <div className="col-xxl-8 col-xl-8 col-lg-7 col-12">
              <div className="row">
                <form>
                  <div className="col-12">
                    <div
                      className="contact-form"
                      data-aos="fade-up"
                      data-aos-delay="2500"
                      data-aos-duration="1000">
                      <label className="form-label">Full Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name="fullName"
                        value={contactUsInfo?.fullName || ""}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div
                      className="contact-form"
                      data-aos="fade-up"
                      data-aos-delay="2600"
                      data-aos-duration="1000">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={contactUsInfo?.email || ""}
                        onChange={(e) => handleChange(e)}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div
                      className="contact-form"
                      data-aos="fade-up"
                      data-aos-delay="2700"
                      data-aos-duration="1000">
                      <label className="form-label">Phone Number</label>
                      <br />
                      <IntlTelInput
                        // containerClassName="intl-tel-input"
                        inputClassName="form-control-contact"
                        initialValueFormat="national"
                        name="phoneNum"
                        ref={phoneRef}
                        defaultCountry="sa"
                        onPhoneNumberChange={(
                          status,
                          value,
                          countryData,
                          number,
                          id
                        ) => {
                          handleInputChange(value, countryData);
                        }}
                      />
                    </div>
                  </div>
                  <div className="col-12">
                    <div
                      className="contact-form"
                      data-aos="fade-up"
                      data-aos-delay="2800"
                      data-aos-duration="1000">
                      <label className="form-label">Subject</label>
                      <div className="d-flex flex-wrap">
                        <div className="form-check position-relative">
                          <input
                            className="form-check-input  rounded-4 border-dark"
                            type="radio"
                            id="exampleRadios1"
                            value="Suggestion"
                            name="subject"
                            onChange={(e) => handleChange(e)}
                          />
                          <label
                            className="form-check-label position-absolute"
                            for="exampleRadios1">
                            Suggestion
                          </label>
                        </div>
                        <div className="form-check position-relative">
                          <input
                            className="form-check-input  rounded-4 border-dark"
                            type="radio"
                            id="exampleRadios2"
                            value="Quesiton"
                            name="subject"
                            onChange={(e) => handleChange(e)}
                          />
                          <label
                            className="form-check-label position-absolute"
                            for="exampleRadios2">
                            Quesiton
                          </label>
                        </div>
                        <div className="form-check position-relative">
                          <input
                            className="form-check-input  rounded-4 border-dark"
                            type="radio"
                            id="exampleRadios3"
                            value="Complaint"
                            name="subject"
                            onChange={(e) => handleChange(e)}
                          />
                          <label
                            className="form-check-label position-absolute"
                            for="exampleRadios3">
                            Complaint
                          </label>
                        </div>
                        <div className="form-check position-relative">
                          <input
                            className="form-check-input  rounded-4 border-dark"
                            type="radio"
                            id="exampleRadios4"
                            value="Out of Stock"
                            name="subject"
                            onChange={(e) => handleChange(e)}
                          />
                          <label
                            className="form-check-label position-absolute"
                            for="exampleRadios4">
                            Out of Stock
                          </label>
                        </div>
                        <div className="form-check position-relative">
                          <input
                            className="form-check-input  rounded-4 border-dark"
                            type="radio"
                            id="exampleRadios5"
                            value="Other"
                            name="subject"
                            onChange={(e) => handleChange(e)}
                          />
                          <label
                            className="form-check-label position-absolute"
                            for="exampleRadios5">
                            Other
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-12">
                    <div
                      className="contact-form"
                      data-aos="fade-up"
                      data-aos-delay="1000"
                      data-aos-duration="1000">
                      <label className="form-label">Message</label>
                      <textarea
                        className="form-control"
                        rows="5"
                        name="message"
                        value={contactUsInfo?.message || ""}
                        onChange={(e) => handleChange(e)}></textarea>
                    </div>
                  </div>
                  <div className="col-12">
                    <ul className="d-flex justify-content-end contact-shop-btn">
                      <li
                        data-aos="fade-up"
                        data-aos-delay="1200"
                        data-aos-duration="1000">
                        <NavLink
                          href="checkout.html"
                          type="submit"
                          className="btn btn-primary contactBtn"
                          onClick={(e) => handleSubmit(e)}>
                          Send
                        </NavLink>
                      </li>
                    </ul>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Contactus;
