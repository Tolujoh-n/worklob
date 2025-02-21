import React, { useState, useEffect } from "react";
import { useWeb3 } from "../../Web3Provider";
import {
  WorkLobStaking_abi,
  WorkLobStaking_address,
  LOB_TOKEN_ABI,
  LOB_TOKEN_ADDRESS,
} from "../Constants";
import { ethers } from "ethers";
import { Toaster, toast } from "sonner";

const Fundstaking = () => {
  const { connected, walletAddress, connectWallet } = useWeb3();
  const [rewardAmount, setRewardAmount] = useState("");
  const [duration, setDuration] = useState("");
  const [userBalance, setUserBalance] = useState("0");
  const [lobBalance, setLobBalance] = useState("0");

  useEffect(() => {
    const fetchDetails = async () => {
      if (!connected || !walletAddress) return;

      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();

        // Fetch ETH balance
        const balance = await provider.getBalance(walletAddress);
        setUserBalance(ethers.utils.formatEther(balance));

        // Fetch LOB token balance
        const lobContract = new ethers.Contract(
          LOB_TOKEN_ADDRESS,
          LOB_TOKEN_ABI,
          signer
        );
        const lobBalanceWei = await lobContract.balanceOf(walletAddress);
        setLobBalance(ethers.utils.formatEther(lobBalanceWei));
      } catch (error) {
        console.error("Error fetching details:", error);
      }
    };

    fetchDetails();
  }, [connected, walletAddress]);

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

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const contract = new ethers.Contract(
        WorkLobStaking_address,
        WorkLobStaking_abi,
        signer
      );

      const rewardAmountInWei = ethers.utils.parseUnits(
        rewardAmount.toString(),
        "ether"
      );

      // Check if the user has enough LOB tokens
      const lobContract = new ethers.Contract(
        LOB_TOKEN_ADDRESS,
        LOB_TOKEN_ABI,
        signer
      );
      const userLobBalanceWei = await lobContract.balanceOf(walletAddress);

      if (userLobBalanceWei.lt(rewardAmountInWei)) {
        throw new Error(
          "Not enough LOB tokens for reward. Please fund your wallet."
        );
      }

      console.log("Approving staking contract to spend LOB tokens...");
      const approvalTx = await lobContract.approve(
        WorkLobStaking_address,
        rewardAmountInWei
      );
      await approvalTx.wait();
      console.log("Approval successful.");

      console.log("Estimating gas for notifyRewardAmount...");
      let gasEstimateValue;
      try {
        gasEstimateValue = await contract.estimateGas.notifyRewardAmount(
          rewardAmountInWei,
          duration
        );
        console.log("Estimated Gas:", gasEstimateValue.toString());
      } catch (gasError) {
        console.warn("Gas estimation failed, using fallback gas limit.");
        gasEstimateValue = ethers.BigNumber.from("500000");
      }

      console.log("Executing transaction...");
      const transaction = await contract.notifyRewardAmount(
        rewardAmountInWei,
        duration,
        {
          gasLimit: gasEstimateValue.add(ethers.BigNumber.from("10000")),
        }
      );

      console.log("Transaction sent:", transaction.hash);
      await transaction.wait();
      console.log("Transaction confirmed.");
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
          <p className="mt-3">
            Wallet Balance: <strong>{userBalance} ETH</strong>
          </p>
          <p className="mt-3">
            LOB Balance: <strong>{lobBalance} LOB</strong>
          </p>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Fundstaking;
