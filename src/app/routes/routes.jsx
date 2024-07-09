import { Navigate } from 'react-router-dom';

import AdminLayout from '../components/layout/AdminLayout';
import NotFoundPage from '../pages/NotFoundPage';
import AdminDashboard from '../pages/admin/AdminDashboard';

import ForgotPasswordPage from '../pages/common/auth/ForgotPasswordPage';
import LoginPage from '../pages/common/auth/LoginPage';
import RegisterPage from '../pages/common/auth/RegisterPage';
import ResetPasswordPage from '../pages/common/auth/ResetPasswordPage';
import SendVerifyEmailPage from '../pages/common/auth/SendVerifyEmailPage';
import VerifyEmailPage from '../pages/common/auth/VerifyEmailPage';
import ChangePasswordPage from '../pages/common/profile/ChangePasswordPage';
import EditUserProfilePage from '../pages/common/profile/EditUserProfilePage';
import ProfileLayout from '../pages/common/profile/ProfileLayout';
import UserProfilePage from '../pages/common/profile/UserProfilePage';
import UserSettingsPage from '../pages/common/profile/UserSettingsPage';
import UserList from '../pages/admin/users/UserList';
import UserDetailLayout from '../pages/admin/users/UserDetailLayout';
import UserDetailPage from '../pages/admin/users/UserDetailPage';
import InfoPage from '../pages/admin/system/InfoPage';
import LogListPage from '../pages/admin/system/LogListPage';
import LogContentPage from './../pages/admin/system/LogContentPage';
import LeadListPage from '../pages/crm/lead/LeadListPage';
import LeadDetailPage from '../pages/crm/lead/LeadDetailPage';
import EditLeadPage from '../pages/crm/lead/EditLeadPage';
import AddQuotationPage from '../pages/crm/quotation/AddQuotationPage';

const routes = [
    {
        path: "/",
        element: <AdminLayout />,
        private: true,
        children: [
            {
                path: "profile", element: <ProfileLayout />, children: [
                    { path: "", element: <UserProfilePage /> },
                    { path: "edit", element: <EditUserProfilePage /> },
                    { path: "change-password", element: <ChangePasswordPage /> },
                    { path: "settings", element: <UserSettingsPage /> }
                ]
            },
            //Admin
            { path: "", element: <AdminDashboard /> },
            { path: "users", element: <UserList /> },
            {
                path: "users/:id", element: <UserDetailLayout />, children: [
                    { path: "", element: <UserDetailPage /> },
                    { path: "settings", element: <h1>User Settings</h1> },
                    { path: "activities", element: <h1>User Activites</h1> }]
            },
            { path: "system/info", element: <InfoPage /> },
            { path: "system/logs", element: <LogListPage /> },
            { path: "system/logs/:date", element: <LogContentPage /> },
            //CRM
            {path: "leads", element: <LeadListPage />},
            {path: "leads/edit/:id", element: <EditLeadPage/>},
            {path: "leads/detail/:id", element: <LeadDetailPage />},

            {path:"quotations/new", element: <AddQuotationPage />}

        ]
    },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    { path: "/forgot-password", element: <ForgotPasswordPage /> },
    { path: "/reset-password", element: <ResetPasswordPage /> },
    { path: "/send-verify-email", element: <SendVerifyEmailPage /> },
    { path: "/verify-email", element: <VerifyEmailPage /> },
    { path: "/404", element: <NotFoundPage /> },
    {
        path: "*",
        element: <Navigate to="/404" />,
    },
];

export default routes;
