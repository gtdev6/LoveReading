import "./CSS/ClubMembers.css";
import { useNavigate } from "react-router-dom";
import { IconArrowNarrowLeft, IconPencil } from "@tabler/icons-react";
import { ShortStoryPost } from "./ShortStoryPost.jsx";
import { useUsersWithProfiles } from "../Hooks/useUsersWithProfiles.js";
import { format } from "date-fns";
import { Spinner } from "../Util Components/Spinner.jsx";

function ClubMemberListItem({ user }) {
        const navigate = useNavigate();

        if (user)
                return (
                        <div className="clubMemberListItem">
                                <div className="cMListItemProfileImageContainer">
                                        <img
                                                src={user.profilePictureURL}
                                                alt=""
                                        />
                                </div>
                                <div className="cMListItemDescContainer">
                                        <p className="cMListItemDescName">
                                                {user.name}
                                        </p>
                                        <p className="cMListItemDescShortStories">
                                                Short Stories:{" "}
                                                {
                                                        user.profile
                                                                .shortStories
                                                                .length
                                                }
                                        </p>
                                        <p className="cMListItemDescJoinedOn">
                                                Joined On:{" "}
                                                {format(
                                                        user.createdAt,
                                                        "dd/MM/yyyy",
                                                )}
                                        </p>
                                </div>
                                <div className="cMListItemViewBtnWrapper">
                                        <button
                                                onClick={() =>
                                                        navigate(
                                                                "/otherUserProfile",
                                                                {
                                                                        state: {
                                                                                profileId: user
                                                                                        .profile
                                                                                        ._id,
                                                                        },
                                                                },
                                                        )
                                                }>
                                                View Profile
                                        </button>
                                </div>
                        </div>
                );

        return (
                <div className="clubMemberListItem">
                        <div className="cMListItemProfileImageContainer">
                                <img src="/Assets/profile.svg" alt="" />
                        </div>
                        <div className="cMListItemDescContainer">
                                <p className="cMListItemDescName">Name</p>
                                <p className="cMListItemDescShortStories">
                                        Short Stories: 2
                                </p>
                                <p className="cMListItemDescJoinedOn">
                                        Joined On: 20/05/2024
                                </p>
                        </div>
                        <div className="cMListItemViewBtnWrapper">
                                <button>View Profile</button>
                        </div>
                </div>
        );
}

export function ClubMembers() {
        const navigate = useNavigate();

        const { data, isLoading, error } = useUsersWithProfiles();

        if (isLoading) {
                return <Spinner />;
        }

        // console.log(data);

        if (data)
                return (
                        <div className="clubMembersRootContainer">
                                <div className="clubMembersBackBtnWrapper">
                                        <button
                                                className="clubMembersBackBtn"
                                                onClick={() =>
                                                        navigate("/club")
                                                }>
                                                <IconArrowNarrowLeft /> Back to
                                                Club
                                        </button>
                                        <p className="totalMembersCount">
                                                {data.total} Members
                                        </p>
                                </div>
                                <div className="clubMembersContentBody">
                                        <div className="clubMembersContentBodyWrapper">
                                                {data &&
                                                        data.users.map(
                                                                (user) => (
                                                                        <ClubMemberListItem
                                                                                key={
                                                                                        user._id
                                                                                }
                                                                                user={
                                                                                        user
                                                                                }
                                                                        />
                                                                ),
                                                        )}
                                        </div>
                                </div>
                        </div>
                );

        return (
                <div className="clubMembersRootContainer">
                        <div className="clubMembersBackBtnWrapper">
                                <button
                                        className="clubMembersBackBtn"
                                        onClick={() => navigate("/club")}>
                                        <IconArrowNarrowLeft /> Back to Club
                                </button>
                                <p className="totalMembersCount">2 Members</p>
                        </div>
                        <div className="clubMembersContentBody">
                                <div className="clubMembersContentBodyWrapper">
                                        <ClubMemberListItem />
                                        <ClubMemberListItem />
                                </div>
                        </div>
                </div>
        );
}
