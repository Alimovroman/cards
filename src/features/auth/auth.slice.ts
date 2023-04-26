import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArgLoginType, ArgRegisterType, authApi, ProfileType } from "features/auth/auth.api";
import { AppDispatch, RootState } from "app/store";


const register = createAsyncThunk(
  "auth/register",
  ({ email, password }: ArgRegisterType, thunkAPI) => {
    authApi.register(email, password)
      .then((res) => {
      });
  }
);
const login = createAsyncThunk<{ profile: ProfileType }, ArgLoginType>("auth/login", async ({
                                                                                              email,
                                                                                              password,
                                                                                              rememberMe
                                                                                            }, thunkAPI) => {
    const res = await authApi.login(email, password, rememberMe);
    return { profile: res.data };
  }
);

const slice = createSlice({
  name: "auth",
  initialState: {
    profile: null as ProfileType | null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
    });
  }
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { register, login };