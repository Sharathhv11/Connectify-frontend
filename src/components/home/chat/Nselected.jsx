import logo from "./../../../assets/logo/connectify.png";

function NotSelected() {
  return (
    <>
      <div className="w-full h-full flex justify-center items-center flex-col">
        <div className="w-60 h-52">
          <img src={logo} alt="connectiy" className="w-full h-full" />
        </div>
        <div className="min-w-max ">
            <h1 className="text-center no-selected-header poppins-bold capitalize">Connect, respect, engage</h1>
            <p className="text-center card-text w-3/4 mx-auto">select a chat to start a meaningful conversation while maintaing mutual respect</p>
        </div>
      </div>
    </>
  );
}

export default NotSelected;
