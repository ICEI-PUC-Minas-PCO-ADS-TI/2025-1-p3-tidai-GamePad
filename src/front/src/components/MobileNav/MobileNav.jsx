import React from "react";
import "./MobileNav.css";
import { Link } from "react-router-dom";


const MobileNav = ({ isOpen, toggleMenu }) => {

  return (
    <>
      <div
        className={`mobile-menu ${isOpen ? "active" : ""}`}
        onClick={toggleMenu}
      >
        <div className="mobile-menu-container">
          <img className="logo" src="./assets/logo.png" alt="" />

          <ul>
            <li>
              <Link to="/" className="menu-item">
                Home
              </Link>
            </li>
            <li>
              <Link to="/etapas" className="menu-item">
                Etapas
              </Link>
            </li>
            <li>
              <Link to="/sobre" className="menu-item">
                Sobre
              </Link>
            </li>
            <li>
              <Link to="/container" className="menu-item">
                Container
              </Link>
            </li>

            <button className="login-btn">
                <Link to="/login" className="menu-item">
                  Login
                </Link>
              </button>

           
          </ul>
        </div>
      </div>
    </>
  );
};

export default MobileNav;
