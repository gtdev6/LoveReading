require("dotenv").config();

const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const profileRouter = require("./routes/profileRoutes");
const meetingRouter = require("./routes/meetingRoutes");
const futureMeetingRouter = require("./routes/futureMeetingsRoutes");
const shortStoriesRouter = require("./routes/shortStoryRoutes");
const suggestionRoutes = require("./routes/suggestionRoutes");
const aboutClubInfoRoutes = require("./routes/clubInfoRoutes");
const path = require("path");

const app = express();
/*app.use(
        cors({
                origin: "http://192.168.100.53:5173 http://192.168.53.5173", // Replace with your frontend URL
                credentials: true, // Allow credentials (cookies)
        }),
);*/
// Array of allowed origins
const allowedOrigins = [
        "http://192.168.100.53:5173",
        "http://localhost:5173",
        "https://love-reading-g2xx42s0a-ghulam-tahirs-projects.vercel.app/",
        "https://love-reading.vercel.app/",
        "*",
];

const corsOptions = {
        origin: function (origin, callback) {
                if (!origin || allowedOrigins.indexOf(origin) !== -1) {
                        callback(null, true);
                } else {
                        callback(new Error("Not allowed by CORS"));
                }
        },
        credentials: true,
};

// Use CORS middleware with the configured options
app.use(cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

// Serve static files from the 'uploads' directory at the '/public/uploads' URL path
app.use(express.static(path.join(__dirname, "public")));

// 1) Middlewares
if (process.env.NODE_ENV === "development") {
        app.use(morgan("dev"));
        console.log("Morgan Started");
}

app.get("/", (req, res) => {
        console.log(req);

        res.status(200).json({
                status: "Success",
                message: "Welcome to LoveReading API",
        });
});

// 2) Routers
app.use("/api/v1/users", userRouter);
app.use("/api/v1/profile", profileRouter);
app.use("/api/v1/meetings", meetingRouter);
app.use("/api/v1/shortStories", shortStoriesRouter);
app.use("/api/v1/futureMeetings", futureMeetingRouter);
app.use("/api/v1/suggestions", suggestionRoutes);
app.use("/api/v1/aboutUs", aboutClubInfoRoutes);

// Unhandled Routes
app.all("*", (req, res, next) => {
        //  Will directly move to Global Error handling middleware
        next(
                new AppError(
                        `Can't find ${req.originalUrl} on this server!`,
                        404,
                ),
        );
});

//  Global Error Handling Middleware
app.use(globalErrorHandler);

module.exports = app;
