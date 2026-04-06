import { Navigate } from "react-router-dom";

export default function UserProtectedRoute({ children }) {
    const user_jwt_token = localStorage.getItem("user_jwt_token");

    if(!user_jwt_token) {
        return <Navigate to="/login"/>
    }

    return children;
}