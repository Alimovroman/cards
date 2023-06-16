import React, { ChangeEvent, FC, MouseEvent, useState } from "react";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import style from "./AddNewPack.module.css";
import CloseIcon from '@mui/icons-material/Close';

type Props = {
  closeWindow: () => void
  callBack: (newCard: string) => void
}

export const AddNewPack: FC<Props> = ({ closeWindow, callBack }) => {
  const [value, setValue] = useState("");

  const addNewPackHandler = () => {
    callBack(value);
  };
  const onChangeValue = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValue(e.currentTarget.value);
  };
  return (
    <div className={style.rootWrapper}>
      <div className={style.root}>
        <div className={style.header}>
          <div>Add new Pack</div>
          <button onClick={closeWindow} className={style.buttonClose}>
            <CloseIcon />
          </button>
        </div>
        <div className={style.textFieldWrapper}>
          <TextField
            id="standard-read-only-input"
            label="Name Pack"
            defaultValue="Name Pack"
            variant="standard"
            value={value}
            onChange={onChangeValue}
            className={style.textField}
          />
        </div>
        <div>
          <FormControlLabel className={style.checkBox} control={<Checkbox defaultChecked />} label="Private pack" />
        </div>
        <div className={style.buttonsBlock}>
          <Button variant="outlined" size="small" onClick={closeWindow} className={style.buttonCansel}>
            Cansel
          </Button>
          <Button variant="contained" size="small" onClick={addNewPackHandler} className={style.buttonSave}>
            Save
          </Button>
        </div>
      </div>
    </div>
  );
};

