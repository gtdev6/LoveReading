import "./CSS/TextField.css";

export function TextField({
        type = "text",
        labelText,
        value,
        onChange,
        placeholder,
        autocomplete,
}) {
        return (
                <div className="textFieldRoot">
                        <p className="labelStyle">{labelText}</p>
                        <input
                                type={type}
                                className="inputFieldStyle"
                                placeholder={placeholder}
                                value={value}
                                onChange={onChange}
                                autoComplete={autocomplete}
                        />
                </div>
        );
}
