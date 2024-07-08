import axios from 'axios';
import { clearAuthUser, getAuthUser, storeTokens } from '../helpers/token-helper';

const httpClient = axios.create({
    baseURL: `${import.meta.env.VITE_API_URL}`,
});

const refreshToken = async () => {
    const refreshToken = getAuthUser()?.refreshToken;
    const result = await httpClient.post('/auth/refresh', { refreshToken });
    if (result.data.accessToken) {
        storeTokens(result.data.accessToken, result.data.refreshToken)
        return result.data.accessToken;
    }else{
        clearAuthUser();
    }
}


//exios interceptors for authenrization header and refresh token
httpClient.interceptors.request.use((config) => {
    const token = getAuthUser()?.token;
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

httpClient.interceptors.response.use((response) => {
    return response;
},
    async function (error) {
        const originalRequest = error.config;
        console.log("error", error);
        if(error.response.status === 401 && originalRequest.url === '/auth/refresh'){
            return Promise.reject(error);
        }
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const token = await refreshToken();
            if (token) {
                axios.defaults.headers.common.Authorization = `Bearer ${token}`;
            }
            return httpClient(originalRequest);
        }
        return Promise.reject(error);
    }
);

export default httpClient;