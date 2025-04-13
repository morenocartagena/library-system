import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/NavBar.css';

const NavBar: React.FC = () => {
  useEffect(() => {
    const currentRoute: string = sessionStorage.getItem('currentRoute') || 'Home';
    console.log(`Route retrieved from sessionStorage: ${currentRoute}`);
  }, []);

  const handleNavigation = (route: string): void => {
    sessionStorage.setItem('currentRoute', route);
    console.log(`Route saved in sessionStorage: ${route}`);
  };

  return (
    <nav className="navbar">
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/home" className="navbar-link" onClick={() => handleNavigation('Home')}>
            Home
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/checkouts" className="navbar-link" onClick={() => handleNavigation('Checkouts')}>
            Checkouts
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/my-checkouts" className="navbar-link" onClick={() => handleNavigation('My Checkouts')}>
            My Checkouts
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/add-user" className="navbar-link" onClick={() => handleNavigation('Add User')}>
            Add User
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/add-book" className="navbar-link" onClick={() => handleNavigation('Add Book')}>
            Add Book
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/logout" className="navbar-link" onClick={() => handleNavigation('Logout')}>
            Logout
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
