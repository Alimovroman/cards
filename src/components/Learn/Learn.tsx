import React, { useEffect } from "react";
import { NavigationToPackList } from "common/components/NavigationToPackList/NavigationToPackList";
import style from './Learn.module.css'
import Button from '@mui/material/Button';
import { RadioButtonsGroup } from "features/Cards/components/AddNewCard/RadioButtonsGroup";
import { useParams } from "react-router-dom";
import { useAppSelector } from "common/hooks";
import { cardPacksSelector } from "features/Packs/service/packs.selector";

const Learn = () => {
  let { packId } = useParams<{ packId: string }>();
  const cardPack = useAppSelector(cardPacksSelector)
  const packActive = cardPack.filter(cardPack => cardPack._id === packId)

  // useEffect(() => {
  //   console.log(1);
  //   if(cards.length > 0 ) {
  //     fetchPacks({userId: cards[0].user_id})
  //   }
  // }, [cards])

  return (
    <div>
      <NavigationToPackList />
      <div className={style.mainContentWrapper}>
        <div className={style.mainContent}>
          <div className={style.packName}>
            Learn Pack Name
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