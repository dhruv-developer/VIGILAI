
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import OTPVerificationPage from './pages/OTPVerificationPage';
import DashboardPage from './pages/DashboardPage';
import UploadVideoPage from './pages/UploadVideoPage';
import MyRecordingsPage from './pages/MyRecordingsPage';
import FileComplaintPage from './pages/FileComplaintPage';
import ComplaintDetailsPage from './pages/ComplaintDetailsPage';
import HotspotsMapPage from './pages/HotspotsMapPage';
import ProfilePage from './pages/ProfilePage';
import PrivateRoute from './components/PrivateRoute';
import Layout from './components/Layout';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <NotificationProvider>
          <BrowserRouter>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<LandingPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/verify-otp" element={<OTPVerificationPage />} />
              
              {/* Protected Routes */}
              <Route path="/dashboard" element={
                <PrivateRoute>
                  <Layout>
                    <DashboardPage />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/upload-video" element={
                <PrivateRoute>
                  <Layout>
                    <UploadVideoPage />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/my-recordings" element={
                <PrivateRoute>
                  <Layout>
                    <MyRecordingsPage />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/file-complaint" element={
                <PrivateRoute>
                  <Layout>
                    <FileComplaintPage />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/complaint/:id" element={
                <PrivateRoute>
                  <Layout>
                    <ComplaintDetailsPage />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/hotspots-map" element={
                <PrivateRoute>
                  <Layout>
                    <HotspotsMapPage />
                  </Layout>
                </PrivateRoute>
              } />
              <Route path="/profile" element={
                <PrivateRoute>
                  <Layout>
                    <ProfilePage />
                  </Layout>
                </PrivateRoute>
              } />
              
              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </BrowserRouter>
        </NotificationProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
