import { TextField } from "../Util Components/TextField.jsx";
import { PasswordField } from "../Util Components/PasswordField.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useSignup } from "../Hooks/useAuth.js";
import { useState } from "react";
import validator from "validator/es";
import { useAuth } from "../Context/AuthContext.js";

export function Signup() {
        const [name, setName] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const navigate = useNavigate();
        const { setAuth } = useAuth();
        const { isPending, mutateAsync: signup } = useSignup();
        const notify = (msg) =>
                toast(`${msg}`, {
                        style: {
                                fontSize: "2rem",
                                color: "#76453b",
                        },
                });
        async function handleSignupBtn(event) {
                event.preventDefault();
                if (!validator.isEmail(email)) {
                        return notify("Invalid Email");
                }

                if (password.length < 3) {
                        return notify("Password must be minimum 8 characters");
                }

                try {
                        const data = await signup({
                                name,
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

                // notify();
        }

        function handleLoginBtn(event) {
                event.preventDefault();
                navigate("/login");
        }

        return (
                <div className="loginRoot">
                        <div className="loginWrapper">
                                <h1 className="loginHeading">SignUp</h1>
                                <form className="loginForm">
                                        <TextField
                                                labelText={"Name"}
                                                placeholder={"Ghulam Tahir"}
                                                value={name}
                                                onChange={(event) =>
                                                        setName(
                                                                event.target
                                                                        .value,
                                                        )
                                                }
                                        />
                                        <TextField
                                                labelText={"Email"}
                                                placeholder={
                                                        "example@gmail.com"
                                                }
                                                value={email}
                                                onChange={(e) =>
                                                        setEmail(e.target.value)
                                                }
                                        />
                                        <PasswordField
                                                labelText={"Password"}
                                                placeholder={"••••••••••••"}
                                                autocomplete={"New Password"}
                                                value={password}
                                                onChange={(e) =>
                                                        setPassword(
                                                                e.target.value,
                                                        )
                                                }
                                        />
                                        <button
                                                className="loginBtn"
                                                onClick={handleSignupBtn}>
                                                SignUp
                                        </button>
                                        <button
                                                className="signupBtn"
                                                onClick={handleLoginBtn}>
                                                LogIn
                                        </button>
                                </form>
                        </div>
                </div>
        );
}
