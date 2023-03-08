import React, { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { addImage } from "../../api/ImageApi";
import { useNavigate } from "react-router-dom";

const ImageUploader = () => {
    const authContext = useContext(AuthContext);
    const [selectedImage, setSelectedImage] = useState(null);
    const navigate = useNavigate();


    function uploadToDB() {
        const uploadValues = {
            title: authContext.getUser().data.sub,
            image: selectedImage
        }
        addImage(authContext.getUser(), uploadValues).then(response => authContext.changeAvatarURL(response.data)).then(navigate("/profile"));
    }

    return (
        <div>
            <h1>Upload and Display Image usign React Hook's</h1>

            {selectedImage && (
                <div>
                    <img
                        alt="not found"
                        width={"250px"}
                        src={URL.createObjectURL(selectedImage)}
                    />
                    <br />
                    <button onClick={uploadToDB}>Upload As Profile Image</button>
                </div>
            )}

            <br />
            <br />

            <input
                type="file"
                name="myImage"
                onChange={(event) => {
                    setSelectedImage(event.target.files[0]);
                }}
                accept="image/*"
            />
        </div>
    )
}

export default ImageUploader;