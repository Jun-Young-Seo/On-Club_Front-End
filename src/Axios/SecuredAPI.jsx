import axios from "axios";
import { unSecuredAPI } from "./UnsecuredAPI";
import Swal from "sweetalert2";
// import apiClient from "./apiClient";  // Refresh Token 요청을 위한 기본 API 클라이언트

const securedAPI = axios.create({
    baseURL: 'http://localhost:8080',
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
      console.log("error : ",error);
      if (error.response?.status === 401) { // Unauthorized
        try {
          // sessionStorage에서 refresh 토큰을 가져옴 (refresh 토큰이 반드시 저장되어 있어야 함)
          const refreshToken = sessionStorage.getItem("refreshToken");
          if (!refreshToken) {
            return Promise.reject(error);
          }
          // refresh 토큰을 Authorization 헤더에 포함하여 새로운 Access Token 요청
          const refreshResponse = await unSecuredAPI.post(
            '/api/user/refresh',
            null, // body가 없으면 null
            {
              headers: {
                'Authorization': `Bearer ${refreshToken}`
              }
            }
          );
  
          const newAccessToken = refreshResponse.data.accessToken;
          console.log('new access token:', newAccessToken);
          sessionStorage.setItem('accessToken', newAccessToken);
          // axios 인스턴스의 기본 헤더와 재시도 요청의 헤더 모두 업데이트
          securedAPI.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
          error.config.headers['Authorization'] = `Bearer ${newAccessToken}`;   
          
          return securedAPI.request(error.config);
        } catch (refreshError) {
          console.error('토큰 갱신 실패:', refreshError);
          return Promise.reject(refreshError);
        }
      }
      else if(error.response?.status === 403){ //Forbidden
        console.log("************************************************************");
        Swal.fire({
          icon: "warning",
          title: "접근 권한이 없습니다",
          text: "해당 기능은 운영진만 접근할 수 있습니다.",
          confirmButtonColor: "#e74c3c",
        });
        return;
      }
      return Promise.resolve(null);
    }
  );
  
export default securedAPI;
