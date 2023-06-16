import React, { ChangeEvent, FC, useState } from "react";
import style from "./AddNewCard.module.css";
import CloseIcon from "@mui/icons-material/Close";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";

type Props = {
  callBack: (question: string, answer: string) => void
  closeWindow: () => void
}
export const AddNewCard: FC<Props> = ({callBack, closeWindow}) => {
  const [valueQuestion, setValueQuestion] = useState('')
  const [valueAnswer, setValueAnswer] = useState('')

  const onChangeValueQuestion = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValueQuestion(e.currentTarget.value)
  }
  const onChangeValueAnswer = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValueAnswer(e.currentTarget.value)
  }
  const addNewCardHandler = () => {
    callBack(valueQuestion, valueAnswer);
  };

  return (
    <div className={style.rootWrapper}>
      <div className={style.root}>
        <div className={style.header}>
          <div>Add new Card</div>
          <button onClick={closeWindow} className={style.buttonClose}>
            <CloseIcon />
          </button>
        </div>
        <div className={style.textFieldWrapper}>
          <TextField
            id="standard-read-only-input"
            label="Question"
            defaultValue="Name question"
            variant="standard"
            value={valueQuestion}
            onChange={onChangeValueQuestion}
            className={style.textField}
          />
          <TextField
            id="standard-read-only-input"
            label="Answer"
            defaultValue="Answer"
            variant="standard"
            value={valueAnswer}
            onChange={onChangeValueAnswer}
            className={style.textField}
          />
        </div>

        <div className={style.buttonsBlock}>
          <Button variant="outlined" size="small" onClick={closeWindow} className={style.buttonCansel}>
            Cansel
          </Button>
          <Button variant="contained" size="small" onClick={addNewCardHandler} className={style.buttonSave}>
            Add new card
          </Button>
        </div>
      </div>
    </div>
  );
};

