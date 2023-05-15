import React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import style from './Packs.module.css'

function createData(
  name: string,
  cards: number,
  lastUpdated: string,
  createdBy: string,
  actions: any,
) {
  return { name, cards, lastUpdated, createdBy, actions };
}

const rows = [
  createData('Pack Name', 4, '18.03.2021', 'Ivan Ivanov', 'какие то кнопки'),
  createData('Pack Name', 4, '18.03.2021', 'Ivan Ivanov', 'какие то кнопки'),
  createData('Pack Name', 4, '18.03.2021', 'Ivan Ivanov', 'какие то кнопки'),
  createData('Pack Name', 4, '18.03.2021', 'Ivan Ivanov', 'какие то кнопки'),
];

export const TablePacks = () => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead className={style.tableHead}>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right" >Cards</TableCell>
            <TableCell align="right">Last updated</TableCell>
            <TableCell align="right">Created by</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.cards}</TableCell>
              <TableCell align="right">{row.lastUpdated}</TableCell>
              <TableCell align="right">{row.createdBy}</TableCell>
              <TableCell align="right">{row.actions}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

