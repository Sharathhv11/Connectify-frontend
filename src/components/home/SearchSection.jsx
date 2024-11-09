import React, { useState } from "react";
import { Search } from "lucide-react";
import { useSelector } from "react-redux";
import UserList from "./UserList";

const SearchSection = () => {
  const [searchKey, setSearchKey] = useState("");
  let count = 0;

  const { allUsers } = useSelector((state) => state.user);

  return (
    <div className="h-full w-full ">
      <div className=" w-full h-[15%] flex justify-center items-center">
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

      <div className="h-[85%] w-[90%] mx-auto  flex flex-col gap-y-2">
        {allUsers
          ?.filter((el) => {
            return (
              (el.firstname.includes(searchKey) ||
              el.lastname.includes(searchKey)) && searchKey
            );
          })
          .map((el, index) => {
            return (
              <>
                <UserList
                  firstname={el.firstname}
                  email={el.email}
                  key={index}
                />
         
              </>
            );
          })}
      </div>
    </div>
  );
};

export default SearchSection;
