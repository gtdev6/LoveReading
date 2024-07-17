import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import API from "../Context/axiosSetup.js";

// Function to fetch profile information
const fetchProfileStatus = async () => {
        const { data } = await API.get(
                `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/users/hasProfile`,
                { withCredentials: true },
        );
        return data;
};

// Custom hook to check if the user has a profile
export const useHasProfile = () => {
        return useQuery({
                queryKey: ["hasProfile"],
                queryFn: fetchProfileStatus,
                onError: (e) => {
                        console.log(e);
                },
        });
};
