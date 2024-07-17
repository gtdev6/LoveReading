import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API from "../Context/axiosSetup.js";

const fetchProfileById = async (profileId) => {
        const response = await API.post(
                `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/profile/getProfileById`,
                { profileId },
                { withCredentials: true },
        );
        return response.data;
};

export const useFetchProfileById = (profileId) => {
        return useQuery({
                queryKey: ["profile", profileId],
                queryFn: () => fetchProfileById(profileId),
                enabled: !!profileId, // Only run this query if profileId exists
        });
};
