import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link className="navbar-brand link text-primary" to="/">
            Home
          </Link>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse topNav navbar-collapse" id="navbarSupportedContent">
            {/* <ul className="navbar-nav mb-2 ml-3 mb-lg-0">
              <li className="nav-item">
                <Link className="link" to="/Profile">
                  Profile
                </Link>
              </li>
            </ul> */}
            <ul className="navbar-nav mb-2 ml-3 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link text-primary" to="/Profile">
                  PROFILE
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-primary" to="/Users">
                  USERS
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};
