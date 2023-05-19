import { BaseThunkAPI } from "@reduxjs/toolkit/dist/createAsyncThunk";
import { AppDispatch, RootState } from "app/store";
import { appActions } from "app/app.slice";

/**
 * Обертка для Redux-Thunk, которая позволяет перехватывать и обрабатывать ошибки в сайд-эффектах.
 * @async
 * @function thunkTryCatch
 * @param {BaseThunkAPI<RootState, any, AppDispatch, unknown>} thunkAPI - объект, содержащий методы `dispatch`, `getState`, `extra`, `rejectWithValue` для использования внутри `logic`.
 * @param {Function} logic - сайд-эффект, который необходимо выполнить в `try...catch` блоке.
 * @param {boolean} [showGlobalError=true] - флаг, указывающий, нужно ли выводить глобальную ошибку.
 * @returns {Promise<any>} результат выполнения `logic` в случае успешного выполнения, либо объект `{ e, showGlobalError }`, в случае возникновения ошибки.
 */
export const thunkTryCatch = async (thunkAPI: BaseThunkAPI<RootState, any, AppDispatch, unknown>,
                                    logic: Function,
                                    showGlobalError: boolean = true) => {
  const { rejectWithValue } = thunkAPI;
  try {
    // thunkAPI.dispatch(appActions.setIsloading({isLoading: true}))
    return await logic();
  } catch (e) {
    return rejectWithValue({ e, showGlobalError  });
  }
};

