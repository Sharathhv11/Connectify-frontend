import { useSelector, useDispatch } from "react-redux";
import defaultProfile from "./../../../assets/profileDefault.png";
import MsgInp from "./MsgInp";
import { useEffect, useState } from "react";
import getAllMsg from "../../../ApiCalls/getAllMsg";
import { ColorRing } from "react-loader-spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import clearMsgCount from "../../../ApiCalls/clearMsgCount";
import seen from "./../../../assets/seen.svg";
import { updateChat } from "./../../../state/userSlice";

const ChatArea = ({ userDetails }) => {
  const { value, selectedChat, chats } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [msgLoader, setMsgLoader] = useState(false);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const chatUserDetails = userDetails.members.find((element) => {
    return element._id != value._id;
  });

  const formatTime = (timestamp) => {
    const currentTime = moment();

    const diff = moment(currentTime).diff(timestamp, "days");

    if (diff < 1) {
      return `Today ${moment(timestamp).format("hh:mm A")}`;
    } else if (diff === 1) {
      return `Yesterday ${moment(timestamp).format("hh:mm A")}`;
    } else {
      return moment(timestamp).format("DD MMM YYYY, hh:mm A");
    }
  };

  const getMessages = async () => {
    setMsgLoader(true);
    try {
      const response = await getAllMsg(selectedChat._id);
      if (response.status === 200) {
        setMessages(response.data.data);
        return setMsgLoader(false);
      }
      toast.error(response.response.data.message);
      navigate("/login");
      setMsgLoader(false);
    } catch (error) {
      toast.error(error.message);
      navigate("/login");
      setMsgLoader(false);
    }
  };

  const clearCount = async () => {
    try {
      const response = await clearMsgCount(selectedChat._id);

      if (response.status === 200) {
        const data = chats.map((chat) => {
          if (chat._id == response.data.data[0]._id) {
            return response.data.data[0];
          }

          return chat;
        });

        dispatch(updateChat(data));
      } else if (response.status === 401) {
        toast.error("please login again");
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    getMessages();
    if (selectedChat?.latestMessage?.sender !== value._id) {
      clearCount();
    }
  }, [selectedChat]);

  return (
    <div className="w-full h-full ">
      <nav className="w-full h-[50px] bg-purple flex items-center px-[1vw] gap-x-1">
        <figure className="w-[40px] h-[40px]">
          <img
            src={
              chatUserDetails.profile ? chatUserDetails.profile : defaultProfile
            }
            alt="profile"
            className="w-full h-full rounded-full  cursor-pointer"
          />
        </figure>

        {/* this section displays the user name and the user status and typing indicator */}
        <div className="flex-1  h-full flex justify-center flex-col name-email-list cursor-pointer ">
          <h1 className=" poppins-regular  text-white capitalize">
            {chatUserDetails.firstname + " " + chatUserDetails.lastname}
          </h1>
        </div>
      </nav>

      <main className="w-full h-[90%]">
        <div className="w-full h-[90%] px-6 overflow-auto">
          {msgLoader && (
            <div className="w-full h-full flex justify-center items-center">
              <ColorRing
                visible={true}
                height="40"
                width="40"
                ariaLabel="color-ring-loading"
                wrapperStyle={{}}
                wrapperClass="color-ring-wrapper"
                colors={["black", "black", "black", "black", "black"]}
              />
            </div>
          )}
          {!msgLoader &&
            messages.map((elem) => {
              const sender = elem.sender === value._id;
              return (
                <div
                  key={elem._id}
                  className={` w-full min-h-4 mt-[5px]   flex   flex-col ${
                    sender ? "items-end" : "items-start"
                  } `}
                >
                  <p
                    className={`max-w-[300px] p-1 px-2 rounded-md text-white flex flex-col ${
                      sender
                        ? "bg-purple rounded-br-[0px]"
                        : "bg-black rounded-bl-[0px]"
                    }`}
                  >
                    {" "}
                    {elem.text}
                  </p>
                  <p className="text-black text-[.8rem] flex items-center gap-[4px]">
                    {formatTime(elem.createdAt)}
                    {elem.read && elem.sender === value._id && (
                     <img src={seen} className="w-[14px] h-[14px]"/>
                    )}
                  </p>
                </div>
              );
            })}
        </div>
        <div className="flex justify-center items-center w-full h-[10%] ">
          <MsgInp />
        </div>
      </main>
    </div>
  );
};

export default ChatArea;
