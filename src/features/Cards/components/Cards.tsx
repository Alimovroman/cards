import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import {
  useAddCardMutation,
  useGetCardsQuery
} from "features/Cards/service/cards.api";
import LinearProgress from "@mui/material/LinearProgress";
import { ArgCreateCardType, CustomerError } from "features/Cards/service/cards.api.types";
import { toast } from "react-toastify";
import Pagination from "@mui/material/Pagination";
import style from "./Cards.module.css";
import { TableCards } from "features/Cards/components/TableCards";
import { useActions, useAppSelector } from "common/hooks";
import { cardPacksSelector } from "features/Packs/service/packs.selector";
import { userIdSelector } from "features/auth/auth.selector";
import { SelectForPages } from "common/components/SelectForPages/SelectForPages";
import { SearchInput } from "common/components/SearchInput/SearchInput";
import { AddNewCard } from "features/Cards/components/AddNewCard/AddNewCard";
import { BurgerMenu } from "features/Cards/components/BurgerMenu/BurgerMenu";
import { NavigationToPackList } from "common/components/NavigationToPackList/NavigationToPackList";
import { packsThunk } from "features/Packs/service/packs.slice";
import { Modal } from "features/Cards/components/Modal/Modal";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";


export const styleChildren = {
  width: "347px",
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "24px",
  color: "#000000"
};
export const styleCheckBox = {
  fontStyle: "normal",
  fontWeight: "500",
  fontSize: "16px",
  lineHeight: "20px",
  textAlign: "center",
  letterSpacing: "0.01em",
  color: "#000000",
  opacity: "0.8",
  marginTop: "30px"
};


const Cards = () => {

  const [sortParam, setSortParam] = useState<0 | 1 | null>(null);
  const userId = useAppSelector(userIdSelector);
  const cardPack = useAppSelector(cardPacksSelector);
  const [isShowUpdateModal, setIsShowUpdateModal] = useState(false);
  const [isShowRemoveModal, setIsShowRemoveModal] = useState(false);
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
  const packActive = useMemo(() => {
    return cardPack.filter(cardPack => cardPack._id === packId);
  }, [cardPack]);
  const [valueUpdateInput, setValueUpdateInput] = useState("");
  const navigate = useNavigate();
  const { fetchPacks, updatePack, removePack } = useActions(packsThunk);
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
  const onChangeValueUpdateInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValueUpdateInput(e.currentTarget.value);
  };
  const showUpdateModal = () => {
    setIsShowUpdateModal(true);
  };
  const showRemoveModal = () => {
    setIsShowRemoveModal(true);
  };
  const closeModal = () => {
    setIsShowUpdateModal(false);
    // setIsShowRemoveModal(false)
  };
  const addCardHandler = () => {
    setIsOpenWindowWithAddCard(true);

  };
  const removePackCallBack = () => {
    packId && removePack(packId);
    navigate(`/packs`);
  };
  const updatePackCallBack = () => {
    updatePack({ ...packActive[0], name: valueUpdateInput });
    setIsShowUpdateModal(false);
  };
  const changePageHandler = (event: ChangeEvent<unknown>, page: number) => {
    setPage(page);
  };

  const searchCards = (cardQuestion: string) => {
    setCardQuestion(cardQuestion);
  };

  useEffect(() => {
    if (cards.length > 0) {
      fetchPacks({ userId: packUserId });
    }
  }, [cards]);
  useEffect(() => {
    if (packActive.length > 0) {
      setValueUpdateInput(packActive[0].name);
    }
  }, [packActive]);

  if (isLoading) {
    return <LinearProgress color={"primary"} />;
  }
  if (!!error) {
    const err = error as CustomerError;
    return <h1 style={{ color: "red" }}>{err.data.error}</h1>;
  }

  return (
    <div className={style.cardsBlock}>
      <NavigationToPackList />
      <div className={style.headerBlock}>
        <div className={style.headerDescription}>
          {
            packActive.length > 0
              ? packActive[0].name
              : "Pack name"
          }: {<BurgerMenu packId={packId} showUpdateModal={showUpdateModal} showRemoveModal={showRemoveModal} />}
        </div>
        <div>
          {userId === packUserId &&
            <button onClick={addCardHandler} className={style.buttonAddCard}>add new card</button>
          }
          {isOpenWindowWithAddCard && <AddNewCard closeWindow={closeWindowWithAdd} callBack={addNewCard} />}
        </div>
      </div>
      {
        isShowUpdateModal && <Modal closeModal={closeModal} description={"Edit pack"} nameButton={"Save Changes"}
                                    callback={updatePackCallBack}>
          <TextField
            sx={styleChildren}
            id="standard-read-only-input"
            label="Question"
            defaultValue="New name"
            variant="standard"
            value={valueUpdateInput}
            onChange={onChangeValueUpdateInput}
          />
          <FormControlLabel sx={styleCheckBox} control={<Checkbox defaultChecked />} label="Private pack" />
        </Modal>
      }
      {
        isShowRemoveModal &&
        <Modal nameButton={"Delete Pack"} description={"Delete Pack"} closeModal={() => setIsShowRemoveModal(false)}
               callback={removePackCallBack}>
          <div>Do you really want to remove Pack Name?</div>
          <div>All cards will be deleted.</div>
        </Modal>
      }
      <div className={style.searchWrapper}>
        <SearchInput description={"Search"} callBack={searchCards} />
      </div>
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