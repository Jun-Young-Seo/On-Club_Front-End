import axios from "axios";

export const unSecuredAPI = axios.create({
    baseURL:'http://43.201.191.12:8080',
    headers:{
        'Content-Type' : 'application/json',
    },
    withCredentials:true,
});

export const login= async(loginData)=>{
    try{
        const response = await unSecuredAPI.post('/api/user/login',loginData);
        console.log("Logiend");

        console.log("\n Login Response:", response);
        
        console.log("\n response.data:", response.data);
        

        sessionStorage.setItem('userId',response.data.userId);
    }catch(error){
        console.log(error);
    }
}

