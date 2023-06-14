import React, { ChangeEvent, FC, useCallback, useState } from "react";
import style from "features/Packs/components/Packs.module.css";
import { SliderPacks } from "features/Packs/components/Slider";
import { useActions } from "common/hooks";
import { packsThunk } from "features/Packs/service/packs.slice";
import debounce  from "lodash.debounce"
import filterResetIcon from 'common/images/filter_icon.svg'
import { SearchInput } from "common/components/SearchInput/SearchInput";

type Props = {
  userId: string | undefined
}
export const SettingsPacks: FC<Props> = ({ userId }) => {
  const { fetchPacks } = useActions(packsThunk);

  const [buttonActive, setButtonActive] = useState<'All' | 'MY'>('All')

  const updateValue = (inputValue: string) => {
    fetchPacks({packName: inputValue})
  }

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
        <SearchInput description={'Search'} callBack={updateValue}/>
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

