/*
import { useEffect, useLayoutEffect, useState, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { setupInterceptors } from "../Services/axiosInstance";
import { AuthContext } from "./AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const API = axios.create({
        baseURL: `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`, // Adjust the base URL accordingly
        withCredentials: true, // Allow sending cookies with requests if needed
});

export const AuthProvider = ({ children }) => {
        const [auth, setAuth] = useState(null);
        const navigate = useNavigate();

        // Set up interceptors on mount
        // useEffect(() => {
        //         setupInterceptors({ getState: () => ({ auth }), setAuth });
        // }, [auth]);

        useLayoutEffect(() => {
                const checkToken = async () => {
                        // Check if there is no auth or no accessToken in the auth state
                        if (!auth || !auth.accessToken) {
                                const storedAccessToken =
                                        localStorage.getItem("accessToken");

                                if (storedAccessToken) {
                                        const tokenExpiration =
                                                jwtDecode(storedAccessToken)
                                                        .exp * 1000;

                                        if (Date.now() < tokenExpiration) {
                                                const newAuth = {
                                                        accessToken:
                                                                storedAccessToken,
                                                };
                                                setAuth(newAuth);

                                                // Optionally fetch user data here using the stored access token
                                                try {
                                                        const response =
                                                                await axios.get(
                                                                        `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/users/me`,
                                                                        {
                                                                                headers: {
                                                                                        Authorization: `Bearer ${storedAccessToken}`,
                                                                                },
                                                                        },
                                                                );
                                                        const userData =
                                                                response.data;
                                                        setAuth((prev) => ({
                                                                ...prev,
                                                                userId: userData.userId,
                                                                role: userData.role,
                                                        }));
                                                } catch (error) {
                                                        console.error(
                                                                "Error fetching user data:",
                                                                error,
                                                        );
                                                        setAuth(null);
                                                        navigate("/login");
                                                }
                                        }
                                }
                        }

                        // If the accessToken exists, check its expiration
                        if (auth && auth.accessToken) {
                                const tokenExpiration =
                                        jwtDecode(auth.accessToken).exp * 1000;

                                if (Date.now() >= tokenExpiration) {
                                        try {
                                                const response =
                                                        await axios.get(
                                                                `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/users/refresh`,
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
                                                localStorage.setItem(
                                                        "accessToken",
                                                        accessToken,
                                                );
                                        } catch (error) {
                                                console.error(
                                                        "Error refreshing token:",
                                                        error,
                                                );
                                                setAuth(null); // Handle logout or other actions on token refresh failure
                                                navigate("/login");
                                        }
                                }
                        }
                };

                checkToken();

                // Interceptors for API requests
                API.interceptors.request.use(
                        async (config) => {
                                if (auth && auth.accessToken) {
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

                                if (response.status === 401 && !config._retry) {
                                        config._retry = true;

                                        try {
                                                const { data } =
                                                        await axios.get(
                                                                `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/users/refresh`,
                                                                {
                                                                        withCredentials: true,
                                                                },
                                                        );
                                                setAuth((prev) => ({
                                                        ...prev,
                                                        accessToken:
                                                                data.accessToken,
                                                }));
                                                localStorage.setItem(
                                                        "accessToken",
                                                        data.accessToken,
                                                );
                                                config.headers.Authorization = `Bearer ${data.accessToken}`;
                                                return axios(config);
                                        } catch (refreshError) {
                                                setAuth(null); // Clear auth on refresh token failure
                                                navigate("/login");
                                                return Promise.reject(
                                                        refreshError,
                                                );
                                        }
                                }

                                return Promise.reject(error);
                        },
                );
        }, [auth, navigate]);

        return (
                <AuthContext.Provider value={{ auth, setAuth }}>
                        {children}
                </AuthContext.Provider>
        );
};
*/
