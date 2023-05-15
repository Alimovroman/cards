import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AxiosError, isAxiosError } from "axios";


const slice = createSlice({
  name: "app",
  initialState: {
    error: null as string | null,
    isLoading: false,
    isAppInitialized: false
  },
  reducers: {
    setIsloading: (state, action: PayloadAction<{ isLoading: boolean }>) => {
      state.isLoading = action.payload.isLoading;
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error;
    }
  },
  extraReducers: builder => {
    builder
      .addMatcher((action) => action.type.endsWith("/pending"),
        (state, action) => {
          state.isLoading = true;
          console.log("addmatcher reducer");
        }
      )
      .addMatcher((action) => action.type.endsWith("/rejected"),
        (state, action) => {
          state.isLoading = false;
          if(!action.payload.showGlobalError) return

          const err = action.payload.e as Error | AxiosError<{ error: string }>;
          if (isAxiosError(err)) {
            state.error = err.response ? err.response.data.error : err.message;
          } else {
            state.error = `Native error ${err.message}`
          }

        }
      )
      .addMatcher((action) => action.type.endsWith("/fulfilled"),
        (state, action) => {
          state.isLoading = false;
        })
      .addDefaultCase((state, action) => {
        console.log("addDefaultCase 🚀", action.type);
      })
  }
});

export const appReducer = slice.reducer;

export const appActions = slice.actions;