import React, { useState } from "react";
import ETH from "../../assets/img/eth.png";
import btc from "../../assets/img/btc.png";
import lobcoin from "../../assets/img/worklob-coin.png";
import { useWeb3 } from "../../Web3Provider";

const Staking = () => {
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
      <div className="pagetitle">
        <h1>Stacking</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/wallet">Stacking</a>
            </li>
            <li className="breadcrumb-item active">coin</li>
          </ol>
        </nav>
      </div>

      {/* First Column (Left Side) */}
      <div className="col-lg-3 col-md-4 col-sm-12">
        <div className="stake-column">
          <div className="stake-card">
            <h5>Total Staked LOB</h5>
            <h5>57,784,602.16</h5>
          </div>
          <div className="stake-card">
            {/* <h2>Stake Address</h2> */}
            <div className="stake-header">
              <h5>Staking Rewards APR</h5>
              <h5>11.85%</h5>
            </div>
          </div>
        </div>
      </div>

      {/* Second Column (Right Side) */}
      <div className="col-lg-9 col-md-8 col-sm-12">
        <div className="stake-column">
          {/* Third Stake Card - Staking Section */}
          <div className="stake-card stake-staking-card">
            <div className="stake-staking-left" style={{ marginRight: "20px" }}>
              <h2>Stake LOB</h2>
              <p>Enter staking amount to view estimated future rewards</p>
              <div className="stake-input-container">
                <div className="stake-input-top">
                  <span>Amount</span>
                  <span className="stake-available-text">Available: 0.00</span>
                </div>
                <div className="stake-input-box">
                  <input
                    type="number"
                    placeholder="0.00"
                    className="stake-input"
                  />
                  <img src={lobcoin} alt="BTC" className="stake-btc-logo" />
                </div>
              </div>
              <button className="chat-button">Continue to Staking</button>
            </div>
            <div className="stake-staking-right">
              <h4>Estimated Staking Rewards</h4>
              <br />
              <div className="stake-header">
                <h5>
                  <span>1 day</span> <br />
                  $0.00
                </h5>
                <h5>
                  <span>7 days</span> <br />
                  $0.00
                </h5>
              </div>
              <br />
              <div className="stake-header">
                <h5>
                  <span>30 days</span> <br />
                  $0.00
                </h5>
                <h5>
                  <span>365 days</span> <br />
                  $0.00
                </h5>
              </div>
            </div>
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

export default Staking;
