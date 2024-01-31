//프론트에서 글 업로드를 위한 요청은 이쪽라우터로온다
const express = require("express");
const router = express.Router();
const auth = require("../middleware/auth");
const Post = require("../models/Post");
const multer = require("multer");
const User = require("../models/User");
// multer라는 파일 업로드를 쉽게해주는 미들웨어
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    //destination는 파일이 저장될 공간의 경로함수
    //(요청객체, 파일정보, 콜백함수)
    //null을 전달하고 에러가없으면 파일 전달
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
    //파일업로드 이름을 현재시간을 넣어 유니크한 값을 설정 후 이름 넣어둠
  },
});
//파일이 저장될 공간의 경로설정
const upload = multer({ storage: storage }).single("file");
//미들웨어 설정
//file 하나만 설정하기 파일업로드 컴포넌트에서 append부분의 파일이름이랑 같아여함

router.post("/image", auth, async (req, res, next) => {
  upload(req, res, (err) => {
    if (err) {
      return req.status(500).send(err);
    }
    return res.json({ fileName: res.req.file.filename });
    //multer를 통해 업로드된 파일의 정보는 req.file에 저장
  });
});

router.post("/plusToEmotion", auth, async (req, res, next) => {
  //먼저 유저정보를 들고오기 -> auth가 있기 때문에 가능 밑두개는 같음
  // const userInfo = await User.findOne({ _id: req.user._id });
  const user = await User.findOne({ _id: req.body.userData.id });
  const postInfo = await Post.findOne({ _id: req.body.postId });
  const emotion = req.body.clickedEmotion;

  //같은 버튼이 눌렸으면 버튼을 지우기만
  const duplicate = postInfo.emotionButtons[emotion].clickedUser.some(
    (item) => item.id == user._id
  );
  console.log("duplicate", duplicate);
  let otherDuplicate = false;

  console.log("otherDuplicate", otherDuplicate);
  try {
    if (duplicate) {
      const result = await Post.findOneAndUpdate(
        {
          _id: req.body.postId,
        },
        {
          $pull: {
            [`emotionButtons.${emotion}.clickedUser`]: {
              id: req.body.userData.id,
            },
          },
          $inc: {
            [`emotionButtons.${emotion}.clicked`]: -1,
          },
        },
        {
          new: true,
        }
      );
      return res.status(200).json(result);
    } //else if (otherDuplicate) { }
    else {
      const result = await Post.findOneAndUpdate(
        {
          _id: req.body.postId,

          // 위 조건은 해당 사용자가 이미 클릭한 경우를 방지합니다.
        },
        {
          $push: {
            [`emotionButtons.${emotion}.clickedUser`]: {
              id: req.body.userData.id,
            },
          },
          $inc: {
            [`emotionButtons.${emotion}.clicked`]: 1,
          },
        },
        {
          new: true,
        }
      );
      return res.status(200).json(result);
    }
  } catch (error) {
    console.error(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const type = req.query.type;
  let postIds = req.params.id;

  if (type === "array") {
    //id=242324,24242,242442
    //아이디를 ,로 끊어주고 배열에 넣기
    ids = postIds.split(",");
    postIds = ids.map((item) => {
      return item;
    });
  }
  //postId를 이용해서 DB에서 postId랑 같은 정보를 들고온다
  try {
    const post = await Post.find({ _id: { $in: postIds } }).populate("writer");
    //원래 하나만 보내주지만 in을 사용하여 여러개를 들고오기
    return res.status(200).send(post);
  } catch (error) {
    next(error);
  }
});

router.get("/", async (req, res, next) => {
  const order = req.query.order ? req.query.order : "desc";
  //asc오름차순 desc내림차순
  const sortBy = req.query.sortBy ? req.query.sortBy : "_id";
  const limit = req.query.limit ? Number(req.query.limit) : 20;
  const skip = req.query.skip ? Number(req.query.skip) : 20;

  try {
    const posts = await Post.find()
      .populate("writer")
      .sort([[sortBy, order]])
      .skip(skip)
      .limit(limit);

    const postsTotal = await Post.countDocuments();
    const hasMore = skip + limit < postsTotal ? true : false;

    return res.status(200).json({
      posts,
      hasMore,
    });
    //populate는 writer부분을보고 작성자의 정보를 들고와줌
  } catch (error) {
    next(error);
  }
});

router.post("/", auth, async (req, res, next) => {
  try {
    const post = new Post(req.body);
    console.log("Received POST request with body:", req.body);
    post.save();
    return res.sendStatus(201);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
