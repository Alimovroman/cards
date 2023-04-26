import React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "components/Login/Login";
import Register from "components/Register/Register";
import CheckEmail from "components/CheckEmail/CheckEmail";
import SetNewPassword from "components/SetNewPassword/SetNewPassword";
import ForgotPassword from "components/ForgotPassword/ForgotPassword";
import Profile from "components/Profile/Profile";
import Packs from "components/Packs/Packs";
import Cards from "components/Cards/Cards";
import Learn from "components/Learn/Learn";

const container = document.getElementById("root")!;
const root = createRoot(container);

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "login/",
        element: <Login />
      },
      {
        path: "register/",
        element: <Register />
      },
      {
        path: "check-email",
        element: <CheckEmail />
      },
      {
        path: "set-new-password",
        element: <SetNewPassword />
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />
      },
      {
        path: "profile",
        element: <Profile />
      },
      {
        path: "packs",
        element: <Packs />
      },
      {
        path: "cards",
        element: <Cards />
      },
      {
        path: "learn",
        element: <Learn />
      }

    ]
  }
]);

root.render(
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
