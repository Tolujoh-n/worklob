import React, { useState, useEffect } from "react";
import "../chat.css";
import { useWeb3 } from "../../../Web3Provider";
import { toast } from "sonner";
import axios from "axios";

const Escrow = ({
  jobId,
  chatId,
  currentStatus,
  userRole,
  trackWalletAddress,
}) => {
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
    console.log("Job ID:", jobId);
    console.log("Current Status:", currentStatus);
    console.log("Escrow wallet address:", walletAddress);
    console.log("User Role:", userRole);
    console.log("Track Wallet Address:", trackWalletAddress);

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

  const handleClick = async (
    index,
    status,
    requiredRole,
    isWalletCheckRequired = false
  ) => {
    if (userRole !== requiredRole) {
      toast.error(`Only the ${requiredRole} can perform this action.`);
      return;
    }

    if (isWalletCheckRequired && walletAddress !== trackWalletAddress) {
      toast.error(
        `Please use the wallet address: ${trackWalletAddress.substring(
          0,
          6
        )}...${trackWalletAddress.slice(-4)}.`
      );
      return;
    }

    const updatedStates = [...buttonStates];
    if (!updatedStates[index] && (index === 0 || updatedStates[index - 1])) {
      updatedStates[index] = true;
      setButtonStates(updatedStates);

      await handleStatusUpdate(status);
    }
  };

  const handleStatusUpdate = async (newStatus) => {
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

  const ropeProgress = buttonStates.filter((state) => state).length;

  return (
    <div className="progress-container">
      <div
        className="progress-rope"
        style={{
          width: `calc((100% / 4) * ${ropeProgress})`,
        }}
      ></div>

      <button
        className={`progress-btn ${buttonStates[0] ? "active" : ""} ${
          !buttonStates[0] ? "highlight" : ""
        }`}
        onClick={() => handleClick(0, "offered", "Customer")}
      >
        Offer
      </button>

      <button
        className={`progress-btn ${buttonStates[1] ? "active" : ""} ${
          !buttonStates[1] && buttonStates[0] ? "highlight" : ""
        }`}
        onClick={() => handleClick(1, "deposited", "Customer")}
        disabled={!buttonStates[0]}
      >
        Deposit
      </button>

      <button
        className={`progress-btn ${buttonStates[2] ? "active" : ""} ${
          !buttonStates[2] && buttonStates[1] ? "highlight" : ""
        }`}
        onClick={() => handleClick(2, "inProgress", "Talent")}
        disabled={!buttonStates[1]}
      >
        In-Progress
      </button>

      <button
        className={`progress-btn ${buttonStates[3] ? "active" : ""} ${
          !buttonStates[3] && buttonStates[2] ? "highlight" : ""
        }`}
        onClick={() => handleClick(3, "completed", "Talent", true)}
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
        onClick={() => handleClick(4, "confirmed", "Customer")}
        disabled={!buttonStates[3]}
      >
        Confirmed
      </button>
    </div>
  );
};

export default Escrow;
