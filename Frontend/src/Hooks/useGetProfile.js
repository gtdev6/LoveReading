import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import API from "../Context/axiosSetup.js";
import { toast } from "react-toastify";

const fetchProfileById = async (profileId) => {
        if (!profileId) {
                return new Error("User does not have profile");
        }

        const { data } = await API.get(
                `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/profile/getProfile`,
                {
                        withCredentials: true,
                },
        );
        return data;
};

export const useGetProfile = (profileId) => {
        return useQuery({
                queryKey: ["profile"],
                queryFn: () => fetchProfileById(profileId),
                onError: (e) => {
                        toast.success(`${e.message}`, {
                                style: {
                                        fontSize: "2rem",
                                        color: "#76453b",
                                },
                                position: "top-center",
                                autoClose: 1000,
                        });
                },

                enabled: !!profileId, // Only run this query if profileId is not null
                staleTime: 1000 * 60 * 5, // 5 minutes
        });
};
