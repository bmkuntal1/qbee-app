import { Navigate } from "react-router-dom";
import useAuthStore from "../routes/auth-store";

export const PrivateRoute = ({ children }) => {
    const user = useAuthStore((state) => state.user);
    return (
        <>{!user ? <Navigate to="login" /> : children}</>
    );
};
