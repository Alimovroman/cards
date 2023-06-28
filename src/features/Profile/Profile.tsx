import React, { ChangeEvent, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import {ProfileType } from "features/auth/auth.api";
import { authThunks } from "features/auth/auth.slice";
import { Modal } from "features/Cards/components/Modal/Modal";
import TextField from "@mui/material/TextField";
import { styleChildren } from "features/Cards/components/Cards";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import style from "features/Profile/Profile.module.css";

const Profile = () => {
  const profile = useAppSelector<ProfileType | null>(state => state.auth.profile);
  const dispatch = useAppDispatch();
  const [isChangeName, setIsChangeName] = useState(false);
  const [valueNewName, setValueNewName] = useState('')

  const onChangeValueName = (e: ChangeEvent<HTMLInputElement>) => {
    setValueNewName(e.currentTarget.value)
  }
  const changeNameHandler = () => {
    setIsChangeName(!isChangeName)
  }
  const changeNameCallback = () => {
    changeNameHandler()
    dispatch(authThunks.changeName({ name: valueNewName }))
      .unwrap()
      .then(() => {
        dispatch(authThunks.authMe())
      });
  }
  useEffect(() => {
    dispatch(authThunks.authMe());
  }, []);
  useEffect(() => {
    if (profile) {
      setValueNewName(profile.name)
    }
  },[profile])
  if (!profile) {
    return null;
  }
  return (
    <div className={style.root}>
      <div>
        <Avatar sx={{width: '250px', height: '250px'}} alt="Remy Sharp" src="https://mir-s3-cdn-cf.behance.net/projects/original/ab3ece32779061.Y3JvcCwxMjY5LDk5MiwyNTUsMTI0.jpg" />
      </div>
      <div className={style.nameBlock}>
        <h2>{profile.name}</h2>
        {isChangeName &&
          <Modal nameButton={"Change Name"} description={"Change Name"} closeModal={changeNameHandler} callback={changeNameCallback}>
            <div>
              <TextField
                sx={styleChildren}
                id="standard-read-only-input"
                label="New name"
                defaultValue="New name"
                variant="standard"
                value={valueNewName}
                onChange={onChangeValueName}
              />
            </div>
          </Modal>
        }
        <div>
          <Button onClick={changeNameHandler} variant="contained">Change name</Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;