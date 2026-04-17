const BASE_URL = "http://localhost:3000/api/clinic";

export const loginClinicApi = async(data) => {
    const res = await fetch(`${BASE_URL}/login`, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return res.json();
};

export const getClinicApi = async (clinicId) => {
    const res = await fetch(`${BASE_URL}/${clinicId}`);
    return res.json();
}

export const getDoctorByIdApi = async (doctorId) => {
    const res = await fetch(`${BASE_URL}/doctor/${doctorId}`);
    return res.json()
}

export const getDoctorsApi =  async (clinicId) => {
    const res = await fetch(`${BASE_URL}/${clinicId}/doctors`)
    return res.json();
}

export const joinQueueApi = async (doctorId, data) => {
    const user_jwt_token = localStorage.getItem("user_jwt_token");

    const res = await fetch(`${BASE_URL}/doctor/${doctorId}/join`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": user_jwt_token ? `Bearer ${user_jwt_token}` : ""
        },
        body: JSON.stringify(data),
    });

    return res.json();
};

export const getAllDoctorsApi = async () => {
    const res = await fetch(`${BASE_URL}/doctors`);
    return res.json();
}

export const getAllClinicsApi = async () => {
    const res = await fetch(`${BASE_URL}/clinics`);
    return res.json();
}

export const exitQueueApi = async (doctorId, token) => {
    const res = await fetch(`${BASE_URL}/doctor/${doctorId}/exit`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify({ token }),
    });

    return res.json();
}

export const advanceTokenApi = async (doctorId) => {
    const jwt_token = localStorage.getItem("jwt_token");

    const res = await fetch(`${BASE_URL}/doctor/${doctorId}/advance`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${jwt_token}`
        },
    });

    if(res.status === 401) {
        localStorage.removeItem("jwt_token");
        window.location.href("/clinic");
    }
    return res.json();
}

export const toggleConsultationApi = async (doctorId) => {
    const jwt_token = localStorage.getItem("jwt_token");

    const res = await fetch(`${BASE_URL}/doctor/${doctorId}/toggle-consultation`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${jwt_token}` 
        }
    })

    if(res.status === 401) {
        localStorage.removeItem("jwt_token");
        window.location.href("/clinic");
    }

    return res.json();
}

export const toggleDayApi = async (doctorId) => {
    const jwt_token = localStorage.getItem("jwt_token");

    const res = await  fetch(`${BASE_URL}/doctor/${doctorId}/toggle-day`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${jwt_token}`
        }
    })

    if(res.status === 401) {
        localStorage.removeItem("jwt_token");
        window.location.href("/clinic");
    }
    return res.json();
}

export const updateDoctorSettingsApi = async (doctorId, data) => {
    const jwt_token = localStorage.getItem("jwt_token");
    
    const res = await fetch(`${BASE_URL}/doctor/${doctorId}/settings`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt_token}`
        },
        body: JSON.stringify(data),
    });

    if(res.status === 401) {
        localStorage.removeItem("jwt_token");
        window.location.href("/clinic");
    }

    return res.json();
}

export const updateClinicSettingsApi = async (clinicId, data) => {
    const jwt_token = localStorage.getItem("jwt_token");

    const res = await fetch(`${BASE_URL}/${clinicId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt_token}`
        },
        body: JSON.stringify(data),
    });

    if(res.status === 401) {
        localStorage.removeItem("jwt_token");
        window.location.href("/clinic");
    }

    return res.json();
}
export const addDoctorApi = async (data) => {
    const jwt_token = localStorage.getItem("jwt_token");

    const res = await fetch(`${BASE_URL}/add-doctor`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt_token}`,
        },
        body: JSON.stringify(data),
    });

    if(res.status === 401) {
        localStorage.removeItem("jwt_token");
        window.location.href = "/clinic";
    }

    return res.json();
}

export const deleteDoctorApi = async (data) => {
    const jwt_token = localStorage.getItem("jwt_token");

    const res = await fetch(`${BASE_URL}/delete-doctor`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${jwt_token}`,
        },
        body: JSON.stringify(data),
    });

    if(res.status === 401) {
        localStorage.removeItem("jwt_token");
        window.location.href = "/clinic";
    }

    return res.json();
}

export const uploadDoctorProfileApi = async (file, doctorId) => {
    const jwt_token = localStorage.getItem("jwt_token");

    const formData = new FormData();
    formData.append("doctorImage", file);
    formData.append("doctorId", doctorId);

    console.log("DoctorId: ", doctorId);
    const res = await fetch(`${BASE_URL}/upload-profile`, {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${jwt_token}`,
        },
        body: formData,
    });

    if(res.status === 401) {
        localStorage.removeItem("jwt_token");
        window.location.href = "/clinic";
    }
    return res.json();
}

export const forgotClincPasswordApi = async (email) => {
    const res = await fetch(`${BASE_URL}/forgot-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({email}),
    });

    return res.json();
}

export const verifyClinicOtpApi = async (data) => {
    const res = await fetch(`${BASE_URL}/verify-otp`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return res.json();
}

export const resetClinicPasswordApi = async (data) => {
    const res = await fetch(`${BASE_URL}/reset-password`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    }); 

    return res.json();
}