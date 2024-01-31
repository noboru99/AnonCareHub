import { Navigate, Outlet } from "react-router-dom";
import PropTypes from "prop-types";
//타입을 지정
const NotAuthRoutes = ({ isAuth }) => {
  return isAuth ? <Navigate to={"/"} /> : <Outlet />;
};

NotAuthRoutes.propTypes = {
  isAuth: PropTypes.bool.isRequired,
};
export default NotAuthRoutes;
