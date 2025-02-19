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
      stakedAmount: "1000 ETH",
      commission: "5%",
      votingPower: "50%",
      uptime: "99.9%",
      status: "active",
    },
    {
      validator: "0x123456789abcdef123456789abcdef12345678",
      stakedAmount: "1000 ETH",
      commission: "5%",
      votingPower: "50%",
      uptime: "99.9%",
      status: "active",
    },
    {
      validator: "0x123456789abcdef123456789abcdef12345678",
      stakedAmount: "1000 ETH",
      commission: "5%",
      votingPower: "50%",
      uptime: "99.9%",
      status: "active",
    },
    {
      validator: "0x123456789abcdef123456789abcdef12345678",
      stakedAmount: "1000 ETH",
      commission: "5%",
      votingPower: "50%",
      uptime: "99.9%",
      status: "active",
    },
    {
      validator: "0xabcdef123456789abcdef123456789abcdef12",
      stakedAmount: "500 ETH",
      commission: "4%",
      votingPower: "30%",
      uptime: "98.5%",
      status: "inactive",
    },
    {
      validator: "0xabcdef123456789abcdef123456789abcdef12",
      stakedAmount: "500 ETH",
      commission: "4%",
      votingPower: "30%",
      uptime: "98.5%",
      status: "inactive",
    },
    {
      validator: "0xabcdef123456789abcdef123456789abcdef12",
      stakedAmount: "500 ETH",
      commission: "4%",
      votingPower: "30%",
      uptime: "98.5%",
      status: "inactive",
    },

    // Add more rows as needed
  ]);

  const [filter, setFilter] = useState("active");

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
              <p className="mystake-price">0 INJ</p>
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
              <p className="mystake-price">0 INJ $0.00</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12 d-flex justify-content-between">
            <button className="mystake-button">Claim All</button>
            <button className="mystake-button">Claim and Restake</button>
          </div>
        </div>
      </div>
      {/* Transaction History */}
      <div className="col-lg-12">
        <div className="transaction-history-card">
          <div className="transaction-history">
            <h2>Validators</h2>
            <div className="controls">
              <button
                className="chat-button"
                onClick={() => handleFilterChange("active")}
              >
                Active
              </button>
              <button
                className="chat-button"
                onClick={() => handleFilterChange("inactive")}
              >
                Inactive
              </button>
              <input
                type="text"
                placeholder="Search..."
                className="stake-search-bar"
              />
            </div>
            <table className="transaction-table">
              <thead>
                <tr className="table-header">
                  <th>Validator</th>
                  <th>Staked Amount</th>
                  <th>Commission</th>
                  <th>Voting Power</th>
                  <th>Uptime</th>
                </tr>
              </thead>
              <tbody>
                {filteredValidators.map((validator, index) => (
                  <tr key={index} className="table-row">
                    <td className="col col-4" data-label="Validator">
                      <h6>{truncateAddress(validator.validator)}</h6>
                    </td>
                    <td className="col col-2" data-label="Staked Amount">
                      <h6>{validator.stakedAmount}</h6>
                    </td>
                    <td className="col col-2" data-label="Commission">
                      <h6>{validator.commission}</h6>
                    </td>
                    <td className="col col-2" data-label="Voting Power">
                      <h6>{validator.votingPower}</h6>
                    </td>
                    <td className="col col-2" data-label="Uptime">
                      <h6>{validator.uptime}</h6>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default Mystake;
