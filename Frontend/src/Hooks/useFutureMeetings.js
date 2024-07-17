import { useQuery } from "@tanstack/react-query";
import API from "../Context/axiosSetup.js";

const getFutureMeetings = async () => {
        const apiUrl =
                process.env.NODE_ENV === "production"
                        ? `${import.meta.env.VITE_API_URL}/api/v1/futureMeetings`
                        : `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/futureMeetings`;

        const { data } = await API.get(apiUrl, { withCredentials: true });
        return data;
};

export const useFutureMeetings = () => {
        return useQuery({
                queryKey: ["futureMeetings"],
                queryFn: getFutureMeetings,
                onError: (error) => {
                        console.error(error);
                },
        });
};
