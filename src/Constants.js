// Constants.js
import WorkPlatform from "./WorkPlatform.json";
import LOBToken from "./LOBToken.json"; // Add the ABI file for LOB token

export const ABI = WorkPlatform.abi;
export const CONTRACT_ADDRESS = "0xAcc0993377b716f4C9814751fb64022247427eF9"; // Replace with your quiz platform contract address

// LOB Token contract details
export const LOB_TOKEN_ABI = LOBToken.abi;
export const LOB_TOKEN_ADDRESS = "0xAcc0993377b716f4C9814751fb64022247427eF9"; // Replace with your LOB token contract address

// Base Sepolia Testnet configuration
export const BASE_TESTNET_PARAMS = {
  chainId: 84532, // Hexadecimal Chain ID for Base Sepolia (84532 in decimal)
  chainName: "Base Sepolia Testnet",
  nativeCurrency: {
    name: "ETH",
    symbol: "ETH",
    decimals: 18,
  },
  rpcUrls: ["https://sepolia.base.org"], // Base Sepolia RPC URL
  blockExplorerUrls: ["https://sepolia-explorer.base.org"], // Block Explorer URL for Base Sepolia Testnet
};
