// Constants.js
// import WorkPlatform from "./abi/Ownable.json";
import LOBToken from "./abi/LOBToken.json"; // Add the ABI file for LOB token
import WorkLobStaking from "./abi/WorkLobStaking.json"; // Add the ABI file for LOB token

// export const ABI = WorkPlatform.abi;
// export const CONTRACT_ADDRESS = "0xAcc0993377b716f4C9814751fb64022247427eF9"; // Replace with your quiz platform contract address

// LOB Token contract details
export const LOB_TOKEN_ABI = LOBToken.abi;
export const LOB_TOKEN_ADDRESS = "0xC677a1b3461B2417D7789331357606d8Bb17FD24"; // Replace with your LOB token contract address

// Worklob Staking contract
export const WorkLobStaking_abi = WorkLobStaking.abi;
export const WorkLobStaking_address =
  "0x5f7EA14645b5ccD53F069A9bF6399E78A725669C";

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
