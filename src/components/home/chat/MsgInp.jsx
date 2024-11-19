import { Send } from "lucide-react";
import { useState} from "react";
import sendMessage from "../../../ApiCalls/message";
import { useSelector } from "react-redux";

const MsgInp = () => {
  const [msg, setMsg] = useState("");

  const { selectedChat,value} = useSelector(state => state.user);

  const newMessage = async () => {
    if(!msg){
        return ;
    }
    try {
        const response = await  sendMessage({
            chatID : selectedChat._id,
            sender : value._id,
            text : msg
        });


        if(response.status === 201){
          return setMsg("");
        }


    } catch (error) {
        
    }
  }


  return (
    <div className="w-[95%] h-[90%] border-[.1px] border-black rounded-full flex justify-between items-center px-2 focus-within:border-purple focus-within:border-[1.4px] ">
      <input
        type="text"
        placeholder="Say something..."
        className="outline-none bg-transparent w-[95%]  h-full px-2"
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value);
        }}
      />
      <div className="flex-1 h-full grid place-items-center">
        <button className="bg-purple rounded-full w-10 h-8 text-white flex justify-center items-center" onClick={newMessage}>
          {<Send />}
        </button>
      </div>
    </div>
  );
};

export default MsgInp;
