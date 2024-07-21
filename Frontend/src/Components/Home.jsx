import "./CSS/Home.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
        IconHomeFilled,
        IconInfoCircleFilled,
        IconLogout,
        IconMenu2,
        IconMessageCircle2Filled,
        IconUserFilled,
        IconUsers,
} from "@tabler/icons-react";
import { Drawer, Tabs } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext.js";
import { useQueryClient } from "@tanstack/react-query";

export function Home({ children, isNavBtn }) {
        const [opened, { open, close }] = useDisclosure(false);
        const navigate = useNavigate();
        const queryClient = useQueryClient();
        const { auth, setAuth } = useAuth();

        const handleLogout = () => {
                // Clear accessToken from localStorage
                localStorage.removeItem("accessToken");

                // Clear refreshToken cookie
                document.cookie =
                        "refreshToken=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/";

                // Clear the auth state
                setAuth(null);
                // Clear all query data
                queryClient.clear();

                // Redirect or perform any other necessary actions after logout
                // Example: navigate to the login page
                navigate("/login");
        };

        return (
                <div className="homeRoot">
                        <ToastContainer
                                position="top-center"
                                autoClose={5000}
                                limit={5}
                                hideProgressBar={false}
                                newestOnTop={false}
                                closeOnClick
                                rtl={false}
                                pauseOnFocusLoss
                                draggable
                                pauseOnHover
                                theme="light"
                                transition:Bounce
                        />
                        <nav className="homeHeader">
                                <div className="headerIconCon">
                                        <img
                                                src="/Assets/Love_Reading_Logo.svg"
                                                alt={""}
                                        />
                                </div>
                                {auth && (
                                        <button
                                                className="iconMenuBtnHeader"
                                                onClick={open}>
                                                <IconMenu2 className="iconMenuHeader" />
                                        </button>
                                )}
                        </nav>
                        <Drawer.Root
                                opened={opened}
                                onClose={close}
                                title={"Menu"}
                                className={
                                        opened
                                                ? `drawerRoot`
                                                : `drawerRoot drawerRootHide`
                                }>
                                <Drawer.Overlay className="drawerOverlay" />
                                <Drawer.Content className="drawerContent">
                                        <Drawer.Header className="drawerHeader">
                                                <Drawer.Title className="drawerTitle">
                                                        Menu
                                                </Drawer.Title>
                                                <Drawer.CloseButton className="drawerCloseBtn" />
                                        </Drawer.Header>
                                        <Drawer.Body className="drawerBody">
                                                <Tabs className="menuTabsRoot">
                                                        <Tabs.List className="menuTabsList">
                                                                <Tabs.Tab
                                                                        className="menuTab"
                                                                        value={
                                                                                "profile"
                                                                        }
                                                                        onClick={() => {
                                                                                close();
                                                                                navigate(
                                                                                        "/myProfile",
                                                                                );
                                                                        }}>
                                                                        Profile
                                                                        <IconUserFilled
                                                                                color={
                                                                                        "#76453b"
                                                                                }
                                                                        />
                                                                </Tabs.Tab>
                                                                <Tabs.Tab
                                                                        className="menuTab"
                                                                        value={
                                                                                "club"
                                                                        }
                                                                        onClick={() => {
                                                                                close();
                                                                                navigate(
                                                                                        "/club",
                                                                                );
                                                                        }}>
                                                                        Club
                                                                        <IconHomeFilled
                                                                                color={
                                                                                        "#76453b"
                                                                                }
                                                                        />
                                                                </Tabs.Tab>
                                                                {auth &&
                                                                        auth.role &&
                                                                        auth.role ===
                                                                                "Leader" && (
                                                                                <>
                                                                                        <Tabs.Tab
                                                                                                className="menuTab"
                                                                                                value={
                                                                                                        "create_club_meeting"
                                                                                                }
                                                                                                onClick={() => {
                                                                                                        close();
                                                                                                        navigate(
                                                                                                                "/clubMeetings/new",
                                                                                                        );
                                                                                                }}>
                                                                                                Create
                                                                                                Club
                                                                                                Meeting
                                                                                                <IconUserFilled
                                                                                                        color={
                                                                                                                "#76453b"
                                                                                                        }
                                                                                                />
                                                                                        </Tabs.Tab>
                                                                                        <Tabs.Tab
                                                                                                className="menuTab"
                                                                                                value={
                                                                                                        "create_Future_Meeting"
                                                                                                }
                                                                                                onClick={() => {
                                                                                                        close();
                                                                                                        navigate(
                                                                                                                "/futureMeeting/new",
                                                                                                        );
                                                                                                }}>
                                                                                                Create
                                                                                                Future
                                                                                                Meeting
                                                                                                <IconUserFilled
                                                                                                        color={
                                                                                                                "#76453b"
                                                                                                        }
                                                                                                />
                                                                                        </Tabs.Tab>
                                                                                        <Tabs.Tab
                                                                                                className="menuTab"
                                                                                                value={
                                                                                                        "update_club_info"
                                                                                                }
                                                                                                onClick={() => {
                                                                                                        close();
                                                                                                        navigate(
                                                                                                                "/updateClubInfo",
                                                                                                        );
                                                                                                }}>
                                                                                                Update
                                                                                                Club
                                                                                                Info
                                                                                                <IconInfoCircleFilled
                                                                                                        color={
                                                                                                                "#76453b"
                                                                                                        }
                                                                                                />
                                                                                        </Tabs.Tab>
                                                                                </>
                                                                        )}
                                                                <Tabs.Tab
                                                                        className="menuTab"
                                                                        value={
                                                                                "Club_Members"
                                                                        }
                                                                        onClick={() => {
                                                                                close();
                                                                                navigate(
                                                                                        "/clubMembers",
                                                                                );
                                                                        }}>
                                                                        Club
                                                                        Members
                                                                </Tabs.Tab>
                                                                <Tabs.Tab
                                                                        className="menuTab"
                                                                        value={
                                                                                "Club_Suggestions"
                                                                        }
                                                                        onClick={() => {
                                                                                close();
                                                                                navigate(
                                                                                        "/clubSuggestions",
                                                                                );
                                                                        }}>
                                                                        Club
                                                                        Suggestions
                                                                        <IconMessageCircle2Filled
                                                                                color={
                                                                                        "#76453b"
                                                                                }
                                                                        />
                                                                </Tabs.Tab>
                                                                <Tabs.Tab
                                                                        className="menuTab"
                                                                        value={
                                                                                "About_Club"
                                                                        }
                                                                        onClick={(
                                                                                e,
                                                                        ) => {
                                                                                close();
                                                                                navigate(
                                                                                        "/aboutUs",
                                                                                );
                                                                        }}>
                                                                        About
                                                                        Club
                                                                        <IconInfoCircleFilled
                                                                                color={
                                                                                        "#76453b"
                                                                                }
                                                                        />
                                                                </Tabs.Tab>
                                                        </Tabs.List>
                                                </Tabs>
                                                <button
                                                        className="logoutBtn"
                                                        onClick={handleLogout}>
                                                        Logout <IconLogout />
                                                </button>
                                        </Drawer.Body>
                                </Drawer.Content>
                        </Drawer.Root>
                        {children}
                </div>
        );
}
