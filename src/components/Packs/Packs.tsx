import React, { useEffect } from "react";
import style from "./Packs.module.css";
import { SettingsPacks } from "components/Packs/SettingsPacks";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
import { TablePacks } from "components/Packs/TablePacks";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { packsThunk, PacksType } from "components/Packs/packs.slice";


const Packs = () => {
  const packs = useAppSelector<PacksType | null>(state => state.packs.packs);
  const cardPacks = packs?.cardPacks;
  const page = packs?.page;
  let allPage = packs ? Math.ceil(packs.cardPacksTotalCount / packs.pageCount) : 0;
  const dispatch = useAppDispatch();

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    dispatch(packsThunk.setPacks({ page: value }));

  };
  const addNewPack = () => {
    dispatch(packsThunk.addNewPacks({title: "new pack" }));
  };

  useEffect(() => {
    dispatch(packsThunk.setPacks({ page: 1 }));
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
      <SettingsPacks />
      <TablePacks cardPacks={cardPacks} page={page} />
      <div>
        <Stack spacing={2}>
          <Pagination count={allPage} variant="outlined" shape="rounded" color={"primary"} onChange={handleChange} />
        </Stack>
      </div>
    </div>
  );
};

export default Packs;