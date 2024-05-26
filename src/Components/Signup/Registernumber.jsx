import React from "react";
import IntlTelInput from "react-intl-tel-input";
import "react-intl-tel-input/dist/main.css";
import { headers } from "../helper";
import axios from "axios";

const RegisterNumber = (props) => {
  const { setStep, setFormData, formData } = props;
  console.log(props, "efdfdfdfdfdf");
  // const navigate = useNavigate()
  const handleSubmit = () => {
    if (!formData.phoneNumber) {
      console.log("Please fill in all fields.");
      return;
    }
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/forgotPasswordOtp`,
        { phoneNumber: formData.phoneNumber },
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.status == 200) {
          console.log(res.data.message);
          setStep(1);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const handlePhoneNumberChange = (country, value, event) => {
    console.log(value, country, event, "Debugging");

    // Check if 'value' and 'country' are valid
    if (value && country) {
      // Extract the dialCode and name from the 'country' object
      const { dialCode } = event;

      // Format the phone number with dialCode
      const formattedPhoneNumber = `+${dialCode}${value}`;

      // Update the 'phoneNumber' in formData
      setFormData((prevState) => ({
        ...prevState,
        phoneNumber: formattedPhoneNumber,
      }));
    } else {
      setFormData((prevState) => ({
        ...prevState,
        phoneNumber: "",
      }));
    }
  };

  return (
    <main>
      <div className="form-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="login-form-inner">
                <div className="col-12">
                  <div className="text-start contact-form-innerrrr padding-bottomm">
                    <label className="form-label">Registred Phone Number</label>
                    <div className="position-relative">
                      <IntlTelInput
                        containerClassName="intl-tel-input"
                        inputClassName="form-control"
                        initialValueFormat="national"
                        onPhoneNumberBlur={handlePhoneNumberChange}
                      />
                    </div>
                  </div>
                </div>
                <button onClick={handleSubmit} className="btn  btn-primary-2">
                  Go to <img src={"assets/Login/nafath.svg"} alt="nafath" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default RegisterNumber;
