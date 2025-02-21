import React, { useState } from "react";
import { useWeb3 } from "../../Web3Provider";
import { WorkLobStaking_abi, WorkLobStaking_address } from "../Constants";
import Web3 from "web3";
import { Toaster, toast } from "sonner";

const Fundstaking = () => {
  const { connected, walletAddress, connectWallet } = useWeb3();
  const [rewardAmount, setRewardAmount] = useState("");
  const [duration, setDuration] = useState("");

  const handleRewardAmountChange = (e) => setRewardAmount(e.target.value);
  const handleDurationChange = (e) => setDuration(e.target.value);

  const handleFundContract = async () => {
    try {
      if (!connected || !walletAddress) {
        await connectWallet();
      }

      const web3 = new Web3(Web3.givenProvider);
      const accounts = await web3.eth.getAccounts();
      const owner = walletAddress || accounts[0];

      if (!owner) throw new Error("No wallet connected.");

      const contract = new web3.eth.Contract(
        WorkLobStaking_abi,
        WorkLobStaking_address
      );

      // Ensure the user is the contract owner
      const contractOwner = await contract.methods.owner().call();
      if (owner.toLowerCase() !== contractOwner.toLowerCase()) {
        throw new Error(
          "Only the contract owner can fund the staking contract."
        );
      }

      // Convert reward amount to Wei
      const rewardAmountWei = web3.utils.toWei(
        rewardAmount.toString(),
        "ether"
      );

      // Estimate Gas
      const gasEstimate = await contract.methods
        .notifyRewardAmount(rewardAmountWei, duration)
        .estimateGas({ from: owner });

      console.log(`Estimated Gas: ${gasEstimate}`);

      // Send Transaction with Gas Limit
      const receipt = await contract.methods
        .notifyRewardAmount(rewardAmountWei, duration)
        .send({ from: owner, gas: gasEstimate + 10000 });

      console.log("Transaction receipt: ", receipt);
      toast.success("Contract funded successfully!");
    } catch (error) {
      console.error("Error funding contract: ", error);
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
