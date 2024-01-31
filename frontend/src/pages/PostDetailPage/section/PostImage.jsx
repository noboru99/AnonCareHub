// import React from 'react'
import "./PostImage.scss";
import { useEffect, useState } from "react";
import ImageGallery from "react-image-gallery";
import PropTypes from "prop-types";
const PostImage = ({ post }) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    if (post?.images?.length > 0) {
      let images = [];
      post.images.map((imageName) => {
        return images.push({
          original: `${import.meta.env.VITE_SERVER_URL}/${imageName}`,
          thumbnail: `${import.meta.env.VITE_SERVER_URL}/${imageName}`,
        });
      });
      setImages(images);
    }
  }, [post]);

  return (
    <div className="image-section">
      <ImageGallery items={images} />
    </div>
  );
};

PostImage.propTypes = {
  post: PropTypes.shape({
    images: PropTypes.array.isRequired,
  }).isRequired,
};
export default PostImage;
