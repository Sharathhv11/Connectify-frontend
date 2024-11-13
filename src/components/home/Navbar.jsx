import React, { useState } from "react";
import logo from "./../../assets/logo/connectify2.png";
import { useSelector } from "react-redux";
import defaultProfile from "./../../assets/profileDefault.png"

const Navbar = () => {

  const { value } = useSelector((state) => state.user);
  return (
    <nav className="w-full h-[70px] bg-black flex justify-between items-center px-[30px]  gap-x-[50px]">
      <div className="nav-logo w-[200px] h-full ">
        <figure className="w-full  h-full sd:max-sm:h-5/6 sd:max-sm:w-5/6 relative top-2">
          <img
            src={logo}
            alt="connectify"
            className="w-full - h-full object-contain"
          />
        </figure>
      </div>

      <div className="text-white flex justify-center items-center gap-x-2 cursor-pointer">
        <figure className="w-[30px] h-full">
          <img src={value?.profile??defaultProfile} alt={""}  className="h-full w-full object-cover rounded-3xl "/>
        </figure>
        <h1 className="poppins-regular">
          {value?.firstname[0].toUpperCase() +
            value?.firstname.slice(1) +
            " " +
            value?.lastname.toUpperCase()}
        </h1>
      </div>
    </nav>
  );
};

export default Navbar;
