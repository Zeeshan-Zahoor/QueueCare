import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
    const token = localStorage.getItem("jwt_token");

    if(!token) {
       return <Navigate to="/clinic"/>
    }

    return children;
}