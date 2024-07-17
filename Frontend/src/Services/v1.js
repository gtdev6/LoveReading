// src/services/axiosInstance.js
import axios from "axios";
import { useAuth } from "../Context/AuthContext.js";

const API = axios.create({
        baseURL: "http://localhost:8080/api/v1",
        withCredentials: true, // This ensures cookies are sent with requests
});

// Create a function to setup interceptors
export const setupInterceptors = (store) => {
        API.interceptors.request.use(
                (config) => {
                        const { auth } = store.getState().auth; // Adjust based on how you manage auth state
                        if (auth?.accessToken) {
                                config.headers.Authorization = `Bearer ${auth.accessToken}`;
                        }
                        return config;
                },
                (error) => Promise.reject(error),
        );

        API.interceptors.response.use(
                (response) => response,
                async (error) => {
                        const { config, response } = error;
                        const { auth, setAuth } = useAuth(); // Adjust based on how you manage auth state

                        if (response.status === 401 && !config._retry) {
                                config._retry = true;

                                try {
                                        const { data } = await axios.get(
                                                `${API.defaults.baseURL}/refresh`,
                                                {
                                                        withCredentials: true,
                                                },
                                        );
                                        setAuth((prev) => ({
                                                ...prev,
                                                accessToken: data.accessToken,
                                        }));
                                        config.headers.Authorization = `Bearer ${data.accessToken}`;
                                        return axios(config);
                                } catch (refreshError) {
                                        setAuth(null); // Clear auth on refresh token failure
                                        return Promise.reject(refreshError);
                                }
                        }

                        return Promise.reject(erroaxiosInstance.jsr);
                },
        );
};

export default API;
