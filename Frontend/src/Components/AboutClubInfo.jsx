import "./CSS/AboutClubInfo.css";
import {
        IconBookFilled,
        IconBrandTwitterFilled,
        IconMailFilled,
} from "@tabler/icons-react";
import { useClubInfo } from "../Hooks/useClubInfo.js";
export function AboutClubInfo() {
        const { data: clubInfoData, isLoading, error } = useClubInfo();
        // const updateClubInfo = useUpdateClubInfo();

        if (isLoading) {
                return <div>Loading...</div>;
        }

        if (error) {
                console.log(error);
                return <div>Error loading club info </div>;
        }

        const { aboutUs, activities, howToJoin, featuredBooks, contactInfo } =
                clubInfoData.data.clubInfo;

        return (
                <div className="aboutClubRoot">
                        <div className="aboutClubWrapper">
                                <div className="aboutClubLogoContainer">
                                        <img
                                                src="/Assets/Love%20Reading%20Logo.svg"
                                                alt=""
                                        />
                                </div>
                                <div className="aboutClubAboutUsWrapper">
                                        <p className="aboutClubLabel">
                                                About Us
                                        </p>
                                        <p className="aboutClubAboutUs">
                                                {aboutUs}
                                        </p>
                                </div>
                                <div className="aboutClubActivitiesWrapper">
                                        <p className="aboutClubLabel">
                                                Activities
                                        </p>
                                        <p className="aboutClubActivitiesUs">
                                                {activities}
                                        </p>
                                </div>
                                <div className="aboutClubHowToJoinWrapper">
                                        <p className="aboutClubLabel">
                                                How To Join
                                        </p>
                                        <p className="aboutClubHowToJoinUs">
                                                {howToJoin}
                                        </p>
                                </div>
                                <div className="aboutClubFeaturedBooksWrapper">
                                        <p className="aboutClubLabel">
                                                Featured Books
                                        </p>
                                        {featuredBooks.map((book) => (
                                                <div
                                                        key={book.name}
                                                        className="aboutClubFeatureBookUs">
                                                        <img
                                                                src="/Assets/Book.svg"
                                                                alt={book.name}
                                                        />
                                                        <p>{book.name}</p>
                                                </div>
                                        ))}
                                </div>
                                <div className="aboutClubContactInfoWrapper">
                                        <p className="aboutClubLabel">
                                                Contact Info
                                        </p>
                                        <p className="aboutClubContactInfoUs">
                                                <IconMailFilled
                                                        color={"#437663"}
                                                />{" "}
                                                {contactInfo.email}
                                        </p>
                                        <p className="aboutClubContactInfoUs">
                                                <IconBrandTwitterFilled
                                                        color={"#437663"}
                                                />{" "}
                                                {contactInfo.twitter}
                                        </p>
                                </div>
                        </div>
                </div>
        );
}
