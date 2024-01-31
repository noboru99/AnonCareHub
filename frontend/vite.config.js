// npm install -D vite-plugin-eslint eslint eslint-config-react-app
// import를 하지 않았는데 사용하려는 부분에 대해서 에러로 알려줌
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslint from "vite-plugin-eslint"; //추가하기 파일도 생성해줘야함 .eslint

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslint()],
});
