import client from "./axiosClient"


export const startChat = async (members) => {
    try {
        const result = await client.post("/chat/create-new-chat",{
            members
        });
        return result; 
    } catch (error) {
        return error;
    }
}