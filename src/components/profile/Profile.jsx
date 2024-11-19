import React, { useState } from "react";
import profile from "../../assets/address.jpg";
import { Link } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

function Profile({ user }) {

  const token=localStorage.getItem('token')
  const us=JSON.parse(localStorage.getItem('user'))

  let userName;

  if(token){
    const decodedToken=jwtDecode(token)
  }
  if(us && us.username){
    userName=us.username
  }
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
  const [portfolio, setPortfolio] = useState([
    {
      projectName: "Blinka Projevy",
      description: "sjdhv sdig ytdssjhg",
      files: ["goat.jpg", "portal.png"],
    },
    {
      projectName: "Oja app",
      description: "sk tdk uctcl ",
      files: ["git.zip"],
    },
  ]);
  return (
    <>
      <div className="col-lg-12">
        <section className="section profile">
          <div className="row">
            <div className="col-xl-12">
              <div className="card">
                <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                  <img src={profile} alt="Profile" className="rounded-circle" />
                  <h2>{userName}</h2>
                  {/* <h2>tolujohnofficial@gmail.com</h2> */}
                  <div className="social-links mt-2">
                    <a href="#" className="twitter" target="_blank">
                      <i className="bi bi-twitter"></i>
                    </a>
                    <a href="#" className="facebook" target="_blank">
                      <i className="bi bi-facebook"></i>
                    </a>
                    <a href="#" className="instagram" target="_blank">
                      <i className="bi bi-instagram"></i>
                    </a>
                    <a href="#" className="linkedin" target="_blank">
                      <i className="bi bi-linkedin"></i>
                    </a>
                  </div>
                  <p className="small fst-italic">
                    I'm an experienced full-stack blockchain developer with a
                    focus on frontend development, I'm eager to join teams,
                    contribute my expertise, and offer my skills to enhance its
                    success. I'd also love to be part of teams for hacks and any
                    collaborative opportunity.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-xl-12">
              {/* Work Experience Section */}
              <div className="card gigprofile-section">
                <div
                  style={{ background: "goldenrod", color: "black" }}
                  className="card-header d-flex justify-content-between align-items-center"
                >
                  <h2>Work Experience</h2>
                </div>
                <div className="card-body">
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
                  </div>
                </div>
              </div>

              {/* Education Section */}
              <div className="card gigprofile-section">
                <div
                  style={{ background: "goldenrod", color: "black" }}
                  className="card-header d-flex justify-content-between align-items-center"
                >
                  <h2>Education</h2>
                </div>
                <div className="card-body">
                  <div className="gigprofile-section-content">
                    <div className="work-experience row">
                      {education.map((edu, index) => (
                        <div className="col-md-6" key={index}>
                          <div id="workparam">
                            <p>
                              <strong>Institution:</strong> {edu.institution}
                            </p>
                            <p>
                              <strong>Graduation Year:</strong>{" "}
                              {edu.graduationYear}
                            </p>
                            <p>
                              <strong>Level of Study:</strong>{" "}
                              {edu.levelOfStudy}
                            </p>
                            <p>
                              <strong>Major:</strong> {edu.major}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Portfolio Section */}
              <div className="card gigprofile-section">
                <div
                  style={{ background: "goldenrod", color: "black" }}
                  className="card-header d-flex justify-content-between align-items-center"
                >
                  <h2>Portfolio</h2>
                </div>
                <br />
                <div className="card-body">
                  <div className="gigprofile-section-content">
                    <div className="portfolio-list row">
                      {portfolio.map((project, index) => (
                        <div className="col-md-6" key={index}>
                          <div
                            style={{
                              border: "1px solid white",
                              borderRadius: "10px",
                              padding: "10px",
                            }}
                            id="portfolio-item"
                          >
                            <p>
                              <strong>Project Name:</strong>{" "}
                              {project.projectName}
                            </p>
                            <p>
                              <strong>Description:</strong>{" "}
                              {project.description}
                            </p>
                            <div className="file-list">
                              {project.files.map((file, i) => (
                                <div key={i} className="file-item">
                                  <FaFileAlt className="file-icon" />
                                  <p
                                    style={{ color: "black" }}
                                    className="filetag-name"
                                  >
                                    {file.name}
                                  </p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default Profile;
