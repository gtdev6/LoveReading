import { HeadlessMantineProvider } from "@mantine/core";
import "./App.css";

// import { ToastContainer, toast } from "react-toastify";
import {
        BrowserRouter as Router,
        Route,
        Routes,
        Outlet,
        Link,
} from "react-router-dom";

import { Login } from "./Components/Login.jsx";
import { Signup } from "./Components/Signup.jsx";
import { Home } from "./Components/Home.jsx";
import { Club } from "./Components/Club.jsx";
import { UserProfile } from "./Components/UserProfile.jsx";
import { EditProfile } from "./Components/EditProfile.jsx";
import { CreateShortStory } from "./Components/CreateShortStory.jsx";
import { ClubSuggestions } from "./Components/ClubSuggestions.jsx";
import { CreateClubSuggestion } from "./Components/CreateClubSuggestion.jsx";
import { CreateClubMeeting } from "./Components/CreateClubMeeting.jsx";
import { CreateFutureMeeting } from "./Components/CreateFutureMeeting.jsx";
import { ClubMembers } from "./Components/ClubMembers.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";
import LeaderComponent from "./Components/LeaderComponent.jsx";
import { OtherUserProfile } from "./Components/OtherUserProfile.jsx";
import { AboutClubInfo } from "./Components/AboutClubInfo.jsx";
import { UpdateClubInfo } from "./Components/UpdateClubInfo.jsx";

// import "react-toastify/dist/ReactToastify.css";

function App() {
        return (
                <HeadlessMantineProvider>
                        <Routes>
                                <Route
                                        index
                                        element={
                                                <Home>
                                                        <Login />
                                                </Home>
                                        }
                                />
                                <Route
                                        path="/login"
                                        element={
                                                <Home>
                                                        <Login />
                                                </Home>
                                        }
                                />
                                <Route
                                        path="/signup"
                                        element={
                                                <Home>
                                                        <Signup />
                                                </Home>
                                        }
                                />
                                <Route
                                        path={"/aboutUs"}
                                        element={
                                                <Home>
                                                        <AboutClubInfo />
                                                </Home>
                                        }
                                />

                                <Route element={<LeaderComponent />}>
                                        <Route
                                                path={"/clubMeetings/new"}
                                                element={
                                                        <Home>
                                                                <CreateClubMeeting />
                                                        </Home>
                                                }
                                        />
                                        <Route
                                                path={"/futureMeeting/new"}
                                                element={
                                                        <Home>
                                                                <CreateFutureMeeting />
                                                        </Home>
                                                }
                                        />
                                        <Route
                                                path={"/updateClubInfo"}
                                                element={
                                                        <Home>
                                                                <UpdateClubInfo />
                                                        </Home>
                                                }
                                        />
                                </Route>
                                <Route element={<ProtectedRoute />}>
                                        <Route
                                                path={"/myProfile"}
                                                element={
                                                        <Home>
                                                                <UserProfile />
                                                        </Home>
                                                }
                                        />
                                        <Route
                                                path={"/otherUserProfile"}
                                                element={
                                                        <Home>
                                                                <OtherUserProfile />
                                                        </Home>
                                                }
                                        />

                                        <Route
                                                path={"/createProfile"}
                                                element={
                                                        <Home>
                                                                <EditProfile />
                                                        </Home>
                                                }
                                        />
                                        <Route
                                                path={"/editProfile"}
                                                element={
                                                        <Home>
                                                                <EditProfile />
                                                        </Home>
                                                }
                                        />
                                        <Route
                                                path={"/clubMembers"}
                                                element={
                                                        <Home>
                                                                <ClubMembers />
                                                        </Home>
                                                }
                                        />
                                        <Route
                                                path={"/shortStory/new"}
                                                element={
                                                        <Home>
                                                                <CreateShortStory />
                                                        </Home>
                                                }
                                        />
                                        <Route
                                                path={"/clubSuggestions"}
                                                element={
                                                        <Home>
                                                                <ClubSuggestions />
                                                        </Home>
                                                }
                                        />
                                        <Route
                                                path={"/clubSuggestions/new"}
                                                element={
                                                        <Home>
                                                                <CreateClubSuggestion />
                                                        </Home>
                                                }
                                        />

                                        <Route
                                                path={"/club"}
                                                element={<Club />}
                                        />
                                </Route>

                                {/* Catch-all route for 404 Not Found */}
                                <Route
                                        path="*"
                                        element={
                                                <div>
                                                        <div>
                                                                Page not found
                                                        </div>
                                                        <Link to={"/club"}>
                                                                Go to club{" "}
                                                        </Link>
                                                </div>
                                        }
                                />
                        </Routes>
                </HeadlessMantineProvider>
        );
}

export default App;
