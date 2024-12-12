import React, { createContext, useState, useEffect, useContext } from "react";
import { AppConfig, UserSession, showConnect } from "@stacks/connect";
import { STACKS_TESTNET } from "@stacks/network";
import { makeContractCall } from "@stacks/transactions";
import { fetchCallReadOnlyFunction } from "@stacks/transactions";
import {
  standardPrincipalCV,
  cvToValue,
  parseToCV,
  hexToCV,
  cvToHex,
} from "@stacks/transactions";
const Web3Context = createContext();

const WORKLOB_TOKEN_CONTRACT =
  "ST5HMBACVCBHDE0H96M11NCG6TKF7WVWSVSG2P53.worklob-token";

const getBTCBalance = async (address) => {
  const url = `https://api.blockcypher.com/v1/btc/test3/addrs/${address}`;
  return fetch(url)
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        let balance = Math.trunc(data.balance / 1000) / 100000;
        return balance;
      }
      return 0;
    })
    .catch((err) => {
      console.error(err);
      return 0;
    });
};

const getSTXBalance = async (address) => {
  const url = `https://stacks-node-api.testnet.stacks.co/v2/accounts/${address}`;
  return fetch(url)
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        let balance = parseInt(data.balance, 16);
        balance = Math.trunc(balance / 10000) / 100;
        return balance;
      }
      return 0;
    })
    .catch((err) => {
      console.error(err);
      return 0;
    });
};

const getLOBTokenBalance = async (address) => {
  const [contractAddress, contractName] = WORKLOB_TOKEN_CONTRACT.split("."); // Split to get contract details

  // Define the API endpoint for reading from the contract
  const url = `https://api.testnet.hiro.so/v2/contracts/call-read/${contractAddress}/${contractName}/get-balance`;

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: contractAddress,
      arguments: [cvToHex(parseToCV(String(address), "principal"))],
    }),
  })
    .then(async (res) => {
      if (res.ok) {
        const data = await res.json();
        // Assuming the response contains the result in the `data.result` property
        const balance = Number(cvToValue(hexToCV(data.result)));
        return balance; // Return the parsed balance
      }
      return 0; // Return 0 if the request fails
    })
    .catch((err) => {
      console.error(err);
      return 0; // Return 0 if there's an error in the fetch process
    });
};
export const Web3Provider = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [account, setAccount] = useState("");
  const [btcBalance, setBtcBalance] = useState("0");
  const [stxBalance, setStxBalance] = useState("0");
  const [lobBalance, setLobBalance] = useState("0");
  const [userSession, setUserSession] = useState(null);

  useEffect(() => {
    const appConfig = new AppConfig();
    const session = new UserSession({ appConfig });

    if (session.isUserSignedIn()) {
      const userData = session.loadUserData();
      setAccount(userData.profile.stxAddress.testnet);
      setConnected(true);
      fetchBalances(userData.profile.stxAddress.testnet, session);
    } else if (session.isSignInPending()) {
      session.handlePendingSignIn().then((userData) => {
        setAccount(userData.profile.stxAddress.testnet);
        setConnected(true);
        fetchBalances(userData.profile.stxAddress.testnet, session);
      });
    }

    setUserSession(session);
  }, []);

  const fetchBalances = async (address, session) => {
    const btcBal = await getBTCBalance(address);
    const stxBal = await getSTXBalance(address);
    const lobBal = await getLOBTokenBalance(address);

    setBtcBalance(btcBal);
    setStxBalance(stxBal);
    setLobBalance(lobBal);
  };

  const connectWallet = () => {
    showConnect({
      userSession,
      network: STACKS_TESTNET,
      appDetails: {
        name: "StarsLob",
        icon: "https://i.ibb.co/XS780TX/worklob-coin.png",
      },
      onFinish: () => {
        const userData = userSession.loadUserData();
        setAccount(userData.profile.stxAddress.testnet);
        setConnected(true);
        fetchBalances(userData.profile.stxAddress.testnet, userSession);
      },
      onCancel: () => {
        console.error("Wallet connection canceled");
      },
    });
  };

  const disconnectWallet = () => {
    userSession.signUserOut(window.location.origin);
    setConnected(false);
    setAccount("");
    setBtcBalance("0");
    setStxBalance("0");
    setLobBalance("0");
  };

  const shortenAddress = (address) => {
    if (!address) return "";
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  };

  return (
    <Web3Context.Provider
      value={{
        connected,
        account,
        btcBalance,
        stxBalance,
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
