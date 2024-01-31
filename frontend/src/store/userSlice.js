import { createSlice } from "@reduxjs/toolkit";
import {
  addToBookmark,
  authUser,
  getBookmarkItems,
  loginUser,
  logoutUser,
  registerUser,
  senderMessage,
} from "./thunkFunctions";
import { toast } from "react-toastify";
//리듀서
//이코드에서 다른 쪽에서 액션을 디스패치하면 initialState 부분으로 내용들이 들어가서
// 이름이 user라는 걸로 initialState, 여기에 내용을 담아서 스토어에 보내는 리듀서
const initialState = {
  userData: {
    id: "",
    email: "",
    name: "",
    role: "",
    image: "",
    age: 0,
    isMale: true,
  },
  isAuth: false,
  isLoading: false,
  error: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  //나중에 추가적인 부분(case)이 생기면 추가해 줄 수 있는 부분
  //서버 응답에따라 다른 결과를 보내줌
  //state는 리듀서의 상태 action은 type payload를 가리킴
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(registerUser.fulfilled, (state) => {
        state.isLoading = false;
        toast.info("ようこそ");
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(loginUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload; //유저데이터에 페이로드가 들어가 내용 업데이트
        //인증이나 상태 권한 등등 업데이트 해줘야함
        state.isAuth = true; //로그인 상태 유지
        localStorage.setItem("accessToken", action.payload.accessToken); //토큰저장
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })

      .addCase(authUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(authUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData = action.payload;
        state.isAuth = true;
      })
      .addCase(authUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.userData = initialState.userData;
        state.isAuth = false;
        localStorage.removeItem("accessToken");
      })
      .addCase(logoutUser.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logoutUser.fulfilled, (state) => {
        state.isLoading = false;
        state.userData = initialState.userData; //로그아웃이니 유저데이터 없애주기
        state.isAuth = false;
        localStorage.removeItem("accessToken"); //토큰없애기
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(addToBookmark.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addToBookmark.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData.bookmark = action.payload;
        toast.info("북마크에 추가되었습니다.");
      })
      .addCase(addToBookmark.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(getBookmarkItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getBookmarkItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.bookmarkDetail = action.payload;
      })
      .addCase(getBookmarkItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      })
      .addCase(senderMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(senderMessage.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userData.messageBox = action.payload;
      })
      .addCase(senderMessage.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        toast.error(action.payload);
      });
  },
});
export default userSlice.reducer;
