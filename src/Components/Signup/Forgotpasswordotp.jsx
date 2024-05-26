import React, { useState } from "react";
import OTPInput from "react-otp-input";
import { NavLink, useNavigate } from "react-router-dom";
import { headers } from "../helper";
import axios from "axios";

const Forgotpasswordtwo = ({ setStep, setFormData }) => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const handleSubmit = () => {
    if (otp.length !== 6) {
      console.log("Please enter the valid otp.");
      return;
    }
    setStep(2);
    setFormData((prevState) => ({
      ...prevState,
      otp: otp,
    }));
  };
  return (
    <>
      <main>
        <div className="forgot-passwordddd d-flex align-items-center">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="forgot-password-inner text-center">
                  <p className="text-center">
                    A verification code was sent to your phone number
                    +966***1234
                  </p>
                  <OTPInput
                    value={otp}
                    onChange={setOtp}
                    numInputs={6}
                    separator={<span>-</span>}
                    renderInput={(props) => <input {...props} />}
                  />
                  <span className="d-block text-center">
                    The verification code expires in 01:58
                  </span>
                  <button onClick={handleSubmit} className="btn btn-primary">
                    Verify
                  </button>
                  {/* <NavLink to="/resetpassword" type="submit" className="btn btn-primary">Verify</NavLink> */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Forgotpasswordtwo;
