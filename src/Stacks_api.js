const fetch = require("node-fetch");
const {
  cvToValue,
  parseToCV,
  hexToCV,
  cvToHex,
  cvToJSON,
} = require("@stacks/transactions");

const BASE_URL = "https://api.testnet.hiro.so";
const STACKS_API_KEY = process.env.STACKS_API_KEY;

const CACHE_DURATION = 60 * 60 * 24 * 7; // 7 days in seconds

// Fetch function with API Key handling
async function fetchData(url, method = "GET", body = null) {
  const headers = {
    "Content-Type": "application/json",
    "x-hiro-api-key": STACKS_API_KEY,
  };

  const options = {
    method,
    headers,
    ...(body && { body: JSON.stringify(body) }),
  };

  const response = await fetch(`${BASE_URL}${url}`, options);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

// Functions
async function getNamesFromAddress(address) {
  const data = await fetchData(`/v1/addresses/stacks/${address}`);
  return data.names;
}

async function getAccountBalance(principal) {
  const data = await fetchData(`/extended/v1/address/${principal}/balances`);
  return data;
}

async function getBlocks(limit = 1) {
  const data = await fetchData(`/extended/v2/blocks?limit=${limit}`);
  return data;
}

async function getCollectionSize(
  contract = "ST5HMBACVCBHDE0H96M11NCG6TKF7WVWSVSG2P53.worklob-token"
) {
  const [address, name] = contract.split(".");
  const path = `/v2/contracts/call-read/${address}/${name}/get-last-token-id`;

  const response = await fetchData(path, "POST", {
    sender: address,
    arguments: [],
  });
  const size = Number(cvToValue(hexToCV(response.result)));
  return size;
}
async function getTokenBalance(
  contract = "ST5HMBACVCBHDE0H96M11NCG6TKF7WVWSVSG2P53.worklob-token",
  user = "ST5HMBACVCBHDE0H96M11NCG6TKF7WVWSVSG2P53"
) {
  const [address, name] = contract.split(".");
  const path = `/v2/contracts/call-read/${address}/${name}/get-balance`;

  const response = await fetchData(path, "POST", {
    sender: address,
    arguments: [cvToHex(parseToCV(user, "principal"))],
  });

  console.log("API Response:", response);

  if (response?.result) {
    try {
      // The clarity value is a large hexadecimal string
      const clarityValueHex = response.result;

      // Parse the hex string into an integer
      const balanceInHex = parseInt(clarityValueHex, 16);

      // Assuming LOB token has 18 decimals, adjust if necessary based on your token's precision
      const tokenBalance = balanceInHex / 1e18; // Divide by 10^18 to account for decimals

      console.log("Parsed Token Balance:", tokenBalance);

      return tokenBalance; // Return the human-readable balance
    } catch (error) {
      console.error("Error decoding token balance:", error);
      return 0;
    }
  } else {
    console.error("Invalid API response:", response);
    return 0;
  }
}

async function getTokenURI(
  contract = "ST5HMBACVCBHDE0H96M11NCG6TKF7WVWSVSG2P53.worklob-token"
) {
  const [address, name] = contract.split(".");
  const path = `/v2/contracts/call-read/${address}/${name}/get-token-uri`;

  const response = await fetchData(path, "POST", {
    sender: address,
    arguments: [],
  });
  return cvToJSON(hexToCV(response.result)).value.value.value;
}

async function getTotalSupply(
  contract = "ST5HMBACVCBHDE0H96M11NCG6TKF7WVWSVSG2P53.worklob-token"
) {
  const [address, name] = contract.split(".");
  const path = `/v2/contracts/call-read/${address}/${name}/get-total-supply`;

  const response = await fetchData(path, "POST", {
    sender: address,
    arguments: [],
  });
  return Number(cvToValue(hexToCV(response.result)));
}

// Exports
module.exports = {
  getNamesFromAddress,
  getAccountBalance,
  getBlocks,
  getCollectionSize,
  getTokenBalance,
  getTokenURI,
  getTotalSupply,
};
