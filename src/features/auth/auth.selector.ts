import { RootState } from "app/store";

export const userIdSelector = (state: RootState) => state.auth.profile?._id
export const userNameSelector = (state: RootState) => state.auth.profile?.name
export const isLoggedInSelector = (state: RootState) => state.auth.isLoggedIn
export const isInitializedSelector = (state: RootState) => state.auth.isInitialized