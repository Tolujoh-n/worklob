// Constants.js
// import WorkPlatform from "./abi/Ownable.json";
import LOBToken from "./abi/LOBToken.json"; // Add the ABI file for LOB token
import WorkLobStaking from "./abi/WorkLobStaking.json"; // Add the ABI file for LOB token

// export const ABI = WorkPlatform.abi;
// export const CONTRACT_ADDRESS = "0xAcc0993377b716f4C9814751fb64022247427eF9"; // Replace with your quiz platform contract address

// LOB Token contract details
export const LOB_TOKEN_ABI = LOBToken.abi;
export const LOB_TOKEN_ADDRESS = "0x77042618A5712F52004359d6b507cc24c7Ef2276"; // Replace with your LOB token contract address

// Worklob Staking contract
export const WorkLobStaking_abi = WorkLobStaking.abi;
export const WorkLobStaking_address =
  "0xa4D841AC2182665Fa2896e74fC978A0Bc7c36256";

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
