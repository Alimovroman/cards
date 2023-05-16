import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import { packsApi } from "components/Packs/packs.api";

const setPacks = createAppAsyncThunk<{packs: PacksType }, {page: number}>
("packs/setPacks", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.getPacks(arg!.page);
    return { packs: res.data };
  });
});
const sortCardPacks = createAppAsyncThunk<{packs: PacksType }, {num: number}>
("packs/sortCardPacks", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.sortCardPacks(arg.num)
    return { packs: res.data };
  });
});
const addNewPacks = createAppAsyncThunk<any, {title: string}>
("packs/addNewPacks", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.addNewPack(arg.title)
    return { packs: res.data };
  });
});
export type CardsPacksType = {
  _id: string
  user_id: string
  user_name: string
  private: boolean
  name: string
  path: string
  grade: number
  shots: number
  cardsCount: number
  type: string
  rating: number
  created: string
  updated: string
  more_id: string
  __v: number
}

export type PacksType = {
  cardPacks: CardsPacksType[]
  cardPacksTotalCount: number
  // количество колод
  maxCardsCount: number
  minCardsCount: number
  page: number // выбранная страница
  pageCount: number
  token: string
  tokenDeathTime: string
}

const slice = createSlice({
  name: "packs",
  initialState: {
    packs: null as null | PacksType,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(setPacks.fulfilled, (state, action) => {
        state.packs = action.payload.packs;
      })
      .addCase(sortCardPacks.fulfilled, (state, action) => {
        state.packs = action.payload.packs;
      })
      .addCase(addNewPacks.fulfilled, (state, action) => {
        console.log(action);
      })
  }
});

export const packsReducer = slice.reducer;
export const packsThunk = { setPacks, sortCardPacks, addNewPacks };