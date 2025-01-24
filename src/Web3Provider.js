import React, { createContext, useState, useEffect, useContext } from "react";
import Web3 from "web3";
import {
  BASE_TESTNET_PARAMS,
  LOB_TOKEN_ABI,
  LOB_TOKEN_ADDRESS,
} from "./Constants";

const Web3Context = createContext();

export const Web3Provider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [walletAddress, setWalletAddress] = useState("");
  const [baseETHBalance, setBaseETHBalance] = useState("0");
  const [lobBalance, setLobBalance] = useState("0");
  const [web3, setWeb3] = useState(null);

  // Switch to Base Testnet
  const switchToBaseTestnet = async () => {
    try {
      const currentChainId = await window.ethereum.request({
        method: "eth_chainId",
      });

      // Convert the chainId to match the constant format
      const baseTestnetChainId = `0x${BASE_TESTNET_PARAMS.chainId.toString(
        16
      )}`;

      // If not on the Base Testnet, prompt the user to switch
      if (currentChainId !== baseTestnetChainId) {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: baseTestnetChainId }],
        });
      }
    } catch (switchError) {
      // If the network is not added, add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: `0x${BASE_TESTNET_PARAMS.chainId.toString(16)}`,
                chainName: BASE_TESTNET_PARAMS.chainName,
                nativeCurrency: BASE_TESTNET_PARAMS.nativeCurrency,
                rpcUrls: BASE_TESTNET_PARAMS.rpcUrls,
                blockExplorerUrls: BASE_TESTNET_PARAMS.blockExplorerUrls,
              },
            ],
          });
        } catch (addError) {
          console.error("Failed to add Base Testnet", addError);
        }
      } else {
        console.error("Failed to switch network", switchError);
      }
    }
  };

  const connectWallet = async () => {
    if (!window.ethereum) {
      console.error("MetaMask not detected. Please install MetaMask.");
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    try {
      const accounts = await window.ethereum.request({
        method: "eth_requestAccounts",
      });
      setWalletAddress(accounts[0]);
      setConnected(true);

      // Log the connected address
      console.log("Connected address:", accounts[0]);

      // Switch to Base Testnet
      await switchToBaseTestnet();

      // Initialize Web3 with the current provider (MetaMask)
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);

      // Fetch balances
      fetchBalances(accounts[0]);
    } catch (error) {
      console.error("Wallet connection failed", error);
    }
  };

  const fetchBalances = async (address) => {
    if (!web3) return;

    try {
      // Fetch Base ETH balance
      const balance = await web3.eth.getBalance(address);
      const ethBalance = web3.utils.fromWei(balance, "ether");
      setBaseETHBalance(ethBalance);

      // Log the ETH balance to console
      console.log("Base ETH balance:", ethBalance);

      // Fetch LOB token balance
      const lobTokenContract = new web3.eth.Contract(
        LOB_TOKEN_ABI,
        LOB_TOKEN_ADDRESS
      );
      const lobBalance = await lobTokenContract.methods
        .balanceOf(address)
        .call();
      const lobTokenBalance = web3.utils.fromWei(lobBalance, "ether");
      setLobBalance(lobTokenBalance);

      // Log the LOB token balance to console
      console.log("LOB token balance:", lobTokenBalance);
    } catch (error) {
      console.error("Failed to fetch balances", error);
    }
  };

  const disconnectWallet = () => {
    setConnected(false);
    setWalletAddress("");
    setBaseETHBalance("0");
    setLobBalance("0");
  };

  const shortenAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  useEffect(() => {
    if (connected) {
      fetchBalances(walletAddress); // Fetch balances after connection
    }
  }, [connected, walletAddress]);

  return (
    <Web3Context.Provider
      value={{
        connected,
        walletAddress,
        baseETHBalance,
        lobBalance,
        connectWallet,
        disconnectWallet,
        shortenAddress,
      }}
    >
      {children}
    </Web3Context.Provider>
  );
};

export const useWeb3 = () => useContext(Web3Context);
