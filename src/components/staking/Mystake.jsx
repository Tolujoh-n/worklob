import React, { useState } from "react";
import ETH from "../../assets/img/eth.png";
import btc from "../../assets/img/btc.png";
import lobcoin from "../../assets/img/worklob-coin.png";
import { useWeb3 } from "../../Web3Provider";

const Mystake = () => {
  // Initialize state for transaction data
  const { baseETHBalance, lobBalance } = useWeb3();
  const [validators, setValidators] = useState([
    {
      validator: "0x123456789abcdef123456789abcdef12345678",
      stakedAmount: "1000 LOB",
      rewards: "500 LOB",
      duration: "2 seconds",
      status: "active",
    },
    {
      validator: "0x123456789abcdef123456789abcdef12345678",
      stakedAmount: "1000 LOB",
      rewards: "200 LOB",
      duration: "40 seconds",
      status: "active",
    },
    {
      validator: "0x123456789abcdef123456789abcdef12345678",
      stakedAmount: "1000 LOB",
      rewards: "40 LOB",
      duration: "1 minutes",
      status: "active",
    },
    {
      validator: "0x123456789abcdef123456789abcdef12345678",
      stakedAmount: "1000 LOB",
      rewards: "44 LOB",
      duration: "2 miute",
      status: "ended",
    },
    {
      validator: "0xabcdef123456789abcdef123456789abcdef12",
      stakedAmount: "500 LOB",
      rewards: "68 LOB",
      duration: "20 days",
      status: "ended",
    },
    {
      validator: "0xabcdef123456789abcdef123456789abcdef12",
      stakedAmount: "500 LOB",
      rewards: "53 LOB",
      duration: "20 days",
      status: "ended",
    },
    {
      validator: "0xabcdef123456789abcdef123456789abcdef12",
      stakedAmount: "500 LOB",
      rewards: "100 LOB",
      duration: "20 days",
      status: "ended",
    },

    // Add more rows as needed
  ]);

  const [filter, setFilter] = useState("all");

  const handleFilterChange = (status) => {
    setFilter(status);
  };

  const truncateAddress = (address) => {
    const start = address.substring(0, 6);
    const end = address.substring(address.length - 4);
    return `${start}...${end}`;
  };

  const filteredValidators = validators.filter((validator) =>
    filter === "all" ? true : validator.status === filter
  );
  return (
    <>
      {/* Code price and button */}
      <div className="container mystake-card">
        <div className="row">
          <div className="col-md-4">
            <div className="mystake-item">
              <p className="mystake-name">My Staking Amount</p>
              <p className="mystake-price">0 LOB</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="mystake-item">
              <p className="mystake-name">Total Staking Value</p>
              <p className="mystake-price">$0.00 USD</p>
            </div>
          </div>
          <div className="col-md-4 col-lg-4">
            <div className="mystake-item">
              <p className="mystake-name">Claimable Rewards</p>
              <p className="mystake-price">0 LOB $0.00</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-end">
            <button className="mystake-button">Claim All</button>
            <button className="mystake-button">Claim and Restake</button>
          </div>
        </div>
      </div>
      {/* Transaction History */}
      <div className="col-lg-12">
        <div className="transaction-history-card">
          <div className="transaction-history">
            <div className="controls">
              <button
                className={`chat-button ${
                  filter === "all" ? "active-filterdata" : ""
                }`}
                onClick={() => handleFilterChange("all")}
              >
                All
              </button>
              <button
                className={`chat-button ${
                  filter === "active" ? "active-filterdata" : ""
                }`}
                onClick={() => handleFilterChange("active")}
              >
                Active
              </button>
              <button
                className={`chat-button ${
                  filter === "ended" ? "active-filterdata" : ""
                }`}
                onClick={() => handleFilterChange("ended")}
              >
                Ended
              </button>
            </div>
            <table className="transaction-table">
              <thead>
                <tr className="table-header">
                  <th>Staker Address</th>
                  <th>Staked Amount</th>
                  <th>Rewards Earned</th>
                  <th>Duration</th>
                  <th>Status</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredValidators.length > 0 ? (
                  filteredValidators.map((validator, index) => (
                    <tr key={index} className="table-row">
                      <td className="col col-4" data-label="Validator">
                        <h6>{truncateAddress(validator.validator)}</h6>
                      </td>
                      <td className="col col-2" data-label="Staked Amount">
                        <h6>{validator.stakedAmount}</h6>
                      </td>
                      <td className="col col-2" data-label="rewards">
                        <h6>{validator.rewards}</h6>
                      </td>
                      <td className="col col-2" data-label="Voting Power">
                        <h6>{validator.duration}</h6>
                      </td>
                      <td className="col col-2" data-label="Uptime">
                        <h6>{validator.status}</h6>
                      </td>
                      <td className="col col-2" data-label="Uptime">
                        <button className="claim-button">Claim</button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">
                      <div className="notadata">
                        <i className="bi bi-database"></i>
                        <h4>No data</h4>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mystake;
