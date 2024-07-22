import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage = (/* { onLogin } */) => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();

  const validatePhoneNumber = (phone) => {
    const regex = /^05\d([-]{0,1})\d{7}$/;
    return regex.test(phone);
  };

  const handlePhoneNumberChange = (event) => {
    const phone = event.target.value;
    setPhoneNumber(phone);
    setIsButtonDisabled(!validatePhoneNumber(phone));
  };

  /*   useEffect(() => {
    // Enable button only if phone number has 10 digits
    setIsButtonDisabled(phoneNumber.length !== 10);
  }, [phoneNumber]) */

  const handleSendOtp = async () => {
    console.log("27");
    if (!isButtonDisabled) {
      // Define the URL of your Django REST API
      const url = "http://127.0.0.1:8000/api/account/register/"; // Adjust the IP and path as needed

      // Prepare the data you want to send in the POST request
      const data = {
        phone: phoneNumber, // Make sure the key matches your Django serializer field
      };
      console.log(data);
      // Send the POST request
      fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          navigate("/otp", { state: { phone_number: phoneNumber } });
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
    /* console.log("Sending OTP to", phoneNumber);
    onLogin(phoneNumber); */
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
        onChange={handlePhoneNumberChange}
      />
      <button onClick={handleSendOtp} disabled={isButtonDisabled}>
        שלחו קוד
      </button>
    </div>
  );
};

export default LoginPage;
