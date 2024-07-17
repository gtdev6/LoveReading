import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useAuth } from "../Context/AuthContext.js";

const API = axios.create({
        baseURL: "http://192.168.100.53:8080", // Adjust the base URL accordingly
        withCredentials: true, // Allow sending cookies with requests if needed
});

export const setupInterceptors = ({ getState, setAuth }) => {
        API.interceptors.request.use(
                async (config) => {
                        const auth = getState().auth;

                        if (auth && auth.accessToken) {
                                const tokenExpiration =
                                        jwtDecode(auth.accessToken).exp * 1000;

                                console.log(
                                        "jwtDecode Expiry Time",
                                        tokenExpiration,
                                );
                                if (Date.now() >= tokenExpiration) {
                                        try {
                                                const response =
                                                        await axios.get(
                                                                "http://192.168.100.53:8080/api/v1/users/refresh",
                                                                {
                                                                        withCredentials: true,
                                                                },
                                                        );

                                                const { accessToken } =
                                                        response.data;
                                                setAuth((prev) => ({
                                                        ...prev,
                                                        accessToken,
                                                }));
                                                config.headers.Authorization = `Bearer ${accessToken}`;
                                        } catch (error) {
                                                console.error(
                                                        "Error refreshing token:",
                                                        error,
                                                );
                                                setAuth(null); // Handle logout or other actions on token refresh failure
                                        }
                                }

                                config.headers.Authorization = `Bearer ${auth.accessToken}`;
                        }

                        return config;
                },
                (error) => {
                        return Promise.reject(error);
                },
        );

        // Optionally handle response interceptors if needed
        API.interceptors.response.use(
                (response) => response,
                async (error) => {
                        const { config, response } = error;
                        const { auth, setAuth } = useAuth(); // Adjust based on how you manage auth state

                        console.log("Interceptor Response", auth);

                        if (response.status === 401 && !config._retry) {
                                config._retry = true;

                                try {
                                        const { data } = await axios.get(
                                                "http://192.168.100.53:8080/api/v1/users/refresh",
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
