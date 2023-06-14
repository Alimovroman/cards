import React, { FC, useState } from "react";
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

type Props = {
  cards: CardType[]
  userId: string | undefined
  sortQuestion: () => void
}

export const TableCards: FC<Props> = ({ cards, userId, sortQuestion }) => {

  const [updateCard] = useUpdateCardMutation();
  const [deleteCard] = useDeleteCardMutation();
  const updateCardHandler = (card: CardType) => {
    const newCard = { ...card, question: "💚 new question 💚", answer: "🧡 new answer 🧡 " };
    updateCard(newCard);
  };
  const removeCardHandler = (cardId: string) => {
    deleteCard(cardId);
  };

  const SortQuestionHandler = () => {
    sortQuestion()
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className={style.tableHead}>
          <TableRow>
            <TableCell className={`${style.headersTable} ${style.headerQuestion}`} onClick={SortQuestionHandler}>Question</TableCell>
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
                <Stars />
              </TableCell>
              <TableCell align="right">
                {card.user_id === userId &&
                  <>
                    <button className={style.tableButton} onClick={() => updateCardHandler(card)}>
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

const Stars = () => {
  const [activeStars, setActiveStars] = useState(0);
  const activeStarsHandler = (quantity: number) => {
    setActiveStars(quantity);
  };
  return (
    <div className={style.starsWrapper}>
      <FaStar style={{ color: activeStars > 0 ? "gold" : "" }} onClick={() => activeStarsHandler(1)} />
      <FaStar style={{ color: activeStars > 1 ? "gold" : "" }} onClick={() => activeStarsHandler(2)} />
      <FaStar style={{ color: activeStars > 2 ? "gold" : "" }} onClick={() => activeStarsHandler(3)} />
      <FaStar style={{ color: activeStars > 3 ? "gold" : "" }} onClick={() => activeStarsHandler(4)} />
      <FaStar style={{ color: activeStars > 4 ? "gold" : "" }} onClick={() => activeStarsHandler(5)} />
    </div>
  );
};
