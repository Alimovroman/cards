import React from "react";
import { NavLink } from "react-router-dom";
import style from "common/components/NavigationToPackList/NavigationToPackList.module.css";
import arrowIcon from "common/images/arrow_left_icon.svg";

export const NavigationToPackList = () => {
  return (
    <div>
      <NavLink to={"/packs"} className={style.navigation}>
        <img src={arrowIcon} alt={"arrow_icon"} />
        <div className={style.navigationDescription}>
          Back to Pack List
        </div>
      </NavLink>
    </div>
  );
};

