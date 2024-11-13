import client from "./axiosClient.js"

export default async () => {
    try {
        return await client.get("/chat/chats");
    } catch (error) {
        return error;
    }
}