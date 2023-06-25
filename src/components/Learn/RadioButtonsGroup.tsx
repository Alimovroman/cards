import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { ChangeEvent, FC } from "react";

type Props = {
  callBack: (value: number) => void
}

export const RadioButtonsGroup: FC<Props> = ({callBack}) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    callBack(+e.target.value)
  }


  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Rate yourself:</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="1"
        name="radio-buttons-group"
        onChange={onChangeHandler}
      >
        <FormControlLabel value="1" control={<Radio />} label="Did nor know" />
        <FormControlLabel value="2" control={<Radio />} label="Forgot" />
        <FormControlLabel value="3" control={<Radio />} label="A lot of thought" />
        <FormControlLabel value="4" control={<Radio />} label="Confused" />
        <FormControlLabel value="5" control={<Radio />} label="Knew the answer" />
      </RadioGroup>
    </FormControl>
  );
}