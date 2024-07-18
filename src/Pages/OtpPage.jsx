import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./OtpPage.css";

const OtpPage = ({ onVerifyOtp }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const phoneNumber = location.state?.phoneNumber;

  useEffect(() => {
    // Enable button only if OTP length is 6
    if (otp.length === 6) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [otp]);

  const handleVerifyOtp = () => {
    if (onVerifyOtp(otp)) {
      console.log("OTP verified for", phoneNumber);
      navigate("/shifts");
    } else {
      setError("שגיאה בהקלדת קוד - שלחנו סמס מחדש");
    }
  };

  const handleResendOtp = () => {
    console.log("Resending OTP to", phoneNumber);
  };

  return (
    <div className="otp-container">
      <h1>זה הזמן להזין את הקוד</h1>
      <input
        type="text"
        placeholder="קוד בן 6 תווים"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />
      <button className="resend-button" onClick={handleResendOtp}>
        שלחו שוב קוד
      </button>
      <button
        className={`verify-button ${!isButtonDisabled ? "active" : ""}`}
        onClick={handleVerifyOtp}
        disabled={isButtonDisabled}
      >
        בדקו קוד
      </button>
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default OtpPage;
