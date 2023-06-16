import React, { ChangeEvent, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  useAddCardMutation,
  useGetCardsQuery
} from "features/Cards/service/cards.api";
import LinearProgress from "@mui/material/LinearProgress";
import { ArgCreateCardType, CustomerError } from "features/Cards/service/cards.api.types";
import { nanoid } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import style from "./Cards.module.css";
import arrowIcon from "./../../../common/images/arrow_left_icon.svg";
import { TableCards } from "features/Cards/components/TableCards";
import { useAppSelector } from "common/hooks";
import { activePackSelector } from "features/Packs/service/packs.selector";
import { userIdSelector } from "features/auth/auth.selector";
import { SelectForPages } from "common/components/SelectForPages/SelectForPages";
import { SearchInput } from "common/components/SearchInput/SearchInput";
import { AddNewPack } from "features/Packs/components/AddNewPack/AddNewPack";

const Cards = () => {
  const [sortParam, setSortParam] = useState<0 | 1 | null>(null);
  const packName = useAppSelector(activePackSelector);
  const userId = useAppSelector(userIdSelector);
  const [isOpenWindowWithAdd, setIsOpenWindowWithAdd] = useState(false)
  let { packId } = useParams<{ packId: string }>();
  const [cardQuestion, setCardQuestion] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(3);
  const { cards = [], cardsTotalCount, isLoading, error, packUserId } = useGetCardsQuery({
      packId: packId ?? "",
      page,
      pageCount,
      cardQuestion,
      sortCards: sortParam ? `${sortParam}answer` : ''
    },
    {
      selectFromResult: ({ data, isLoading, error }) => {
        return {
          cards: data?.cards,
          cardsTotalCount: data?.cardsTotalCount,
          packUserId: data?.packUserId,

          isLoading,
          error
        };
      }
    });
  const [addCard, {}] = useAddCardMutation();
  const AllPages = cardsTotalCount ? Math.ceil(cardsTotalCount / pageCount) : 0;
  const changePageCount = (newPageCount: number) => {
    setPageCount(newPageCount);
  };
  const closeWindowWithAdd = () => {
    setIsOpenWindowWithAdd(false)
  }
  const sortQuestion = () => {
    setSortParam(sortParam === 0 ? 1 : 0);
  };

  const addNewCard = (newCard: string) => {
    console.log(newCard);
    // if (packId) {
    //   const newCard: ArgCreateCardType = {
    //     cardsPack_id: packId,
    //     question: "🐱 newCard ",
    //     answer: "🐙 answer " + nanoid()
    //   };
    //   addCard(newCard).unwrap()
    //     .then((res) => {
    //       const cardQuestion = res.newCard.question;
    //       toast.success(`Карточка ${cardQuestion} успешно добавлена`);
    //     })
    //     .catch((error) => {
    //       toast.error(error.data.error);
    //     });
    // }

  }

  const addCardHandler = () => {
    setIsOpenWindowWithAdd(true)

  };
  const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const searchCards = (cardQuestion: string) => {
    setCardQuestion(cardQuestion);
  };

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
        <div className={style.headerDescription}>
          {packName ? packName : "Pack name"}
        </div>
        <div>
          {userId === packUserId &&
            <button onClick={addCardHandler} className={style.buttonAddCard}>add new card</button>
          }
          {isOpenWindowWithAdd && <AddNewPack closeWindow={closeWindowWithAdd} callBack={addNewCard}/>}
        </div>
      </div>
      <SearchInput description={"Search"} callBack={searchCards} />
      <TableCards cards={cards} userId={userId} sortQuestion={sortQuestion}/>
      <div className={style.paginationBlock}>
        <Pagination count={AllPages} onChange={changePageHandler} />
        <div className={style.paginationDescription}>
          Show {<SelectForPages namePage={"Cards"} callBack={changePageCount} />} Cards per Page
        </div>
      </div>
    </div>
  );
};

export default Cards;