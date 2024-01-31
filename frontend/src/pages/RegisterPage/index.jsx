// import React from "react";
import "../../styles/Register.scss";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { registerUser } from "../../store/thunkFunctions";
import { LuMailPlus } from "react-icons/lu";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoLockClosedOutline } from "react-icons/io5";
import { FaTransgender } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
//유효성을 위한 라이브러리
const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({ mode: "onChange" });

  const dispatch = useDispatch();

  const onSubmit = ({ email, name, password, isMale, age }) => {
    //먼저 액션을 디스패치합니다
    const body = {
      email,
      name,
      password,
      isMale,
      age,
      image: `https://via.placeholder.com/600x400?text=no+user+image`,
    };

    dispatch(registerUser(body));
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
  const userName = {
    required: "必須項目です。",
  };
  const userisMale = {
    required: "必須項目です。",
    optional: true,
  };
  const userAge = {
    required: "必須項目です。",
    optional: true,
  };
  const handleHomeButton = () => {
    navigate("/");
  };
  return (
    <section className="register-wrap">
      <form className="register-form" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="register-title">REGISTER</h1>
        <div className="input-container">
          <label htmlFor="email">
            <LuMailPlus />
          </label>
          <input
            type="email"
            id="email"
            {...register("email", userEmail)}
            placeholder="メールを入力してください。"
          />
          {errors?.email && (
            <div>
              <span style={{ color: "red" }}>{errors.email.message}</span>
            </div>
          )}
        </div>

        <div className="input-container">
          <label htmlFor="name">
            <MdDriveFileRenameOutline />
          </label>
          <input
            type="text"
            id="name"
            {...register("name", userName)}
            placeholder="名前を入力してください。"
          />
          {errors?.name && (
            <div>
              <span style={{ color: "red" }}>{errors.name.message}</span>
            </div>
          )}
        </div>

        <div className="input-container">
          <label htmlFor="password">
            <IoLockClosedOutline />
          </label>
          <input
            type="password"
            id="password"
            {...register("password", userPassword)}
            placeholder="パスワドを入力してください。"
          />
          {errors?.password && (
            <div>
              <span style={{ color: "red" }}>{errors.password.message}</span>
            </div>
          )}
        </div>

        <div className="age-select-container">
          <label htmlFor="age" />
          年代
          <select name="age" id="age" {...register("age", userAge)}>
            <option value="10">10代</option>
            <option value="20">20代</option>
            <option value="30">30代</option>
            <option value="40">40代</option>
            <option value="50">50代</option>
            <option value="60">60代以上</option>
          </select>
          {errors?.age && (
            <div>
              <span style={{ color: "red" }}>{errors.age.message}</span>
            </div>
          )}
        </div>

        <fieldset className="radio-container">
          <legend>
            <FaTransgender />
            性別選択
          </legend>
          <input
            type="radio"
            id="isMale"
            name="isMale"
            value={true}
            {...register("isMale", userisMale)}
          />
          <label htmlFor="male">男性</label>

          <input
            type="radio"
            id="isMale"
            name="isMale"
            value={false}
            {...register("isMale", userisMale)}
          />
          <label htmlFor="female">女性</label>
        </fieldset>
        {errors?.isMale && (
          <div>
            <span style={{ color: "red" }}>{errors.isMale.message}</span>
          </div>
        )}

        <div className="register-button-container">
          <button>Register</button>
        </div>

        <p className="login-link">
          IDを既に持ってる {""}
          <a href="/login">Login</a>
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
//
export default Register;
