import { TextField } from "../Util Components/TextField.jsx";
import { PasswordField } from "../Util Components/PasswordField.jsx";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Signup() {
        const navigate = useNavigate();
        const notify = () =>
                toast("Wow so easy!", {
                        style: {
                                fontSize: "2rem",
                                color: "#76453b",
                        },
                });
        function handleSignupBtn(event) {
                event.preventDefault();
                notify();
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
                                                placeholder={"Aron Smith"}
                                        />
                                        <TextField
                                                labelText={"Email"}
                                                placeholder={
                                                        "example@gmail.com"
                                                }
                                        />
                                        <PasswordField
                                                labelText={"Password"}
                                                placeholder={"••••••••••••"}
                                                autocomplete={"New Password"}
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
