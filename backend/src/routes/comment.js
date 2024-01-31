const express = require("express");
const router = express.Router();
const Comment = require("../models/Comment");

router.post("/saveComment", async (req, res, next) => {
  try {
    const comment = new Comment(req.body);

    comment.save();

    console.log(comment);
    return res.status(200).json({ comment });
  } catch (error) {
    next(error);
  }
});

router.get("/getComment", async (req, res, next) => {
  try {
    const commentData = await Comment.find({
      postId: req.query.postId,
    }).populate("writer");

    console.log(commentData);

    return res.status(200).json({ commentData });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
