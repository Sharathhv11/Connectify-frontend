import client from "./axiosClient";


export default async(data)=>{
    try {
        const response = await client.post("/auth/login",data);
        return response;
    } catch (error) {
        return error;
    }
}