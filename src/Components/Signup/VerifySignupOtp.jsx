import React, { useEffect, useState } from "react";
import OTPInput from "react-otp-input";
import { NavLink, useNavigate } from "react-router-dom";
import { headers } from "../helper";
import axios from "axios";
import toast from "react-hot-toast";

const VerifySignupOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");

  const [phoneNumber, setPhoneNumber] = useState("");
  const [formatedEmail, setFormatedEmail] = useState("");
  const [timeLeft, setTimeLeft] = useState(118); // Initial duration in seconds
  const [timerDisplay, setTimerDisplay] = useState("1:58");

  const [email, setEmail] = useState("");

  const [first, setFirst] = useState("");
  const [last, setLast] = useState("");
  const [val, setVal] = useState(true);

  useEffect(() => {
    setPhoneNumber(localStorage.getItem("phoneNumber"));
    const y = localStorage.getItem("phoneNumber");
    const phoneNumberArray = y?.split("");

    const first = phoneNumberArray?.slice(0, 3);
    const second = phoneNumberArray?.slice(-3);

    const firstDigit = first?.join("");
    setFirst(firstDigit);
    const lastDigit = second?.join("");
    setLast(lastDigit);

    const email = localStorage.getItem("email");
    const z = email.split("@");
    let arr = [];
    z[0].split("").map((s) => {
      arr.push("*");
    });
    setFormatedEmail(arr.join(" ") + "@gmail.com");
  });

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
      console.log("timerInterval", timerInterval);
      clearInterval(timerInterval);
    };
  }, [timeLeft]);

  // useEffect(() => {
  //   if (val == true) {
  //     const timerInterval = setInterval(() => {
  //       if (timeLeft > 0) {
  //         const minutes = Math.floor(timeLeft / 60);
  //         const seconds = timeLeft % 60;

  //         const formattedMinutes = minutes.toString().padStart(2, "0");
  //         const formattedSeconds = seconds.toString().padStart(2, "0");

  //         setTimerDisplay(`${formattedMinutes}:${formattedSeconds}`);

  //         setTimeLeft(timeLeft - 1);
  //       } else {
  //         clearInterval(timerInterval);
  //       }
  //     }, 1000);

  //     return () => {
  //       console.log("timerInterval", timerInterval);
  //       clearInterval(timerInterval);
  //     };
  //   }
  // }, [val]);

  const handleSubmit = () => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    console.log(phoneNumber, "phoneNumber", otp, "otp");
    if (otp.length !== 6) {
      console.log("Please enter the valid otp.");
      return;
    } else {
      axios
        .post(
          `${process.env.REACT_APP_BACKEND_URL}/verifyUser`,
          {
            otp: otp,
            phoneNumber: phoneNumber,
          },
          {
            headers: headers,
          }
        )
        .then((res) => {
          toast.success(res.data.message);
          if (res.status == 200) {
            console.log(res.data.message);
            toast.success("User verification Success");
            navigate("/signin");
            // localStorage.setItem("phoneNumber", formData.phoneNumber);
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
        });
    }
    // setStep(2);
    // setFormData((prevState) => ({
    //   ...prevState,
    //   otp: otp,
    // }));
  };

  const resendOTtp = () => {
    setTimeLeft(118);
    setTimerDisplay("01:58");
    axios
      .post(
        `${process.env.REACT_APP_BACKEND_URL}/resendOtp`,
        {
          phoneNumber: phoneNumber,
        },
        {
          headers: headers,
        }
      )
      .then((res) => {
        toast.success("Otp send successfully");
      })
      .catch((error) => {
        toast.error(
          "Something went wrong while resend otp, Please try again later."
        );
      });
  };
  return (
    <main>
      <div className="forgot-passwordddd d-flex align-items-center">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="forgot-password-inner text-center">
                <p className="text-center">
                  {/* A verification code was sent to your email {formatedEmail} */}
                  A verification code was sent to your phone number{" "}
                  {`XXX${phoneNumber.split(7, phoneNumber.length)[1]}`}
                </p>
                <OTPInput
                  value={otp}
                  onChange={setOtp}
                  numInputs={6}
                  separator={<span>-</span>}
                  renderInput={(props) => <input {...props} />}
                />

                {timerDisplay == "00:01" ? (
                  <>
                    <span className="d-block text-center">
                      Your time has expired. Please click on resend otp to get
                      new OTP.
                    </span>
                    <button onClick={resendOTtp} className="btn  reasendOtpBtn">
                      Resend Otp
                    </button>
                  </>
                ) : (
                  <>
                    <span className="d-block text-center">
                      The verification code expires in {timerDisplay}
                    </span>
                    <button
                      onClick={handleSubmit}
                      className="btn  verifyOtpBtn"
                    >
                      Verify
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default VerifySignupOtp;
