import React from "react";
import { useAppDispatch } from "app/hooks";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArgLoginType, DataForgot } from "features/auth/auth.api";
import { authThunks } from "features/auth/auth.slice";

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
    <div>
      forgot-password
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register("email", { required: true })} />
        </div>
        {errors.email && <span>This field is required</span>}
        <div>
          <button>Send</button>
        </div>
      </form>
    </div>
  );
};

export default ForgotPassword;