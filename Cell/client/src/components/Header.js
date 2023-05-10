import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { logout } from "../modules/authManager";

export default function Header({ isLoggedIn, userProfile }) {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);

  return (
    <div>
      <nav className="navbar navbar-dark bg-dark navbar-expand-md">
        <div className="container-fluid">
          <a className="navbar-brand" href="/">
            CELL
          </a>
          <button className="navbar-toggler" type="button" onClick={toggle}>
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
            <ul className="navbar-nav me-auto mb-2 mb-md-0">
              {isLoggedIn && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      exact
                      to="/userGames"
                    >
                      My Games
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="https://www.youtube.com/watch?v=Kk2MH9O4pXY"
                      target="_new"
                    >
                      About
                    </a>
                  </li>
                </>
              )}
              {!isLoggedIn && (
                <>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      activeClassName="active"
                      exact
                      to="/login"
                    >
                      Login
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink
                      className="nav-link"
                      activeClassName="active"
                      exact
                      to="/register"
                    >
                      Register
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      href="https://www.youtube.com/watch?v=Kk2MH9O4pXY"
                      target="_new"
                    >
                      About
                    </a>
                  </li>
                </>
              )}
            </ul>
            <ul className="navbar-nav">
              {userProfile && (
                <>
                  <li className="nav-item">
                    <span className="nav-link">
                      Welcome, {userProfile.fullName}!
                    </span>
                  </li>
                  <li className="nav-item">
                    <a
                      className="nav-link"
                      style={{ cursor: "pointer" }}
                      onClick={logout}
                    >
                      Logout
                    </a>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
