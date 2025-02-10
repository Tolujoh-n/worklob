import React, { useState } from "react";
import { useWeb3 } from "../../Web3Provider";
import { Toaster, toast } from "sonner";
import Web3 from "web3";
import { LOB_TOKEN_ADDRESS, LOB_TOKEN_ABI } from "../../Constants";

const Transfermodal = ({ isOpen, onClose }) => {
  const { connectWallet, connected } = useWeb3();
  const [token, setToken] = useState("ETH");
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const handleTokenChange = (e) => setToken(e.target.value);
  const handleRecipientChange = (e) => setRecipient(e.target.value);
  const handleAmountChange = (e) => setAmount(e.target.value);

  const handleTransfer = async () => {
    if (!recipient || !amount) {
      toast.error("Please enter recipient address and amount to send.");
      return;
    }

    const web3 = new Web3(Web3.givenProvider);

    const contractAddress =
      token === "ETH"
        ? "0x0000000000000000000000000000000000000000"
        : LOB_TOKEN_ADDRESS;

    try {
      const accounts = await web3.eth.getAccounts();
      const sender = accounts[0];

      if (token === "ETH") {
        await web3.eth.sendTransaction({
          from: sender,
          to: recipient,
          value: web3.utils.toWei(amount, "ether"),
        });
      } else {
        const contract = new web3.eth.Contract(LOB_TOKEN_ABI, contractAddress);
        await contract.methods
          .transfer(recipient, web3.utils.toWei(amount, "ether"))
          .send({ from: sender });
      }

      toast.success("Transfer successful!");
    } catch (error) {
      toast.error(`Transfer failed: ${error.message}`);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal" style={modalStyle}>
      <div className="modal-content" style={modalContentStyle}>
        <Toaster position="top-right" />
        {connected ? (
          <>
            <h3 style={{ textAlign: "center" }}>Transfer Token</h3>
            <div className="form-group" style={formGroupStyle}>
              <label style={labelStyle}>Token</label>
              <select
                value={token}
                onChange={handleTokenChange}
                style={formControlStyle}
              >
                <option value="ETH">ETH (Base)</option>
                <option value="LOB">LOB</option>
              </select>
            </div>
            <div className="form-group" style={formGroupStyle}>
              <label style={labelStyle}>Recipient Address</label>
              <input
                type="text"
                placeholder="0xb9b4....83a"
                value={recipient}
                onChange={handleRecipientChange}
                style={formControlStyle}
              />
            </div>
            <div className="form-group" style={formGroupStyle}>
              <label style={labelStyle}>Amount to Send</label>
              <input
                type="number"
                placeholder="$0.00"
                value={amount}
                onChange={handleAmountChange}
                style={formControlStyle}
              />
            </div>

            <div className="wallet-buttons">
              <button className="closemodall-button" onClick={onClose}>
                Close
              </button>
              <button className="modall-button" onClick={handleTransfer}>
                Transfer Token
              </button>
            </div>
          </>
        ) : (
          <>
            <h3 style={{ textAlign: "center" }}>Connect wallet to transfer</h3>
            <div style={{ textAlign: "center" }}>
              <button onClick={connectWallet} className="modall-button">
                Connect Wallet
              </button>
            </div>
            <br></br>
            <button className="closemodall-button" onClick={onClose}>
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Transfermodal;

const modalStyle = {
  display: "block",
  position: "fixed",
  zIndex: "9999",
  top: "0",
  left: "0",
  width: "100%",
  height: "100%",
  backgroundColor: "rgba(0, 0, 0, 0.4)",
};

const modalContentStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  maxWidth: "80%",
  width: "auto",
  minWidth: "300px",
  background: "#1a2c38",
  border: "1px solid white",
  borderRadius: "8px",
  padding: "20px",
  boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
};

const formGroupStyle = {
  marginBottom: "15px",
};

const labelStyle = {
  display: "block",
  marginBottom: "5px",
  color: "#d5dceb",
};

const formControlStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "16px",
  border: "1px solid #ccc",
  borderRadius: "5px",
  background: "#fff",
  color: "#5c5a5a",
};

const transferButtonStyle = {
  padding: "10px 15px",
  marginTop: "15px",
  background: "#1a73e8",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const connectButtonStyle = {
  padding: "10px 15px",
  marginTop: "15px",
  background: "#1a73e8",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};

const closeButtonStyle = {
  padding: "10px 15px",
  marginTop: "15px",
  background: "#1a73e8",
  color: "#fff",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
};
