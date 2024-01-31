// import React from 'react'
// import { useState } from "react";
import "./style/MyBookMark.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBookmarkItems } from "../../../store/thunkFunctions";

const MyBookMark = () => {
  const userData = useSelector((state) => state.user?.userData);
  const bookmarkDetail = useSelector((state) => state.user?.bookmarkDetail);
  console.log("bookmarkDetail", bookmarkDetail);

  const dispatch = useDispatch();
  useEffect(() => {
    let bookmarkItemIds = [];

    if (userData?.bookmark && userData.bookmark.length > 0) {
      userData.bookmark.forEach((item) => {
        bookmarkItemIds.push(item.id);
      });

      const body = {
        bookmarkItemIds,
        userBookmark: userData.bookmark,
      };
      dispatch(getBookmarkItems(body));
    }
  }, [dispatch, userData]);

  return (
    <section className="bookmark-area">
      {bookmarkDetail?.length > 0 ? (
        bookmarkDetail.map((bookmarkItem) => (
          <div key={bookmarkItem._id} className="bookmark">
            <div className="bookmark-category">{bookmarkItem.category}</div>
            <div className="bookmark-title">{bookmarkItem.title}</div>
            <div className="bookmark-writer">{bookmarkItem.writer.name}</div>
          </div>
        ))
      ) : (
        <p>북마크가 비었습니다</p>
      )}
    </section>
  );
};

export default MyBookMark;
