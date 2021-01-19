import React from 'react';
import { Link } from 'react-router-dom';

function Header (){
  return (
    <nav 
    className="navbar navbar-expand-lg 
    bg-dark
    justify-content-center
    navbar-dark
      navbar-light">
      <button 
        className="navbar-toggler"
        type="button" 
        data-toggle="collapse" 
        data-target="#navbarNav" 
        aria-controls="navbarNav" 
        aria-expanded="false" 
        aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div 
        className="collapse navbar-collapse" 
        id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link
                to="/"
                className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
            <Link to="/dashboard"
            className="nav-link">Log In</Link>
            </li>
          </ul>
      </div>
    </nav>
  );
}

export default Header;
