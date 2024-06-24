import axios from "axios";
const baseUrl = `http://localhost:8000/auth/api/v1`;
const baseUrl2 = `https://pro2052-restaurant-api.onrender.com/v1/users/`;
const token = "abc";
const installAxios = axios.create({
  baseURL: baseUrl2,
  headers: { Authorization: `Bearer ${token}` },
});

//LOGIN
const api = {
  loginUser: (payload) => axios.post(`${baseUrl}/login`, payload),

  getUser: (token, page, size, role) =>
    axios.get(`${baseUrl}/user?page=${page}&size=${size}&role=${role}`, {
      headers: { token: `Bearer ${token}` },
    }),

  deleteUSer: (token, id) =>
    axios.delete(`${baseUrl}/delete/${id}`, {
      headers: { token: `Bearer ${token}` },
    }),

  logoutUser: (token) =>
    axios.post(
      `${baseUrl}/logout`,
      {},
      {
        headers: { token: `Bearer ${token}` },
      }
    ),

  refreshToken: () => installAxios.post(`/refresh`),
};

export { api };
