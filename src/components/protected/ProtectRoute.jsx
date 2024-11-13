import React, { useEffect, useState } from "react";
import allUsers from "../../ApiCalls/allUsers";
import { useNavigate } from "react-router-dom";
import userDetailsAxios from "../../ApiCalls/userDetails";
import { useSelector, useDispatch } from "react-redux";
import { updateUser, updateAllUsers, updateChat } from "../../state/userSlice";
import toast from "react-hot-toast";
import getAllChats from "./../../ApiCalls/chat";

const ProtectRoute = ({ children }) => {
  const { value } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const userDetails = async function () {
    try {
      const result = await userDetailsAxios();

      if (result.status === 200) {
        dispatch(updateUser(result.data.data));
      } else {
        const message = result.response?.data.message || result.message;
        toast.error(message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
      navigate("/login");
    }
  };

  const allUsersHandler = async () => {
    try {
      const result = await allUsers();

      if (result.status === 200) {
        dispatch(updateAllUsers(result.data.data));
      } else {
        const message = result.response?.data.message || result.message;
        toast.error(message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
      navigate("/login");
    }
  };

  const getUserChat = async () => {
    try {
      const response = await getAllChats();


      if (response.status == 200) {
        dispatch(updateChat(response.data.data));
      } else {
        const message = result.response?.data.message || result.message;
        toast.error(message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
      navigate("/login");
    }
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      userDetails();
      allUsersHandler();
      getUserChat();
    } else {
      navigate("/login");
    }
  }, []);

  return <>{children}</>;
};

export default ProtectRoute;
