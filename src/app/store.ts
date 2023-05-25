import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import counterReducer from '../features/counter/counterSlice';
import { appReducer } from "app/app.slice";
import { authReducer } from "features/auth/auth.slice";
import { packsReducer } from "components/Packs/packs.slice";
import { cardsApi } from "features/Cards/service/cards.api";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
  reducer: {
    app: appReducer,
    auth: authReducer,
    packs:packsReducer,
    [cardsApi.reducerPath]: cardsApi.reducer,
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(cardsApi.middleware)
});

setupListeners(store.dispatch)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
