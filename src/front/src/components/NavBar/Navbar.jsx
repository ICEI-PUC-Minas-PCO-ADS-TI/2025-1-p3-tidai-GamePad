import React, { useState } from "react";
import "./Navbar.css";
import logo from "../../assets/icon.png";
import MobileNav from "../MobileNav/MobileNav";
import { Link } from "react-router-dom";


export const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(false);


  const toggleMenu = () => {
    setOpenMenu(!openMenu);
  };


  return (
    <>
      <MobileNav isOpen={openMenu} toggleMenu={toggleMenu} />

      <nav className="nav-wrapper">
        <div className="nav-content">
          <Link to="/">
            <img src={logo} alt="Logo" className="logo" />
          </Link>

          <ul>
            <li>
              <Link to="/" className="menu-item">
                Home
              </Link>
            </li>
            <li>
              <Link to="/" className="menu-item">
                Games
              </Link>
            </li>
            <li>
              <Link to="/" className="menu-item">
                Notícias
              </Link>
            </li>
            <li>
              <Link to="/" className="menu-item">
                Comunidade
              </Link>
            </li>

            <button className="login-btn">
                <Link to="/login" className="menu-item">
                  Login
                </Link>
              </button>

            
          </ul>

           
          
          

          <button className="menu-btn" onClick={toggleMenu}>
            <span
              className={"material-symbols-outlined"}
              style={{ fontSize: "1.8rem" }}
            >
              {openMenu ? "close" : "menu"}
            </span>
          </button>
        </div>
      </nav>
    </>
  );
};
