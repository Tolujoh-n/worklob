// Constants.js
import WorkPlatform from "./abi/Ownable.json";
import LOBToken from "./abi/LOBToken.json"; // Add the ABI file for LOB token
import WorkLobStaking from "./abi/WorkLobStaking.json"; // Add the ABI file for LOB token

export const ABI = WorkPlatform.abi;
export const CONTRACT_ADDRESS = "0xAcc0993377b716f4C9814751fb64022247427eF9"; // Replace with your quiz platform contract address

// LOB Token contract details
export const LOB_TOKEN_ABI = LOBToken.abi;
export const LOB_TOKEN_ADDRESS = "0x77950BA34F2EB2C3ce6cb0A0b73E894ba57B82b8"; // Replace with your LOB token contract address

// Worklob Staking contract
export const WorkLobStaking_abi = WorkLobStaking.abi;
export const WorkLobStaking_address =
  "0xC95D7CA63644bA75276b06022a40cb892EDd6137";

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
