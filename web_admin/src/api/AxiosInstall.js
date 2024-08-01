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
    // Check if the data is FormData, if so, set the appropriate Content-Type
    if (config.data && config.data instanceof FormData) {
      config.headers["Content-Type"] = "multipart/form-data";
    } else {
      config.headers["Content-Type"] = "application/json";
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default axiosInstance;

//*******************************USERS********************************* */
const api = {
  loginUser: (payload) => axiosInstance.post(`users/login`, payload),
  getMe: () => axiosInstance.get(`users/me`),
  getUser: () => axiosInstance.get(`users`),
  createUser: (data) => axiosInstance.post(`users/register`, data),
  updateMe: (data) => axiosInstance.patch(`users/update-me`, data),
  deleteUser: (id) => axiosInstance.delete(`users/delete-user/${id}`),
  updatePassword: (currentPassword, newPassword) =>
    axiosInstance.patch(`users/update-password`, {
      currentPassword,
      newPassword,
    }),
  forgotPassword: (email) =>
    axiosInstance.post(`users/forgot-password`, { email }),
  resetPassword: (token, password) =>
    axiosInstance.patch(`users/reset-password/${token}`, { password }),
  historyUser: (id) =>
    axiosInstance.get(`payments/payments-history?userId=${id}`),
};
//*******************************TABLES********************************* */

const apiTables = {
  getTable: () => axiosInstance.get("tables"),
  createTable: (tableNumber) => axiosInstance.post("tables", { tableNumber }),
  updateTable: (id, tableNumber) =>
    axiosInstance.patch(`tables/${id}`, { tableNumber }),
  deleteTable: (id) => axiosInstance.delete(`tables/${id}`),
  updateStatusTable: (id, status) =>
    axiosInstance.patch(`tables/update-status/${id}`, { status }),
};
//*******************************CATEGORIES********************************* */

const apiCategories = {
  getCategories: () => axiosInstance.get(`categories`),
  createCategory: (name) => axiosInstance.post(`categories`, { name }),
  updateCategory: (id, name) =>
    axiosInstance.patch(`categories/${id}`, { name }),
  deleteCategory: (id) => axiosInstance.delete(`categories/${id}`),
};
//*******************************MENU ITEM********************************* */

const apiMenuItem = {
  getMenuItem: () => axiosInstance.get(`menu-items`),
  createMenuItem: (data) => axiosInstance.post(`menu-items`, data),
  deleteMenuItem: (id) => axiosInstance.delete(`menu-items/${id}`),
  putMenuItem: (id, data) => axiosInstance.patch(`menu-items/${id}`, data),
};
//*******************************Orders********************************* */
const apiOrder = {
  getOrder: () => axiosInstance.get(`payments/payments-history`),
};
//*******************************Promotions********************************* */
const apiPromotion = {
  getApiPromotion: () => axiosInstance.get(`promotions`),
  postApiPromotion: (data) => axiosInstance.post(`promotions`, data),
  deleteApiPromotion: (id) => axiosInstance.delete(`promotions/${id}`),
  updateApiPromotion: (id, data) =>
    axiosInstance.patch(`promotions/${id}`, data),
  updateStatusPromotion: (id) =>
    axiosInstance.patch(`promotions/update-status/${id}`),
  resetAllPromotion: () => axiosInstance.post(`promotions/reset-promotion`),
};
export { api, apiTables, apiCategories, apiMenuItem, apiOrder, apiPromotion };
