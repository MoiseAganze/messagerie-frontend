import axios from "axios";

const host = import.meta.env.VITE_BACKEND_HOST;
console.log("host:" + host);

export const apiAuth = axios.create({
  baseURL: host,
});
export const api = axios.create({
  baseURL: host,
});
api.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("kento");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    } else {
      return Promise.reject("Token manquant");
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
