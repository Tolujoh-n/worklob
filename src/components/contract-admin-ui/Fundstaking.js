import React, { useState, useEffect } from "react";
import { useWeb3 } from "../../Web3Provider";
import { WorkLobStaking_abi, WorkLobStaking_address } from "../Constants";
import Web3 from "web3";
import { Toaster, toast } from "sonner";

const Fundstaking = () => {
  const { connected, walletAddress, connectWallet } = useWeb3();
  const [rewardAmount, setRewardAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [gasEstimate, setGasEstimate] = useState("");
  const [rewardAmountWei, setRewardAmountWei] = useState("");
  const [owner, setOwner] = useState("");

  useEffect(() => {
    const fetchDetails = async () => {
      if (!connected || !walletAddress || !rewardAmount || !duration) return;

      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.getAccounts();
      const currentOwner = walletAddress || accounts[0];
      if (!currentOwner) throw new Error("No wallet connected.");

      const contract = new web3.eth.Contract(
        WorkLobStaking_abi,
        WorkLobStaking_address
      );

      const rewardAmountInWei = web3.utils.toWei(
        rewardAmount.toString(),
        "ether"
      );

      const gasEstimateValue = await contract.methods
        .notifyRewardAmount(rewardAmountInWei, duration)
        .estimateGas({ from: currentOwner });

      setRewardAmountWei(rewardAmountInWei);
      setGasEstimate(gasEstimateValue);
      setOwner(currentOwner);

      console.log("Reward Amount in Wei:", rewardAmountInWei);
      console.log("Duration:", duration);
      console.log("Contract Address:", WorkLobStaking_address);
      console.log("Wallet Address:", currentOwner);
      console.log("Gas Estimate:", gasEstimateValue);
    };

    fetchDetails();
  }, [connected, walletAddress, rewardAmount, duration]);

  const handleRewardAmountChange = (e) => setRewardAmount(e.target.value);
  const handleDurationChange = (e) => setDuration(e.target.value);

  const handleFundContract = async () => {
    try {
      if (!connected || !walletAddress) {
        await connectWallet();
      }

      if (!rewardAmount || !duration) {
        throw new Error("Reward Amount and Duration must not be empty.");
      }

      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.getAccounts();
      const currentOwner = walletAddress || accounts[0];
      if (!currentOwner) throw new Error("No wallet connected.");

      const contract = new web3.eth.Contract(
        WorkLobStaking_abi,
        WorkLobStaking_address
      );

      const rewardAmountInWei = web3.utils.toWei(
        rewardAmount.toString(),
        "ether"
      );

      const gasEstimateValue = await contract.methods
        .notifyRewardAmount(rewardAmountInWei, duration)
        .estimateGas({ from: currentOwner });

      console.log(`Estimated Gas: ${gasEstimateValue}`);
      console.log("Reward Amount in Wei:", rewardAmountInWei);
      console.log("Duration:", duration);
      console.log("Contract Address:", WorkLobStaking_address);
      console.log("Wallet Address:", currentOwner);

      const receipt = await contract.methods
        .notifyRewardAmount(rewardAmountInWei, duration)
        .send({
          from: currentOwner,
          gas: gasEstimateValue + 10000, // Adding buffer to gas estimate
        });

      console.log("Transaction successful:", receipt);
      toast.success("Contract funded successfully!");
    } catch (error) {
      console.error("Transaction failed:", error);
      toast.error(`Failed to fund the contract: ${error.message}`);
    }
  };

  return (
    <>
      <div className="pagetitle">
        <h1>Fund Staking</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/dashboard/fundstaking">Fund Staking</a>
            </li>
            <li className="breadcrumb-item active">Funding Pool</li>
          </ol>
        </nav>
      </div>
      <div className="d-flex justify-content-center align-items-center vh-60">
        <div className="wallet-card d-flex justify-content-center align-items-center flex-column p-4">
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Reward Amount"
            value={rewardAmount}
            onChange={handleRewardAmountChange}
          />
          <input
            type="number"
            className="form-control mb-3"
            placeholder="Duration (seconds)"
            value={duration}
            onChange={handleDurationChange}
          />
          <button className="chat-button" onClick={handleFundContract}>
            Fund Contract
          </button>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Fundstaking;
