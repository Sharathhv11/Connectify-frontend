import React, { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

const Input = ({ type, name, placeholder,value,onchange }) => {
  return (
    <>
      <div className={`w-1/2  inp-container`}>
        <input
          type={type}
          name={name}
          id={name}
          className="w-full h-8 p-1 border-none outline-none bg-transparent custome-inputs poppins-medium"
          placeholder={placeholder}
          value={value}
          onChange={onchange}
        />
      </div>
    </>
  );
};

const EmailInput = ({value,onchange}) => {
  return (
    <div className="w-full flex flex-col inp-container-full ">
      <input
        type="email"
        name="email"
        id="email"
        className="p-1 h-10 outline-none border-none bg-transparent custome-inputs poppins-medium"
        placeholder="Enter your email"
        value={value}
        onChange={onchange}
      />
    </div>
  );
};

const Password = ({value,onchange}) => {
  const [passwordStatus, setPasswordStatus] = useState("password");

  const passwordStateChange = (e) => {
    e.preventDefault();

    setPasswordStatus((prevStatus) =>
      prevStatus === "password" ? "text" : "password"
    );
  };
  return (
    <div className="w-full flex flex-col inp-container-full ">
      <div className="w-full h-full flex justify-between items-center">
        <input
          type={passwordStatus}
          name="password"
          id="password"
          className="poppins-medium h-10 outline-none border-none p-1  w-[90%] custome-inputs bg-transparent"
          placeholder="Enter your Password"
          value={value}
          onChange={onchange}
        />
        <button
          className="w-[10%] h-full  grid place-items-center hover:cursor-pointer"
          type="button"
          onClick={passwordStateChange}
        >
          {passwordStatus === "password" && (
            <EyeOff size={20} strokeWidth={2} />
          )}
          {passwordStatus === "text" && <Eye size={20} strokeWidth={2} />}
        </button>
      </div>
    </div>
  );
};

export const MemoizedInput = React.memo(Input);
export const MemoizedEmailInput = React.memo(EmailInput);
export const MemoizedPassword = React.memo(Password);
