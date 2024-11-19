import client from "./axiosClient.js"

async function sendMessage(message){
    try {
        const response = await client.post("/messages/newMessage",message,{
            headers : {
                "Authorization" : `Bearer ${localStorage.getItem("token")}`
              }
        });

        return response;
    } catch (error) {
        return error;
    }
}


export default sendMessage;