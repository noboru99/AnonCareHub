const { default: mongoose, Schema } = require("mongoose");
const { default: categories } = require("../data/categories");

const postSchema = mongoose.Schema({
  writer: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },

  category: {
    type: String,
    enum: categories,
    default: "기타",
  },
  title: {
    type: String,
    // maxLength,
  },
  content: {
    type: String,
  },
  images: {
    type: Array,
    default: [],
  },
  emotionButtons: {
    like: {
      clicked: {
        type: Number,
        default: 0,
      },
      clickedUser: {
        type: Array,
        default: [],
      },
    },
    sad: {
      clicked: {
        type: Number,
        default: 0,
      },
      clickedUser: {
        type: Array,
        default: [],
      },
    },
    excited: {
      clicked: {
        type: Number,
        default: 0,
      },
      clickedUser: {
        type: Array,
        default: [],
      },
    },
  },
  views: {
    type: Number,
    default: 0,
  },
  comments: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment",
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

const Post = mongoose.model("Post", postSchema);

module.exports = Post;
