import API from "../Context/axiosSetup.js";

export async function getClubMeetings() {
        return await API.get("api/v1/meetings", {
                withCredentials: "true",
        });
}
