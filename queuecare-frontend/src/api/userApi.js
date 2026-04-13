const BASE_URL = "http://localhost:3000/api/user";

export const registerUserApi = async (data) => {
    const res = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return res.json();
}

export const loginUserApi = async (data) => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return res.json();
}

export const getMyProfileApi = async () => {
    const user_jwt_token = localStorage.getItem("user_jwt_token");

    // Remove any quotes that might be stored in localStorage
    const cleanToken = user_jwt_token ? user_jwt_token.replace(/['"]+/g, '') : null;

    console.log("Token exists:", !!cleanToken); // Debug: check if token exists

    const res = await fetch(`${BASE_URL}/profile`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cleanToken}`,
        },
    });

    if(res.status === 401) {
        localStorage.removeItem("user_jwt_token");
        window.location.href("/login");
    }

    return await res.json();
}

export const updateProfileApi = async (data) => {
    const user_jwt_token = localStorage.getItem("user_jwt_token");

    const res = await fetch(`${BASE_URL}/update`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${user_jwt_token}`,
        },
        body: JSON.stringify(data)
    });


    return res.json();
}

export const uploadProfileApi = async (file) => {
    const user_jwt_token = localStorage.getItem("user_jwt_token");

    const formData =  new FormData();
    formData.append("image", file);

    const res = await fetch(`${BASE_URL}/upload-profile`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${user_jwt_token}`,
        },
        body: formData,
    });

    return res.json();
}

export const getMyTokensApi = async () => {
    const user_jwt_token = localStorage.getItem("user_jwt_token");

    const res = await fetch(`${BASE_URL}/my-tokens`, {
        headers: {
            Authorization: `Bearer ${user_jwt_token}`,
        }
    });

    return res.json();
}

export const forgotPasswordApi = async (email) => {
    const res = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
    });
    
    return res.json();
}

export const verifyOtpApi = async (data) => {
    const res = await fetch(`${BASE_URL}/verify-otp` , {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(data),
    });

    return res.json();
}

export const resetPasswordApi = async (data) => {
    const res = await fetch(`${BASE_URL}/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return res.json();
}

export const googleLoginApi = async (response) => {
    const user_jwt_token = response.credential;
    const res = await fetch(`${BASE_URL}/google-login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: user_jwt_token }),
        });

        return res.json();
}