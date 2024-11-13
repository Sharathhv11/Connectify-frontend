import React from "react";
import profileDefault from "./../../assets/profileDefault.png";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { startChat } from "./../../ApiCalls/chatApis";
import { updateChat } from "../../state/userSlice";

const UserList = ({ firstname, email, profile, connected = false, id }) => {
  const { value, chats } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const createNewChat = async (searchedUser) => {
    try {
      const members = [value._id, searchedUser];
      const response = await startChat(members);

      if (response.status == 200 || response.status === 201) {
        toast.success(response.data.message);

        const newState = [...chats];
        newState.push(response.data.data);

        dispatch(updateChat(newState));
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };
  return (
    <div className="w-full h-[45px]  flex ">
      <div className="w-[80%] h-full  flex items-center justify-center ">
        <div className="h-full w-[60px]  flex justify-center items-center">
          <img
            src={profile ?? profileDefault}
            alt=""
            className="w-[40px] h-[40px] rounded-full"
          />
        </div>

        <div className="w-[90%]  h-full flex justify-center flex-col ">
          <h1 className="relative top-1 poppins-regular">{firstname}</h1>
          <h5 className="relative -top-1  card-text">{email}</h5>
        </div>
      </div>

      <div className="w-[20%] h-full grid place-items-center">
        {!connected && (
          <button
            className="border-[1.3px] p-2 rounded-full  border-black h-[50%] flex justify-center items-center font-mono "
            onClick={() => {
              createNewChat(id);
            }}
          >
            connect
          </button>
        )}
      </div>
    </div>
  );
};

export default UserList;
