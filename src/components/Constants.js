// Constants.js
import WorkLOB from "./abi/WorkLOB.json";
import LOBToken from "./abi/LOBToken.json"; // Add the ABI file for LOB token
import WorkLobStaking from "./abi/WorkLobStaking.json"; // Add the ABI file for LOB token

export const JOB_ABI = WorkLOB.abi;
export const JOB_CONTRACT_ADDRESS =
  "0xcD370B6B14fEf75C88b68Ceb98b3dFfE2D6Feb8b"; // Replace with your quiz platform contract address

// LOB Token contract details
export const LOB_TOKEN_ABI = LOBToken.abi;
export const LOB_TOKEN_ADDRESS = "0x77950BA34F2EB2C3ce6cb0A0b73E894ba57B82b8"; // Replace with your LOB token contract address

// Worklob Staking contract
export const WorkLobStaking_abi = WorkLobStaking.abi;
export const WorkLobStaking_address =
  "0xA0754eAFacf78b81839D7FD8D6Bf9FB777EC3576";

// Base Sepolia Testnet configuration
export const FLAME_TESTNET_PARAMS = {
  chainId: 16604737732183,
  chainName: "Flame Testnet",
  nativeCurrency: {
    name: "TIA",
    symbol: "TIA",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.flame.dawn-1.astria.org"], // Celestia Sepolia RPC URL
  blockExplorerUrls: ["https://explorer.flame.dawn-1.astria.org"], // Block Explorer URL for Base Sepolia Testnet
};
