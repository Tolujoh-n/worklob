import React, { useState, useEffect } from "react";
import lobcoin from "../../assets/img/worklob-coin.png";
import { useWeb3 } from "../../Web3Provider";
import {
  WorkLobStaking_abi,
  WorkLobStaking_address,
  LOB_TOKEN_ABI,
  LOB_TOKEN_ADDRESS,
} from "../Constants";
import { ethers } from "ethers";
import { Toaster, toast } from "sonner";

const Staking = () => {
  const { connectWallet, connected } = useWeb3();
  const { baseETHBalance, lobBalance } = useWeb3();
  const [rewardRate, setRewardRate] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [rewardPeriod, setRewardPeriod] = useState(0);
  const [stakingAmount, setStakingAmount] = useState("");
  const [estimatedRewards, setEstimatedRewards] = useState({
    1: 0,
    7: 0,
    30: 0,
    365: 0,
  });

  const [validators, setValidators] = useState([]);
  const [filter, setFilter] = useState("active");
  const [filteredValidators, setFilteredValidators] = useState([]);
  const [account, setAccount] = useState(null);

  useEffect(() => {
    const fetchStakers = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const stakingContract = new ethers.Contract(
        WorkLobStaking_address,
        WorkLobStaking_abi,
        signer
      );
      const accounts = await provider.send("eth_requestAccounts", []);
      setAccount(accounts[0]);

      const allStakers = await stakingContract.getAllStakers();
      const stakers = allStakers[0].map((address, index) => ({
        validator: address,
        stakedAmount: ethers.utils.formatEther(allStakers[1][index]),
        rewards: ethers.utils.formatEther(allStakers[2][index]),
        duration: allStakers[3][index].toNumber(),
        status: allStakers[4][index] ? "Active" : "Ended",
      }));
      setFilteredValidators(stakers);
    };

    fetchStakers();
  }, []);

  useEffect(() => {
    if (connected) {
      loadStakingData();
    }
  }, [connected]);

  const loadStakingData = async () => {
    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();

      const stakingContract = new ethers.Contract(
        WorkLobStaking_address,
        WorkLobStaking_abi,
        signer
      );

      const tokenContract = new ethers.Contract(
        LOB_TOKEN_ADDRESS,
        LOB_TOKEN_ABI,
        signer
      );

      // Fetch reward rate and total staked amount
      const rate = await stakingContract.rewardRate();
      setRewardRate(ethers.utils.formatUnits(rate, 18));

      const totalStakedAmount = await stakingContract.totalStaked();
      setTotalStaked(ethers.utils.formatUnits(totalStakedAmount, 18));

      // Fetch data for active validators
      const validatorsData = []; // Assuming this comes from a function or event that tracks validators.
      setValidators(validatorsData);
    } catch (error) {
      console.error("Error loading staking data:", error);
    }
  };

  const handleStakingAmountChange = (e) => {
    const amount = e.target.value;
    setStakingAmount(amount);
    calculateRewards(amount);
  };

  const calculateRewards = (amount) => {
    if (amount > 0) {
      const rewardPerDay = (rewardRate * amount * 1) / totalStaked;
      const rewardPerWeek = rewardPerDay * 7;
      const rewardPerMonth = rewardPerDay * 30;
      const rewardPerYear = rewardPerDay * 365;

      setEstimatedRewards({
        1: rewardPerDay.toFixed(2),
        7: rewardPerWeek.toFixed(2),
        30: rewardPerMonth.toFixed(2),
        365: rewardPerYear.toFixed(2),
      });
    }
  };
  const handleContinueToStaking = async () => {
    if (!connected) {
      connectWallet();
      return;
    }
    if (!stakingAmount || parseFloat(stakingAmount) <= 0) {
      toast.error("Please enter a valid staking amount.");
      return;
    }

    try {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const stakingContract = new ethers.Contract(
        WorkLobStaking_address,
        WorkLobStaking_abi,
        signer
      );

      const tokenContract = new ethers.Contract(
        LOB_TOKEN_ADDRESS,
        LOB_TOKEN_ABI,
        signer
      );
      const amountToStake = ethers.utils.parseUnits(stakingAmount, 18);

      // Approve the staking contract to transfer tokens on behalf of the user
      await tokenContract.approve(WorkLobStaking_address, amountToStake);

      console.log("Stake tokens:", ethers.utils.formatUnits(amountToStake, 18));

      // Attempt to estimate gas dynamically
      let estimatedGas;
      try {
        estimatedGas = await stakingContract.estimateGas.stake(amountToStake);
      } catch (error) {
        console.warn("Gas estimation failed, using fallback gas limit.");
        estimatedGas = ethers.BigNumber.from("200000"); // Fallback value
      }

      // Send the transaction with the estimated gas (or fallback)
      const tx = await stakingContract.stake(amountToStake, {
        gasLimit: estimatedGas, // Use the estimated gas or fallback
      });

      await tx.wait(); // Wait for transaction confirmation
      toast.success("Successfully staked your tokens!");
      window.location.reload(); // Reload the page after staking
    } catch (error) {
      console.error("Error staking tokens:", error);
      // Handle specific errors
      if (error.code === "UNPREDICTABLE_GAS_LIMIT") {
        toast.error(
          "Unable to estimate gas. Please check your transaction parameters or try again later."
        );
      } else {
        toast.error("Error staking tokens.");
      }
    }
  };

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const truncateAddress = (address) => {
    const start = address.substring(0, 6);
    const end = address.substring(address.length - 4);
    return `${start}...${end}`;
  };

  return (
    <>
      <div className="col-lg-3 col-md-4 col-sm-12">
        <div className="stake-column">
          <div className="stake-card">
            <h5>Total Staked LOB</h5>
            <h5>
              {" "}
              {parseFloat(totalStaked ? totalStaked : "Loading...").toFixed(2)}
            </h5>
          </div>
          <div className="stake-card">
            <div className="stake-header">
              <h5>Staking Rewards Rate</h5>
              <h5>
                {parseFloat(
                  rewardRate ? `${rewardRate}%` : "Loading..."
                ).toFixed(2)}
              </h5>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-9 col-md-8 col-sm-12">
        <div className="stake-column">
          <div className="stake-card stake-staking-card">
            <div className="stake-staking-left" style={{ marginRight: "20px" }}>
              <h2>Stake LOB</h2>
              <p>Enter staking amount to view estimated future rewards</p>
              <div className="stake-input-container">
                <div className="stake-input-top">
                  <span>Amount</span>
                  <span className="stake-available-text">
                    Available: {parseFloat(lobBalance).toFixed(2)}
                  </span>
                </div>
                <div className="stake-input-box">
                  <input
                    type="number"
                    placeholder="0.00"
                    className="stake-input"
                    value={stakingAmount}
                    onChange={handleStakingAmountChange}
                  />
                  <img src={lobcoin} alt="LOB" className="stake-btc-logo" />
                </div>
              </div>
              <button className="chat-button" onClick={handleContinueToStaking}>
                Continue to Staking
              </button>
            </div>
            <div className="stake-staking-right">
              <h4>Estimated Staking Rewards</h4>
              <div className="stake-header">
                <h5>
                  <span>1 day</span> <br />$
                  {estimatedRewards[1] ? estimatedRewards[1] : "0.00"}
                </h5>
                <h5>
                  <span>7 days</span> <br />$
                  {estimatedRewards[7] ? estimatedRewards[7] : "0.00"}
                </h5>
              </div>
              <div className="stake-header">
                <h5>
                  <span>30 days</span> <br />$
                  {estimatedRewards[30] ? estimatedRewards[30] : "0.00"}
                </h5>
                <h5>
                  <span>365 days</span> <br />$
                  {estimatedRewards[365] ? estimatedRewards[365] : "0.00"}
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="col-lg-12">
        <div className="transaction-history-card">
          <div className="transaction-history">
            <div className="controls">
              <button
                className={`chat-button ${
                  filter === "active" ? "active-filterdata" : ""
                }`}
                onClick={() => handleFilterChange("active")}
              >
                Active
              </button>
              <button
                className={`chat-button ${
                  filter === "ended" ? "active-filterdata" : ""
                }`}
                onClick={() => handleFilterChange("ended")}
              >
                Ended
              </button>
              <input
                type="text"
                placeholder="Search..."
                className="stake-search-bar"
              />
            </div>

            <table className="transaction-table">
              <thead>
                <tr className="table-header">
                  <th>Staker Address</th>
                  <th>Staked Amount</th>
                  <th>Rewards Earned</th>
                  <th>Duration</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredValidators.length > 0 ? (
                  filteredValidators.map((validator, index) => (
                    <tr key={index} className="table-row">
                      <td className="col col-4" data-label="Validator">
                        <h6>{truncateAddress(validator.validator)}</h6>
                      </td>
                      <td className="col col-2" data-label="Staked Amount">
                        <h6>{validator.stakedAmount}</h6>
                      </td>
                      <td className="col col-2" data-label="rewards">
                        <h6>{validator.rewards}</h6>
                      </td>
                      <td className="col col-2" data-label="Duration">
                        <h6>{validator.duration}</h6>
                      </td>
                      <td className="col col-2" data-label="Status">
                        <h6>{validator.status}</h6>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      <div className="notadata">
                        <i className="bi bi-database"></i>
                        <h4>No data</h4>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Staking;
