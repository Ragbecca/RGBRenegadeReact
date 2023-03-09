import React, { useContext, useEffect, useState } from "react";
import { getImage } from "../../../api/ImageApi";
import AuthContext from "../../../context/AuthContext";
import "./Profile.css";

const Profile = () => {
  const authContext = useContext(AuthContext);

  const [isLoading, setLoading] = useState(true);
  const [localImage, setLocalImage] = useState(null);

  useEffect(() => {
    if (authContext.getUser() == null) {
      return;
    }
    if (
      authContext.getUser().imgUrl != null &&
      authContext.getUser().imgUrl.includes("http://localhost:8080")
    ) {
      const replacedImageUrl = authContext
        .getUser()
        .imgUrl.replace("http://localhost:8080/api/image/get/", "");
      getImage(replacedImageUrl, authContext.getUser()).then((response) =>
        setLocalImage(response.data)
      );
    }
    setLoading(false);
  }, [authContext.user]);

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

  return (
    <div className="app-body-profile">
      <div className="profile-container">
        <div className="container">
          <div className="profile-info">
            <div className="profile-avatar">
              {authContext.getUser().imgUrl ? (
                <img
                  src={`data:image/jpeg;base64,${localImage}`}
                  alt={authContext.getUser().name}
                />
              ) : (
                <div className="text-avatar">
                  <span>
                    {authContext.getUser().name &&
                      authContext.getUser().name[0]}
                  </span>
                </div>
              )}
            </div>
            <div className="profile-name">
              <h2>{authContext.getUser().name}</h2>
              <p className="profile-email">{authContext.getUser().username}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
