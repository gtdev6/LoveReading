import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext.js";

export const API = axios.create({
        baseURL: `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}`, // Adjust the base URL accordingly
        withCredentials: true, // Allow sending cookies with requests if needed
});

async function checkUserRole(auth, setAuth) {
        // console.log("Auth", auth, setAuth);
        if (auth && !auth.role) {
                console.log("No Role line 25");
                try {
                        const response = await axios.get(
                                `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/users/me`,
                                {
                                        headers: {
                                                Authorization: `Bearer ${auth.accessToken}`,
                                        },
                                },
                        );
                        console.log("Console.log response line 37", response);
                        const userData = response.data;
                        setAuth((prev) => ({
                                ...prev,
                                userId: userData.userId,
                                role: userData.role,
                        }));
                } catch (error) {
                        console.error("Error fetching user data:", error);
                }
        }

        if (!auth) {
                const storedAccessToken = localStorage.getItem("accessToken");
                // console.log(storedAccessToken);
        }
}

export const setupAxiosInterceptors = ({ auth, setAuth, navigate }) => {
        // const { auth, setAuth } = useAuth(); // Get auth state and setter from useAuth hook
        // const navigate = useNavigate();
        console.log("Auth: ", auth);
        // Request interceptor
        API.interceptors.request.use(
                async (config) => {
                        // Check if auth state exists and has accessToken

                        if (auth && auth.accessToken) {
                                const tokenExpiration =
                                        jwtDecode(auth.accessToken).exp * 1000;

                                // Check if token is still valid
                                if (Date.now() < tokenExpiration) {
                                        await checkUserRole(auth, setAuth);
                                        // Add accessToken to headers
                                        config.headers.Authorization = `Bearer ${auth.accessToken}`;
                                        return config;
                                } else {
                                        // Token expired, refresh token logic here
                                        try {
                                                const response =
                                                        await axios.get(
                                                                `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/users/refresh`,
                                                                {
                                                                        withCredentials: true,
                                                                },
                                                        );
                                                console.log(
                                                        "Response line 71",
                                                        response,
                                                );
                                                const {
                                                        accessToken,
                                                        userId,
                                                        role,
                                                } = response.data;
                                                setAuth((prevAuth) => ({
                                                        ...prevAuth,
                                                        accessToken,
                                                        userId,
                                                        role,
                                                }));
                                                localStorage.setItem(
                                                        "accessToken",
                                                        accessToken,
                                                );
                                                config.headers.Authorization = `Bearer ${accessToken}`;
                                                return config;
                                        } catch (refreshError) {
                                                console.error(
                                                        "Error refreshing token:",
                                                        refreshError,
                                                );
                                                // Handle token refresh failure, e.g., logout
                                                setAuth(null);
                                                navigate("/login");
                                                return Promise.reject(
                                                        refreshError,
                                                );
                                        }
                                }
                        } else {
                                // No auth state or no accessToken, fetch from localStorage
                                const storedAccessToken =
                                        localStorage.getItem("accessToken");

                                if (storedAccessToken) {
                                        const tokenExpiration =
                                                jwtDecode(storedAccessToken)
                                                        .exp * 1000;

                                        // Check if token is still valid
                                        if (Date.now() < tokenExpiration) {
                                                // Add accessToken to headers
                                                config.headers.Authorization = `Bearer ${storedAccessToken}`;
                                                // console.log(
                                                //         "Response Line 118",
                                                // );
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
                                                        // console.log(
                                                        //         "Console.log response line 130",
                                                        //         response.data,
                                                        // );
                                                        const userData =
                                                                response.data;
                                                        setAuth((prev) => ({
                                                                ...prev,
                                                                userId: userData.userId,
                                                                role: userData.role,
                                                                accessToken:
                                                                        storedAccessToken,
                                                        }));
                                                } catch (error) {
                                                        console.error(
                                                                "Error fetching user data:",
                                                                error,
                                                        );
                                                }
                                                // setAuth({
                                                //         accessToken:
                                                //                 storedAccessToken,
                                                // }); // Update auth state
                                                return config;
                                        } else {
                                                // Token expired, refresh token logic here
                                                try {
                                                        const response =
                                                                await API.get(
                                                                        "/api/v1/users/refresh",
                                                                );
                                                        // console.log(
                                                        //         "Response Line 136",
                                                        //         response,
                                                        // );
                                                        const {
                                                                accessToken,
                                                                userId,
                                                                role,
                                                        } = response.data;
                                                        setAuth({
                                                                accessToken,
                                                                userId,
                                                                role,
                                                        });
                                                        localStorage.setItem(
                                                                "accessToken",
                                                                accessToken,
                                                        );
                                                        config.headers.Authorization = `Bearer ${accessToken}`;
                                                        return config;
                                                } catch (refreshError) {
                                                        console.error(
                                                                "Error refreshing token:",
                                                                refreshError,
                                                        );
                                                        // Handle token refresh failure, e.g., logout
                                                        setAuth(null);
                                                        navigate("/login");
                                                        return Promise.reject(
                                                                refreshError,
                                                        );
                                                }
                                        }
                                } else {
                                        // No accessToken found in localStorage, handle unauthorized access
                                        navigate("/login");
                                        return Promise.reject(
                                                new Error(
                                                        "Access token not found",
                                                ),
                                        );
                                }
                        }
                },
                function (error) {
                        // Do something with request error
                        console.log(error);
                        return Promise.reject(error);
                },
        );

        // Optionally add response interceptors if needed
        API.interceptors.response.use(
                (response) => response,
                async (error) => {
                        const { config, response } = error;

                        if (
                                response &&
                                response.status === 401 &&
                                !config._retry
                        ) {
                                config._retry = true;

                                try {
                                        const { data } = await API.get(
                                                "/api/v1/users/refresh",
                                        );
                                        // console.log(data);
                                        setAuth((prevAuth) => ({
                                                ...prevAuth,
                                                accessToken: data.accessToken,
                                                userId: data.userId,
                                                role: data.role,
                                        }));
                                        localStorage.setItem(
                                                "accessToken",
                                                data.accessToken,
                                        );
                                        config.headers.Authorization = `Bearer ${data.accessToken}`;
                                        return axios(config);
                                } catch (refreshError) {
                                        console.error(
                                                "Error refreshing token:",
                                                refreshError,
                                        );
                                        setAuth(null); // Clear auth on refresh token failure
                                        navigate("/login");
                                        return Promise.reject(refreshError);
                                }
                        }

                        return Promise.reject(error);
                },
        );
};

export default API;
