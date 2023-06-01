import React, { ChangeEvent, FC, useCallback, useState } from "react";
import style from "components/Packs/Packs.module.css";
import { SliderPacks } from "components/Packs/Slider";
import { useActions } from "common/hooks";
import { packsThunk } from "components/Packs/packs.slice";
import debounce  from "lodash.debounce"

type Props = {
  userId: string | undefined
}
export const SettingsPacks: FC<Props> = ({ userId }) => {
  const { fetchPacks } = useActions(packsThunk);
  const [value, setValue] = useState('')

  const updateValue = (inputValue: string) => {
    fetchPacks({packName: inputValue})
  }
   const debounceOnChange = useCallback( debounce(updateValue, 700), [])

  const searchPacksOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    debounceOnChange(e.currentTarget.value)
  };
  const showMyPacksHandler = () => {
    fetchPacks({ page: 1, userId });
  };
  const showAllPacksHandler = () => {
    fetchPacks({ page: 1 });
  };
  return (
    <div className={style.settingsBlock}>
      <div className={style.searchBlock}>
        <p>Search</p>
        <div>
          <input type="text" placeholder="Provide your text" value={value} onChange={searchPacksOnChange} />
        </div>
      </div>
      <div>
        <p>Show packs cards</p>
        <div>
          <button onClick={showMyPacksHandler}>My</button>
          <button onClick={showAllPacksHandler}>all</button>
        </div>
      </div>
      <SliderPacks />
      <div>
        <button onClick={() => fetchPacks({})}>Reset</button>
      </div>
    </div>
  );
};

