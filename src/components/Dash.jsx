import React, { useState } from "react";
import useImage from "../assets/address.jpg";
import { Link } from "react-router-dom";
import Modal from "./Modal"; // Assuming Modal is still required
import Notification from "./Notification";

const jobData = {
  active: [
    {
      id: 1,
      title: "Software Engineer",
      hrName: "John Doe",
      rating: 4.5,
      reviews: 120,
      jobType: "Full-time",
      datePosted: "17 Aug 2024, 1:11 AM",
      description:
        "Develop and maintain web applications using React Design user interfaces and improve user experience Design user interfaces and improve user experience.",
      amount: "$120,000/year",
    },
    {
      id: 2,
      title: "Product Manager",
      hrName: "Jane Smith",
      rating: 4.0,
      reviews: 85,
      jobType: "Remote",
      datePosted: "16 Aug 2024, 3:30 PM",
      description: "Lead product development and strategy.",
      amount: "$100,000/year",
    },
  ],
  draft: [
    {
      id: 3,
      title: "Data Scientist",
      hrName: "Alice Johnson",
      rating: 4.8,
      reviews: 150,
      jobType: "Part-time",
      datePosted: "15 Aug 2024, 9:45 AM",
      description: "Analyze data trends and build predictive models.",
      amount: "$90,000/year",
    },
  ],
  archive: [
    {
      id: 4,
      title: "UI/UX Designer",
      hrName: "Michael Brown",
      rating: 4.2,
      reviews: 60,
      jobType: "Full-time",
      datePosted: "14 Aug 2024, 11:00 AM",
      description: "Design user interfaces and improve user experience.",
      amount: "$80,000/year",
    },
  ],
};

const Dash = () => {
  const [selectedTab, setSelectedTab] = useState("active");

  return (
    <>
      <Notification />
      <div className="job-list">
        <div className="nav-toggle">
          <button
            className={selectedTab === "active" ? "active" : ""}
            onClick={() => setSelectedTab("active")}
          >
            Active
          </button>
          <button
            className={selectedTab === "draft" ? "active" : ""}
            onClick={() => setSelectedTab("draft")}
          >
            Draft
          </button>
          <button
            className={selectedTab === "archive" ? "active" : ""}
            onClick={() => setSelectedTab("archive")}
          >
            Archive
          </button>
        </div>

        <div className="row">
          {jobData[selectedTab].map((job) => (
            <div key={job.id} className="col-lg-12">
              <Link to="/dashboard/gigdetails">
                <div className="card job-card">
                  <div className="card-body">
                    <div className="d-flex flex-wrap justify-content-between align-items-start">
                      <div className="job-details">
                        <span className="badge job-type">{job.jobType}</span>
                        <h4>{job.title}</h4>
                        <p className="job-date">{job.datePosted}</p>
                      </div>
                      <div className="hr-info d-flex align-items-center">
                        <div className="pe-3 text-left">
                          <p className="hr-name">{job.hrName}</p>
                          <span className="rating">
                            {job.rating} stars ({job.reviews})
                          </span>
                          <div className="star-rating">
                            {"★".repeat(Math.floor(job.rating))}
                            {"☆".repeat(5 - Math.floor(job.rating))}
                          </div>
                        </div>
                        <img src={useImage} className="hr-image" alt="HR" />
                      </div>
                    </div>
                    <p className="job-description">{job.description}</p>
                    <div className="d-flex justify-content-between align-items-center mt-3">
                      <span className="job-amount">{job.amount}</span>
                      <button className="btn chat-button">
                        <i className="bi bi-chat"></i> Chat
                      </button>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="col-12">
        <div className="walletinfo-box card">
          <div className="d-flex justify-content-between align-items-center">
            {/* Wallet information section */}
            <div className="wallet-info" style={{ marginRight: "10px" }}>
              <h3 className="wallet-title">Wallet</h3>
              <h5 className="balance-label">Estimated Balance</h5>
              <h5 className="balance-label">Escrow Balance</h5>
            </div>

            {/* Wallet management section */}
            <div className="wallet-manage">
              <p className="manage-wallet">
                <i className="bi-wallet"></i> Manage Wallet
              </p>
              <h5 className="balance-amount">$00.0</h5>
              <h5 className="balance-amount">$00.0</h5>
            </div>
          </div>
          <br />

          <button className="walletbtn">
            <i className="bi bi-wallet"></i> Connect Wallet
          </button>
        </div>
      </div>
    </>
  );
};

export default Dash;
