import { useSelector } from "react-redux";
import defaultProfile from "./../../../assets/profileDefault.png";
import MsgInp from "./MsgInp";
import { useEffect, useState } from "react";
import getAllMsg from "../../../ApiCalls/getAllMsg";
import { ColorRing } from "react-loader-spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const ChatArea = ({ userDetails }) => {
  const { value, selectedChat } = useSelector((state) => state.user);
  const [msgLoader, setMsgLoader] = useState(false);
  const [messages, setMessages] = useState([]);
  const navigate = useNavigate();

  const chatUserDetails = userDetails.members.find((element) => {
    return element._id != value._id;
  });

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

  useEffect(() => {
    getMessages();
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
              return <div key={elem._id} className={` w-full min-h-4 mt-[5px]   flex ${sender?"justify-end":"justify-start"}`}>
                <p className={`max-w-[300px] p-1 px-2 rounded-md text-white  ${sender?"bg-purple rounded-br-[0px]":"bg-black rounded-bl-[0px]"}`}> {elem.text}</p>
                </div>;
            })
            }

        </div>
        <div className="flex justify-center items-start w-full h-[10%] ">
          <MsgInp />
        </div>
      </main>
    </div>
  );
};

export default ChatArea;



