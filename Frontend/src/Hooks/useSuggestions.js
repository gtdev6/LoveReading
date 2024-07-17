import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import API from "../Context/axiosSetup.js";

// Fetch suggestions
export const useGetSuggestions = () => {
        const queryClient = useQueryClient();
        return useQuery({
                queryKey: ["suggestions"],
                queryFn: async () => {
                        const { data } = await API.get(
                                `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/suggestions`,
                                {
                                        withCredentials: true,
                                },
                        );
                        return data.data.suggestions;
                },
                onError: (e) => {
                        console.log(e);
                },
                onSuccess: () => {
                        // queryClient.invalidateQueries({
                        //         queryKey: ["suggestions"]
                        // })
                },
        });
};

// Create a suggestion
export const useCreateSuggestion = () => {
        const queryClient = useQueryClient();
        return useMutation({
                mutationKey: ["createClubSuggestion"],
                mutationFn: async (newSuggestion) => {
                        const { data } = await API.post(
                                `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/suggestions`,
                                newSuggestion,
                                {
                                        withCredentials: true,
                                },
                        );
                        return data.data.suggestion;
                },
                onSuccess: async () => {
                        await queryClient.invalidateQueries("suggestions");
                },
        });
};
