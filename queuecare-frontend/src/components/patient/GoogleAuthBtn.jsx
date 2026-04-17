import React, { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { googleLoginApi } from "../../api/userApi";

export default function GoogleAuthBtn({
    text,
}) {
    useEffect(() => {
        window.google.accounts.id.initialize({
            client_id: import.meta.env.VITE_GOOGLE_CLIENT_ID,
            callback: handleGoogleLogin,
        });

        window.google.accounts.id.renderButton(
            document.getElementById("google-login-btn"),
            {
                theme: "outline",
                size: "large",
                text: text,
            }
        )
    }, []);
    
    const navigate = useNavigate();
    const handleGoogleLogin = async (response) => {
        const res = await googleLoginApi(response);
    
        if (res.success) {
            localStorage.setItem("user_jwt_token", res.token);
            navigate("/home", { replace: true });
        }
    }

    return (
        <div id="google-login-btn" className="m-auto w-full text-center"></div>
    );
}