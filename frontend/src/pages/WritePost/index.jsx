// import React from 'react'
import { useEffect, useState } from "react";
import "../../styles/WritePost.scss";
// import categories from "../../utils/categories";
import { useSelector } from "react-redux";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import FileUpload from "../../components/FileUpload";
import { BsFillExclamationTriangleFill } from "react-icons/bs";
//글올리기 제목칸 내용칸 이미지칸 등록버튼
//글을 올리면 올린 글 배열에다 저장하기
//주의사항 알려주기
const WritePost = () => {
  const userData = useSelector((state) => state.user?.userData);
  //리덕스에있는 유저정보를 가져온다
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");

      setCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [post, setPost] = useState({
    category: "",
    title: "",
    content: "",
    images: [],
  });

  const navigate = useNavigate();
  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    setPost((prevState) => ({
      ...prevState,
      category: selectedValue,
    }));
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setPost((prevState) => ({
      ...prevState,
      [name]: value,
      //각 항목의 네임에 인풋의 값을 넣어주는 객체를 전 상태에다가 덮어씌우기
    }));
  };

  const handleImages = (newImages) => {
    setPost((prevState) => ({
      ...prevState,
      images: newImages,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const body = {
      writer: userData.id, //로그인된 사람의 ID
      ...post,
    };

    try {
      const res = await axiosInstance.post("/posts", body);
      // await axiosInstance.post("/users/activity");
      console.log(res);
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className="Write-post-wrap">
      {/* <h2 className="post-title">글올리기</h2> */}
      <div className="posting-Warning">
        <div className="Warning-icon">
          <BsFillExclamationTriangleFill />
        </div>
        <div className="Warning-text">
          電話番号、住所などの個人情報が明らかにならないように注意してください。
          <br />
          不適切な内容、写真などを投稿しないようお願いします。
          <br />
          清潔なAnonCareHub を作るためにご協力いただき、ありがとうございます。
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="categories">
          {categories.map((category) => (
            <label htmlFor="category" key={category}>
              <input
                type="radio"
                id="category"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={handleCategoryChange}
              />{" "}
              {category}
            </label>
          ))}
        </div>
        <div className="post-title">
          {/* <label htmlFor="title">タイトル</label> */}
          <input
            name="title"
            id="title"
            onChange={handleChange}
            value={post.title}
            placeholder="タイトルを入力してください"
          />
        </div>

        <FileUpload images={post.images} onImageChange={handleImages} />

        <div className="post-content">
          <label htmlFor="content">悩みの内容を詳しく教えてください</label>
          <textarea
            name="content"
            id="content"
            onChange={handleChange}
            value={post.content}
          />
        </div>
        <div className="button-area">
          <button type="submit">投稿する</button>
        </div>
      </form>
      {/**등록이 완료되었습니다 띄어주기 */}
    </section>
  );
};

export default WritePost;
