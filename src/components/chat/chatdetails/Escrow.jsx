import React, { useState } from "react";
import axios from "axios";
import "../chat.css";

const Escrow = ({ jobId, clientId, freelancerId, walletAddress }) => {
  const [buttonStates, setButtonStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const handleClick = async (index) => {
    if (loading || (index > 0 && !buttonStates[index - 1])) {
      return; // Prevent invalid clicks or simultaneous API calls
    }

    setLoading(true);
    setError(""); // Clear previous errors

    try {
      let response;

      // Call the appropriate API based on button index
      switch (index) {
        case 0:
          response = await axios.post(`${API_URL}/api/v1/escrow/offer`, {
            job_id: jobId,
            client_id: clientId,
            wallet_address: walletAddress,
          });
          break;
        case 1:
          response = await axios.post(`${API_URL}/api/v1/escrow/deposit`, {
            job_id: jobId,
            client_id: clientId,
            wallet_address: walletAddress,
          });
          break;
        case 2:
          response = await axios.post(`${API_URL}/api/v1/escrow/in-progress`, {
            job_id: jobId,
            freelancer_id: freelancerId,
            wallet_address: walletAddress,
          });
          break;
        case 3:
          response = await axios.post(`${API_URL}/api/v1/escrow/completed`, {
            job_id: jobId,
            freelancer_id: freelancerId,
            wallet_address: walletAddress,
          });
          break;
        case 4:
          response = await axios.post(`${API_URL}/api/v1/escrow/confirm`, {
            job_id: jobId,
            client_id: clientId,
            wallet_address: walletAddress,
          });
          break;
        default:
          throw new Error("Invalid action");
      }

      // Update button state only if the API call succeeds
      if (response.status === 200) {
        const updatedStates = [...buttonStates];
        updatedStates[index] = true;
        setButtonStates(updatedStates);
      } else {
        throw new Error("API request failed");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false); // Reset loading state
    }
  };

  // Calculate rope progress based on active buttons
  const ropeProgress = buttonStates.filter((state) => state).length;

  return (
    <div className="progress-container">
      {/* Rope element */}
      <div
        className="progress-rope"
        style={{
          width: `calc((100% / 4) * ${ropeProgress})`,
        }}
      ></div>

      {/* Buttons */}
      <button
        className={`progress-btn ${buttonStates[0] ? "active" : ""} ${
          !buttonStates[0] ? "highlight" : ""
        }`}
        onClick={() => handleClick(0)}
      >
        {loading && !buttonStates[0] ? "Processing..." : "Offer"}
      </button>

      <button
        className={`progress-btn ${buttonStates[1] ? "active" : ""} ${
          !buttonStates[1] && buttonStates[0] ? "highlight" : ""
        }`}
        onClick={() => handleClick(1)}
        disabled={!buttonStates[0] || loading}
      >
        {loading && !buttonStates[1] ? "Processing..." : "Deposit"}
      </button>

      <button
        className={`progress-btn ${buttonStates[2] ? "active" : ""} ${
          !buttonStates[2] && buttonStates[1] ? "highlight" : ""
        }`}
        onClick={() => handleClick(2)}
        disabled={!buttonStates[1] || loading}
      >
        {loading && !buttonStates[2] ? "Processing..." : "In-Progress"}
      </button>

      <button
        className={`progress-btn ${buttonStates[3] ? "active" : ""} ${
          !buttonStates[3] && buttonStates[2] ? "highlight" : ""
        }`}
        onClick={() => handleClick(3)}
        disabled={!buttonStates[2] || loading}
      >
        {loading && !buttonStates[3] ? "Processing..." : "Completed"}
      </button>

      <button
        style={{
          borderTopRightRadius: "100px",
          borderBottomRightRadius: "100px",
        }}
        className={`progress-btn ${buttonStates[4] ? "active" : ""} ${
          !buttonStates[4] && buttonStates[3] ? "highlight" : ""
        }`}
        onClick={() => handleClick(4)}
        disabled={!buttonStates[3] || loading}
      >
        {loading && !buttonStates[4] ? "Processing..." : "Confirm"}
      </button>

      {/* Error message display */}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default Escrow;
