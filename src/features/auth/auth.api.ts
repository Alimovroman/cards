import { instance } from "common/api/common.api";
import { AxiosResponse } from "axios";

export const authApi = {
  register: (email: string, password: string ) => {
    return instance.post<RegisterResponseType, AxiosResponse<RegisterResponseType>, ArgRegisterType>("auth/register", {
      email,
      password
    });
  },
  login: (email: string, password: string, rememberMe: boolean ) => {
    return instance.post<ProfileType, AxiosResponse<ProfileType>, ArgLoginType>("auth/login", {
      email,
      password,
      rememberMe
    });
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
export type ArgRegisterType = {
  email: string;
  password: string;
};

export type ArgLoginType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

export type ProfileType = {
  _id: string;
  email: string;
  name: string;
  avatar?: string;
  publicCardPacksCount: number;
// количество колод

  created: Date;
  updated: Date;
  isAdmin: boolean;
  verified: boolean; // подтвердил ли почту
  rememberMe: boolean;

  error?: string;
}