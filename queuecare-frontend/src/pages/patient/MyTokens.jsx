import React, { useEffect, useState } from 'react';
import Header from '../../components/common/Header';
import BottomNav from '../../components/common/BottomNav';
import { getMyTokensApi } from '../../api/userApi.js';
import { getAllClinicsApi } from '../../api/clinicApi.js';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function MyTokens() {
    const navigate = useNavigate();
    const [clinics, setClinics] = useState([]);
    const [tokens, setTokens] = useState([]);
    useEffect(() => {
        const fetchTokens = async () => {
            const res = await getMyTokensApi();
            if (res.success) {
                setTokens(res.tokens);
            }
        };
        const fetchClinics = async () => {
            const res = await getAllClinicsApi();
            if(res.success) {
                setClinics(res.clinics);
            }
        };
        fetchTokens();
        fetchClinics();
    }, []);

    console.log(typeof clinics);
    const viewQueueStatus = (doctorId, name,  token) => {
        navigate(`/queue-status/${doctorId}/${name}?token=${token}`)
    }
    return (
        <div className="max-w-md mx-auto px-4 py-6 space-y-4 h-dvh">

            <Header title="My Tokens" />

            {tokens.length === 0 ? (
                <p className="text-center text-gray-500 my-auto">
                    No tokens booked yet
                </p>
            ) : (
                tokens.map((t, index) => (
                    <div
                        key={index}
                        className="bg-white p-2 rounded-xl shadow-[0_5px_15px_rgba(0,0,0,0.25)]"
                    >

                        <div className='flex items-center'>
                            <span className='mr-2 text-slate-800 font-bold pl-1'>#1</span>
                            <div className='w-px h-5 bg-gray-400' />
                            <span className='ml-2 text-slate-800 font-medium flex-1'>Zeeshan Zahoor</span>
                            <div className='w-px h-5 mx-2 bg-gray-300' />
                            <span className='text-xs text-slate-500 flex-1'>7006152972</span>
                        </div>
                        

                        <div className='w-full h-px bg-gray-300 rounded-full my-1' />

                        {/* doctor card */}
                        <div
                            className='bg-white m-auto p-2 flex gap-3 items-start'>

                            {/* Doctor Image */}
                            <div className="w-25 h-25 rounded-xl overflow-hidden shrink-0">
                                <img
                                    src={t.doctorImage}
                                    alt={t.doctorName}
                                    className='w-full h-full object-cover'
                                />
                            </div>

                            {/* right content */}
                            <div className='flex-1'>

                                {/* Top row */}
                                <div className='flex justify-between items-start'>
                                    <h2 className='text font-bold text-slate-800'>
                                        {t.doctorName}
                                    </h2>
                                </div>

                                {/* Specialization */}
                                <p className='mt-1 text-sm font-medium text-slate-700'>
                                    {t.doctorSpecialization}
                                </p>

                                {/* Doctor's Clinic */}
                                <div className='h-4 flex items-start gap-2 mt-1 text-[13px] text-slate-700 overflow-hidden'>
                                    <MapPin className='w-4 h-4' />
                                    <span>{
                                    (clinics.find((clinic) => 
                                        clinic._id === t.doctorClinicId)
                                    ).name
                                    }</span>
                                </div>

                            </div>

                        </div>

                        <div className='w-full h-px bg-gray-200 rounded-full my-1 mb-2' />

                        <div className='flex gap-2'>
                            <span
                                className={`flex-1 inline-block px-3 py-2 text-s rounded-full text-center ${t.status === "waiting"
                                    ? "bg-yellow-100 text-yellow-700"
                                    : t.status === "ongoing"
                                        ? "bg-gray-200 text-gray-600"
                                        : "bg-green-100 text-green-700"
                                    }`}
                            >
                                {t.status}
                            </span>
                            <button
                                onClick={() => viewQueueStatus(t.doctorId,t.name, t.token)}
                                className='flex-1 inline-block px-3 py-2 text-s rounded-full text-center bg-slate-800 text-white font-medium'
                            >
                                {t.status === "completed" ? "Remove" : "View Status"}
                            </button>
                        </div>
                    </div>
                ))
            )}

            <BottomNav />
        </div>
    );
}