import axios from "axios";
import { BASE_URL } from "./config";
import Router from "next/router";
import { Box } from "@mui/material";
import { toast } from "react-toastify";

export const userApi = axios.create({
  baseURL: `${BASE_URL}`,
});

axios.interceptors.request.use(
  function (config) {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = "Bearer " + accessToken;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

export const email = async (userEmail) => {
  return await userApi.post(`/members/email`, {
    email: userEmail,
  });
};

export const authentication = () => {
  const accessToken = localStorage.getItem("accessToken");
  if (!accessToken) {
    Router.push("/login");
    setTimeout(() => {
      toast.error(
        <Box sx={{ fontFamily: "Gowun Dodum", textAlign: "center" }}>
          로그인이 필요합니다 😢
        </Box>,
        {
          position: toast.POSITION.TOP_CENTER,
          role: "alert",
        }
      );
    }, 100);
  }
};
