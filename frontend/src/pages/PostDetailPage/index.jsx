// import React from 'react'
import { useEffect, useState } from "react";
import "../../styles/PostDetail.scss";
import { useParams } from "react-router-dom";
import axiosInstance from "../../utils/axios";
import PostImage from "./section/PostImage";
import { BsFillBookmarkStarFill } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { addToBookmark } from "../../store/thunkFunctions";
import DirectMessageForm from "./section/DirectMessageForm";
import Comment from "./section/Comment";

// 댓글을 입력하는 창
//댓글이 나오는 부분
//대댓글 부분을 입력하는 창
//대댓글 부분
const PostDetail = () => {
  const { postId } = useParams();
  // params.productId 객체로 들어있음
  const [post, setPost] = useState(null);
  const [bookmark, setBookmark] = useState(false);
  const userData = useSelector((state) => state.user?.userData);
  const userBookmarkData = userData.bookmark;
  const [emotion, setEmotion] = useState(null);

  useEffect(() => {
    for (let bookmarkPost of userBookmarkData) {
      if (bookmarkPost.id == postId) {
        return setBookmark(true);
      }
    }
  }, []);
  useEffect(() => {
    async function fetchPost() {
      try {
        const response = await axiosInstance.get(
          `/posts/${postId}?type=single`
        );
        console.log("postData", response);
        setPost(response.data[0]);
        setEmotion(response.data[0].emotionButtons);

        //이부분에서 댓글 목록들을 들고오도록
      } catch (error) {
        console.error(error);
      }
    }

    fetchPost();
  }, [postId]);

  const dispatch = useDispatch();

  const clickedBookmark = () => {
    setBookmark(!bookmark);
    dispatch(
      addToBookmark({
        postId: post._id,
        param: postId,
        clicked: !bookmark,
      })
    );
  };
  const handleEmotion = async (event) => {
    let clickedEmotion = event.target.value;

    const body = {
      clickedEmotion,
      postId: postId,
      userData: userData,
    };
    try {
      const response = await axiosInstance.post("/posts/plusToEmotion", body);
      console.log("emotionData", response.data);
      setEmotion(response.data.emotionButtons);
    } catch (error) {
      console.error(error);
    }
  };

  if (!post) return null;
  return (
    <section className="post-detail">
      <div className="post-detail-box">
        <div className="worry-board-title">
          <div className="board-title">悩み掲示板</div>
          <div className="bookmark-section">
            <button onClick={clickedBookmark}>
              {bookmark ? (
                <BsFillBookmarkStarFill className="clicked" />
              ) : (
                <BsFillBookmarkStarFill />
              )}
            </button>
          </div>
        </div>
        <div className="post-image-section">
          <PostImage post={post} />
        </div>
        <div className="worry-board-detail">
          <div className="post-detail-top">
            <div className="post-title">{post.title}</div>
            <div className="author-info">
              <span className="author-name">{post.writer.name}</span>
              <span>|</span>
              <span>{post.writer.age}代</span>
              <span>|</span>
              <span>{post.writer.isMale ? "男" : "女"}</span>
              <span className="post-views">view {post.views}</span>
              <span>|</span>
              <span className="post-date">{post.writer._id}</span>
            </div>
          </div>
          <div className="post-content">{post.content}</div>
          <div className="post-button">
            <div>
              <button value="like" onClick={handleEmotion}>
                👍
              </button>
              <span>{emotion.like.clicked}</span>
            </div>
            <div>
              <button value="sad" onClick={handleEmotion}>
                😭
              </button>
              <span>{emotion.sad.clicked}</span>
            </div>
            <div>
              <button value="excited" onClick={handleEmotion}>
                💪
              </button>
              <span>{emotion.excited.clicked}</span>
            </div>
          </div>
        </div>
      </div>
      <div>
        <DirectMessageForm post={post} />
      </div>
      {/* component */}
      <div>
        <Comment />
      </div>
    </section>
  );
};

export default PostDetail;
