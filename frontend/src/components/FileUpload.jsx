// import React from "react";
import "../styles/FileUpload.scss";
import Dropzone from "react-dropzone";
import PropTypes from "prop-types";
import axiosInstance from "../utils/axios";

const FileUpload = ({ onImageChange, images }) => {
  const handleDrop = async (files) => {
    let formData = new FormData();

    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("file", files[0]);

    try {
      const response = await axiosInstance.post(
        "/posts/image",
        formData,
        config
      );

      onImageChange([...images, response.data.fileName]);

      console.log(response);
    } catch (error) {
      console.error("File upload error:", error);
    }
  };

  const handleDelete = (image) => {
    const currentIndex = images.indexOf(image);
    //이미지의 인덱스 번호
    let newImages = [...images];
    //원본을 복사
    newImages.splice(currentIndex, 1);
    onImageChange(newImages);
    //다시 넣어주기
  };

  return (
    <div className="post-image-wrap">
      <div className="upload-preview-container">
        {images.map((image) => (
          <div key={image} onClick={() => handleDelete(image)}>
            <img
              className="image-content"
              src={`${import.meta.env.VITE_SERVER_URL}/${image}`}
              alt={image}
            />
          </div>
        ))}
      </div>
      <Dropzone onDrop={handleDrop}>
        {({ getRootProps, getInputProps }) => (
          <section className="image-upload-section">
            <div {...getRootProps()}>
              <input {...getInputProps()} />
              <p className="click-btn">ここをクリック👆</p>
              {console.log(onImageChange)}
            </div>
          </section>
        )}
      </Dropzone>
    </div>
  );
};

FileUpload.propTypes = {
  onImageChange: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
};

export default FileUpload;
