import React, { useState } from "react";
import Forgotpasswordtwo from "../Components/Signup/Forgotpasswordotp";
import Resetpassword from "../Components/Signup/Resetpassword";
import RegisterNumber from "../Components/Signup/Registernumber";

const ForgotPasswordTwo = () => {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState({
    phoneNumber:'',
    otp:'',
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

  // Function to render the appropriate component based on the step
  const renderComponent = () => {
    switch (step) {
      case 0:
        return (
          <RegisterNumber
            setStep={setStep}
            setFormData={setFormData}
            formData={formData}
          />
        );
      case 1:
        return (
          <Forgotpasswordtwo
          setFormData={setFormData}
            setStep={setStep}
            formData={formData}
          />
        );
      case 2:
        // Render your new component here
        return (
          <Resetpassword handleChange={handleChange} formData={formData}/>
        );
      default:
        return null;
    }
  };

  return (
    <>
      {renderComponent()}
    </>
  );
};

export default ForgotPasswordTwo;
