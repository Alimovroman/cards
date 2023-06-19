import * as React from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export function RadioButtonsGroup() {
  return (
    <FormControl>
      <FormLabel id="demo-radio-buttons-group-label">Rate yourself:</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        defaultValue="female"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="Did nor know" />
        <FormControlLabel value="male" control={<Radio />} label="Forgot" />
        <FormControlLabel value="other" control={<Radio />} label="A lot of thought" />
        <FormControlLabel value="other" control={<Radio />} label="Confused" />
        <FormControlLabel value="other" control={<Radio />} label="Knew the answer" />
      </RadioGroup>
    </FormControl>
  );
}