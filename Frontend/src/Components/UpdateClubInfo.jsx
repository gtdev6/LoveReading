import "./CSS/UpdateClubInfo.css";
import { useNavigate } from "react-router-dom";
import { IconPlus } from "@tabler/icons-react";
import { List } from "@mantine/core";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import API from "../Context/axiosSetup.js";
import { toast } from "react-toastify";
import { useClubInfo, useUpdateClubInfo } from "../Hooks/useClubInfo.js";

export function UpdateClubInfo() {
        const queryClient = useQueryClient();
        const navigate = useNavigate();
        const { data: clubInfoData, isLoading, error } = useClubInfo();
        const updateClubInfoMutation = useUpdateClubInfo();

        const [booksName, setBooksName] = useState([]);
        const [bookFieldValue, setBookFieldValue] = useState("");
        const [email, setEmail] = useState("");
        const [twitter, setTwitter] = useState("");
        const [aboutUsClub, setAboutUsClub] = useState("");
        const [activitiesClub, setActivitiesClub] = useState("");
        const [howToJoinClub, setHowToJoinClub] = useState("");

        useEffect(() => {
                if (clubInfoData) {
                        const {
                                aboutUs,
                                activities,
                                howToJoin,
                                featuredBooks,
                                contactInfo,
                        } = clubInfoData.data.clubInfo;
                        setAboutUsClub(aboutUs || "");
                        setActivitiesClub(activities || "");
                        setHowToJoinClub(howToJoin || "");
                        setBooksName(
                                featuredBooks.map((book) => book.name) || [],
                        );
                        setEmail(contactInfo.email || "");
                        setTwitter(contactInfo.twitter || "");
                }
        }, [clubInfoData]);

        async function handleSubmit(e) {
                e.preventDefault();
                const updatedInfo = {
                        aboutUs: aboutUsClub,
                        activities: activitiesClub,
                        howToJoin: howToJoinClub,
                        featuredBooks: booksName, // Add image URL if needed
                        contactInfo: {
                                email,
                                twitter,
                        },
                };

                try {
                        await updateClubInfoMutation.mutateAsync({
                                id: clubInfoData.data.clubInfo._id,
                                ...updatedInfo,
                        });
                        await queryClient.invalidateQueries(["clubInfo"]);
                        navigate("/aboutUs");
                } catch (e) {
                        console.log(e);
                }
        }

        return (
                <div className="updateClubInfoRootContainer">
                        <div className="updateClubInfoWrapper">
                                <form action="" onSubmit={handleSubmit}>
                                        <div className="updateClubInfoFieldWrapper">
                                                <label
                                                        htmlFor="updateClubInfoActivities"
                                                        className="updateClubInfoFieldLabel">
                                                        About Us
                                                </label>
                                                <textarea
                                                        id={
                                                                "updateClubInfoActivities"
                                                        }
                                                        name={
                                                                "updateClubInfoAboutUs"
                                                        }
                                                        placeholder={"About Us"}
                                                        value={aboutUsClub}
                                                        onChange={(e) =>
                                                                setAboutUsClub(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                />
                                        </div>
                                        <div className="updateClubInfoFieldWrapper">
                                                <label
                                                        htmlFor="updateClubInfoActivities"
                                                        className="updateClubInfoFieldLabel">
                                                        Club Activities
                                                </label>
                                                <textarea
                                                        id={
                                                                "updateClubInfoActivities"
                                                        }
                                                        name={
                                                                "updateClubInfoActivities"
                                                        }
                                                        placeholder={
                                                                "Club Activities"
                                                        }
                                                        value={activitiesClub}
                                                        onChange={(e) =>
                                                                setActivitiesClub(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                />
                                        </div>
                                        <div className="updateClubInfoFieldWrapper">
                                                <label
                                                        htmlFor="updateClubInfoHowToJoin"
                                                        className="updateClubInfoFieldLabel">
                                                        How To Join
                                                </label>
                                                <textarea
                                                        id={
                                                                "updateClubInfoHowToJoin"
                                                        }
                                                        name={
                                                                "updateClubInfoHowToJoin"
                                                        }
                                                        placeholder={
                                                                "How to join club"
                                                        }
                                                        value={howToJoinClub}
                                                        onChange={(e) =>
                                                                setHowToJoinClub(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                />
                                        </div>

                                        <div className="updateClubInfoFieldWrapper">
                                                <label
                                                        htmlFor="updateClubInfoBookTextField"
                                                        className="updateClubInfoFieldLabel">
                                                        Featured Books
                                                </label>
                                                <div className="updateClubInfoBookFieldWrapper">
                                                        <input
                                                                id={
                                                                        "updateClubInfoBookTextField"
                                                                }
                                                                name={
                                                                        "updateClubInfoBookTextField"
                                                                }
                                                                placeholder={
                                                                        "Featured Book"
                                                                }
                                                                value={
                                                                        bookFieldValue
                                                                }
                                                                onChange={(
                                                                        e,
                                                                ) => {
                                                                        setBookFieldValue(
                                                                                e
                                                                                        .target
                                                                                        .value,
                                                                        );
                                                                }}
                                                        />
                                                        <button
                                                                onClick={(
                                                                        e,
                                                                ) => {
                                                                        e.preventDefault();
                                                                        if (
                                                                                bookFieldValue &&
                                                                                bookFieldValue !==
                                                                                        ""
                                                                        ) {
                                                                                setBooksName(
                                                                                        [
                                                                                                ...booksName,
                                                                                                bookFieldValue,
                                                                                        ],
                                                                                );
                                                                                setBookFieldValue(
                                                                                        "",
                                                                                );
                                                                        }
                                                                }}>
                                                                <IconPlus />
                                                        </button>
                                                </div>
                                                <List className="bookListRoot">
                                                        {booksName.map(
                                                                (
                                                                        book,
                                                                        index,
                                                                ) => (
                                                                        <List.Item
                                                                                className="bookListItem"
                                                                                key={
                                                                                        index
                                                                                }>
                                                                                <p>
                                                                                        <img
                                                                                                src="/Assets/Book.svg"
                                                                                                alt=""
                                                                                        />
                                                                                        {
                                                                                                book
                                                                                        }
                                                                                </p>
                                                                        </List.Item>
                                                                ),
                                                        )}
                                                </List>
                                        </div>
                                        <div className="updateClubInfoFieldWrapper">
                                                <label
                                                        htmlFor="updateClubInfoEmail"
                                                        className="updateClubInfoFieldLabel">
                                                        Contact Email
                                                </label>
                                                <input
                                                        type="text"
                                                        id={
                                                                "updateClubInfoEmail"
                                                        }
                                                        name={
                                                                "updateClubInfoEmail"
                                                        }
                                                        placeholder={
                                                                "Contact Email"
                                                        }
                                                        value={email}
                                                        onChange={(e) =>
                                                                setEmail(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                />
                                        </div>
                                        <div className="updateClubInfoFieldWrapper">
                                                <label
                                                        htmlFor="updateClubInfoTwitter"
                                                        className="updateClubInfoFieldLabel">
                                                        Contact Twitter
                                                </label>
                                                <input
                                                        type="text"
                                                        id={
                                                                "updateClubInfoTwitter"
                                                        }
                                                        name={
                                                                "updateClubInfoTwitter"
                                                        }
                                                        placeholder={"Twitter"}
                                                        value={twitter}
                                                        onChange={(e) =>
                                                                setTwitter(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                />
                                        </div>

                                        <div className="updateClubInfoBtnsContainer">
                                                <button
                                                        type={"reset"}
                                                        className="updateClubInfoCloseBtn"
                                                        onClick={() =>
                                                                navigate(
                                                                        "/club",
                                                                )
                                                        }>
                                                        Close
                                                </button>
                                                <button
                                                        className="updateClubInfoSaveBtn"
                                                        type={"submit"}
                                                        onClick={handleSubmit}>
                                                        Save
                                                </button>
                                        </div>
                                </form>
                        </div>
                </div>
        );
}
