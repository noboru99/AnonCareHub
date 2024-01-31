import { Outlet, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import LandingPage from "./pages/LandingPage";
import LoginPage from "./pages/LoginPage";
import Register from "./pages/RegisterPage";
import WritePost from "./pages/WritePost";
// import Navbar from "./layout/NavBar/index";
import Footer from "./layout/Footer";
import Header from "./layout/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { authUser } from "./store/thunkFunctions";
import { useEffect } from "react";

import ProtectedRoutes from "./components/ProtectedRoutes";
import NotAuthRoutes from "./components/NotAuthRoutes";
import PostDetail from "./pages/PostDetailPage";
import MyPage from "./pages/MyPage";
import StroyListPage from "./pages/StoryListPage";
import MyBookMark from "./pages/MyPage/section/MyBookMark";
function Layout() {
  return (
    <div>
      <ToastContainer
        position="bottom-right"
        theme="light"
        pauseOnHover
        autoClose={1500}
      />
      <Header />
      {/* <Navbar /> */}
      <main>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
function App() {
  const dispatch = useDispatch();
  //useSelector스토어에서 상태를 가져 올 수 있음
  const isAuth = useSelector((state) => state.user?.isAuth);
  const { pathname } = useLocation(); //url의 정보
  // pathname-현재 url정보
  //search - 쿼리 문자열(?이후의 부분)
  //hash - 해시 부분(# 이후의 부분)
  //state - location에 추가된 상태 정보(예: 이전 페이지에서 전달된 state)
  useEffect(() => {
    if (isAuth) {
      dispatch(authUser());
    }
  }, [isAuth, pathname, dispatch]);
  //dispatch를 넣는 이유는 린크경고를 없애주기위해

  return (
    <Routes>
      {/*path의 경로로 들어가면 레이아웃컴포넌트가 나옵니다 */}
      <Route path="/" element={<Layout />}>
        {/**인덱스가 들어가있기 때문에 기본 랜딩페이지가 나옴 */}
        <Route index element={<LandingPage />}></Route>

        {/** 로그인 한 사람만 갈 수 있는 경로 */}
        <Route element={<ProtectedRoutes isAuth={isAuth} />}>
          <Route path="/posts/upload" element={<WritePost />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/user/:userId" element={<MyPage />}>
            <Route path="/user/:userId/bookmark" element={<MyBookMark />} />
          </Route>
        </Route>

        {/* 로그인 상관없이 */}
        <Route path="/list" element={<StroyListPage />} />
      </Route>
      {/** 로그인 안한 사람마 갈 수 있는 경로 */}
      <Route element={<NotAuthRoutes isAuth={isAuth} />}>
        <Route path="/login" element={<LoginPage />}></Route>
        <Route path="/register" element={<Register />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
