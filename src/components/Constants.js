// Constants.js
import WorkLOB from "./abi/WorkLOB.json";
import LOBToken from "./abi/LOBToken.json"; // Add the ABI file for LOB token
import WorkLobStaking from "./abi/WorkLobStaking.json"; // Add the ABI file for LOB token

export const JOB_ABI = WorkLOB.abi;
export const JOB_CONTRACT_ADDRESS =
  "0xaFB3777fC863C06240eB917f8752417cB4B93aE6"; // Replace with your quiz platform contract address

// LOB Token contract details
export const LOB_TOKEN_ABI = LOBToken.abi;
export const LOB_TOKEN_ADDRESS = "0xC677a1b3461B2417D7789331357606d8Bb17FD24"; // Replace with your LOB token contract address

// Worklob Staking contract
export const WorkLobStaking_abi = WorkLobStaking.abi;
export const WorkLobStaking_address =
  "0x5B4fB44257c4CC1c178B4a2f63B99d03528b5eFD";

// Base Sepolia Testnet configuration
export const BASE_TESTNET_PARAMS = {
  chainId: 84532,
  chainName: "Base Sepolia Testnet",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://sepolia.base.org"], // Base Sepolia RPC URL
  blockExplorerUrls: ["https://sepolia-explorer.base.org"], // Block Explorer URL for Base Sepolia Testnet
};
