import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectRoute = ({children}) => {

    const navigate = useNavigate();
    useEffect(()=>{
        if(localStorage.getItem("token")){
                      //logic to fetch the user details
        }else{
            navigate("/login");
        }
    },[]);

    return <>{children}</>;
}

export default ProtectRoute;
