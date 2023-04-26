import React from "react";
import style from "./Login.module.css";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";

const Login = () => {
  const dispatch = useAppDispatch();

  const loginHandler = () => {
    dispatch(authThunks.login({email :"alimov.ramon@gmail.com", password: "1a2s3d4f5g", rememberMe: false}))
  };
  return (
    <div>
      <h2>Login</h2>
      <button onClick={loginHandler}>Login</button>

    </div>
  );
};

export default Login;