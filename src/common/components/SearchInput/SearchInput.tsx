import React, { ChangeEvent, FC, useCallback, useState } from "react";
import style from "./SearchInput.module.css";
import searchIcon from "common/images/search-icon.svg";
import debounce from "lodash.debounce";

type Props = {
  description: string
  callBack: (inputValue: string) => void
}
export const SearchInput: FC<Props> = ({description, callBack}) => {
  const [value, setValue] = useState('')

  const debounceOnChange = useCallback( debounce(callBack, 700), [])

  const searchPacksOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value)
    debounceOnChange(e.currentTarget.value)
  };

  return (
    <div>
      <p className={style.description}>{description}</p>
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
  );
};

