import React, { ChangeEvent, useEffect, useState } from "react";
import style from "features/Packs/components/Packs.module.css";
import { SettingsPacks } from "features/Packs/components/SettingsPacks";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { TablePacks } from "features/Packs/components/TablePacks";
import { useActions, useAppSelector } from "common/hooks";
import { packsThunk } from "features/Packs/service/packs.slice";
import {
  allPageSelector,
  cardPacksSelector,
  pageSelector
} from "features/Packs/service/packs.selector";
import { userIdSelector } from "features/auth/auth.selector";
import { SelectForShowPacks } from "features/Packs/components/SelectForShowPacks";


const Packs = () => {
  const cardPacks = useAppSelector(cardPacksSelector);
  const page = useAppSelector(pageSelector);
  const allPage = useAppSelector(allPageSelector);
  const { fetchPacks, addNewPacks } = useActions(packsThunk);
  const userId = useAppSelector(userIdSelector);
  const [valueTextInput, setValueTextInput] = useState("");


  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    fetchPacks({ page: value });
  };
  const onChangeValueInput = (e: ChangeEvent<HTMLInputElement>) => {
    setValueTextInput(e.currentTarget.value);
  };
  const addNewPack = () => {
    if (valueTextInput === "") {
      return;
    }
    const newPack = {
      name: "🦁" + valueTextInput
    };
    addNewPacks(newPack);
    setValueTextInput("");
  };


  useEffect(() => {
    // dispatch(packsThunk.fetchPacks({ page: 1 }));
    fetchPacks({ page: 1 });
  }, []);

  return (
    <div className={style.packsContainer}>
      <div className={style.headerPacks}>
        <div className={style.header}>
          Packs List
        </div>
        <div>
          <button onClick={addNewPack} className={style.buttonAddNewPack}>Add new pack</button>
          <div>
            <input type={"text"} value={valueTextInput} onChange={onChangeValueInput} placeholder={"New pack"}
                   className={style.newPackInput} />
          </div>
        </div>
      </div>
      <SettingsPacks userId={userId} />
      <TablePacks cardPacks={cardPacks} page={page} userId={userId} />
      <div className={style.paginationBlock}>
        <Stack spacing={2}>
          <Pagination count={allPage} variant="outlined" shape="rounded" color={"primary"} onChange={handleChange} />
        </Stack>
        <div className={style.paginationDescription}>
          Show {<SelectForShowPacks />} Cards per Page
        </div>
      </div>
    </div>
  );
};

export default Packs;