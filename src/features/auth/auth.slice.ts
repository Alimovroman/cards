import { createSlice } from "@reduxjs/toolkit";
import { ArgLoginType, ArgRegisterType, authApi, DataForgot, ProfileType } from "features/auth/auth.api";
import { createAppAsyncThunk } from "common/utils";
import { thunkTryCatch } from "common/utils";

const register = createAppAsyncThunk<void, ArgRegisterType>
("auth/register", async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await authApi.register(arg.email, arg.password);
    });
  }
);

const login = createAppAsyncThunk<{ profile: ProfileType }, ArgLoginType>
("auth/login", async (arg, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
        const res = await authApi.login(arg.email, arg.password, arg.rememberMe);
        return { profile: res.data };
      },
      true
    );
  }
);

const logout = createAppAsyncThunk("auth/logout", async (thunkAPI) => {
  const res = await authApi.logout();

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
    profile: null as ProfileType | null,
    isLoggedIn: false
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // .addCase(register.fulfilled, (state, action) => {
      // })
      // .addCase(register.rejected, (state, action) => {
      //
      // })
      .addCase(login.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.profile = null;
      })
      .addCase(authMe.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
      })
      .addCase(changeName.fulfilled, (state, action) => {
        state.profile = action.payload.profile;
      });
  }
});

export const authReducer = slice.reducer;
export const authActions = slice.actions;
export const authThunks = { register, login, logout, forgot, authMe, changeName };