import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import API from "../Context/axiosSetup.js";

const fetchClubInfo = async () => {
        const { data } = await axios.get(
                `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/aboutUs`,
        );
        return data;
};

const updateClubInfo = async (clubInfo) => {
        const { data } = await API.patch(
                `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/aboutUs/`,
                clubInfo,
                {
                        withCredentials: true,
                },
        );
        return data;
};

export const useClubInfo = () => {
        return useQuery({
                queryKey: ["clubInfo"],
                queryFn: fetchClubInfo,
                onError: (e) => console.log(e),
        });
};

export const useUpdateClubInfo = () => {
        const queryClient = useQueryClient();

        return useMutation({
                mutationFn: updateClubInfo,
                onSuccess: async () => {
                        await queryClient.invalidateQueries({
                                queryKey: ["clubInfo"],
                                refetchType: "all",
                        });
                },
        });
};
