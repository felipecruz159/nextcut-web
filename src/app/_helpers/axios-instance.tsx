import axios from 'axios';
require("dotenv").config();

export const axiosInstance = axios.create({
   baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
})

export const imagebarberShop = axios.create({
   baseURL: process.env.NEXT_PUBLIC_IMAGE_BARBER_SHOP,
});