// import React from 'react'
//로그인이 되어있지 아니하면 로그인 페이지로 보내기
import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
const ProtectedRoutes = ({ isAuth }) => {
  return isAuth ? <Outlet /> : <Navigate to={"/login"} />;
};

ProtectedRoutes.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};
export default ProtectedRoutes;
