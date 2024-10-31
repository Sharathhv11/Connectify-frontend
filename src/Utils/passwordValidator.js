function passwordValidarorErrorSetter(password,setErrorMsg) {
  if (
    (password.length < 8 || password.length > 32) &&
    password.length
  ) {
    setErrorMsg("Password must have 8-32 charecter only");
  } else {
    setErrorMsg(null);
  }
}


export function passwordValidator(password){
    return (password.length < 8 || password.length > 32);
}

export default passwordValidarorErrorSetter;
