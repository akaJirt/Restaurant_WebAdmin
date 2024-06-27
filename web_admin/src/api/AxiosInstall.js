import axios from "axios";
import { store } from "../store/store";
const baseUrl = `https://pro2052-restaurant-api.onrender.com/v1/`;

const axiosInstance = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state = store.getState();
    const token = state.accessToken.getAccessToken.payload;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;

const api = {
  loginUser: (payload) => axiosInstance.post(`users/login`, payload),
  getMe: () => axiosInstance.get(`users/me`),
};

const apiTables = {
  getTable: () => axiosInstance.get("tables"),
  createTable: (tableNumber) => axiosInstance.post("tables", { tableNumber }),
  updateTable: (id, tableNumber) =>
    axiosInstance.patch(`tables/${id}`, { tableNumber }),
  deleteTable: (id) => axiosInstance.delete(`tables/${id}`),
  updateStatusTable: (id, status) =>
    axiosInstance.patch(`tables/update-status/${id}`, { status }),
};

const apiCategories = {
  getCategories: () => axiosInstance.get(`categories`),
  createCategory: (name) => axiosInstance.post(`categories`, { name }),
  updateCategory: (id, name) =>
    axiosInstance.patch(`categories/${id}`, { name }),
  deleteCategory: (id) => axiosInstance.delete(`categories/${id}`),
};

export { api, apiTables, apiCategories };
