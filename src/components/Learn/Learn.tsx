import React, { useEffect, useState } from "react";
import { NavigationToPackList } from "common/components/NavigationToPackList/NavigationToPackList";
import style from "./Learn.module.css";
import Button from "@mui/material/Button";
import { RadioButtonsGroup } from "components/Learn/RadioButtonsGroup";
import { useParams } from "react-router-dom";
import { useActions, useAppSelector } from "common/hooks";
import { cardPacksSelector } from "features/Packs/service/packs.selector";
import { useGetCardsQuery } from "features/Cards/service/cards.api";
import { packsThunk } from "features/Packs/service/packs.slice";

const Learn = () => {
  const [cardCount, setCardCount] = useState(0)
  const [question, setQuestion] = useState('')
  const [answer, setAnswer] = useState('')
  const [isShowAnswer, setIsShowAnswer] = useState(false);
  let { packId } = useParams<{ packId: string }>();
  const cardPack = useAppSelector(cardPacksSelector);
  const { cards = [], isLoading, error, packUserId } = useGetCardsQuery({
      packId: packId ?? ""
    },
    {
      selectFromResult: ({ data, isLoading, error }) => {
        return {
          cards: data?.cards,
          packUserId: data?.packUserId,
          isLoading,
          error
        };
      }
    });
  const packActive = cardPack.filter(cardPack => cardPack._id === packId);
  const { fetchPacks } = useActions(packsThunk);
  const [packName, setPackName] = useState("");

  const showAnswerHandler = () => {
    setIsShowAnswer(true);
  };
  const nextCardHandler = () => {
    const cardLength = cards.length - 1
    setCardCount(count => count === cardLength ? 0 : count + 1)
    setIsShowAnswer(false);
  }

  useEffect(() => {
    setQuestion(cards[cardCount].question)
    setAnswer(cards[cardCount].answer)
  }, [cardCount])
  useEffect(() => {
    if (cards.length > 0) {
      fetchPacks({ userId: packUserId });
      setQuestion(cards[cardCount].question)
      setAnswer(cards[cardCount].answer)
    }
  }, [cards]);

  useEffect(() => {
    if (packActive.length > 0) {
      setPackName(packActive[0].name);
    }
  }, [packActive]);

  return (
    <div>
      <NavigationToPackList />
      <div className={style.mainContentWrapper}>
        <div className={style.mainContent}>
          <div className={style.packName}>
            Learn {packName}
          </div>
          <div className={style.description}>
            <div>
              Question : {question}
            </div>

            {/*<div>*/}
            {/*  Количество попыток ответов на вопрос 10*/}
            {/*</div>*/}
          </div>
          {!isShowAnswer && <div className={style.showAnswerButtonWrapper}>
            <Button variant="contained" size="small" className={style.showAnswerButton} onClick={showAnswerHandler}>
              Show Answer
            </Button>
          </div>
          }
          {
            isShowAnswer &&
            <div className={style.answerWrapper}>
              <div className={style.answer}>
                Answer: {answer}
              </div>
              <div className={style.learnBlock}>
                <RadioButtonsGroup />
              </div>
              <div className={style.buttons}>
                <Button variant="outlined" size="small" className={style.buttonCansel}>
                  Cansel
                </Button>
                <div>
                  <Button variant="contained" size="small" className={style.buttonNext} onClick={nextCardHandler}>
                    Next
                  </Button>
                </div>
              </div>
            </div>
          }
        </div>
      </div>

    </div>
  );
};

export default Learn;