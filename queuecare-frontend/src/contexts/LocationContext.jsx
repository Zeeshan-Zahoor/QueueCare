import { createContext, useState, useEffect } from "react";

export const LocationContext = createContext();

export const LocationProvider = ({ children }) => {
    const [location, setLocation] = useState({
        status: "unavailable",
        amenity: "",
        road: "",
        suburb: "",
        village: "",
        county: "",
        district: "",
        state: "",
        postcode: "",
        country: "",
        latitude: "",
        longitude: "",
    });

    useEffect(() => {
        const fetchLocation = async () => {
            navigator.geolocation.getCurrentPosition(async (position) => {
                const { latitude, longitude } = position.coords;

                    try {
                        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`);

                        const data = await res.json();
                        const address = data.address;
                        const location = {
                            amenity: address.amenity,
                            road: address.road,
                            suburb: address.suburb,
                            village: address.village,
                            county: address.county,
                            district: address.state_district,
                            state: address.state,
                            postcode: address.postcode,
                            country: address.country,
                            latitude,
                            longitude,
                            status: "available"
                        }

                        setLocation(location);

                    } catch {
                        setLocation({
                            ...location,
                            status: "unavailable"
                        });
                    }
                }
            );
        }

        fetchLocation();
    }, []);

    return (
        <LocationContext.Provider value={{ location }}>
            {children}
        </LocationContext.Provider>
    );
};