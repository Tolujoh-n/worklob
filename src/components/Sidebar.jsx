import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import stx from "../assets/img/stacks.png";
import worklob from "../assets/img/worklob-logo-cp.png";
import useimage from "../assets/address.jpg";
import Modal from "./Modal";

const Hiring = [
  { id: 1, title: "Tolujohn Bob", jobs: "1" },
  { id: 2, title: "Fabrre don", jobs: "6" },
  { id: 3, title: "Naccy colen", jobs: "3" },
  { id: 4, title: "Petter collin", jobs: "5" },
  { id: 5, title: "Rugberbs", jobs: "2" },
];

const Sidebar = () => {
  const [isGamemodalOpen, setIsGamemodalOpen] = useState(false);
  const [stxBalance, setstxBalance] = useState("0");
  const [worklobBalance, setworklobBalance] = useState("0");

  const handleGamemodalClick = () => {
    setIsGamemodalOpen(true);
  };

  const handleCloseGamemodal = () => {
    setIsGamemodalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // claim
    handleCloseGamemodal();
  };

  return (
    <>
      <div className="col-lg-4">
        {/* Recent Activity */}
        <div className="card info-card revenue-card">
          <div className="card-body">
            <h5 className="card-title">Balance:</h5>
            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <img id="balance" src={stx} alt="" />
              </div>
              <div className="ps-3">
                <h6>{stxBalance} STX</h6>
              </div>
            </div>
            <hr />
            <div className="d-flex align-items-center">
              <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                <img id="balance" src={worklob} alt="" />
              </div>
              <div className="ps-3">
                <h6>{worklobBalance} LOB</h6>
              </div>
            </div>
          </div>
        </div>
        {/* End Recent Activity */}

        {/* News & Updates Traffic */}
        <div className="card">
          <div className="card-body pb-0">
            <h5 className="card-title">Top Hiring manager</h5>
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
                      <button
                        onClick={handleGamemodalClick}
                        className="usbutton"
                      >
                        Follow
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {/* End sidebar recent posts */}
          </div>
        </div>
        {/* End News & Updates */}
      </div>
      <>
        {/* Render the Gamemodal if isGamemodalOpen is true */}
        {isGamemodalOpen && (
          <Modal onClose={handleCloseGamemodal} onSubmit={handleSubmit} />
        )}
      </>
    </>
  );
};

export default Sidebar;
