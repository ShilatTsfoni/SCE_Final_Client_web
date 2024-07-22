import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./OtpPage.css";

const OtpPage = ({ onVerifyOtp }) => {
  const [otp, setOtp] = useState("");
  const [isValidOtp, setIsValidOtp] = useState(false);
  const [error, setError] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem("isAuthenticated") === "true"
  );
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();
  const { phone_number } = location.state || {}; // Make sure to handle cases where state might be undefined
  console.log(phone_number);

  const handleOtpChange = (event) => {
    const newOtp = event.target.value;
    setOtp(newOtp);
    setIsValidOtp(newOtp.length === 6);
    setIsButtonDisabled(newOtp.length !== 6);
    setError(false);
  };

  /*   useEffect(() => {
    // Enable button only if OTP length is 6
    if (otp.length === 6) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [otp]); */

  const handleVerifyOtp = async () => {
    console.log("Submitted otp: ", otp);
    const url = "http://127.0.0.1:8000/api/account/verify-otp/"; // Adjust the IP and path as needed

    // Prepare the data you want to send in the POST request
    const data = {
      phone: phone_number,
      otp: otp, // Make sure the key matches your Django serializer field
    };

    console.log("phone:", data.phone);
    console.log("otp:", otp);

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          // This will handle client errors (e.g., 400) and server errors (e.g., 500)
          console.log(response);
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then(async (data) => {
        // Perform additional validation on the response data if needed
        console.log(data);
        if (data.token && data.user_id) {
          // Assuming your API returns a success field for valid responses
          localStorage.setItem("userToken", data.token);
          localStorage.setItem("user_id", data.user_id);
          //setIsAuthenticated(true);
          //localStorage.setItem("isAuthenticated", "true");
          console.log("Token saved successfully");
          setIsValidOtp(true);
          // navigate("/shifts");
          onVerifyOtp();
        } else {
          // Handle case where API indicates failure but doesn't throw an error
          console.log(data);
          throw new Error("Validation failed on server");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        setTimeout(() => {
          setIsValidOtp(false);
          setError(true);
        }, 2000);
      });
  };

  const handleResendOtp = () => {
    console.log("Resending OTP to", phone_number);
  };

  return (
    <div className="otp-container">
      <h1>זה הזמן להזין את הקוד</h1>
      <input
        type="text"
        placeholder="קוד בן 6 תווים"
        value={otp}
        onChange={handleOtpChange}
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
