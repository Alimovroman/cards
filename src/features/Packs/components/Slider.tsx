import React, { FC } from "react";
import style from "features/Packs/components/Packs.module.css";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { useActions } from "common/hooks";
import { packsThunk } from "features/Packs/service/packs.slice";

function valuetext(value: number) {
  return `${value}°C`;
}

const minDistance = 10;

export const SliderPacks: FC = () => {
  const [value, setValue] = React.useState<number[]>([20, 37]);
  const { fetchPacks } = useActions(packsThunk);
  const handleChangeCommitet = (
    event: React.SyntheticEvent | Event,
    newValue: number | number[],

  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }
    fetchPacks({page: 1, min: value[0], max: value[1]})
  };

  const handleChange = (
    event: Event,
    newValue: number | number[],
    activeThumb: number
  ) => {
    if (!Array.isArray(newValue)) {
      return;
    }

    if (activeThumb === 0) {
      setValue([Math.min(newValue[0], value[1] - minDistance), value[1]]);
    } else {
      setValue([value[0], Math.max(newValue[1], value[0] + minDistance)]);
    }
  };
  return (
    <div className={style.sliderBlock}>
      <p className={style.description}>Number of cards</p>
      <div className={style.sliderWrapper}>
        <span className={style.sliderValue}>{value[0]}</span>
        <div className={style.slider}>
          <Box sx={{ width: 150 }}>
            <Slider
              getAriaLabel={() => "Minimum distance"}
              value={value}
              onChange={handleChange}
              onChangeCommitted={handleChangeCommitet}
              valueLabelDisplay="auto"
              getAriaValueText={valuetext}
              disableSwap
            />
          </Box>
        </div>
        <span className={style.sliderValue}>{value[1]}</span>
      </div>
    </div>
  );
};

