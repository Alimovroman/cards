import React, { FC, ReactNode } from "react";
import style from "./Modal.module.css";
import CloseIcon from "@mui/icons-material/Close";
import Button from "@mui/material/Button";

type Props = {
  nameButton: string
  description: string
  children: ReactNode
  closeModal: () => void
  callback: () => void
}

export const Modal: FC<Props> = ({ closeModal, children, description, nameButton, callback }) => {
  const callbackHandler = () => {
    callback()
  }
  return (
    <div className={style.rootWrapper}>
      <div className={style.root}>
        <div className={style.header}>
          <div>{description}</div>
          <button onClick={closeModal} className={style.buttonClose}>
            <CloseIcon />
          </button>
        </div>
        <div className={style.textFieldWrapper}>
          {children}
        </div>
        <div className={style.buttonsBlock}>
          <Button variant="outlined" size="small" onClick={closeModal} className={style.buttonCansel}>
            Cansel
          </Button>
          <Button variant="contained" size="small" onClick={callbackHandler} className={style.buttonSave}>
            {nameButton}
          </Button>
        </div>
      </div>
    </div>
  );
};
