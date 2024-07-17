// src/hooks/useUser.js
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchUser = async () => {
        let accessToken = localStorage.getItem("accessToken");
        const refreshToken = () => {
                // Logic to refresh token
                return axios
                        .post(
                                `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/users/refresh`,
                                {},
                                { withCredentials: true },
                        )
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
                        const { data } = await axios.get(
                                `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/users/me`,
                                {
                                        headers: {
                                                Authorization: `Bearer ${accessToken}`,
                                        },
                                },
                        );
                        return data;
                } catch (error) {
                        if (error.response && error.response.status === 401) {
                                accessToken = await refreshToken();
                                const { data } = await axios.get(
                                        `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/users/me`,
                                        {
                                                headers: {
                                                        Authorization: `Bearer ${accessToken}`,
                                                },
                                        },
                                );
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
