import React, { useState } from "react";

const Withdrawals = () => {
  // Initialize state for transaction data
  const [transactions, setTransactions] = useState([
    {
      type: "Deposit",
      date: "2024-08-30",
      cryptocurrency: "NEAR",
      transactionId: "fb9123456789abcdef",
      amount: "100 NEAR",
    },
    {
      type: "Withdrawal",
      date: "2024-08-28",
      cryptocurrency: "NGIG",
      transactionId: "fb9a1b2c3d4e5f67890",
      amount: "50 NGIG",
    },
    {
      type: "Swap",
      date: "2024-08-27",
      cryptocurrency: "NEAR to NGIG",
      transactionId: "fb9abcdef123456789",
      amount: "25 NEAR",
    },
    {
      type: "Deposit",
      date: "2024-08-26",
      cryptocurrency: "USDT",
      transactionId: "fb90f9e8d7c6b5a4321",
      amount: "200 USDT",
    },
  ]);
  return (
    <div style={{ borderRadius: "5px", overflowX: "auto" }} className="col-12">
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
  );
};

export default Withdrawals;
