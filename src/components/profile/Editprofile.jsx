import React, { useState } from "react";
import Personalinfo from "./Personalinfo";
import Workexperience from "./Workexperience";
import Education from "./Education";
import Sociallink from "./Sociallink";

const EditProfile = () => {
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
