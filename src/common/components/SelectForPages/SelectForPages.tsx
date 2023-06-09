import React, { FC, useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

type Props = {
  callBack?: (pageCount: number) => void
  namePage: string
}
export const SelectForPages: FC<Props> = ({callBack, namePage}) => {
  const [valueInput, setValueInput] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setValueInput(event.target.value as string);
    callBack && callBack(+event.target.value)
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
      <InputLabel id="demo-simple-select-label">{namePage}</InputLabel>
      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={valueInput}
        label= {namePage}
        onChange={handleChange}
      >
        <MenuItem value={4}>4</MenuItem>
        <MenuItem value={10}>10</MenuItem>
        <MenuItem value={20}>20</MenuItem>
        <MenuItem value={30}>30</MenuItem>
        <MenuItem value={50}>50</MenuItem>
      </Select>
    </FormControl>
  );
};
