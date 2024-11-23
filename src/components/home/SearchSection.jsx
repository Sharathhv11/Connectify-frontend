import React, { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";
import UserList from "./UserList";

const SearchSection = () => {
  const [searchKey, setSearchKey] = useState("");
  const [lastMsgRead,setLastMsgRead] = useState(false);
 
  const { allUsers, chats ,value} = useSelector((state) => state.user);




  const getSubHeader = (el) => {
    const result = chats.find((chat) => {
      return (
        chat.members.map((el) => el._id).includes(el._id) &&
        chat.members.map((el) => el._id).includes(value._id)
      );
    });

    if(result?.latestMessage){
      const messagePrefix = result.latestMessage.sender == value._id?"You: ":"";
      console.log(result);
      return <p className={`relative -top-[2px]  text-[0.8rem] ${result.latestMessage.sender != value._id && !result.latestMessage.read? "font-bold text-black":"text-[#666]"} `}>
        {
          `${messagePrefix} ${result.latestMessage.text?.substring(0,25)}...`
        }
      </p>;
    }else{
      return <p className="relative -top-[2px] text-[#666]   text-[0.8rem]">{el.email}</p>;
    }
  }

  //variable for counting the list size
  let count = 0;

  return (
    <div className="h-full w-full overflow-y-scroll">
      <div className=" w-full h-[15%] flex justify-center items-center ">
        <div className="mx-auto w-[90%]  px-3 h-[40px] border-[1px] border-black rounded-full flex justify-center items-center overflow-hidden">
          <input
            type="text"
            className="h-full w-[90%] border-none outline-none bg-transparent"
            placeholder="search users here"
            value={searchKey}
            onChange={(e) => setSearchKey(e.target.value)}
          />
          <button className="flex-1h-full flex justify-between items-center cursor-pointer ">
            <Search />
          </button>
        </div>
      </div>

      <div className="h-[85%] w-[90%] mx-auto  flex flex-col gap-y-2 ">
        {allUsers
          ?.reduce((acc, el) => {
            if (
              ((el.firstname.includes(searchKey) ||
                el.lastname.includes(searchKey)) &&
                searchKey) ||
              chats?.some((chat) =>
                chat.members.map((el) => el._id).includes(el._id)
              )
            ) {
              acc.push(el);
              count++;
            }

            return acc;
          }, [])
          .map((el, index) => {
            return (
                
              <div key={index} className=" h-[50px]">
                <UserList
                  id={el._id}
                  firstname={el.firstname}
                  subHeader={getSubHeader(el)}
                  profile={el.profile}
                  connected={chats.find((chat) => {
                    return chat.members.map((el) => el._id).includes(el._id);
                  })}
                />
                {index + 1 != count && <div className="w-full mx-auto h-[.1px] rounded-full bg-[#666]"/>}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default SearchSection;
