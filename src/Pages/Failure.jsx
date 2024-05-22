import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Failure = () => {
  const navigate = useNavigate();

  useEffect(() => {
    function handleFailure() {
      toast.error("Payment failed.");
      setTimeout(() => navigate("/"), 3000);
    }

    handleFailure();
  }, []);

  return (
    <div
      style={{ textAlign: "center", marginTop: "50px", marginBottom: "50px" }}
    >
      <img src={"/assets/PaymentFailure.png"} height={200} width={200} />
      <div>
        <p style={{ marginTop: "10px", fontSize: "30px", fontWeight: 600 }}>
          Payment Failed
        </p>
      </div>
      <p>Please try again. For help contact the support staff.</p>
    </div>
  );
};

export default Failure;
