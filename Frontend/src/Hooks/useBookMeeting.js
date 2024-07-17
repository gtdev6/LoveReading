// const
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import API from "../Context/axiosSetup.js";

const bookMeeting = async (meetingId) => {
        const response = await API.patch(
                `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/meetings/bookMeeting`,
                { meetingId },
                { withCredentials: true }, // Ensure cookies are sent with the request
        );
        return response.data;
};

const useBookMeeting = () => {
        const queryClient = useQueryClient();

        return useMutation({
                mutationFn: (meetingId) => bookMeeting(meetingId),
                onSuccess: async () => {
                        await queryClient.invalidateQueries("clubMeetings");
                },
                onError: (error) => {
                        console.log(error);
                },
        });
};

export default useBookMeeting;
