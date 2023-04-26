import React from "react";
import style from './Register.module.css'
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";

const Register = () => {
  const dispatch = useAppDispatch();
  const registerHandler = () => {
    dispatch(authThunks.register({email :"alimov.ramon@gmail.com", password: "1a2s3d4f5g"}))
  }
  return (
    <div className={style.container}>
      <h1>Register</h1>
      <button onClick={registerHandler}>register</button>
    </div>
  );
};

export default Register;