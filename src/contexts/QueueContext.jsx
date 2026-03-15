import { createContext, useEffect, useState } from "react";

import {
    loadDoctorData, 
    saveDoctorData,
    loadActiveToken, 
    saveActiveToken, 
    clearActiveToken
} from "../utlis/storage.js";

import { 
    joinQueueLogic,
    exitQueueLogic,
    advanceTokenLogic
 } from "../services/queueService.js";

export const QueueContext = createContext();

export function QueueProvider( {children} ) {
    const [doctorData, setDoctorData] = useState({});
    const [activeToken, setActiveToken] = useState(null);

    //for persisting doctor data
    useEffect(() => {
        setDoctorData(loadDoctorData());
        setActiveToken(loadActiveToken());
    }, []);

    useEffect(() => {
        saveDoctorData(doctorData);
    }, [doctorData])

    //for patient token accessibility
    // useEffect(() => {
    //     const stored = localStorage.getItem("activeToken");
    //     if(stored) {
    //         setActiveToken(JSON.parse(stored));
    //     }
    // }, [])

    useEffect(() => {
        if(activeToken) {
            saveActiveToken(activeToken);
        } else {
           clearActiveToken();
        }
    }, [activeToken])



    const joinQueue = (doctorId, doctorInfo, patientData, source) => {
        const result = joinQueueLogic(doctorInfo, patientData, source);

        if(result.error === "duplicate") return -1;
        if(result.error === "full") return null;

        const { newToken, updatedDoctor } = result;

        setDoctorData((prev) => ({
            ...prev,
            [doctorId]: updatedDoctor
        }));

        setActiveToken({
            doctorId,
            token: newToken
        })
        return newToken;
    }

    const exitQueue = (doctorId, token, doctorInfo) => {
        const result = exitQueueLogic(doctorInfo, token);

        if(result.error) return false;

        setDoctorData((prev) => ({
            ...prev,
            [doctorId]: result.updatedDoctor
        }));

        setActiveToken(null);

        return true;
    }

    const advanceToken = (doctorId, doctorInfo) => {
        const result = advanceTokenLogic(doctorInfo);

        if(result.error) return;

        setDoctorData((prev) => ({
            ...prev,
            [doctorId]: result.updatedDoctor
        }))
    }
 
    return (
        <QueueContext.Provider value={{joinQueue, doctorData, exitQueue, activeToken, advanceToken}}>
            {children}
        </QueueContext.Provider>
    )
}