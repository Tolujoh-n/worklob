import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/ngig-logo.png";
import { Toaster, toast } from "sonner";
import near from "../assets/img/nearlogo.jpg";
import axios from "axios";

const Login = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    if (!formData.username || !formData.password) {
      toast.error("Please fill all fields!");
      return false;
    }
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }
    return true;
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true); 
    try {
      const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

      const response = await axios.post(`${API_URL}/api/v1/user/signin`, {
        username: formData.username,
        password: formData.password,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success("Login successful!");
        setTimeout(() => {
          navigate("/dashboard");
        }, 2000);
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
              <label htmlFor="username">Username</label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter your username"
                value={formData.username}
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
          <button id="connbtn">
            <img
              src={near}
              alt="Wallet"
              style={{
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                marginRight: "8px",
              }}
            />
            Connect Wallet
          </button>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default Login;
