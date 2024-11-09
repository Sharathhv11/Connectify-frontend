import client from "./axiosClient";

export default async () => {
     try {
    return await client.get("/user/users",{
      headers : {
        "Authorization" : `Bearer ${localStorage.getItem("token")}`
      }
    });
  } catch (error) {
    return error;
  }
}