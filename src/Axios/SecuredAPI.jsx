import axios from "axios";
import { unSecuredAPI } from "./UnsecuredAPI";

const securedAPI = axios.create({
    baseURL: 'http://localhost:8080',
    headers: {
        'Content-Type': 'application/json',
    },
    withCredentials: true,
});

let isRefreshing = false; // 토큰 갱신 중인지 확인
let refreshSubscribers = []; // 요청 대기 큐

const onTokenRefreshed = (newToken) => {
    refreshSubscribers.forEach(callback => callback(newToken));
    refreshSubscribers = [];
};

const addRefreshSubscriber = (callback) => {
    refreshSubscribers.push(callback);
};

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

securedAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        
        // 401 Unauthorized 발생 시
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true; // 재시도 방지

            const refreshToken = sessionStorage.getItem('refreshToken');
            if (!refreshToken) {
                console.error('No refresh token found');
                sessionStorage.clear(); // 로그아웃 처리
                window.location.href = "/login"; // 로그인 페이지로 리디렉트
                return Promise.reject(error);
            }

            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    const refreshResponse = await unSecuredAPI.post('/api/user/refresh', {}, {
                        headers: {
                            "Authorization": `Bearer ${refreshToken}`
                        }
                    });

                    const newAccessToken = refreshResponse.data.accessToken;
                    sessionStorage.setItem('accessToken', newAccessToken);
                    securedAPI.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;

                    isRefreshing = false;
                    onTokenRefreshed(newAccessToken); // 모든 대기 요청 처리

                    return securedAPI(originalRequest); // 기존 요청 재시도
                } catch (refreshError) {
                    console.error('토큰 갱신 실패:', refreshError);
                    sessionStorage.clear();
                    window.location.href = "/login";
                    return Promise.reject(refreshError);
                }
            }

            return new Promise((resolve) => {
                addRefreshSubscriber((newToken) => {
                    originalRequest.headers['Authorization'] = `Bearer ${newToken}`;
                    resolve(securedAPI(originalRequest));
                });
            });
        }

        return Promise.reject(error);
    }
);

export default securedAPI;
