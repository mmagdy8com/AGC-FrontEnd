import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";

const PasswordChange = () => {
  const [password, setPassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleChangePassword = () => {
    if (password.newPassword !== password.confirmPassword) {
      return toast.error("Password confirmation failed!");
    } else if (
      password.currentPassword === "" ||
      password.confirmPassword === ""
    ) {
      return toast.error("Please enter valid password!");
    } else {
      axios
        .post(`${process.env.REACT_APP_BACKEND_URL}/resetPassword`, password, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        })
        .then((response) => {
          console.log(response);
          toast.success("Password changed successfully");
        })
        .catch((error) => {
          console.log(error);
          toast.error(error.response.data.message);
        });
    }
  };

  return (
    <>
      <div
        className="account-heading d-flex align-items-center"
        data-aos="fade-up"
        data-aos-delay="2500"
        data-aos-duration="1000"
      >
        <h5 className="mb-5">Change Passowrd</h5>
      </div>
      <div className="col-xxl-9 col-xl-8 col-lg-8 col-md-12 ">
        <div className="row justify-content-center" style={{ width: "50%" }}>
          <label className="account-labal">Current Password</label>
          <input
            className="form-control"
            type="password"
            name="currentPassword"
            style={{ marginBottom: "30px" }}
            onChange={(e) =>
              setPassword((prev) => ({
                ...prev,
                currentPassword: e.target.value,
              }))
            }
          />

          <label className="account-labal">New Password</label>
          <input
            className="form-control"
            type="password"
            name="newPassword"
            style={{ marginBottom: "30px" }}
            onChange={(e) =>
              setPassword((prev) => ({
                ...prev,
                newPassword: e.target.value,
              }))
            }
          />

          <label className="account-labal">Confirm password</label>
          <input
            className="form-control"
            type="password"
            name="confirmPassword"
            onChange={(e) =>
              setPassword((prev) => ({
                ...prev,
                confirmPassword: e.target.value,
              }))
            }
          />
          <div
            className="edit-profile-btn"
            data-aos="fade-up"
            data-aos-delay="3000"
            data-aos-duration="1000"
          >
            <p
              type="submit"
              className="btn btn-primary accountSaveBtn"
              onClick={handleChangePassword}
            >
              Change password
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default PasswordChange;
