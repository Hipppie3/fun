import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css'; // Import the CSS file

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className="nav-link home-link">
          HOME
        </NavLink>
      </div>
      <div className={`navbar-links ${isOpen ? 'open' : ''}`}>
        <NavLink to="/food" className="nav-link">
          FOOD
        </NavLink>
        <NavLink to="/entertainment" className="nav-link">
          ENTERTAINMENT
        </NavLink>
      </div>
      <button className="hamburger" onClick={toggleMenu}>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
        <span className="hamburger-line"></span>
      </button>
    </nav>
  );
}

export default Navbar;
