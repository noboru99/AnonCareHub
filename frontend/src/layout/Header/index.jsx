import { useDispatch, useSelector } from "react-redux";
import "../../styles/header.scss";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../../store/thunkFunctions";
const routes = [
  { to: "/login", name: "login", auth: false },
  { to: "/register", name: "sign up", auth: false },
  { to: "logout", name: "logout", auth: true },
  { to: "/posts/upload", name: "悩みを書く", auth: true },
  { to: "/user/:userId", name: "my page", auth: true },
  { to: "/list", name: "悩みを読む", auth: true },

  //그외 등등 추가하기
];
const Header = () => {
  const isAuth = useSelector((state) => state.user?.isAuth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogout = () => {
    dispatch(logoutUser()).then(() => {
      navigate("/login"); //로그아웃 후 로그인 페이지로
    });
  };

  return (
    <section className="header">
      <div className="header-wrap">
        <div className="logo">
          <Link to={"/"}>
            {" "}
            <span className="Anon">Anon</span>
            <span className="Care">Care</span>
            <span className="Hub">Hub</span>
          </Link>
        </div>
        <div className="contents">
          {routes.map(({ to, name, auth }) => {
            if (isAuth !== auth) return null;
            if (auth === true) {
              return (
                <div key={name} className="my-page">
                  {name === "logout" ? (
                    <Link onClick={handleLogout}>{name}</Link>
                  ) : (
                    <Link to={to}>{name}</Link>
                  )}
                </div>
              );
            } else {
              return (
                <div key={name} className="my-page">
                  {" "}
                  <Link to={to}>{name}</Link>{" "}
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
};

export default Header;
