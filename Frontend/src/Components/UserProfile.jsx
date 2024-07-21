import "./CSS/UserProfile.css";
import { IconArrowNarrowLeft, IconPencil } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { ShortStoryPost } from "./ShortStoryPost.jsx";
import { useHasProfile } from "../Hooks/useHasProfile.js";
import { useGetProfile } from "../Hooks/useGetProfile.js";
import { formatDate } from "date-fns/format";
import { Spinner } from "../Util Components/Spinner.jsx";

export function UserProfile() {
        const navigate = useNavigate();
        const { data: hasUserProfile } = useHasProfile();
        const { data: profileData, status } = useGetProfile(
                hasUserProfile?.data?.profileId,
        );

        const { profile } = profileData?.data || false;
        const date =
                profile && profile?.dateOfBirth
                        ? formatDate(profile.dateOfBirth, "dd/MM/yyyy")
                        : "10/10/2020" || "10/10/2025";

        if (hasUserProfile && !hasUserProfile.data.hasProfile) {
                return (
                        <div className="noProfileMessageContainer">
                                <div className="noProfileMessageWrapper">
                                        <p>You have not created profile yet!</p>
                                        <button
                                                className="createProfileBtn"
                                                onClick={() =>
                                                        navigate(
                                                                "/createProfile",
                                                        )
                                                }>
                                                Create Profile
                                        </button>
                                </div>
                        </div>
                );
        }

        if (status === "pending") {
                return <Spinner />;
        }

        if (
                hasUserProfile &&
                hasUserProfile.data.hasProfile &&
                profileData &&
                profile
        ) {
                return (
                        <div className="userProfileRootContainer">
                                <div className="userProfileBackBtnWrapper">
                                        <button
                                                className="userProfileBackBtn"
                                                onClick={() =>
                                                        navigate("/club")
                                                }>
                                                <IconArrowNarrowLeft /> Back to
                                                Club
                                        </button>
                                        <button
                                                className="userProfileBackBtn"
                                                onClick={() =>
                                                        navigate(
                                                                "/shortStory/new",
                                                        )
                                                }>
                                                Write Short Story
                                        </button>
                                </div>
                                <div className="userProfileContentBody">
                                        <div className="userProfileUserInfoContainer">
                                                <div className="userProfileInfoRoot">
                                                        <button
                                                                className="userProfileInfoEdit"
                                                                onClick={() =>
                                                                        navigate(
                                                                                "/editProfile",
                                                                        )
                                                                }>
                                                                <IconPencil />
                                                        </button>
                                                        <div className="userProfileImageContainer">
                                                                {profile.profilePictureURL ? (
                                                                        <img
                                                                                src={
                                                                                        profile.profilePictureURL
                                                                                }
                                                                                loading={
                                                                                        "lazy"
                                                                                }
                                                                                alt=""
                                                                        />
                                                                ) : (
                                                                        <img
                                                                                src="/Assets/profile.svg"
                                                                                alt=""
                                                                        />
                                                                )}
                                                        </div>
                                                        <div className="userProfileUserInfoWrapper">
                                                                <h1 className="userProfileUserName">
                                                                        {
                                                                                profile.name
                                                                        }
                                                                </h1>
                                                                <div className="userProfileDateOfBirthWrapper">
                                                                        <p className="userProfileDateOfBirthLabel">
                                                                                Date
                                                                                of
                                                                                Birth
                                                                        </p>
                                                                        <p className="userProfileDateOfBirth">
                                                                                {
                                                                                        date
                                                                                }
                                                                        </p>
                                                                </div>
                                                                <div className="userProfileBioWrapper">
                                                                        <p className="userProfileBioLabel">
                                                                                Bio
                                                                        </p>
                                                                        <p className="userProfileBio">
                                                                                {
                                                                                        profile.bio
                                                                                }
                                                                        </p>
                                                                </div>
                                                        </div>
                                                </div>
                                        </div>
                                        <div className="userProfileShortStoriesContainer">
                                                {profile &&
                                                        profile.shortStories
                                                                .length ===
                                                                0 && (
                                                                <div className="noShortStoriesYetContainer">
                                                                        <div className="noShortStoriesYetWrapper">
                                                                                <p>
                                                                                        No
                                                                                        Short
                                                                                        Stories
                                                                                        Posted
                                                                                        Yet
                                                                                </p>
                                                                        </div>
                                                                </div>
                                                        )}
                                                {profile &&
                                                        profile.shortStories &&
                                                        profile.shortStories.map(
                                                                (
                                                                        shortStory,
                                                                ) => (
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
                                                {/*<ShortStoryPost />*/}
                                        </div>
                                </div>
                        </div>
                );
        }

        return (
                <div className="userProfileRootContainer">
                        <div className="userProfileBackBtnWrapper">
                                <button
                                        className="userProfileBackBtn"
                                        onClick={() => navigate("/club")}>
                                        <IconArrowNarrowLeft /> Back to Club
                                </button>
                                <button
                                        className="userProfileBackBtn"
                                        onClick={() =>
                                                navigate("/shortStory/new")
                                        }>
                                        Write Short Story
                                </button>
                        </div>
                        <div className="userProfileContentBody">
                                <div className="userProfileUserInfoContainer">
                                        <div className="userProfileInfoRoot">
                                                <button
                                                        className="userProfileInfoEdit"
                                                        onClick={() =>
                                                                navigate(
                                                                        "/editProfile",
                                                                )
                                                        }>
                                                        <IconPencil />
                                                </button>
                                                <div className="userProfileImageContainer">
                                                        <img
                                                                src="/Assets/profile.svg"
                                                                alt=""
                                                        />
                                                </div>
                                                <div className="userProfileUserInfoWrapper">
                                                        <h1 className="userProfileUserName">
                                                                Name
                                                        </h1>
                                                        <div className="userProfileDateOfBirthWrapper">
                                                                <p className="userProfileDateOfBirthLabel">
                                                                        Date of
                                                                        Birth
                                                                </p>
                                                                <p className="userProfileDateOfBirth">
                                                                        18/10/2000
                                                                </p>
                                                        </div>
                                                        <div className="userProfileDateClubWrapper">
                                                                <p className="userProfileDateClubLabel">
                                                                        Date of
                                                                        Joining
                                                                </p>
                                                                <p className="userProfileDateOfClubJoining">
                                                                        18/10/2000
                                                                </p>
                                                        </div>
                                                        <div className="userProfileBioWrapper">
                                                                <p className="userProfileBioLabel">
                                                                        Bio
                                                                </p>
                                                                <p className="userProfileBio">
                                                                        "Software
                                                                        Engineer"
                                                                </p>
                                                        </div>
                                                </div>
                                        </div>
                                </div>
                                <div className="userProfileShortStoriesContainer">
                                        <ShortStoryPost />
                                </div>
                        </div>
                </div>
        );
}
