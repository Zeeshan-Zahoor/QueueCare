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
    const jwt_token = localStorage.getItem("jwt_token");

    const res = await fetch(`${BASE_URL}/doctor/${doctorId}/join`, {
        method: "POST",
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
    const jwt_token = localStorage.getItem("jwt_token");

    const res = await fetch(`${BASE_URL}/doctor/${doctorId}/exit`, {
        method: "POST",
        headers: {
            "Content-Type" : "application/json",
            "Authorization": `Bearer ${jwt_token}`
            
        },
        body: JSON.stringify({ token }),
    });

    if(res.status === 401) {
        localStorage.removeItem("jwt_token");
        window.location.href("/clinic");
    }

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