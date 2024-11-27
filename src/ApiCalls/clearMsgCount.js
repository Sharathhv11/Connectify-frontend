import client from "./axiosClient.js"

export default async (chatID) => {
    try {
        return await client.post("/chat/clear-unread-messages",{
            chatID
        },{
            headers : {
              "Authorization" : `Bearer ${localStorage.getItem("token")}`
            }
          });
    } catch (error) {
        return error;
    }
}