import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArgLoginType, ArgRegisterType, authApi, DataForgot, ProfileType } from "features/auth/auth.api";

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

const logout = createAsyncThunk("auth/logout", (thunkAPI) => {
  authApi.logout()
    .then(res => {
    });
});

const authMe = createAsyncThunk<{ profile: ProfileType }>("auth/authMe", async (thunkAPI) => {
  const res = await authApi.authMe();
  return { profile: res.data };
});

const forgot = createAsyncThunk<void, DataForgot>("auth/forgot", async ({
                                                                          email,
                                                                          from,
                                                                          message
                                                                        }, thunkAPI) => {
  const res = await authApi.forgot(email, from, message);
});

const changeName = createAsyncThunk<{ profile: ProfileType }, { name: string }>("auth/changeName", async ({ name }, thunkAPI) => {
  const res = await authApi.changeName(name);
  return { profile: res.data };
});

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
    builder.addCase(logout.fulfilled, (state, action) => {
      state.profile = null;
    });
    builder.addCase(authMe.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
    });
    builder.addCase(changeName.fulfilled, (state, action) => {
      state.profile = action.payload.profile;
    });
  }
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { register, login, logout, forgot, authMe, changeName };