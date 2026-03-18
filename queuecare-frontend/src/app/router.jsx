import { createBrowserRouter } from "react-router-dom";

import PatientLayout from "../layouts/PatientLayout";
import ClinicLayout from "../layouts/ClinicLayout";

import Home from "../pages/patient/Home";
import Doctors from "../pages/patient/Doctors";
import DoctorDetails from "../pages/patient/DoctorDetails";
import QueueStatus from "../pages/patient/QueueStatus";
import PatientSettings from "../pages/patient/PatientSettings";

import ClinicLogin from "../pages/clinic/ClinicLogin";
import Dashboard from "../pages/clinic/Dashboard";
import Settings from "../pages/clinic/Settings";
import ClinicDetails from "../pages/patient/ClinicDetails";

export const router = createBrowserRouter([
    {
        path: "/", 
        element: <PatientLayout />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: 'doctors',
                element: <Doctors />
            },
            {
                path: 'settings',
                element: <PatientSettings />
            },
            {
                path: 'clinic/:doctorId',
                element: <ClinicDetails />
            },
            {
                path: 'doctor/:doctorId',
                element: <DoctorDetails />
            },
            {
                path: 'queue-status/:doctorId',
                element: <QueueStatus />
            },
        ]
    }, 
    {
        path: "/clinic", 
        element: <ClinicLayout />,
        children: [
            { index: true, element: <ClinicLogin /> },

            {
                path: ":clinicId", 
                children: [
                    { path: "dashboard", element: <Dashboard /> }, 
                    { path: "settings", element: <Settings /> }
                ]
            }
        ],
    },
]);