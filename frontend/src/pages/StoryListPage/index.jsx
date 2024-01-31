// import React from 'react'
import { useEffect, useState } from "react";
import "../../styles/StroyList.scss";
import SearchInput from "./section/SearchInput";
import Posts from "./section/Posts";
import axiosInstance from "../../utils/axios";
import Categories from "./section/Categories";
import { FaQuestionCircle } from "react-icons/fa";
//게시글들을 시간순으로 나열
// 게시글을 주제별로 나누기
//
const StroyListPage = () => {
  const limit = 10; //처음에 보여 줄 양
  const [posts, setPosts] = useState([]); //포스트 글을 담을 상태
  const [skip, setSkip] = useState(0);
  const [hasMore, setHasMore] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchData, setSearchData] = useState("");

  // const [filters, setFilters] = useState({
  //   continents: [],
  //   price: [],
  // });

  useEffect(() => {
    fetchPosts({ skip, limit });
  }, []);

  const fetchPosts = async ({
    skip,
    limit,
    loadMore = false,
    // filters = {},
    searchTerm = "",
  }) => {
    const params = {
      skip,
      limit,
      // filters,
      searchTerm,
      category: selectedCategory,
    };
    try {
      const response = await axiosInstance.get("/posts", { params: params });

      if (loadMore) {
        setPosts([...posts, ...response.data.posts]);
      } else {
        setPosts(response.data.posts);
      }

      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error(error);
    }
  };

  const handleCategoryChange = (selectedValue) => {
    setSelectedCategory(selectedValue);
    fetchPosts({ skip, limit });
  };
  const handleLoadMore = () => {
    const body = {
      skip: skip + limit,
      limit,
      loadMore: true,
      // filters,
    };
    fetchPosts(body);
    setSkip(skip + limit);
  };

  const handelSearchData = (value) => {
    setSearchData(value);
    console.log(searchData);
  };

  return (
    <section className="list-page">
      <div className="categories-area">
        <Categories onCategoryChange={handleCategoryChange} />
      </div>
      <div className="list-top">
        <div className="title">悩みリスト</div>
        <div className="search">
          <SearchInput onSearch={handelSearchData} />
        </div>
      </div>
      <div className="latest-recommended-section">
        <div>最新</div>
        <div>流行り順</div>
      </div>

      <div className="post-container">
        {/* 필터로 검색어의 공백이 아닌걸 확인 후 타이틀에 포함 되어있는지 확인 */}
        {posts
          .filter(
            (post) => !searchData.trim() || post.title.includes(searchData)
          )
          .map((post) => (
            <Posts
              post={post}
              key={post._id}
              selectedCategory={selectedCategory}
            />
          ))}
        {/* 에브리는 모드 참일때만 반환 엔드엔드로 참인 경우들만 나오게 */}
        {searchData.trim() &&
          posts.every((post) => !post.title.includes(searchData)) && (
            <div className="no-search">
              <div className="no-search-icon">
                <FaQuestionCircle />
              </div>
              <div className="no-search-text">検索の結果がありません。</div>
            </div>
          )}
      </div>

      {hasMore && <button onClick={handleLoadMore}>pageNation</button>}
    </section>
  );
};

export default StroyListPage;
