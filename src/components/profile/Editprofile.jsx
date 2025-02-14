import React, { useState } from "react";
import Personalinfo from "./Personalinfo";
import Workexperience from "./Workexperience";
import Education from "./Education";
import Sociallink from "./Sociallink";
import { jwtDecode } from "jwt-decode";

const EditProfile = () => {
  const token = localStorage.getItem("token");

  let userId;

  const user = JSON.parse(localStorage.getItem("user"));
  let userRole = user?.role;
  console.log("User Role:", userRole);
  console.log("User ID:", user);

  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.userId;
  }

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  return (
    <div className="gigprofile container">
      {/* Personal Information Section */}
      <Personalinfo />

      {/* Work Experience Section */}
      <Workexperience />

      {/* Education Section */}
      <Education />

      {/* Social Links Section */}
      <Sociallink />
    </div>
  );
};

export default EditProfile;
