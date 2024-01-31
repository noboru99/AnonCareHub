// import React from 'react'
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import axiosInstance from "../../../utils/axios";
import "../styles/ListCategory.scss";
const Categories = ({ onCategoryChange }) => {
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axiosInstance.get("/categories");

      setCategories(["all", ...response.data]);
    } catch (error) {
      console.log(error);
    }
  };
  const [categories, setCategories] = useState([]);

  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryChange = (e) => {
    const selectedValue = e.target.value;
    setSelectedCategory(selectedValue);
    onCategoryChange(selectedValue);
  };
  return (
    <div className="categories">
      {categories.map((category) => (
        <label htmlFor="category" key={category} className="category-item">
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
  );
};
Categories.propTypes = {
  onCategoryChange: PropTypes.func.isRequired,
};

export default Categories;
