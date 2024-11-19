import React, { useState } from "react";
import { FaEdit, FaPlus, FaFileAlt } from "react-icons/fa";

const Fulltimeprofile = () => {
  const [editingSection, setEditingSection] = useState(null);
  const [employmentInfo, setEmploymentInfo] = useState({
    position: "",
    experience: "",
    cvFile: null,
  });

  const [contactInfo, setContactInfo] = useState({
    email: "",
    linkedin: "",
    github: "",
  });

  const handleToggleEditing = (section) => {
    setEditingSection(editingSection === section ? null : section);
  };

  const handleEmploymentInfoChange = (e) => {
    const { name, value } = e.target;
    setEmploymentInfo({ ...employmentInfo, [name]: value });
  };

  const handleFileChange = (e) => {
    setEmploymentInfo({ ...employmentInfo, cvFile: e.target.files[0] });
  };

  const handleContactInfoChange = (e) => {
    const { name, value } = e.target;
    setContactInfo({ ...contactInfo, [name]: value });
  };

  return (
    <div className="profile container">
      {/* Full-time Employment Section */}
      <div className="card section">
        <div
          style={{ background: "goldenrod", color: "black" }}
          className="card-header d-flex justify-content-between align-items-center"
        >
          <h2>Full-time Employment Info</h2>
          <button
            type="button"
            className="usbutton"
            onClick={() => handleToggleEditing("employmentInfo")}
          >
            <FaEdit />
          </button>
        </div>
        <div className="card-body">
          <br />
          {editingSection === "employmentInfo" ? (
            <div className="section-content editing">
              <div className="row">
                <div className="col-md-6">
                  <div className="form-group">
                    <label style={{ color: "whitesmoke" }}>Position</label>
                    <input
                      type="text"
                      name="position"
                      value={employmentInfo.position}
                      onChange={handleEmploymentInfoChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label style={{ color: "whitesmoke" }}>
                      Years of Experience
                    </label>
                    <input
                      type="number"
                      name="experience"
                      value={employmentInfo.experience}
                      onChange={handleEmploymentInfoChange}
                      className="form-control"
                    />
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label style={{ color: "whitesmoke" }}>CV File</label>
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleToggleEditing("employmentInfo")}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="usbutton"
                  onClick={() => handleToggleEditing("employmentInfo")}
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="section-content">
              <div className="row">
                <div className="col-md-6">
                  <p>
                    <strong>Position:</strong> {employmentInfo.position}
                  </p>
                </div>
                <div className="col-md-6">
                  <p>
                    <strong>Years of Experience:</strong>{" "}
                    {employmentInfo.experience}
                  </p>
                </div>
                <div className="col-md-12">
                  <div className="file-list">
                    {employmentInfo.cvFile && (
                      <div className="file-item">
                        <FaFileAlt className="file-icon" />
                        <p className="filetag-name">
                          {employmentInfo.cvFile.name}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Contact Section */}
      <div className="card section">
        <div
          style={{ background: "goldenrod", color: "black" }}
          className="card-header d-flex justify-content-between align-items-center"
        >
          <h2>Contact Info</h2>
          <button
            type="button"
            className="usbutton"
            onClick={() => handleToggleEditing("contactInfo")}
          >
            <FaEdit />
          </button>
        </div>
        <div className="card-body">
          <br />
          {editingSection === "contactInfo" ? (
            <div className="section-content editing">
              <div className="form-group">
                <label style={{ color: "whitesmoke" }}>Email</label>
                <input
                  type="email"
                  name="email"
                  value={contactInfo.email}
                  onChange={handleContactInfoChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label style={{ color: "whitesmoke" }}>LinkedIn</label>
                <input
                  type="url"
                  name="linkedin"
                  value={contactInfo.linkedin}
                  onChange={handleContactInfoChange}
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label style={{ color: "whitesmoke" }}>GitHub</label>
                <input
                  type="url"
                  name="github"
                  value={contactInfo.github}
                  onChange={handleContactInfoChange}
                  className="form-control"
                />
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleToggleEditing("contactInfo")}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="usbutton"
                  onClick={() => handleToggleEditing("contactInfo")}
                >
                  Save Changes
                </button>
              </div>
            </div>
          ) : (
            <div className="section-content">
              <p>
                <strong>Email:</strong> {contactInfo.email}
              </p>
              <p>
                <strong>LinkedIn:</strong>{" "}
                <a
                  href={contactInfo.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contactInfo.linkedin}
                </a>
              </p>
              <p>
                <strong>GitHub:</strong>{" "}
                <a
                  href={contactInfo.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {contactInfo.github}
                </a>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Fulltimeprofile;
