import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { ArgLoginType, ProfileType } from "features/auth/auth.api";
import { authThunks } from "features/auth/auth.slice";
import { SubmitHandler, useForm } from "react-hook-form";

const Profile = () => {
  const profile = useAppSelector<ProfileType | null>(state => state.auth.profile)
  const dispatch = useAppDispatch();
  const { register, handleSubmit, watch, formState: { errors } } = useForm<{ name: string }>();

  const onSubmit: SubmitHandler<{ name: string }> = data => {
    console.log(data);
    dispatch(authThunks.changeName({ name: data.name }))

  };

  useEffect(() => {
    dispatch(authThunks.authMe())
  }, [])
  if (!profile) {
    return null
  }
  return (
    <div>
      profile
      <h2>{profile.name}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <input {...register("name", { required: true })} />
        </div>
        {errors.name && <span>This field is required</span>}

        <div>
          <button>Change name</button>
        </div>
      </form>
    </div>
  );
};

export default Profile;