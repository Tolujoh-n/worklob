import React from "react";

const Staking = () => {
  return (
    <>
      <div className="pagetitle">
        <h1>Staking</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/dashboard/staking">Staking</a>
            </li>
            <li className="breadcrumb-item active">coins</li>
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

export default Staking;
