const {
        generateAccessToken,
        generateRefreshToken,
        verifyRefreshToken,
} = require("../controllers/authController");
const User = require("./../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const bcrypt = require("bcryptjs");
const multer = require("multer");

const { CloudinaryStorage } = require("multer-storage-cloudinary");
const path = require("path");
// const { cloudinary } = require("../app");
const { v2: cloudinary } = require("cloudinary");

cloudinary.config({
        cloud_name: "duofodfpc",
        api_key: "767839248863652",
        api_secret: process.env.CLOUDINARY_SECRET,
        secure: true,
});

exports.cloudinary = cloudinary;

// Set storage engine
// const storage = multer.diskStorage({
//         destination: function (req, file, cb) {
//                 cb(null, "public/uploads"); // Directory to save uploaded files
//         },
//         filename: function (req, file, cb) {
//                 const ext = file.mimetype.split("/")[1];
//                 cb(
//                         null,
//                         `user-${req.user.id}-${Date.now()}-${file.originalname}`,
//                 );
//         },
// });

const storage = new CloudinaryStorage({
        cloudinary: cloudinary,
        params: {
                folder: "profile_pictures", // folder in your Cloudinary account
                format: async (req, file) => file.mimetype.split("/")[1], // supports promises as well
                public_id: (req, file) => {
                        const userId = req.user.id;
                        const timeStamp = Date.now();
                        return `${userId}_${timeStamp}`;
                },
        },
});

// Check file type
function checkFileType(file, cb) {
        const filetypes = /jpeg|jpg|png/;
        const extname = filetypes.test(
                path.extname(file.originalname).toLowerCase(),
        );
        const mimetype = filetypes.test(file.mimetype);

        if (extname && mimetype) {
                return cb(null, true);
        } else {
                cb("Error: Images Only!");
        }
}

// Initialize upload variable
// const upload = multer({
//         storage: storage,
//         fileFilter: function (req, file, cb) {
//                 checkFileType(file, cb);
//         },
// });

const upload = multer({ storage: storage });

exports.upload = upload;

exports.refreshToken = catchAsync(async (req, res, next) => {
        console.log("Refresh Token");

        const refreshToken = req.cookies.refreshToken;
        let decoded = null;

        if (!refreshToken) {
                return next(new AppError("No Refresh Token", 401));
        }

        if (refreshToken) {
                decoded = verifyRefreshToken(refreshToken);
        }

        if (!refreshToken && !decoded) {
                return next(new AppError("No Refresh Token", 400));
        }
        if (decoded) {
                const user = await User.findById(decoded.id);

                const accessToken = generateAccessToken(user);
                const newRefreshToken = generateRefreshToken(user);

                await user.updateOne({ newRefreshToken });

                // res.cookie("refreshToken", refreshToken, {
                //         httpOnly: true,
                //         secure: false,
                //         sameSite: "none",
                //         path: "/",
                // });

                res.cookie("refreshToken", newRefreshToken, {
                        httpOnly: true,
                        secure: false,
                        path: "/",
                });

                res.status(200).json({
                        status: "Success",
                        accessToken,
                        userId: user._id,
                        role: user.role,
                });
        }

        if (!decoded) {
                next(
                        new AppError(
                                "something went wrong in generating refresh token",
                                500,
                        ),
                );
        }
});

exports.loginUser = catchAsync(async (req, res, next) => {
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select("+password");

        if (!user) {
                return next(new AppError("No user found with such email", 404));
        }

        // const matchPasswords = await bcrypt.compare(password, user.password);

        const passwordResult = await user.matchPassword(
                password,
                user.password,
        );

        if (user && !passwordResult) {
                return next(new AppError("Incorrect Password", 401));
        }
        const accessToken = generateAccessToken(user);
        const refreshToken = generateRefreshToken(user);

        // await user.updateOne({ refreshToken });

        res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
        });

        res.status(200).json({
                status: "Success",
                userId: user._id,
                name: user.name,
                role: user.role,
                accessToken,
        });
});

// exports.logoutUser = catchAsync(async (req, res, next) => {
//         const { userId } = req.body;
//
//         const user = await User.findById(userId);
//         if (!user) {
//                 return next("User with such id does not exist !", 400);
//         }
//         // await user.updateOne({ refreshToken: null });
//
//         res.status(200).json({
//                 status: "Success",
//                 message: "User have been logged out!",
//         });
// });

exports.getAllUsersWithProfiles = catchAsync(async (req, res, next) => {
        // Find all users that have a profile
        const users = await User.find({
                profile: { $exists: true, $ne: null },
        }).populate({
                path: "profile",
        });

        if (!users || users.length === 0) {
                return next(new AppError("No Users Found with Profiles", 404));
        }

        const usersWithProfileUrls = users.map((user) => {
                return {
                        _id: user._id,
                        name: user.name,
                        email: user.email,
                        role: user.role,
                        createdAt: user.createdAt,
                        profile: {
                                _id: user.profile._id,
                                profilePicture: user.profile.profilePicture,
                                bio: user.profile.bio,
                                shortStories: user.profile.shortStories,
                        },
                        profilePictureURL: user.profile.profilePictureURL,
                        id: user._id,
                };
        });

        res.status(200).json({
                status: "Success",
                total: usersWithProfileUrls.length,
                users: usersWithProfileUrls,
        });
});

exports.getAllUsers = catchAsync(async (req, res, next) => {
        const data = await User.find();

        if (!data) {
                return next(new AppError("No User Found", 404));
        }

        res.status(200).json({
                status: "Success",
                users: data,
        });
});

exports.createUser = catchAsync(async (req, res, next) => {
        const { name, email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
                return next(new AppError("User with email already exist", 400));
        }
        console.log("Name, email, password", name, email, password);
        const newUser = await User.create({ name, email, password });

        console.log(newUser);

        const accessToken = generateAccessToken(newUser);
        const refreshToken = generateRefreshToken(newUser);

        res.cookie("refreshToken", refreshToken, {
                httpOnly: true,
                secure: false,
                path: "/",
        });

        res.status(201).json({
                status: "Success",
                userId: newUser._id,
                name: newUser.name,
                role: newUser.role,
                accessToken,
        });
});

exports.getUser = catchAsync(async (req, res) => {
        res.status(500).json({
                status: "Error",
                message: "This route is not yet defined",
        });
});
exports.updateUser = catchAsync(async (req, res) => {
        res.status(500).json({
                status: "Error",
                message: "This route is not yet defined",
        });
});

exports.deleteUser = catchAsync(async (req, res) => {
        res.status(500).json({
                status: "Error",
                message: "This route is not yet defined",
        });
});

exports.userInfo = catchAsync(async (req, res, next) => {
        if (req.user) {
                return res.status(200).json({
                        userId: req.user.id,
                        role: req.user.role,
                });
        }

        res.status(401).json({
                status: "Error",
                message: "No User Found",
        });
});

// Controller function to get profile ID from UserModel
exports.getProfileId = catchAsync(async (req, res, next) => {
        const userId = req.user.id;

        // Find the user by ID
        const user = await User.findById(userId).select("profile");

        // Check if user exists
        if (!user) {
                return next(new AppError("User not found", 404));
        }

        // Check if the user has a profile
        const profileId = user.profile;

        // If profile ID is null, user has no profile
        if (!profileId) {
                return res.status(200).json({
                        status: "success",
                        data: {
                                hasProfile: false,
                        },
                });
        }

        // Return the profile ID
        res.status(200).json({
                status: "success",
                data: {
                        hasProfile: true,
                        profileId,
                },
        });
});
