import React, { FC, useCallback, useState, KeyboardEvent, ChangeEvent } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import style from "features/Packs/components/Packs.module.css";
import { packsThunk, setPackName } from "features/Packs/service/packs.slice";
import { useActions, useAppDispatch } from "common/hooks";
import { PackType } from "features/Packs/service/packs.api";
import { useNavigate } from "react-router-dom";
import removeIcon from "common/images/remove_icon.svg";
import updateIcon from "common/images/update_icon.svg";
import learningIcon from "common/images/learning_icon.svg";
import { Modal } from "features/Cards/components/Modal/Modal";
import login from "features/auth/Login/Login";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { styleCheckBox, styleChildren } from "features/Cards/components/Cards";

type PropsType = {
  cardPacks: PackType[] | undefined
  page: number | undefined
  userId: string | undefined
}
export const TablePacks: FC<PropsType> = ({ cardPacks, page, userId }) => {
  const [valueUpdateInput, setValueUpdateInput] = useState( '')
  const { updatePack, removePack, fetchPacks } = useActions(packsThunk);
  const navigate = useNavigate();
  const [sortParam, setSortParam] = useState<0 | 1>(0);
  const [isUpdatePack, setIsUpdatePack] = useState(false);
  const [packId, setPackId] = useState("");
  const dispatch = useAppDispatch()

  const onChangeValueUpdateInput = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setValueUpdateInput(e.currentTarget.value)
  }

  const openUpdateInputHandler = (pack: PackType) => {
    setPackId(pack._id);
    setIsUpdatePack(true);
    setValueUpdateInput(pack.name)
    // alert(1)
  };
  const updatePackNameHandler = (pack: PackType) => {
      updatePack({ ...pack, name: valueUpdateInput })
        .unwrap()
        .then(() => {
          fetchPacks({});
        });
      setIsUpdatePack(false);
      setValueUpdateInput('')

  };
  const removeHandler = (id: string) => {
    removePack(id);
  };
  const navigateToCardsPageHandler = (packId: string, packName: string) => {
    navigate(`/cards/${packId}`);
    dispatch(setPackName({activePackName: packName}))
  };

  const onSortCards = () => {
    fetchPacks({ sortPacks: `${sortParam}cardsCount` });
    setSortParam(sortParam === 0 ? 1 : 0);
  };
  const onSortCreateByName = () => {
    fetchPacks({ sortPacks: `${sortParam}user_name` });
    setSortParam(sortParam === 0 ? 1 : 0);
  };
  const onSortName = () => {
    fetchPacks({ sortPacks: `${sortParam}name` });
    setSortParam(sortParam === 0 ? 1 : 0);
  };
  const onSortUpdated = () => {
    fetchPacks({ sortPacks: `${sortParam}updated` });
    setSortParam(sortParam === 0 ? 1 : 0);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className={style.tableHead}>
          <TableRow>
            <TableCell onClick={onSortName} className={style.headersTable}>Name</TableCell>
            <TableCell align="left" onClick={onSortCards} className={style.headersTable}>Cards</TableCell>
            <TableCell align="left" onClick={onSortUpdated} className={style.headersTable}>Last updated</TableCell>
            <TableCell align="left" onClick={onSortCreateByName} className={style.headersTable}>Created by</TableCell>
            <TableCell align="left">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {cardPacks && cardPacks.map((p) => (
            <TableRow
              key={p._id}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {p.name}
                {
                  isUpdatePack && p._id === packId &&  <Modal nameButton={'Edit Pack'} description={'Save Changes'} closeModal={() => setIsUpdatePack(false)} callback={() => updatePackNameHandler(p)}>
                    <TextField
                      sx={styleChildren}
                      id="standard-read-only-input"
                      label="Pack Name"
                      defaultValue="New name"
                      variant="standard"
                      value={valueUpdateInput}
                      onChange={onChangeValueUpdateInput}
                    />
                    <FormControlLabel sx={styleCheckBox} control={<Checkbox defaultChecked />} label="Private pack" />
                  </Modal>
                }
                {/*{!isUpdatePack && p._id === packId && p.name}*/}
                {/*{isUpdatePack && p._id === packId &&*/}
                {/*  <input type={"text"} autoFocus onKeyDown={(e) => updatePackNameHandler(e, p)} value={valueUpdatePack}*/}
                {/*         onChange={changeValuePackName} />}*/}
              </TableCell>
              <TableCell align="left">{p.cardsCount}</TableCell>
              <TableCell align="left">{p.updated}</TableCell>
              <TableCell align="left">{p.user_name}</TableCell>
              <TableCell align="left">{<>
                {p.user_id === userId &&
                  <>
                    <button onClick={() => navigateToCardsPageHandler(p._id, p.name)} className={style.tableButton}>
                      <img src={learningIcon} alt={"learning"} />
                    </button>
                    <button onClick={() => openUpdateInputHandler(p)} className={style.tableButton}>
                      <img src={updateIcon} alt={"update"} />
                    </button>
                    <button onClick={() => removeHandler(p._id)} className={style.tableButton}>
                      <img src={removeIcon} alt={"remove"} />
                    </button>
                  </>
                }
                {p.user_id !== userId && p.cardsCount > 0
                  && <button onClick={() => navigateToCardsPageHandler(p._id, p.name)} className={style.tableButton}>
                    <img src={learningIcon} alt={"learning"} />
                  </button>}
              </>
              }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

