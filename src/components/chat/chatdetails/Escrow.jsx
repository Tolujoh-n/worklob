import React, { useState, useEffect } from "react";
import "../chat.css";
import { useWeb3 } from "../../../Web3Provider";
import { toast } from "sonner";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Escrow = ({ jobId, chatId, currentStatus, trackWalletAddress }) => {
  const { connectWallet, walletAddress, connected } = useWeb3();
  const [buttonStates, setButtonStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [chat, setChat] = useState(null); // Add this state to store chat details
  const token = localStorage.getItem("token");

  let userId;

  const user = JSON.parse(localStorage.getItem("user"));
  let userRole = user?.role;
  console.log("User Role:", userRole);
  console.log("User ID:", user);

  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.userId;
  }

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  // Fetch chat details when the component mounts
  useEffect(() => {
    const fetchChatDetails = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/v1/chat/chatdetails/${jobId}/chat/${chatId}`
        );
        setChat(response.data); // Store chat details in state
        console.log("Chat details fetched:", response.data);

        // Log user details for debugging
        console.log("User Role:", userRole);
        console.log("User ID:", userId);
        console.log("Customer ID:", response.data.customerId);
        console.log("Talent ID:", response.data.talentId);
      } catch (error) {
        console.error("Error fetching chat details:", error);
      }
    };

    fetchChatDetails();
  }, [jobId, chatId, userRole, userId]);

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
      console.log("Sending update request with:", {
        walletAddress,
        status: newStatus,
        userId,
        userRole,
      });

      const response = await axios.put(
        `${API_URL}/api/v1/chat/chatdetails/${jobId}/chat/${chatId}`,
        {
          walletAddress,
          status: newStatus,
          userId,
          userRole,
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
