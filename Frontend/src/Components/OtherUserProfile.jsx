import "./CSS/UserProfile.css";
import { IconArrowNarrowLeft, IconPencil } from "@tabler/icons-react";
import { useLocation, useNavigate } from "react-router-dom";
import { ShortStoryPost } from "./ShortStoryPost.jsx";
import { useGetProfile } from "../Hooks/useGetProfile.js";
import { formatDate } from "date-fns/format";
import { useFetchProfileById } from "../Hooks/useFetchProfileById.js";

export function OtherUserProfile() {
        const navigate = useNavigate();
        const location = useLocation();
        const { profileId } = location.state || {};
        const {
                data: profileData,
                isLoading,
                isError,
        } = useFetchProfileById(profileId);

        if (isLoading) {
                return <div>Loading...</div>;
        }

        if (isError) {
                return <div>Error loading profile</div>;
        }

        const { profile } = profileData?.data || false;
        const date =
                profile && profile?.dateOfBirth
                        ? formatDate(profile.dateOfBirth, "dd/MM/yyyy")
                        : "10/10/2020" || "10/10/2025";

        if (profileData && profile) {
                return (
                        <div className="userProfileRootContainer">
                                <div className="userProfileBackBtnWrapper">
                                        <button
                                                className="userProfileBackBtn"
                                                onClick={() =>
                                                        navigate("/clubMembers")
                                                }>
                                                <IconArrowNarrowLeft /> Back to
                                                Club
                                        </button>
                                </div>
                                <div className="userProfileContentBody">
                                        <div className="userProfileUserInfoContainer">
                                                <div className="userProfileInfoRoot">
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
                                        onClick={() =>
                                                navigate("/clubMembers")
                                        }>
                                        <IconArrowNarrowLeft /> Back to Club
                                </button>
                        </div>
                        <div className="userProfileContentBody">
                                <div className="userProfileUserInfoContainer">
                                        <div className="userProfileInfoRoot">
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
