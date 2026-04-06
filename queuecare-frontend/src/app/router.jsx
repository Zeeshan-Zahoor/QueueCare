import { createBrowserRouter } from "react-router-dom";

import PatientLayout from "../layouts/PatientLayout";
import ClinicLayout from "../layouts/ClinicLayout";

import AuthRedirect from "./AuthRedirect.jsx";

import UserRegistration from "../pages/patient/UserRegistration.jsx";
import UserLogin from "../pages/patient/UserLogin.jsx";
import Home from "../pages/patient/Home";
import Doctors from "../pages/patient/Doctors";
import DoctorDetails from "../pages/patient/DoctorDetails";
import QueueStatus from "../pages/patient/QueueStatus";
import PatientSettings from "../pages/patient/PatientSettings";

import ClinicLogin from "../pages/clinic/ClinicLogin";
import Dashboard from "../pages/clinic/Dashboard";
import Settings from "../pages/clinic/Settings";
import ClinicDetails from "../pages/patient/ClinicDetails";

import ProtectedRoute from "../components/auth/ProtectedRoute.jsx";
import UserProtectedRoute from "../components/auth/UserProtectedRoute.jsx";



export const router = createBrowserRouter([
    {
        path: "/", 
        element: <PatientLayout />,
        children: [
            {
                index: true,
                element: <AuthRedirect />
            },
            {
                path: 'register',
                element: <UserRegistration />
            },
            {
                path: 'login',
                element: <UserLogin />
            },
            {
                path: 'home',
                element: (
                    <UserProtectedRoute>
                        <Home />
                    </UserProtectedRoute>
                )
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
                path: 'clinic/:clinicId',
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
                    { path: "dashboard", element: (
                        <ProtectedRoute>
                            <Dashboard />
                        </ProtectedRoute>
                    ) }, 
                    { path: "settings", element: (
                        <ProtectedRoute>
                            <Settings />
                        </ProtectedRoute>
                    ) }
                ]
            }
        ],
    },
]);