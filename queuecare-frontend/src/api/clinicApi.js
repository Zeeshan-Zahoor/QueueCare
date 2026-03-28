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