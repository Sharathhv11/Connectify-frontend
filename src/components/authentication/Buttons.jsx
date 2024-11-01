import React from "react";

const Buttons = ({handler,text}) => {
  return (
    <button
      className="bg-black text-white w-full h-[40px] rounded-sm flex justify-center items-center gap-x-5"
      onClick={handler}
    >
        {text}
    </button>
  );
};

export default Buttons;
