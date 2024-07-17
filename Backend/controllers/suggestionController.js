const Suggestion = require("../models/suggestionModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");

// Get all suggestions
exports.getAllSuggestions = catchAsync(async (req, res, next) => {
        const suggestions = await Suggestion.find()
                .sort({ postedAt: -1 })
                .populate("author");
        res.status(200).json({
                status: "success",
                results: suggestions.length,
                data: {
                        suggestions,
                },
        });
});

// Create a new suggestion

exports.createSuggestion = catchAsync(async (req, res, next) => {
        const userId = req.user._id;
        console.log(userId);

        const suggestionData = {
                ...req.body,
                author: userId,
        };

        const newSuggestion = await Suggestion.create(suggestionData);

        // Update the user's suggestions array
        await User.findByIdAndUpdate(userId, {
                $push: { suggestions: newSuggestion._id },
        });

        res.status(201).json({
                status: "success",
                data: {
                        suggestion: newSuggestion,
                },
        });
});
