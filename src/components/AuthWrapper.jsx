import React from 'react'
import {  useSelector } from "react-redux";
import { Navigate } from 'react-router-dom';

const AuthWrapper = ({children}) => {

     const {user} = useSelector((state) => state.authReducer);

     if (!user?._id) {
        return <Navigate to={"/login"} replace={true}/>
     }

    

  return (
    <div>{children}</div>
  )
}

export default AuthWrapper