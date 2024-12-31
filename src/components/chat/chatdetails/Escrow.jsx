import React, { useState, useEffect } from "react";
import axios from "axios";
import { useWeb3 } from "../../../Web3Provider";
import { toast } from "sonner";
import "../chat.css";

const Escrow = ({ chatId, jobID, senderId, receiverId }) => {
  const { account, connectWallet, connected } = useWeb3();
  const [walletAddress, setWalletAddress] = useState("");
  const [buttonStates, setButtonStates] = useState([
    false,
    false,
    false,
    false,
    false,
  ]);
  const [loading, setLoading] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  const isTalent = account === senderId; // Talent's wallet address matches senderId
  const isCustomer = account === receiverId; // Customer's wallet address matches receiverId

  useEffect(() => {
    if (!connected) connectWallet();
    if (account) setWalletAddress(account);
  }, [connected, account, connectWallet]);

  useEffect(() => {
    const storedStates = JSON.parse(localStorage.getItem("escrowStates")) || {};
    setButtonStates(
      storedStates[chatId] || [false, false, false, false, false]
    );
  }, [chatId]);

  useEffect(() => {
    const storedStates = JSON.parse(localStorage.getItem("escrowStates")) || {};
    storedStates[chatId] = buttonStates;
    localStorage.setItem("escrowStates", JSON.stringify(storedStates));
  }, [chatId, buttonStates]);

  const handleClick = async (index) => {
    if (loading || (index > 0 && !buttonStates[index - 1])) return;

    if (
      ((index === 0 || index === 1) && !isCustomer) ||
      ((index === 2 || index === 3) && !isTalent) ||
      (index === 4 && !isCustomer)
    ) {
      toast.error("You do not have permission to perform this action.");
      return;
    }

    if (walletAddress !== account) {
      toast.error("Not appropriate wallet address.");
      return;
    }

    setLoading(true);
    try {
      let requestData;
      let currentState;
      switch (index) {
        case 0:
          requestData = {
            job_id: chatId,
            client_id: receiverId,
            wallet_address: walletAddress,
          };
          currentState = "Offer";
          await axios.post(`${API_URL}/api/v1/escrow/offer`, requestData);
          break;
        case 1:
          requestData = {
            job_id: chatId,
            client_id: receiverId,
            wallet_address: walletAddress,
          };
          currentState = "Deposit";
          await axios.post(`${API_URL}/api/v1/escrow/deposit`, requestData);
          break;
        case 2:
          requestData = {
            job_id: chatId,
            freelancer_id: senderId,
            wallet_address: walletAddress,
          };
          currentState = "In-Progress";
          await axios.post(`${API_URL}/api/v1/escrow/in-progress`, requestData);
          break;
        case 3:
          requestData = {
            job_id: chatId,
            freelancer_id: senderId,
            wallet_address: walletAddress,
          };
          currentState = "Completed";
          await axios.post(`${API_URL}/api/v1/escrow/completed`, requestData);
          break;
        case 4:
          requestData = {
            job_id: chatId,
            client_id: receiverId,
            wallet_address: walletAddress,
          };
          currentState = "Confirm";
          await axios.post(`${API_URL}/api/v1/escrow/confirm`, requestData);
          break;
        default:
          throw new Error("Invalid action");
      }

      // Log data to console
      console.log("Current Action:", currentState);
      console.log("Request Data:", requestData);

      const updatedStates = [...buttonStates];
      updatedStates[index] = true;
      setButtonStates(updatedStates);
      toast.success(
        `Step ${index + 1} (${currentState}) completed successfully!`
      );
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const ropeProgress = buttonStates.filter((state) => state).length;

  return (
    <div className="progress-container">
      <div
        className="progress-rope"
        style={{ width: `calc((100% / 4) * ${ropeProgress})` }}
      ></div>

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
