import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API from "../Context/axiosSetup.js";

const fetchUsersWithProfiles = async () => {
        const response = await API.get(
                `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/users/users-with-profiles`,
                {
                        withCredentials: true,
                },
        );

        return response.data;
};

export const useUsersWithProfiles = () => {
        return useQuery({
                queryKey: ["usersWithProfiles"],
                queryFn: fetchUsersWithProfiles,
                staleTime: 1000 * 60 * 5, // data is fresh for 5 minutes
        });
};
