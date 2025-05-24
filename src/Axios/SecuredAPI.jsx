import axios from "axios";
import { unSecuredAPI } from "./UnsecuredAPI";
import Swal from "sweetalert2";

const securedAPI = axios.create({
    baseURL: 'https://api.on-club.co.kr',
    // baseURL: "http://localhost:8080",
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,  
});

//Request InterCeptor -> sessionStorage에서 액세스토큰 꺼내서 추가
securedAPI.interceptors.request.use(
    async (config) => {
        const accessToken = sessionStorage.getItem("accessToken");
        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Response Interceptor 개선
securedAPI.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    const status = error.response?.status;
    const errorCode = error.response?.data?.error;
    console.log(error);
    //만료된 토큰에 대해 한번만 리프레시 시도 - Back JWTExceptionFilter에서 "Expired" 응답이 오는 경우면 만료토큰임
      if (status === 401 && errorCode === "Expired" && !originalRequest._retry) { // case "Expired"
        console.log("accessToken 만료로 리프레시 토큰을 이용해 재요청 시도");
      originalRequest._retry = true;

      const refreshToken = sessionStorage.getItem("refreshToken");

      if (!refreshToken) {
        return handleSessionExpired();
      }

      try {
        const refreshResponse = await unSecuredAPI.post(
          '/api/user/refresh',
          null,
          {
            headers: {
              'Authorization': `Bearer ${refreshToken}`
            }
          }
        );

        const newAccessToken = refreshResponse.data.accessToken;
        console.log('갱신성공 : ',newAccessToken);
        sessionStorage.setItem('accessToken', newAccessToken);

        // 새 토큰으로 기존 요청 재시도
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return securedAPI(originalRequest);
      } catch (refreshError) {
        return handleSessionExpired(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// 세션 만료 공통 처리
function handleSessionExpired(err) {
  Swal.fire({
    icon: "warning",
    title: "로그인 정보가 만료되었습니다",
    text: "다시 로그인해주세요.",
    confirmButtonText: "확인"
  }).then(() => {
    sessionStorage.clear();
    window.location.href = "/login";
  });

  return Promise.reject(err || new Error("Session expired"));
}

export default securedAPI;
