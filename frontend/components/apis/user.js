import axios from "axios";

const BASE_URL = process.env.NEXT_PUBLIC_SERVER_BASE_URL;

export const userApi = axios.create({
  baseURL: `${BASE_URL}`,
});

userApi.interceptors.request.use(
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

export const searchUsers = async (userInput) => {
  return await userApi.post("/friends/search", {
    email: userInput,
  });
};

export const lookUpRequest = async () => {
  return await userApi.get("/friends/request");
};

export const getFriends = async () => {
  return await userApi.get("/friends");
};

export const requestFriend = async (memberId) => {
  return await userApi.post("/friends/request", {
    member_id: memberId,
  });
};

export const requestCancelFriend = async (memberId) => {
  return await userApi.post("/friends/request/cancel", {
    member_id: memberId,
  });
};

export const acceptFriend = async (memberId) => {
  return await userApi.post("/friends/accept", {
    member_id: memberId,
  });
};

export const declineFriend = async (memberId) => {
  return await userApi.post("/friends/decline", {
    member_id: memberId,
  });
};

export const setfavoriteFriend = async (memberId) => {
  return await userApi.post("/friends/favorite", {
    member_id: memberId,
  });
};

export const deleteFriend = async (memberId) => {
  return await userApi.delete("/friends/delete", {
    data: {
      member_id: memberId,
    },
  });
};

export const login = async (userId, userPw) => {
  return await userApi.post("/members/signin", {
    email: userId,
    password: userPw,
  });
};
