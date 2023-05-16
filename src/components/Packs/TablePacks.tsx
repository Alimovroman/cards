import React, { FC, useCallback } from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import style from './Packs.module.css'
import { CardsPacksType, packsThunk } from "components/Packs/packs.slice";
import { useAppDispatch } from "common/hooks";



// const _rows = [
//   createData('Pack Name', 4, '18.03.2021', 'Ivan Ivanov', 'какие то кнопки'),
//   createData('Pack Name', 4, '18.03.2021', 'Ivan Ivanov', 'какие то кнопки'),
//   createData('Pack Name', 4, '18.03.2021', 'Ivan Ivanov', 'какие то кнопки'),
//   createData('Pack Name', 4, '18.03.2021', 'Ivan Ivanov', 'какие то кнопки'),
// ];

type PropsType = {
  cardPacks: CardsPacksType[] | undefined
  page: number | undefined
}
export const TablePacks: FC<PropsType> = ({cardPacks, page}) => {
  const dispatch = useAppDispatch()

  const createData = useCallback ((
    name: string,
    cards: number,
    lastUpdated: string,
    createdBy: string,
    actions: any,
  ) => {
    return { name, cards, lastUpdated, createdBy, actions };
  }, [])

  const onSortCards = () => {
    page && dispatch(packsThunk.sortCardPacks({num: 0 }))
  }

  const rows = cardPacks !== undefined
    ? [...cardPacks]
    : null

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
          {cardPacks && cardPacks.map((row) => (
            <TableRow
              key={row.user_id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.cardsCount}</TableCell>
              <TableCell align="right">{row.updated}</TableCell>
              <TableCell align="right">{row.user_name}</TableCell>
              <TableCell align="right">{"Экшены"}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

