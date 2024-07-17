import { Home } from "./Home.jsx";
import { Tabs, Tooltip } from "@mantine/core";
import "./CSS/Club.css";
import { Meeting } from "./Meeting.jsx";
import { FutureMeetingPost } from "./FutureMeetingPost.jsx";
import { ShortStoryPost } from "./ShortStoryPost.jsx";
import { useQuery } from "@tanstack/react-query";
import { getClubMeetings } from "../Services/apiClubMeetings.js";
import { Spinner } from "../Util Components/Spinner.jsx";
import { toast } from "react-toastify";
import { useEffect } from "react";
import useUser from "../Hooks/useUser.js";
import { useAuth } from "../Context/AuthContext.js";
import { useFutureMeetings } from "../Hooks/useFutureMeetings.js";
import { useHasProfile } from "../Hooks/useHasProfile.js";
import { Link, useNavigate } from "react-router-dom";
import useShortStory from "../Hooks/useShortStory.js";

export function Club() {
        const navigate = useNavigate();
        const { data, isLoading, error } = useQuery({
                queryKey: ["clubMeetings"],
                queryFn: getClubMeetings,
        });

        const { data: shortStories, isLoading: shortStoriesLoading } =
                useShortStory();

        // console.log(shortStories);

        const {
                data: futureMeetings,
                isLoading: isFutureMeetingLoading,
                error: futureMeetingsError,
        } = useFutureMeetings();

        const {
                data: userProfileInfo,
                error: userProfileError,
                isLoading: userProfileIsLoading,
        } = useHasProfile();

        const notify = (onClose) =>
                toast.success("Login Successful", {
                        style: {
                                fontSize: "2rem",
                                color: "#76453b",
                        },
                        position: "top-center",
                        autoClose: 1000,
                });

        // useEffect(() => {
        //         notify();
        // }, []);

        return (
                // <ProtectedRoute>
                <Home isNavBtn={true}>
                        <Tabs className="tabsRoot" defaultValue={"Meetings"}>
                                <Tabs.List grow={true} className="tabsList">
                                        <Tooltip
                                                label={"Meetings"}
                                                className="toolTipRoot">
                                                <Tabs.Tab
                                                        value={"Meetings"}
                                                        className="tabsTab">
                                                        <img
                                                                src="/Assets/Meetings.svg"
                                                                alt=""
                                                        />
                                                </Tabs.Tab>
                                        </Tooltip>
                                        <Tooltip
                                                label={"Future Meetings"}
                                                className="toolTipRoot">
                                                <Tabs.Tab
                                                        value={
                                                                "Future_Meetings"
                                                        }
                                                        className="tabsTab">
                                                        <img
                                                                src="/Assets/Future_Meetings.svg"
                                                                alt=""
                                                        />
                                                </Tabs.Tab>
                                        </Tooltip>
                                        <Tooltip
                                                label={"Short Stories"}
                                                className="toolTipRoot">
                                                <Tabs.Tab
                                                        value={"Short_Stories"}
                                                        className="tabsTab">
                                                        <img
                                                                src="/Assets/Short_Stories.svg"
                                                                alt="Short Stories"
                                                        />
                                                </Tabs.Tab>
                                        </Tooltip>
                                </Tabs.List>

                                <Tabs.Panel
                                        value={"Meetings"}
                                        className="tabsPanel">
                                        {isLoading ? (
                                                <Spinner />
                                        ) : (
                                                data &&
                                                data?.data?.meetings.map(
                                                        (meeting) => (
                                                                <Meeting
                                                                        data={
                                                                                meeting
                                                                        }
                                                                        key={
                                                                                meeting._id
                                                                        }
                                                                />
                                                        ),
                                                )
                                        )}
                                </Tabs.Panel>
                                <Tabs.Panel
                                        value={"Future_Meetings"}
                                        className="tabsPanel">
                                        {futureMeetings &&
                                                futureMeetings.futureMeetings
                                                        .length === 0 && (
                                                        <div className="noFutureMeetingYetContainer">
                                                                <div className="noFutureMeetingYetWrapper">
                                                                        <p>
                                                                                No
                                                                                Future
                                                                                Meetings
                                                                                Created
                                                                                Yet!
                                                                        </p>
                                                                </div>
                                                        </div>
                                                )}
                                        {futureMeetings &&
                                                futureMeetings.futureMeetings.map(
                                                        (fMeeting) => (
                                                                <FutureMeetingPost
                                                                        key={
                                                                                fMeeting._id
                                                                        }
                                                                        data={
                                                                                fMeeting
                                                                        }
                                                                />
                                                        ),
                                                )}
                                </Tabs.Panel>
                                <Tabs.Panel
                                        value={"Short_Stories"}
                                        className="tabsPanel">
                                        {userProfileInfo &&
                                                userProfileInfo.data
                                                        .hasProfile &&
                                                shortStories &&
                                                shortStories.length === 0 && (
                                                        <div className="shortStoriesMessageContainer">
                                                                <div className="shortStoriesMessageWrapper">
                                                                        <p>
                                                                                No
                                                                                Short
                                                                                Stories
                                                                                Yet!
                                                                        </p>
                                                                </div>
                                                        </div>
                                                )}
                                        {userProfileInfo &&
                                                userProfileInfo.data
                                                        .hasProfile &&
                                                shortStories &&
                                                shortStories.map(
                                                        (shortStory) => (
                                                                <ShortStoryPost
                                                                        key={
                                                                                shortStory._id
                                                                        }
                                                                        data={
                                                                                shortStory
                                                                        }
                                                                />
                                                        ),
                                                )}
                                        {userProfileInfo &&
                                                !userProfileInfo.data
                                                        .hasProfile && (
                                                        <div className="createProfileLinkStyleContainer">
                                                                <p className="createProfileLinkStyle">
                                                                        Create
                                                                        Profile
                                                                        To View
                                                                        & Upload
                                                                        Short
                                                                        Stories
                                                                </p>
                                                                <button
                                                                        className="createProfileBtn"
                                                                        onClick={() =>
                                                                                navigate(
                                                                                        "/createProfile",
                                                                                )
                                                                        }>
                                                                        Create
                                                                        Profile
                                                                </button>
                                                        </div>
                                                )}
                                </Tabs.Panel>
                        </Tabs>
                </Home>
                // </ProtectedRoute>
        );
}
