import React, { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { getImage } from "../../api/ImageApi";
import AuthContext from "../../context/AuthContext";
import "./Character.css";

const Character = () => {
  const authContext = useContext(AuthContext);

  const [isLoading, setLoading] = useState(false);

  function fix() {
    authContext.getRole();
  }

  if (isLoading) {
    return (
      <div className="app-body-profile">
        <div className="profile-container">
          <div className="container">
            <div className="profile-info">
              <div className="profile-avatar">Loading...</div>
              <div className="profile-name">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (authContext.userIsAdmin()) {
    return (
      <div className="app-body-character">
        <div className="character-container">
          <div className="container"></div>
          <div onClick={fix}>Create a character</div>
          <div onClick={fix}>Delete a character</div>
        </div>
      </div>
    );
  }

  return (
    <div className="app-body-character">
      <div className="character-container">
        <div className="container"></div>
        <div onClick={fix}>Create a character</div>
      </div>
    </div>
  );
};

export default Character;
