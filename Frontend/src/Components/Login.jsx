import "./CSS/login.css";
import { TextField } from "../Util Components/TextField.jsx";
import { PasswordField } from "../Util Components/PasswordField.jsx";
import { useLogin } from "../Hooks/useAuth.js";
import { useEffect, useState } from "react";
import { useAuth } from "../Context/AuthContext.js";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Spinner } from "../Util Components/Spinner.jsx";

export function Login() {
        // const [email, setEmail] = useState("leader@lovereading.com");
        // const [password, setPassword] = useState("leaderPassword");
        // const [email, setEmail] = useState("rashidAshfaq4@gmail.com");
        // const [password, setPassword] = useState("Password");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const { isPending, isSuccess, mutateAsync: login } = useLogin();
        const { setAuth } = useAuth();
        const navigate = useNavigate();

        async function handleSignupBtn(event) {
                event.preventDefault();
                navigate("/signup");
        }

        async function handleLoginBtn(event) {
                event.preventDefault();
                try {
                        const data = await login({
                                email,
                                password,
                        });
                        if (data.status === "Success") {
                                setAuth({
                                        userId: data.userId,
                                        role: data.role,
                                        accessToken: data.accessToken,
                                });
                                localStorage.setItem(
                                        "accessToken",
                                        data.accessToken,
                                );
                                navigate("/club");
                        }

                        if (data.status === "Fail") {
                                toast.error(data.message, {
                                        style: {
                                                fontSize: "1.6rem",
                                                color: "red",
                                        },
                                        position: "top-center",
                                        autoClose: 3000,
                                });
                        }

                        // console.log("Is Success", isSuccess);

                        // Assume server sets the refreshToken in HttpOnly cookie
                } catch (error) {
                        console.error("Login error", error);
                }
        }

        return isPending ? (
                <Spinner />
        ) : (
                <div className="loginRoot">
                        <div className="loginWrapper">
                                <h1 className="loginHeading">Login</h1>
                                <form className="loginForm">
                                        <TextField
                                                labelText={"Email"}
                                                placeholder={
                                                        "example@gmail.com"
                                                }
                                                value={email}
                                                onChange={(e) =>
                                                        setEmail(e.target.value)
                                                }
                                                autocomplete={"email"}
                                        />
                                        <PasswordField
                                                labelText={"Password"}
                                                placeholder={"••••••••••••"}
                                                value={password}
                                                onChange={(e) =>
                                                        setPassword(
                                                                e.target.value,
                                                        )
                                                }
                                                autocomplete="current-password"
                                        />
                                        <button
                                                className="loginBtn"
                                                onClick={handleLoginBtn}>
                                                Login
                                        </button>
                                        <button
                                                className="signupBtn"
                                                onClick={handleSignupBtn}>
                                                Signup
                                        </button>
                                </form>
                        </div>
                </div>
        );
}
