import React, { useEffect, useState } from "react";
import { NavigationToPackList } from "common/components/NavigationToPackList/NavigationToPackList";
import style from './Learn.module.css'
import Button from '@mui/material/Button';
import { RadioButtonsGroup } from "features/Cards/components/AddNewCard/RadioButtonsGroup";
import { useParams } from "react-router-dom";
import { useActions, useAppSelector } from "common/hooks";
import { cardPacksSelector } from "features/Packs/service/packs.selector";
import { useGetCardsQuery } from "features/Cards/service/cards.api";
import { packsThunk } from "features/Packs/service/packs.slice";

const Learn = () => {
  let { packId } = useParams<{ packId: string }>();
  const cardPack = useAppSelector(cardPacksSelector)
  const { cards = [], isLoading, error, packUserId } = useGetCardsQuery({
      packId: packId ?? "",
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
  const packActive = cardPack.filter(cardPack => cardPack._id === packId)
  const {fetchPacks} = useActions(packsThunk)
  const [packName, setPackName] = useState('')

  console.log(packActive);
  useEffect(() => {
    if(cards.length > 0 ) {
      fetchPacks({userId: packUserId})
    }
  }, [cards])

  useEffect(() => {
    if (packActive.length > 0) {
      setPackName(packActive[0].name)
    }
  },[packActive] )

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
              <div>
                Question : name
              </div>
              {/*<div>*/}
              {/*  Количество попыток ответов на вопрос 10*/}
              {/*</div>*/}
            </div>
            <div className={style.answer}>
              Answer: answer
            </div>
          </div>
          <div className={style.learnBlock}>
              <RadioButtonsGroup />
          </div>
          <div className={style.buttons}>
            <Button variant="outlined" size="small" className={style.buttonCansel}>
              Cansel
            </Button>
            <div>
              <Button variant="contained" size="small" className={style.buttonNext}>
                Next
              </Button>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Learn;