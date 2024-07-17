import { LoadingOverlay } from "@mantine/core";
import "./CSS/Spinner.css";
export function Spinner() {
        return (
                <div className="spinnerContainer">
                        <div className="spinnerOverlay">
                                <svg viewBox="25 25 50 50">
                                        <circle r="20" cy="50" cx="50"></circle>
                                </svg>
                        </div>
                </div>
        );
}
