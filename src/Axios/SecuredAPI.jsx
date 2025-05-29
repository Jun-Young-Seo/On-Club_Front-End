import axios from "axios";
import { unSecuredAPI } from "./UnsecuredAPI";
import Swal from "sweetalert2";

const BASE_URL = process.env.REACT_APP_API_URL;

const securedAPI = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  },
  withCredentials: true, // ✅ 쿠키 자동 포함
});

// ✅ Request Interceptor (Authorization 제거됨)
securedAPI.interceptors.request.use(
  async (config) => {
    // 더 이상 accessToken을 헤더에 붙이지 않음
    return config;
  },
  (error) => Promise.reject(error)
);

// ✅ Response Interceptor
securedAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const status = error.response?.status;
    const errorCode = error.response?.data?.error;

    if (status === 401 && errorCode === "Expired" && !originalRequest._retry) {
      console.log("accessToken 만료 → refreshToken으로 재시도");
      originalRequest._retry = true;

      try {
        const refreshResponse = await unSecuredAPI.post(
          '/api/user/refresh',
          null, // ✅ Body 필요 없음
          {
            withCredentials: true // ✅ 쿠키로 refreshToken 자동 전송
          }
        );

        console.log("accessToken 재발급 성공");

        // ✅ accessToken은 쿠키로 내려왔기 때문에 sessionStorage에 저장하지 않음
        // 그러나 userName, userId 등은 필요하면 저장 가능

        // ✅ 기존 요청 재시도 (쿠키 기반)
        return securedAPI(originalRequest);
      } catch (refreshError) {
        return handleSessionExpired(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// ✅ 세션 만료 공통 처리
function handleSessionExpired(err) {
  Swal.fire({
    icon: "warning",
    title: "로그인 정보가 만료되었습니다",
    text: "다시 로그인해주세요.",
    confirmButtonText: "확인"
  }).then(() => {
    sessionStorage.clear(); // accessToken, userId 등 제거
    window.location.href = "/login";
  });

  return Promise.reject(err || new Error("Session expired"));
}

export default securedAPI;
