import { createContext, useEffect, useState } from "react";

export const QueueContext = createContext();

export function QueueProvider( {children} ) {
    const [doctorData, setDoctorData] = useState({});

    useEffect(() => {
        const storedDoctorData = JSON.parse(localStorage.getItem("storedDoctorData"));

        if(storedDoctorData) {
            setDoctorData(storedDoctorData);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("storedDoctorData", JSON.stringify(doctorData));
    }, [doctorData])

    const joinQueue = (doctorId, doctorInfo, patientData) => {
        let result = null;

        setDoctorData((prev) => {
            const current = prev[doctorId] || doctorInfo;
            if(!current) return prev;

            const queue = current.queue || [];

            //Queue Full
            if (current.maxTokens - (current.currentlyServing + queue.length) <= 0) {
                result = null;
                return prev;
            }

            //Duplicate phone check
            const patientExists = queue.some((patient) => patient.phone === patientData.phone);

            if(patientExists) {
                result = -1 // duplicate
                return prev;
            }

            const newToken = current.lastIssuedToken + 1;

            result = newToken;

            return {
                ...prev, 
                [doctorId]: {
                    ...current, 
                    lastIssuedToken: (current.lastIssuedToken) + 1,
                    queue: [
                        ...queue, 
                        {
                            token: newToken, 
                            name: patientData.name, 
                            phone: patientData.phone,
                        }
                    ]
                }
            }
        })
        return result;
    }

    const exitQueue = (doctorId, token, doctorInfo) => {
        let result = false;

        setDoctorData((prev) => {
            const current = prev[doctorId] || doctorInfo;

            if(!current) return prev;

            const queue = current.queue || [];

            //prevent cancellation if token already being served
            if(token <= current.currentlyServing) {
                result = false;
                return prev;
            }

            //check if token actually exists
            const tokenExists = queue.some((patient) => patient.token === token)

            if(!tokenExists) {
                result = false;
                return prev;
            }
            
            const newQueue = queue.filter((patient) => patient.token !== token);

            result = true;

            return {
                ...prev, 
                [doctorId]: {
                    ...current, 
                    queue: newQueue,
                }
            }
        })
        return result;
    }
 
    return (
        <QueueContext.Provider value={{joinQueue, doctorData, exitQueue}}>
            {children}
        </QueueContext.Provider>
    )
}