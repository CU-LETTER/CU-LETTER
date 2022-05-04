import axios from "axios";
import { BASE_URL } from "./config";

const mailApi = axios.create({
  baseURL: `${BASE_URL}`,
});

mailApi.interceptors.request.use(
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

const getTempSave = async (body, letterId) => {
  const result = await mailApi.post(`/mails/tempsave/${letterId}`, body);
  return result;
};

const getMailById = async (letterId) => {
  const result = await mailApi.get(`/mails/id/${letterId}`);
  return result;
};

const MailApi = {
  getTempSave,
  getMailById,
};

export default MailApi;
