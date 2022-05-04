import axios from "axios";
import { BASE_URL } from "./config";

export const mailsApi = axios.create({
  baseURL: `${BASE_URL}/mails`,
});

mailsApi.interceptors.request.use(
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

export const sendTempMail = async (body, mailId) => {
  return await mailsApi.post(`/tempsave/write/${mailId}`, body);
};
export const sendLetter = async (body) => {
  return await mailsApi.post(`/write`, body);
};

export const getMail = async (id) => {
  return await mailsApi.get(`/id/${id}`);
};

export const getMailByCode = async (code) => {
  return await mailsApi.get(`/code/${code}`);
};

export const saveRecvMail = async (code) => {
  return await mailsApi.post(`/recvsave/${code}`);
};

export const fetchPostCardImage = async (photo) => {
  const form = new FormData();
  form.append("postcard_image", photo);
  return await mailsApi.post(`/postcard`, form, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const analyzeLetterContent = async (content) => {
  return await mailsApi.post("/analyze", {
    content,
  });
};

export const getRecommendImage = async (body) => {
  return await mailsApi.post("/style", body);
};
