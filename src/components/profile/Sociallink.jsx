import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";

const Sociallink = () => {
  const [editingSection, setEditingSection] = useState(null);

  const [socialLinks, setSocialLinks] = useState({
    linkedin: "https://linkedin.com/in/johndoe",
    facebook: "https://facebook.com/johndoe",
    twitter: "https://twitter.com/johndoe",
  });

  const handleToggleEditing = (section) => {
    setEditingSection(editingSection === section ? null : section);
  };

  const handleSocialLinksChange = (e) => {
    const { name, value } = e.target;
    setSocialLinks({ ...socialLinks, [name]: value });
  };

  return (
    <>
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
    </>
  );
};

export default Sociallink;
