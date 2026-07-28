import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ToastProvider } from './components/ui/Toast';
import Home from './pages/Home';
import Login from './pages/auth/Login';
import SignUp from './pages/auth/SignUp';
import ForgotPassword from './pages/auth/ForgotPassword';
import ResetPassword from './pages/auth/ResetPassword';
import EmailVerification from './pages/auth/EmailVerification';
import CreateUsername from './pages/auth/CreateUsername';
import Dashboard from './pages/Dashboard';
import ProfilePage from './pages/dashboard/ProfilePage';
import EditProfilePage from './pages/dashboard/EditProfilePage';
import SettingsPage from './pages/dashboard/SettingsPage';
import NotificationsPage from './pages/dashboard/NotificationsPage';
import ArchivedPage from './pages/dashboard/ArchivedPage';
import StarredPage from './pages/dashboard/StarredPage';
import MediaPage from './pages/dashboard/MediaPage';
import CallsPage from './pages/dashboard/CallsPage';
import ContactsPage from './pages/dashboard/ContactsPage';
import HelpPage from './pages/dashboard/HelpPage';
import AboutPage from './pages/AboutPage';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';
import NotFoundPage from './pages/NotFoundPage';

export default function App() {
  return (
    <BrowserRouter>
      <ToastProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/dashboard/profile" element={<ProfilePage />} />
          <Route path="/dashboard/edit-profile" element={<EditProfilePage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route path="/dashboard/notifications" element={<NotificationsPage />} />
          <Route path="/dashboard/archived" element={<ArchivedPage />} />
          <Route path="/dashboard/starred" element={<StarredPage />} />
          <Route path="/dashboard/media" element={<MediaPage />} />
          <Route path="/dashboard/calls" element={<CallsPage />} />
          <Route path="/dashboard/contacts" element={<ContactsPage />} />
          <Route path="/dashboard/help" element={<HelpPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/create-username" element={<CreateUsername />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </ToastProvider>
    </BrowserRouter>
  );
}