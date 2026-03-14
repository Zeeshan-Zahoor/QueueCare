import { createContext, useEffect, useState } from "react";

export const QueueContext = createContext();

export function QueueProvider( {children} ) {
    const [doctorData, setDoctorData] = useState({});
    const [activeToken, setActiveToken] = useState(null);

    //for persisting doctor data
    useEffect(() => {
        const storedDoctorData = JSON.parse(localStorage.getItem("storedDoctorData"));

        if(storedDoctorData) {
            setDoctorData(storedDoctorData);
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("storedDoctorData", JSON.stringify(doctorData));
    }, [doctorData])


    //for patient token accessibility
    useEffect(() => {
        const stored = localStorage.getItem("activeToken");
        if(stored) {
            setActiveToken(JSON.parse(stored));
        }
    }, [])

    useEffect(() => {
        if(activeToken) {
            localStorage.setItem("activeToken", JSON.stringify(activeToken))
        } else {
            localStorage.removeItem("activeToken");
        }
    }, [activeToken])

    const joinQueue = (doctorId, doctorInfo, patientData, source) => {
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
                    lastIssuedToken: newToken,
                    queue: [
                        ...queue, 
                        {
                            token: newToken, 
                            name: patientData.name, 
                            phone: patientData.phone,
                            source,
                        }
                    ]
                }
            }
        })

        if(typeof result === "number") {
            setActiveToken({
                doctorId, 
                token: result,
            })
        }

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

        if(result) {
            setActiveToken(null);
        }

        return result;
    }

    const advanceToken = (doctorId, doctorInfo) => {
        setDoctorData((prev) => {
            const current = prev[doctorId] || doctorInfo;

            if(!current)  return prev;

            const queue = current.queue || [];

            if(queue.length === 0) return prev;

            const newCurrentlyServing = queue[0].token;
            const newQueue = queue.slice(1);
            return {
                ...prev, 
                [doctorId]: {
                    ...current, 
                    queue: newQueue,
                    currentlyServing: newCurrentlyServing
                }
            }
        })
    }
 
    return (
        <QueueContext.Provider value={{joinQueue, doctorData, exitQueue, activeToken, advanceToken}}>
            {children}
        </QueueContext.Provider>
    )
}