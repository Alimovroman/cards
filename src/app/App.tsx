import React, { useEffect, useState } from "react";
import { Counter } from "features/counter/Counter";
import "app/App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useActions, useAppDispatch, useAppSelector } from "common/hooks";
import { authActions, authThunks } from "features/auth/auth.slice";
import style from "./App.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import { Header } from "features/Header/Header";
import { packsThunk } from "features/Packs/service/packs.slice";
import { isLoadingSelector } from "app/app.selector";
import { isInitializedSelector, isLoggedInSelector } from "features/auth/auth.selector";
import { CircularProgress } from "@mui/material";


function App() {
  const isLoading = useAppSelector(isLoadingSelector);
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const isInitialized = useAppSelector(isInitializedSelector)
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  const {initializeApp} = useActions(authActions)

  useEffect(() => {
    dispatch(authThunks.authMe())
      .then(() => {
      dispatch(packsThunk.fetchPacks({page:1}))
    })
    dispatch(initializeApp())
  }, []);

  useEffect(() => {
    if (isInitialized) {
      if (!isLoggedIn) {
        navigate('/login')
      } else {
        navigate('/packs')
      }
    }
  },[isInitialized, isLoggedIn])

  if (!isInitialized) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }

  return (
    <div>
      <Header />
      {isLoading && <LinearProgress color="secondary" />}
      <Outlet />
    </div>
  );
}

export default App;
