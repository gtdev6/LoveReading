const ClubInfo = require("../models/clubInfoModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

exports.getClubInfo = catchAsync(async (req, res, next) => {
        const clubInfo = await ClubInfo.findOne();

        res.status(200).json({
                status: "success",
                data: {
                        clubInfo,
                },
        });
});

exports.createClubInfo = catchAsync(async (req, res, next) => {
        const clubInfo = req.body;

        const clubDocs = await ClubInfo.find();

        if (clubDocs.length > 0)
                return next(
                        new AppError(
                                "Club Info was already created, can not create again!",
                                400,
                        ),
                );
        const newClubInfo = {
                ...clubInfo,
                featuredBooks: clubInfo.featuredBooks.map((book) => {
                        return { name: book };
                }),
        };

        console.log(newClubInfo);

        const clubInfoDoc = await ClubInfo.create(newClubInfo);

        res.status(200).json({
                status: "success",
                data: {
                        clubInfoDoc,
                },
        });
});

exports.updateClubInfo = catchAsync(async (req, res, next) => {
        const clubInfo = await ClubInfo.findOne();

        const newClubInfo = {
                ...req.body,
                featuredBooks: req.body.featuredBooks.map((book) => {
                        return { name: book };
                }),
        };

        console.log(newClubInfo);

        const updatedClubInfo = await ClubInfo.findByIdAndUpdate(
                clubInfo._id,
                newClubInfo,
                {
                        new: true,
                        runValidators: true,
                },
        );

        res.status(200).json({
                status: "success",
                data: {
                        clubInfo: updatedClubInfo,
                },
        });
});
