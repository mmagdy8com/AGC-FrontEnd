import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import { headers } from "../Components/helper";

const ForgetPasswordHandlePage = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const otp = searchParams.get("otp");
  const email = searchParams.get("email");

  const navigate = useNavigate();

  const [passwords, setPasswords] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmitNewPassword = () => {
    if (passwords.password !== passwords.confirmPassword)
      return toast.error("Password confirmation failed");

    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/verifyOtpWithPasswordChange`,
        { otp: otp, email: email, newPassword: passwords.password },
        {
          headers: headers,
        }
      )
      .then((response) => {
        toast.success(response.data.message);
        navigate("/signin");
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };

  return (
    <div>
      <div>
        <main>
          <div className="form-section">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-12">
                  <div className="login-form-inner">
                    <div className="col-12">
                      <div className="text-start padding-bottomm">
                        <label className="form-label">Enter new password</label>
                        <div className="position-relative">
                          <input
                            type="password"
                            className="form-control"
                            name="password"
                            value={passwords?.password || ""}
                            onChange={(e) =>
                              setPasswords((prev) => ({
                                ...prev,
                                password: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>

                      <br />
                      <div className="text-start padding-bottomm">
                        <label className="form-label">
                          Confirm new password
                        </label>
                        <div className="position-relative">
                          <input
                            type="password"
                            className="form-control"
                            name="confirmPassword"
                            value={passwords?.confirmPassword || ""}
                            onChange={(e) =>
                              setPasswords((prev) => ({
                                ...prev,
                                confirmPassword: e.target.value,
                              }))
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={handleSubmitNewPassword}
                      className="btn btn-primary-2"
                      style={{ padding: "8px" }}
                    >
                      Change Password
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ForgetPasswordHandlePage;
