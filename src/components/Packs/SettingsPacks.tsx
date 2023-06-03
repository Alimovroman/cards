import React, { ChangeEvent, FC, useCallback, useState } from "react";
import style from "components/Packs/Packs.module.css";
import { SliderPacks } from "components/Packs/Slider";
import { useActions } from "common/hooks";
import { packsThunk } from "components/Packs/packs.slice";
import debounce  from "lodash.debounce"
import searchIcon from './../../common/images/search-icon.svg'
import filterResetIcon from './../../common/images/filter_icon.svg'

type Props = {
  userId: string | undefined
}
export const SettingsPacks: FC<Props> = ({ userId }) => {
  const { fetchPacks } = useActions(packsThunk);
  const [value, setValue] = useState('')
  const [buttonActive, setButtonActive] = useState<'All' | 'MY'>('All')

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
    setButtonActive("MY")
  };
  const showAllPacksHandler = () => {
    fetchPacks({ page: 1 });
    setButtonActive("All")
  };
  return (
    <div className={style.settingsBlock}>
      <div className={style.searchBlock}>
        <p className={style.description}>Search</p>
        <div className={style.searchInputWrapper}>
          <input type="text"
                 placeholder="Provide your text"
                 value={value}
                 onChange={searchPacksOnChange}
                 className={style.searchInput}
          />
          <img src={searchIcon} alt={'loop'} className={style.searchIcon}/>
        </div>
      </div>
      <div>
        <p className={style.description}>Show packs cards</p>
        <div>
          <button onClick={showMyPacksHandler}
                  className={buttonActive === 'MY'
                    ? `${style.buttonShowPack} ${style.activeButton}`
                    : style.buttonShowPack}>
            My
          </button>
          <button onClick={showAllPacksHandler}
                  className={buttonActive === 'All'
                    ? `${style.buttonShowPack} ${style.activeButton}`
                    : style.buttonShowPack}>
            All
          </button>
        </div>
      </div>
      <SliderPacks />
      <div>
        <button onClick={() => fetchPacks({})} className={style.buttonReset}>
          <img src={filterResetIcon} alt={'resetIcon'}/>
        </button>
      </div>
    </div>
  );
};

