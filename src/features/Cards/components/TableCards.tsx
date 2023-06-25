import React, { ChangeEvent, FC, useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import style from "./Cards.module.css";
import updateIcon from "common/images/update_icon.svg";
import removeIcon from "common/images/remove_icon.svg";
import { CardType } from "features/Cards/service/cards.api.types";
import { useDeleteCardMutation, useUpdateCardMutation } from "features/Cards/service/cards.api";
import { FaStar } from "react-icons/fa";
import { Modal } from "features/Cards/components/Modal/Modal";
import TextField from "@mui/material/TextField";

type Props = {
  cards: CardType[]
  userId: string | undefined
  sortQuestion: () => void
}

const styleTextField = {
  width: "347px",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "24px",
  color: "#000000"
};

export const TableCards: FC<Props> = ({ cards, userId, sortQuestion }) => {
  const [cardActive, setCardActive] = useState<CardType | null>(null);
  const [valueQuestion, setValueQuestion] = useState("");
  const [valueAnswer, setValueAnswer] = useState("");
  const [isShowWindowUpdatePack, setIsShowWindowUpdatePack] = useState(false);
  const [updateCard] = useUpdateCardMutation();
  const [deleteCard] = useDeleteCardMutation();
  const onChangeValueQuestion = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValueQuestion(e.currentTarget.value);
  };
  const onChangeValueAnswer = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValueAnswer(e.currentTarget.value);
  };
  const openWindowUpdateCar = (card: CardType) => {
    setIsShowWindowUpdatePack(true);
    setCardActive(card);
    setValueAnswer(card.answer);
    setValueQuestion(card.question);

  };
  const updateCardHandler = () => {
    console.log(cardActive);
    if (cardActive) {
      const newCard = { ...cardActive, question: valueQuestion, answer: valueAnswer };
      updateCard(newCard);
    }
    setIsShowWindowUpdatePack(false);
    setValueAnswer("");
    setValueQuestion("");
  };
  const removeCardHandler = (cardId: string) => {
    deleteCard(cardId);
  };

  const SortQuestionHandler = () => {
    sortQuestion();
  };


  return (
    <TableContainer component={Paper}>
      {isShowWindowUpdatePack &&
        <Modal nameButton={"Edit Card"} description={"Save Changes"} closeModal={() => setIsShowWindowUpdatePack(false)}
               callback={updateCardHandler}>
          <TextField
            sx={styleTextField}
            id="standard-read-only-input"
            label="Question"
            defaultValue="Name question"
            variant="standard"
            value={valueQuestion}
            onChange={onChangeValueQuestion}
          />
          <TextField
            sx={{ marginTop: "30px", ...styleTextField }}
            id="standard-read-only-input"
            label="Answer"
            defaultValue="Answer"
            variant="standard"
            value={valueAnswer}
            onChange={onChangeValueAnswer}
          />
        </Modal>
      }
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className={style.tableHead}>
          <TableRow>
            <TableCell className={`${style.headersTable} ${style.headerQuestion}`}
                       onClick={SortQuestionHandler}>Question</TableCell>
            <TableCell align="left" className={style.headersTable}>Answer</TableCell>
            <TableCell align="left" className={style.headersTable}>Last updated</TableCell>
            <TableCell align="left" className={style.headersTable}>Grade</TableCell>
            <TableCell align="right"></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cards.map((card) => (
            <TableRow key={card._id} sx={{ "&:last-child td, &:last-child th": { border: 0 } }}>
              <TableCell align="left">{card.question}</TableCell>
              <TableCell align="left">{card.answer}</TableCell>
              <TableCell align="left">{card.updated}</TableCell>
              <TableCell align="left">
                <Stars grade={card.grade} />
              </TableCell>

              <TableCell align="right">
                {card.user_id === userId &&
                  <>
                    <button className={style.tableButton} onClick={() => openWindowUpdateCar(card)}>
                      <img src={updateIcon} alt={"update"} />
                    </button>
                    <button className={style.tableButton} onClick={() => removeCardHandler(card._id)}>
                      <img src={removeIcon} alt={"remove"} />
                    </button>

                  </>
                }
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

type PropsStars = {
  grade: number
}

const Stars: FC<PropsStars> = ({ grade }) => {
  // const [activeStars, setActiveStars] = useState(0);
  // const activeStarsHandler = (quantity: number) => {
  //   setActiveStars(quantity);
  // };
  return (
    <div className={style.starsWrapper}>
      <FaStar style={{ color: grade > 0 ? "gold" : "" }} />
      <FaStar style={{ color: grade > 1 ? "gold" : "" }} />
      <FaStar style={{ color: grade > 2 ? "gold" : "" }} />
      <FaStar style={{ color: grade > 3 ? "gold" : "" }} />
      <FaStar style={{ color: grade > 4 ? "gold" : "" }} />
    </div>
  );
};
