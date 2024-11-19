import React, { useState } from "react";
import person from "../../assets/address.jpg";

import {
  FaEdit,
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaPlus,
} from "react-icons/fa";

const EditProfile = () => {
  const [editingSection, setEditingSection] = useState(null);
  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    website: "https://johndoe.com",
    country: "USA",
    bio: "A passionate developer",
    skills: ["JavaScript", "React", "Node.js"],
    profileImage: person,
  });
  const [workExperience, setWorkExperience] = useState([
    {
      company: "Company A",
      role: "Developer",
      years: "2019-2021",
      currentlyWorking: false,
      description: "",
    },
    {
      company: "Company B",
      role: "Designer",
      years: "2019-2021",
      currentlyWorking: false,
      description: "",
    },
  ]);
  const [education, setEducation] = useState([
    {
      institution: "University X",
      graduationYear: "2020",
      levelOfStudy: "Bachelor",
      major: "Computer Science",
    },
    {
      institution: "University udus",
      graduationYear: "2025",
      levelOfStudy: "Bachelor",
      major: "Computer Engineer",
    },
  ]);
  const [socialLinks, setSocialLinks] = useState({
    linkedin: "https://linkedin.com/in/johndoe",
    facebook: "https://facebook.com/johndoe",
    twitter: "https://twitter.com/johndoe",
  });

  const handleToggleEditing = (section) => {
    setEditingSection(editingSection === section ? null : section);
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleWorkExperienceChange = (index, field, value) => {
    const newWorkExperience = [...workExperience];
    newWorkExperience[index] = { ...newWorkExperience[index], [field]: value };
    setWorkExperience(newWorkExperience);
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEducation(newEducation);
  };

  const handleSocialLinksChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks({ ...socialLinks, [name]: value });
  };

  const addWorkExperience = () => {
    setWorkExperience([
      ...workExperience,
      {
        company: "",
        role: "",
        years: "",
        currentlyWorking: false,
        description: "",
      },
    ]);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { institution: "", graduationYear: "", levelOfStudy: "", major: "" },
    ]);
  };

  return (
    <div className="gigprofile container">
      {/* Personal Information Section */}
      <div className="card gigprofile-section">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2>Personal Information</h2>
          <button
            type="button"
            className="usbutton"
            onClick={() => handleToggleEditing("personalInfo")}
          >
            <FaEdit />
          </button>
        </div>
        <div className="card-body">
          {editingSection === "personalInfo" ? (
            <div className="gigprofile-section-content editing">
              <div className="gigprofile-profile-image">
                <img
                  src={personalInfo.profileImage}
                  alt="Profile"
                  className="profile-image"
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Name</label>
                    <input
                      type="text"
                      name="name"
                      value={personalInfo.name}
                      onChange={handlePersonalInfoChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Website</label>
                    <input
                      type="url"
                      name="website"
                      value={personalInfo.website}
                      onChange={handlePersonalInfoChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Country</label>
                    <input
                      type="text"
                      name="country"
                      value={personalInfo.country}
                      onChange={handlePersonalInfoChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Bio</label>
                    <textarea
                      name="bio"
                      value={personalInfo.bio}
                      onChange={handlePersonalInfoChange}
                      className="form-control"
                    />
                  </div>
                  <div className="form-group">
                    <label>Skills</label>
                    <input
                      type="text"
                      name="skills"
                      value={personalInfo.skills.join(", ")}
                      onChange={(e) =>
                        handlePersonalInfoChange({
                          target: {
                            name: "skills",
                            value: e.target.value
                              .split(",")
                              .map((skill) => skill.trim()),
                          },
                        })
                      }
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleToggleEditing("personalInfo")}
                  >
                    Cancel
                  </button>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    type="button"
                    className="usbutton"
                    onClick={() => handleToggleEditing("personalInfo")}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="gigprofile-section-content">
              <div className="gigprofile-profile-image">
                <img
                  src={personalInfo.profileImage}
                  alt="Profile"
                  className="profile-image"
                />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <div>
                    <p>
                      <strong>Name:</strong> {personalInfo.name}
                    </p>

                    <p>
                      <strong>Skills:</strong> {personalInfo.skills.join(", ")}
                    </p>
                  </div>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Website:</strong>{" "}
                    <a href={personalInfo.website}>{personalInfo.website}</a>
                    <br />
                    <strong>Country:</strong> {personalInfo.country}
                  </p>
                </div>
                <div className="col-md-12">
                  <p>
                    <strong>Bio:</strong> {personalInfo.bio}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Work Experience Section */}
      <div className="card gigprofile-section">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2>Work Experience</h2>
          <button
            type="button"
            className="usbutton"
            onClick={() => handleToggleEditing("workExperience")}
          >
            <FaEdit />
          </button>
        </div>
        <div className="card-body">
          {editingSection === "workExperience" ? (
            <div className="gigprofile-section-content editing">
              {workExperience.map((work, index) => (
                <div
                  style={{ borderBottom: "1px solid white" }}
                  key={index}
                  className="form-group"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Company</label>
                      <input
                        type="text"
                        value={work.company}
                        onChange={(e) =>
                          handleWorkExperienceChange(
                            index,
                            "company",
                            e.target.value
                          )
                        }
                        className="form-control"
                      />
                      <label>Role</label>
                      <input
                        type="text"
                        value={work.role}
                        onChange={(e) =>
                          handleWorkExperienceChange(
                            index,
                            "role",
                            e.target.value
                          )
                        }
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Years</label>
                      <input
                        type="text"
                        value={work.years}
                        onChange={(e) =>
                          handleWorkExperienceChange(
                            index,
                            "years",
                            e.target.value
                          )
                        }
                        className="form-control"
                      />
                      <label>Description</label>
                      <textarea
                        value={work.description}
                        onChange={(e) =>
                          handleWorkExperienceChange(
                            index,
                            "description",
                            e.target.value
                          )
                        }
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="form-check">
                    <input
                      type="checkbox"
                      checked={work.currentlyWorking}
                      onChange={(e) =>
                        handleWorkExperienceChange(
                          index,
                          "currentlyWorking",
                          e.target.checked
                        )
                      }
                      className="form-check-input"
                    />
                    <label className="form-check-label">
                      Currently Working
                    </label>
                  </div>
                </div>
              ))}

              <button
                type="button"
                className="usbutton"
                onClick={addWorkExperience}
              >
                <FaPlus /> Add Work Experience
              </button>
              <br />
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleToggleEditing("workExperience")}
                  >
                    Cancel
                  </button>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    type="button"
                    className="usbutton"
                    onClick={() => handleToggleEditing("workExperience")}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="gigprofile-section-content">
              <div className="work-experience row">
                {workExperience.map((work, index) => (
                  <div className="col-md-6" key={index}>
                    <div id="workparam">
                      <p>
                        <strong>Company:</strong> {work.company}
                      </p>
                      <p>
                        <strong>Role:</strong> {work.role}
                      </p>
                      <p>
                        <strong>Years:</strong> {work.years}
                      </p>
                      <p>
                        <strong>Description:</strong> {work.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                type="button"
                className="usbutton"
                onClick={() => handleToggleEditing("workExperience")}
              >
                <FaPlus /> Add Work Experience
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Education Section */}
      <div className="card gigprofile-section">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2>Education</h2>
          <button
            type="button"
            className="usbutton"
            onClick={() => handleToggleEditing("education")}
          >
            <FaEdit />
          </button>
        </div>
        <div className="card-body">
          {editingSection === "education" ? (
            <div className="gigprofile-section-content editing">
              {education.map((edu, index) => (
                <div
                  style={{ borderBottom: "1px solid white" }}
                  key={index}
                  className="form-group"
                >
                  <div className="row">
                    <div className="col-md-6">
                      <label>Institution</label>
                      <input
                        type="text"
                        value={edu.institution}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "institution",
                            e.target.value
                          )
                        }
                        className="form-control"
                      />
                      <label>Graduation Year</label>
                      <input
                        type="text"
                        value={edu.graduationYear}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "graduationYear",
                            e.target.value
                          )
                        }
                        className="form-control"
                      />
                    </div>
                    <div className="col-md-6">
                      <label>Level of Study</label>
                      <input
                        type="text"
                        value={edu.levelOfStudy}
                        onChange={(e) =>
                          handleEducationChange(
                            index,
                            "levelOfStudy",
                            e.target.value
                          )
                        }
                        className="form-control"
                      />
                      <label>Major</label>
                      <input
                        type="text"
                        value={edu.major}
                        onChange={(e) =>
                          handleEducationChange(index, "major", e.target.value)
                        }
                        className="form-control"
                      />
                    </div>
                  </div>
                  <br />
                </div>
              ))}
              <button type="button" className="usbutton" onClick={addEducation}>
                <FaPlus /> Add Education
              </button>
              <br />
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleToggleEditing("education")}
                  >
                    Cancel
                  </button>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    type="button"
                    className="usbutton"
                    onClick={() => handleToggleEditing("education")}
                  >
                    Save changes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="gigprofile-section-content">
              <div className="work-experience row">
                {education.map((edu, index) => (
                  <div className="col-md-6" key={index}>
                    <div id="workparam">
                      <p>
                        <strong>Institution:</strong> {edu.institution}
                      </p>
                      <p>
                        <strong>Graduation Year:</strong> {edu.graduationYear}
                      </p>
                      <p>
                        <strong>Level of Study:</strong> {edu.levelOfStudy}
                      </p>
                      <p>
                        <strong>Major:</strong> {edu.major}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <button
                type="button"
                className="usbutton"
                onClick={() => handleToggleEditing("education")}
              >
                <FaPlus /> Add Education
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Social Links Section */}
      <div className="card gigprofile-section">
        <div className="card-header d-flex justify-content-between align-items-center">
          <h2>Social Links</h2>
          <button
            type="button"
            className="usbutton"
            onClick={() => handleToggleEditing("socialLinks")}
          >
            <FaEdit />
          </button>
        </div>
        <div className="card-body">
          {editingSection === "socialLinks" ? (
            <div className="gigprofile-section-content editing">
              <div className="form-group">
                <label>LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={socialLinks.linkedin}
                  onChange={handleSocialLinksChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Facebook</label>
                <input
                  type="url"
                  name="facebook"
                  value={socialLinks.facebook}
                  onChange={handleSocialLinksChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>Twitter</label>
                <input
                  type="url"
                  name="twitter"
                  value={socialLinks.twitter}
                  onChange={handleSocialLinksChange}
                  className="form-control"
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <button
                    type="button"
                    className="btn btn-danger"
                    onClick={() => handleToggleEditing("socialLinks")}
                  >
                    Cancel
                  </button>
                </div>
                <div className="d-flex align-items-center">
                  <button
                    type="button"
                    className="usbutton"
                    onClick={() => handleToggleEditing("socialLinks")}
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="gigprofile-section-content">
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a href={socialLinks.linkedin}>{socialLinks.linkedin}</a>
              </p>
              <p>
                <strong>Facebook:</strong>{" "}
                <a href={socialLinks.facebook}>{socialLinks.facebook}</a>
              </p>
              <p>
                <strong>Twitter:</strong>{" "}
                <a href={socialLinks.twitter}>{socialLinks.twitter}</a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
