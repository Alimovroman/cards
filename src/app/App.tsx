import React, { useEffect } from "react";
import { Counter } from "features/counter/Counter";
import "app/App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { authThunks } from "features/auth/auth.slice";
import style from "./App.module.css";
import LinearProgress from "@mui/material/LinearProgress";
import { Header } from "features/Header/Header";
import Packs from "components/Packs/Packs";
import { packsThunk } from "components/Packs/packs.slice";
import { isLoadingSelector } from "app/app.selector";

function App() {
  const isLoading = useAppSelector(isLoadingSelector);
  const dispatch = useAppDispatch();



  useEffect(() => {
    dispatch(authThunks.authMe())
      .then(() => {
      dispatch(packsThunk.fetchPacks({page:1}))
    })
  }, []);

  return (
    <div>
      <Header />
      {isLoading && <LinearProgress color="secondary" />}
      {/*<Packs />*/}
      <Outlet />
    </div>
  );
}

export default App;
