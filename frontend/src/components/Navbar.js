import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="navbar navbar-expand navbar-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          🍣 Sushi Bar
        </Link>

        <div className="ms-auto d-flex align-items-center gap-3">
          {user ? (
            <>
              <span>👤 {user.username}</span>
              <button className="btn btn-outline-light btn-sm" onClick={logout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light btn-sm">
                Login
              </Link>
              <Link to="/register" className="btn btn-danger btn-sm">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}