import React, { useState, useEffect } from "react";
import { Link, useMatch } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/NavBar.css";

const NavBar: React.FC = () => {
  const { isAuthenticated, role } = useAuth();
  const [renderKey, setRenderKey] = useState(0); // Dummy state to force re-render

  // Check if the current route matches "/book-details/:id"
  const match = useMatch("/book-details/:id");

  useEffect(() => {
    // Update the dummy state whenever isAuthenticated changes to force a re-render
    setRenderKey((prev) => prev + 1);
  }, [isAuthenticated]);

  return (
    // Using renderKey as the key to force NavBar re-render when authentication changes
    <nav className="navbar" key={renderKey}>
      <ul className="navbar-menu">
        {!isAuthenticated ? (
          <li className="navbar-item">
            <Link to="/login" className="navbar-link">
              Login
            </Link>
          </li>
        ) : (
          <>
            <li className="navbar-item">
              <Link to="/home" className="navbar-link">
                Home
              </Link>
            </li>
            {/* Only show the 'Book Details' link if match exists and has a valid id */}
            {match && match.params.id && (
              <li className="navbar-item">
                <Link
                  to={`/book-details/${match.params.id}`}
                  className="navbar-link"
                >
                  Book Details
                </Link>
              </li>
            )}
            {role === "student" && (
              <li className="navbar-item">
                <Link to="/my-checkouts" className="navbar-link">
                  My Checkouts
                </Link>
              </li>
            )}
            {role === "librarian" && (
              <>
                <li className="navbar-item">
                  <Link to="/checkouts" className="navbar-link">
                    Checkouts
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/add-user" className="navbar-link">
                    Add User
                  </Link>
                </li>
                <li className="navbar-item">
                  <Link to="/add-book" className="navbar-link">
                    Add Book
                  </Link>
                </li>
              </>
            )}
            <li className="navbar-item">
              <Link to="/logout" className="navbar-link">
                Logout
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default NavBar;
