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

    if(!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to fetch profile");
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