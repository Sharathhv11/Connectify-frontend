import axios from "axios";

const client = axios.create({
    baseURL : 'http://localhost:3000/api',
    timeout:100000,
    headers:{
        "Content-Type":"application/json",
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
    }

})

export default client;
