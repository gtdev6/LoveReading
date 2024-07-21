const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { cloudinary } = require("./userController");

// Create Profile
exports.createProfile = catchAsync(async (req, res, next) => {
        const { profilePicture, dateOfBirth, bio } = req.body;
        const userId = req.user.id;

        const newProfile = await Profile.create({
                userId,
                profilePicture,
                dateOfBirth,
                bio,
        });

        const user = await User.findByIdAndUpdate(
                userId,
                { profile: newProfile._id },
                { new: true },
        );

        res.status(201).json({
                status: "success",
                data: {
                        profile: newProfile,
                },
        });
});

// Update Profile

exports.updateProfile = catchAsync(async (req, res, next) => {
        const { name, dateOfBirth, bio } = req.body;
        const userId = req.user.id;

        // Check if req.file exists and get the file name from the uploaded file
        console.log(req.file);
        const imageUrl = req?.file?.path;
        const publicId = req?.file?.filename;

        console.log("Image Url and public Id", imageUrl, publicId);

        const updatedProfileData = {
                dateOfBirth,
                bio,
                name,
        };

        console.log("Updated Profile data", updatedProfileData);

        // Only update profilePicture field if a new file was uploaded
        if (imageUrl && publicId) {
                updatedProfileData.profilePictureURL = imageUrl;
                updatedProfileData.profilePicturePublicId = publicId;
        }

        // Fetch the current profile to check if a profile picture already exists
        const currentProfile = await Profile.findOne({ userId });

        if (!currentProfile) {
                return next(new AppError("Profile not found", 404));
        }

        // Only update profilePicture field if a new file was uploaded
        if (imageUrl && publicId) {
                // If there is an existing profile picture, delete it from Cloudinary
                if (currentProfile.profilePicturePublicId) {
                        await cloudinary.uploader.destroy(
                                currentProfile.profilePicturePublicId,
                                function (error, result) {
                                        if (error) {
                                                console.log(
                                                        "Error deleting image from Cloudinary",
                                                        error,
                                                );
                                        } else {
                                                console.log(
                                                        "Previous image deleted from Cloudinary",
                                                        result,
                                                );
                                        }
                                },
                        );
                }

                updatedProfileData.profilePictureURL = imageUrl;
                updatedProfileData.profilePicturePublicId = publicId;
        }

        const updatedProfile = await Profile.findOneAndUpdate(
                { userId },
                updatedProfileData,
                { new: true },
        );

        if (!updatedProfile) {
                return next(new AppError("Profile not found", 404));
        }

        res.status(200).json({
                status: "success",
                data: {
                        profile: updatedProfile,
                },
        });
});

// Update Profile with file upload
exports.createProfileWithUpload = catchAsync(async (req, res, next) => {
        const { dateOfBirth, bio, name } = req.body;
        const userId = req.user.id;
        const imageUrl = req.file.path;
        const publicId = req.file.filename;

        // Get the file name from the uploaded file
        // Only update profilePicture field if a new file was uploaded

        // Check if the user already has a profile
        const existingProfile = await Profile.findOne({ userId });

        if (existingProfile) {
                return next(
                        new AppError(
                                "Profile already exists for this user",
                                400,
                        ),
                );
        }

        // Create the profile
        const profileData = {
                userId,
                name,
                dateOfBirth,
                bio,
        };

        if (imageUrl && publicId) {
                profileData.profilePictureURL = imageUrl;
                profileData.profilePicturePublicId = publicId;
        }

        const newProfile = await Profile.create(profileData);

        // Update user's profile reference
        const user = await User.findByIdAndUpdate(
                userId,
                { profile: newProfile._id },
                { new: true },
        );

        if (!user) {
                return next(new AppError("User not found", 404));
        }

        res.status(201).json({
                status: "success",
                data: {
                        profile: newProfile,
                },
        });
});

exports.getProfile = catchAsync(async (req, res, next) => {
        const userId = req.user.id;
        const profile = await Profile.findOne({ userId }).populate({
                path: "shortStories",
        });

        if (!profile) {
                return next(new AppError("Profile not found", 404));
        }

        const profileData = profile.toObject();

        // Construct the URL for the profile picture if it exists
        res.status(200).json({
                status: "success",
                data: {
                        profile: profileData,
                },
        });
});

exports.getProfileById = catchAsync(async (req, res, next) => {
        const { profileId } = req.body;
        const profile = await Profile.findById(profileId).populate({
                path: "shortStories",
        });

        if (!profile) {
                return next(new AppError("Profile not found", 404));
        }

        const profileData = profile.toObject();

        res.status(200).json({
                status: "success",
                data: {
                        profile: profileData,
                },
        });
});
