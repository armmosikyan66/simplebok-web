import axios from 'axios';
import {API_URL} from "@/constants";

const $api = axios.create({
    withCredentials: true,
    baseURL: API_URL
})

$api.interceptors.request.use((config) => {
    config.headers = config.headers ?? {};
    config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
    return config;
})

$api.interceptors.response.use((config) => config, async (error) => {
    if (error.response.status === 401 && error.config) {
        localStorage.clear();
    }
    throw error;
});

export default $api;
