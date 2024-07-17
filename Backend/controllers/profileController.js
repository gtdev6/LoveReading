const Profile = require("../models/profileModel");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

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
        const profilePicture = req.file ? req.file.filename : undefined;

        console.log(profilePicture);

        const updatedProfileData = {
                dateOfBirth,
                bio,
                name,
        };

        // Only update profilePicture field if a new file was uploaded
        if (profilePicture) {
                updatedProfileData.profilePicture = profilePicture;
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

        // Get the file name from the uploaded file
        const profilePicture = req.file ? req.file.filename : undefined;

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

        if (profilePicture) {
                profileData.profilePicture = profilePicture;
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
        if (profile.profilePicture) {
                profileData.profilePictureUrl = `${req.protocol}://${req.get("host")}/uploads/${profile.profilePicture}`;
        }

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

        // Construct the URL for the profile picture if it exists
        if (profile.profilePicture) {
                profileData.profilePictureUrl = `${req.protocol}://${req.get("host")}/uploads/${profile.profilePicture}`;
        }

        res.status(200).json({
                status: "success",
                data: {
                        profile: profileData,
                },
        });
});
