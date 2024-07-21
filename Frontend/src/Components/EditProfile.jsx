import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import "./CSS/EditProfile.css";
import API from "../Context/axiosSetup.js";
import { useHasProfile } from "../Hooks/useHasProfile.js";
import { useGetProfile } from "../Hooks/useGetProfile.js";
import { formatDate } from "date-fns/format";
import { Spinner } from "../Util Components/Spinner.jsx";

export function EditProfile() {
        const { data: hasUserProfile } = useHasProfile();
        const { data: profileData } = useGetProfile(
                hasUserProfile?.data?.profileId,
        );
        const [profileImage, setProfileImage] = useState(() => {
                if (hasUserProfile?.data?.profileId) {
                        return profileData.data.profile.profilePictureURL;
                }
                return "/Assets/profile.svg";
        });

        const [profileName, setProfileName] = useState(() => {
                if (hasUserProfile?.data?.profileId) {
                        return profileData.data.profile.name;
                }
                return "";
        });

        const [profileBio, setProfileBio] = useState(() => {
                if (hasUserProfile?.data?.profileId) {
                        return profileData.data.profile.bio;
                }
                return "";
        });

        const [profileDate, setProfileDate] = useState(() => {
                if (hasUserProfile?.data?.profileId) {
                        return formatDate(
                                profileData.data.profile.dateOfBirth,
                                "yyyy-MM-dd",
                        );
                }
                return "2000-10-19";
        });

        const [profileImageFile, setProfileImageFile] = useState(null);
        const navigate = useNavigate();
        const queryClient = useQueryClient();

        function handleChangeImage(event) {
                const file = event.target.files[0];
                const filePath = URL.createObjectURL(file);
                setProfileImage(filePath);
                setProfileImageFile(file);
        }

        // Mutation function to create profile
        const createProfile = async (formData) => {
                const apiUrl =
                        process.env.NODE_ENV === "production"
                                ? `${import.meta.env.VITE_API_URL}/api/v1/profile/createProfile`
                                : `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/profile/createProfile`;

                const { data } = await API.post(apiUrl, formData, {
                        headers: {
                                "Content-Type": "multipart/form-data",
                        },
                        withCredentials: true,
                });
                return data;
        };

        const editProfile = async (formData) => {
                const apiUrl =
                        process.env.NODE_ENV === "production"
                                ? `${import.meta.env.VITE_API_URL}/api/v1/profile/updateProfile`
                                : `${import.meta.env.VITE_API_URL}:${import.meta.env.VITE_API_PORT}/api/v1/profile/updateProfile`;

                const { data } = await API.patch(apiUrl, formData, {
                        headers: {
                                "Content-Type": "multipart/form-data",
                        },
                        withCredentials: true,
                });
                return data;
        };

        const { mutate, status: createStatus } = useMutation({
                mutationFn: createProfile,
                onSuccess: async (data) => {
                        // Invalidate the query to update hasProfile status
                        await queryClient.invalidateQueries({
                                queryKey: ["hasProfile"],
                                refetchType: "all",
                        });
                        queryClient.setQueryData(["profile"], (oldData) => {
                                return {
                                        status: data.status,
                                        data: {
                                                profile: {
                                                        ...data.data.profile,
                                                        shortStories: [],
                                                },
                                        },
                                };
                        });
                        navigate("/club"); // Navigate to desired route on success
                },
                onError: (error) => {
                        console.error("Error creating profile:", error);
                        // Handle error as needed
                },
        });

        const {
                mutate: editMutate,
                status: editingStatus,
                error: editError,
        } = useMutation({
                mutationFn: editProfile,
                onSuccess: async (data) => {
                        // Invalidate the query to update hasProfile status
                        await queryClient.invalidateQueries({
                                queryKey: ["hasProfile", "shortStories"],
                                refetchType: "all",
                        });

                        queryClient.setQueryData(["profile"], (oldData) => {
                                return {
                                        status: oldData.status,
                                        data: {
                                                profile: {
                                                        ...data.data.profile,
                                                        shortStories:
                                                                oldData.data
                                                                        .profile
                                                                        .shortStories,
                                                        profilePictureURL:
                                                                data.data
                                                                        .profile
                                                                        .profilePictureURL,
                                                        profilePicturePublicId:
                                                                data.data
                                                                        .profile
                                                                        .profilePicturePublicId,
                                                },
                                        },
                                };
                        });

                        navigate("/myProfile"); // Navigate to desired route on success
                },
                onError: (error) => {
                        console.error("Error creating profile:", error);
                        // Handle error as needed
                },
        });

        const handleSubmit = (e) => {
                e.preventDefault();

                const formData = new FormData();
                formData.append("name", profileName);
                formData.append("dateOfBirth", profileDate);
                formData.append("bio", profileBio);

                // Append profileImageFile only if it exists and has changed
                if (profileImageFile) {
                        formData.append("profilePicture", profileImageFile);
                }

                if (!hasUserProfile?.data?.profileId) {
                        mutate(formData);
                } else {
                        editMutate(formData);
                }
        };

        // if (hasUserProfile?.data?.profileId) {
        //         const { profile } = profileData.data;
        //         console.log(profile);
        if (editingStatus === "pending" || createStatus === "pending") {
                return <Spinner />;
        }

        return (
                <div className="editProfileRootContainer">
                        <div className="editProfileRootWrapper">
                                <form
                                        onSubmit={handleSubmit}
                                        encType="multipart/form-data">
                                        <div className="profileInputImageWrapper">
                                                <div className="profileInputImageContainer">
                                                        {profileImageFile ? (
                                                                <img
                                                                        src={
                                                                                profileImage
                                                                        }
                                                                        loading={
                                                                                "lazy"
                                                                        }
                                                                        alt=""
                                                                />
                                                        ) : (
                                                                <img
                                                                        src={
                                                                                profileImage
                                                                        }
                                                                        alt=""
                                                                />
                                                        )}
                                                </div>
                                                <label
                                                        htmlFor="fileInput"
                                                        className="editProfileFileInputBtn">
                                                        Choose File
                                                </label>
                                                <input
                                                        id="fileInput"
                                                        type="file"
                                                        onChange={
                                                                handleChangeImage
                                                        }
                                                        accept="image/*"
                                                        style={{
                                                                display: "none",
                                                        }}
                                                />
                                        </div>
                                        <div className="profileInfoInputsWrapper">
                                                <label
                                                        htmlFor="editProfileNameInput"
                                                        className="editProfileNameInputLabel">
                                                        Name
                                                </label>
                                                <input
                                                        id="editProfileNameInput"
                                                        className="editProfileTextInputField"
                                                        type="text"
                                                        placeholder="Aaron Smith"
                                                        value={profileName}
                                                        onChange={(e) =>
                                                                setProfileName(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }
                                                />
                                                <label
                                                        htmlFor="editProfileDateInput"
                                                        className="editProfileDateInputLabel">
                                                        Date of Birth
                                                </label>
                                                <input
                                                        id="editProfileDateInput"
                                                        className="editProfileTextInputField"
                                                        type="date"
                                                        required={true}
                                                        placeholder="10/11/2024"
                                                        value={profileDate}
                                                        onChange={(e) => {
                                                                setProfileDate(
                                                                        e.target
                                                                                .value,
                                                                );
                                                        }}
                                                />
                                                <label
                                                        htmlFor="editProfileTextArea"
                                                        className="editProfileTextAreaLabel">
                                                        Bio
                                                </label>
                                                <textarea
                                                        id="editProfileTextArea"
                                                        name="editProfileTextArea"
                                                        className="editProfileTextAreaField"
                                                        rows={4}
                                                        cols={"50"}
                                                        placeholder="Bio"
                                                        value={profileBio}
                                                        onChange={(e) =>
                                                                setProfileBio(
                                                                        e.target
                                                                                .value,
                                                                )
                                                        }></textarea>
                                        </div>
                                        <div className="editProfileBtnsContainer">
                                                <button
                                                        type={"reset"}
                                                        className="editProfileCancelBtn"
                                                        onClick={() =>
                                                                navigate(
                                                                        "/club",
                                                                )
                                                        }>
                                                        Cancel
                                                </button>
                                                <button
                                                        type={"submit"}
                                                        className="editProfileSaveBtn">
                                                        Save
                                                </button>
                                        </div>
                                </form>
                        </div>
                </div>
        );
        // }
}
