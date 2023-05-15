import React from "react";
import style from './Packs.module.css'
import { SettingsPacks } from "components/Packs/SettingsPacks";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import { TablePacks } from "components/Packs/TablePacks";

const Packs = () => {
  return (
    <div className={style.packsContainer}>
      <SettingsPacks />
      <TablePacks />
      <div>
        <Stack spacing={2}>
          <Pagination count={10} variant="outlined" shape="rounded" color={"primary"}/>
        </Stack>
      </div>
    </div>
  );
};

export default Packs;