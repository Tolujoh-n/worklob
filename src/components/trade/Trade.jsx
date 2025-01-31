import React from "react";

const Trade = () => {
  return (
    <>
      <div className="pagetitle">
        <h1>Trade</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/dashboard/trade">Trade</a>
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

export default Trade;
