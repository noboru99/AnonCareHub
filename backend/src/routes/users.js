//프론트에서(thunkFunction) 온 요청들을 받아 주는 곳
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth");

router.get("/auth", auth, async (req, res, next) => {
  //미들웨어에서 유저 확인이 되었으면 여기로 오는거임

  return res.json({
    id: req.user._id,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    image: req.user.image,
    age: req.user.age,
    isMale: req.user.isMale,
    bookmark: req.user.bookmark,
    activityHistory: req.user.activityHistory,
    messageBox: req.user.messageBox,
  });
});

router.post("/register", async (req, res, next) => {
  //thunkFunctions에서 /users/register경로에서 온 요청을 처리
  //여기는 회원가입을 위한 정보들이 들어왔으니 데이터베이스에 화원가입정보를 저장

  try {
    const user = new User(req.body);
    await user.save();
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post("/login", async (req, res, next) => {
  //thunkFunctions에서 /users/register경로에서 온 요청을 처리
  //여기는 로그인 정보가 들어왔으니 로그인 유저가 맞는지 확인하기 위해 처리

  //req.body 안에 있는 password email을 이제 확인
  try {
    const user = await User.findOne({ email: req.body.email });
    //user collection안에서 유저 찾기 몽고디비기능

    if (!user) {
      return res.status(400).send("Auth failed, email not found");
    }
    //비밀번호가 올바른지 체크도 해주기 isMatch의 비밀번호는 로그인 할 때 입력하는 암호화가 되어있지않은 비밀번호
    const isMatch = await user.comparePassword(req.body.password);
    //유저모델에 있는comparePassword함수로 보내어 맞는지 확인
    if (!isMatch) {
      return res.status(400).send("Wrong password");
    }

    const payload = {
      userId: user._id.toHexString(),
      //유저의 아이디는 오브젝트 안에 있으니 그걸 스트링값으로 바꾸어줌
    };
    //비밀번호까지 맞았으면  JWT를 이용해서 토큰을 생성
    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    //토큰을 생성할 대상 아이디, 남들이 알면 안되는 환경변수 그리고 옵션 1시간의 유효기간
    //sign이게 생성해주는 함수

    return res.json({ user, accessToken }); //유저정보와 토큰을 반환
  } catch (error) {
    next(error);
  }
});

router.post("/logout", auth, async (req, res, next) => {
  try {
    return res.sendStatus(200);
  } catch (error) {
    next(error);
  }
});

router.post("/senderMessage", auth, async (req, res, next) => {
  try {
    const user = await User.findOneAndUpdate(
      { _id: req.body.receiverUser },
      {
        $push: {
          messageBox: {
            sender: req.body.senderUser,
            receiver: req.body.receiverUser,
            receivedPost: req.body.postId,
            messageContent: req.body.messageValue,
            date: Date.now(),
            postTitle: req.body.postTitle,
          },
        },
      },
      {
        new: true,
      }
    );

    return res.status(201).send(user.messageBox);
  } catch (error) {
    next(error);
  }
});

router.post("/:id/bookmark", auth, async (req, res, next) => {
  try {
    //먼저 유저정보를 들고오기 -> auth가 있기 때문에 가능
    const userInfo = await User.findOne({ _id: req.user._id });
    // 받은 postId를 로그로 출력

    //가져온 정보에서 북마크가 되어있는지 확인
    // let duplicate = false;
    // userInfo가 null 또는 undefined인 경우 에러 방지
    // userInfo.bookmark.forEach((item) => {
    //   if (item === req.body.postId) {
    //     duplicate = true;
    //   }
    // });
    const duplicate = userInfo.bookmark.some(
      (item) => item.id === req.body.postId
    );
    if (duplicate) {
      //북마크가 되어있으면 북마크 부분에 삭제
      const user = await User.findOneAndUpdate(
        { _id: req.user._id, "bookmark.id": req.body.postId },
        { $pull: { bookmark: { id: req.body.postId } } },
        { new: true }
      );
      // 삭제 후의 사용자 객체를 로그로 출력
      // console.log("삭제 후 사용자:", user);

      return res.status(201).send(user.bookmark);
    } else {
      const user = await User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            bookmark: {
              id: req.body.postId,
              clicked: req.body.clicked,
              date: Date.now(),
            },
          },
        },
        {
          new: true,
        }
      );
      // 추가 후의 사용자 객체를 로그로 출력
      // console.log("추가 후 사용자:", user);
      return res.status(201).send(user.bookmark);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).send("내부 서버 오류");
  }
});
module.exports = router;
