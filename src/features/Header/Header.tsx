import React, { FC } from "react";
import style from "./Header.module.css";
import { useAppSelector } from "common/hooks";
import { isLoggedInSelector } from "features/auth/auth.selector";
import { useNavigate } from "react-router-dom";
import { UserMenu } from "features/Header/UserMenu";



export const Header: FC = () => {
  const isLoggedIn = useAppSelector(isLoggedInSelector);
  const navigate = useNavigate();


  const onNavigateToLogin = () => {
    navigate("/login");
  };

  return (
    <div className={style.header}>
      <div>
        IT-INCUBATOR
      </div>
      <div >
        {isLoggedIn
          ? <UserMenu />
          : <button onClick={onNavigateToLogin}>Login in</button>
        }
      </div>
    </div>
  );
};