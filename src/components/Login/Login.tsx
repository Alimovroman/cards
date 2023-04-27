import React from "react";
import style from "./Login.module.css";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArgLoginType } from "features/auth/auth.api";

const Login = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ArgLoginType>();

  const onSubmit: SubmitHandler<ArgLoginType> = data => {
    console.log(data);
    dispatch(authThunks.login(data));
  };

  // const loginHandler = () => {
  //   dispatch(authThunks.login({email :"alimov.ramon@gmail.com", password: "1a2s3d4f5g", rememberMe: false}))
  // };
  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register("email", { required: true })} />
        </div>
        {errors.email && <span>This field is required</span>}
        <div>
          <input type={"password"} {...register("password", { required: true })} />
        </div>
        {errors.password && <span>This field is required</span>}
        <div>
          <input type={"checkbox"} {...register("rememberMe")} /><span>RememberMe</span>
        </div>
        <div>
          <button>Login</button>
        </div>
      </form>

    </div>
  );
};


export default Login;

