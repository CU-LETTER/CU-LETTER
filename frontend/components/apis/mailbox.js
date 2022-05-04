import axios from "axios";
import { BASE_URL } from "./config";

export const mailboxesApi = axios.create({
  baseURL: `${BASE_URL}/mailboxes`,
});

mailboxesApi.interceptors.request.use(
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

export const getRecvMails = async () => {
  return await mailboxesApi.get(`/recv`);
};

export const getRecvMailsBySender = async (senderId) => {
  return await mailboxesApi.get(`/recv/${senderId}`);
};

export const getUndoneMail = async () => {
  return await mailboxesApi.get(`/undone`);
};

export const getSendMail = async () => {
  return await mailboxesApi.get(`/send`);
};

export const deleteRecvMail = async (selectedMail) => {
  return await mailboxesApi.delete(`/recv`, {
    data: { mail_id: selectedMail },
  });
};

export const deleteUndoneMail = async (mailId) => {
  return await mailboxesApi.delete(
    `/undone`,
    { data: { mail_id: mailId } },
    {
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteSendMail = async (mailId) => {
  return await mailboxesApi.delete(`/send`, { data: { mail_id: mailId } });
};
