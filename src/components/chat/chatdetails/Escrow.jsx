import React, { useState } from "react";
import axios from "axios";
import { useWeb3 } from "../../../Web3Provider"; // Assuming you have a Web3 context
import { toast } from "sonner";
import "../chat.css";

const Escrow = () => {
  const [buttonStates, setButtonStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { account, connectWallet, connected } = useWeb3(); // Wallet connection

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  // Static data for Escrow operations
  const jobId = "12345"; // Static Job ID
  const clientId = "67890"; // Static Client ID
  const freelancerId = "54321"; // Static Freelancer ID
  const walletAddress = "0x123456789abcdef"; // Static wallet address

  const handleClick = async (index) => {
    if (loading || (index > 0 && !buttonStates[index - 1])) {
      return; // Prevent invalid clicks or simultaneous API calls
    }

    setLoading(true);
    setError(""); // Clear previous errors

    try {
      let response;
      let requestData;

      // Prepare the data based on the button index
      switch (index) {
        case 0:
          requestData = {
            job_id: jobId,
            client_id: clientId,
            wallet_address: walletAddress,
          };
          console.log("Offer data:", requestData);
          response = await axios.post(
            `${API_URL}/api/v1/escrow/offer`,
            requestData
          );
          break;
        case 1:
          requestData = {
            job_id: jobId,
            client_id: clientId,
            wallet_address: walletAddress,
          };
          console.log("Deposit data:", requestData);
          response = await axios.post(
            `${API_URL}/api/v1/escrow/deposit`,
            requestData
          );
          break;
        case 2:
          requestData = {
            job_id: jobId,
            freelancer_id: freelancerId,
            wallet_address: walletAddress,
          };
          console.log("In-Progress data:", requestData);
          response = await axios.post(
            `${API_URL}/api/v1/escrow/in-progress`,
            requestData
          );
          break;
        case 3:
          requestData = {
            job_id: jobId,
            freelancer_id: freelancerId,
            wallet_address: walletAddress,
          };
          console.log("Completed data:", requestData);
          response = await axios.post(
            `${API_URL}/api/v1/escrow/completed`,
            requestData
          );
          break;
        case 4:
          requestData = {
            job_id: jobId,
            client_id: clientId,
            wallet_address: walletAddress,
          };
          console.log("Confirm data:", requestData);
          response = await axios.post(
            `${API_URL}/api/v1/escrow/confirm`,
            requestData
          );
          break;
        default:
          throw new Error("Invalid action");
      }

      // Log the API response
      console.log("API response:", response.data);

      // Update button state only if the API call succeeds
      if (response.status === 200) {
        const updatedStates = [...buttonStates];
        updatedStates[index] = true;
        setButtonStates(updatedStates);
        toast.success(`Step ${index + 1} completed successfully!`);
      } else {
        throw new Error("API request failed");
      }
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || "An error occurred");
      toast.error(error);
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
        disabled={loading}
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
    </div>
  );
};

export default Escrow;
