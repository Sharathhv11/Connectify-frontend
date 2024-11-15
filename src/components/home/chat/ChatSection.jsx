import React from "react";
import { useSelector } from "react-redux";
import NotSelected from "./Nselected";
import ChatArea from "./ChatMain";

const ChatSection = () => {
  const { selectedChat, value } = useSelector((state) => state.user);



  return (
    <>
      {selectedChat && <ChatArea userDetails={selectedChat} />}
      {!selectedChat && <NotSelected />}
    </>
  );
};

export default ChatSection;
