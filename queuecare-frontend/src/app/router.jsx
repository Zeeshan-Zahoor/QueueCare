import { createBrowserRouter } from "react-router-dom";

import PatientLayout from "../layouts/PatientLayout";
import ClinicLayout from "../layouts/ClinicLayout";

import AuthRedirect from "./AuthRedirect.jsx";

import UserRegistration from "../pages/patient/UserRegistration.jsx";
import UserLogin from "../pages/patient/UserLogin.jsx";
import ForgotPassword from "../pages/patient/ForgotPassword.jsx";
import VerifyOtp from "../pages/patient/VerifyOtp.jsx";
import ResetPassword from "../pages/patient/ResetPassword.jsx";
import Home from "../pages/patient/Home";
import Doctors from "../pages/patient/Doctors";
import DoctorDetails from "../pages/patient/DoctorDetails";
import QueueStatus from "../pages/patient/QueueStatus";
import PatientSettings from "../pages/patient/PatientSettings";
import Profile from "../pages/patient/Profile.jsx";
import MyTokens from "../pages/patient/MyTokens.jsx";

import ClinicLogin from "../pages/clinic/ClinicLogin";
import ForgotClinicPassword from "../pages/clinic/ForgotClinicPassword.jsx";
import VerifyClinicOtp from "../pages/clinic/VerifyClinicOtp.jsx";
import ResetClinicPassword from "../pages/clinic/ResetClinicPassword.jsx";
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
                path: 'forgot-password',
                element: <ForgotPassword />
            },
            {
                path: 'verify-otp',
                element: <VerifyOtp />
            },
            {
                path: 'reset-password',
                element: <ResetPassword />
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
                element: (
                    <UserProtectedRoute>
                        <Doctors />
                    </UserProtectedRoute>
                )
            },
            {
                path: 'settings',
                element: (
                    <UserProtectedRoute>
                        <PatientSettings />
                    </UserProtectedRoute>
                )
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
                path: 'profile',
                element: (
                    <UserProtectedRoute>
                        <Profile />
                    </UserProtectedRoute>
                )
            },
            {
                path: 'my-tokens',
                element: (
                    <UserProtectedRoute>
                        <MyTokens />
                    </UserProtectedRoute>
                )
            },
            {
                path: 'queue-status/:doctorId/:username',
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
                path: "forgot-password",
                element: <ForgotClinicPassword />
            },
            {
                path: "verify-otp",
                element: <VerifyClinicOtp />
            },
            {
                path: "reset-password",
                element: <ResetClinicPassword />
            },
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