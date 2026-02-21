// import { createContext, useState } from "react";

// export const QueueContext = createContext();

// export function QueueProvider({ children }) {
//     const [queueData, setQueueData] = useState({});

//     const joinQueue = (doctorId, doctorData) => {
//         let newToken;

//         setQueueData((prev) => {
//             const current = prev[doctorId] || doctorData;

//             if(current.tokensBooked >= current.maxTokens) {
//                 return prev; // queue full
//             }

//             newToken = current.tokensBooked + 1;

//             return {
//                 ...prev, 
//                 [doctorId]: {
//                     ...current, 
//                     tokensBooked: newToken,
//                 },
//             }
//         })
//         return newToken;
//     }

//     return (
//         <QueueContext.Provider value={{queueData, joinQueue}}>
//             {children}
//         </QueueContext.Provider>
//     );
// }






import { createContext, useState } from "react";

export const QueueContext = createContext();

export function QueueProvider( {children} ) {
    const [doctorData, setDoctorData] = useState({});

    const joinQueue = (doctorId, doctorData) => {
        let newToken;

        setDoctorData((prev) => {
            const current = prev[doctorId] || doctorData;

            if(current.tokensBooked >= current.maxTokens) {
                return prev; //Queue Full.
            }

            newToken = current.tokensBooked + 1;

            return {
                ...prev, 
                [doctorId]: {
                    ...current, 
                    tokensBooked: newToken, 
                }
            }
        })
        return newToken;
    }

    return (
        <QueueContext.Provider value={{joinQueue, doctorData}}>
            {children}
        </QueueContext.Provider>
    )
}