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
                                                                        <svg
                                                                                version="1.1"
                                                                                id="Layer_1"
                                                                                xmlns="http://www.w3.org/2000/svg"
                                                                                xmlns:xlink="http://www.w3.org/1999/xlink"
                                                                                x="0px"
                                                                                y="0px"
                                                                                fill="#76453B"
                                                                                viewBox="0 0 24 24"
                                                                                style="enable-background:new 0 0 24 24;"
                                                                                xml:space="preserve">
                                                                                <g>
                                                                                        <path
                                                                                                className="st0"
                                                                                                d="M13.9,15.1c0.6,0.3,1.4,0.8,2,1.3c0.4,0.3,0.8,0.8,0.8,1.5c0.1,0.7-0.2,1.3-0.8,1.8c-0.9,0.9-2.1,1.6-3.5,1.6
		H5.6c-1.5,0-2.6-0.7-3.5-1.6c-0.6-0.5-0.9-1.1-0.8-1.8c0.1-0.6,0.5-1.1,0.8-1.5c0.6-0.6,1.5-1,2-1.3C4.2,15.1,4.3,15,4.4,15
		c2.8-1.6,6.4-1.6,9.2,0C13.7,15,13.8,15.1,13.9,15.1z"
                                                                                        />
                                                                                        <path
                                                                                                className="st0"
                                                                                                d="M4.2,7.5c0-2.6,2.1-4.8,4.8-4.8c2.6,0,4.8,2.1,4.8,4.8c0,2.6-2.1,4.8-4.8,4.8C6.4,12.2,4.2,10.1,4.2,7.5z"
                                                                                        />
                                                                                        <path
                                                                                                className="st0"
                                                                                                d="M14.2,11c-0.2,0.3-0.3,0.4-0.2,0.5c0,0.1,0.2,0.2,0.4,0.3c0.5,0.3,1.1,0.4,1.7,0.4c2.1,0,3.8-1.7,3.8-3.8
		c0-2.1-1.7-3.8-3.8-3.8c-0.2,0-0.4,0-0.7,0.1c-0.3,0-0.4,0.1-0.5,0.2c-0.1,0.1,0,0.3,0.1,0.6c0.2,0.6,0.3,1.3,0.3,1.9
		C15.2,8.8,14.9,10,14.2,11z"
                                                                                        />
                                                                                        <path
                                                                                                className="st0"
                                                                                                d="M18.7,20.2c1.4,0,2.4-0.6,3.3-1.3c0.5-0.4,0.9-1,0.8-1.6c-0.1-0.6-0.5-1-0.8-1.3c-0.6-0.5-1.4-0.9-1.9-1.1
		c-0.1-0.1-0.2-0.1-0.3-0.1c-1-0.5-2.1-0.8-3.2-1c-0.7-0.1-1.1-0.1-1.2,0.1c-0.1,0.2,0.2,0.4,0.9,0.9c0.2,0.2,0.5,0.4,0.7,0.6
		c0.5,0.4,1.2,1.2,1.3,2.4c0.1,0.5,0,1-0.2,1.5c-0.2,0.5-0.3,0.8-0.2,0.9c0,0,0,0,0,0C18,20.2,18.2,20.2,18.7,20.2z"
                                                                                        />
                                                                                </g>
                                                                        </svg>
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
