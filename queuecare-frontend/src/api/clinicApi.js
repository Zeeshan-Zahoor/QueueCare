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
    const res = await fetch(`${BASE_URL}/doctor/${doctorId}/join`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
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
    const res = await fetch(`${BASE_URL}/doctor/${doctorId}/advance`, {
        method: "POST",
    });
    return res.json();
}

export const toggleConsultationApi = async (doctorId) => {
    const res = await fetch(`${BASE_URL}/doctor/${doctorId}/toggle-consultation`, {
        method: "POST",
    })

    return res.json();
}

export const toggleDayApi = async (doctorId) => {
    const res = await  fetch(`${BASE_URL}/doctor/${doctorId}/toggle-day`, {
        method: "POST",
    })

    return res.json();
}

export const updateDoctorSettingsApi = async (doctorId, data) => {
    const res = await fetch(`${BASE_URL}/doctor/${doctorId}/settings`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return res.json();
}

export const updateClinicSettingsApi = async (clinicId, data) => {
    const res = await fetch(`${BASE_URL}/${clinicId}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });

    return res.json();
}