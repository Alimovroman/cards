import React, { useEffect, useState } from "react";
import { Counter } from "features/counter/Counter";
import "app/App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { authThunks } from "features/auth/auth.slice";
import style from "./App.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import { Header } from "features/Header/Header";
import { packsThunk } from "features/Packs/service/packs.slice";
import { isLoadingSelector } from "app/app.selector";
import { isLoggedInSelector } from "features/auth/auth.selector";

function App() {
  const isLoading = useAppSelector(isLoadingSelector);
  const isLoggedIn = useAppSelector(isLoggedInSelector)
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  // const [isNavigateToCard, setIsNavigateToCard] = useState(false)

  console.log(isLoggedIn);

  // const navigateToCardHandler = () => {
  //   setIsNavigateToCard(true)
  //   navigate('/packs')
  // }

  useEffect(() => {
    dispatch(authThunks.authMe())
      .then(() => {
      dispatch(packsThunk.fetchPacks({page:1}))
    })
  }, []);
  useEffect(() => {
    if (!isLoggedIn) {
      //   navigate('/login')
      console.log(isLoggedIn, 'App');
      navigate('/login')
    } else {
      navigate('/packs')
    }

  },[isLoggedIn])

  return (
    <div>
      <Header />
      {isLoading && <LinearProgress color="secondary" />}
      {/*{!isNavigateToCard && <button onClick={navigateToCardHandler}>Перейти к карточкам</button>}*/}
      <Outlet />
    </div>
  );
}

export default App;
