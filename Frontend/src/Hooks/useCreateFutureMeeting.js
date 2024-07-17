import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import API from "../Context/axiosSetup.js";

const createFutureMeetingMutation = async (formData) => {
        const data = JSON.stringify(formData);

        const apiUrl =
                process.env.NODE_ENV === "production"
                        ? `${import.meta.env.VITE_API_URL}/api/v1/futureMeetings`
                        : `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/futureMeetings`;

        const response = await API.post(
                apiUrl,
                { data },
                {
                        withCredentials: true,
                },
        );

        if (!response.ok) {
                throw new Error("Failed to create future meeting");
        }

        return await response.json();
};

export const useCreateFutureMeeting = () => {
        const queryClient = useQueryClient();
        const navigate = useNavigate();

        return useMutation({
                mutationFn: createFutureMeetingMutation,
                onSuccess: async () => {
                        toast.success("Future Meeting Created Successfully", {
                                style: {
                                        fontSize: "1.6rem",
                                        color: "#76453b",
                                },
                                position: "top-center",
                                autoClose: 1000,
                        });
                        await queryClient.invalidateQueries({
                                queryKey: ["futureMeetings"],
                                refetchType: "all",
                        });
                },
                onError: (error) => {
                        console.log(error);
                },
        });
};
