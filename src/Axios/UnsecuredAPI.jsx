import axios from "axios";

export const unSecuredAPI = axios.create({
    // baseURL:'https://api.on-club.co.kr',
    baseURL: "http://localhost:8080",
    headers:{
        'Content-Type' : 'application/json',
    },
    withCredentials:true,
});

export const login= async(loginData)=>{
    const response = await unSecuredAPI.post('/api/user/login',loginData);
    return response;
}

