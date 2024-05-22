import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { headers } from "../Components/helper";

const MainForgotPasswordRequest = () => {
  const [email, setEmail] = useState("");

  const handleSubmitEmail = () => {
    if (email === "") return toast.error("Please enter email.");
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/getForgetPassVerificationLink`,
        { email },
        {
          headers: headers,
        }
      )
      .then((response) => {
        // localStorage.setItem()
        toast.success("Please check inbox.");
      })
      .catch((error) => {
        toast.error(error.response?.data.message);
      });
  };

  return (
    <div>
      <main>
        <div className="form-section">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12">
                <div className="login-form-inner">
                  <div className="col-12">
                    <div className="text-start padding-bottomm">
                      <label className="form-label">
                        Enter Registered Email
                      </label>
                      <div className="position-relative">
                        <input
                          type="email"
                          className="form-control"
                          name="email"
                          value={email || ""}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={handleSubmitEmail}
                    className="btn btn-primary-2"
                    style={{ padding: "8px" }}
                  >
                    Continue
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainForgotPasswordRequest;
