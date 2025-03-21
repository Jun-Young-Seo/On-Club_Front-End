import axios from "axios";
import { unSecuredAPI } from "./UnsecuredAPI";
// import apiClient from "./apiClient";  // Refresh Token 요청을 위한 기본 API 클라이언트

const securedAPI = axios.create({
    baseURL: 'http://43.201.191.12:8080',
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

// Response InterCeptor -> Access Token 만료 시 자동 갱신
securedAPI.interceptors.response.use(
    (response) => response,
    async (error) => {
        if (error.response?.status === 401) { //case Unauthroized
            try {
                // **Refresh Token으로 새로운 Access Token 요청
                const refreshResponse = await unSecuredAPI.post('/api/user/refresh');

                const newAccessToken = refreshResponse.data.accessToken;
                console.log('new : ',newAccessToken);
                sessionStorage.setItem('accessToken',newAccessToken);
                securedAPI.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;

                securedAPI.defaults.headers.Authorization = `Bearer ${newAccessToken}`;
                
                //새 발급 톹큰으로 재시도
                error.config.headers.Authorization = `Bearer ${newAccessToken}`;
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
