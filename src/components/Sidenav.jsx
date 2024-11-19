import { jwtDecode } from "jwt-decode";
import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

const Sidenav = ({ activeLink, setActive }) => {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  let userId;
  let userRole;

  if (token) {
    const decodedToken = jwtDecode(token);
    userId = decodedToken.userId;
    // console.log(userId);
  }

  if (user && user.role) {
    userRole = user.role;
    // console.log(userRole);
  }

  const gigcategory = [
    { id: 1, path: "freelance", name: "Freelance Jobs", icon: "bi-briefcase" },
    {
      id: 2,
      path: "fulltimejob",
      name: "Full-time Jobs",
      icon: "bi-briefcase-fill",
    },
    { id: 3, path: "mygigs", name: "My Gigs", icon: "bi-clipboard-check" },
    {
      id: 4,
      path: "myfreelance",
      name: "My Freelance Jobs",
      icon: "bi-briefcase",
    },
    {
      id: 5,
      path: "myfulltime",
      name: "My Full-time Jobs",
      icon: "bi-briefcase-fill",
    },
  ];

  const customercategory = [
    { id: 1, path: "browsegigs", name: "Browse Gigs", icon: "bi-briefcase" },
    { id: 2, path: "cusgigs", name: "My Gigs", icon: "bi-clipboard-check" },
    {
      id: 3,
      path: "cusfreelance",
      name: "My Freelance Jobs",
      icon: "bi-briefcase",
    },
    {
      id: 4,
      path: "cusfulltime",
      name: "My Full-time Jobs",
      icon: "bi-briefcase-fill",
    },
  ];

  const userlist = [
    { id: 1, path: "referrals", name: "Referrals", icon: "bi-people" },
    { id: 2, path: "settings", name: "Settings", icon: "bi-gear" },
  ];

  const location = useLocation();

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname, setActive]);

  const isActive = (path) => {
    return activeLink === path;
  };

  return (
    <aside id="sidebar" className={`sidebar ml-[300px]`}>
      {userRole === "Talent" && (
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link className="nav-link gap-1 collapsed" to="/dashboard">
              <i className="bi bi-house"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          {gigcategory.map((gignav) => (
            <li key={gignav.id} className="nav-item">
              <Link
                className={`nav-link gap-1 collapsed ${
                  isActive(`/dashboard/${gignav.path.toLowerCase()}`)
                    ? "active"
                    : ""
                }`}
                to={`/dashboard/${gignav.path.toLowerCase()}`}
              >
                <i className={`bi ${gignav.icon}`}></i>
                <span>{gignav.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      {userRole === "Customer" && (
        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <Link
              className="nav-link gap-1 collapsed"
              to="/dashboard/customerdash"
            >
              <i className="bi bi-house"></i>
              <span>Dashboard</span>
            </Link>
          </li>
          {customercategory.map((customer) => (
            <li key={customer.id} className="nav-item">
              <Link
                className={`nav-link gap-1 collapsed ${
                  isActive(`/dashboard/${customer.path.toLowerCase()}`)
                    ? "active"
                    : ""
                }`}
                to={`/dashboard/${customer.path.toLowerCase()}`}
              >
                <i className={`bi ${customer.icon}`}></i>
                <span>{customer.name}</span>
              </Link>
            </li>
          ))}
        </ul>
      )}

      <br />

      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <Link className="nav-link gap-1 collapsed" to="/dashboard/wallet">
            <i className="bi bi-wallet"></i>
            <span>Wallet</span>
          </Link>
        </li>
        <li className="nav-item">
          <a
            className="nav-link gap-1 collapsed"
            href="https://dev.near.org/astraplusplus.ndctools.near/widget/home?tab=proposals&daoId=neargigs.sputnik-dao.near&page=dao"
            target="_blank"
          >
            <i className="bi bi-bank"></i>
            <span>Governance</span>
          </a>
        </li>
        {userlist.map((user) => (
          <li key={user.id} className="nav-item">
            <Link
              className={`nav-link scrollto ${
                isActive(`/dashboard/${user.path.toLowerCase()}`)
                  ? "active"
                  : ""
              }`}
              onClick={() => setActive(`/${user.name.toLowerCase()}`)}
              to={`/dashboard/${user.path.toLowerCase()}`}
            >
              <i className={`bi ${user.icon}`}></i>
              <span>{user.name}</span>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidenav;
