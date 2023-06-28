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
import { SelectForPages } from "common/components/SelectForPages/SelectForPages";
import { Modal } from "features/Cards/components/Modal/Modal";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styleCheckBox, styleChildren } from "features/Cards/components/Cards";


const Packs = () => {
  const [pageCount, setPageCount] = useState(4)
  const cardPacks = useAppSelector(cardPacksSelector);
  const page = useAppSelector(pageSelector);
  const allPage = useAppSelector(allPageSelector);
  const { fetchPacks, addNewPacks } = useActions(packsThunk);
  const userId = useAppSelector(userIdSelector);
  const [isOpenWindowWithAdd, setIsOpenWindowWithAdd] = useState(false)
  const [valueAddPackInput, setValueAddPackInput] = useState('Pack name')


  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    fetchPacks({ page: value, pageCount});
  };

  const closeWindowWithAdd = () => {
    setIsOpenWindowWithAdd(false)
  }
  const changePageCount = (newPageCount: number) => {
    fetchPacks({pageCount: newPageCount})
    setPageCount(newPageCount)
  }
  const openWindowForAddCard = () => {
    setIsOpenWindowWithAdd(true)
  }
  const addNewPack = () => {

    const newPack = {
      name: "🦁" + valueAddPackInput
    };
    addNewPacks(newPack);
    setIsOpenWindowWithAdd(false)
    setValueAddPackInput('Pack name')
  };
const onChangeValuePackInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  setValueAddPackInput(e.currentTarget.value)
}

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
          <button onClick={openWindowForAddCard} className={style.buttonAddNewPack}>Add new pack</button>
          {
            isOpenWindowWithAdd &&
            <Modal nameButton={'Add New Pack'}
                   description={'Add New Pack'}
                   closeModal={() => setIsOpenWindowWithAdd(false)}
                   callback={addNewPack} >
              <TextField
                sx={styleChildren}
                id="standard-read-only-input"
                label="Name Pack"
                defaultValue="Name Pack"
                variant="standard"
                value={valueAddPackInput}
                onChange={onChangeValuePackInput}
              />
              <FormControlLabel sx={styleCheckBox} control={<Checkbox defaultChecked />} label="Private pack" />
            </Modal>
            // <AddNewPack closeWindow={closeWindowWithAdd} callBack={addNewPack}/>
          }
        </div>
      </div>
      <SettingsPacks userId={userId} />
      <TablePacks cardPacks={cardPacks} page={page} userId={userId} />
      <div className={style.paginationBlock}>
        <Stack spacing={2}>
          <Pagination count={allPage} variant="outlined" shape="rounded" color={"primary"} onChange={handleChange} />
        </Stack>
        <div className={style.paginationDescription}>
          Show {<SelectForPages callBack={changePageCount} namePage={'Packs'}/>} Cards per Page
        </div>
      </div>
    </div>
  );
};

export default Packs;