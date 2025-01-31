import React from "react";

const Blogs = () => {
  return (
    <>
      <div className="pagetitle">
        <h1>Blogs</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item">
              <a href="/dashboard/blogs">Blogs</a>
            </li>
            <li className="breadcrumb-item active">Trending</li>
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

export default Blogs;
