import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import API from "../Context/axiosSetup.js";

// Define the fetch function
const fetchShortStories = async () => {
        const apiUrl =
                process.env.NODE_ENV === "production"
                        ? `${import.meta.env.VITE_API_URL}/api/v1/shortStories/`
                        : `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/shortStories/`;

        const { data } = await API.get(apiUrl, {
                withCredentials: true,
        });
        return data;
};

// Custom hook
const useShortStory = () => {
        return useQuery({
                queryKey: ["shortStories"],
                queryFn: fetchShortStories,
        });
};

export default useShortStory;
