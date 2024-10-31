import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import logo from "./../../assets/logo/connectify.png";
import {
  MemoizedEmailInput as Email,
  MemoizedInput as Input,
  MemoizedPassword as Password,
} from "./Input";
import passwordValidarorErrorSetter, {
  passwordValidator,
} from "../../Utils/passwordValidator";
import validateEmailErrorSetter, {
  validateEmail,
} from "../../Utils/emailValidator";
import client from "../../axiosClient";
import { ColorRing } from "react-loader-spinner";
import toast from "react-hot-toast";

const Signup = () => {
  //?state that takes maintains the data of user registration
  const [userDetails, setUserDetails] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });

  const [signUp, setSignUp] = useState(true);

  const [errorState, setErrors] = useState("");

  useEffect(() => {
    const clearFunc = setTimeout(() => {
      validateEmailErrorSetter(userDetails.email, setErrors);
    }, 500);

    return () => {
      clearTimeout(clearFunc);
    };
  }, [userDetails.email]);

  const handelUserDetails = (e) => {
    setUserDetails({
      ...userDetails,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const validate = setTimeout(() => {
      passwordValidarorErrorSetter(userDetails.password, setErrors);
    }, 500);

    return () => {
      clearTimeout(validate);
    };
  }, [userDetails.password]);

  const handelOnSubmit = async () => {
    if (!userDetails.firstname.trim()) {
      return setErrors("Please fill firstname");
    } else if (!userDetails.lastname.trim()) {
      return setErrors("Please fill lastname");
    } else if (!validateEmail(userDetails.email)) {
      return setErrors("Invalid email address");
    } else if (passwordValidator(userDetails.password)) {
      return setErrors("Password must have 8-32 charecter only");
    } else {
      try {
        setSignUp(false);
        const postRequest = await client.post("/auth/signUp", userDetails);
        toast.success(postRequest.data.message);
        
      } catch (error) {
        console.log(error.response.data.message);
        toast.error(error.response.data.message);
      }
    }
    setSignUp(true);
  };

  return (
    <>
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
            <h1 className="poppins-regular w-full text-center">Sign up</h1>
            <p className="poppins-light text-center">
              Get started – sign up for full access!
            </p>
          </div>

          <form className="flex flex-col h-[45%] justify-center gap-y-5 ">
            <div className="flex justify-center items-center w-full gap-x-3 ">
              <Input
                type="text"
                placeholder={"FirstName"}
                name={"firstname"}
                value={userDetails.firstname}
                onchange={handelUserDetails}
              />

              <Input
                type="text"
                placeholder={"LastName"}
                name={"lastname"}
                value={userDetails.lastname}
                onchange={handelUserDetails}
              />
            </div>

            <Email value={userDetails.email} onchange={handelUserDetails} />
            <Password
              value={userDetails.password}
              onchange={handelUserDetails}
            />
          </form>

          <button
            className="bg-black text-white w-full h-[40px] rounded-sm flex justify-center items-center gap-x-5"
            onClick={handelOnSubmit}
          >
            {signUp && "Sign Up"}
            {!signUp && (
              <>
                <ColorRing
                  visible={true}
                  height="25"
                  width="25"
                  ariaLabel="color-ring-loading"
                  wrapperStyle={{}}
                  wrapperClass="color-ring-wrapper"
                  colors={[
                    "white",
                    "white",
                    "white",
                    "white",
                    "white",
                  ]}
                />
                <p>Registering</p>
              </>
            )}
          </button>

          <div className="w-full  flex justify-center h-10 items-center">
            <p>
              Already have an account?
              <Link to="/login" className="text-[#655bf3]">
                Login
              </Link>
            </p>
          </div>
        </div>
        <div className="min-w-max h-6">
          {errorState && <p className="text-red-600">{errorState}</p>}
        </div>
      </main>
    </>
  );
};

export default Signup;

{
  /* */
}
