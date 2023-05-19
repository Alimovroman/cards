import React, { FC } from "react";
import style from "./Header.module.css";
import { useActions, useAppSelector } from "common/hooks";
import { authThunks } from "features/auth/auth.slice";
import { useNavigate } from "react-router-dom";

export const Header: FC = () => {
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
  const navigate = useNavigate();
  const {logout} = useActions(authThunks);
  const onNavigateToLogin = () => {
    navigate("/login");
  };
  const logoutHandler = () => {
    logout()
      .then(() => {
        navigate("/login");
      });
  };
  return (
    <div className={style.header}>
      <div>
        It-Incubator
      </div>
      <div>
        {isLoggedIn
          ? <button onClick={logoutHandler}>Logout</button>
          : <button onClick={onNavigateToLogin}>Login in</button>
        }

      </div>
    </div>
  );
};