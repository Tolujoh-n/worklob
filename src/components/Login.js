import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/worklob-logo-cp-no-bg.png";
import { Toaster, toast } from "sonner";
import stx from "../assets/img/stx-wallet.png";
import axios from "axios";
import { useWeb3 } from "../Web3Provider";

const Login = () => {
  const [formData, setFormData] = useState({
    usernameOrEmail: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const { connected, account, connectWallet } = useWeb3();
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically login when wallet is connected
    if (connected && account) {
      handleWalletLogin();
    }
  }, [connected, account]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.usernameOrEmail || !formData.password) {
      toast.error("Please fill all fields!");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  const handleWalletLogin = async () => {
    setLoading(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

      const response = await axios.post(`${API_URL}/api/v1/user/signin`, {
        walletAddress: account,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Login successful!");
        setTimeout(() => navigate("/dashboard"), 2000);
      } else if (response.status === 204) {
        toast.info("Wallet not registered. Redirecting to registration...");
        setTimeout(() => navigate("/wallet-register"), 2000);
      }
    } catch (error) {
      console.error("Wallet login error", error);
      toast.error("An error occurred during wallet login. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);
    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

      const response = await axios.post(`${API_URL}/api/v1/user/signin`, {
        usernameOrEmail: formData.usernameOrEmail,
        password: formData.password,
      });

      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        toast.success("Login successful!");
        setTimeout(() => navigate("/dashboard"), 2000);
      }
    } catch (error) {
      console.error("Login error", error);

      if (error.response) {
        const errorMsg = error.response.data.msg || "Invalid credentials!";
        toast.error(errorMsg);
      } else {
        toast.error("An error occurred. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div id="boxit">
        <div id="logodiv">
          <img id="logoimg" className="mx-auto" src={logo} alt="Logo" />
        </div>

        <div className="auth-box">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <Link to="/dashboard">
                <h2>Login</h2>
              </Link>
            </div>
            <div>
              <span style={{ color: "white" }}>Welcome back!</span>
            </div>
          </div>
          <div>
            <div className="form-group">
              <label htmlFor="usernameOrEmail">Username or Email</label>
              <input
                type="text"
                id="usernameOrEmail"
                name="usernameOrEmail"
                placeholder="Enter your username or email"
                value={formData.usernameOrEmail}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleInputChange}
              />
            </div>

            <button
              style={{ width: "100%" }}
              type="submit"
              id="optionbut"
              onClick={handleSubmit}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
          <p>
            Don't have an account? <Link to="/register">Register</Link>
          </p>
          <button
            onClick={connected ? handleWalletLogin : connectWallet}
            id="connbtn"
            disabled={loading}
          >
            <img
              src={stx}
              alt="Wallet"
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                marginRight: "8px",
              }}
            />
            {connected ? "Login with Wallet" : "Connect Wallet"}
          </button>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default Login;
