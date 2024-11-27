import React, { useEffect, useState } from "react";
import profileDefault from "./../../assets/profileDefault.png";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { startChat } from "./../../ApiCalls/chatApis";
import { updateChat, updateSelectedChat } from "../../state/userSlice";
import moment from 'moment'

const UserList = ({
  firstname,
  subHeader = "",
  profile,
  connected = false,
  id
}) => {

  const { value, chats } = useSelector((state) => state.user);

  const [unReadMsgCount,setunReadMsgCount] = useState(0);
  const [msgCreatedAt,setMsgCreatedAt] = useState(null);

  const dispatch = useDispatch();

  const getSlectedChatId = (id) => {
    const result = chats.find((chat) => {
      return (
        chat.members.map((el) => el._id).includes(id) &&
        chat.members.map((el) => el._id).includes(value._id)
      );
    });

    return result;
  };

  const getUnReadCount = (id) => {
    const result = chats.find((chat) => {
      return (
        chat.members.map((el) => el._id).includes(id) &&
        chat.members.map((el) => el._id).includes(value._id)
      );
    });


    setMsgCreatedAt(result?.latestMessage?.createdAt);
    setunReadMsgCount(result?.unReadMessages);
  }


  useEffect(()=>{
    getUnReadCount(id);
  },[chats])

  const createNewChat = async (searchedUser) => {
    try {
      const members = [value._id, searchedUser];
      const response = await startChat(members);

      if (response.status == 200 || response.status === 201) {
        toast.success(response.data.message);

        const newState = [...chats];
        newState.push(response.data.data);

        dispatch(updateSelectedChat(response.data.data));
        dispatch(updateChat(newState));
      } else {
        toast.error(response.response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div className="w-full h-[50px]  flex hover:bg-[#f4efef]">
      <div className="h-full w-[60px]  flex justify-center items-center cursor-pointer">
        <img
          src={profile ?? profileDefault}
          alt=""
          className="w-[40px] h-[40px] rounded-full"
        />
      </div>

      <div
        className="flex-1  h-full flex justify-center flex-col name-email-list cursor-pointer "
        onClick={() => {
          dispatch(updateSelectedChat(getSlectedChatId(id)));
        }}
      >
        <h1 className="relative top-[5px] poppins-regular text-base">
          {firstname}
        </h1>
        {/* <h5 className="relative -top-[2px]  card-text text-sm">{subHeader}</h5> */}
        {subHeader}
      </div>

      <div className="w-[20%] h-full grid place-items-center ">
      {!connected && (
          <button
            className="border-[1.3px] p-2 rounded-full  border-black h-[50%] flex justify-center items-center font-mono "
            onClick={() => {
              createNewChat(id);
            }}
          >
            connect
          </button>
        
      )}{
        connected && 
        <div>
           {
              unReadMsgCount && msgCreatedAt && <h1 className=" text-[.8rem]  bg-black rounded-full w-6 h-6 text-white flex justify-center items-center font-bold">{`${unReadMsgCount}`}</h1> ||
              !unReadMsgCount && msgCreatedAt && <h1 className="text-black text-[.8rem]">{moment(msgCreatedAt).format("hh:mm A")}</h1> ||
              !unReadMsgCount && !msgCreatedAt && ""
           }
        </div>
      }
      </div>
    </div>
  );
};

export default UserList;