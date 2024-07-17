import { useAuth } from "./AuthContext.js";

export function Authorization({ Children }) {
        const { auth } = useAuth();
        if (!auth || auth.role === "Leader") {
                return <div>You are not authorized to view this page</div>;
        }

        return Children;
}
