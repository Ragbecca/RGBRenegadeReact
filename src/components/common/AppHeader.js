import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../api/AuthApi";
import AuthContext from "../../context/AuthContext";
import "./AppHeader.css";

const AppHeader = () => {
  const authContext = useContext(AuthContext);
  const navigate = useNavigate();

  const [isLoggedIn, setLoggedIn] = useState(
    authContext.userIsAuthenticated(false)
  );

  function onLogout() {
    logout(authContext.getUser().data.sub).then(authContext.userLogout());
    toast("You have safely logged out.");
    navigate("/");
  }

  useEffect(() => {
    setLoggedIn(authContext.userIsAuthenticated(false));
  }, [authContext.user, authContext]);

  return (
    <div className="app-top-box">
      <header className="app-header">
        <div className="app-header-container">
          <div className="app-options-left">
            <nav className="app-nav-left">
              {isLoggedIn ? (
                <ul>
                  <li>
                    <NavLink to="/chat">Chat</NavLink>
                  </li>
                  <li>
                    <NavLink to="/character">Character</NavLink>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                  <li>
                    <NavLink to="/signup">Signup</NavLink>
                  </li>
                </ul>
              )}
            </nav>
          </div>
          <div className="app-branding">
            <Link to="/" className="app-title">
              RGB Renegade
            </Link>
          </div>
          <div className="app-options-right">
            <nav className="app-nav-right">
              {isLoggedIn ? (
                <ul>
                  <li>
                    <NavLink to="/profile">Profile</NavLink>
                  </li>
                  <li>
                    <a onClick={onLogout}>Logout</a>
                  </li>
                </ul>
              ) : (
                <ul>
                  <li>
                    <NavLink to="/signup">Signup</NavLink>
                  </li>
                  <li>
                    <NavLink to="/login">Login</NavLink>
                  </li>
                </ul>
              )}
            </nav>
          </div>
        </div>
      </header>
    </div>
  );
};

export default AppHeader;
