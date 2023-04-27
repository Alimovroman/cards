import React, { useEffect } from "react";
import { Counter } from "./features/counter/Counter";
import "./App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { appActions } from "app/app.slice";
import { authApi } from "features/auth/auth.api";
import { authThunks } from "features/auth/auth.slice";

function App() {
  const isLoading = useAppSelector<boolean>(state => state.app.isLoading)
  const dispatch = useAppDispatch()

  const logoutHandler = () => {
    dispatch(authThunks.logout())
  }

  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setIsloading({isLoading: false}))
    }, 3000)
  }, [])
  return (
    <div>
      <div>
        <button onClick={logoutHandler}>Logout</button>
      </div>
      <Outlet />
      ss

    </div>
  );
}

export default App;
