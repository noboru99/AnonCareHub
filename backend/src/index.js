//프론트엔드에서 요청을 보내면 가장 먼저 이쪽에서 확인하는 엔트리 파일
const express = require("express");
const path = require("path");
// const port = 4000;
const port = 726;
const app = express();
const cors = require("cors"); //포토번호가 다른 클라이언트와 백엔드를 이어줌
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const categories = require("./data/categories");

dotenv.config();
app.use(express.json());
app.use(cors());
app.get("/", (req, res, next) => {
  setImmediate(() => {
    next(new Error("it is an error"));
  });
});
//에러를 무조건 발생시켜서 처리해주기 서버다운이안됨
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.send(err.message || "서버에서 에러 발생");
});
app.use(express.static(path.join(__dirname, "../uploads"))); //미들웨어 생성
//path라는 것을 사용해 uploads를 절대경로로 바꿈

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("mongoDB connect-success");
  })
  .catch((error) => {
    console.error(error);
  });
app.get("/categories", (req, res) => {
  res.json(categories);
});
app.use("/users", require("./routes/users"));
app.use("/posts", require("./routes/posts"));
app.use("/comment", require("./routes/comment"));
//users의 경로로 요청이 들어오면 ./routes/users 여기서 처리를 해줌

app.post("/", (req, res) => {
  console.log(req.body);
  res.json(res.body);
});
app.listen(port, () => {
  console.log(`${port}에서 실행이 되었습니다.`);
});
