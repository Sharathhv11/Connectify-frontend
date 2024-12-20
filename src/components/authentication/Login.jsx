import React, { useState, useEffect } from "react";
import logo from "./../../assets/logo/connectify.png";
import {
  MemoizedEmailInput as Email,
  MemoizedInput as Input,
  MemoizedPassword as Password,
} from "./Input";
import Buttons from "./Buttons";
import passwordValidarorErrorSetter, {
  passwordValidator,
} from "../../Utils/passwordValidator";
import validateEmailErrorSetter, {
  validateEmail,
} from "../../Utils/emailValidator";
import { Link } from "react-router-dom";
import { ColorRing } from "react-loader-spinner";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import loginClient from "../../ApiCalls/loginClient";

const Login = () => {

  const navigate = useNavigate();

  const [errorState, setErrors] = useState("");

  const [userDetails, setUserDetails] = useState({
    email: "",
    password: "",
  });

  const [login, setLogin] = useState(true);

  const handelUserDetails = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const clearFunc = setTimeout(() => {
      validateEmailErrorSetter(userDetails.email, setErrors);
    }, 500);

    return () => {
      clearTimeout(clearFunc);
    };
  }, [userDetails.email]);

  useEffect(() => {
    const validate = setTimeout(() => {
      passwordValidarorErrorSetter(userDetails.password, setErrors);
    }, 500);

    return () => {
      clearTimeout(validate);
    };
  }, [userDetails.password]);




  const handelOnSubmit = async () => {
     if (!validateEmail(userDetails.email.trim())) {
      return setErrors("Invalid email address");
    } else if (passwordValidator(userDetails.password.trim())) {
      return setErrors("Password must have 8-32 charecter only");
    } else{
      try {

        setLogin(false);
        const loginDetails = await loginClient(userDetails);

        if(loginDetails.status === 400 ){
          setLogin(true);
          return toast.error(loginDetails.response.data.message);
        }

        toast.success(loginDetails.data.message);

        localStorage.setItem("token",loginDetails.data.token);

        navigate("/");


      } catch (error) {
        setLogin(true);
        toast.error(loginDetails.response.data.message);
      }

    }

    setLogin(true);
  };

  return (
    <main className="w-full h-full flex justify-center items-center flex-col gap-2 min-w-max bg-background">
      <div className="w-4/5 min-w-[300px] max-w-[450px] h-[475px] sign-container rounded-lg p-3 bg-white">
        <div className="w-full h-[25%] ">
          <figure className="h-full w-1/2 m-auto">
            <img
              src={logo}
              alt="connectify"
              className="w-full h-full object-contain
              "
            />
          </figure>
        </div>

        <div className="w-full ">
          <h1 className="poppins-regular w-full text-center">Login</h1>
          <p className="poppins-light text-center">
            Get started – Login for full access!
          </p>
        </div>

        <form className="flex flex-col h-[45%] justify-center gap-y-5 ">
          <Email value={userDetails.email} onchange={handelUserDetails} />

          <div className="relative">

          <Password value={userDetails.password} onchange={handelUserDetails} />
          <div className="w-full text-right absolute text-[#655bf3]">
          <Link to="/forgot-password">forgot password?</Link>
        </div>
          </div>

        </form>
       



        {login && <Buttons handler={handelOnSubmit} text={"Log in"} />}
        {!login && (
          <Buttons
            handler={handelOnSubmit}
            text={
              <>
                <ColorRing
                  visible={true}
                  height="25"
                  width="25"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={["white", "white", "white", "white", "white"]}
                />
                <p>Authenticating</p>
              </>
            }
          />
        )}

        <div className="w-full  flex justify-center h-10 items-center">
          <p>
            Don't have an account?
            <Link to="/sign-up" className="text-[#655bf3]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
      <div className="min-w-max h-6">
        {errorState && <p className="text-red-600">{errorState}</p>}
      </div>
    </main>
  );
};

export default Login;
