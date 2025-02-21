// Load constants and dependencies
import { WorkLobStaking_abi, WorkLobStaking_address } from "../Constants";
const Web3 = require("web3");
const web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

// Load the staking contract
const Contract = new web3.eth.Contract(
  WorkLobStaking_abi,
  WorkLobStaking_address
);

// Define the function to fund the contract
async function fundContract(rewardAmount, duration) {
  const accounts = await web3.eth.getAccounts();
  const owner = accounts[0]; // Assuming the first account is the owner

  // Convert reward amount to wei
  const rewardAmountWei = web3.utils.toWei(rewardAmount.toString(), "ether");

  // Call notifyRewardAmount function
  const receipt = await Contract.methods
    .notifyRewardAmount(rewardAmountWei, duration)
    .send({ from: owner });
  console.log("Transaction receipt: ", receipt);
}

// Replace the reward amount and duration with your values
const rewardAmount = 180000; // Reward amount in tokens
const duration = 5184000; // Duration in seconds (2 months)

// Call the function
fundContract(rewardAmount, duration);
