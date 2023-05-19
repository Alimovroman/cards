import React, { FC, useCallback } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import style from "./Packs.module.css";
import { packsThunk } from "components/Packs/packs.slice";
import { useActions } from "common/hooks";
import { PackType } from "components/Packs/packs.api";


type PropsType = {
  cardPacks: PackType[] | undefined
  page: number | undefined
}
export const TablePacks: FC<PropsType> = ({ cardPacks, page }) => {
  const { updatePack, removePack, sortCardPacks } = useActions(packsThunk);

  const updateHandler = (pack: PackType) => {
    const newName = "🦖" + Math.random();
    updatePack({ ...pack, name: newName });
  };
  const removeHandler = (id: string) => {
    removePack(id);
  };

  const createData = useCallback((
    name: string,
    cards: number,
    lastUpdated: string,
    createdBy: string,
    actions: any
  ) => {
    return { name, cards, lastUpdated, createdBy, actions };
  }, []);

  const onSortCards = () => {
    page && sortCardPacks({ num: 0 });
  };

  const rows = cardPacks !== undefined
    ? [...cardPacks]
    : null;
  console.log(cardPacks);
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className={style.tableHead}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right" onClick={onSortCards}>Cards</TableCell>
            <TableCell align="right">Last updated</TableCell>
            <TableCell align="right">Created by</TableCell>
            <TableCell align="right">Actions</TableCell>
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
              </TableCell>
              <TableCell align="right">{p.cardsCount}</TableCell>
              <TableCell align="right">{p.updated}</TableCell>
              <TableCell align="right">{p.user_name}</TableCell>
              <TableCell align="right">{<>
                <button onClick={() => removeHandler(p._id)}>Remove</button>
                <button onClick={() => updateHandler(p)}>Update</button>
              </>
              }</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

