import type {AxiosInstance} from "axios";
import axios from "axios";

export function createApi() {
    const config = useRuntimeConfig();

    if (config.public.isDev) {
        return constructApi('https://671f40e7e7a5792f052d8a2f.mockapi.io');
    }

    return constructApi('https://younesdjelloul.pythonanywhere.com');
}

function constructApi(baseUrl: string) {
    let api: AxiosInstance;

    api = axios.create({
        baseURL: baseUrl
    });

    api.interceptors.request.use((config) => {
        return config;
    });
    return api;
}

export function useApi() {
    return createApi()
}