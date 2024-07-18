import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = ({ onLogin }) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Enable button only if phone number has 10 digits
    setIsButtonDisabled(phoneNumber.length !== 10);
  }, [phoneNumber]);

  const handleSendOtp = () => {
    console.log("Sending OTP to", phoneNumber);
    onLogin(phoneNumber);
  };

  return (
    <div className="login-container">
      <div className="title-container">
        <div className="main-title">חברות ברזל</div>
        <div className="sub-title">אתר ניהול התנדבויות</div>
      </div>
      <h2>הכנס מספר טלפון</h2>
      <p className="description">מיד נשלח לטלפון שלך קוד בסמס.</p>
      <input
        type="text"
        placeholder="מספר הטלפון שלך"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={handleSendOtp} disabled={isButtonDisabled}>
        שלחו קוד
      </button>
    </div>
  );
};

export default LoginPage;
