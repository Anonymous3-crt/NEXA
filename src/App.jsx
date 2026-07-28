import { lazy, Suspense, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { ToastProvider } from './components/ui/Toast';
import LoadingScreen from './components/ui/LoadingScreen';

const Home = lazy(() => import('./pages/Home'));
const Login = lazy(() => import('./pages/auth/Login'));
const SignUp = lazy(() => import('./pages/auth/SignUp'));
const ForgotPassword = lazy(() => import('./pages/auth/ForgotPassword'));
const ResetPassword = lazy(() => import('./pages/auth/ResetPassword'));
const EmailVerification = lazy(() => import('./pages/auth/EmailVerification'));
const CreateUsername = lazy(() => import('./pages/auth/CreateUsername'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const ProfilePage = lazy(() => import('./pages/dashboard/ProfilePage'));
const EditProfilePage = lazy(() => import('./pages/dashboard/EditProfilePage'));
const SettingsPage = lazy(() => import('./pages/dashboard/SettingsPage'));
const NotificationsPage = lazy(() => import('./pages/dashboard/NotificationsPage'));
const ArchivedPage = lazy(() => import('./pages/dashboard/ArchivedPage'));
const StarredPage = lazy(() => import('./pages/dashboard/StarredPage'));
const MediaPage = lazy(() => import('./pages/dashboard/MediaPage'));
const CallsPage = lazy(() => import('./pages/dashboard/CallsPage'));
const ContactsPage = lazy(() => import('./pages/dashboard/ContactsPage'));
const HelpPage = lazy(() => import('./pages/dashboard/HelpPage'));
const AboutPage = lazy(() => import('./pages/AboutPage'));
const PrivacyPage = lazy(() => import('./pages/PrivacyPage'));
const TermsPage = lazy(() => import('./pages/TermsPage'));
const NotFoundPage = lazy(() => import('./pages/NotFoundPage'));

const pageVariants = {
  initial: { opacity: 0, y: 8 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
};

function AnimatedPage({ children }) {
  return (
    <motion.div id="main-content" tabIndex={-1} variants={pageVariants} initial="initial" animate="animate" exit="exit">
      {children}
    </motion.div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function AppRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Suspense fallback={<LoadingScreen />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
          <Route path="/dashboard" element={<AnimatedPage><Dashboard /></AnimatedPage>} />
          <Route path="/dashboard/profile" element={<AnimatedPage><ProfilePage /></AnimatedPage>} />
          <Route path="/dashboard/edit-profile" element={<AnimatedPage><EditProfilePage /></AnimatedPage>} />
          <Route path="/dashboard/settings" element={<AnimatedPage><SettingsPage /></AnimatedPage>} />
          <Route path="/dashboard/notifications" element={<AnimatedPage><NotificationsPage /></AnimatedPage>} />
          <Route path="/dashboard/archived" element={<AnimatedPage><ArchivedPage /></AnimatedPage>} />
          <Route path="/dashboard/starred" element={<AnimatedPage><StarredPage /></AnimatedPage>} />
          <Route path="/dashboard/media" element={<AnimatedPage><MediaPage /></AnimatedPage>} />
          <Route path="/dashboard/calls" element={<AnimatedPage><CallsPage /></AnimatedPage>} />
          <Route path="/dashboard/contacts" element={<AnimatedPage><ContactsPage /></AnimatedPage>} />
          <Route path="/dashboard/help" element={<AnimatedPage><HelpPage /></AnimatedPage>} />
          <Route path="/login" element={<AnimatedPage><Login /></AnimatedPage>} />
          <Route path="/signup" element={<AnimatedPage><SignUp /></AnimatedPage>} />
          <Route path="/forgot-password" element={<AnimatedPage><ForgotPassword /></AnimatedPage>} />
          <Route path="/reset-password" element={<AnimatedPage><ResetPassword /></AnimatedPage>} />
          <Route path="/verify-email" element={<AnimatedPage><EmailVerification /></AnimatedPage>} />
          <Route path="/create-username" element={<AnimatedPage><CreateUsername /></AnimatedPage>} />
          <Route path="/about" element={<AnimatedPage><AboutPage /></AnimatedPage>} />
          <Route path="/privacy" element={<AnimatedPage><PrivacyPage /></AnimatedPage>} />
          <Route path="/terms" element={<AnimatedPage><TermsPage /></AnimatedPage>} />
          <Route path="*" element={<AnimatedPage><NotFoundPage /></AnimatedPage>} />
        </Routes>
      </Suspense>
    </AnimatePresence>
  );
}

function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[200] focus:px-4 focus:py-2 focus:rounded-xl focus:gradient-bg focus:text-white focus:text-sm focus:font-medium focus:shadow-xl"
    >
      Skip to main content
    </a>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <SkipLink />
      <ToastProvider>
        <ScrollToTop />
        <AppRoutes />
      </ToastProvider>
    </BrowserRouter>
  );
}
