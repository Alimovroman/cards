import React, { useEffect } from "react";
import styleAuth from "features/auth/Auth.module.css";
import { useAppDispatch } from "common/hooks";
import { authThunks } from "features/auth/auth.slice";
import { SubmitHandler, useForm } from "react-hook-form";
import { ArgRegisterType } from "features/auth/auth.api";
import { unHandleAction } from "common/actions/unhandle.action";
import { appActions } from "app/app.slice";

type DataFormType = ArgRegisterType & {
  passwordDupl: string
}
const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm<DataFormType>();
  const dispatch = useAppDispatch();
  const onSubmit: SubmitHandler<DataFormType> = dataForm => {
    if(dataForm.password === dataForm.passwordDupl) {
      const {email, password} = dataForm
      dispatch(authThunks.register({password, email}));
    } else {
      dispatch(appActions.setAppError({error: "the password must be the same" }))
    }

  };
  useEffect(() => {
    dispatch(unHandleAction())
  }, [])

  return (
    <div className={styleAuth.formContainer}>
      <form onSubmit={handleSubmit(onSubmit)} className={styleAuth.form}>
        <div className={styleAuth.title}>Register</div>
        <div>
          <input {...register("email", { required: true })} />
        </div>
        {errors.email && <span>This field is required</span>}
        <div>
          <input type={"password"} {...register("password", { required: true })} />
        </div>
        {errors.password && <span>This field is required</span>}
        <div>
          <input type={"password"} {...register("passwordDupl", { required: true })} />
        </div>
        {errors.passwordDupl && <span>This field is required</span>}
        <div>
          <button className={styleAuth.button}>Register</button>
        </div>
      </form>
    </div>
  );
};


export default Register;