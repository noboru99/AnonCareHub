import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: import.meta.env.PROD ? "" : "http://localhost:4000",
  baseURL: import.meta.env.PROD ? "" : "http://localhost:726",
});

axiosInstance.interceptors.request.use(
  //이 메소드는 성공의 인자와 실패의 인자 두개를 받음
  function (config) {
    config.headers.Authorization =
      "Bearer " + localStorage.getItem("accessToken");
    //Authorization 이부분에 넣어줌 리덕스부분  보면 됨
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error === "jwt expired") {
      window.location.reload();
      //시간만료 에러가 나면 페이지를 리로드시킨다
    }
  }
);
export default axiosInstance;
