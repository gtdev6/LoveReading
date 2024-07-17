import "./CSS/TextField.css";
import "./CSS/PasswordField.css";
import { useState } from "react";
import { IconEye, IconEyeClosed } from "@tabler/icons-react";

export function PasswordField({
        labelText,
        value,
        onChange,
        placeholder,
        autocomplete,
}) {
        const [type, setType] = useState(false);

        return (
                <div className="textFieldRoot">
                        <p className="labelStyle">{labelText}</p>
                        <div className="inputFieldWrapper">
                                <input
                                        type={type ? `text` : `password`}
                                        className="passwordFieldStyle"
                                        placeholder={placeholder}
                                        value={value}
                                        onChange={onChange}
                                        autoComplete={autocomplete}
                                />
                                <button
                                        className="passwordShowBtn"
                                        onClick={(event) => {
                                                event.preventDefault();
                                                setType((t) => !t);
                                        }}>
                                        {!type ? (
                                                <IconEye className="passwordFieldIcon" />
                                        ) : (
                                                <IconEyeClosed className="passwordFieldIcon" />
                                        )}
                                </button>
                        </div>
                </div>
        );
}
