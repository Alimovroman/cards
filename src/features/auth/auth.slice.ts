import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ArgLoginType, ArgRegisterType, authApi, DataForgot, ProfileType } from "features/auth/auth.api";
import { AppDispatch, RootState } from "app/store";
import { createAppAsyncThunk } from "common/utils/create-app-async-thunk";

const register = createAppAsyncThunk<void, ArgRegisterType>("auth/register", async (arg, thunkAPI) => {
    const res = authApi.register(arg.email, arg.password)
  }
);

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType, {
  state: RootState,
  dispatch: AppDispatch,
  rejectValue: unknown
}>("auth/login", async (arg, thunkAPI) => {
    const res = await authApi.login(arg.email, arg.password, arg.rememberMe);
    return { profile: res.data };
  }
);

const logout = createAppAsyncThunk("auth/logout", (thunkAPI) => {
  authApi.logout()
    .then(res => {
    });
});

const authMe = createAppAsyncThunk<{ profile: ProfileType }>("auth/authMe", async (thunkAPI) => {
  const res = await authApi.authMe();
  return { profile: res.data };
});

const forgot = createAppAsyncThunk<void, DataForgot>("auth/forgot", async (arg, thunkAPI) => {
  const res = await authApi.forgot(arg.email, arg.from, arg.message);
});

const changeName = createAppAsyncThunk<{ profile: ProfileType }, { name: string }>("auth/changeName", async (arg, thunkAPI) => {
  const res = await authApi.changeName(arg.name);
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