import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { appActions } from "app/app.slice";

export const GlobalError = () => {
  const error = useAppSelector<string | null>((state) => state.app.error)
  const dispatch = useAppDispatch()
  if(error !== null) {
    toast.error(error)
  }
  useEffect(() => {
    setTimeout(() => {
      dispatch(appActions.setAppError({error: null}))
    }, 2000)
  }, [error])
  return (
    <ToastContainer
      position="top-right"
      autoClose={5000}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="colored"
    />
  );
};
