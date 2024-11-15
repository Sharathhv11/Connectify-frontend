import client from "./axiosClient.js"

export default async () => {
    try {
        return await client.get("/chat/chats",{
            headers : {
              "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
          });
    } catch (error) {
        return error;
    }
}