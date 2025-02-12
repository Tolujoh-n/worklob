import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import person from "../../assets/address.jpg";

const Personalinfo = () => {
  const [editingSection, setEditingSection] = useState(null);

  const [personalInfo, setPersonalInfo] = useState({
    name: "John Doe",
    website: "https://johndoe.com",
    country: "USA",
    bio: "A passionate developer",
    skills: ["JavaScript", "React", "Node.js"],
    profileImage: person,
  });

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfo({ ...personalInfo, [name]: value });
  };

  const handleToggleEditing = (section) => {
    setEditingSection(editingSection === section ? null : section);
  };

  return (
    <>
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
    </>
  );
};

export default Personalinfo;
