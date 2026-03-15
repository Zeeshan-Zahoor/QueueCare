export const loadDoctorData = () => {
    const stored = localStorage.getItem("storedDoctorData");
    return stored ? JSON.parse(stored) : {};
}

export const saveDoctorData = (data) => {
    localStorage.setItem("storedDoctorData", JSON.stringify(data));
}

export const loadActiveToken = () => {
    const stored = localStorage.getItem("activeToken");
    return stored ? JSON.parse(stored) : null;
}

export const saveActiveToken = (token) => {
    localStorage.setItem("activeToken", JSON.stringify(token))
}

export const clearActiveToken = () => {
    localStorage.removeItem("activeToken");
}