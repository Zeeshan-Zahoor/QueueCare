import { Navigate } from "react-router-dom";

export default function AuthRedirect() {
    const userToken = localStorage.getItem("user_jwt_token");
    const clinicToken = localStorage.getItem("clinic_jwt_token");

    
    if (userToken && clinicToken) {
        return <Navigate to="/clinic" replace />;
    }

    if (userToken) {
        return <Navigate to="/home" replace />;
    }

    if (clinicToken) {
        return <Navigate to="/clinic" replace />;
    }

    return <Navigate to="/landing" replace />;
}