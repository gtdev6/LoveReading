import { useQuery } from "@tanstack/react-query";
import API from "../Context/axiosSetup.js";

const getFutureMeetings = async () => {
        const { data } = await API.get(
                `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/futureMeetings`,
                { withCredentials: true },
        );
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
