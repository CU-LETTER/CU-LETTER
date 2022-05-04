import { LocalPostOffice } from "@mui/icons-material";
import axios from "axios";
import { userApi } from "./auth";
import { BASE_URL } from "./config";

export const usersApi = axios.create({
  baseURL: `${BASE_URL}/members`,
});

usersApi.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const pwValidation = async (password) => {
  return await usersApi.post(`/pwcheck`, {
    password: password,
  });
};

export const getUserInfo = async () => {
  return await usersApi.get();
};

export const changePw = async (password) => {
  return await usersApi.patch(`/password`, {
    password: password,
  });
};

export const deleteUser = async () => {
  return await usersApi.delete();
};

export const changeUsername = async (name) => {
  return await userApi.put(
    "/members/info",
    {
      name,
    },
    {
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    }
  );
};

export const changeProfileImage = async (image) => {
  const form = new FormData();
  form.append("profileImage", image);
  return await userApi.put("/members/profile", form, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: localStorage.getItem("accessToken"),
    },
  });
};
