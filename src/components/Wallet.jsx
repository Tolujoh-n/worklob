import React, { useState } from "react";
import near from "../assets/img/nearlogo.jpg";
import neargig from "../assets/img/neargig-logo.png";

const Wallet = () => {
  // Initialize state for transaction data
  const [transactions, setTransactions] = useState([
    {
      type: "Deposit",
      date: "2024-08-30",
      cryptocurrency: "NEAR",
      transactionId: "0x123456789abcdef",
      amount: "100 NEAR",
    },
    {
      type: "Withdrawal",
      date: "2024-08-28",
      cryptocurrency: "NGIG",
      transactionId: "0xa1b2c3d4e5f67890",
      amount: "50 NGIG",
    },
    {
      type: "Swap",
      date: "2024-08-27",
      cryptocurrency: "NEAR to NGIG",
      transactionId: "0xabcdef123456789",
      amount: "25 NEAR",
    },
    {
      type: "Deposit",
      date: "2024-08-26",
      cryptocurrency: "USDT",
      transactionId: "0x0f9e8d7c6b5a4321",
      amount: "200 USDT",
    },
  ]);

  return (
    <>
      <div className="pagetitle">
        <h1>Wallets</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/wallet">Wallets</a>
            </li>
            <li className="breadcrumb-item active">mywallet</li>
          </ol>
        </nav>
      </div>

      <div className="wallet-container">
        {/* First Column */}
        <div className="wallet-column">
          <div className="wallet-card">
            <div className="wallet-header">
              <h2>Wallet Address</h2>
              <span>Available Balance: 0.00 NEAR</span>
            </div>
            <table className="wallet-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Balance</th>
                  <th>Equivalent (USDT)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src={near} alt="NEAR" className="token-logo" /> NEAR
                  </td>
                  <td>0 NEAR</td>
                  <td>0.00 USDT</td>
                </tr>
                <tr>
                  <td>
                    <img src={neargig} alt="NGIG" className="token-logo" /> NGIG
                  </td>
                  <td>0 NGIG</td>
                  <td>0.00 USDT</td>
                </tr>
              </tbody>
            </table>
            <div className="wallet-buttons">
              <button className="chat-button">
                <i className="bi bi-arrow-down-circle"></i> Deposit
              </button>
              <button className="chat-button">
                <i className="bi bi-arrow-up-circle"></i> Withdraw
              </button>
              <button className="chat-button">
                <i className="bi bi-arrow-left-right"></i> Swap
              </button>
            </div>
          </div>
        </div>

        {/* Second Column */}
        <div className="wallet-column">
          <div className="wallet-card">
            <div className="wallet-header">
              <h2>Escrow Balance</h2>
              <span>Balance: 0.00 USDT</span>
            </div>
            <table className="wallet-table">
              <thead>
                <tr>
                  <th>Token</th>
                  <th>Escrow Balance</th>
                  <th>Equivalent (USDT)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img src={near} alt="NEAR" className="token-logo" /> NEAR
                  </td>
                  <td>0 NEAR</td>
                  <td>0.00 USDT</td>
                </tr>
                <tr>
                  <td>
                    <img src={neargig} alt="NGIG" className="token-logo" /> NGIG
                  </td>
                  <td>0 NGIG</td>
                  <td>0.00 USDT</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="wallet-card">
            <div className="wallet-header">
              <h2>Bonus</h2>
              <span>Balance: 0.00 USDT</span>

              <span>
                {" "}
                <button className="chat-button">
                  Withdraw <i className="bi bi-box-arrow-up-right"></i>
                </button>
              </span>
            </div>
            <div className="bonus-details">
              <p>
                Referred Users: <span>5</span>
              </p>
              <p>
                Referral Bonus: <span>10 USDT</span>
                <span>10 USDT</span>
              </p>
              <p>
                Job Mining Bonus: <span>15 USDT</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="col-lg-12">
        <div className="transaction-history">
          <h2>Transaction History</h2>
          <div
            style={{ borderRadius: "5px", overflowX: "auto" }}
            className="col-12"
          >
            <table className="responsive-table">
              <thead>
                <tr className="table-header">
                  <th>Type & Date</th>
                  <th>Cryptocurrency</th>
                  <th>Transaction ID</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className="table-row">
                    <td className="col col-4" data-label="Amount">
                      <h6>
                        {" "}
                        {transaction.type} - {transaction.date}
                      </h6>
                    </td>

                    <td className="col col-2" data-label="Job Ids">
                      <h6>{transaction.cryptocurrency}</h6>
                    </td>
                    <td className="col col-4" data-label="Amount">
                      <h6>{transaction.transactionId}</h6>
                    </td>

                    <td className="col col-4" data-label="Job Ids">
                      <h6>{transaction.amount}</h6>
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

export default Wallet;
