import React from "react";
import style from "./Register.module.css";
import { useAppDispatch } from "app/hooks";
import { authThunks } from "features/auth/auth.slice";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArgRegisterType } from "features/auth/auth.api";


const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ArgRegisterType>();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<ArgRegisterType> = data => {
    console.log(data);
    dispatch(authThunks.register(data));
  };

  return (
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
        <button>Register</button>
      </div>
    </form>
  );
};


export default Register;