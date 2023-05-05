import React, { useEffect } from "react";
import { Counter } from "features/counter/Counter";
import "app/App.css";
import { Outlet, Route, Routes } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "app/hooks";
import { appActions } from "app/app.slice";
import { authThunks } from "features/auth/auth.slice";
import style from './App.module.css'

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
      <div className={style.header}>
        <div>
          Logo
        </div>
        <div>
          <button onClick={logoutHandler}>Logout</button>
        </div>
      </div>

      {isLoading && <h1>Loading...</h1>}
      <Outlet />
      <Counter />

    </div>
  );
}

export default App;
