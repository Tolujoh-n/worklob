import React, { useState } from "react";
import TIA from "../../assets/img/tia.png";
import btc from "../../assets/img/btc.png";
import lobcoin from "../../assets/img/worklob-coin.png";
import { useWeb3 } from "../../Web3Provider";
import Depositmodal from "./Depositmodal";
import Transfermodal from "./Transfermodal";
import Swapmodal from "./Swapmodal";

const Wallet = () => {
  // Initialize state for transaction data
  const { baseETHBalance, lobBalance } = useWeb3();
  const [isDepositmodalOpen, setIsDepositmodalOpen] = useState(false);
  const [isTransfermodalOpen, setIsTransfermodalOpen] = useState(false);
  const [isSwapmodalOpen, setIsSwapmodalOpen] = useState(false);

  const openDepositmodal = () => setIsDepositmodalOpen(true);
  const closeDepositmodal = () => setIsDepositmodalOpen(false);

  const openTransfermodal = () => setIsTransfermodalOpen(true);
  const closeTransfermodal = () => setIsTransfermodalOpen(false);

  const openSwapmodal = () => setIsSwapmodalOpen(true);
  const closeSwapmodal = () => setIsSwapmodalOpen(false);

  const [transactions, setTransactions] = useState([
    {
      type: "Deposit",
      date: "2024-08-30",
      cryptocurrency: "TIA",
      transactionId: "oxs123456789abcdef",
      amount: "100 TIA",
    },
    {
      type: "Withdrawal",
      date: "2024-08-28",
      cryptocurrency: "LOB",
      transactionId: "oxsa1b2c3d4e5f67890",
      amount: "50 LOB",
    },
    {
      type: "Swap",
      date: "2024-08-27",
      cryptocurrency: "TIA to LOB",
      transactionId: "oxsabcdef123456789",
      amount: "25 TIA",
    },
    {
      type: "Deposit",
      date: "2024-08-26",
      cryptocurrency: "USDT",
      transactionId: "oxs0f9e8d7c6b5a4321",
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
              <span>
                Available Balance: {parseFloat(baseETHBalance).toFixed(2)} TIA
              </span>
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
                    <img src={TIA} alt="TIA" className="token-logo" /> TIA
                  </td>
                  <td>{parseFloat(baseETHBalance).toFixed(2)} TIA</td>
                  <td>0.00 USDT</td>
                </tr>
                <tr>
                  <td>
                    <img src={btc} alt="LOB" className="token-logo" /> BTC
                  </td>
                  <td>0 BTC</td>
                  <td>0.00 USDT</td>
                </tr>
                <tr>
                  <td>
                    <img src={lobcoin} alt="LOB" className="token-logo" /> LOB
                  </td>
                  <td>{parseFloat(lobBalance).toFixed(2)} LOB</td>
                  <td>0.00 USDT</td>
                </tr>
              </tbody>
            </table>
            <div className="wallet-buttons">
              <button className="chat-button" onClick={openDepositmodal}>
                <i className="bi bi-arrow-down-circle"></i> Deposit
              </button>
              <button className="chat-button" onClick={openTransfermodal}>
                <i className="bi bi-arrow-up-circle"></i> Transfer
              </button>
              <button className="chat-button" onClick={openSwapmodal}>
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
                    <img src={TIA} alt="TIA" className="token-logo" /> TIA
                  </td>
                  <td>0 TIA</td>
                  <td>0.00 USDT</td>
                </tr>
                <tr>
                  <td>
                    <img src={lobcoin} alt="LOB" className="token-logo" /> LOB
                  </td>
                  <td>0 LOB</td>
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
        <div className="transaction-history-card">
          <div className="transaction-history">
            <h2>Transaction History</h2>
            <div
              style={{ borderRadius: "5px", overflowX: "auto" }}
              className="col-12"
            >
              <table className="transaction-table">
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
      </div>
      <Depositmodal isOpen={isDepositmodalOpen} onClose={closeDepositmodal} />
      <Transfermodal
        isOpen={isTransfermodalOpen}
        onClose={closeTransfermodal}
      />
      <Swapmodal isOpen={isSwapmodalOpen} onClose={closeSwapmodal} />
    </>
  );
};

export default Wallet;
