import { RootState } from "app/store";
import { createSelector } from "@reduxjs/toolkit";

export const cardPacksTotalCountSelector = (state: RootState) => state.packs.cardPacksTotalCount
export const cardPacksSelector = (state: RootState) => state.packs.cardPacks
export const pageCountSelector = (state: RootState) => state.packs.pageCount
export const pageSelector = (state: RootState) => state.packs.page
export const activePackSelector = (state: RootState) => state.packs.activePack
export const allPageSelector = createSelector(
  cardPacksTotalCountSelector,
  pageCountSelector,
  (cardPacksTotalCount, pageCount) => Math.ceil(cardPacksTotalCount / pageCount))


