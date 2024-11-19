import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/img/ngig-logo.png";
import near from "../assets/img/nearlogo.jpg";
import { Toaster, toast } from "sonner";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
    role: "",
  });
  const [roleSelected, setRoleSelected] = useState(false);
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setFormData({ ...formData, role });
    setRoleSelected(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.role) {
      toast.error("Please select your role!");
      return;
    }

    if (
      !formData.email ||
      !formData.username ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please fill all fields!");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post('http://localhost:8080/api/v1/user/signup', {
        username: formData.username,
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        role: formData.role,
      });

      if (response.status === 200) {
        localStorage.setItem('token', response.data.token);
        localStorage.setItem('user', JSON.stringify(response.data.user));
        toast.success('User registered successfully!');
        setTimeout(() => {
          navigate("/dashboard");

        }, 2000);
      }
    } catch (e) {
      if (e.response && e.response.data.errors) {
        e.response.data.errors.forEach((error) => {
          toast.error(error.message); 
        });
      } else if (e.response && e.response.data.msg) {
        toast.error(e.response.data.msg || "Error during registration");
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  return (
    <div>
      <div id="boxit">
        <div id="logodiv">
          <img id="logoimg" className="mx-auto" src={logo} alt="Logo" />
        </div>

        <div className="auth-box">
          <div>
            <h2>Register</h2>
          </div>

          {!roleSelected ? (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "space-around",
                margin: "20px 0",
              }}
            >
              {/* Customer Card */}
              <div onClick={() => handleRoleSelect("Customer")} id="role-reg">
                <span style={{ fontSize: "50px", marginBottom: "10px" }}>
                  👥
                </span>
                <div>
                  <h3>I’m a Customer</h3>
                  <p>I’m looking for talents who will do work for me</p>
                </div>
              </div>

              {/* Talent Card */}
              <div onClick={() => handleRoleSelect("Talent")} id="role-reg">
                <span style={{ fontSize: "50px", marginBottom: "10px" }}>
                  💼
                </span>
                <div>
                  <h3>I’m a Talent</h3>
                  <p>I’m looking for short-term or long-term jobs</p>
                </div>
              </div>
            </div>
          ) : (
            <>
              <form onSubmit={handleSubmit}>
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
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    value={formData.email}
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
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    placeholder="Confirm your password"
                    value={formData.confirmPassword}
                    onChange={handleInputChange}
                  />
                </div>
                <button id="optionbut" type="submit">
                  Sign Up
                </button>
              </form>

              <button id="connbtn" style={{ marginTop: "20px" }}>
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
            </>
          )}
          <p>
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </div>
        <Toaster />
      </div>
    </div>
  );
};

export default Register;
