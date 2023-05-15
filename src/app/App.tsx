import React, { useEffect } from "react";
import { Counter } from "features/counter/Counter";
import "app/App.css";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { authThunks } from "features/auth/auth.slice";
import style from "./App.module.css";
import LinearProgress from "@mui/material/LinearProgress";

function App() {
  const isLoading = useAppSelector<boolean>(state => state.app.isLoading);
  const isLoggedIn = useAppSelector<boolean>(state => state.auth.isLoggedIn);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onNavigateToLogin = () => {
    navigate("/login");
  };
  const logoutHandler = () => {
    dispatch(authThunks.logout())
      .then(() => {
        navigate("/login");
      });
  };
  useEffect(() => {
    dispatch(authThunks.authMe());
  }, []);

  return (
    <div>
      <div className={style.header}>
        <div>
          Logo
        </div>
        <div>
          {isLoggedIn
            ? <button onClick={logoutHandler}>Logout</button>
            : <button onClick={onNavigateToLogin}>Login in</button>
          }

        </div>
      </div>

      {isLoading && <LinearProgress color="secondary" />}
      <Outlet />
      <Counter />

    </div>
  );
}

export default App;
