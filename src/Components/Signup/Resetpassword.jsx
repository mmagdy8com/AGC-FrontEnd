import axios from "axios";
import React, { useState } from "react";
import { NavLink, useNavigate, useSearchParams } from "react-router-dom";
import { headers } from "../helper";

const Resetpassword = () => {
  const navigate = useNavigate()
  
    const [formData, setFormData] = useState({
    newPassword:"",
    confirmPassword:""
    });
  
    const handleChange =(event)=>{
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  const [searchParams] = useSearchParams()
  
  const otp = searchParams.get("otp")
  const email = searchParams.get("email")
  console.log(otp,'otpppp',email)
  const handleSubmit = () => {
    
    if (!formData.newPassword || !formData.confirmPassword) {
      console.log("Please fill all the value.");
      return;
    }
    if(formData.newPassword !== formData.confirmPassword){
        console.log("Password does not match");
        return;
    }
    const body = {
      // phoneNumber: formData?.phoneNumber,
      otp: otp,
      email: email,
      password: formData?.newPassword
    };
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/verifyOtpWithPasswordChange`,
        { ...body },
        {
          headers: headers,
        }
      )
      .then((res) => {
        if (res.status == 200) {
            navigate('/signin')
          console.log(res.data.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <main>
      <div className="form-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-12">
              <div className="login-form-inner">
                <div className="login-form-innerr text-start">
                  <label className="form-label">New password</label>
                  <input
                    type="password"
                    className="form-control"
                    name="newPassword"
                    onChange={handleChange}
                    value={formData.newPassword}
                  />
                </div>
                <div className="text-start">
                  <label className="form-label">Confirm password</label>
                  <div className="position-relative">
                    <input
                      type="password"
                      className="form-control"
                      name="confirmPassword"
                      onChange={handleChange}
                      value={formData.confirmPassword}
                    />
                    <img
                      src={"assets/Login/eye.svg"}
                      alt="eye"
                      className="position-absolute eye"
                    />
                  </div>
                </div>

                <button
                  className="btn btn-primary cntBtn1"
                  onClick={handleSubmit}
                >
                  <span className="loginBtn ">Continue</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Resetpassword;
