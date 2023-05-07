import React from "react";
import { useAppSelector } from "app/hooks";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

export const GlobalError = () => {
  const error = useAppSelector<string | null>((state) => state.app.error)
  if(error !== null) {
    toast.error(error)
  }
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
