// src/hooks/useUser.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUser = async () => {
        let accessToken = localStorage.getItem("accessToken");
        const refreshToken = () => {
                // Logic to refresh token
                const apiUrl =
                        process.env.NODE_ENV === "production"
                                ? `${import.meta.env.VITE_API_URL}/api/v1/users/refresh`
                                : `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/users/refresh`;

                return axios
                        .post(apiUrl, {}, { withCredentials: true })
                        .then((response) => {
                                localStorage.setItem(
                                        "accessToken",
                                        response.data.accessToken,
                                );
                                return response.data.accessToken;
                        });
        };

        const getUserData = async () => {
                try {
                        const apiUrl =
                                process.env.NODE_ENV === "production"
                                        ? `${import.meta.env.VITE_API_URL}/api/v1/users/me`
                                        : `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/users/me`;

                        const { data } = await axios.get(apiUrl, {
                                headers: {
                                        Authorization: `Bearer ${accessToken}`,
                                },
                        });
                        return data;
                } catch (error) {
                        if (error.response && error.response.status === 401) {
                                const apiUrl =
                                        process.env.NODE_ENV === "production"
                                                ? `${import.meta.env.VITE_API_URL}/api/v1/users/me`
                                                : `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/users/me`;

                                accessToken = await refreshToken();
                                const { data } = await axios.get(apiUrl, {
                                        headers: {
                                                Authorization: `Bearer ${accessToken}`,
                                        },
                                });
                                return data;
                        } else {
                                throw error;
                        }
                }
        };

        return getUserData();
};

const useUser = () => {
        return useQuery({
                queryKey: ["user"],
                queryFn: fetchUser,
        });
};

export default useUser;
