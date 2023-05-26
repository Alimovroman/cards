import React, { useEffect } from "react";
import style from "./Packs.module.css";
import { SettingsPacks } from "components/Packs/SettingsPacks";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { TablePacks } from "components/Packs/TablePacks";
import { useActions, useAppSelector } from "common/hooks";
import { packsThunk } from "components/Packs/packs.slice";
import {
  allPageSelector,
  cardPacksSelector,
  pageSelector
} from "components/Packs/packs.selector";
import { userIdSelector } from "features/auth/auth.selector";


const Packs = () => {
  const cardPacks = useAppSelector(cardPacksSelector);
  const page = useAppSelector(pageSelector);
  let allPage = useAppSelector(allPageSelector);
  const { fetchPacks, addNewPacks } = useActions(packsThunk);
  const userId = useAppSelector(userIdSelector)


  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    fetchPacks({ page: value });
  };
  const addNewPack = () => {
    const newPack = {
      name: "🦁" + Math.random()
    };
    addNewPacks(newPack);
  };


  useEffect(() => {
    // dispatch(packsThunk.fetchPacks({ page: 1 }));
    fetchPacks({ page: 1 });
  }, []);

  return (
    <div className={style.packsContainer}>
      <div className={style.headerPacks}>
        <div>
          Packs List
        </div>
        <div>
          <button onClick={addNewPack}>Add new Pack</button>
        </div>
      </div>
      <SettingsPacks userId={userId}/>
      <TablePacks cardPacks={cardPacks} page={page} userId={userId}/>
      <div>
        <Stack spacing={2}>
          <Pagination count={allPage} variant="outlined" shape="rounded" color={"primary"} onChange={handleChange} />
        </Stack>
      </div>
    </div>
  );
};

export default Packs;