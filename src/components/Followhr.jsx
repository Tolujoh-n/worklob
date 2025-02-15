import React from "react";
import useimage from "../assets/address.jpg";

const Hiring = [
  { id: 1, title: "Tolujohn Bob", jobs: "1" },
  { id: 2, title: "Fabrre don", jobs: "6" },
  { id: 3, title: "Naccy colen", jobs: "3" },
  { id: 4, title: "Petter collin", jobs: "5" },
  { id: 5, title: "Rugberbs", jobs: "2" },
];

const Followhr = () => {
  return (
    <>
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
    </>
  );
};

export default Followhr;
