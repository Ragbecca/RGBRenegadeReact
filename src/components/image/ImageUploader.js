import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { addImage } from "../../api/ImageApi";
import { useNavigate } from "react-router-dom";
import "./ImageUploader.css";

const ImageUploader = () => {
  const authContext = useContext(AuthContext);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  function uploadToDB() {
    const uploadValues = {
      title: authContext.getUser().data.sub,
      image: selectedImage,
    };
    addImage(authContext.getUser(), uploadValues)
      .then((response) => authContext.changeAvatarURL(response.data))
      .then(navigate("/profile"));
  }

  return (
    <div className="app-body-uploader">
      <div className="app-body-uploader-inner">
        <h1>Upload a profile image</h1>
        <div className="uploader-image-height">
          {selectedImage && (
            <div className="uploader-image">
              <img
                alt="not found"
                width={"250px"}
                src={URL.createObjectURL(selectedImage)}
                className="uploader-image-src"
              />
              <br />
              <button onClick={uploadToDB} className="uploader-image-accept">
                Upload As Profile Image
              </button>
            </div>
          )}
        </div>
        <input
          type="file"
          name="myImage"
          className="uploader"
          onChange={(event) => {
            setSelectedImage(event.target.files[0]);
          }}
          accept="image/*"
        />
      </div>
    </div>
  );
};

export default ImageUploader;
