import { authReducer, authThunks } from "features/auth/auth.slice";

describe("authReducer", () => {
  const initialState = {
    profile: null,
    isLoggedIn: false,
    isInitialized: false
  };

  it("should login work correctly and return profile", () => {
    const data = {
      email: "alimov.ramon@gmail.com",
      password: "1a2s3d4f5g",
      rememberMe: false
    };

    const profile = {
      _id: "6449575b41fe56350487d85c",
      email: "alimov.ramon@gmail.com",
      rememberMe: false,
      isAdmin: false,
      name: "Roman",
      verified: false,
      publicCardPacksCount: 1,
      created: "2023-04-26T16:54:51.699Z",
      updated: "2023-05-19T21:38:42.252Z",

    };

    // 1. Если мы проверяем успешный кейс, тогда пишем fulfilled (authThunks.login.fulfilled)
    // 2. fulfilled принимает 3 параметра
    // 2.1. То, что thunk возвращает
    // 2.2. Ожидает строку. Будем везде писать "requestId" - meta информация.
    // 2.3. То, что thunk принимает
    const action = authThunks.login.fulfilled({ profile }, "requestId", data);

    const state = authReducer(initialState, action);

    expect(state.profile).toEqual(profile);
  });
});
