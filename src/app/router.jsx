import { createBrowserRouter } from "react-router-dom";

import PatientLayout from "../layouts/PatientLayout";
import ClinicLayout from "../layouts/ClinicLayout";

import Home from "../pages/patient/Home";
import DoctorDetails from "../pages/patient/DoctorDetails";
import QueueStatus from "../pages/patient/QueueStatus";

import ClinicLogin from "../pages/clinic/ClinicLogin";
import Dashboard from "../pages/clinic/Dashboard";
import Settings from "../pages/clinic/Settings";

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
                path: 'doctor/:id',
                element: <DoctorDetails />
            },
            {
                path: 'queue-status/:token',
                element: <QueueStatus />
            },
        ]
    }, 
    {
        path: "/clinic", 
        element: <ClinicLayout />,
        children: [
            {
                index: true,
                element: <ClinicLogin />
            },
            {
                path: "dashboard",
                element: <Dashboard />
            },
            {
                path: "settings",
                element: <Settings />
            },
        ],
    },
]);