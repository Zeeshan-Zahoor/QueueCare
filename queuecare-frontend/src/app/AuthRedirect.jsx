import { Navigate } from "react-router-dom";

export default function AuthRedirect() {
    const user_jwt_token = localStorage.getItem("user_jwt_token");
    const jwt_token = localStorage.getItem("jwt_token");

    if(user_jwt_token) {
        return <Navigate to='/home'/>
    } else if (jwt_token) {
        return <Navigate to='/clinic'/>
    }

    return <Navigate to= '/login'/>
}