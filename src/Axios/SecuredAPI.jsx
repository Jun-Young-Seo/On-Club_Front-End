import axios from "axios";
import { unSecuredAPI } from "./UnsecuredAPI";
import Swal from "sweetalert2";

const securedAPI = axios.create({
    // baseURL: 'https://api.on-club.co.kr',
    baseURL: "http://localhost:8080",
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

    // 이미 재시도 했던 요청이면 루프 방지
    if (error.response?.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = sessionStorage.getItem("refreshToken");

      if (!refreshToken) {
        Swal.fire({
          icon: "warning",
          title: "로그인 정보가 만료되었습니다",
          text: "다시 로그인해주세요.",
          confirmButtonText: "확인"
        }).then(() => {
          sessionStorage.clear();
          window.location.href = "/login";
        });
        return Promise.reject(error);
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
        sessionStorage.setItem('accessToken', newAccessToken);

        // 새로운 토큰으로 요청 다시 시도
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return securedAPI(originalRequest);
      } catch (refreshError) {
        Swal.fire({
          icon: "warning",
          title: "로그인 정보가 만료되었습니다",
          text: "다시 로그인해주세요.",
          confirmButtonText: "확인"
        }).then(() => {
          sessionStorage.clear();
          window.location.href = "/login";
        });

        return Promise.reject(refreshError);
      }
    }

    // 그 외의 에러는 그대로 반환
    return Promise.reject(error);
  }
);

export default securedAPI;
