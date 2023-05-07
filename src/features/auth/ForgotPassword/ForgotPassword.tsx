import React from "react";
import { useAppDispatch } from "common/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { authThunks } from "features/auth/auth.slice";
import styleAuth from "features/auth/Auth.module.css";

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<{ email: string }>();

  const onSubmit: SubmitHandler<{ email: string }> = data => {
    console.log(data.email);
    dispatch(authThunks.forgot({
      email: data.email,
      message: "test-front-admin <ai73a@yandex.by>",
      from: `<div style="background-color: lime; padding: 15px">
          password recovery link: 
          <a href="http://localhost:3000/#/set-new-password/$token$">
          link</a>
          </div>`
    }));

  };
  return (
    <div className={styleAuth.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styleAuth.form}>
        <div className={styleAuth.title}>forgot password</div>
        <div>
          <input {...register("email", { required: true })} />
        </div>
        {errors.email && <span>This field is required</span>}
        <div>
          <button className={styleAuth.button}>Send</button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;