const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function validateEmailErrorSetter(email, setErrorMsg) {
  if (!emailRegex.test(email) && email.trim() !== "") {
    setErrorMsg("Please enter the valid email");
  } else {
    setErrorMsg("");
  }
}


export function validateEmail(email){
  return  emailRegex.test(email)&& email.length>0 ;
}

export default validateEmailErrorSetter;
