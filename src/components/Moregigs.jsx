import React from "react";
import person from "../assets/address.jpg";
import { Link } from "react-router-dom";

const gigsData = [
  {
    id: 1,
    logo: person,
    title: "Junior Frontend Developer",
    assigner: "John Doe",
    description: "Promoting memecoin, crypto social media & investment sites",
    tags: ["React", "JavaScript", "HTML/CSS"],
    price: "$1200",
    rating: "★★★★☆",
  },
  {
    id: 2,
    logo: person,
    title: "Backend Developer",
    assigner: "Jane Smith",
    description: "Promoting memecoin, crypto social media & investment sites",
    tags: ["Node.js", "API", "MongoDB"],
    price: "$2500",
    rating: "★★★★☆",
  },
  {
    id: 3,
    logo: person,
    title: "Junior Frontend Developer",
    assigner: "John Doe",
    description: "Promoting memecoin, crypto social media & investment sites",
    tags: ["React", "JavaScript", "HTML/CSS"],
    price: "$1200",
    rating: "★★★★☆",
  },

  // Add more gigs as needed
];

const Moregigs = () => {
  return (
    <div className="giginfo">
      <div className="gig-job-header">
        <h3 className="gig-job-sitename">New Gigs</h3>
        <a href="#" className="gig-job-show-all">
          Show all gig jobs
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M8.5 4.5a.5.5 0 0 1 .5.5v3H12a.5.5 0 0 1 0 1H9v3a.5.5 0 0 1-.8.4l-5-4a.5.5 0 0 1 0-.8l5-4a.5.5 0 0 1 .8.4z"
            />
          </svg>
        </a>
      </div>
      <div className="gig-job-list">
        {gigsData.map((gig) => (
          <div className="gig-job-card" key={gig.id}>
            <Link to="/dashboard/gigdetails">
              <div className="gig-job-card-body">
                <img
                  src={gig.logo}
                  alt="Company Logo"
                  className="gig-job-company-logo"
                />
                <div className="gig-job-details">
                  <h4 className="gig-job-title">{gig.title}</h4>
                  <p className="gig-job-task-assigner">{gig.assigner}</p>
                  <p className="gig-job-description">{gig.description}</p>
                  <div className="gig-job-tags">
                    {gig.tags.map((tag, index) => (
                      <span key={index}>{tag}</span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="gig-job-card-footer">
                <span className="gig-job-price">{gig.price}</span>
                <button className="freelance-more-info-btn">More Info</button>
              </div>
              <div className="gig-job-rating">{gig.rating}</div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Moregigs;
