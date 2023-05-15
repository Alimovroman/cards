import React from "react";
import style from "components/Packs/Packs.module.css";
import { SliderPacks } from "components/Packs/Slider";

export const SettingsPacks = () => {
  return (
    <div className={style.settingsBlock}>
      <div className={style.searchBlock}>
        <p>Search</p>
        <div>
          <input type="text" placeholder="Provide your text" />
        </div>
      </div>
      <div>
        <p>Show packs cards</p>
        <div>
          <button>My</button>
          <button>all</button>
        </div>
      </div>
      <SliderPacks />
      <div>
        <button>Какая то кнопка</button>
      </div>
    </div>
  );
};

