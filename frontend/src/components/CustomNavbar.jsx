import React from 'react';
import './CustomNavbar.css';
import { Link } from 'react-router-dom';

const CustomNavbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h1 className="navbar-title">E-Catering</h1>
      </div>
      <div className="navbar-center">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/" className="nav-link">Contact Us</Link>
      </div>
      <div className="navbar-right">
        <Link to="/order" className="nav-link">Orders</Link>
      </div>
    </div>
  );
};

export default CustomNavbar;
