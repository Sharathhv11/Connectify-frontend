import React, { useEffect, useState } from "react";
import allUsers from "../../ApiCalls/allUsers";
import { useNavigate } from "react-router-dom";
import userDetailsAxios from "../../ApiCalls/userDetails";
import { useSelector, useDispatch } from "react-redux";
import { updateUser,updateAllUsers } from "../../state/userSlice";
import toast from "react-hot-toast";

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


        console.log(result.data.data);

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
  }

  useEffect(() => {
    
    if (localStorage.getItem("token")) {
      userDetails();
      allUsersHandler();
    } else {
      navigate("/login");
    }
  }, []);

  return (
    <>
      {children}
    </>
  );
};

export default ProtectRoute;
