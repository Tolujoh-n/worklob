import React, { useState } from "react";
import { FaEdit, FaPlus } from "react-icons/fa";

const Education = () => {
  const [editingSection, setEditingSection] = useState(null);

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

  const handleToggleEditing = (section) => {
    setEditingSection(editingSection === section ? null : section);
  };

  const handleEducationChange = (index, field, value) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setEducation(newEducation);
  };

  const addEducation = () => {
    setEducation([
      ...education,
      { institution: "", graduationYear: "", levelOfStudy: "", major: "" },
    ]);
  };

  return (
    <>
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
    </>
  );
};

export default Education;
