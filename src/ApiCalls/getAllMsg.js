import client from "./axiosClient";

const getAllMsg = async (chatID) => {
  try {
    const response = await client.get(`/messages/all-messages/${chatID}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    return response;
  } catch (error) {
    return error;
  }
};

export default getAllMsg;
