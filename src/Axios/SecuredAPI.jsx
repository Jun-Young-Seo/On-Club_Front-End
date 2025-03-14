import axios from "axios";
import apiClient from "./apiClient";  // Refresh Token 요청을 위한 기본 API 클라이언트

const securedAPI = axios.create({
    baseURL: '43.201.191.12:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,  // HttpOnly 쿠키 사용
});

// **1️⃣ 요청 인터셉터** (Access Token 자동 포함)
securedAPI.interceptors.request.use(
    async (config) => {
        return config;  // 쿠키를 사용하므로 별도 토큰 추가 필요 없음
    },
    (error) => Promise.reject(error)
);

// **2️⃣ 응답 인터셉터** (Access Token 만료 시 자동 갱신)
securedAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) {
            try {
                // **Refresh Token으로 새로운 Access Token 요청**
                await apiClient.post('/auth/refresh');
                
                // **새로운 요청을 원래의 설정대로 재시도**
                return securedAPI.request(error.config);
            } catch (refreshError) {
                console.error('토큰 갱신 실패:', refreshError);
                return Promise.reject(refreshError);
            }
        }
        return Promise.reject(error);
    }
);

export default securedAPI;
