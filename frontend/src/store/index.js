import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import storage from "redux-persist/lib/storage";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from "redux-persist";

const rootReducer = combineReducers({
  user: userReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

//순서가 dispatch(registerUser(body)); 액션함수를 디스패치하면registerUser에서 액션을 생성하는 함수가 진행되어서
//axiosInstance.post("/users/register", body);로 백엔드에 요청을 보내어
//return response.data; 리턴이 되면 이부분이 리듀서로 향하게 되어
//const initialStat이쪽으로 들어와지고const userSlice = createSlice({
//name: "user",
//initialState, 이부분에들어가져서
//extraReducers 부분에 서버에 요청했을 때 결과에 따라 스토어에다가 보내지게된다
