import React, { useState, useEffect } from "react";
import "../chat.css";
import { useWeb3 } from "../../../Web3Provider";
import { toast } from "sonner";
import axios from "axios";

const Escrow = ({ jobId, chatId, currentStatus }) => {
  const { connectWallet, walletAddress, connected } = useWeb3();
  const [buttonStates, setButtonStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  useEffect(() => {
    // Log jobId and currentStatus to the console on load
    console.log("Job ID:", jobId);
    console.log("Current Status:", currentStatus);
    console.log("Escrow wallet address:", walletAddress);

    // Update button states based on the currentStatus
    const statusMapping = {
      offered: [true, false, false, false, false],
      deposited: [true, true, false, false, false],
      inProgress: [true, true, true, false, false],
      completed: [true, true, true, true, false],
      confirmed: [true, true, true, true, true],
    };

    if (currentStatus in statusMapping) {
      setButtonStates(statusMapping[currentStatus]);
    }
  }, [jobId, currentStatus]);

  const handleClick = (index, status) => {
    const updatedStates = [...buttonStates];
    if (!updatedStates[index] && (index === 0 || updatedStates[index - 1])) {
      updatedStates[index] = true;
      setButtonStates(updatedStates);

      // Update the status via the API call
      handleStatusUpdate(status);
    }
  };
  const handleStatusUpdate = async (newStatus) => {
    // Check if wallet is connected
    if (!connected) {
      await connectWallet();
    }

    try {
      const response = await axios.put(
        `${API_URL}/api/v1/chat/chatdetails/${jobId}/chat/${chatId}`,
        {
          walletAddress,
          status: newStatus,
        }
      );
      console.log("Updated chat:", response.data);
      toast.success("Status updated successfully!");
    } catch (error) {
      console.error("Error updating status:", error.message);
      toast.error("Failed to update status.");
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
          width: `calc((100% / 4) * ${ropeProgress})`, // Adjust width for five stages
        }}
      ></div>

      <button
        className={`progress-btn ${buttonStates[0] ? "active" : ""} ${
          !buttonStates[0] ? "highlight" : ""
        }`}
        onClick={() => handleClick(0, "offered")}
      >
        Offer
      </button>

      <button
        className={`progress-btn ${buttonStates[1] ? "active" : ""} ${
          !buttonStates[1] && buttonStates[0] ? "highlight" : ""
        }`}
        onClick={() => handleClick(1, "deposited")}
        disabled={!buttonStates[0]}
      >
        Deposit
      </button>

      <button
        className={`progress-btn ${buttonStates[2] ? "active" : ""} ${
          !buttonStates[2] && buttonStates[1] ? "highlight" : ""
        }`}
        onClick={() => handleClick(2, "inProgress")}
        disabled={!buttonStates[1]}
      >
        In-Progress
      </button>

      <button
        className={`progress-btn ${buttonStates[3] ? "active" : ""} ${
          !buttonStates[3] && buttonStates[2] ? "highlight" : ""
        }`}
        onClick={() => handleClick(3, "completed")}
        disabled={!buttonStates[2]}
      >
        Completed
      </button>

      <button
        style={{
          borderTopRightRadius: "100px",
          borderBottomRightRadius: "100px",
        }}
        className={`progress-btn ${buttonStates[4] ? "active" : ""} ${
          !buttonStates[4] && buttonStates[3] ? "highlight" : ""
        }`}
        onClick={() => handleClick(4, "confirmed")}
        disabled={!buttonStates[3]}
      >
        Confirmed
      </button>
    </div>
  );
};

export default Escrow;
