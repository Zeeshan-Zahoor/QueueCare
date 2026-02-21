import React from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, Search } from 'lucide-react';

export default function ClinicCard({ clinic }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/clinic/${clinic.id}`)}
            className="bg-white rounded-xl shadow-[0_10px_25px_rgba(0,0,0,0.2)] p-4 cursor-pointer hover:shadow-[0_20px_40px_rgba(0,0,0,0.25)] transition duration-300"

        >
            <div className="w-full h-44 overflow-hidden rounded-xl mb-2">
                <img
                    src={clinic.image}
                    alt={clinic.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                />
            </div>


            <h3 className="font-semibold text-slate-800">
                {clinic.name}
            </h3>

            <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                <MapPin className="w-4 h-4" />
                <span>{clinic.location}</span>
            </div>

            <div className="flex justify-between items-center mt-3 text-sm">
                <span>{clinic.doctors.length} Doctors</span>

                <span
                    className={`font-medium ${clinic.status === "Open"
                        ? "text-green-600"
                        : "text-red-600"
                        }`}
                >
                    {clinic.status}
                </span>
            </div>

        </div>
    )
}

