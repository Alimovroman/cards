import React, { ChangeEvent, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  useAddCardMutation,
  useGetCardsQuery,
} from "features/Cards/service/cards.api";
import LinearProgress from "@mui/material/LinearProgress";
import { ArgCreateCardType, CustomerError } from "features/Cards/service/cards.api.types";
import { nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import style from "./Cards.module.css";
import arrowIcon from "./../../../common/images/arrow_left_icon.svg";
import { TableCards } from "features/Cards/components/TableCards";
import { useActions, useAppSelector } from "common/hooks";
import { packsThunk } from "features/Packs/service/packs.slice";
import { RootState } from "app/store";

const Cards = () => {
  const {fetchPacks} = useActions(packsThunk)
  const packs = useAppSelector((state: RootState) => state.packs.cardPacks )
  const [nameCard, setNameCard] = useState('')
  let { packId } = useParams<{ packId: string }>();
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(3);
  const { cards = [], cardsTotalCount, isLoading, error } = useGetCardsQuery({ packId: packId ?? "", page, pageCount },
    {
      selectFromResult: ({ data, isLoading, error }) => {
        return {
          cards: data?.cards,
          cardsTotalCount: data?.cardsTotalCount,
          isLoading,
          error
        };
      }
    });
  const [addCard, {}] = useAddCardMutation();


  const addCardHandler = () => {
    if (packId) {
      const newCard: ArgCreateCardType = {
        cardsPack_id: packId,
        question: "🐱 question " + nanoid(),
        answer: "🐙 answer " + nanoid()
      };
      addCard(newCard).unwrap()
        .then((res) => {
          const cardQuestion = res.newCard.question;
          toast.success(`Карточка ${cardQuestion} успешно добавлена`);
        })
        .catch((error) => {
          toast.error(error.data.error);
        });
    }
  };
  const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  useEffect(() => {
    if (packs.length > 0 ) {
      console.log('зашел');
      // const pack = packs.filter(pack => pack._id === cards[0].cardsPack_id);
      console.log(packs);
      // setNameCard(pack[0].name)
    } else {
      console.log('Не зашел');
      console.log(packs);
      // fetchPacks({userId: packs[0].user_id})
    }
  }, [packs])

  if (isLoading) {
    return <LinearProgress color={"primary"} />;
  }
  if (!!error) {
    const err = error as CustomerError;
    return <h1 style={{ color: "red" }}>{err.data.error}</h1>;
  }

  return (
    <div className={style.cardsBlock}>
      <div>
        <NavLink to={"/packs"} className={style.navigation}>
          <img src={arrowIcon} alt={"arrow_icon"} />
          <div className={style.navigationDescription}>
            Back to Pack List
          </div>
        </NavLink>
      </div>
      <div className={style.headerBlock}>
        <div className={style.headerDescription}>{nameCard}</div>
        <div>
          <button onClick={addCardHandler} className={style.buttonAddCard}>add new card</button>
        </div>
      </div>
      <TableCards cards={cards}/>
      <Pagination count={cardsTotalCount} onChange={changePageHandler} />
    </div>
  );
};

export default Cards;