import React from 'react';
import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation({ token, user, onLogout }) {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          Gabriel Transportation
        </Link>
        <div className="navbar-menu">
          <Link to="/" className="nav-link">Home</Link>
          {!token ? (
            <>
              <Link to="/register" className="nav-link">Register</Link>
              <Link to="/login" className="nav-link">Login</Link>
            </>
          ) : (
            <>
              <Link to="/dashboard" className="nav-link">Dashboard</Link>
              <span className="nav-user">Welcome, {user?.full_name}</span>
              <button className="nav-logout" onClick={onLogout}>Logout</button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;