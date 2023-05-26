import { RootState } from "app/store";

export const userIdSelector = (state: RootState) => state.auth.profile?._id