// import React from 'react'
import "../styles/Post.scss";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
const Posts = ({ post, selectedCategory }) => {
  if (selectedCategory === "all") {
    return (
      <div className="post-item">
        <div className="post-top">
          <Link to={`/post/${post._id}`}>
            {post.title.length > 20
              ? `${post.title.slice(0, 20)}...`
              : post.title}
          </Link>
          <p className="tost-category">[{post.category}]</p>
        </div>
        <div className="post-bottom">
          <p className="post-name">{post.writer.name}</p>
          <p>|</p>
          <p className="post-age">{post.writer.age}</p>
          <p>|</p>
          <p className="post-isMale">{post.writer.isMale ? "男" : "女"}</p>
          <p>|</p>
          <p> view :0</p>
          <p>|</p>
          {/* <p>{post.date}</p> */}
        </div>
      </div>
    );
  } else if (selectedCategory === post.category) {
    return (
      <div className="post-item">
        <div className="post-top">
          <Link to={`/post/${post._id}`}>
            {post.title.length > 20
              ? `${post.title.slice(0, 20)}...`
              : post.title}
          </Link>
          <p className="tost-category">[{post.category}]</p>
        </div>
        <div className="post-bottom">
          <p className="post-name">{post.writer.name}</p>
          <p>|</p>
          <p className="post-age">{post.writer.age}</p>
          <p>|</p>
          <p className="post-isMale">{post.writer.isMale ? "男" : "女"}</p>
          <p>|</p>
          <p> view :0</p>
        </div>
      </div>
    );
  }
};

Posts.propTypes = {
  selectedCategory: PropTypes.shape.isRequired,
  post: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    writer: PropTypes.shape({
      name: PropTypes.string.isRequired,
      age: PropTypes.number.isRequired,
      isMale: PropTypes.bool.isRequired,
    }).isRequired,
    category: PropTypes.string.isRequired,
    // 여기에 다른 속성들도 필요에 따라 추가해주세요
  }).isRequired,
};
export default Posts;
