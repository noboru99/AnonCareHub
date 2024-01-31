const jwt = require("jsonwebtoken");
const User = require("../models/User");
let auth = async (req, res, next) => {
  // 토큰을 request headers에서 가져오기
  const authHeader = req.headers["authorization"];
  //authorization에는 토큰이 Bearer asfbsdb 형식으로 들어가있음
  const token = authHeader && authHeader.split(" ")[1];
  //스플릿으로 [0]번째는 Bearer부분을 빼고 들고오기
  if (token === null) return res.sendStatus(401);

  try {
    //유효한 토큰인지 확인하기
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    //첫 번째 인자는 검증하고자 하는 JWT(문자열)이고, 두 번째 인자는 해당 JWT를 서명할 때 사용된 비밀 키
    const user = await User.findOne({ _id: decode.userId });
    if (!user) return res.status(400).send("ないユーザーです");

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = auth;
