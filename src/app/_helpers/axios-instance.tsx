import axios from 'axios';
require("dotenv").config();
export const axiosInstance = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})