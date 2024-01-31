//카츠는 즐찾
//히스토리는 활동내역
const { default: mongoose } = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = mongoose.Schema({
  name: {
    type: String,
    maxLength: 50,
  },
  email: {
    type: String,
    trim: true, //빈칸없애주기
    unique: true,
  },
  password: {
    type: String,
    minLength: 5,
  },
  role: {
    type: Number,
    default: 0,
  },
  image: String,
  age: {
    type: Number,
  },
  isMale: {
    type: Boolean,
  },
  bookmark: {
    type: Array,
    default: [],
  },
  messageBox: {
    type: Array,
    default: [],
  },
  activityHistory: {
    type: Array,
    default: [],
  },
});

userSchema.pre("save", async function (next) {
  let user = this;
  //유저의 스키마가 저장이 되기전에 부르는 미들웨어로
  //유저의 비밀번호를 salt(10) 10자리를 생성해서
  //비밀번호랑 합쳐서 비밀번호 암호화하기

  if (user.isModified) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salt);
    user.password = hash;
  }
  next();
});

userSchema.methods.comparePassword = async function (plainPassword) {
  let user = this;
  console.log(user);
  //plainPassword(로그인 시 입력된 암호화가 되어있지않은 비밀번호)를 암호화시켜서 비교하기
  const match = await bcrypt.compare(plainPassword, user.password);
  return match; //true or false
};
const User = mongoose.model("User", userSchema); //모델 생성이마지막으로 오게!
module.exports = User;
