import { createContext, useState } from "react";

export const QueueContext = createContext();

export function QueueProvider( {children} ) {
    const [doctorData, setDoctorData] = useState({});

    const joinQueue = (doctorId, doctorInfo, patientData) => {
        const current = doctorData[doctorId] || doctorInfo;
        const queue = current.queue || [];

        if(queue.length >= current.maxTokens) {
                return null; //Queue Full.
        }

        //check if there the patient with same phone number already exists.
        const patientExists = queue.some((patient) => patient.phone === patientData.phone)

        if(patientExists) {
            return -1;  // indicates patient exists 
        }

        const newToken = (current.currentlyServing || 0) + queue.length + 1;

        setDoctorData((prev) => {
            return {
                ...prev, 
                [doctorId]: {
                    ...current, 
                    queue: [
                        ...queue, 
                        {
                            token: newToken, 
                            name: patientData.name, 
                            phone: patientData.phone,
                        },
                    ],
                },
            };
        });
        return newToken;
    }

    return (
        <QueueContext.Provider value={{joinQueue, doctorData}}>
            {children}
        </QueueContext.Provider>
    )
}