import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
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
import { useActions, useAppSelector } from "common/hooks";
import { activePackSelector, cardPacksSelector } from "features/Packs/service/packs.selector";
import { userIdSelector } from "features/auth/auth.selector";
import { SelectForPages } from "common/components/SelectForPages/SelectForPages";
import { SearchInput } from "common/components/SearchInput/SearchInput";
import { AddNewCard } from "features/Cards/components/AddNewCard/AddNewCard";
import { BurgerMenu } from "features/Cards/components/BurgerMenu/BurgerMenu";
import { NavigationToPackList } from "common/components/NavigationToPackList/NavigationToPackList";
import { packsThunk } from "features/Packs/service/packs.slice";

const Cards = () => {
  const [sortParam, setSortParam] = useState<0 | 1 | null>(null);
  const userId = useAppSelector(userIdSelector);
  const cardPack = useAppSelector(cardPacksSelector)

  const [isOpenWindowWithAddCard, setIsOpenWindowWithAddCard] = useState(false);
  let { packId } = useParams<{ packId: string }>();
  const [cardQuestion, setCardQuestion] = useState("");
  const [page, setPage] = useState(1);
  const [pageCount, setPageCount] = useState(3);
  const { cards = [], cardsTotalCount, isLoading, error, packUserId } = useGetCardsQuery({
      packId: packId ?? "",
      page,
      pageCount,
      cardQuestion,
      sortCards: sortParam ? `${sortParam}answer` : ""
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
  const packActive = cardPack.filter(cardPack => cardPack._id === packId)

  const {fetchPacks} = useActions(packsThunk)
  const [addCard, {}] = useAddCardMutation();
  const AllPages = cardsTotalCount ? Math.ceil(cardsTotalCount / pageCount) : 0;
  const changePageCount = (newPageCount: number) => {
    setPageCount(newPageCount);
  };
  const closeWindowWithAdd = () => {
    setIsOpenWindowWithAddCard(false);
  };
  const sortQuestion = () => {
    setSortParam(sortParam === 0 ? 1 : 0);
  };

  const addNewCard = (question: string, answer: string) => {
    console.log(question, answer);
    if (packId) {
      const newCard: ArgCreateCardType = {
        cardsPack_id: packId,
        question: "🐱 " + question,
        answer: "🐙 " + answer
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



  const addCardHandler = () => {
    setIsOpenWindowWithAddCard(true);

  };
  const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const searchCards = (cardQuestion: string) => {
    setCardQuestion(cardQuestion);
  };

  useEffect(() => {
    console.log(1);
    if(cards.length > 0 ) {
      fetchPacks({userId: cards[0].user_id})
    }
  }, [cards])

  if (isLoading) {
    return <LinearProgress color={"primary"} />;
  }
  if (!!error) {
    const err = error as CustomerError;
    return <h1 style={{ color: "red" }}>{err.data.error}</h1>;
  }

  // console.log(packActive[0].name);
  return (
    <div className={style.cardsBlock}>
      <NavigationToPackList />
      <div className={style.headerBlock}>
        <div className={style.headerDescription}>
          {packActive.length > 0 ? packActive[0].name : "Pack name"}: {<BurgerMenu packId={packId}/>}
        </div>
        <div>
          {userId === packUserId &&
            <button onClick={addCardHandler} className={style.buttonAddCard}>add new card</button>
          }
          {isOpenWindowWithAddCard && <AddNewCard closeWindow={closeWindowWithAdd} callBack={addNewCard} />}
        </div>
      </div>
      <SearchInput description={"Search"} callBack={searchCards} />
      <TableCards cards={cards} userId={userId} sortQuestion={sortQuestion} />
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