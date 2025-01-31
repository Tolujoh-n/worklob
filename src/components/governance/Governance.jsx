import React from "react";

const Governance = () => {
  return (
    <>
      <div className="pagetitle">
        <h1>Governance</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/dashboard/governance">Governance</a>
            </li>
            <li className="breadcrumb-item active">Vote</li>
          </ol>
        </nav>
      </div>

      {/* Full-screen Centered Big Card */}
      <div className="d-flex justify-content-center align-items-center vh-60">
        <div className="wallet-card d-flex justify-content-center align-items-center">
          <h1 className="display-1 fw-bold">Coming Soon</h1>
        </div>
      </div>
    </>
  );
};

export default Governance;
