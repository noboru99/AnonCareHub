// import React from "react";
import "../../styles/Login.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { loginUser } from "../../store/thunkFunctions";
import { CgProfile } from "react-icons/cg";
import { CgLockUnlock } from "react-icons/cg";
import { TbLogin2 } from "react-icons/tb";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
//유효성을 위한 라이브러리
const LoginPage = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();

  const onSubmit = ({ email, password }) => {
    //먼저 액션을 디스패치합니다
    const body = {
      email,
      password,
    };

    dispatch(loginUser(body));
    reset();
  };

  const userEmail = {
    required: "必須項目です。",
  };
  const userPassword = {
    required: "必須項目です。",
    minLength: {
      value: 6,
      message: "6文字以上です",
    },
  };

  const handleHomeButton = () => {
    navigate("/");
  };
  return (
    <section className="login-wrap">
      <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="title-section">
          <h1 className="login-title">LOGIN</h1>
          <div className="title-bottom-border"></div>
        </div>
        <div className="input-container">
          <label htmlFor="email">
            <CgProfile />
          </label>
          <input
            type="email"
            id="email"
            placeholder="User email"
            {...register("email", userEmail)}
          />
        </div>
        <div className="error-area">
          {errors?.email && (
            <div>
              <span style={{ color: "red" }}>{errors.email.message}</span>
            </div>
          )}
        </div>

        <div className="input-container">
          <label htmlFor="password">
            <CgLockUnlock />
          </label>
          <input
            placeholder="Password"
            type="password"
            id="password"
            {...register("password", userPassword)}
          />
        </div>
        <div className="error-area">
          {errors?.password && (
            <div>
              <span style={{ color: "red" }}>{errors.password.message}</span>
            </div>
          )}
        </div>

        <div className="login-button-container">
          <label htmlFor="">
            <TbLogin2 />
          </label>
          <button>Login</button>
        </div>

        <p className="register-link">
          会員登録まだの方
          <a href="/register">{""} 会員登録する</a>
        </p>
      </form>

      <div className="go-to-home">
        <button className="go-to-home-button" onClick={handleHomeButton}>
          <FaHome />
        </button>
      </div>
    </section>
  );
};

export default LoginPage;
