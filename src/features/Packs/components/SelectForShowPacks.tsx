import React, { useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useActions } from "common/hooks";
import { packsThunk } from "features/Packs/service/packs.slice";

export const SelectForShowPacks = () => {
  const [packs, setPacks] = useState('');
  const {fetchPacks} = useActions(packsThunk)

  const handleChange = (event: SelectChangeEvent) => {
    setPacks(event.target.value as string);
    fetchPacks({pageCount: +event.target.value})
  };

  return (
      <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
        <InputLabel id="demo-simple-select-label">Packs</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={packs}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>10</MenuItem>
          <MenuItem value={20}>20</MenuItem>
          <MenuItem value={30}>30</MenuItem>
          <MenuItem value={50}>50</MenuItem>
          <MenuItem value={100}>100</MenuItem>
        </Select>
      </FormControl>
  );
};

