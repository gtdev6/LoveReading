const jwt = require("jsonwebtoken");
const User = require("./../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const { promisify } = require("util");

exports.generateAccessToken = (user) => {
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
                expiresIn: "30m",
        });
};

exports.generateRefreshToken = (user) => {
        return jwt.sign({ id: user._id }, process.env.JWT_SECRET);
};

const verifyRefreshToken = (refreshToken, next) => {
        try {
                // Verify the refresh token
                // Attach the decoded user payload to the request object
                return jwt.verify(refreshToken, process.env.JWT_SECRET);
        } catch (err) {
                return next(new AppError("Invalid refresh token", 403));
        }
};

exports.protect = catchAsync(async (req, res, next) => {
        // console.log(req);
        // console.log("cookies", req.cookies);
        // 1) Getting token and check of it's there
        let token;
        if (
                req.headers.authorization &&
                req.headers.authorization.startsWith("Bearer")
        ) {
                token = req.headers.authorization.split(" ")[1];
        }

        // if (!token) {
        //         const refreshToken = req.cookies?.refreshToken;
        //         if (!refreshToken)
        //                 return next(
        //                         new AppError(
        //                                 "You are not logged in! Please log in to get access.",
        //                                 401,
        //                         ),
        //                 );
        //
        //         const decoded = verifyRefreshToken(refreshToken, next);
        //         // console.log(decoded);
        // }

        if (!token) {
                return next(
                        new AppError(
                                "You are not logged in! Please log in to get access.",
                                401,
                        ),
                );
        }

        let decoded;
        // 2) Verification token
        try {
                decoded = await promisify(jwt.verify)(
                        token,
                        process.env.JWT_SECRET,
                );
        } catch (error) {
                if (error.name === "TokenExpiredError") {
                        // Handle token expiration
                        next(new AppError("Token has Expired", 401));
                } else {
                        // Handle other errors
                        console.error("Token verification failed", error);
                        next(new AppError("Token verification failed", 401));
                }
        }

        // console.log(decoded);

        // 3) Check if user still exists
        const currentUser = await User.findById(decoded.id);
        if (!currentUser) {
                return next(
                        new AppError(
                                "The user belonging to this token does no longer exist.",
                                401,
                        ),
                );
        }

        // GRANT ACCESS TO PROTECTED ROUTE
        // console.log(currentUser);
        req.user = currentUser;
        next();
});

exports.restrictTo = (...roles) => {
        return (req, res, next) => {
                // roles ['Leader', 'Member']. role='user'
                // console.log(req.user.role);
                // console.log(roles);
                // console.log(roles.includes(req.user.role));
                if (!roles.includes(req.user.role)) {
                        return next(
                                new AppError(
                                        "You do not have permission to perform this action",
                                        403,
                                ),
                        );
                }

                next();
        };
};

module.exports.verifyRefreshToken = verifyRefreshToken;
