import { PayloadAction } from "@reduxjs/toolkit";
import { appReducer, appActions } from "app/app.slice";

describe("appReducer", () => {
  const initialState = {
    error: null,
    isLoading: false,
    isAppInitialized: false,
    unHandleActions: [],
  };

  it("should set isLoading correctly", () => {
    const action = appActions.setIsloading({ isLoading: true });

    const state = appReducer(initialState, action);

    expect(state.isLoading).toEqual(true);
  });

  it("should set error correctly", () => {
    const action = appActions.setAppError({ error: "An error has occurred." });

    const state = appReducer(initialState, action);

    expect(state.error).toEqual("An error has occurred.");
  });

});


