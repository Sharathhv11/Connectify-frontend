import { useSelector } from "react-redux";
import defaultProfile from "./../../../assets/profileDefault.png";
import MsgInp from "./MsgInp";


const ChatArea = ({ userDetails }) => {
  const { value } = useSelector((state) => state.user);

  const chatUserDetails = userDetails.members.find((element) => {
    return element._id != value._id;
  });

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
        <div className="w-full h-[90%] ">

        </div>
        <div className="flex justify-center items-start w-full h-[10%] ">
          <MsgInp />
        </div>
      </main>
    </div>
  );
};

export default ChatArea;
