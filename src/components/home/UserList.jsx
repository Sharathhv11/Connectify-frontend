import React from "react";
import profileDefault from "./../../assets/profileDefault.png";

const UserList = ({ firstname, email, profile }) => {
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
        <button className="border-[1.3px] p-2 rounded-full  border-black h-[50%] flex justify-center items-center font-mono ">connect</button>
      </div>
    </div>
  );
};

export default UserList;

{
  /* <div className="w-full h-[45px]flex justify-between items-center flex ">
      <div className="w-[70%] h-full flex ">
        <div className="w-[44px] h-[44px]">
          <figure className="w-full h-full">
            <img
              src={profile ?? profileDefault}
              alt=""
              className="w-full h-full rounded-full"
            />
          </figure>
        </div>
        <div className="w-[80%]  flex flex-col justify-center h-full bg-green-300">
          <h1>{firstname}</h1>
          <h5>{email}</h5>
        </div>
      </div>

      <button className="border-[1px] w-[90px] h-[28px] border-black px-3 rounded-full flex justify-center items-center poppins-light font-semibold">CONNECT</button> 

    </div> */
}
