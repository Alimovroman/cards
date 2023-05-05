import { instance } from "common/api/common.api";
import { AxiosResponse } from "axios";

export const authApi = {
  register: (email: string, password: string) => {
    return instance.post<RegisterResponseType, AxiosResponse<RegisterResponseType>, ArgRegisterType>("auth/register", {
      email,
      password
    });
  },
  login: (email: string, password: string, rememberMe: boolean) => {
    return instance.post<ProfileType, AxiosResponse<ProfileType>, ArgLoginType>("auth/login", {
      email,
      password,
      rememberMe
    });
  },
  logout: () => {
    return instance.delete("auth/me");
  },
  authMe: () => {
    return instance.post<ProfileType, AxiosResponse<ProfileType>, {}>("auth/me", {})
  },
  forgot: (email: string, from: string, message: string) => {
    return instance.post<Response, AxiosResponse<Response>, DataForgot>("auth/forgot", { email, from, message });
  },
  changeName: (name: string) => {
    return instance.put("auth/me", { name })
  }
};

// types
export type RegisterResponseType = {
  addedUser: {
    _id: string;
    email: string;
    rememberMe: boolean;
    isAdmin: boolean;
    name: string;
    verified: boolean;
    publicCardPacksCount: number;
    created: string;
    updated: string;
    __v: number;
  };
};
export type ArgRegisterType = Omit<ArgLoginType, 'rememberMe'>

export type ArgLoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ProfileType = {
  _id: string;
  email: string;
  rememberMe: boolean;
  isAdmin: boolean;
  name: string;
  verified: boolean; // подтвердил ли почту
  publicCardPacksCount: number;
  created: Date;
  updated: Date;
  avatar?: string;
  error?: string;
}
export type Response =  {
  info: string
  error: string;
}
export type DataForgot = {
  email: string
  from: string
  message: string
}