import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL;

export const unSecuredAPI = axios.create({
    baseURL: BASE_URL,
    headers:{
        'Content-Type' : 'application/json',
    },
    withCredentials:true,
});

export const login= async(loginData)=>{
    const response = await unSecuredAPI.post('/api/user/login',loginData);  
    return response;
}

