// utils/api.js
import axios from "axios";
import { BASE_URL } from "./config";


const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: "Bearer " + localStorage.getItem("JWT"),
  },
});

export default api;
