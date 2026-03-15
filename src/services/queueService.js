export const joinQueueLogic = (doctorInfo, patientData, source) => {
    if (doctorInfo.status === "closed") {
        return { error: "closed" };
    }

    const queue = doctorInfo.queue || [];

    //duplicate check
    const duplicate = queue.some(
        (p) => p.phone && p.phone === patientData.phone
    )

    if (duplicate) return { error: "duplicate" }

    //queue full check
    if (doctorInfo.maxTokens - (doctorInfo.currentlyServing + queue.length) <= 0) {
        return { error: "Full" };
    }

    const newToken = doctorInfo.lastIssuedToken + 1;

    const updatedDoctor = {
        ...doctorInfo,
        lastIssuedToken: newToken,
        queue: [
            ...queue,
            {
                token: newToken,
                name: patientData.name,
                phone: patientData.phone,
                source: source
            }
        ]
    }

    return { newToken, updatedDoctor };
}

export const exitQueueLogic = (doctorInfo, token) => {
    const queue = doctorInfo.queue || [];

    if (token <= doctorInfo.currentlyServing) {
        return { error: "alreadyServing" }
    }

    const exists = queue.some((p) => p.token === token);

    if (!exists) {
        return { error: "notFound" };
    }

    const newQueue = queue.filter((p) => p.token !== token);

    return {
        updatedDoctor: {
            ...doctorInfo,
            queue: newQueue
        }
    }
}

export const advanceTokenLogic = (doctorInfo) => {
    const queue = doctorInfo.queue || [];

    if (queue.length === 0) return { error: "empty" };

    const newCurrentlyServing = queue[0].token;

    return {
        updatedDoctor: {
            ...doctorInfo,
            currentlyServing: newCurrentlyServing,
            queue: queue.slice(1)
        }
    }
}

export const endDayLogic = (doctorInfo) => {
    return {
        updatedDoctor: {
            ...doctorInfo,
            currentlyServing: 0,
            lastIssuedToken: 0,
            status: "closed",
            queue: []
        }
    }
}