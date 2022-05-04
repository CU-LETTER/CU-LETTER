import axios from "axios";
import { BASE_URL } from "./config";

const recommendApi = axios.create({
  baseURL: `${BASE_URL}`,
});

recommendApi.interceptors.request.use(
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

const getEmotion = async (body) => {
  const result = await recommendApi.post(`/mails/analyze`, body);
  return result;
};
const getRecommendImage = async (body) => {
  const result = await recommendApi.get(`/mails/style`, body);
  return result;
};
const getRecommendMusic = async (body) => {
  const result = await recommendApi.post(`/mails/music`, body);
  return result;
};

const RecommendApi = {
  getEmotion,
  getRecommendImage,
  getRecommendMusic,
};

export default RecommendApi;
