const ShortStory = require("../models/shortStoryModel");
const User = require("../models/userModel");
const AppError = require("../utils/appError");
const Profile = require("../models/profileModel");
const APIFeatures = require("../utils/apiFeatures");
const { ObjectId } = require("mongoose").Types;

// Get all short stories
exports.getAllShortStories = async (req, res) => {
        try {
                const shortStories = ShortStory.find().populate({
                        path: "author",
                        select: "-email -role -suggestions -bookings -createdAt -updatedAt -__v -profile",
                });

                const features = new APIFeatures(shortStories, req.query)
                        .limitFields()
                        .filter()
                        .sort();

                const sortedShortStories =
                        await features.query.sort("-postedAt");
                // console.log(s)

                res.status(200).json(sortedShortStories);
        } catch (err) {
                res.status(500).json({ message: err.message });
        }
};

// Create a new short story
exports.createShortStory = async (req, res, next) => {
        const { title, content } = req.body;

        if (!title || !content) {
                return res
                        .status(400)
                        .json({ message: "Title and content are required" });
        }

        try {
                const profile_user = await Profile.findOne({
                        userId: req.user._id,
                }).populate("shortStories");

                if (!profile_user) {
                        return next(
                                new AppError(
                                        "User does not have a profile, can't create short story!",
                                        400,
                                ),
                        );
                }

                console.log(profile_user.shortStories);

                const titleExists = profile_user.shortStories.some(
                        (story) => story.title === title,
                );

                if (titleExists) {
                        return next(
                                new AppError(
                                        "Short Story with the same title already exists!",
                                        400,
                                ),
                        );
                }

                const newShortStory = new ShortStory({
                        title,
                        content,
                        author: req.user._id,
                        postedAt: Date.now(),
                });

                profile_user.shortStories.push(newShortStory._id);

                const savedShortStory = await newShortStory.save();
                await profile_user.save();

                res.status(201).json(savedShortStory);
        } catch (err) {
                res.status(500).json({ message: err.message });
        }
};

// Update a short story by ID
exports.updateShortStory = async (req, res) => {
        const { id, title, content } = req.body;

        if (!ObjectId.isValid(id)) {
                return res.status(400).json({ message: "Invalid ID format" });
        }

        try {
                const shortStory = await ShortStory.findById(id);
                if (!shortStory) {
                        return res
                                .status(404)
                                .json({ message: "Short story not found" });
                }

                if (req.user._id.toString() !== shortStory.author.toString()) {
                        return res.status(403).json({
                                message: "You are not authorized to update this short story",
                        });
                }

                shortStory.title = title || shortStory.title;
                shortStory.content = content || shortStory.content;

                const updatedShortStory = await shortStory.save();
                res.status(200).json(updatedShortStory);
        } catch (err) {
                res.status(500).json({ message: err.message });
        }
};

// Delete a short story by ID
exports.deleteShortStory = async (req, res, next) => {
        const { id } = req.body;

        if (!ObjectId.isValid(id)) {
                return next(new AppError("Invalid ID format", 400));
        }

        try {
                const shortStory = await ShortStory.findById(id);
                if (!shortStory) {
                        return next(new AppError("Short story not found", 403));
                }

                if (req.user._id.toString() !== shortStory.author.toString()) {
                        return next(
                                new AppError(
                                        "You are not authorized to delete this short story",
                                        403,
                                ),
                        );
                }

                //Find the user's profile and remove the short story ID from the shortStories array
                const profile_user = await Profile.findOne({
                        userId: req.user._id,
                });
                if (profile_user) {
                        profile_user.shortStories =
                                profile_user.shortStories.filter(
                                        (storyId) =>
                                                storyId.toString() !==
                                                id.toString(),
                                );
                        await profile_user.save();
                }

                await shortStory.remove();
                res.status(200).json({
                        message: "Short story deleted successfully",
                });
        } catch (err) {
                return next(new AppError(err.message, 500));
        }
};
