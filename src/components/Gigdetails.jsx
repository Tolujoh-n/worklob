import React, { useEffect, useState } from "react";
import xp from "../assets/img/xp.jpg";
import useimage from "../assets/address.jpg";
import Moregigs from "./Moregigs";
import Gigdetailsmodal from "./Gigdetailsmodal";
import Buygigmodal from "./Buygigmodal";
import { FaFacebook, FaTwitter, FaTelegram, FaLinkedin } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const Hiring = [
  { id: 1, title: "Tolujohn Bob", jobs: "1" },
  { id: 2, title: "Fabrre don", jobs: "6" },
  { id: 3, title: "Naccy colen", jobs: "3" },
  { id: 4, title: "Petter collin", jobs: "5" },
  { id: 5, title: "Rugberbs", jobs: "2" },
];

const Gigdetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [jobs, setJobs] = useState(null);
  const [loading, setLoading] = useState(true);
  const { jobId } = useParams();



  const openBuyModal = () => setIsBuyModalOpen(true);
  const closeBuyModal = () => setIsBuyModalOpen(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);


  const token=localStorage.getItem('token',)

  const user = JSON.parse(localStorage.getItem('user'));
  // console.log(user)
  let applicantId
  if (token) {
    const decodedToken = jwtDecode(token);
    applicantId = decodedToken.userId;
    // console.log(userId);
  }

  const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080";

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          `${API_URL}/api/v1/jobs/jobdetails/${jobId}`
        );
        setJobs(response.data);
        console.log("Fetched job details:", response.data);
      } catch (error) {
        console.error("Error fetching job details:", error);
        setJobs(null);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, [API_URL, jobId]);

  if (loading) {
    return <div>Loading job details...</div>;
  }

  if (!jobs) {
    return <div>Error: Job not found</div>;
  }

  return (
    <div className="giginfo gig-details-container row">
      <div className="col-lg-8 gig-info">
        <div className="gig-info-header d-flex align-items-center">
          <img src={xp} alt="Gig" className="gig-image" />
          <div className="gig-info-text">
            <h2 className="gig-name">{jobs.postedBy.username}</h2>
            <div className="gig-rating">Rating: ★★★★☆</div>
          </div>
        </div>
        <h3 className="gig-title">{jobs.jobTitle}</h3>
        <p style={{ color: "whitesmoke" }} className="gig-description">
          {jobs.description}
        </p>
        <div className="job-tags">
          {jobs.selectedSkills.map((tag, index) => (
            <span key={index}>{tag}</span>
          ))}
        </div>
      </div>
      <div className="col-lg-4 gig-sidebar">

      {user?.role==='Talent'?(

        <div
          style={{ border: "1px solid whitesmoke" }}
          className="card info-card"
        >
          <div className="card-body">
            <h5 className="card-title"> $ {jobs.budget} {jobs.fixedCompensation}</h5>
            <p className="gig-balance">NEAR, USDT</p>

            <div className="gig-actions">
              <button
                style={{
                  borderRadius: "20px",
                  width: "100%",
                  marginBottom: "15px",
                }}
                className="sidebutton"
                onClick={openModal} 
              >
                Apply for this job
              </button>
              <button
                style={{ borderRadius: "20px", width: "100%" }}
                className="sidebutton"
              >
                Save for later
              </button>
            </div>

            <div className="gig-share">
              <p style={{ color: "whitesmoke" }}>Share this job:</p>
              <div className="share-container">
                <div className="social-icons">
                  <a href="#" className="icon facebook" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="icon twitter" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="icon telegram" aria-label="Telegram">
                    <i className="fab fa-telegram-plane"></i>
                  </a>
                  <a href="#" className="icon linkedin" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>

        ):(
          
        <div style={{ border: "1px solid whitesmoke" }} className="card">
          <div className="card-body">
            <h5 className="card-title">Terms of work:</h5>
            <p className="gig-balance">
              $ {jobs.budget} {jobs.fixedCompensation}
            </p>
            <p className="gig-balance">6 purchases</p>

            <div className="gig-actions">
              <button
                style={{
                  borderRadius: "20px",
                  width: "100%",
                  marginBottom: "15px",
                }}
                className="sidebutton"
                onClick={openBuyModal} // Open Buy modal on button click
              >
                Buy this gig
              </button>
              <button
                style={{ borderRadius: "20px", width: "100%" }}
                className="sidebutton"
              >
                Save for later
              </button>
            </div>

            <div className="gig-share">
              <p style={{ color: "whitesmoke" }}>Share this job:</p>
              <div className="share-container">
                <div className="social-icons">
                  <a href="#" className="icon facebook" aria-label="Facebook">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="icon twitter" aria-label="Twitter">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href="#" className="icon telegram" aria-label="Telegram">
                    <i className="fab fa-telegram-plane"></i>
                  </a>
                  <a href="#" className="icon linkedin" aria-label="LinkedIn">
                    <i className="fab fa-linkedin-in"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        )}

        {/* Top Hiring Managers */}
        <div className="card">
          <div className="card-body pb-0">
            <h5 className="card-title">Top Hiring Manager</h5>
            <div className="news">
              {Hiring.map((card) => (
                <div
                  key={card.id}
                  className="post-item clearfix"
                  style={{
                    borderBottom: "1px solid gray",
                    paddingBottom: "5px",
                  }}
                >
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <img
                        style={{ height: "60px", width: "60px" }}
                        src={useimage}
                        alt=""
                      />
                      <h4>
                        <a href="#">{card.title}</a>
                      </h4>
                      <span style={{ color: "#b1bad3", marginLeft: "10px" }}>
                        Jobs: {card.jobs}
                      </span>
                    </div>
                    <div>
                      <button className="usbutton">Follow</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* End sidebar recent posts */}
          </div>
        </div>
      </div>

      {/* More Gigs Section */}
      <div className="col-lg-12">
        <Moregigs />
      </div>

      <Gigdetailsmodal
       applicantId={applicantId}
       jobId={jobId}
        recruiterImage={xp}
        recruiterName={jobs.postedBy.username}
        jobTitle={jobs.jobTitle}
        isOpen={isModalOpen}
        onClose={closeModal}
      />

      {/* Buy gig Modal */}
      <Buygigmodal
       applicantId={applicantId}
       jobId={jobId}
        recruiterImage={xp}
        recruiterName={jobs.postedBy.username}
        jobTitle={jobs.jobTitle}
        isOpen={isBuyModalOpen}
        onClose={closeBuyModal}
      />
    </div>
  );
};

export default Gigdetails;
