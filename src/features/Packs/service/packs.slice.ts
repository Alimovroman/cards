import { createSlice } from "@reduxjs/toolkit";
import { createAppAsyncThunk, thunkTryCatch } from "common/utils";
import {
  ArgCreatePackType,
  FetchPacksResponseType,
  packsApi,
  PackType
} from "features/Packs/service/packs.api";
import { authThunks } from "features/auth/auth.slice";

const fetchPacks = createAppAsyncThunk<{ packsPage: FetchPacksResponseType }, {
  page?: number, userId?: string, min?: number, max?: number, packName?: string, sortPacks?: string, pageCount?: number
}>
("packs/setPacks", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.getPacks({
      page: arg.page,
      user_id: arg.userId,
      min: arg.min,
      max: arg.max,
      packName: arg.packName,
      sortPacks: arg.sortPacks,
      pageCount: arg.pageCount
    });
    return { packsPage: res.data };
  });
});
const addNewPacks = createAppAsyncThunk<{ pack: PackType }, ArgCreatePackType>
("packs/addNewPacks", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.addNewPack(arg);
    return { pack: res.data.newCardsPack };
  });
});
const removePack = createAppAsyncThunk<{ packId: string }, string>
("packs/removePacks", async (id, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.removePack(id);
    return { packId: res.data.deletedCardsPack._id };
  });
});
const updatePack = createAppAsyncThunk<{ pack: PackType }, PackType>
("pack/updatePack", async (arg, thunkAPI) => {
  return thunkTryCatch(thunkAPI, async () => {
    const res = await packsApi.updatePack(arg);
    return { pack: res.data.updatedCardsPack };
  });
});

const slice = createSlice({
  name: "packs",
  initialState: {
    cardPacks: [] as PackType[],
    page: 1,
    pageCount: 4,
    cardPacksTotalCount: 2000,
    minCardsCount: 0,
    maxCardsCount: 100,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPacks.fulfilled, (state, action) => {
        const packsPage = action.payload.packsPage;
        state.cardPacks = packsPage.cardPacks;
        state.page = packsPage.page;
        state.pageCount = packsPage.pageCount;
        state.cardPacksTotalCount = packsPage.cardPacksTotalCount;
        state.minCardsCount = packsPage.minCardsCount;
        state.maxCardsCount = packsPage.maxCardsCount;
      })
      .addCase(addNewPacks.fulfilled, (state, action) => {
        state.cardPacks.unshift(action.payload.pack);
      })
      .addCase(removePack.fulfilled, (state, action) => {
        const index = state.cardPacks.findIndex((pack) => pack._id === action.payload.packId);
        if (index !== -1) state.cardPacks.splice(index, 1);
      })
      .addCase(updatePack.fulfilled, (state, action) => {
        const index = state.cardPacks.findIndex((pack => pack._id === action.payload.pack._id));
        if (index !== -1) state.cardPacks[index] = action.payload.pack;

      })

      .addCase(authThunks.logout.fulfilled, (state, action) => {
        state.cardPacks = [];
      });

  }
});

export const packsReducer = slice.reducer;
export const packsThunk = { fetchPacks, addNewPacks, updatePack, removePack };