import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../utils/axios";

//dispatch를 통해 보낼 액션함수를 만드는 액션 생성자인데 payload를 만드는 함수
//dispatch로 보내졌으니 리듀서로 갑니다
export const registerUser = createAsyncThunk(
  "user/registerUser",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/users/register", body);
      //백엔드에 요청을 보냄

      return response.data; //payload 이부분이 리듀서로 향하게 됨
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
      //에러 발생시 에러데이터를 리턴 없으면 메세지를 스트링형태로 리턴
    }
  }
);
//성공적으로 완료되면 반환된 데이터를 fulfilled 액션의 payload로 사용하게 됩니다.
// 실패한 경우에는 rejected 액션을 생성하고, 에러를 payload로 사용하게 됩니다.

export const loginUser = createAsyncThunk(
  "user/loginUser",
  async (body, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/users/login", body);
      //백엔드에 요청을 보냄

      return response.data; //payload 이부분이 리듀서로 향하게 됨
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
      //에러 발생시 에러데이터를 리턴 없으면 메세지를 스트링형태로 리턴
    }
  }
);

export const logoutUser = createAsyncThunk(
  "user/logoutUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/users/logout");
      //백엔드에 요청을 보냄

      return response.data; //payload 이부분이 리듀서로 향하게 됨
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
      //에러 발생시 에러데이터를 리턴 없으면 메세지를 스트링형태로 리턴
    }
  }
);

export const addToBookmark = createAsyncThunk(
  "user/addToBookmark",
  async (body, thunkAPI) => {
    // let postParam = body.param;

    try {
      const response = await axiosInstance.post(
        `/users/${body.param}/bookmark`,
        body
      );
      //백엔드에 요청을 보냄
      return response.data; //payload 이부분이 리듀서로 향하게 됨
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
      //에러 발생시 에러데이터를 리턴 없으면 메세지를 스트링형태로 리턴
    }
  }
);

export const senderMessage = createAsyncThunk(
  "user/senderMessage",
  async (body, thunkAPI) => {
    // let postParam = body.param;

    try {
      const response = await axiosInstance.post("/users/senderMessage", body);
      //백엔드에 요청을 보냄
      console.log("response", response);
      return response.data; //payload 이부분이 리듀서로 향하게 됨
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
      //에러 발생시 에러데이터를 리턴 없으면 메세지를 스트링형태로 리턴
    }
  }
);

export const getBookmarkItems = createAsyncThunk(
  "user/getBookmarkItems",
  async ({ bookmarkItemIds, userBookmark }, thunkAPI) => {
    // let postParam = body.param;
    console.log("userBookmark:", userBookmark);

    try {
      const response = await axiosInstance.get(
        `/posts/${bookmarkItemIds}?type=array`
      );

      //백엔드에 요청을 보냄
      return response.data; //payload 이부분이 리듀서로 향하게 됨
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
      //에러 발생시 에러데이터를 리턴 없으면 메세지를 스트링형태로 리턴
    }
  }
);

export const authUser = createAsyncThunk(
  "user/authUser",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/users/auth");
      //백엔드에 요청을 보냄

      return response.data; //payload 이부분이 리듀서로 향하게 됨
    } catch (error) {
      console.log(error);
      return thunkAPI.rejectWithValue(error.response.data || error.message);
      //에러 발생시 에러데이터를 리턴 없으면 메세지를 스트링형태로 리턴
    }
  }
);
