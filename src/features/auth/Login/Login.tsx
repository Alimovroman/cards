import React from "react";
import styleAuth from 'features/auth/Auth.module.css';
import style from 'features/auth/Login/Login.module.css';
import { useActions } from "common/hooks";
import { authThunks } from "features/auth/auth.slice";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArgLoginType } from "features/auth/auth.api";
import { toast } from "react-toastify";
import { NavLink, useNavigate } from "react-router-dom";

const Login = () => {
  const {login} = useActions(authThunks)
  const { register, handleSubmit, watch, formState: { errors } } = useForm<ArgLoginType>();
  const navigate = useNavigate()

  const onNavigateToSignUp = () => {
    navigate('/register')
  }

  const onSubmit: SubmitHandler<ArgLoginType> = data => {
    login(data)
      .unwrap()
      .then((res) => {
        toast.success("Вы успешно залогинились")
        setTimeout(() => {
          navigate('/packs')
        }, 1500)

      })
      .catch((err) => {
        toast.error(err.e.response.data.error)
      })
  };

  return (
    <div className={styleAuth.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styleAuth.form}>
        <div className={styleAuth.title}>Login</div>
        <div>
          <input {...register("email", { required: true })} />
        </div>
        {errors.email && <span>This field is required</span>}
        <div>
          <input type={"password"} {...register("password", { required: true })} />
        </div>
        {errors.password && <span>This field is required</span>}
        <div className={style.checkBox}>
          <input type={"checkbox"} {...register("rememberMe")} /><span>RememberMe</span>
        </div>
        <div>
          <NavLink to={"/forgot-password"} >
            Forgot password?
          </NavLink>
        </div>
        <div>
          <button className={styleAuth.button}>Login</button>
        </div>
      </form>
      {/*<div>*/}
      {/*  <button onClick={}>Forgot password?</button>*/}
      {/*</div>*/}
        <div>
          <button onClick={onNavigateToSignUp}>Sign up</button>
        </div>
    </div>
  );
};


export default Login;

