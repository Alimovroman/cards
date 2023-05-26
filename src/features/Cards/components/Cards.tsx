import React, { ChangeEvent, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useAddCardMutation,
  useDeleteCardMutation,
  useGetCardsQuery,
  useUpdateCardMutation
} from "features/Cards/service/cards.api";
import LinearProgress from "@mui/material/LinearProgress";
import { ArgCreateCardType, CardType, CustomerError } from "features/Cards/service/cards.api.types";
import { nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import s from './Cards.module.css'

const Cards = () => {
  let { packId } = useParams<{ packId: string }>();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(3);
  const { cards = [], cardsTotalCount, isLoading, error } = useGetCardsQuery({ packId: packId ?? "", page, pageCount },
    {
      selectFromResult: ({data, isLoading, error}) => {
        return {
          cards: data?.cards,
          cardsTotalCount: data?.cardsTotalCount,
          isLoading,
          error
        }
      }
    });
  const [addCard, {}] = useAddCardMutation()
  const [deleteCard] = useDeleteCardMutation()
  const [updateCard] = useUpdateCardMutation();

  const updateCardHandler = (card: CardType) => {
    const newCard = { ...card, question: "💚 new question 💚", answer: "🧡 new answer 🧡 " };
    updateCard(newCard);
  };

  const addCardHandler = () => {
    if (packId) {
      const newCard: ArgCreateCardType = {
        cardsPack_id: packId,
        question: "🐱 question " + nanoid(),
        answer: "🐙 answer " + nanoid(),
      };
      addCard(newCard).unwrap()
        .then((res) => {
          const cardQuestion = res.newCard.question;
          toast.success(`Карточка ${cardQuestion} успешно добавлена`);
        })
        .catch((error) => {
          toast.error(error.data.error)
        })
    }
  }
  const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page)
  };
  const removeCardHandler = (cardId: string) => {
    deleteCard(cardId)
  }

  if(isLoading) {
    return <LinearProgress color={"primary"} />
  }
  if(!!error) {
    const err = error as CustomerError
    return <h1 style={{color: 'red'}}>{err.data.error}</h1>
  }

  return (
    <div>
      <h1>Cards</h1>
      <button onClick={addCardHandler}>add card</button>
      <div>
        {cards.map((card) => {
            return (
              <div className={s.container} key={card._id}>
                <div>
                  <b>Question: </b>
                  <p>{card.question}</p>{" "}
                </div>
                <div>
                  <b>Answer: </b>
                  <p>{card.answer}</p>{" "}
                </div>
                <button onClick={() => removeCardHandler(card._id)}>delete card</button>
                <button onClick={() => updateCardHandler(card)}>update card</button>
              </div>
            );
          })}
      </div>
      <Pagination count={cardsTotalCount} onChange={changePageHandler} />
    </div>
  );
};

export default Cards;